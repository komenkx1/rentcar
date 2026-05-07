"use client";

import { MOCK_PROMOS, type MockPromo } from "@/lib/mock";
import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatDate } from "@/lib/utils";

const PROMO_ICONS: Record<string, string> = {
  LIBURAN2025: "beach_access",
  NEWUSER10: "person_add",
  SEWAMINGGU: "calendar_month",
  CORP25: "apartment",
};

export default function PromoPage() {
  const activePromos = MOCK_PROMOS.filter((p) => p.is_active);

  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      <PageHeader title="Promo & Penawaran" backHref="/" />

      <main className="px-5 pt-6 space-y-6">
        {activePromos.length === 0 ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-[48px] text-outline mb-3 block">local_offer</span>
            <p className="font-bold text-on-surface">Belum ada promo aktif</p>
            <p className="text-sm text-on-surface-variant">Cek lagi nanti untuk penawaran menarik.</p>
          </div>
        ) : (
          activePromos.map((promo: MockPromo) => (
            <AnimatedCard key={promo.id} className="overflow-hidden">
              <div className="bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-5 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-white/30 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-white text-[28px]">
                    {PROMO_ICONS[promo.code] ?? "local_offer"}
                  </span>
                </div>
                <div>
                  <p className="font-headline text-lg font-black text-white">{promo.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <code className="bg-white/20 text-white text-xs font-bold px-2 py-0.5 rounded-md">
                      {promo.code}
                    </code>
                    <span className="text-xs text-white/80">
                      Berlaku s.d {formatDate(promo.valid_until)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-xs text-on-surface-variant mb-1">Diskon</p>
                    <p className="font-headline text-2xl font-black text-primary">{promo.discount_percent}%</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-on-surface-variant mb-1">Minimal Sewa</p>
                    <p className="font-headline text-lg font-bold text-on-surface">{promo.min_rental_days} hari</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-on-surface-variant mb-1">Maks. Diskon</p>
                    <p className="font-headline text-lg font-bold text-on-surface">
                      Rp {(promo.max_discount / 1000).toFixed(0)}rb
                    </p>
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">{promo.description}</p>
                <div className="bg-surface-container rounded-xl p-3 text-xs text-on-surface-variant">
                  <span className="font-bold text-on-surface">Syarat & Ketentuan:</span> {promo.terms}
                </div>
              </div>
            </AnimatedCard>
          ))
        )}

        <div className="bg-surface-container-lowest rounded-2xl p-5 text-center border border-outline-variant/20">
          <span className="material-symbols-outlined text-primary text-[32px] mb-2 block">mail</span>
          <p className="font-bold text-on-surface text-sm mb-1">Dapatkan info promo terbaru</p>
          <p className="text-xs text-on-surface-variant mb-4">
            Masukkan email Anda untuk mendapatkan notifikasi promo eksklusif.
          </p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 max-w-sm mx-auto">
            <input
              type="email"
              placeholder="email@anda.com"
              className="flex-1 input-field h-12 text-sm"
            />
            <button type="submit" className="btn-primary px-4 py-2.5 text-sm flex-shrink-0">
              Kirim
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
