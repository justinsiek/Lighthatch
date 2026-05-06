"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NavUser } from "./NavUser";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500"],
});

const LINKS: { href: string; label: string }[] = [
  { href: "/browse", label: "Browse" },
  { href: "/bookings", label: "Bookings" },
  { href: "/professionals", label: "Become A Professional" },
];

export function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <nav className="border-b border-zinc-200 bg-white px-12 py-3 flex items-center justify-between">
      <div className="flex items-center gap-12">
        <Link
          href="/"
          className={`${jakarta.className} text-2xl font-light tracking-tighter`}
        >
          Lighthatch
        </Link>
        <div className="flex items-center gap-8">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive(link.href)
                  ? "font-light"
                  : "font-light text-zinc-600 hover:text-black"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <NavUser />
    </nav>
  );
}
