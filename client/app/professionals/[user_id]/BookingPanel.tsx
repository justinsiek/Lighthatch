"use client";

import { useState } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ShieldCheck } from "lucide-react";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

type Pricing = Record<string, number>;

export function BookingPanel({
  firstName,
  pricing,
}: {
  firstName: string;
  pricing: Pricing;
}) {
  const sortedDurations = Object.keys(pricing)
    .map(Number)
    .sort((a, b) => a - b);

  const [selectedDuration, setSelectedDuration] = useState<number>(
    sortedDurations[0] ?? 30,
  );
  const [notes, setNotes] = useState("");

  const priceCents = pricing[String(selectedDuration)] ?? 0;

  return (
    <div className="border border-zinc-200 rounded-sm p-6 sticky top-6 bg-white">
      <h2 className={`${jakarta.className} text-xl font-light tracking-tight`}>
        Book a call with {firstName}
      </h2>
      <p className="mt-1 text-sm text-zinc-600">
        <span className="font-medium text-zinc-900">${priceCents / 100}</span>
        <span className="text-zinc-500"> for a {selectedDuration} min call</span>
      </p>

      <div className="mt-6">
        <label className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          Select duration
        </label>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {sortedDurations.map((d) => {
            const selected = d === selectedDuration;
            return (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDuration(d)}
                className={`py-3 rounded-sm border flex flex-col items-center gap-0.5 cursor-pointer transition-colors ${
                  selected
                    ? "border-black bg-zinc-50"
                    : "border-zinc-200 hover:border-zinc-400"
                }`}
              >
                <div className="text-sm font-medium">{d} min</div>
                <div className="text-xs text-zinc-500">${pricing[String(d)] / 100}</div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6">
        <label className="text-xs uppercase tracking-[0.2em] text-zinc-500">
          What you want to learn{" "}
          <span className="text-zinc-400 normal-case tracking-normal">(optional)</span>
        </label>
        <textarea
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="A few sentences help the professional prepare."
          className="mt-2 w-full border border-zinc-300 rounded-sm px-3 py-2 text-sm outline-none focus:border-zinc-500 resize-none leading-relaxed"
        />
      </div>

      <button
        type="button"
        disabled
        className="mt-8 w-full bg-black text-white py-3 rounded-sm text-sm font-medium opacity-60 cursor-not-allowed"
        title="Booking requests aren’t live yet"
      >
        Send request
      </button>
      <div className="mt-3 flex items-start gap-2 text-xs text-zinc-500">
        <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.75} />
        <span>
          {firstName} will review your request and accept, decline, or suggest another time.
          No payment required to send a request.
        </span>
      </div>
    </div>
  );
}
