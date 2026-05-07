export interface MockPromo {
  id: number;
  code: string;
  title: string;
  description: string;
  discount_percent: number;
  min_rental_days: number;
  max_discount: number;
  valid_until: Date;
  is_active: boolean;
  terms: string;
}

export const MOCK_PROMOS: MockPromo[] = [
  {
    id: 1,
    code: "LIBURAN2025",
    title: "Diskon Liburan Akhir Tahun",
    description: "Nikmati potongan 15% untuk sewa minimal 3 hari. Cocok untuk rencana liburan akhir tahun Anda bersama keluarga.",
    discount_percent: 15,
    min_rental_days: 3,
    max_discount: 500000,
    valid_until: new Date("2026-01-05"),
    is_active: true,
    terms: "Tidak bisa digabung dengan promo lain. Maksimal diskon Rp 500.000. Berlaku untuk semua jenis kendaraan.",
  },
  {
    id: 2,
    code: "NEWUSER10",
    title: "Diskon Pelanggan Baru",
    description: "Pelanggan baru dapat potongan 10% untuk pemesanan pertama. Daftar sekarang dan klaim diskon Anda.",
    discount_percent: 10,
    min_rental_days: 1,
    max_discount: 300000,
    valid_until: new Date("2026-06-30"),
    is_active: true,
    terms: "Hanya untuk pelanggan baru. Maksimal diskon Rp 300.000. Harus menyertakan verifikasi nomor telepon.",
  },
  {
    id: 3,
    code: "SEWAMINGGU",
    title: "Paket Hemat Mingguan",
    description: "Sewa 7 hari atau lebih dapat diskon 20%. Makin lama sewa makin hemat!",
    discount_percent: 20,
    min_rental_days: 7,
    max_discount: 1500000,
    valid_until: new Date("2026-03-31"),
    is_active: true,
    terms: "Minimal sewa 7 hari berturut-turut. Maksimal diskon Rp 1.500.000. Tidak berlaku untuk sewa supir tambahan.",
  },
  {
    id: 4,
    code: "CORP25",
    title: "Paket Korporat",
    description: "Solusi transportasi untuk perusahaan Anda. Diskon 25% untuk pemesanan korporat minimal 5 kendaraan.",
    discount_percent: 25,
    min_rental_days: 3,
    max_discount: 10000000,
    valid_until: new Date("2026-12-31"),
    is_active: true,
    terms: "Minimal 5 kendaraan per pemesanan. Perlu verifikasi dokumen perusahaan. Tidak bisa digabung dengan promo lain.",
  },
];
