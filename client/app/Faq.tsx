"use client";

import { useState } from "react";

type Item = { q: string; a: string };

export function Faq({ items }: { items: Item[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="border-t border-zinc-200 min-h-[400px]">
      {items.map((item, i) => (
        <FaqItem
          key={item.q}
          item={item}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? null : i)}
        />
      ))}
    </div>
  );
}

function FaqItem({
  item,
  open,
  onToggle,
}: {
  item: Item;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-zinc-200">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left cursor-pointer"
      >
        <span className="text-base font-medium text-zinc-900">{item.q}</span>
        <svg
          className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <div
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm text-zinc-600 leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  );
}
