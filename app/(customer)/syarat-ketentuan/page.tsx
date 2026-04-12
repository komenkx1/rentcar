import Link from "next/link";

export default function TermsConditionsPage() {
  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 px-4 h-16 flex items-center gap-3">
        <Link href="/profil" className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="font-headline text-lg font-bold text-on-surface truncate">Syarat & Ketentuan</h1>
      </div>

      <div className="px-5 pt-8">
        <div className="mb-6">
          <h2 className="font-headline text-2xl font-black text-on-surface leading-tight mb-2">Syarat &<br/><span className="text-primary">Ketentuan Layanan</span></h2>
          <p className="text-sm font-medium text-on-surface-variant mb-6">Berlaku Mulai: April 2026</p>
        </div>

        <div className="space-y-6 text-on-surface-variant text-sm leading-relaxed">
          <section>
            <h3 className="font-bold text-on-surface text-base mb-2">1. Ketentuan Umum</h3>
            <p>Dengan menggunakan layanan RCMS (RentaCar Management System), Anda dianggap telah membaca, memahami, dan menyetujui seluruh isi syarat dan ketentuan ini.</p>
          </section>

          <section>
            <h3 className="font-bold text-on-surface text-base mb-2">2. Persyaratan Peminjam</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Penyewa wajb berusia minimal 21 tahun untuk jenis mobil penumpang biasa.</li>
              <li>Menyerahkan minimal 2 (dua) tanda pengenal asli (KTP/Paspor dan ID Pegawai/NPWP).</li>
              <li>Wajib memiliki SIM A yang masih berlaku dan ditunjukkan saat penyerahan kunci.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-on-surface text-base mb-2">3. Ketentuan Penggunaan Kendaraan</h3>
            <p className="mb-2">Kendaraan tidak diperkenankan untuk hal-hal berikut:</p>
             <ul className="list-disc pl-5 space-y-1">
              <li>Membawa barang melanggar hukum, narkoba, dsb.</li>
              <li>Disewakan kembali kepada pihak ketiga.</li>
              <li>Digunakan untuk balap mobil atau off-road yang tidak semestinya.</li>
            </ul>
          </section>

          <section>
            <h3 className="font-bold text-on-surface text-base mb-2">4. Denda & Keterlambatan</h3>
            <p>Pengembalian yang melewati batas waktu penyewaan (overtime) akan dikenakan biaya tambahan sebesar Rp50.000 - Rp150.000 per jam tergantung tipe kendaraan yang disewa.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
