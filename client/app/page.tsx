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

export default function Page() {
  return (
    <main>
      <section className="relative bg-black text-white bg-cover bg-[center_17%]" style={{ backgroundImage: "url('/pedro-lastra-Nyvq2juw4_o-unsplash.jpg')" }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
        <nav className="relative flex items-center justify-between px-18 py-6">
          <div className="text-3xl font-light">Lighthatch</div>
          <div className="flex items-center gap-10 text-md text-zinc-300 text-sm">
            <a href="#" className="hover:text-white">Browse</a>
            <a href="#" className="hover:text-white">For Professionals</a>
            <a href="#" className="hover:text-white">How it Works</a>
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="text-zinc-200 hover:text-white text-sm">Sign In</a>
            <a
              href="#"
              className="rounded-lg bg-white px-4 py-2 text-sm text-black hover:bg-zinc-100"
            >
              Join Now
            </a>
          </div>
        </nav>

        <div className="relative px-18 pt-20 pb-32 max-w-4xl">
          <p className="text-xs uppercase tracking-[0.25em] text-zinc-300">
            Talk to people who know the work
          </p>
          <h1 className="mt-6 font-serif text-6xl leading-[1.1]">
            Open a window into any industry before you build.
          </h1>
          <p className="mt-6 max-w-xl text-lg font-light text-zinc-300">
            Browse professionals with real industry experience, see what they
            know, and book short paid calls directly.
          </p>
          <div className="mt-8 flex gap-3">
            <a
              href="#"
              className="rounded-lg bg-white px-6 py-3 font-sm text-black hover:bg-zinc-100"
            >
              Browse Professionals
            </a>
            <a
              href="#"
              className="rounded-lg border border-white px-6 py-3 font-sm text-white hover:bg-white/10"
            >
              Become a Professional
            </a>
          </div>
        </div>
      </section>

      <div className="relative h-0 z-10">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl px-12">
          <div className="flex items-center bg-white rounded-lg shadow-md px-6 py-5">
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

      <section className="bg-zinc-50 pt-24 pb-32">
        <div className="px-18 flex items-end justify-between mb-8">
          <h2 className="text-2xl">Featured professionals</h2>
          <a href="#" className="text-sm text-zinc-700 hover:text-black">
            View all professionals →
          </a>
        </div>
        <div className="px-18 grid grid-cols-5 gap-5">
          {professionals.map((p) => (
            <div
              key={p.name}
              className="bg-white rounded-2xl border border-zinc-200 p-5 flex flex-col gap-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-zinc-300" />
                  <div>
                    <div className="font-medium text-md tracking-tight">{p.name}</div>
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
                      className="bg-white border border-zinc-300 text-zinc-700 text-xs rounded-lg px-2.5 py-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <button className="border border-zinc-300 rounded-lg py-2 text-sm hover:bg-zinc-50">
                View profile
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
