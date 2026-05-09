import prisma from "@/lib/prisma";
import { KPICard } from "@/components/shared/KPICard";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatRupiah } from "@/lib/utils";

async function getOwnerReportStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Vehicles
  const vehicles = await prisma.vehicle.findMany({ orderBy: { name: "asc" } });

  // Completed bookings
  const completedBookings = await prisma.booking.findMany({
    where: { status: "completed" },
    include: { payments: true },
  });

  // Total revenue (all time)
  const totalRevenue = completedBookings.reduce(
    (sum, b) => sum + b.payments.reduce((pSum, p) => pSum + p.amount, 0),
    0
  );

  // Monthly revenue
  const monthlyRevenue = completedBookings
    .filter((b) => b.start_date >= startOfMonth)
    .reduce((sum, b) => sum + b.payments.reduce((pSum, p) => pSum + p.amount, 0), 0);

  // Operational cost
  const operationalCost = Math.round(totalRevenue * 0.4);

  // Profit margin
  const profitMargin = totalRevenue > 0
    ? Math.round(((totalRevenue - operationalCost) / totalRevenue) * 100)
    : 0;

  // Average daily rate
  const avgDailyRate = vehicles.length > 0
    ? Math.round(vehicles.reduce((sum, v) => sum + v.price_self_drive_per_day, 0) / vehicles.length)
    : 0;

  // Revenue per vehicle
  const revenuePerVehicle = await Promise.all(
    vehicles.map(async (v) => {
      const vBookings = await prisma.booking.findMany({
        where: { vehicle_id: v.id, status: "completed" },
        include: { payments: true },
      });
      const vRevenue = vBookings.reduce(
        (sum, b) => sum + b.payments.reduce((pSum, p) => pSum + p.amount, 0),
        0
      );
      return { label: `${v.brand} ${v.name}`, value: vRevenue };
    })
  );

  return {
    totalRevenue,
    operationalCost,
    profitMargin,
    avgDailyRate,
    monthlyRevenue,
    revenuePerVehicle,
    vehicles,
  };
}

export default async function OwnerReportsPage() {
  const stats = await getOwnerReportStats();

  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Laporan Bisnis</h1>
        <p className="text-sm text-on-surface-variant mt-1">Analisis performa dan profitabilitas.</p>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <KPICard label="Total Revenue" value={formatRupiah(stats.totalRevenue)} accent="success" />
        <KPICard label="Biaya Operasional" value={formatRupiah(stats.operationalCost)} accent="warning" />
        <KPICard label="Laba Bersih" value={formatRupiah(stats.totalRevenue - stats.operationalCost)} accent="success"
          delta={{ value: `${stats.profitMargin}% margin`, positive: true }}
        />
        <KPICard label="Avg Daily Rate" value={formatRupiah(stats.avgDailyRate)} accent="primary" />
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
              {stats.revenuePerVehicle.map((item, i) => {
                const maxVal = Math.max(...stats.revenuePerVehicle.map((d) => d.value), 1);
                const pct = Math.round((item.value / maxVal) * 100);
                const vehicle = stats.vehicles[i];
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
                      {vehicle && (
                        <span className="flex items-center gap-0.5">
                          <span className="material-symbols-outlined text-amber-500 text-[14px] filled">star</span>
                          {vehicle.description ? "4.5" : "-"}
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
