"use client";

export default function CustomerError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-5 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-full bg-error-container flex items-center justify-center text-error mb-4">
        <span className="material-symbols-outlined text-[32px]">error</span>
      </div>
      <h2 className="font-headline text-xl font-bold text-on-surface mb-2">
        Terjadi Kesalahan
      </h2>
      <p className="text-on-surface-variant text-sm max-w-sm mb-6">
        Maaf, terjadi kesalahan saat memuat halaman. Silakan coba lagi.
      </p>
      <button
        onClick={reset}
        className="btn-primary"
      >
        Coba Lagi
      </button>
    </div>
  );
}
