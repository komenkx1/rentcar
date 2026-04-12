import Link from "next/link";

export default function EmptyBookingPage() {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center min-h-[70vh] px-5 text-center">
      <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-6 shadow-sm">
        <span className="material-symbols-outlined text-[48px]">no_crash</span>
      </div>
      <h1 className="font-headline text-2xl font-black text-on-surface mb-2 tracking-tight">Belum Ada Kendaraan</h1>
      <p className="text-sm text-on-surface-variant mb-8 max-w-[280px] leading-relaxed">
        Silakan pilih kendaraan yang ingin Anda sewa dari katalog kami terlebih dahulu.
      </p>
      <Link href="/" className="btn-primary px-8 py-3.5 shadow-lg">
        Lihat Katalog
      </Link>
    </div>
  );
}
