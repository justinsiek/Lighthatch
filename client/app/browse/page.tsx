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
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Nav } from "../Nav";
import { getProfessionals, ProfessionalCard } from "../ProfessionalCard";

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

      <section className="px-12 pt-6 pb-4 text-center">
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

      <section className="px-12 pb-4">
        <div className="max-w-8xl mx-auto flex justify-center gap-3 flex-wrap">
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
        <div className="px-12 py-2 flex items-center justify-between">
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

      <section className="px-12 py-4">
        <div className="grid grid-cols-5 gap-5">
          {pros.map((p) => (
            <ProfessionalCard key={p.user_id} pro={p} />
          ))}
        </div>
      </section>
    </main>
  );
}
