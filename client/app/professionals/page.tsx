"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Nav } from "../Nav";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

const INDUSTRIES = [
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

const DURATION_OPTIONS = [15, 30, 60] as const;
type Duration = (typeof DURATION_OPTIONS)[number];

type PricingDraft = Partial<Record<Duration, string>>;

type FormData = {
  role: string;
  industry: string;
  linkedin_url: string;
  bio: string;
  pricing: PricingDraft;
  photo_url: string | null;
};

const TOTAL_STEPS = 4;

export default function BecomeProfessionalPage() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState<FormData>({
    role: "",
    industry: "",
    linkedin_url: "",
    bio: "",
    pricing: { 30: "" },
    photo_url: null,
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [photoUploading, setPhotoUploading] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/me`, { credentials: "include" }).then((r) => {
      if (!r.ok) {
        router.replace("/signin?next=/professionals");
        return;
      }
      setAuthChecked(true);
    });
  }, [router]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function toggleDuration(d: Duration) {
    setData((cur) => {
      const next = { ...cur.pricing };
      if (d in next) delete next[d];
      else next[d] = "";
      return { ...cur, pricing: next };
    });
  }

  function updatePrice(d: Duration, value: string) {
    setData((cur) => ({
      ...cur,
      pricing: { ...cur.pricing, [d]: value },
    }));
  }

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setError(null);
    setPhotoUploading(true);
    try {
      const formData = new FormData();
      formData.append("photo", file);
      const res = await fetch(`${API_URL}/api/professionals/photo`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.message ?? "Photo upload failed");
        return;
      }
      setData((cur) => ({ ...cur, photo_url: body.photo_url }));
    } catch {
      setError("Could not reach the server. Is it running?");
    } finally {
      setPhotoUploading(false);
    }
  }

  function canAdvance(): boolean {
    if (step === 1) return data.role.trim().length > 0 && data.industry !== "";
    if (step === 2) return data.bio.trim().length > 0 && data.bio.length <= 150;
    if (step === 3) {
      const entries = Object.entries(data.pricing);
      return entries.length > 0 && entries.every(([, v]) => Number(v) > 0);
    }
    if (step === 4) return true;
    return false;
  }

  async function submit(includePhoto: boolean = true) {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`${API_URL}/api/professionals`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          role: data.role.trim(),
          industry: data.industry,
          bio: data.bio.trim(),
          pricing: Object.fromEntries(
            Object.entries(data.pricing).map(([d, v]) => [d, Math.round(Number(v) * 100)])
          ),
          linkedin_url: data.linkedin_url.trim() || null,
          photo_url: includePhoto ? data.photo_url : null,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(body.message ?? "Could not create profile");
        return;
      }
      router.push("/browse");
      router.refresh();
    } catch {
      setError("Could not reach the server. Is it running?");
    } finally {
      setSubmitting(false);
    }
  }

  if (!authChecked) {
    return <main className="min-h-screen bg-white" />;
  }

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Nav />

      <div className="flex-1 flex items-start justify-center px-6 pt-24 pb-12">
        <div className="w-full max-w-lg">
          <div className="text-xs uppercase tracking-[0.2em] text-zinc-500">Step {step} of {TOTAL_STEPS}</div>
          <div className="mt-3 flex items-center gap-2">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
              <div key={n} className="h-1 flex-1 bg-zinc-200 rounded-sm overflow-hidden">
                <div
                  className="h-full bg-black rounded-sm transition-[width] duration-500 ease-out"
                  style={{ width: n <= step ? "100%" : "0%" }}
                />
              </div>
            ))}
          </div>

          {step === 1 && (
            <>
              <h1 className={`${jakarta.className} mt-10 text-3xl font-light tracking-tight`}>
                About you
              </h1>
              <p className="mt-2 text-sm text-zinc-600">
                What do you do, and which industry are you in? You can change any of this later in
                your settings.
              </p>
              <div className="mt-8 flex flex-col gap-5">
                <div>
                  <label className="text-sm text-zinc-700 font-medium">Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Freight Dispatcher"
                    value={data.role}
                    onChange={(e) => update("role", e.target.value)}
                    className="mt-1.5 w-full border border-zinc-300 rounded-sm px-3 py-3 text-sm outline-none focus:border-zinc-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-zinc-700 font-medium">Industry</label>
                  <select
                    value={data.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    className="mt-1.5 w-full border border-zinc-300 rounded-sm px-3 py-3 text-sm outline-none focus:border-zinc-500 bg-white"
                  >
                    <option value="">Select an industry</option>
                    {INDUSTRIES.map((ind) => (
                      <option key={ind} value={ind}>{ind}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-zinc-700 font-medium">
                    LinkedIn <span className="text-zinc-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://linkedin.com/in/you"
                    value={data.linkedin_url}
                    onChange={(e) => update("linkedin_url", e.target.value)}
                    className="mt-1.5 w-full border border-zinc-300 rounded-sm px-3 py-3 text-sm outline-none focus:border-zinc-500"
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <h1 className={`${jakarta.className} mt-10 text-3xl font-light tracking-tight`}>
                Your bio
              </h1>
              <p className="mt-3 text-sm text-zinc-600">
                Tell us a little bit about yourself! Your experience, and things you're interested in. Don't worry, you can always edit this later. (150 character limit)
              </p>
              <div className="mt-6 relative">
                <textarea
                  rows={3}
                  placeholder="e.g. 7+ years dispatching freight for mid-size carriers. I help operators understand load boards, broker relationships, and rate negotiation."
                  value={data.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  className={`w-full border rounded-sm px-3 py-3 pb-7 text-sm outline-none resize-none leading-relaxed ${
                    data.bio.length > 150
                      ? "border-red-500 focus:border-red-500"
                      : "border-zinc-300 focus:border-zinc-500"
                  }`}
                />
                <div
                  className={`absolute bottom-4 right-4 text-xs pointer-events-none ${
                    data.bio.length > 150 ? "text-red-500" : "text-zinc-400"
                  }`}
                >
                  {150 - data.bio.length}
                </div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <h1 className={`${jakarta.className} mt-10 text-3xl font-light tracking-tight`}>
                Pricing
              </h1>
              <p className="mt-2 text-sm text-zinc-600">
                Pick the call lengths you&apos;ll offer and set a price for each. You can adjust
                any time in settings.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {DURATION_OPTIONS.map((d) => {
                  const selected = d in data.pricing;
                  return (
                    <div key={d} className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => toggleDuration(d)}
                        className={`px-4 py-2.5 rounded-sm border text-sm cursor-pointer w-24 shrink-0 ${
                          selected
                            ? "bg-black border-black text-white"
                            : "bg-white border-zinc-300 text-zinc-700 hover:border-zinc-400"
                        }`}
                      >
                        {d} min
                      </button>
                      {selected ? (
                        <div className="flex-1">
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 text-sm">$</span>
                            <input
                              type="number"
                              min="1"
                              placeholder="Amount"
                              value={data.pricing[d] ?? ""}
                              onChange={(e) => updatePrice(d, e.target.value)}
                              className="w-full border border-zinc-300 rounded-sm pl-7 pr-3 py-2.5 text-sm outline-none focus:border-zinc-500"
                            />
                          </div>
                          {Number(data.pricing[d]) > 0 && (
                            <div className="mt-1 text-xs text-zinc-500">
                              You&apos;ll receive ${(Number(data.pricing[d]) * 0.9).toFixed(2)} per call
                              {" "}after Lighthatch&apos;s 10% fee.
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex-1 text-xs text-zinc-400">Not offered</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <h1 className={`${jakarta.className} mt-10 text-3xl font-light tracking-tight`}>
                Add a photo
              </h1>
              <p className="mt-2 text-sm text-zinc-600">
                Helps people put a face to your profile. Optional — you can skip and add one later.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4">
                {data.photo_url ? (
                  <img
                    src={data.photo_url}
                    alt="Your headshot"
                    className="w-40 h-40 rounded-full object-cover border border-zinc-200"
                  />
                ) : (
                  <div className="w-40 h-40 rounded-full bg-zinc-100 border border-dashed border-zinc-300" />
                )}
                <label
                  className={`text-sm cursor-pointer px-4 py-2 rounded-sm border border-zinc-300 hover:bg-zinc-50 ${
                    photoUploading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {photoUploading
                    ? "Uploading..."
                    : data.photo_url
                    ? "Change photo"
                    : "Upload photo"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handlePhotoSelect}
                    disabled={photoUploading}
                    className="hidden"
                  />
                </label>
              </div>
            </>
          )}

          {error && <p className="mt-6 text-sm text-red-600">{error}</p>}

          <div className="mt-6 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="text-sm text-zinc-600 hover:text-black cursor-pointer"
              >
                ← Back
              </button>
            ) : (
              <Link href="/" className="text-sm text-zinc-600 hover:text-black">
                Cancel
              </Link>
            )}

            {step < TOTAL_STEPS ? (
              <button
                type="button"
                onClick={() => canAdvance() && setStep((s) => s + 1)}
                disabled={!canAdvance()}
                className="rounded-sm bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Continue
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => submit(false)}
                  disabled={submitting}
                  className="rounded-sm border border-zinc-300 px-4 py-2.5 text-sm hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Skip
                </button>
                <button
                  type="button"
                  onClick={() => submit(true)}
                  disabled={submitting || photoUploading}
                  className="rounded-sm bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {submitting ? "Creating..." : "Create profile"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
