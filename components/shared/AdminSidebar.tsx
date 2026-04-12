"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/pesanan", label: "Bookings", icon: "calendar_today" },
  { href: "/admin/armada", label: "Fleet", icon: "directions_car" },
  { href: "/admin/laporan", label: "Reports", icon: "analytics" },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 py-5 mb-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary flex-shrink-0">
          <span className="material-symbols-outlined text-[20px]">
            directions_car
          </span>
        </div>
        <div>
          <h1 className="text-base font-black font-headline text-primary tracking-tight leading-tight">
            Mission Control
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            Fleet Operations
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-item", isActive && "nav-item-active")}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  fontVariationSettings: isActive
                    ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-outline-variant/20 pt-4 space-y-1">
        <Link href="/admin/pengaturan" className="nav-item">
          <span className="material-symbols-outlined text-[20px]">settings</span>
          <span>Settings</span>
        </Link>
        <button className="nav-item w-full text-left text-error hover:bg-error-container/20 hover:text-error">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

// ─── Owner Sidebar (variant) ───
const ownerNavItems = [
  { href: "/owner/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/owner/laporan", label: "Reports", icon: "analytics" },
  { href: "/owner/pengaturan", label: "Settings", icon: "settings" },
];

export function OwnerSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2 py-5 mb-2">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-on-primary flex-shrink-0">
          <span className="material-symbols-outlined text-[20px]">bar_chart</span>
        </div>
        <div>
          <h1 className="text-base font-black font-headline text-primary tracking-tight leading-tight">
            Executive
          </h1>
          <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
            Owner Dashboard
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {ownerNavItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn("nav-item", isActive && "nav-item-active")}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{
                  fontVariationSettings: isActive
                    ? "'FILL' 1, 'wght' 500, 'GRAD' 0, 'opsz' 24"
                    : "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24",
                }}
              >
                {item.icon}
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-outline-variant/20 pt-4">
        <button className="nav-item w-full text-left text-error hover:bg-error-container/20 hover:text-error">
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
