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
  Star,
  BadgeCheck,
} from "lucide-react";

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

const pros = [
  {
    name: "Tyler J.",
    role: "Freight Dispatcher",
    industry: "Logistics",
    price: 45,
    rating: 4.9,
    calls: 128,
    bio: "7+ years dispatching freight across the U.S. I help carriers and owner-operators find better lanes, negotiate rates, and improve efficiency.",
  },
  {
    name: "Maria S.",
    role: "Title & Escrow Officer",
    industry: "Real Estate",
    price: 55,
    rating: 4.9,
    calls: 96,
    bio: "10+ years in title & escrow. I help real estate professionals and homebuyers navigate closings, title issues, and compliance with confidence.",
  },
  {
    name: "David L.",
    role: "Restaurant Operator",
    industry: "Hospitality",
    price: 50,
    rating: 4.8,
    calls: 173,
    bio: "I've opened and run multiple restaurants. I can help with operations, staffing, menu strategy, and increasing profitability.",
  },
  {
    name: "Amanda P.",
    role: "Property Manager",
    industry: "Real Estate",
    price: 45,
    rating: 4.8,
    calls: 101,
    bio: "8+ years managing residential and multifamily properties. I share practical advice on leasing, tenant relations, and maximizing NOI.",
  },
  {
    name: "James K.",
    role: "Insurance Underwriter",
    industry: "Insurance",
    price: 60,
    rating: 4.9,
    calls: 89,
    bio: "10+ years underwriting commercial policies. I help agents and businesses understand risk, coverage, and how to get approved.",
  },
  {
    name: "Sophia R.",
    role: "Logistics Coordinator",
    industry: "Logistics",
    price: 35,
    rating: 4.7,
    calls: 64,
    bio: "Coordinating shipments and warehouses for 6 years. Happy to walk through routing, carriers, and fulfillment workflows.",
  },
  {
    name: "Marcus T.",
    role: "HVAC Technician",
    industry: "Home Services",
    price: 40,
    rating: 4.9,
    calls: 142,
    bio: "12+ years installing and servicing HVAC systems. I can explain how the trade works, pricing, and what customers actually want.",
  },
  {
    name: "Rachel B.",
    role: "General Contractor",
    industry: "Construction",
    price: 65,
    rating: 4.8,
    calls: 77,
    bio: "Run a residential GC business in the Midwest. Walking founders and PMs through subcontractor management, bidding, and timelines.",
  },
  {
    name: "Daniel H.",
    role: "Hotel Manager",
    industry: "Hospitality",
    price: 50,
    rating: 4.7,
    calls: 58,
    bio: "Managed boutique and chain hotels for 9 years. Operations, revenue management, and front-of-house workflows.",
  },
  {
    name: "Priya N.",
    role: "Claims Adjuster",
    industry: "Insurance",
    price: 45,
    rating: 4.8,
    calls: 92,
    bio: "Property and casualty claims for 7+ years. I can explain how claims actually flow through carriers.",
  },
];

const industryIcons: Record<string, React.ReactNode> = {
  Logistics: <Truck className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  "Real Estate": <Building2 className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  Hospitality: <HandPlatter className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  Insurance: <ShieldCheck className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  Construction: <HardHat className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
  "Home Services": <Wrench className="w-5 h-5 text-zinc-700" strokeWidth={1.75} />,
};

export default function BrowsePage() {
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
        <div className="flex items-center gap-5">
          <Link href="/signin" className="text-sm hover:text-zinc-600">Sign In</Link>
          <Link
            href="/register"
            className="rounded-sm bg-black px-4 py-2 text-sm text-white hover:bg-zinc-800"
          >
            Join Now
          </Link>
        </div>
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

      <div className="border-y border-zinc-200 bg-white">
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
            <div
              key={p.name}
              className="bg-white rounded-lg border border-zinc-200 overflow-hidden flex flex-col"
            >
              <div className="aspect-[4/3] bg-zinc-300" />
              <div className="p-4 flex flex-col gap-3">
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
                      <span className="font-medium">${p.price}</span>
                      <span className="text-zinc-500"> / call</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs">
                      <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{p.rating}</span>
                      <span className="text-zinc-500">· {p.calls} calls</span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-zinc-600 leading-relaxed">{p.bio}</p>
                <button className="border border-zinc-300 rounded-sm py-2 text-sm hover:bg-zinc-50 mt-auto">
                  View profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
