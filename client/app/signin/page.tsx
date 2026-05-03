import Link from "next/link";
import { Plus_Jakarta_Sans } from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

export default function SignInPage() {
  return (
    <main className="min-h-screen flex">
      <div
        className="w-1/2 relative bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/20 to-transparent" />
        <Link
          href="/"
          className={`${jakarta.className} absolute top-6 left-6 text-2xl font-light tracking-tighter text-white`}
        >
          Lighthatch
        </Link>
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-md">
            <h1 className={`${jakarta.className} text-3xl font-light tracking-tight`}>
              Sign into your account
            </h1>
            <form className="mt-4 flex flex-col gap-5">
              <div>
                <label className="text-sm text-zinc-700 font-medium">Email</label>
                <input
                  type="email"
                  className="mt-1.5 w-full border border-zinc-300 rounded-sm px-3 py-3 text-sm outline-none focus:border-zinc-500"
                />
              </div>
              <div>
                <label className="text-sm text-zinc-700 font-medium">Password</label>
                <input
                  type="password"
                  className="mt-1.5 w-full border border-zinc-300 rounded-sm px-3 py-3 text-sm outline-none focus:border-zinc-500"
                />
              </div>
              <button
                type="submit"
                className="mt-2 rounded-sm bg-black text-white py-3 text-sm font-medium hover:bg-zinc-800"
              >
                Sign in
              </button>
            </form>

            <p className="mt-6 text-xs text-zinc-600 text-center">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-black font-medium hover:underline">
                Create one
              </Link>
            </p>
        </div>
      </div>
    </main>
  );
}
