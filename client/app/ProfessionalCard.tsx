import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export type Professional = {
  user_id: string;
  name: string;
  role: string;
  industry: string;
  bio: string;
  pricing: Record<string, number>;
  photo_url: string | null;
  linkedin_url: string | null;
};

export function minPriceDollars(pricing: Record<string, number>): number {
  const cents = Math.min(...Object.values(pricing));
  return Math.round(cents / 100);
}

export async function getProfessionals(): Promise<Professional[]> {
  try {
    const res = await fetch(`${API_URL}/api/professionals`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export function ProfessionalCard({ pro }: { pro: Professional }) {
  return (
    <Link
      href={`/professionals/${pro.user_id}`}
      className="bg-white rounded-lg border border-zinc-200 overflow-hidden flex flex-col hover:border-zinc-400 transition-colors"
    >
      <div className="aspect-square bg-zinc-300 overflow-hidden">
        {pro.photo_url && (
          <img
            src={pro.photo_url}
            alt={pro.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="p-4 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className={`${jakarta.className} font-medium tracking-tight truncate`}
              >
                {pro.name}
              </span>
              <BadgeCheck
                className="w-4 h-4 text-blue-500 fill-blue-100 shrink-0"
                strokeWidth={2}
              />
            </div>
            <div className="text-sm truncate">{pro.role}</div>
            <div className="text-xs text-zinc-500">{pro.industry}</div>
          </div>
          <div className="flex flex-col gap-1 items-end shrink-0 text-right">
            <div className="text-sm">
              <span className="text-zinc-500 text-xs">from </span>
              <span className="font-medium">${minPriceDollars(pro.pricing)}</span>
            </div>
          </div>
        </div>
        <p className="text-md text-zinc-600 leading-relaxed line-clamp-4">
          {pro.bio}
        </p>
      </div>
    </Link>
  );
}
