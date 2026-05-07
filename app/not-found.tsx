import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-5 text-center bg-surface">
      <div className="w-24 h-24 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-6">
        <span className="material-symbols-outlined text-[48px]">directions_car</span>
      </div>
      <h1 className="font-headline text-4xl font-black text-on-surface mb-2">404</h1>
      <p className="font-headline text-xl font-bold text-on-surface mb-1">
        Halaman Tidak Ditemukan
      </p>
      <p className="text-on-surface-variant text-sm max-w-xs mb-8">
        Sepertinya halaman yang Anda cari sudah tidak tersedia atau alamatnya salah.
      </p>
      <Link href="/" className="btn-primary">
        Kembali ke Beranda
      </Link>
    </div>
  );
}
