import prisma from "@/lib/prisma";
import { KPICard } from "@/components/shared/KPICard";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatRupiah, formatDate } from "@/lib/utils";
import type { Booking, Vehicle, Payment } from "@prisma/client";

type BookingWithVehicle = Booking & { vehicle: Vehicle };
type PaymentWithBooking = Payment & { booking: Booking & { vehicle: Vehicle } };

async function getOwnerStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

  // Vehicles
  const vehicles = await prisma.vehicle.findMany();
  const fleetSize = vehicles.length;
  const rentedVehicles = vehicles.filter((v) => v.status === "rented").length;
  const fleetUtilization = fleetSize > 0 ? Math.round((rentedVehicles / fleetSize) * 100) : 0;

  // Bookings
  const totalBookings = await prisma.booking.count();
  const completedBookings = await prisma.booking.findMany({
    where: { status: "completed" },
    include: { payments: true },
  });

  // Total revenue (all time)
  const totalRevenue = completedBookings.reduce(
    (sum, b) => sum + b.payments.reduce((pSum, p) => pSum + p.amount, 0),
    0
  );

  // Monthly revenue (this month)
  const thisMonthBookings = completedBookings.filter(
    (b) => b.start_date >= startOfMonth
  );
  const monthlyRevenue = thisMonthBookings.reduce(
    (sum, b) => sum + b.payments.reduce((pSum, p) => pSum + p.amount, 0),
    0
  );

  // Last month revenue
  const lastMonthBookings = completedBookings.filter(
    (b) => b.start_date >= startOfLastMonth && b.start_date < startOfMonth
  );
  const lastMonthRevenue = lastMonthBookings.reduce(
    (sum, b) => sum + b.payments.reduce((pSum, p) => pSum + p.amount, 0),
    0
  );

  // Monthly growth
  const monthlyGrowth = lastMonthRevenue > 0
    ? Math.round(((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100)
    : 0;

  // Operational cost (estimate: 40% of revenue)
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

  // Recent activity
  const recentBookings = (await prisma.booking.findMany({
    take: 4,
    orderBy: { created_at: "desc" },
    include: { vehicle: true },
  })) as BookingWithVehicle[];
  const recentPayments = (await prisma.payment.findMany({
    take: 4,
    orderBy: { created_at: "desc" },
    include: { booking: { include: { vehicle: true } } },
  })) as PaymentWithBooking[];

  const recentActivity: { id: string; type: "booking" | "payment" | "vehicle" | "user"; message: string; timestamp: string }[] = [
    ...recentBookings.map((b) => ({
      id: `booking-${b.id}`,
      type: "booking" as const,
      message: `Pesanan baru ${b.booking_code} untuk ${b.vehicle.brand} ${b.vehicle.name}`,
      timestamp: b.created_at.toISOString(),
    })),
    ...recentPayments.map((p) => ({
      id: `payment-${p.id}`,
      type: "payment" as const,
      message: `Pembayaran ${formatRupiah(p.amount)} untuk ${p.booking.booking_code}`,
      timestamp: p.created_at.toISOString(),
    })),
  ]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 4);

  return {
    total_revenue: totalRevenue,
    monthly_revenue: monthlyRevenue,
    monthly_growth: monthlyGrowth,
    operational_cost: operationalCost,
    profit_margin: profitMargin,
    avg_daily_rate: avgDailyRate,
    fleet_size: fleetSize,
    fleet_utilization: fleetUtilization,
    total_bookings: totalBookings,
    revenue_per_vehicle: revenuePerVehicle,
    recent_activity: recentActivity,
  };
}

export default async function OwnerDashboardPage() {
  const stats = await getOwnerStats();

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
          subtitle={`${Math.round((stats.operational_cost / (stats.monthly_revenue || 1)) * 100)}% dari pendapatan`}
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
              const maxVal = Math.max(...stats.revenue_per_vehicle.map((d) => d.value), 1);
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
              {stats.recent_activity.map((act) => (
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
