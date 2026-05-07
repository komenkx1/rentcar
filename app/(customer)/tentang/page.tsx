import { PageHeader } from "@/components/shared/PageHeader";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      <PageHeader title="Tentang Kami" backHref="/" />

      <main className="px-5 pt-6 space-y-10">
        {/* Hero Statement */}
        <section className="text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-primary text-[32px]">flag</span>
          </div>
          <h1 className="font-headline text-3xl font-black text-on-surface mb-4">
            Misi Kami
          </h1>
          <p className="text-on-surface-variant text-sm leading-relaxed max-w-lg mx-auto">
            Menjadi platform rental mobil paling terpercaya di Indonesia dengan menghadirkan
            armada premium, proses pemesanan yang cepat, dan layanan pelanggan yang responsif.
          </p>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { value: "12+", label: "Armada" },
            { value: "3+", label: "Tahun" },
            { value: "500+", label: "Pelanggan" },
            { value: "4.8", label: "Rating" },
          ].map((stat) => (
            <AnimatedCard key={stat.label} className="p-4 text-center">
              <p className="font-headline text-2xl font-black text-primary">{stat.value}</p>
              <p className="text-xs text-on-surface-variant mt-1">{stat.label}</p>
            </AnimatedCard>
          ))}
        </section>

        {/* Story */}
        <section>
          <SectionHeading title="Cerita Kami" />
          <div className="space-y-4 text-sm text-on-surface-variant leading-relaxed">
            <p>
              <strong className="text-on-surface">rentCars</strong> lahir dari pengalaman pribadi para pendiri yang sering kesulitan
              menemukan rental mobil berkualitas dengan proses yang transparan. Kami percaya bahwa
              menyewa mobil seharusnya mudah, cepat, dan bebas dari kejutan biaya.
            </p>
            <p>
              Berdiri sejak 2023, kami memulai dengan hanya 3 unit armada. Kini kami telah
              berkembang menjadi 12+ kendaraan premium yang melayani wilayah Jabodetabek dan sekitarnya.
              Setiap kendaraan kami rawat secara berkala dan bersihkan menyeluruh sebelum diserahkan ke pelanggan.
            </p>
            <p>
              Kami mengutamakan transparansi harga dan kejujuran dalam setiap transaksi.
              Tidak ada biaya tersembunyi — semua rincian biaya bisa Anda lihat sebelum melakukan pemesanan.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <SectionHeading title="Nilai Kami" />
          <div className="space-y-3">
            {[
              { icon: "verified_user", title: "Kepercayaan", desc: "Kami membangun hubungan jangka panjang dengan pelanggan melalui layanan yang jujur dan dapat diandalkan." },
              { icon: "star", title: "Kualitas", desc: "Setiap armada kami pilih dan rawat dengan standar tinggi untuk memastikan kenyamanan dan keamanan Anda." },
              { icon: "handshake", title: "Kemitraan", desc: "Kami melihat pelanggan sebagai mitra. Masukan Anda adalah bahan bakar untuk perbaikan kami." },
            ].map((v) => (
              <AnimatedCard key={v.title} className="p-4 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[20px]">{v.icon}</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface text-sm mb-1">{v.title}</h3>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{v.desc}</p>
                </div>
              </AnimatedCard>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center pb-8">
          <Link href="/" className="btn-primary inline-flex">
            Lihat Katalog Armada
          </Link>
        </div>
      </main>
    </div>
  );
}
