"use client";

import { MOCK_ADMIN_DASHBOARD, MOCK_VEHICLES } from "@/lib/mock";
import { KPICard } from "@/components/shared/KPICard";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatRupiah } from "@/lib/utils";

const stats = MOCK_ADMIN_DASHBOARD;

export default function AdminReportsPage() {
  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Laporan</h1>
        <p className="text-sm text-on-surface-variant mt-1">Analisis performa armada dan pemesanan.</p>
      </div>

      {/* Revenue Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard label="Pendapatan Bulanan" value={formatRupiah(stats.monthly_revenue)} accent="success" />
        <KPICard label="Total Pelanggan" value={stats.total_customers} accent="primary" />
        <KPICard label="Pesanan Selesai" value={stats.completed_bookings} accent="primary" />
        <KPICard label="Utilisasi" value={`${stats.fleet_utilization}%`} accent="warning" />
      </div>

      {/* Revenue Chart */}
      <AnimatedCard className="p-5">
        <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Pendapatan 6 Bulan Terakhir</h3>
        <div className="h-64 flex items-end gap-2">
          {stats.revenue_trend.map((item) => {
            const maxVal = Math.max(...stats.revenue_trend.map((d) => d.value));
            const height = (item.value / maxVal) * 100;
            return (
              <div key={item.label} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] font-bold text-on-surface-variant">
                  {(item.value / 1000000).toFixed(1)}M
                </span>
                <div className="w-full bg-primary/20 rounded-t-lg transition-all relative" style={{ height: `${height}%` }}>
                  <div className="absolute inset-0 bg-primary rounded-t-lg opacity-80" />
                </div>
                <span className="text-[10px] text-outline">{item.label}</span>
              </div>
            );
          })}
        </div>
      </AnimatedCard>

      {/* Fleet Utilization Table */}
      <AnimatedCard className="p-5">
        <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Status Armada</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container text-left rounded-lg">
                <th className="p-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider rounded-l-lg">Kendaraan</th>
                <th className="p-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</th>
                <th className="p-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Harga/Hari</th>
                <th className="p-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider rounded-r-lg">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {MOCK_VEHICLES.map((v) => (
                <tr key={v.id} className="hover:bg-surface-container-low">
                  <td className="p-3 font-medium text-on-surface">{v.brand} {v.name}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      v.status === "available" ? "bg-tertiary-fixed text-on-tertiary-fixed" :
                      v.status === "rented" ? "bg-primary-fixed text-on-primary-fixed" :
                      v.status === "service" ? "bg-yellow-100 text-yellow-800" :
                      "bg-error-container text-on-error-container"
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-primary">{formatRupiah(v.price_self_drive_per_day)}</td>
                  <td className="p-3">
                    <span className="flex items-center gap-0.5">
                      <span className="material-symbols-outlined text-amber-500 text-[14px] filled">star</span>
                      <span className="text-xs font-bold">{v.rating}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AnimatedCard>
    </div>
  );
}
