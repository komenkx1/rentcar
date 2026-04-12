import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format angka ke format Rupiah
 * @example formatRupiah(450000) → "Rp 450.000"
 */
export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format Rupiah ringkas untuk card display
 * @example formatRupiahShort(450000) → "Rp 450k"
 */
export function formatRupiahShort(amount: number): string {
  if (amount >= 1_000_000_000) {
    return `Rp ${(amount / 1_000_000_000).toFixed(1)}M`;
  }
  if (amount >= 1_000_000) {
    return `Rp ${(amount / 1_000_000).toFixed(1)}jt`;
  }
  if (amount >= 1_000) {
    return `Rp ${(amount / 1_000).toFixed(0)}k`;
  }
  return `Rp ${amount}`;
}

/**
 * Hitung jumlah hari antara dua tanggal
 */
export function diffDays(start: Date | string, end: Date | string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getTime() - startDate.getTime();
  return Math.max(1, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

/**
 * Format tanggal ke format Indonesia
 * @example formatDate("2026-04-15") → "15 Apr 2026"
 */
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

/**
 * Format tanggal range
 * @example formatDateRange("2026-04-15", "2026-04-18") → "15–18 Apr 2026"
 */
export function formatDateRange(start: Date | string, end: Date | string): string {
  const s = new Date(start);
  const e = new Date(end);

  const sameYear = s.getFullYear() === e.getFullYear();
  const sameMonth = sameYear && s.getMonth() === e.getMonth();

  const dayStart = s.getDate();
  const dayEnd = e.getDate();

  if (sameMonth) {
    const month = new Intl.DateTimeFormat("id-ID", { month: "short" }).format(s);
    return `${dayStart}–${dayEnd} ${month} ${s.getFullYear()}`;
  }

  return `${formatDate(start)} – ${formatDate(end)}`;
}

/**
 * Generate booking code unik (format: RCM-YYYY-XXXX)
 */
export function generateBookingCode(): string {
  const year = new Date().getFullYear();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RCM-${year}-${random}`;
}

/**
 * Truncate text dengan ellipsis
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "…";
}

/**
 * Konversi VehicleType ke label Indonesia
 */
export const vehicleTypeLabels: Record<string, string> = {
  sedan: "Sedan",
  suv: "SUV",
  mpv: "MPV",
  pickup: "Pickup",
};

/**
 * Konversi Transmission ke label
 */
export const transmissionLabels: Record<string, string> = {
  manual: "Manual",
  automatic: "Automatic",
};

/**
 * Konversi FuelType ke label
 */
export const fuelTypeLabels: Record<string, string> = {
  bensin: "Bensin",
  diesel: "Diesel",
  hybrid: "Hybrid",
};
