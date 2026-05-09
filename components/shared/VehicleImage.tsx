"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VehicleImageFallbackProps {
  vehicleName: string;
  brand?: string;
  className?: string;
}

interface VehicleImageProps {
  src?: string | null;
  alt?: string;
  vehicleName: string;
  brand?: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

function hasUsableImage(src?: string | null): src is string {
  if (!src) return false;
  // Filter out placeholder URLs
  const blockedPatterns = ["placeholder-car", "via.placeholder.com"];
  return !blockedPatterns.some((pattern) => src.includes(pattern));
}

export function VehicleImageFallback({ vehicleName, brand, className }: VehicleImageFallbackProps) {
  return (
    <div
      className={cn(
        "relative flex h-full min-h-[inherit] w-full overflow-hidden bg-gradient-to-br from-primary via-primary-container to-amber-500",
        "items-center justify-center text-white",
        className
      )}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/15 blur-sm" />
      <div className="absolute -bottom-12 -left-10 h-40 w-40 rounded-full bg-white/10 blur-sm" />
      <div className="relative flex flex-col items-center px-6 text-center">
        <span className="material-symbols-outlined mb-3 text-[56px] drop-shadow-sm">directions_car</span>
        <span className="max-w-[16rem] text-sm font-extrabold uppercase tracking-[0.18em] text-white/95">
          {vehicleName}
        </span>
        {brand && (
          <span className="mt-1 text-xs font-medium text-white/70">{brand}</span>
        )}
      </div>
    </div>
  );
}

export function VehicleImage({
  src,
  alt,
  vehicleName,
  brand,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: VehicleImageProps) {
  const [failed, setFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!hasUsableImage(src) || failed) {
    return <VehicleImageFallback vehicleName={vehicleName} brand={brand} className={className} />;
  }

  return (
    <div className={cn("relative h-full w-full", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-surface-container animate-pulse">
          <span className="material-symbols-outlined text-3xl text-outline/30">directions_car</span>
        </div>
      )}
      <Image
        src={src}
        alt={alt || `${vehicleName} rental car`}
        fill
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setFailed(true);
          setIsLoading(false);
        }}
        className={cn("object-cover transition-opacity duration-300", imageClassName, isLoading ? "opacity-0" : "opacity-100")}
        sizes={sizes}
      />
    </div>
  );
}
