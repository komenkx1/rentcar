import Link from "next/link";
import { cn, formatRupiah, vehicleTypeLabels, transmissionLabels } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { VehicleImage } from "@/components/shared/VehicleImage";

export interface VehicleCardData {
  id: number;
  name: string;
  brand: string;
  type: string;
  transmission: string;
  capacity: number;
  status: "available" | "rented" | "service" | "blocked";
  price_self_drive_per_day: number;
  price_with_driver_per_day: number;
  has_self_drive_option: boolean;
  has_driver_option: boolean;
  image_urls: string[];
}

interface VehicleCardProps {
  vehicle: VehicleCardData;
  className?: string;
}

export function VehicleCard({ vehicle, className }: VehicleCardProps) {
  const minPrice = vehicle.has_self_drive_option
    ? vehicle.price_self_drive_per_day
    : vehicle.price_with_driver_per_day;

  const isAvailable = vehicle.status === "available";
  const mainImage = vehicle.image_urls?.[0];

  return (
    <article
      className={cn(
        "card-hover group flex h-full flex-col overflow-hidden border border-outline-variant/15",
        !isAvailable && "opacity-80",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-low">
        <VehicleImage
          src={mainImage}
          alt={`${vehicle.brand} ${vehicle.name}`}
          vehicleName={vehicle.name}
          brand={vehicle.brand}
          imageClassName="transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />

        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <StatusBadge status={vehicle.status} />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        {/* Name & Type */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="font-headline text-base font-bold text-on-surface leading-tight">
              {vehicle.name}
            </h3>
            <p className="text-xs text-on-surface-variant font-medium mt-0.5">
              {vehicleTypeLabels[vehicle.type] || vehicle.type} ·{" "}
              {transmissionLabels[vehicle.transmission] || vehicle.transmission}
            </p>
          </div>

          {/* Favorite button (future) */}
          <button className="w-8 h-8 flex items-center justify-center rounded-lg text-on-surface-variant hover:text-primary hover:bg-primary/10 transition-colors flex-shrink-0">
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24" }}
            >
              favorite
            </span>
          </button>
        </div>

        {/* Specs */}
        <div className="flex flex-wrap items-center gap-3 text-on-surface-variant">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">group</span>
            <span className="text-xs font-semibold">{vehicle.capacity} Kursi</span>
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">shield</span>
            <span className="text-xs font-semibold">Terawat</span>
          </span>
        </div>

        {/* Price + CTA */}
        <div className="mt-auto pt-5 border-t border-outline-variant/15">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest text-outline font-bold mb-0.5">
                Mulai dari
              </p>
              <p className="price-display">
                {formatRupiah(minPrice)}
                <span className="price-small font-normal text-outline">/hari</span>
              </p>
            </div>
          </div>

          <Link
            href={isAvailable ? `/kendaraan/${vehicle.id}` : "#"}
            className={cn(
              "w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold text-[14px] transition-all duration-300",
              isAvailable 
                ? "bg-primary text-white shadow-[0_8px_20px_rgba(0,49,128,0.2)] hover:shadow-[0_12px_28px_rgba(0,49,128,0.3)] hover:-translate-y-1 hover:bg-primary-container active:scale-[0.98]" 
                : "bg-surface-container-high text-on-surface-variant cursor-not-allowed opacity-80"
            )}
          >
            {isAvailable ? (
              <>
                Pesan Sekarang
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </>
            ) : (
              "Sedang Disewa"
            )}
          </Link>
        </div>
      </div>
    </article>
  );
}

// ─── Skeleton loading card ───
export function VehicleCardSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton h-52" />
      <div className="p-5 space-y-3">
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton h-4 w-1/4" />
        <div className="flex justify-between pt-4">
          <div className="skeleton h-6 w-1/3" />
          <div className="skeleton h-10 w-20 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
