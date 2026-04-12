"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "Beranda",
    icon: "home",
    activeIcon: "home",
  },
  {
    href: "/wishlist",
    label: "Tersimpan",
    icon: "favorite",
    activeIcon: "favorite",
  },
  {
    href: "/status",
    label: "Pesanan",
    icon: "receipt_long",
    activeIcon: "receipt_long",
  },
  {
    href: "/profil",
    label: "Akun",
    icon: "person",
    activeIcon: "person",
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-t border-outline-variant/20 shadow-bottom-nav bottom-nav-safe">
      <div className="flex items-center justify-around h-16 px-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          // Exact match for home, prefix match for others
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 px-3 py-2 rounded-xl transition-all duration-200 min-w-[56px]",
                isActive
                  ? "text-primary"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              <span
                className={cn(
                  "material-symbols-outlined text-[22px]",
                  isActive && "filled"
                )}
                style={{
                  fontVariationSettings: isActive
                    ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                {isActive ? item.activeIcon : item.icon}
              </span>

              <span
                className={cn(
                  "text-[10px] font-bold tracking-wide",
                  isActive ? "text-primary" : "text-on-surface-variant"
                )}
              >
                {item.label}
              </span>

              {isActive && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
