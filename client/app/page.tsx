import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Faq } from "./Faq";
import { NavUser } from "./NavUser";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400"],
});

const professionals = [
  {
    name: "Freight Dispatcher",
    field: "Logistics",
    price: 30,
    topics: ["load boards", "broker communication"],
  },
  {
    name: "Title & Escrow Officer",
    field: "Real Estate",
    price: 40,
    topics: ["closing workflows", "title issues", "documents"],
  },
  {
    name: "Restaurant Operator",
    field: "Hospitality",
    price: 25,
    topics: ["staffing", "kitchen ops", "margins"],
  },
  {
    name: "Property Manager",
    field: "Real Estate",
    price: 35,
    topics: ["maintenance", "leasing", "tenant workflows"],
  },
  {
    name: "Insurance Underwriter",
    field: "Insurance",
    price: 45,
    topics: ["risk assessment", "policy pricing", "claims"],
  },
];

const faqs = [
  {
    q: "How much does a call cost?",
    a: "Each professional sets their own rate. Most calls range from $20 to $50 for 15 to 30 minutes.",
  },
  {
    q: "Who are the professionals?",
    a: "Real workers from the industry; dispatchers, restaurant operators, title officers, property managers, and more. Not consultants or expert-network gigs.",
  },
  {
    q: "What if a professional doesn't accept my request?",
    a: "You aren't charged. You can request another professional anytime, or message them with more context and try again.",
  },
  {
    q: "How long are the calls?",
    a: "Professionals choose their own durations. Most offer 15 or 30 minute calls.",
  },
  {
    q: "When do I pay?",
    a: "Payments aren't live yet. Once enabled, you'll be charged when your request is accepted by the professional.",
  },
];

export default function Page() {
  return (
    <main>
      <section className="relative bg-black text-white bg-cover bg-[center_5%]" style={{ backgroundImage: "url('/pexels-kelly-37143582.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <nav className="relative flex items-center justify-between px-18 py-6">
          <div className={`${jakarta.className} text-2xl font-light tracking-tighter`}>Lighthatch</div>
          <div className="flex items-center gap-10 text-md text-zinc-300">
            <Link href="/browse" className="font-light hover:text-white">Browse</Link>
            <Link href="/professionals" className="font-light hover:text-white">Become A Professional</Link>
          </div>
          <NavUser variant="dark" />
        </nav>

        <div className="relative px-18 pt-20 pb-32 max-w-4xl">
          <h1 className={`${jakarta.className} mt-6 font-light text-6xl tracking-tight leading-[1.05]`}>
            Don’t guess what an industry needs. Talk to the people who do the work.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-zinc-300">
            Browse professionals with firsthand experience and book short calls to understand workflows, pain points, and what's actually worth building.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              href="/browse"
              className="rounded-sm bg-white px-6 py-3 font-sm text-black hover:bg-zinc-100"
            >
              Browse Professionals
            </Link>
            <Link
              href="/professionals"
              className="rounded-sm border border-white px-6 py-3 font-sm text-white  hover:bg-white/10"
            >
              Become a Professional
            </Link>
          </div>
        </div>
      </section>

      <div className="relative h-0 z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-12">
          <div className="flex items-center bg-white rounded-sm shadow-md px-6 py-5">
          <svg
            className="w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Freight dispatcher, title officer, restaurant operator..."
            className="flex-1 bg-transparent outline-none ml-3 text-zinc-700 placeholder:text-zinc-400"
          />
          <div className="flex items-center gap-2 text-sm text-zinc-600 border-l border-zinc-200 pl-5 ml-5">
            All industries
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            </div>
          </div>
        </div>
      </div>

      <section className="bg-zinc-50 pt-20 pb-20">
        <div className="px-18 flex items-end justify-between mb-8">
          <h2 className={`${jakarta.className} text-3xl font-light tracking-tight text-center`}>Featured professionals</h2>
          <Link href="/browse" className="text-sm text-zinc-700 hover:text-black">
            View all professionals →
          </Link>
        </div>
        <div className="px-18 grid grid-cols-5 gap-5">
          {professionals.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-sm border border-zinc-200 p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-300" />
                  <div>
                    <div className={`${jakarta.className} font-medium text-md tracking-tight`}>{p.name}</div>
                    <div className="text-xs text-zinc-500 tracking-tight">{p.field}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-md">${p.price}</div>
                  <div className="text-xs text-zinc-500">/ 30 min</div>
                </div>
              </div>
              <div>
                <div className="text-xs text-zinc-500 mb-2">Topics:</div>
                <div className="flex flex-wrap gap-1.5">
                  {p.topics.map((t) => (
                    <span
                      key={t}
                      className="bg-white border border-zinc-300 text-zinc-700 text-xs rounded-sm px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button className="border border-zinc-300 rounded-sm py-2 text-sm hover:bg-zinc-50">
                View profile
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-zinc-50 pb-20">
        <div className="px-18 max-w-6xl mx-auto">
          <h2 className={`${jakarta.className} text-3xl font-light tracking-tight text-center`}>Common questions</h2>
          <div className="mt-10">
            <Faq items={faqs} />
          </div>
        </div>
      </section>

      <section className="bg-black text-white py-20">
        <div className="px-18 text-center">
          <h2 className={`${jakarta.className} text-5xl font-light tracking-tight leading-[1.05] max-w-3xl mx-auto`}>
            Talk to people who do the work.
          </h2>
          <div className="mt-8 flex gap-3 justify-center">
            <Link
              href="/browse"
              className="rounded-sm bg-white px-6 py-3 font-light text-black hover:bg-zinc-100"
            >
              Browse Professionals
            </Link>
            <Link
              href="/professionals"
              className="rounded-sm border border-white px-6 py-3 font-light text-white hover:bg-white/10"
            >
              Become a Professional
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-black border-t border-zinc-800 text-zinc-400">
        <div className="px-18 py-16 flex justify-between items-start">
          <div>
            <div className={`${jakarta.className} text-8xl text-white font-light tracking-tighter`}>Lighthatch</div>
          </div>
          <div className="flex gap-16 text-sm">
            <div>
              <div className="text-white mb-3 font-medium">Product</div>
              <div className="flex flex-col gap-2">
                <Link href="/browse" className="hover:text-white">Browse</Link>
                <Link href="/professionals" className="hover:text-white">Become A Professional</Link>
              </div>
            </div>
            <div>
              <div className="text-white mb-3 font-medium">Company</div>
              <div className="flex flex-col gap-2">
                <a href="#" className="hover:text-white">About</a>
                <a href="#" className="hover:text-white">Contact</a>
                <a href="#" className="hover:text-white">Careers</a>
              </div>
            </div>
            <div>
              <div className="text-white mb-3 font-medium">Legal</div>
              <div className="flex flex-col gap-2">
                <a href="#" className="hover:text-white">Terms</a>
                <a href="#" className="hover:text-white">Privacy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
