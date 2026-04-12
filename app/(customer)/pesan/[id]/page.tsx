import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { BookingForm } from "@/components/customer/BookingForm";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function BookingPage({ params }: PageProps) {
  const id = parseInt(params.id);

  if (isNaN(id)) {
    notFound();
  }

  const vehicle = await prisma.vehicle.findUnique({
    where: { id },
  });

  if (!vehicle || vehicle.status !== "available") {
    // Kika tidak tersedia, kita bisa render pesan error atau redrect
    return (
      <div className="flex flex-col items-center justify-center pt-24 px-5 text-center">
        <div className="w-20 h-20 rounded-full bg-error/10 text-error flex items-center justify-center mb-4">
          <span className="material-symbols-outlined text-[40px]">car_crash</span>
        </div>
        <h1 className="font-headline text-xl font-bold text-on-surface mb-2">Kendaraan Tidak Tersedia</h1>
        <p className="text-sm text-on-surface-variant mb-6">Mff, kendaraan ini sedang disewa, dalam masa perawatan, atau tidak aktif saat ini.</p>
        <Link href="/" className="btn-secondary px-6">Kembali ke Katalog</Link>
      </div>
    );
  }

  const mainImage = vehicle.image_urls?.[0] || "/placeholder-car.jpg";

  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      {/* Header Modal-like */}
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 px-4 h-16 flex items-center gap-3">
        <Link href={`/kendaraan/${vehicle.id}`} className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors">
          <span className="material-symbols-outlined">close</span>
        </Link>
        <h1 className="font-headline text-lg font-bold text-on-surface">Pemesanan</h1>
      </div>

      <div className="px-5 pt-6">
        <BookingForm 
          vehicleId={vehicle.id}
          vehicleName={`${vehicle.brand} ${vehicle.model}`}
          vehicleImage={mainImage}
          priceSelfDrive={vehicle.price_self_drive_per_day}
          priceWithDriver={vehicle.price_with_driver_per_day}
          hasSelfDrive={vehicle.has_self_drive_option}
          hasDriver={vehicle.has_driver_option}
        />
      </div>
    </div>
  );
}
