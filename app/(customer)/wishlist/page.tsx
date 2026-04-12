import { VehicleCard } from "@/components/shared/VehicleCard";
import prisma from "@/lib/prisma";

export default async function WishlistPage() {
  // Untuk mockup, kita ambil 2 mobil beda tipe dari database
  // Di kehidupan nyata, kita memanggil relasi Wishlist user
  const savedVehicles = await prisma.vehicle.findMany({
    take: 2,
    orderBy: {
      price_self_drive_per_day: 'desc'
    }
  });

  return (
    <div className="animate-fade-in pb-24">
      {/* Header Modal-like */}
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 px-4 h-16 flex items-center justify-between">
        <h1 className="font-headline text-lg font-bold text-on-surface">Tersimpan</h1>
        <button className="text-sm font-medium text-primary">Edit</button>
      </div>

      <div className="px-5 pt-6">
        {savedVehicles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-4">
              <span className="material-symbols-outlined text-[32px]">favorite_border</span>
            </div>
            <h2 className="text-on-surface font-bold text-lg mb-1">Belum Ada Kendaraan</h2>
            <p className="text-on-surface-variant text-sm">Kendaraan yang Anda simpan akan muncul di sini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {savedVehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
