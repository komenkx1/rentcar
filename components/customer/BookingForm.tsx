"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { formatRupiah, diffDays } from "@/lib/utils";
import { createBooking } from "@/app/actions/booking.actions";

interface BookingFormProps {
  vehicleId: number;
  vehicleName: string;
  vehicleImage: string;
  priceSelfDrive: number;
  priceWithDriver: number;
  hasSelfDrive: boolean;
  hasDriver: boolean;
}

export function BookingForm({
  vehicleId,
  vehicleName,
  vehicleImage,
  priceSelfDrive,
  priceWithDriver,
  hasSelfDrive,
  hasDriver,
}: BookingFormProps) {
  // State for interactive calculation
  const [rentalType, setRentalType] = useState<"self_drive" | "with_driver">(
    hasSelfDrive ? "self_drive" : "with_driver"
  );

  // Default dates: start today, end tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [startDate, setStartDate] = useState(today.toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(tomorrow.toISOString().split("T")[0]);
  
  const [duration, setDuration] = useState(1);
  const [totalPrice, setTotalPrice] = useState(priceSelfDrive);

  // Recalculate duration and price
  useEffect(() => {
    let days = diffDays(startDate, endDate);
    if (days < 1) days = 1; // Minimum 1 hari
    
    setDuration(days);
    
    const pricePerDay = rentalType === "self_drive" ? priceSelfDrive : priceWithDriver;
    setTotalPrice(days * pricePerDay);
  }, [startDate, endDate, rentalType, priceSelfDrive, priceWithDriver]);

  return (
    <form action={createBooking} className="space-y-6">
      <input type="hidden" name="vehicle_id" value={vehicleId} />
      
      {/* Vehicle Summary Snippet */}
      <div className="bg-surface-container rounded-2xl p-3 flex gap-4 items-center mb-8">
        <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-surface-container-low flex-shrink-0">
          <Image src={vehicleImage} alt={vehicleName} fill className="object-cover" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-on-surface leading-tight">{vehicleName}</h2>
          <p className="text-xs text-on-surface-variant mt-1.5 flex gap-2">
            <span className="flex items-center gap-0.5">
               Harga / Hari
            </span>
          </p>
        </div>
      </div>

      {/* RENTAL OPTIONS */}
      <section className="space-y-3">
        <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2">Tipe Sewa</h3>
        <div className="grid grid-cols-2 gap-3">
          {hasSelfDrive && (
            <label className="cursor-pointer">
              <input 
                type="radio" 
                name="rental_type" 
                value="self_drive" 
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
              <input 
                type="radio" 
                name="rental_type" 
                value="with_driver" 
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

      {/* DATES & TIMES */}
      <section className="space-y-3">
        <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2 mt-4">Jadwal Sewa</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="form-control">
            <label className="text-xs font-bold text-on-surface-variant mb-1.5 block">Tanggal Mulai</label>
            <input 
              type="date" 
              name="start_date" 
              required 
              value={startDate}
              min={today.toISOString().split("T")[0]}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full bg-surface-container h-12 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border-none" 
            />
          </div>
          <div className="form-control">
            <label className="text-xs font-bold text-on-surface-variant mb-1.5 block">Tanggal Selesai</label>
            <input 
              type="date" 
              name="end_date" 
              required 
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full bg-surface-container h-12 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border-none" 
            />
          </div>
        </div>
      </section>

      {/* CUSTOMER DETAILS */}
      <section className="space-y-4 pt-4">
        <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-2">Data Pemesan</h3>
        
        <div className="form-control">
          <input 
            type="text" 
            name="guest_name" 
            required 
            placeholder="Nama Lengkap sesuai KTP"
            className="w-full bg-surface-container border-outline-variant/30 h-14 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all" 
          />
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <div className="form-control">
            <input 
              type="tel" 
              name="guest_phone" 
              required 
              placeholder="No. WhatsApp"
              className="w-full bg-surface-container border-outline-variant/30 h-14 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all" 
            />
          </div>
          <div className="form-control">
            <input 
              type="email" 
              name="guest_email" 
              required 
              placeholder="Alamat Email"
              className="w-full bg-surface-container border-outline-variant/30 h-14 px-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all" 
            />
          </div>
        </div>

        <div className="form-control pt-2">
          <h3 className="font-bold text-sm text-on-surface uppercase tracking-wider mb-3">Lokasi Penjemputan / Pengambilan</h3>
          <textarea 
            name="pickup_location" 
            required 
            placeholder="Masukkan alamat lengkap pengambilan / penjemputan (Hotel, Bandara, atau Rumah)..."
            rows={3}
            className="w-full bg-surface-container border-outline-variant/30 p-4 rounded-xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all resize-none" 
          />
        </div>
      </section>

      {/* CHECKOUT SUMMARY BAR */}
      <div className="fixed bottom-[72px] left-0 right-0 z-50">
        <div className="max-w-xl mx-auto px-5 py-4 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex items-center justify-between gap-4">
          <div>
            <p className="text-xs text-on-surface-variant font-medium">Total Harga ({duration} Hari)</p>
            <p className="font-bold text-xl text-on-surface leading-none mt-1">
              {formatRupiah(totalPrice)}
            </p>
          </div>
          
          <button
            type="submit"
            className="btn-primary px-8 py-3.5 shadow-lg flex items-center gap-2"
          >
            Pesan
            <span className="material-symbols-outlined text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </form>
  );
}
