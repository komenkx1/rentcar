import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import {
  formatRupiah,
  vehicleTypeLabels,
  transmissionLabels,
  fuelTypeLabels,
  cn,
} from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { VehicleImage } from "@/components/shared/VehicleImage";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle) {
    notFound();
  }

  const isAvailable = vehicle.status === "available";
  const mainImage = vehicle.image_urls?.[0];

  return (
    <div className="animate-fade-in pb-24 max-w-7xl mx-auto md:pt-4">
      
      {/* Desktop Grid Layout */}
      <div className="grid grid-cols-1 gap-8 px-0 md:px-5 lg:grid-cols-12 lg:px-8">
        
        {/* Left Column (Image & Content) */}
        <div className="lg:col-span-8">
          {/* 
            Hero Image Section
            Menggunakan margin negatif pada mobile agar menempel di atas MobileHeader, tapi normal di desktop
          */}
          <section className="-mt-16 md:mt-0 w-full md:rounded-3xl overflow-hidden h-[40vh] md:h-[60vh] min-h-[300px] relative bg-surface-container shadow-sm border border-outline-variant/10">
            <VehicleImage
              src={mainImage}
              alt={`${vehicle.brand} ${vehicle.name}`}
              vehicleName={vehicle.name}
              brand={vehicle.brand}
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
            />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface to-transparent md:hidden" />
            
            {/* Back Button Overlay (Mobile Only) */}
            <div className="absolute top-20 left-4 z-10 md:hidden">
              <Link
                href="/"
                className="w-10 h-10 rounded-full bg-surface/80 backdrop-blur-md flex items-center justify-center text-on-surface shadow-sm border border-outline-variant/30 hover:bg-surface transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">arrow_back</span>
              </Link>
            </div>
          </section>

          {/* Main Content Info */}
          <section className="px-5 md:px-0 -mt-6 md:mt-8 relative z-10">
            <div className="flex justify-between items-start gap-3 mb-2">
              <div>
                <h1 className="font-headline text-2xl md:text-3xl font-extrabold text-on-surface leading-tight">
                  {vehicle.name}
                </h1>
                <p className="text-on-surface-variant text-sm md:text-base font-medium mt-1">
                  {vehicle.brand} {vehicle.model} · {vehicle.year}
                </p>
              </div>
              <StatusBadge status={vehicle.status} />
            </div>

            {/* Specs Ribbon */}
            <div className="flex gap-2.5 overflow-x-auto py-3 scrollbar-hide border-b border-outline-variant/20 mb-5 lg:mb-8">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-xs font-semibold text-on-surface whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px] text-primary">airline_seat_recline_normal</span>
                {vehicle.capacity} Kursi
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-xs font-semibold text-on-surface whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px] text-primary">settings</span>
                {transmissionLabels[vehicle.transmission] || vehicle.transmission}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-xs font-semibold text-on-surface whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px] text-primary">local_gas_station</span>
                {fuelTypeLabels[vehicle.fuel_type] || vehicle.fuel_type}
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-xs font-semibold text-on-surface whitespace-nowrap">
                <span className="material-symbols-outlined text-[16px] text-primary">directions_car</span>
                {vehicleTypeLabels[vehicle.type] || vehicle.type}
              </div>
            </div>

            {/* Description */}
            <div className="mb-6 lg:mb-8">
              <h2 className="text-sm font-bold text-on-surface mb-2 md:mb-3 uppercase tracking-wider">
                Deskripsi
              </h2>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                {vehicle.description ||
                  "Kendaraan premium dalam kondisi prima, siap menemani segala aktivitas Anda dengan nyaman dan aman."}
              </p>
            </div>

            {/* Package Highlights */}
            <div className="space-y-3 mb-8">
              <h2 className="text-sm font-bold text-on-surface mb-1 md:mb-3 uppercase tracking-wider">
                Opsi Sewa Tersedia
              </h2>

              {vehicle.has_self_drive_option && (
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined">key</span>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-on-surface">Lepas Kunci</h3>
                      <p className="text-xs md:text-sm text-on-surface-variant">Kemudikan sendiri</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base font-bold text-primary">
                    {formatRupiah(vehicle.price_self_drive_per_day)}
                    <span className="text-[10px] md:text-xs text-on-surface-variant font-normal"> /hr</span>
                  </p>
                </div>
              )}

              {vehicle.has_driver_option && (
                <div className="p-4 rounded-2xl bg-surface-container-low border border-outline-variant/20 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                    <div>
                      <h3 className="text-sm md:text-base font-bold text-on-surface">Dengan Supir</h3>
                      <p className="text-xs md:text-sm text-on-surface-variant">Layanan pengemudi</p>
                    </div>
                  </div>
                  <p className="text-sm md:text-base font-bold text-on-surface">
                    {formatRupiah(vehicle.price_with_driver_per_day)}
                    <span className="text-[10px] md:text-xs text-on-surface-variant font-normal"> /hr</span>
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column (Desktop Sticky Sidebar) */}
        <div className="hidden lg:block lg:col-span-4 relative">
          <div className="sticky top-24 bg-surface-container rounded-3xl p-6 border border-outline-variant/20 shadow-md">
             <h3 className="font-headline font-extrabold text-xl mb-4 text-on-surface">Ringkasan Harga</h3>
             
             <div className="space-y-4 mb-8">
               <div className="flex justify-between items-center text-sm">
                 <span className="text-on-surface-variant">Harga Mulai</span>
                 <span className="font-bold text-lg text-primary">
                   {formatRupiah(
                    vehicle.has_self_drive_option
                      ? vehicle.price_self_drive_per_day
                      : vehicle.price_with_driver_per_day
                   )}
                 </span>
               </div>
               <p className="text-xs text-on-surface-variant bg-surface-container-high p-3 rounded-xl leading-relaxed">
                 <span className="material-symbols-outlined text-[14px] float-left mr-1.5 text-primary">info</span>
                 Harga total akan dikalkulasi lengkap dengan asuransi pada halaman pemesanan selanjutnya.
               </p>
             </div>

             <Link
              href={isAvailable ? `/pesan/${vehicle.id}` : "#"}
              className={cn(
                "btn-primary w-full py-4 shadow-lg text-center block",
                !isAvailable && "opacity-50 pointer-events-none"
              )}
            >
              {isAvailable ? "Lanjutkan Pemesanan" : "Kendaraan  Disewa"}
            </Link>
          </div>
        </div>

      </div>

      {/* Floating Action Bar (Mobile Only Bottom Sticky) */}
      <div className="lg:hidden fixed bottom-[72px] left-0 right-0 z-50">
        {/* Glass effect wrapper */}
        <div className="max-w-xl mx-auto px-5 py-4 bg-surface/80 backdrop-blur-xl border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Mulai dari</p>
            <p className="font-bold text-lg text-on-surface leading-none">
              {formatRupiah(
                vehicle.has_self_drive_option
                  ? vehicle.price_self_drive_per_day
                  : vehicle.price_with_driver_per_day
              )}
            </p>
          </div>
          
          <Link
            href={isAvailable ? `/pesan/${vehicle.id}` : "#"}
            className={cn(
              "btn-primary px-8 py-3.5 shadow-lg",
              !isAvailable && "opacity-50 pointer-events-none"
            )}
          >
            {isAvailable ? "Lanjut Pesan" : "Kendaraan Disewa"}
          </Link>
        </div>
      </div>
    </div>
  );
}
