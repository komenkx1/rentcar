import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 px-4 h-16 flex items-center gap-3">
        <Link href="/profil" className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-headline text-lg font-bold text-on-surface">Kebijakan Privasi</h1>
      </div>

      <div className="px-5 pt-8">
        <div className="mb-6">
          <h2 className="font-headline text-2xl font-black text-on-surface leading-tight mb-2">Kebijakan<br/><span className="text-primary">Privasi Kami</span></h2>
          <p className="text-sm font-medium text-on-surface-variant mb-6">Pembaruan Terakhir: April 2026</p>
        </div>

        <div className="space-y-6 text-on-surface-variant text-sm leading-relaxed">
          <section>
            <h3 className="font-bold text-on-surface text-base mb-2">1. Pengumpulan Data Informasi</h3>
            <p className="mb-2">Kami mengumpulkan informasi pribadi yang Anda berikan secara langsung saat:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Mendaftarkan akun (Nama, Email, No. HP).</li>
              <li>Melakukan pemesanan kendaraan (Data KTP, SIM, Lokasi).</li>
              <li>Melakukan komunikasi dengan tim Layanan Pelanggan (CS).</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-on-surface text-base mb-2">2. Penggunaan Data</h3>
            <p>Data Anda kami gunakan khusus untuk verifikasi identitas peminjam, mengelola pemesanan, mempercepat proses layanan, serta menghubungi Anda dalam keadaan darurat atau perihal pesanan yang aktif.</p>
          </section>

          <section>
            <h3 className="font-bold text-on-surface text-base mb-2">3. Keamanan Data</h3>
            <p>Kami berkomitmen untuk melindungi kerahasiaan data Anda dengan tidak memperjualbelikannya kepada pihak ketiga manapun. Sistem kami dilengkapi dengan enkripsi standar industri.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
