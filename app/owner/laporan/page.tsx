"use client";

import { MOCK_OWNER_DASHBOARD, MOCK_VEHICLES } from "@/lib/mock";
import { KPICard } from "@/components/shared/KPICard";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatRupiah } from "@/lib/utils";

const stats = MOCK_OWNER_DASHBOARD;

export default function OwnerReportsPage() {
  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Laporan Bisnis</h1>
        <p className="text-sm text-on-surface-variant mt-1">Analisis performa dan profitabilitas.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard label="Total Revenue" value={formatRupiah(stats.total_revenue)} accent="success" />
        <KPICard label="Biaya Operasional" value={formatRupiah(stats.operational_cost)} accent="warning" />
        <KPICard label="Laba Bersih" value={formatRupiah(stats.total_revenue - stats.operational_cost)} accent="success"
          delta={{ value: `${stats.profit_margin}% margin`, positive: true }}
        />
        <KPICard label="Avg Daily Rate" value={formatRupiah(stats.avg_daily_rate)} accent="primary" />
      </div>

      {/* Revenue Table */}
      <AnimatedCard className="p-5">
        <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Rincian Pendapatan Per Kendaraan</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container text-left">
                <th className="p-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider rounded-l-lg">Kendaraan</th>
                <th className="p-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pendapatan</th>
                <th className="p-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider">Kontribusi</th>
                <th className="p-3 text-xs font-bold text-on-surface-variant uppercase tracking-wider rounded-r-lg">Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {stats.revenue_per_vehicle.map((item, i) => {
                const maxVal = Math.max(...stats.revenue_per_vehicle.map((d) => d.value));
                const pct = Math.round((item.value / maxVal) * 100);
                return (
                  <tr key={item.label} className="hover:bg-surface-container-low">
                    <td className="p-3 font-medium text-on-surface">{item.label}</td>
                    <td className="p-3 font-bold text-primary">{formatRupiah(item.value)}</td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 rounded-full bg-surface-container overflow-hidden">
                          <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                        <span className="text-xs text-on-surface-variant w-8 text-right">{pct}%</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs">
                      {MOCK_VEHICLES[i] && (
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-amber-500 text-[14px] filled">star</span>
                          {MOCK_VEHICLES[i].rating}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </AnimatedCard>
    </div>
  );
}
