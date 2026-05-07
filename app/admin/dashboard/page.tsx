"use client";

import { MOCK_ADMIN_DASHBOARD, MOCK_RECENT_ACTIVITY } from "@/lib/mock";
import { KPICard } from "@/components/shared/KPICard";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatRupiah, formatDate } from "@/lib/utils";
import Link from "next/link";

const stats = MOCK_ADMIN_DASHBOARD;

export default function AdminDashboardPage() {
  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Dashboard Admin</h1>
        <p className="text-sm text-on-surface-variant mt-1">Ringkasan operasional armada dan pemesanan.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard label="Total Armada" value={stats.total_vehicles}
          subtitle={`${stats.available_vehicles} tersedia · ${stats.rented_vehicles} disewa`}
          icon="directions_car" accent="primary"
          delta={{ value: "+2 dari bulan lalu", positive: true }}
        />
        <KPICard label="Pesanan Bulan Ini" value={stats.total_bookings}
          subtitle={`${stats.active_bookings} aktif · ${stats.pending_bookings} pending`}
          icon="receipt_long" accent="primary"
          delta={{ value: "+15% dari bulan lalu", positive: true }}
        />
        <KPICard label="Pendapatan Bulanan" value={formatRupiah(stats.monthly_revenue)}
          subtitle={`${stats.completed_bookings} pesanan selesai`}
          icon="payments" accent="success"
          delta={{ value: "-4.4% dari bulan lalu", positive: false }}
        />
        <KPICard label="Utilisasi Armada" value={`${stats.fleet_utilization}%`}
          subtitle="Rata-rata utilisasi"
          icon="bar_chart" accent="warning"
        />
      </div>

      {/* Revenue Chart */}
      <AnimatedCard className="p-5">
        <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Tren Pendapatan Bulanan</h3>
        <div className="h-48 flex items-end gap-2">
          {stats.revenue_trend.map((item) => {
            const maxVal = Math.max(...stats.revenue_trend.map((d) => d.value));
            const height = (item.value / maxVal) * 100;
            return (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-on-surface-variant">
                  {item.value >= 1000000 ? `${(item.value / 1000000).toFixed(1)}M` : `${(item.value / 1000).toFixed(0)}k`}
                </span>
                <div
                  className="w-full bg-primary/20 rounded-t-lg transition-all"
                  style={{ height: `${height}%` }}
                >
                  <div className="h-full bg-primary rounded-t-lg" style={{ opacity: 0.8 }} />
                </div>
                <span className="text-[10px] text-outline">{item.label}</span>
              </div>
            );
          })}
        </div>
      </AnimatedCard>

      {/* Two-column: Recent Activity + Quick Links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <AnimatedCard className="p-5">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Aktivitas Terbaru</h3>
          <div className="space-y-3">
            {MOCK_RECENT_ACTIVITY.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-outline-variant/10 last:border-none last:pb-0">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                  act.type === "booking" ? "bg-primary/10 text-primary" :
                  act.type === "payment" ? "bg-tertiary-container/30 text-on-tertiary-container" :
                  "bg-surface-container text-outline"
                }`}>
                  <span className="material-symbols-outlined text-[16px]">
                    {act.type === "booking" ? "receipt_long" :
                     act.type === "payment" ? "payments" :
                     act.type === "vehicle" ? "directions_car" : "person"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-on-surface">{act.message}</p>
                  <p className="text-xs text-outline mt-0.5">{formatDate(act.timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </AnimatedCard>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-headline text-lg font-bold text-on-surface">Aksi Cepat</h3>
          {[
            { label: "Kelola Armada", href: "/admin/kendaraan", icon: "directions_car", desc: "Lihat dan kelola daftar kendaraan" },
            { label: "Verifikasi Pesanan", href: "/admin/pesanan", icon: "verified", desc: `Review ${stats.pending_bookings} pesanan pending` },
            { label: "Konfirmasi Pembayaran", href: "/admin/pembayaran", icon: "payments", desc: `${stats.pending_payments} pembayaran menunggu` },
          ].map((action) => (
            <Link key={action.href} href={action.href}>
              <AnimatedCard className="p-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]">{action.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-on-surface text-sm">{action.label}</p>
                  <p className="text-xs text-on-surface-variant">{action.desc}</p>
                </div>
                <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
              </AnimatedCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
