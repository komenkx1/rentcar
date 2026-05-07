"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const SIDEBAR_ITEMS = [
  { href: "/owner/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/owner/laporan", label: "Laporan", icon: "bar_chart" },
];

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 h-14 flex items-center px-4 gap-3">
        <button onClick={() => setSidebarOpen(true)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <span className="font-headline font-bold text-on-surface">Executive Panel</span>
      </div>

      {sidebarOpen && (
        <div className="fixed inset-0 z-[60] bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={cn(
        "fixed top-0 left-0 z-[70] h-screen w-64 bg-surface-container-low border-r border-outline-variant/20 flex flex-col transition-transform duration-300",
        "lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-4 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center shadow-md">
              <span className="font-headline font-bold text-lg">r</span>
            </div>
            <div>
              <span className="font-headline text-sm font-black text-primary">rentCars</span>
              <p className="text-[10px] text-outline">Executive Dashboard</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  isActive
                    ? "bg-surface-container-lowest text-primary font-bold shadow-card"
                    : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                )}
              >
                <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-outline-variant/20">
          <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all">
            <span className="material-symbols-outlined text-[20px]">exit_to_app</span>
            Ke Website
          </Link>
        </div>
      </aside>

      <main className="lg:ml-64 min-h-screen pt-14 lg:pt-0">
        {children}
      </main>
    </div>
  );
}
