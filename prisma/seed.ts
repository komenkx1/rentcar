import prisma from '../lib/prisma'

async function main() {
  console.log('Start seeding ...')

  // Bersihkan data lama agar bisa dijalankan ulang tanpa duplikat
  await prisma.vehicle.deleteMany()

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
      description: "Rasakan adrenalin performa tinggi dengan Porsche 911 Carrera. Pilihan tepat untuk penyepada sport car murni pencinta kecepatan sejati.",
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
      description: "Kemewahan Premium SUV asal inggris yang tangguh di segala medan sekaligus memanjakan penumpang VIP.",
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
      description: "Performa mesin V8 Twin Turbo dipadukan dengan kenyamanan sedan full-size kelas bisnis.",
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
      description: "Ikon SUV dunia yang merepresentasikan status puncak dengan performa agresif AMG.",
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
      description: "MPV bisnis nomor 1 di Indonesia. Hadir dengan formasi captain seat premium untuk perjalanan ekskluif Anda.",
    }
  ]

  for (const item of vehiclesData) {
    const vehicle = await prisma.vehicle.create({
      data: item,
    })
    console.log(`Created vehicle with id: ${vehicle.id}`)
  }

  console.log('Seeding finished.')
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
