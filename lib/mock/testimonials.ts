export interface MockTestimonial {
  id: number;
  name: string;
  role: string;
  avatar: string | null;
  rating: number;
  comment: string;
  vehicle: string;
  date: string;
}

export const MOCK_TESTIMONIALS: MockTestimonial[] = [
  {
    id: 1,
    name: "Rina Anggraini",
    role: "Business Traveler",
    avatar: null,
    rating: 5,
    comment: "Mobil bersih dan wangi. Proses pemesanannya cepat banget, cuma 5 menit langsung bisa pakai. Cocok buat perjalanan bisnis mendadak.",
    vehicle: "Toyota Avanza",
    date: "15 Nov 2025",
  },
  {
    id: 2,
    name: "Hendra Gunawan",
    role: "Family Trip",
    avatar: null,
    rating: 5,
    comment: "Sewa Fortuner buat liburan keluarga ke Puncak. Mobil masih baru, supirnya ramah dan profesional. Pasti repeat order!",
    vehicle: "Toyota Fortuner",
    date: "2 Des 2025",
  },
  {
    id: 3,
    name: "Sari Dewi",
    role: "Weekend Getaway",
    avatar: null,
    rating: 4,
    comment: "Harga sewa sangat kompetitif dibanding rental lain. Civic RS-nya keren banget, bikin weekend makin seru!",
    vehicle: "Honda Civic RS",
    date: "28 Okt 2025",
  },
  {
    id: 4,
    name: "Ahmad Fauzi",
    role: "Entrepreneur",
    avatar: null,
    rating: 5,
    comment: "Pake Carry Pickup buat angkut barang dagangan, harganya bersahabat dan kondisi mobil prima. Adminnya responsif di WhatsApp.",
    vehicle: "Suzuki Carry",
    date: "10 Sep 2025",
  },
  {
    id: 5,
    name: "Putri Amalia",
    role: "City Explorer",
    avatar: null,
    rating: 5,
    comment: "Layanan lepas kunci di Bandara sangat membantu. Brio-nya irit bensin dan mudah parkir di gang sempit sekalipun.",
    vehicle: "Honda Brio",
    date: "7 Nov 2025",
  },
  {
    id: 6,
    name: "Bayu Nugroho",
    role: "Corporate Client",
    avatar: null,
    rating: 4,
    comment: "Sewa bulanan untuk operasional kantor. Fleet tracking dan invoice digital memudahkan pencatatan keuangan perusahaan.",
    vehicle: "Mitsubishi Xpander",
    date: "22 Okt 2025",
  },
];
