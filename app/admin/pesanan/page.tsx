import prisma from "@/lib/prisma";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Tabs } from "@/components/shared/Tabs";
import { formatRupiah, formatDate } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import type { Booking, Vehicle } from "@prisma/client";

type BookingWithVehicle = Booking & { vehicle: Vehicle };

const STATUS_TABS = [
  { key: "all", label: "Semua" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Disetujui" },
  { key: "active", label: "Aktif" },
  { key: "completed", label: "Selesai" },
  { key: "cancelled", label: "Batal/Tolak" },
];

async function BookingList({ tab }: { tab: string }) {
  const where = tab === "all"
    ? {}
    : tab === "cancelled"
      ? { status: { in: ["cancelled", "rejected"] as ("cancelled" | "rejected")[] } }
      : { status: tab as "pending" | "approved" | "active" | "completed" };

  const bookings = (await prisma.booking.findMany({
    where,
    include: { vehicle: true },
    orderBy: { created_at: "desc" },
  })) as BookingWithVehicle[];

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <Link key={b.id} href={`/admin/pesanan/${b.booking_code}`}>
          <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[28px]">directions_car</span>
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-on-surface text-base">{b.vehicle.brand} {b.vehicle.name}</p>
                  <p className="text-xs text-on-surface-variant">{b.guest_name ?? "Guest"} · <span className="font-mono">{b.booking_code}</span></p>
                  <p className="text-xs text-outline">{formatDate(b.start_date.toISOString())} — {formatDate(b.end_date.toISOString())} ({b.duration_days} hari)</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:text-right">
                <div>
                  <p className="font-bold text-primary text-base">{formatRupiah(b.total_price)}</p>
                  <p className="text-xs text-on-surface-variant">{b.rental_type === "self_drive" ? "Lepas Kunci" : "Dengan Supir"}</p>
                </div>
                <StatusBadge status={b.status} />
              </div>
            </div>
          </div>
        </Link>
      ))}
      {bookings.length === 0 && (
        <div className="text-center py-16 bg-surface-container-low rounded-2xl">
          <span className="material-symbols-outlined text-[64px] text-outline block mb-3">receipt_long</span>
          <p className="font-bold text-on-surface text-lg">Tidak ada pesanan</p>
          <p className="text-sm text-on-surface-variant mt-1">Belum ada pesanan dengan status ini</p>
        </div>
      )}
    </div>
  );
}

async function BookingCount() {
  const count = await prisma.booking.count();
  return <p className="text-sm text-on-surface-variant mt-1">{count} total pesanan</p>;
}

export default function AdminBookingsPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const tab = searchParams.tab ?? "all";

  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">receipt_long</span>
            </div>
            <div>
              <h1 className="font-headline text-3xl font-bold text-on-surface">Manajemen Pesanan</h1>
              <Suspense fallback={<p className="text-sm text-on-surface-variant mt-1">Memuat...</p>}>
                <BookingCount />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      <Tabs tabs={STATUS_TABS} activeKey={tab} baseUrl="/admin/pesanan" paramName="tab" />

      <Suspense fallback={
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-24 bg-surface-container rounded-2xl" />
          ))}
        </div>
      }>
        <BookingList tab={tab} />
      </Suspense>
    </div>
  );
}
