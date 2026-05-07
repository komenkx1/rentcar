"use client";

import { MOCK_OWNER_DASHBOARD, MOCK_RECENT_ACTIVITY } from "@/lib/mock";
import { KPICard } from "@/components/shared/KPICard";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatRupiah, formatDate } from "@/lib/utils";

const stats = MOCK_OWNER_DASHBOARD;

export default function OwnerDashboardPage() {
  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Executive Dashboard</h1>
        <p className="text-sm text-on-surface-variant mt-1">Ringkasan bisnis dan performa armada.</p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard label="Total Pendapatan" value={formatRupiah(stats.total_revenue)}
          subtitle={`${stats.fleet_size} armada`}
          icon="payments" accent="success"
        />
        <KPICard label="Pendapatan Bulanan" value={formatRupiah(stats.monthly_revenue)}
          subtitle={`Pertumbuhan ${stats.monthly_growth > 0 ? "+" : ""}${stats.monthly_growth}%`}
          icon="trending_up" accent="primary"
          delta={stats.monthly_growth > 0 ? { value: `+${stats.monthly_growth}% MoM`, positive: true } : undefined}
        />
        <KPICard label="Biaya Operasional" value={formatRupiah(stats.operational_cost)}
          subtitle={`${Math.round((stats.operational_cost / stats.monthly_revenue) * 100)}% dari pendapatan`}
          icon="account_balance" accent="warning"
        />
        <KPICard label="Margin Laba" value={`${stats.profit_margin}%`}
          subtitle={`Rata-rata sewa ${formatRupiah(stats.avg_daily_rate)}/hari`}
          icon="pie_chart" accent="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Per Vehicle */}
        <AnimatedCard className="p-5">
          <h3 className="font-headline text-lg font-bold text-on-surface mb-4">Pendapatan Per Kendaraan</h3>
          <div className="space-y-3">
            {stats.revenue_per_vehicle.map((item, i) => {
              const maxVal = Math.max(...stats.revenue_per_vehicle.map((d) => d.value));
              const width = (item.value / maxVal) * 100;
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-on-surface">{item.label}</span>
                    <span className="font-bold text-primary">{formatRupiah(item.value)}</span>
                  </div>
                  <div className="h-2 rounded-full bg-surface-container overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${width}%`, opacity: 1 - i * 0.1 }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedCard>

        {/* Stats Summary */}
        <div className="space-y-4">
          <AnimatedCard className="p-5 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-surface-container rounded-xl">
              <p className="text-2xl font-black text-primary">{stats.fleet_size}</p>
              <p className="text-[10px] text-on-surface-variant mt-1">Total Armada</p>
            </div>
            <div className="text-center p-3 bg-surface-container rounded-xl">
              <p className="text-2xl font-black text-primary">{stats.fleet_utilization}%</p>
              <p className="text-[10px] text-on-surface-variant mt-1">Utilisasi</p>
            </div>
            <div className="text-center p-3 bg-surface-container rounded-xl">
              <p className="text-2xl font-black text-primary">{stats.total_bookings}</p>
              <p className="text-[10px] text-on-surface-variant mt-1">Total Pesanan</p>
            </div>
            <div className="text-center p-3 bg-surface-container rounded-xl">
              <p className="text-2xl font-black text-primary">{formatRupiah(stats.avg_daily_rate)}</p>
              <p className="text-[10px] text-on-surface-variant mt-1">Rata2/Hari</p>
            </div>
          </AnimatedCard>

          {/* Recent Activity */}
          <AnimatedCard className="p-5">
            <h3 className="font-headline font-bold text-on-surface mb-3">Aktivitas Terbaru</h3>
            <div className="space-y-2">
              {MOCK_RECENT_ACTIVITY.slice(0, 4).map((act) => (
                <div key={act.id} className="flex items-start gap-2 pb-2 border-b border-outline-variant/10 last:border-none last:pb-0">
                  <span className={`w-1.5 h-1.5 mt-1.5 rounded-full flex-shrink-0 ${
                    act.type === "payment" ? "bg-tertiary-container" :
                    act.type === "booking" ? "bg-primary" :
                    act.type === "vehicle" ? "bg-amber-500" : "bg-outline"
                  }`} />
                  <div>
                    <p className="text-xs text-on-surface">{act.message}</p>
                    <p className="text-[10px] text-outline">{formatDate(act.timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedCard>
        </div>
      </div>
    </div>
  );
}
