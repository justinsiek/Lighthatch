import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import { BadgeCheck, ExternalLink } from "lucide-react";
import { Nav } from "../../Nav";
import { BookingPanel } from "./BookingPanel";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

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

async function getProfessional(id: string): Promise<Professional | null> {
  try {
    const res = await fetch(`${API_URL}/api/professionals/${id}`);
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function ProfessionalPage({
  params,
}: {
  params: Promise<{ user_id: string }>;
}) {
  const { user_id } = await params;
  const pro = await getProfessional(user_id);
  if (!pro) notFound();

  const firstName = pro.name?.split(" ")[0] ?? "this pro";

  return (
    <main className="bg-white min-h-screen">
      <Nav />

      <div className="max-w-7xl mx-auto px-12 pt-10 pb-20">
        <Link
          href="/browse"
          className="text-sm text-zinc-600 hover:text-black"
        >
          ← Back to browse
        </Link>

        <div className="mt-6 grid grid-cols-3 gap-10">
          <div className="col-span-2 flex flex-col gap-10">
            <div className="flex gap-8">
              <div className="w-72 aspect-square bg-zinc-200 rounded-sm overflow-hidden shrink-0">
                {pro.photo_url && (
                  <img
                    src={pro.photo_url}
                    alt={pro.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <div className="flex items-center gap-2">
                  <h1
                    className={`${jakarta.className} text-4xl font-light tracking-tight`}
                  >
                    {pro.name}
                  </h1>
                  <BadgeCheck
                    className="w-6 h-6 text-blue-500 fill-blue-100"
                    strokeWidth={2}
                  />
                </div>
                <div
                  className={`${jakarta.className} mt-2 text-xl font-light text-zinc-800`}
                >
                  {pro.role}
                </div>
                <div className="mt-1 text-sm text-zinc-500">{pro.industry}</div>

                {pro.linkedin_url && (
                  <a
                    href={pro.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-sm text-zinc-700 hover:text-black"
                  >
                    <ExternalLink className="w-4 h-4" strokeWidth={1.75} />
                    LinkedIn
                  </a>
                )}
              </div>
            </div>

            <div>
              <h2
                className={`${jakarta.className} text-lg font-medium tracking-tight border-b border-zinc-200 pb-2`}
              >
                About
              </h2>
              <p className="mt-4 text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                {pro.bio}
              </p>
            </div>
          </div>

          <div className="col-span-1">
            <BookingPanel
              firstName={firstName}
              pricing={pro.pricing}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
