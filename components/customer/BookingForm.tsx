"use client";

import { useState, useEffect } from "react";
import { formatRupiah, diffDays } from "@/lib/utils";
import { createBooking } from "@/app/actions/booking.actions";
import { VehicleImage } from "@/components/shared/VehicleImage";

interface BookingFormProps {
  vehicleId: number;
  vehicleName: string;
  vehicleImage: string;
  priceSelfDrive: number;
  priceWithDriver: number;
  hasSelfDrive: boolean;
  hasDriver: boolean;
}

const ADDONS = [
  { id: "baby_seat", label: "Baby Seat", price: 50000, icon: "child_care" },
  { id: "extra_insurance", label: "Asuransi Tambahan", price: 75000, icon: "shield" },
  { id: "airport_pickup", label: "Jemput Bandara", price: 150000, icon: "flight_takeoff" },
];

export function BookingForm({
  vehicleId,
  vehicleName,
  vehicleImage,
  priceSelfDrive,
  priceWithDriver,
  hasSelfDrive,
  hasDriver,
}: BookingFormProps) {
  const [rentalType, setRentalType] = useState<"self_drive" | "with_driver">(
    hasSelfDrive ? "self_drive" : "with_driver"
  );
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(() => {
    const t = new Date();
    t.setDate(t.getDate() + 1);
    return t.toISOString().split("T")[0];
  });
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(priceSelfDrive);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    const days = Math.max(1, diffDays(startDate, endDate));
    setDuration(days);
    const basePrice = rentalType === "self_drive" ? priceSelfDrive : priceWithDriver;
    const addonTotal = selectedAddons.reduce((sum, id) => {
      const addon = ADDONS.find((a) => a.id === id);
      return sum + (addon ? addon.price * days : 0);
    }, 0);
    const subtotal = days * basePrice + addonTotal;
    const discount = promoApplied ? Math.min(subtotal * 0.1, 500000) : 0;
    setPromoDiscount(discount);
    setTotalPrice(subtotal - discount);
  }, [startDate, endDate, rentalType, priceSelfDrive, priceWithDriver, selectedAddons, promoApplied]);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]
    );
  };

  const applyPromo = () => {
    const validCodes = ["LIBURAN2025", "NEWUSER10"];
    if (validCodes.includes(promoCode.toUpperCase())) {
      setPromoApplied(true);
      setErrors((prev) => ({ ...prev, promo: "" }));
    } else {
      setPromoApplied(false);
      setErrors((prev) => ({ ...prev, promo: "Kode promo tidak valid" }));
    }
  };

  const validateForm = (formData: FormData): boolean => {
    const newErrors: Record<string, string> = {};
    const name = formData.get("guest_name") as string;
    const phone = formData.get("guest_phone") as string;
    const email = formData.get("guest_email") as string;
    const location = formData.get("pickup_location") as string;
    const start = formData.get("start_date") as string;
    const end = formData.get("end_date") as string;

    if (!name || name.trim().length < 3) newErrors.guest_name = "Nama minimal 3 karakter";
    if (!phone || !/^[0-9+\-\s]{9,15}$/.test(phone)) newErrors.guest_phone = "Nomor telepon tidak valid";
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.guest_email = "Email tidak valid";
    if (!location || location.trim().length < 5) newErrors.pickup_location = "Alamat minimal 5 karakter";
    if (!start) newErrors.start_date = "Tanggal mulai harus diisi";
    if (!end) newErrors.end_date = "Tanggal selesai harus diisi";
    if (start && end && new Date(end) <= new Date(start)) newErrors.end_date = "Tanggal selesai harus setelah mulai";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <form
      action={async (formData) => {
        if (!validateForm(formData)) return;
        await createBooking(formData);
      }}
      className="space-y-6"
    >
      <input type="hidden" name="vehicle_id" value={vehicleId} />

      {/* Vehicle Summary */}
      <div className="bg-surface-container rounded-2xl p-3 flex gap-4 items-center mb-8">
        <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
          <VehicleImage src={vehicleImage} alt={vehicleName} vehicleName={vehicleName} />
        </div>
        <div>
          <h2 className="text-sm font-bold text-on-surface leading-tight">{vehicleName}</h2>
          <p className="text-xs text-on-surface-variant mt-1">
            {rentalType === "self_drive" ? "Lepas Kunci" : "Dengan Supir"} &middot; {duration} hari
          </p>
        </div>
      </div>

      {/* Rental Options */}
      <section>
        <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2">Tipe Sewa</h3>
        <div className="grid grid-cols-2 gap-3">
          {hasSelfDrive && (
            <label className="cursor-pointer">
              <input type="radio" name="rental_type" value="self_drive"
                checked={rentalType === "self_drive"}
                onChange={() => setRentalType("self_drive")}
                className="peer sr-only"
              />
              <div className="p-4 rounded-2xl border-2 border-surface-container transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                <span className="material-symbols-outlined text-primary mb-1 block">key</span>
                <p className="text-sm font-bold text-on-surface">Lepas Kunci</p>
                <p className="text-xs text-primary font-medium mt-1">{formatRupiah(priceSelfDrive)}</p>
              </div>
            </label>
          )}
          {hasDriver && (
            <label className="cursor-pointer">
              <input type="radio" name="rental_type" value="with_driver"
                checked={rentalType === "with_driver"}
                onChange={() => setRentalType("with_driver")}
                className="peer sr-only"
              />
              <div className="p-4 rounded-2xl border-2 border-surface-container transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                <span className="material-symbols-outlined text-primary mb-1 block">person</span>
                <p className="text-sm font-bold text-on-surface">Dengan Supir</p>
                <p className="text-xs text-primary font-medium mt-1">{formatRupiah(priceWithDriver)}</p>
              </div>
            </label>
          )}
        </div>
      </section>

      {/* Dates */}
      <section>
        <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2">Jadwal Sewa</h3>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-on-surface-variant mb-1.5 block">Tanggal Mulai</label>
            <input type="date" name="start_date" required value={startDate} min={today}
              onChange={(e) => { setStartDate(e.target.value); setErrors((p) => ({ ...p, start_date: "", end_date: "" })); }}
              className={`w-full bg-surface-container h-12 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border-none ${errors.start_date ? "ring-2 ring-error" : ""}`}
            />
            {errors.start_date && <p className="text-xs text-error mt-1">{errors.start_date}</p>}
          </div>
          <div>
            <label className="text-xs font-bold text-on-surface-variant mb-1.5 block">Tanggal Selesai</label>
            <input type="date" name="end_date" required value={endDate} min={startDate || today}
              onChange={(e) => { setEndDate(e.target.value); setErrors((p) => ({ ...p, end_date: "" })); }}
              className={`w-full bg-surface-container h-12 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border-none ${errors.end_date ? "ring-2 ring-error" : ""}`}
            />
            {errors.end_date && <p className="text-xs text-error mt-1">{errors.end_date}</p>}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section>
        <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2">Tambahan (Opsional)</h3>
        <div className="grid grid-cols-3 gap-2">
          {ADDONS.map((addon) => (
            <button
              key={addon.id}
              type="button"
              onClick={() => toggleAddon(addon.id)}
              className={`p-3 rounded-xl border-2 text-center transition-all ${
                selectedAddons.includes(addon.id)
                  ? "border-primary bg-primary/5"
                  : "border-surface-container hover:border-outline-variant/40"
              }`}
            >
              <span className="material-symbols-outlined text-[20px] text-on-surface-variant mb-1 block">{addon.icon}</span>
              <p className="text-[11px] font-bold text-on-surface leading-tight">{addon.label}</p>
              <p className="text-[10px] text-primary font-medium mt-0.5">+{formatRupiah(addon.price)}/hari</p>
            </button>
          ))}
        </div>
      </section>

      {/* Promo Code */}
      <section>
        <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2">Kode Promo</h3>
        <div className="flex gap-2">
          <input
            type="text"
            value={promoCode}
            onChange={(e) => { setPromoCode(e.target.value); setErrors((p) => ({ ...p, promo: "" })); }}
            placeholder="Masukkan kode promo"
            className="flex-1 input-field h-12 text-sm"
          />
          <button
            type="button"
            onClick={applyPromo}
            disabled={promoApplied}
            className={`px-5 h-12 rounded-xl font-bold text-sm transition-all ${
              promoApplied
                ? "bg-tertiary-container text-on-tertiary-container"
                : "bg-primary text-white hover:bg-primary-container active:scale-95"
            }`}
          >
            {promoApplied ? "✓ Applied" : "Pakai"}
          </button>
        </div>
        {errors.promo && <p className="text-xs text-error mt-1">{errors.promo}</p>}
        {promoApplied && (
          <p className="text-xs text-tertiary-container font-bold mt-1">
            Diskon 10% diterapkan! Hemat {formatRupiah(promoDiscount)}
          </p>
        )}
      </section>

      {/* Customer Details */}
      <section className="space-y-4 pt-4">
        <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2">Data Pemesan</h3>
        <div>
          <input type="text" name="guest_name" required placeholder="Nama Lengkap sesuai KTP"
            className={`w-full bg-surface-container h-14 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all ${errors.guest_name ? "ring-2 ring-error" : "border-outline-variant/30"}`}
          />
          {errors.guest_name && <p className="text-xs text-error mt-1">{errors.guest_name}</p>}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <input type="tel" name="guest_phone" required placeholder="No. WhatsApp"
              className={`w-full bg-surface-container h-14 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all ${errors.guest_phone ? "ring-2 ring-error" : "border-outline-variant/30"}`}
            />
            {errors.guest_phone && <p className="text-xs text-error mt-1">{errors.guest_phone}</p>}
          </div>
          <div>
            <input type="email" name="guest_email" required placeholder="Alamat Email"
              className={`w-full bg-surface-container h-14 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all ${errors.guest_email ? "ring-2 ring-error" : "border-outline-variant/30"}`}
            />
            {errors.guest_email && <p className="text-xs text-error mt-1">{errors.guest_email}</p>}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-3">Lokasi Pengambilan</h3>
          <textarea name="pickup_location" required rows={3} placeholder="Alamat lengkap pengambilan / penjemputan..."
            className={`w-full bg-surface-container p-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all resize-none ${errors.pickup_location ? "ring-2 ring-error" : "border-outline-variant/30"}`}
          />
          {errors.pickup_location && <p className="text-xs text-error mt-1">{errors.pickup_location}</p>}
        </div>
      </section>

      {/* Spacer for fixed bottom bar */}
      <div className="h-28" />

      {/* Checkout Summary Bar */}
      <div className="fixed bottom-[72px] left-0 right-0 z-50">
        <div className="max-w-xl mx-auto px-5 py-4 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Total Harga ({duration} Hari)</p>
            <div className="flex items-baseline gap-1">
              {promoApplied && (
                <span className="text-xs text-outline line-through">{formatRupiah(totalPrice + promoDiscount)}</span>
              )}
              <p className="font-bold text-xl text-on-surface leading-none mt-1">
                {formatRupiah(totalPrice)}
              </p>
            </div>
          </div>
          <button type="submit" className="btn-primary px-8 py-3.5 shadow-lg flex items-center gap-2">
            Pesan
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </form>
  );
}
