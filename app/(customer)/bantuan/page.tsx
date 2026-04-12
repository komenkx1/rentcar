import Link from "next/link";

const faqs = [
  {
    q: "Apa syarat utama menyewa kendaraan?",
    a: "Anda memerlukan KTP, SIM A yang masih berlaku, dan dokumen pendukung lainnya (seperti paspor untuk WNA). Pembayaran dapat dilakukan via transfer bank."
  },
  {
    q: "Apakah bisa menyewa lepas kunci?",
    a: "Ya, kami menyediakan opsi lepas kunci (self-drive) namun dengan persyaratan verifikasi data yang lebih ketat demi keamanan."
  },
  {
    q: "Bagaimana sistem pengembalian kendaraan?",
    a: "Kendaraan harus dikembalikan dengan jumlah BBM yang sama seperti saat penyerahan. Keterlambatan pengembalian akan dikenakan denda per jam sesuai dengan jenis kendaraan."
  },
  {
    q: "Apakah asuransi termasuk dalam harga sewa?",
    a: "Harga sewa sudah termasuk asuransi dasar. Jika terjadi kerusakan, nilai maksimal risiko yang Anda tanggung (own risk) bergantung dari tipe mobil dan jenis asuransi."
  }
];

export default function HelpPage() {
  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 px-4 h-16 flex items-center gap-3">
        <Link href="/profil" className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-headline text-lg font-bold text-on-surface">Pusat Bantuan</h1>
      </div>

      <div className="px-5 pt-8">
        <div className="mb-8">
          <h2 className="font-headline text-2xl font-black text-on-surface leading-tight mb-2">Halo,<br/>Ada yang bisa<br/><span className="text-primary">kami bantu?</span></h2>
          <p className="text-sm font-medium text-on-surface-variant">Temukan jawaban cepat dari pertanyaan umum seputar layanan kami.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-surface-container rounded-2xl p-5 border border-outline-variant/20 shadow-sm">
              <h3 className="text-sm font-bold text-on-surface mb-2 leading-relaxed">{faq.q}</h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Floating CTA WhatsApp */}
      <div className="fixed bottom-[72px] left-0 right-0 z-50">
        <div className="max-w-xl mx-auto px-5 py-4 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-10px_40px_rgba(0,0,0,0.08)]">
          <Link
            href="https://wa.me/628123456789"
            target="_blank"
            className="w-full btn-primary py-3.5 shadow-lg flex justify-center items-center gap-2 bg-[#25D366] hover:bg-[#20BE5A] text-white"
          >
            <span className="material-symbols-outlined text-[20px]">chat</span>
            Hubungi CS (WhatsApp)
          </Link>
        </div>
      </div>
    </div>
  );
}
