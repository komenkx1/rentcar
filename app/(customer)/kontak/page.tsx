import { PageHeader } from "@/components/shared/PageHeader";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      <PageHeader title="Hubungi Kami" backHref="/" />

      <main className="px-5 pt-6 space-y-8">
        <section className="text-center">
          <h1 className="font-headline text-2xl font-black text-on-surface mb-2">
            Kami Siap Membantu
          </h1>
          <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
            Punya pertanyaan atau butuh bantuan? Pilih kanal yang paling nyaman untuk Anda.
          </p>
        </section>

        {/* Contact Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366]/10 rounded-2xl p-5 border border-[#25D366]/20 hover:bg-[#25D366]/15 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="text-white text-[24px] font-bold">WA</span>
            </div>
            <h3 className="font-bold text-on-surface mb-1">WhatsApp</h3>
            <p className="text-xs text-on-surface-variant">+62 812-3456-7890</p>
            <p className="text-xs text-outline mt-1">Balas dalam &lt; 5 menit</p>
          </a>

          <a
            href="mailto:cs@rentcars.com"
            className="bg-primary/5 rounded-2xl p-5 border border-primary/10 hover:bg-primary/10 transition-colors group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-white text-[24px]">mail</span>
            </div>
            <h3 className="font-bold text-on-surface mb-1">Email</h3>
            <p className="text-xs text-on-surface-variant">cs@rentcars.com</p>
            <p className="text-xs text-outline mt-1">Balas dalam 1×24 jam</p>
          </a>

          <a
            href="tel:08001234567"
            className="bg-tertiary/5 rounded-2xl p-5 border border-tertiary/10 hover:bg-tertiary/10 transition-colors group sm:col-span-2"
          >
            <div className="w-12 h-12 rounded-xl bg-tertiary-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">call</span>
            </div>
            <h3 className="font-bold text-on-surface mb-1">Call Center</h3>
            <p className="text-xs text-on-surface-variant">0800-1234-567</p>
            <p className="text-xs text-outline mt-1">Bebas pulsa, 24 jam</p>
          </a>
        </div>

        {/* Office Info */}
        <section>
          <h2 className="font-headline text-lg font-bold text-on-surface mb-3">Kantor Kami</h2>
          <AnimatedCard className="p-5 space-y-3">
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">location_on</span>
              <div>
                <p className="font-bold text-on-surface text-sm">Jakarta</p>
                <p className="text-xs text-on-surface-variant">
                  Jl. Sudirman No. 100, Gedung Mega Plaza Lt. 5<br />
                  Jakarta Pusat 10220
                </p>
              </div>
            </div>
            <hr className="border-outline-variant/20" />
            <div className="flex gap-3">
              <span className="material-symbols-outlined text-outline text-[20px] mt-0.5">schedule</span>
              <div>
                <p className="font-bold text-on-surface text-sm">Jam Operasional</p>
                <p className="text-xs text-on-surface-variant">
                  Senin—Jumat: 08.00—20.00 WIB<br />
                  Sabtu—Minggu: 09.00—17.00 WIB
                </p>
              </div>
            </div>
          </AnimatedCard>
        </section>

        <div className="text-center pt-4">
          <Link href="/bantuan" className="text-sm font-bold text-primary hover:underline">
            Atau kunjungi Pusat Bantuan →
          </Link>
        </div>
      </main>
    </div>
  );
}
