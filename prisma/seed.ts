import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

// Initialize PrismaPg adapter for Prisma v7
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// Helper: generate booking code
function generateBookingCode(): string {
  const year = new Date().getFullYear()
  const random = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `RCM-${year}-${random}`
}

async function main() {
  console.log('Start seeding ...')

  // ─────────────────────────────────────────────
  // 1. Clean all tables (order matters due to FK)
  // ─────────────────────────────────────────────
  console.log('Cleaning existing data...')
  await prisma.notification.deleteMany()
  await prisma.operationalCost.deleteMany()
  await prisma.vehicleServiceLog.deleteMany()
  await prisma.payment.deleteMany()
  await prisma.document.deleteMany()
  await prisma.booking.deleteMany()
  await prisma.dailyRevenueSummary.deleteMany()
  await prisma.appSetting.deleteMany()
  await prisma.vehicle.deleteMany()
  await prisma.user.deleteMany()
  console.log('All tables cleaned.')

  // ─────────────────────────────────────────────
  // 2. Seed Users
  // ─────────────────────────────────────────────
  console.log('Seeding users...')

  const admin = await prisma.user.create({
    data: {
      id: 'usr-admin-001',
      name: 'Admin RentCar',
      email: 'admin@rentcar.com',
      role: 'admin',
      phone: '081234567890',
      is_active: true,
    },
  })

  const owner = await prisma.user.create({
    data: {
      id: 'usr-owner-001',
      name: 'Budi Santoso (Owner)',
      email: 'owner@rentcar.com',
      role: 'owner',
      phone: '081111111111',
      is_active: true,
    },
  })

  const customer1 = await prisma.user.create({
    data: {
      id: 'usr-cust-001',
      name: 'Andi Pratama',
      email: 'andi@gmail.com',
      role: 'customer',
      phone: '082222222222',
      is_active: true,
    },
  })

  const customer2 = await prisma.user.create({
    data: {
      id: 'usr-cust-002',
      name: 'Siti Rahayu',
      email: 'siti@gmail.com',
      role: 'customer',
      phone: '083333333333',
      is_active: true,
    },
  })

  const customer3 = await prisma.user.create({
    data: {
      id: 'usr-cust-003',
      name: 'Rizky Hidayat',
      email: 'rizky@gmail.com',
      role: 'customer',
      phone: '084444444444',
      is_active: true,
    },
  })

  console.log('Created 5 users')

  // ─────────────────────────────────────────────
  // 3. Seed Vehicles
  // ─────────────────────────────────────────────
  console.log('Seeding vehicles...')

  const vehiclesData = [
    {
      name: "Porsche 911 Carrera",
      brand: "Porsche",
      model: "911 Carrera",
      type: "sedan" as const,
      year: 2023,
      color: "GT Silver Metallic",
      transmission: "automatic" as const,
      fuel_type: "bensin" as const,
      capacity: 2,
      price_self_drive_per_day: 8500000,
      price_with_driver_per_day: 0,
      has_self_drive_option: true,
      has_driver_option: false,
      status: "available" as const,
      plate_number: "B 911 PSH",
      image_urls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDt65N8FWWDWCvN3N48ZL5YJWqX-nSv-n7KPsSqQrrsWhdTiDjbgqCqRELiS58uNf9W7lFTKpyd2Xjbc8Alw0OTcBkA3_ys48-L8NOe2ai8Da3VZasLsRUV3rFx1rHl_JmRmErFnLeAe3_6j5IPaJmW4XH5tdZpogYf-eD0lQA8XfpRi58P0ldaTS0IBXJl2wEQLzp0AD-XS8P3qi9so5TkYFsmaThAWJucThO8-4O0_UiTbZXmc02wr56nLypGCydb_zj3oBN-Jtw"
      ],
      description: "Rasakan adrenalin performa tinggi dengan Porsche 911 Carrera.",
    },
    {
      name: "Range Rover Vogue",
      brand: "Land Rover",
      model: "Vogue",
      type: "suv" as const,
      year: 2022,
      color: "Obsidian Black",
      transmission: "automatic" as const,
      fuel_type: "bensin" as const,
      capacity: 5,
      price_self_drive_per_day: 5200000,
      price_with_driver_per_day: 5800000,
      has_self_drive_option: true,
      has_driver_option: true,
      status: "rented" as const,
      plate_number: "L 442 RVR",
      image_urls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCbl-IFVuzfL75kxtcXsTxhZB_2IaZRXmR8_xb4SdFO8SahW83AeugJJwtXYUCc_cXlM8xe1tjZ6le_prvMQCc03MsC_sykfUlmds69pXczh6C5mhqcBN4xEOXOMwbznZW6JErcnf99jE9rorjH8L2p5gcNgVleE1Fek7j7UJRdG2wHZhllphsGsR28-mKbnAMQsqtFOLI06ES7-1VrTOxEvDPE-YPssYhOjLJCk_aYe7ZBqf76xhFT268XnbXO9S0s3Drl8uMwfAw"
      ],
      description: "Kemewahan Premium SUV asal Inggris yang tangguh di segala medan.",
    },
    {
      name: "BMW M5 Competition",
      brand: "BMW",
      model: "M5",
      type: "sedan" as const,
      year: 2023,
      color: "Marina Bay Blue",
      transmission: "automatic" as const,
      fuel_type: "bensin" as const,
      capacity: 5,
      price_self_drive_per_day: 4800000,
      price_with_driver_per_day: 5000000,
      has_self_drive_option: true,
      has_driver_option: true,
      status: "service" as const,
      plate_number: "B 555 BMW",
      image_urls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDNDxaq4xCtgv03XXp4DH4pLMIIzOzAXoLCdjqIwBMOPj7-JyUp-iXV4GtNuOD8AhqL9oCtYe4pGBZcsC1hflZNVWhsuWI_RMG6ERKPjpPC_ZCeLTK2UpzkY7ERp5tVx1ZoIx7BvCzG_7KgZIQkLVdjZWexGYfGm1W_w1DxmGAh1VPpttA4ven5YlziHMw2uiSg4vNuh3eeDSNf6OFJUS5IasSe_DSVumGaMV-aBwCJMt-_iq6ik-_op8ZHySmnN8NZf7uZwCulm9A"
      ],
      description: "Performa mesin V8 Twin Turbo dipadukan dengan kenyamanan sedan full-size.",
    },
    {
      name: "Mercedes-AMG G 63",
      brand: "Mercedes-Benz",
      model: "G 63",
      type: "suv" as const,
      year: 2024,
      color: "Magno Night Black",
      transmission: "automatic" as const,
      fuel_type: "bensin" as const,
      capacity: 5,
      price_self_drive_per_day: 12000000,
      price_with_driver_per_day: 12500000,
      has_self_drive_option: true,
      has_driver_option: true,
      status: "available" as const,
      plate_number: "D 63 AMG",
      image_urls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDt65N8FWWDWCvN3N48ZL5YJWqX-nSv-n7KPsSqQrrsWhdTiDjbgqCqRELiS58uNf9W7lFTKpyd2Xjbc8Alw0OTcBkA3_ys48-L8NOe2ai8Da3VZasLsRUV3rFx1rHl_JmRmErFnLeAe3_6j5IPaJmW4XH5tdZpogYf-eD0lQA8XfpRi58P0ldaTS0IBXJl2wEQLzp0AD-XS8P3qi9so5TkYFsmaThAWJucThO8-4O0_UiTbZXmc02wr56nLypGCydb_zj3oBN-Jtw"
      ],
      description: "Ikon SUV dunia dengan performa agresif AMG.",
    },
    {
      name: "Toyota Alphard Hybrid",
      brand: "Toyota",
      model: "Alphard",
      type: "mpv" as const,
      year: 2024,
      color: "White Pearl",
      transmission: "automatic" as const,
      fuel_type: "hybrid" as const,
      capacity: 7,
      price_self_drive_per_day: 2500000,
      price_with_driver_per_day: 2800000,
      has_self_drive_option: false,
      has_driver_option: true,
      status: "available" as const,
      plate_number: "B 1 VIP",
      image_urls: [
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCbl-IFVuzfL75kxtcXsTxhZB_2IaZRXmR8_xb4SdFO8SahW83AeugJJwtXYUCc_cXlM8xe1tjZ6le_prvMQCc03MsC_sykfUlmds69pXczh6C5mhqcBN4xEOXOMwbznZW6JErcnf99jE9rorjH8L2p5gcNgVleE1Fek7j7UJRdG2wHZhllphsGsR28-mKbnAMQsqtFOLI06ES7-1VrTOxEvDPE-YPssYhOjLJCk_aYe7ZBqf76xhFT268XnbXO9S0s3Drl8uMwfAw"
      ],
      description: "MPV bisnis premium dengan captain seat eksklusif.",
    },
  ]

  const vehicles = []
  for (const item of vehiclesData) {
    const vehicle = await prisma.vehicle.create({ data: item })
    vehicles.push(vehicle)
    console.log(`  Created vehicle: ${vehicle.name} (id: ${vehicle.id})`)
  }

  // ─────────────────────────────────────────────
  // 4. Seed Bookings
  // ─────────────────────────────────────────────
  console.log('Seeding bookings...')

  const now = new Date()
  const bookingsData = [
    {
      booking_code: generateBookingCode(),
      user_id: customer1.id,
      vehicle_id: vehicles[0].id,
      rental_type: 'self_drive' as const,
      start_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 2),
      end_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 5),
      duration_days: 3,
      total_price: 3 * 8500000,
      pickup_location: 'Bandara Soekarno-Hatta',
      status: 'pending' as const,
    },
    {
      booking_code: generateBookingCode(),
      user_id: customer2.id,
      vehicle_id: vehicles[1].id,
      guest_name: 'Siti Rahayu',
      guest_phone: '083333333333',
      rental_type: 'with_driver' as const,
      start_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
      end_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 2),
      duration_days: 3,
      total_price: 3 * 5800000,
      pickup_location: 'Hotel Mulia Senayan',
      status: 'active' as const,
    },
    {
      booking_code: generateBookingCode(),
      user_id: customer3.id,
      vehicle_id: vehicles[3].id,
      rental_type: 'self_drive' as const,
      start_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 10),
      end_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() + 13),
      duration_days: 3,
      total_price: 3 * 12000000,
      pickup_location: 'Kemang, Jakarta Selatan',
      status: 'approved' as const,
    },
    {
      booking_code: generateBookingCode(),
      user_id: customer1.id,
      vehicle_id: vehicles[4].id,
      rental_type: 'with_driver' as const,
      start_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 15),
      end_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 12),
      duration_days: 3,
      total_price: 3 * 2800000,
      pickup_location: 'Pondok Indah Mall',
      status: 'completed' as const,
    },
    {
      booking_code: generateBookingCode(),
      user_id: customer2.id,
      vehicle_id: vehicles[2].id,
      rental_type: 'self_drive' as const,
      start_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 10),
      end_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 8),
      duration_days: 2,
      total_price: 2 * 4800000,
      pickup_location: 'SCBD Jakarta',
      status: 'cancelled' as const,
      rejection_reason: 'Customer membatalkan karena perubahan jadwal.',
    },
  ]

  const bookings = []
  for (const item of bookingsData) {
    const booking = await prisma.booking.create({ data: item })
    bookings.push(booking)
    console.log(`  Created booking: ${booking.booking_code} (${booking.status})`)
  }

  // ─────────────────────────────────────────────
  // 5. Seed Documents
  // ─────────────────────────────────────────────
  console.log('Seeding documents...')

  const documentsData = [
    {
      booking_id: bookings[0].id,
      type: 'ktp' as const,
      source: 'customer_upload' as const,
      file_url: 'https://via.placeholder.com/800x500?text=KTP+Andi',
      file_name: 'ktp-andi.jpg',
      is_verified: false,
    },
    {
      booking_id: bookings[0].id,
      type: 'sim' as const,
      source: 'customer_upload' as const,
      file_url: 'https://via.placeholder.com/800x500?text=SIM+Andi',
      file_name: 'sim-andi.jpg',
      is_verified: false,
    },
    {
      booking_id: bookings[1].id,
      type: 'ktp' as const,
      source: 'customer_upload' as const,
      file_url: 'https://via.placeholder.com/800x500?text=KTP+Siti',
      file_name: 'ktp-siti.jpg',
      is_verified: true,
      verified_at: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6),
      verified_by: admin.id,
    },
    {
      booking_id: bookings[1].id,
      type: 'sim' as const,
      source: 'customer_upload' as const,
      file_url: 'https://via.placeholder.com/800x500?text=SIM+Siti',
      file_name: 'sim-siti.jpg',
      is_verified: true,
      verified_at: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6),
      verified_by: admin.id,
    },
    {
      booking_id: bookings[2].id,
      type: 'ktp' as const,
      source: 'customer_upload' as const,
      file_url: 'https://via.placeholder.com/800x500?text=KTP+Rizky',
      file_name: 'ktp-rizky.jpg',
      is_verified: true,
      verified_at: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
      verified_by: admin.id,
    },
    {
      booking_id: bookings[3].id,
      type: 'ktp' as const,
      source: 'customer_upload' as const,
      file_url: 'https://via.placeholder.com/800x500?text=KTP+Andi',
      file_name: 'ktp-andi-2.jpg',
      is_verified: true,
      verified_at: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 16),
      verified_by: admin.id,
    },
  ]

  for (const item of documentsData) {
    const doc = await prisma.document.create({ data: item })
    console.log(`  Created document: ${doc.type} for booking ${doc.booking_id}`)
  }

  // ─────────────────────────────────────────────
  // 6. Seed Payments
  // ─────────────────────────────────────────────
  console.log('Seeding payments...')

  const paymentsData = [
    {
      booking_id: bookings[0].id,
      amount: 3 * 8500000,
      payment_method: 'bank_transfer',
      bank_account: 'BCA 8012345678',
      status: 'pending' as const,
    },
    {
      booking_id: bookings[1].id,
      amount: 3 * 5800000,
      payment_method: 'bank_transfer',
      bank_account: 'BCA 8012345678',
      proof_url: 'https://via.placeholder.com/600x800?text=Bukti+Transfer+Siti',
      status: 'confirmed' as const,
      confirmed_at: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 6),
      confirmed_by: admin.id,
      notes: 'Pembayaran lunas, dokumen sudah diverifikasi.',
    },
    {
      booking_id: bookings[2].id,
      amount: 3 * 12000000,
      payment_method: 'bank_transfer',
      bank_account: 'BCA 8012345678',
      proof_url: 'https://via.placeholder.com/600x800?text=Bukti+Transfer+Rizky',
      status: 'confirmed' as const,
      confirmed_at: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1),
      confirmed_by: admin.id,
      notes: 'DP 50% sudah diterima.',
    },
    {
      booking_id: bookings[3].id,
      amount: 3 * 2800000,
      payment_method: 'bank_transfer',
      bank_account: 'BCA 8012345678',
      proof_url: 'https://via.placeholder.com/600x800?text=Bukti+Transfer+Andi',
      status: 'confirmed' as const,
      confirmed_at: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 16),
      confirmed_by: admin.id,
      notes: 'Pembayaran lunas.',
    },
  ]

  for (const item of paymentsData) {
    const payment = await prisma.payment.create({ data: item })
    console.log(`  Created payment: ${payment.status} - Rp ${payment.amount.toLocaleString('id-ID')}`)
  }

  // ─────────────────────────────────────────────
  // 7. Seed Vehicle Service Logs
  // ─────────────────────────────────────────────
  console.log('Seeding vehicle service logs...')

  const serviceLogsData = [
    {
      vehicle_id: vehicles[2].id,
      service_type: 'Ganti Oli & Filter',
      description: 'Service rutin 10.000 km. Ganti oli mesin, filter oli, dan filter udara.',
      cost: 3500000,
      service_date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3),
      odometer_km: 15200,
      next_service_date: new Date(now.getFullYear(), now.getMonth() + 3, now.getDate()),
    },
    {
      vehicle_id: vehicles[0].id,
      service_type: 'Cek Rem',
      description: 'Pemeriksaan sistem pengereman, ganti brake pad depan.',
      cost: 8000000,
      service_date: new Date(now.getFullYear(), now.getMonth() - 1, 15),
      odometer_km: 8500,
      next_service_date: new Date(now.getFullYear(), now.getMonth() + 2, 15),
    },
    {
      vehicle_id: vehicles[1].id,
      service_type: 'Ganti Ban',
      description: 'Ganti 4 ban Michelin Pilot Sport 4S.',
      cost: 12000000,
      service_date: new Date(now.getFullYear(), now.getMonth() - 2, 10),
      odometer_km: 22000,
      next_service_date: new Date(now.getFullYear(), now.getMonth() + 4, 10),
    },
  ]

  for (const item of serviceLogsData) {
    const log = await prisma.vehicleServiceLog.create({ data: item })
    console.log(`  Created service log: ${log.service_type} for vehicle ${log.vehicle_id}`)
  }

  // ─────────────────────────────────────────────
  // 8. Seed Operational Costs
  // ─────────────────────────────────────────────
  console.log('Seeding operational costs...')

  const operationalCostsData = [
    {
      vehicle_id: vehicles[0].id,
      cost_type: 'bbm' as const,
      description: 'Pertamax Turbo untuk Porsche 911',
      amount: 850000,
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7),
    },
    {
      vehicle_id: vehicles[1].id,
      cost_type: 'bbm' as const,
      description: 'Pertamina Dex untuk Range Rover',
      amount: 1200000,
      date: new Date(now.getFullYear(), now.getMonth(), now.getDate() - 5),
    },
    {
      vehicle_id: vehicles[3].id,
      cost_type: 'asuransi' as const,
      description: 'Premi asuransi all-risk Mercedes G63 (bulanan)',
      amount: 4500000,
      date: new Date(now.getFullYear(), now.getMonth(), 1),
    },
    {
      vehicle_id: vehicles[4].id,
      cost_type: 'pajak' as const,
      description: 'Pajak tahunan Toyota Alphard',
      amount: 8500000,
      date: new Date(now.getFullYear(), now.getMonth() - 1, 20),
    },
    {
      vehicle_id: null,
      cost_type: 'lainnya' as const,
      description: 'Biaya operasional kantor (listrik, internet)',
      amount: 2500000,
      date: new Date(now.getFullYear(), now.getMonth(), 1),
    },
  ]

  for (const item of operationalCostsData) {
    const cost = await prisma.operationalCost.create({ data: item })
    console.log(`  Created operational cost: ${cost.cost_type} - Rp ${cost.amount.toLocaleString('id-ID')}`)
  }

  // ─────────────────────────────────────────────
  // 9. Seed Daily Revenue Summary
  // ─────────────────────────────────────────────
  console.log('Seeding daily revenue summaries...')

  for (let i = 7; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i)
    date.setHours(0, 0, 0, 0)

    const revenue = i === 0 ? 0 : Math.floor(Math.random() * 15000000) + 2000000
    const bookingCount = i === 0 ? 0 : Math.floor(Math.random() * 3) + 1

    await prisma.dailyRevenueSummary.create({
      data: {
        summary_date: date,
        total_revenue: revenue,
        total_bookings: bookingCount,
        active_vehicles: Math.floor(Math.random() * 3) + 2,
        idle_vehicles: Math.floor(Math.random() * 2) + 1,
      },
    })
  }
  console.log('Created 8 daily revenue summaries')

  // ─────────────────────────────────────────────
  // 10. Seed Notifications
  // ─────────────────────────────────────────────
  console.log('Seeding notifications...')

  const notificationsData = [
    {
      user_id: admin.id,
      type: 'new_booking',
      message: `Booking baru ${bookings[0].booking_code} dari Andi Pratama menunggu verifikasi.`,
      is_read: false,
    },
    {
      user_id: admin.id,
      type: 'payment_received',
      message: `Pembayaran untuk booking ${bookings[1].booking_code} sudah diterima.`,
      is_read: true,
    },
    {
      user_id: customer1.id,
      type: 'booking_confirmed',
      message: `Booking ${bookings[0].booking_code} Anda sedang diproses. Silakan upload dokumen.`,
      is_read: false,
    },
    {
      user_id: customer2.id,
      type: 'booking_active',
      message: `Booking ${bookings[1].booking_code} Anda sudah aktif. Selamat menikmati perjalanan!`,
      is_read: true,
    },
    {
      user_id: owner.id,
      type: 'daily_summary',
      message: 'Ringkasan harian: 3 booking aktif, total pendapatan Rp 25.500.000.',
      is_read: false,
    },
  ]

  for (const item of notificationsData) {
    const notif = await prisma.notification.create({ data: item })
    console.log(`  Created notification: ${notif.type} for user ${notif.user_id}`)
  }

  // ─────────────────────────────────────────────
  // 11. Seed App Settings
  // ─────────────────────────────────────────────
  console.log('Seeding app settings...')

  const appSettingsData = [
    { key: 'bank_name', value: 'BCA' },
    { key: 'bank_account_number', value: '8012345678' },
    { key: 'bank_account_name', value: 'PT RentaCar Indonesia' },
    { key: 'whatsapp_number', value: '628123456789' },
    { key: 'company_name', value: 'rentCars' },
    { key: 'company_address', value: 'Jl. Sudirman No. 123, Jakarta Selatan' },
    { key: 'company_email', value: 'info@rentcar.com' },
    { key: 'company_phone', value: '021-5551234' },
    { key: 'terms_version', value: '1.0' },
    { key: 'privacy_version', value: '1.0' },
  ]

  for (const item of appSettingsData) {
    await prisma.appSetting.create({ data: item })
  }
  console.log(`Created ${appSettingsData.length} app settings`)

  // ─────────────────────────────────────────────
  // Done!
  // ─────────────────────────────────────────────
  console.log('')
  console.log('✅ Seeding finished successfully!')
  console.log('')
  console.log('Summary:')
  console.log('  - 5 users (1 admin, 1 owner, 3 customers)')
  console.log(`  - ${vehicles.length} vehicles`)
  console.log(`  - ${bookings.length} bookings`)
  console.log(`  - ${documentsData.length} documents`)
  console.log(`  - ${paymentsData.length} payments`)
  console.log(`  - ${serviceLogsData.length} vehicle service logs`)
  console.log(`  - ${operationalCostsData.length} operational costs`)
  console.log('  - 8 daily revenue summaries')
  console.log(`  - ${notificationsData.length} notifications`)
  console.log(`  - ${appSettingsData.length} app settings`)
  console.log('')
  console.log('Test accounts:')
  console.log('  Admin:    admin@rentcar.com')
  console.log('  Owner:    owner@rentcar.com')
  console.log('  Customer: andi@gmail.com')
  console.log('  Customer: siti@gmail.com')
  console.log('  Customer: rizky@gmail.com')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
