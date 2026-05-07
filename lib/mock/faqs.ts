export interface MockFAQ {
  id: number;
  category: string;
  question: string;
  answer: string;
}

export const MOCK_FAQS: MockFAQ[] = [
  {
    id: 1,
    category: "Pemesanan",
    question: "Bagaimana cara memesan kendaraan?",
    answer: "Pilih kendaraan yang Anda inginkan dari katalog, klik 'Pesan Sekarang', pilih tipe sewa (lepas kunci atau dengan supir), tentukan tanggal sewa, isi data diri, dan lakukan pembayaran DP. Setelah pembayaran dikonfirmasi, kendaraan siap digunakan.",
  },
  {
    id: 2,
    category: "Pemesanan",
    question: "Berapa lama proses konfirmasi pemesanan?",
    answer: "Pemesanan akan dikonfirmasi dalam waktu maksimal 2 jam setelah pembayaran DP diterima. Untuk pemesanan di hari yang sama, konfirmasi bisa lebih cepat — hubungi admin via WhatsApp untuk percepatan.",
  },
  {
    id: 3,
    category: "Pemesanan",
    question: "Apakah bisa membatalkan pesanan?",
    answer: "Ya, pembatalan bisa dilakukan dengan ketentuan: >48 jam sebelum sewa = refund 100%, 24-48 jam = refund 50%, <24 jam = refund 25%. Hubungi admin untuk proses pembatalan.",
  },
  {
    id: 4,
    category: "Persyaratan",
    question: "Apa saja syarat menyewa mobil?",
    answer: "Anda memerlukan: KTP yang masih berlaku, SIM A yang masih berlaku (untuk lepas kunci), deposit sesuai ketentuan (mulai Rp 500.000), dan berusia minimal 21 tahun.",
  },
  {
    id: 5,
    category: "Persyaratan",
    question: "Apakah ada batasan jarak tempuh?",
    answer: "Untuk sewa harian, tersedia kuota 250 km/hari (akumulatif). Kelebihan jarak dikenakan biaya Rp 2.500/km. Untuk sewa mingguan/bulanan, tidak ada batasan jarak.",
  },
  {
    id: 6,
    category: "Pembayaran",
    question: "Metode pembayaran apa saja yang diterima?",
    answer: "Saat ini kami menerima pembayaran melalui transfer bank (BCA). Kami sedang menyiapkan opsi QRIS dan kartu kredit untuk kemudahan Anda.",
  },
  {
    id: 7,
    category: "Pembayaran",
    question: "Apakah ada biaya tambahan selain harga sewa?",
    answer: "Harga sewa sudah termasuk asuransi kendaraan (TLO). Biaya tambahan yang mungkin timbul: deposit (refundable), kelebihan jarak tempuh, keterlambatan pengembalian, dan biaya antar-jemput (jika Anda meminta pengiriman ke lokasi tertentu).",
  },
  {
    id: 8,
    category: "Kendaraan",
    question: "Apakah mobil dalam kondisi bersih dan terawat?",
    answer: "Semua kendaraan kami melalui proses pembersihan menyeluruh sebelum diserahkan. Servis berkala dilakukan sesuai jadwal pabrikan. Setiap kendaraan juga dilengkapi dengan peralatan darurat dan P3K.",
  },
  {
    id: 9,
    category: "Kendaraan",
    question: "Bagaimana jika terjadi kerusakan atau kecelakaan?",
    answer: "Semua kendaraan dilindungi asuransi TLO. Jika terjadi kecelakaan: pastikan keselamatan Anda, hubungi call center kami di 0800-123-4567, dan ikuti prosedur klaim asuransi. Biaya perbaikan ditanggung asuransi, kecuali kelalaian berat.",
  },
  {
    id: 10,
    category: "Supir",
    question: "Apakah saya bisa request supir khusus?",
    answer: "Untuk layanan 'dengan supir', Anda bisa request supir yang sama jika pernah menggunakan layanan kami sebelumnya. Cantumkan nama supir di kolom catatan saat pemesanan. Ketersediaan supir akan dikonfirmasi oleh admin.",
  },
];
