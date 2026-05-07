"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface VehicleImageFallbackProps {
  vehicleName: string;
  className?: string;
}

interface VehicleImageProps extends VehicleImageFallbackProps {
  src?: string | null;
  alt?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
}

function hasUsableImage(src?: string | null): src is string {
  if (!src) return false;
  return !src.includes("placeholder-car");
}

export function VehicleImageFallback({ vehicleName, className }: VehicleImageFallbackProps) {
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
      </div>
    </div>
  );
}

export function VehicleImage({
  src,
  alt,
  vehicleName,
  className,
  imageClassName,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
}: VehicleImageProps) {
  const [failed, setFailed] = useState(false);

  if (!hasUsableImage(src) || failed) {
    return <VehicleImageFallback vehicleName={vehicleName} className={className} />;
  }

  return (
    <Image
      src={src}
      alt={alt || `${vehicleName} rental car`}
      fill
      priority={priority}
      onError={() => setFailed(true)}
      className={cn("object-cover", imageClassName)}
      sizes={sizes}
    />
  );
}
