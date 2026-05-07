"use client";

import { MOCK_BOOKINGS } from "@/lib/mock";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Tabs } from "@/components/shared/Tabs";
import { formatRupiah, formatDate } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

const STATUS_TABS = [
  { key: "all", label: "Semua" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Disetujui" },
  { key: "active", label: "Aktif" },
  { key: "completed", label: "Selesai" },
  { key: "cancelled", label: "Batal/Tolak" },
];

export default function AdminBookingsPage() {
  const [tab, setTab] = useState("all");

  const filtered = MOCK_BOOKINGS.filter((b) => {
    if (tab === "all") return true;
    if (tab === "cancelled") return ["cancelled", "rejected"].includes(b.status);
    return b.status === tab;
  });

  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Manajemen Pesanan</h1>
        <p className="text-sm text-on-surface-variant mt-1">{MOCK_BOOKINGS.length} total pesanan</p>
      </div>

      <Tabs tabs={STATUS_TABS} activeKey={tab} onChange={setTab} />

      <div className="space-y-3">
        {filtered.map((b) => (
          <Link key={b.id} href={`/admin/pesanan/${b.booking_code}`}>
            <AnimatedCard className="p-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-outline">directions_car</span>
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-sm">{b.vehicle.brand} {b.vehicle.name}</p>
                    <p className="text-xs text-on-surface-variant">{b.guest_name} · {b.booking_code}</p>
                    <p className="text-xs text-outline">{formatDate(b.start_date)} — {formatDate(b.end_date)} ({b.duration_days} hari)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:text-right">
                  <div>
                    <p className="font-bold text-primary text-sm">{formatRupiah(b.total_price)}</p>
                    <p className="text-[10px] text-on-surface-variant">{b.rental_type === "self_drive" ? "Lepas Kunci" : "Dengan Supir"}</p>
                  </div>
                  <StatusBadge status={b.status as "pending" | "approved" | "active" | "completed" | "cancelled" | "rejected"} />
                </div>
              </div>
            </AnimatedCard>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-on-surface-variant">
            <span className="material-symbols-outlined text-[48px] text-outline mb-3 block">receipt_long</span>
            <p className="font-bold">Tidak ada pesanan</p>
          </div>
        )}
      </div>
    </div>
  );
}
