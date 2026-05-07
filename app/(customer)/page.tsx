import { CatalogClient } from "@/components/customer/CatalogClient";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { VehicleCard, type VehicleCardData } from "@/components/shared/VehicleCard";
import Link from "next/link";
import { MOCK_VEHICLES, MOCK_TESTIMONIALS, MOCK_FAQS, MOCK_PROMOS } from "@/lib/mock";

function toVehicleCardData(v: typeof MOCK_VEHICLES[0]): VehicleCardData {
  return {
    id: v.id,
    name: v.name,
    brand: v.brand,
    type: v.type,
    transmission: v.transmission,
    capacity: v.capacity,
    status: v.status,
    price_self_drive_per_day: v.price_self_drive_per_day,
    price_with_driver_per_day: v.price_with_driver_per_day,
    has_self_drive_option: v.has_self_drive_option,
    has_driver_option: v.has_driver_option,
    image_urls: v.image_urls,
  };
}

const vehicles = MOCK_VEHICLES.filter((v) => v.status !== "blocked").sort(
  (a, b) => a.price_self_drive_per_day - b.price_self_drive_per_day
);
const featuredVehicles = MOCK_VEHICLES.filter((v) => v.status === "available" && v.rating >= 4.5).slice(0, 4);

export default function HomePage() {
  return (
    <div className="overflow-x-hidden">
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-container to-on-primary-fixed-variant text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute left-1/2 top-0 h-full w-[1200px] -translate-x-1/2 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.18),transparent_34%),radial-gradient(circle_at_18%_78%,rgba(245,158,11,0.22),transparent_30%)]" />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-4 pb-16 pt-12 sm:px-6 md:pb-24 md:pt-20 lg:grid-cols-[1.02fr_0.98fr] lg:px-8">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold uppercase tracking-widest mb-4 border border-white/20">
              Premium Car Rental
            </span>
            <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-4">
              Sewa Mobil Premium, <br />
              <span className="text-white/90">Tanpa Ribet</span>
            </h1>
            <p className="text-base md:text-lg text-white/80 max-w-xl mb-8 leading-relaxed">
              Pilih dari 12+ armada premium. Lepas kunci atau dengan supir. 
              Proses cepat, mobil bersih, harga transparan.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#katalog" className="bg-white text-primary px-8 py-4 rounded-full font-bold text-sm shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all">
                Lihat Katalog
              </Link>
              <Link href="/bantuan" className="border-2 border-white/30 text-white px-8 py-4 rounded-full font-bold text-sm hover:bg-white/10 active:scale-95 transition-all">
                Cara Pesan
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative ml-auto max-w-xl rounded-[2rem] border border-white/15 bg-white/10 p-4 shadow-2xl backdrop-blur-md">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-white via-blue-50 to-amber-100 px-8 pb-10 pt-12 text-primary">
                <div className="absolute -right-12 -top-14 h-44 w-44 rounded-full bg-amber-300/45 blur-sm" />
                <div className="absolute -bottom-16 -left-14 h-52 w-52 rounded-full bg-primary/10 blur-sm" />
                <div className="relative flex aspect-[16/10] items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-primary-container text-white shadow-xl">
                  <span className="material-symbols-outlined text-[128px] drop-shadow-md">directions_car</span>
                  <div className="absolute bottom-6 left-6 rounded-2xl bg-white/15 px-4 py-3 backdrop-blur-md">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/70">Mulai dari</p>
                    <p className="font-headline text-2xl font-black">Rp 280rb/hari</p>
                  </div>
                </div>
                <div className="relative mt-5 grid grid-cols-3 gap-3 text-center text-sm font-bold">
                  <div className="rounded-2xl bg-white/80 p-3 shadow-sm">12+ Armada</div>
                  <div className="rounded-2xl bg-white/80 p-3 shadow-sm">24/7 Support</div>
                  <div className="rounded-2xl bg-white/80 p-3 shadow-sm">DP Mudah</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto text-surface">
            <path d="M0 40C240 0 480 80 720 40C960 0 1200 80 1440 40V80H0V40Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ─── Promo Banner ─── */}
      {MOCK_PROMOS.filter((p) => p.is_active).length > 0 && (
        <section className="relative z-10 -mt-2 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-amber-400 to-amber-500 rounded-3xl p-5 md:p-6 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/30 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-white text-[28px]">local_offer</span>
              </div>
              <div>
                <p className="font-headline text-lg font-black text-white">
                  {MOCK_PROMOS[0].title}
                </p>
                <p className="text-sm text-white/90">{MOCK_PROMOS[0].description.slice(0, 60)}…</p>
              </div>
            </div>
            <Link href="/promo" className="flex-shrink-0 bg-white text-amber-600 px-5 py-2.5 rounded-full text-sm font-bold hover:shadow-md active:scale-95 transition-all">
              Lihat Promo
            </Link>
          </div>
        </section>
      )}

      {/* ─── Featured Vehicles ─── */}
      <section className="mx-auto w-full max-w-7xl px-4 pb-8 pt-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="Mobil Terpopuler"
          subtitle="Pilihan favorit pelanggan kami"
          actionLabel="Lihat Semua"
          actionHref="#katalog"
        />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredVehicles.map((v) => (
            <div key={v.id} className="animate-fade-in">
              <VehicleCard vehicle={toVehicleCardData(v)} />
            </div>
          ))}
        </div>
      </section>

      {/* ─── Why Choose Us ─── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="Kenapa Pilih Kami?"
          subtitle="Kami memberikan pengalaman sewa mobil terbaik"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { icon: "verified", title: "Armada Terawat", desc: "Semua kendaraan melalui servis berkala dan pembersihan menyeluruh sebelum diserahkan." },
            { icon: "bolt", title: "Proses Cepat", desc: "Pesan dalam 5 menit. Konfirmasi maksimal 2 jam setelah pembayaran." },
            { icon: "payments", title: "Harga Transparan", desc: "Tidak ada biaya tersembunyi. Semua rincian biaya jelas sejak awal." },
            { icon: "support_agent", title: "Dukungan 24/7", desc: "Admin kami siap membantu via WhatsApp kapanpun Anda butuhkan." },
          ].map((item) => (
            <AnimatedCard key={item.icon} className="p-5 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-[28px]">{item.icon}</span>
              </div>
              <h3 className="font-headline font-bold text-on-surface mb-2">{item.title}</h3>
              <p className="text-sm text-on-surface-variant">{item.desc}</p>
            </AnimatedCard>
          ))}
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="bg-surface-container-low py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Cara Pesan" subtitle="4 langkah mudah menuju perjalanan Anda" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { step: "01", icon: "search", title: "Pilih Mobil", desc: "Browse katalog dan pilih kendaraan sesuai kebutuhan Anda." },
              { step: "02", icon: "calendar_month", title: "Tentukan Tanggal", desc: "Pilih tanggal mulai dan selesai sewa. Sistem hitung otomatis." },
              { step: "03", icon: "description", title: "Isi Data Diri", desc: "Lengkapi data pemesan, pilih lokasi pengambilan." },
              { step: "04", icon: "drive_eta", title: "Mobil Siap", desc: "Lakukan pembayaran DP, mobil siap digunakan sesuai jadwal." },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-card border border-outline-variant/10">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-black px-3 py-1 rounded-full">
                    {item.step}
                  </span>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mt-4 mb-4">
                    <span className="material-symbols-outlined text-primary text-[28px]">{item.icon}</span>
                  </div>
                  <h3 className="font-headline font-bold text-on-surface mb-2">{item.title}</h3>
                  <p className="text-sm text-on-surface-variant">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Vehicle Catalog ─── */}
      <section id="katalog" className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="Katalog Kendaraan"
          subtitle={`${vehicles.length} armada siap melayani perjalanan Anda`}
        />
        <CatalogClient vehicles={vehicles.map(toVehicleCardData)} />
      </section>

      {/* ─── Testimonials ─── */}
      <section className="bg-surface-container-low py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading title="Apa Kata Mereka?" subtitle="Pengalaman pelanggan setia kami" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_TESTIMONIALS.slice(0, 6).map((t) => (
              <AnimatedCard key={t.id} className="p-5" as="article">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface text-sm">{t.name}</p>
                    <p className="text-xs text-on-surface-variant">{t.role}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <span key={j} className={`material-symbols-outlined text-[14px] ${j < t.rating ? "text-amber-500 filled" : "text-outline-variant"}`}>
                        star
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed mb-2">&ldquo;{t.comment}&rdquo;</p>
                <p className="text-xs text-outline">{t.vehicle} &middot; {t.date}</p>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="Pertanyaan Umum"
          subtitle="Hal yang sering ditanyakan"
          actionLabel="Lihat Semua FAQ"
          actionHref="/bantuan"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {MOCK_FAQS.slice(0, 6).map((faq) => (
            <details key={faq.id} className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-bold text-sm text-on-surface list-none">
                {faq.question}
                <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[20px]">
                  expand_more
                </span>
              </summary>
              <p className="px-5 pb-5 text-sm text-on-surface-variant leading-relaxed">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ─── CTA Section ─── */}
      <section className="px-5 py-16 bg-gradient-to-br from-primary to-primary-container text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-headline text-3xl md:text-4xl font-black mb-4">
            Siap Memulai Perjalanan?
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Pilih armada premium Anda sekarang. Proses cepat, harga transparan, dan dukungan 24/7.
          </p>
          <Link href="#katalog" className="inline-flex btn-primary bg-white text-primary hover:bg-white/90">
            Pesan Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
}
