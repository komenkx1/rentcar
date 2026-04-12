"use server";

import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { generateBookingCode, diffDays } from "@/lib/utils";

export async function createBooking(formData: FormData) {
  const vehicleId = parseInt(formData.get("vehicle_id") as string);
  const guestName = formData.get("guest_name") as string;
  const guestPhone = formData.get("guest_phone") as string;
  const guestEmail = formData.get("guest_email") as string;
  const rentalType = formData.get("rental_type") as "self_drive" | "with_driver";
  const pickupLocation = formData.get("pickup_location") as string;
  
  const startDateStr = formData.get("start_date") as string;
  const endDateStr = formData.get("end_date") as string;
  
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);

  if (!vehicleId || !guestName || !guestPhone || !rentalType || !pickupLocation || !startDateStr || !endDateStr) {
    throw new Error("Data tidak lengkap");
  }

  // 1. Dapatkan harga kendaraan asli dari DB
  const vehicle = await prisma.vehicle.findUnique({
    where: { id: vehicleId }
  });

  if (!vehicle) throw new Error("Kendaraan tidak ditemukan");

  // 2. Hitung harga dan durasi
  const durationDays = diffDays(startDate, endDate);
  const pricePerDay = rentalType === "self_drive" 
    ? vehicle.price_self_drive_per_day 
    : vehicle.price_with_driver_per_day;
    
  const totalPrice = durationDays * pricePerDay;

  // 3. Generate Kode Booking  
  const bookingCode = generateBookingCode();

  // 4. Simpan ke database
  await prisma.booking.create({
    data: {
      booking_code: bookingCode,
      vehicle_id: vehicleId,
      guest_name: guestName,
      guest_phone: guestPhone,
      guest_email: guestEmail,
      rental_type: rentalType,
      start_date: startDate,
      end_date: endDate,
      duration_days: durationDays,
      total_price: totalPrice,
      pickup_location: pickupLocation,
      status: "pending"
    }
  });

  // 5. Arahkan ke halaman status pesanan
  redirect(`/pesanan/${bookingCode}`);
}
