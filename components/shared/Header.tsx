"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const desktopNavItems = [
  { href: "/", label: "Katalog" },
  { href: "/wishlist", label: "Tersimpan" },
  { href: "/status", label: "Pesanan" },
  { href: "/promo", label: "Promo" },
  { href: "/bantuan", label: "Bantuan" },
];

interface HeaderProps {
  showNotification?: boolean;
  showAccount?: boolean;
}

export function Header({ showNotification = true, showAccount = true }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 shadow-sm transition-all">
      <div className="flex justify-between items-center px-4 md:px-8 h-16 w-full max-w-7xl mx-auto">
        {/* Brand Logo */}
        <Link href="/" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 group active:scale-95 transition-transform">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-md">
              <span className="font-headline font-bold text-lg">r</span>
            </div>
            <span className="font-headline text-xl font-black text-primary tracking-tight">rentCars</span>
          </div>
        </Link>

        {/* Desktop Navigation (Hidden on Mobile) */}
        <nav className="hidden md:flex items-center gap-6">
          {desktopNavItems.map((item) => {
            const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-bold transition-colors py-2",
                  isActive ? "text-primary border-b-2 border-primary" : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* Action Icons */}
        <div className="flex gap-2 md:gap-4 items-center">
          {showNotification && (
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant relative focus:outline-none focus:ring-2 focus:ring-primary/20">
              <span className="material-symbols-outlined">notifications</span>
              {/* Notification Badge */}
              <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-error animate-pulse border border-surface"></span>
            </button>
          )}

          {showAccount && (
            <Link href="/profil" className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary/20">
              <span className="material-symbols-outlined">account_circle</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
