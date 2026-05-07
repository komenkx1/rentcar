import Link from "next/link";
import prisma from "@/lib/prisma";
import { formatRupiah, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { VehicleImage } from "@/components/shared/VehicleImage";

interface PageProps {
  searchParams: {
    tab?: string;
  };
}

export default async function OrderHistoryPage({ searchParams }: PageProps) {
  const currentTab = searchParams.tab || "berjalan";

  // Dummy fetching: get ALL bookings, we will filter in memory for mockup purposes. 
  // Real app: filter by User Session.
  const allBookings = await prisma.booking.findMany({
    include: {
      vehicle: true,
    },
    orderBy: {
      created_at: 'desc'
    }
  });

  const activeBookings = allBookings.filter(b => ["pending", "approved", "active"].includes(b.status));
  const completedBookings = allBookings.filter(b => b.status === "completed");
  const cancelledBookings = allBookings.filter(b => ["cancelled", "rejected"].includes(b.status));

  let displayedBookings = activeBookings;
  if (currentTab === "selesai") displayedBookings = completedBookings;
  if (currentTab === "dibatalkan") displayedBookings = cancelledBookings;

  return (
    <div className="animate-fade-in pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 px-4 pt-4 pb-2">
        <h1 className="font-headline text-2xl font-bold text-on-surface mb-4">Riwayat Pesanan</h1>
        
        {/* Tab Switcher */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
          <Link
            href="/status?tab=berjalan"
            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              currentTab === "berjalan"
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container text-on-surface-variant border border-outline-variant/20"
            }`}
          >
            Berjalan
          </Link>
          <Link
            href="/status?tab=selesai"
            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              currentTab === "selesai"
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container text-on-surface-variant border border-outline-variant/20"
            }`}
          >
            Selesai
          </Link>
          <Link
            href="/status?tab=dibatalkan"
            className={`flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              currentTab === "dibatalkan"
                ? "bg-primary text-on-primary shadow-md"
                : "bg-surface-container text-on-surface-variant border border-outline-variant/20"
            }`}
          >
            Dibatalkan
          </Link>
        </div>
      </div>

      <div className="px-5 pt-6">
        {displayedBookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-4">
              <span className="material-symbols-outlined text-[32px]">receipt_long</span>
            </div>
            <h2 className="text-on-surface font-bold text-lg mb-1">Tidak Ada Pesanan</h2>
            <p className="text-on-surface-variant text-sm">Anda belum memiliki pesanan dalam status ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedBookings.map((booking) => (
              <Link key={booking.id} href={`/pesanan/${booking.booking_code}`} className="block">
                <article className="bg-surface-container rounded-2xl p-4 border border-outline-variant/20 shadow-sm active:scale-[0.98] transition-transform">
                  <div className="flex justify-between items-center mb-3">
                    <p className="text-xs font-bold text-on-surface-variant">{formatDate(booking.created_at)}</p>
                    <StatusBadge status={booking.status as "pending" | "approved" | "active" | "completed" | "cancelled" | "rejected"} />
                  </div>
                  
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 rounded-xl bg-surface-container-low flex-shrink-0 relative overflow-hidden">
                      <VehicleImage
                        src={booking.vehicle.image_urls[0]}
                        alt={`${booking.vehicle.brand} ${booking.vehicle.name}`}
                        vehicleName={booking.vehicle.name}
                      />
                    </div>
                    <div>
                      <h3 className="font-bold text-on-surface text-sm mb-1">{booking.vehicle.brand} {booking.vehicle.name}</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Inv: {booking.booking_code}</p>
                      <p className="text-sm font-bold text-primary mt-1">{formatRupiah(booking.total_price)}</p>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
