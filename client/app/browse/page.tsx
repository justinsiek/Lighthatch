import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  Truck,
  Building2,
  HandPlatter,
  ShieldCheck,
  HardHat,
  Wrench,
  Stethoscope,
  Factory,
  ShoppingBag,
  Landmark,
  Calculator,
  Scale,
  GraduationCap,
  Megaphone,
  Terminal,
  Sparkles,
  Car,
  Sprout,
  HandHeart,
  Search,
  ChevronDown,
  BadgeCheck,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Nav } from "../Nav";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

type Professional = {
  user_id: string;
  name: string;
  role: string;
  industry: string;
  bio: string;
  pricing: Record<string, number>;
  photo_url: string | null;
  linkedin_url: string | null;
};

function minPriceDollars(pricing: Record<string, number>): number {
  const cents = Math.min(...Object.values(pricing));
  return Math.round(cents / 100);
}

async function getProfessionals(): Promise<Professional[]> {
  try {
    const res = await fetch(`${API_URL}/api/professionals`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

const industries = [
  "Logistics",
  "Real Estate",
  "Hospitality",
  "Insurance",
  "Construction",
  "Home Services",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Finance",
  "Accounting",
  "Legal",
  "Education",
  "Marketing",
  "Software",
  "Beauty & Wellness",
  "Automotive",
  "Agriculture",
  "Nonprofit",
];

const filters = ["Price", "Rating", "Availability", "Duration"];

const industryIcons: Record<string, LucideIcon> = {
  Logistics: Truck,
  "Real Estate": Building2,
  Hospitality: HandPlatter,
  Insurance: ShieldCheck,
  Construction: HardHat,
  "Home Services": Wrench,
  Healthcare: Stethoscope,
  Manufacturing: Factory,
  Retail: ShoppingBag,
  Finance: Landmark,
  Accounting: Calculator,
  Legal: Scale,
  Education: GraduationCap,
  Marketing: Megaphone,
  Software: Terminal,
  "Beauty & Wellness": Sparkles,
  Automotive: Car,
  Agriculture: Sprout,
  Nonprofit: HandHeart,
};

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ industry?: string; q?: string }>;
}) {
  const { industry: selectedIndustry, q } = await searchParams;
  const query = (q ?? "").trim();
  const queryLower = query.toLowerCase();
  const allPros = await getProfessionals();
  const pros = allPros.filter((p) => {
    if (selectedIndustry && p.industry !== selectedIndustry) return false;
    if (
      query &&
      !p.name.toLowerCase().includes(queryLower) &&
      !p.role.toLowerCase().includes(queryLower) &&
      !p.bio.toLowerCase().includes(queryLower)
    ) {
      return false;
    }
    return true;
  });
  return (
    <main className="bg-white min-h-screen">
      <Nav />

      <section className="px-18 pt-6 pb-4 text-center">
        <h1 className={`${jakarta.className} text-3xl font-light tracking-tight`}>Browse professionals</h1>
        <form action="/browse" method="get" className="mt-4 max-w-5xl mx-auto">
          {selectedIndustry && (
            <input type="hidden" name="industry" value={selectedIndustry} />
          )}
          <div className="flex items-stretch h-14">
            <div className="flex items-center flex-1 px-5 bg-white border border-zinc-200 border-r-0 rounded-l-sm">
              <Search className="w-5 h-5 text-zinc-400" strokeWidth={1.75} />
              <input
                type="text"
                name="q"
                defaultValue={query}
                placeholder="Search by role, industry, or keyword"
                className="flex-1 ml-3 bg-transparent outline-none text-sm text-zinc-700 placeholder:text-zinc-400"
              />
            </div>
            <button
              type="submit"
              aria-label="Search"
              className="bg-black text-white flex items-center justify-center w-14 rounded-r-sm hover:bg-zinc-800 cursor-pointer"
            >
              <ArrowUpRight className="w-5 h-5" strokeWidth={2} />
            </button>
          </div>
        </form>
      </section>

      <section className="px-18 pb-4">
        <div className="max-w-[94rem] mx-auto flex justify-center gap-3 flex-wrap">
          {industries.map((ind) => {
            const Icon = industryIcons[ind];
            const active = selectedIndustry === ind;
            const params = new URLSearchParams();
            if (!active) params.set("industry", ind);
            if (query) params.set("q", query);
            const search = params.toString();
            return (
              <Link
                key={ind}
                href={search ? `/browse?${search}` : "/browse"}
                className={`rounded-sm px-4 py-2 flex items-center gap-2.5 cursor-pointer border transition-colors ${
                  active
                    ? "bg-black border-black text-white"
                    : "bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400"
                }`}
              >
                {Icon && (
                  <Icon
                    className={`w-5 h-5 ${active ? "text-white" : "text-zinc-700"}`}
                    strokeWidth={1.75}
                  />
                )}
                <span className="text-sm">{ind}</span>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="bg-white">
        <div className="px-18 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                className="border border-zinc-200 rounded-sm px-3 py-2 text-sm flex items-center gap-2 hover:border-zinc-400 cursor-pointer"
              >
                {f}
                <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-zinc-600">Sort by:</span>
            <button className="border border-zinc-200 rounded-sm px-3 py-1.5 flex items-center gap-2 hover:border-zinc-400 cursor-pointer">
              Recommended
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>

      <section className="px-18 py-4">
        <div className="grid grid-cols-5 gap-5">
          {pros.map((p) => (
            <Link
              key={p.user_id}
              href="#"
              className="bg-white rounded-lg border border-zinc-200 overflow-hidden flex flex-col hover:border-zinc-400 transition-colors"
            >
              <div className="aspect-square bg-zinc-300 overflow-hidden">
                {p.photo_url && (
                  <img
                    src={p.photo_url}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4 flex flex-col gap-3 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className={`${jakarta.className} font-medium tracking-tight truncate`}>{p.name}</span>
                      <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-100 shrink-0" strokeWidth={2} />
                    </div>
                    <div className="text-sm truncate">{p.role}</div>
                    <div className="text-xs text-zinc-500">{p.industry}</div>
                  </div>
                  <div className="flex flex-col gap-1 items-end shrink-0 text-right">
                    <div className="text-sm">
                      <span className="text-zinc-500 text-xs">from </span>
                      <span className="font-medium">${minPriceDollars(p.pricing)}</span>
                    </div>
                  </div>
                </div>
                <p className="text-md text-zinc-600 leading-relaxed line-clamp-4">{p.bio}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
