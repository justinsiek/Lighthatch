import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import {
  Truck,
  Building2,
  HandPlatter,
  ShieldCheck,
  HardHat,
  Wrench,
  Search,
  ChevronDown,
  BadgeCheck,
} from "lucide-react";
import { NavUser } from "../NavUser";

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
];

const filters = ["Price", "Rating", "Availability", "Duration"];

const industryIcons: Record<string, React.ReactNode> = {
  Logistics: <Truck className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  "Real Estate": <Building2 className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  Hospitality: <HandPlatter className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  Insurance: <ShieldCheck className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  Construction: <HardHat className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  "Home Services": <Wrench className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
};

export default async function BrowsePage() {
  const pros = await getProfessionals();
  return (
    <main className="bg-white min-h-screen">
      <nav className="border-b border-zinc-200 bg-white px-18 py-3 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className={`${jakarta.className} text-2xl font-light tracking-tighter`}>Lighthatch</Link>
          <div className="flex items-center gap-8">
            <Link href="/browse" className="font-medium">Browse</Link>
            <Link href="/bookings" className="font-medium text-zinc-600 hover:text-black">Bookings</Link>
            <Link href="/professionals" className="text-zinc-600 hover:text-black">Become A Professional</Link>
          </div>
        </div>
        <NavUser />
      </nav>

      <section className="px-18 pt-6 pb-6 text-center">
        <h1 className={`${jakarta.className} text-3xl font-light tracking-tight`}>Browse professionals</h1>
        <div className="mt-4 max-w-3xl mx-auto">
          <div className="bg-white rounded-sm border border-zinc-200 flex items-center px-5 py-4">
            <Search className="w-5 h-5 text-zinc-400" strokeWidth={1.75} />
            <input
              type="text"
              placeholder="Search by role, industry, or keyword"
              className="flex-1 ml-3 bg-transparent outline-none text-sm text-zinc-700 placeholder:text-zinc-400"
            />
          </div>
        </div>
      </section>

      <section className="px-18 pb-6">
        <div className="flex justify-center gap-3 flex-wrap">
          {industries.map((ind) => (
            <button
              key={ind}
              className="border border-zinc-200 rounded-sm bg-white px-5 py-2 flex items-center gap-2.5 hover:border-zinc-400 cursor-pointer"
            >
              {industryIcons[ind]}
              <span className="text-sm">{ind}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="bg-white">
        <div className="px-18 py-3 flex items-center justify-between">
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
              <div className="aspect-[4/3] bg-zinc-300" />
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
