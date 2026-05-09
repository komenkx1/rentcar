import prisma from "@/lib/prisma";
import { KPICard } from "@/components/shared/KPICard";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatRupiah, formatDate } from "@/lib/utils";
import Link from "next/link";
import type { Booking, Vehicle, Payment } from "@prisma/client";

type BookingWithVehicle = Booking & { vehicle: Vehicle };
type PaymentWithBooking = Payment & { booking: Booking & { vehicle: Vehicle } };

async function getDashboardStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  // Vehicle stats
  const vehicles = await prisma.vehicle.findMany();
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter((v) => v.status === "available").length;
  const rentedVehicles = vehicles.filter((v) => v.status === "rented").length;

  // Booking stats
  const allBookings = await prisma.booking.findMany({
    where: { start_date: { gte: startOfMonth } },
  });
  const totalBookings = allBookings.length;
  const activeBookings = allBookings.filter((b) => b.status === "active").length;
  const pendingBookings = allBookings.filter((b) => b.status === "pending").length;

  // Completed bookings (all time)
  const completedBookings = await prisma.booking.count({
    where: { status: "completed" },
  });

  // Monthly revenue (payments for completed bookings this month)
  const completedBookingsThisMonth = await prisma.booking.findMany({
    where: {
      status: "completed",
      start_date: { gte: startOfMonth },
    },
    include: { payments: true },
  });
  const monthlyRevenue = completedBookingsThisMonth.reduce(
    (sum, b) => sum + b.payments.reduce((pSum, p) => pSum + p.amount, 0),
    0
  );

  // Fleet utilization
  const fleetUtilization = totalVehicles > 0 ? Math.round((rentedVehicles / totalVehicles) * 100) : 0;

  // Pending payments
  const pendingPayments = await prisma.payment.count({
    where: { status: "pending" },
  });

  // Revenue trend (last 6 months)
  const revenueTrend: { label: string; value: number }[] = [];
  for (let i = 5; i >= 0; i--) {
    const monthStart = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthEnd = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
    const monthBookings = await prisma.booking.findMany({
      where: {
        status: "completed",
        start_date: { gte: monthStart, lt: monthEnd },
      },
      include: { payments: true },
    });
    const monthRevenue = monthBookings.reduce(
      (sum, b) => sum + b.payments.reduce((pSum, p) => pSum + p.amount, 0),
      0
    );
    const monthLabel = monthStart.toLocaleDateString("id-ID", { month: "short" });
    revenueTrend.push({ label: monthLabel, value: monthRevenue });
  }

  // Recent activity
  const recentBookings = (await prisma.booking.findMany({
    take: 5,
    orderBy: { created_at: "desc" },
    include: { vehicle: true },
  })) as BookingWithVehicle[];
  const recentPayments = (await prisma.payment.findMany({
    take: 5,
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
    .slice(0, 8);

  // Customer count
  const totalCustomers = await prisma.user.count({
    where: { role: "customer" },
  });

  return {
    total_vehicles: totalVehicles,
    available_vehicles: availableVehicles,
    rented_vehicles: rentedVehicles,
    total_bookings: totalBookings,
    active_bookings: activeBookings,
    pending_bookings: pendingBookings,
    completed_bookings: completedBookings,
    monthly_revenue: monthlyRevenue,
    fleet_utilization: fleetUtilization,
    pending_payments: pendingPayments,
    revenue_trend: revenueTrend,
    recent_activity: recentActivity,
    total_customers: totalCustomers,
  };
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

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
            const maxVal = Math.max(...stats.revenue_trend.map((d) => d.value), 1);
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
        <AnimatedCard className="p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary">history</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface">Aktivitas Terbaru</h3>
          </div>
          <div className="space-y-3">
            {stats.recent_activity.map((act) => (
              <div key={act.id} className="flex items-start gap-3 pb-3 border-b border-outline-variant/10 last:border-none last:pb-0">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  act.type === "booking" ? "bg-primary/10 text-primary" :
                  act.type === "payment" ? "bg-tertiary-container/30 text-on-tertiary-container" :
                  "bg-surface-container text-outline"
                }`}>
                  <span className="material-symbols-outlined text-[18px]">
                    {act.type === "booking" ? "receipt_long" :
                     act.type === "payment" ? "payments" :
                     act.type === "vehicle" ? "directions_car" : "person"}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-on-surface font-medium">{act.message}</p>
                  <p className="text-xs text-outline mt-0.5">{formatDate(act.timestamp)}</p>
                </div>
              </div>
            ))}
            {stats.recent_activity.length === 0 && (
              <p className="text-sm text-on-surface-variant text-center py-8">Belum ada aktivitas</p>
            )}
          </div>
        </AnimatedCard>

        {/* Quick Actions */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container">bolt</span>
            </div>
            <h3 className="font-headline text-lg font-bold text-on-surface">Aksi Cepat</h3>
          </div>
          {[
            { label: "Kelola Armada", href: "/admin/kendaraan", icon: "directions_car", desc: "Lihat dan kelola daftar kendaraan", accent: "bg-primary/10 text-primary" },
            { label: "Verifikasi Pesanan", href: "/admin/pesanan", icon: "verified", desc: `Review ${stats.pending_bookings} pesanan pending`, accent: "bg-tertiary-container/30 text-on-tertiary-container" },
            { label: "Konfirmasi Pembayaran", href: "/admin/pembayaran", icon: "payments", desc: `${stats.pending_payments} pembayaran menunggu`, accent: "bg-tertiary-fixed text-on-tertiary-fixed" },
          ].map((action) => (
            <Link key={action.href} href={action.href}>
              <AnimatedCard className="p-4 flex items-center gap-4 hover:shadow-lg transition-shadow border border-outline-variant/20">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${action.accent}`}>
                  <span className="material-symbols-outlined text-[24px]">{action.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-on-surface text-sm">{action.label}</p>
                  <p className="text-xs text-on-surface-variant truncate">{action.desc}</p>
                </div>
                <span className="material-symbols-outlined text-outline text-[20px]">chevron_right</span>
              </AnimatedCard>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
