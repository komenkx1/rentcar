"use client";

import { useState, useMemo } from "react";
import { MOCK_FAQS } from "@/lib/mock";
import { PageHeader } from "@/components/shared/PageHeader";
import { Tabs } from "@/components/shared/Tabs";

const CATEGORIES = ["Semua", "Pemesanan", "Persyaratan", "Pembayaran", "Kendaraan", "Supir"];

export default function BantuanPage() {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return MOCK_FAQS.filter((faq) => {
      const matchCat = activeCategory === "Semua" || faq.category === activeCategory;
      const matchSearch =
        search.trim() === "" ||
        faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeCategory, search]);

  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      <PageHeader title="Pusat Bantuan" backHref="/profil" />

      <main className="px-5 pt-4 space-y-5">
        {/* Hero */}
        <div className="text-center py-4">
          <h1 className="font-headline text-2xl font-black text-on-surface mb-2">
            Halo, Ada yang bisa kami bantu?
          </h1>
          <p className="text-sm text-on-surface-variant">
            Temukan jawaban untuk pertanyaan Anda di bawah ini.
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline text-[20px]">search</span>
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pertanyaan..."
            className="w-full h-12 pl-12 pr-4 bg-surface-container border-none rounded-xl text-on-surface text-sm focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-3 flex items-center text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <Tabs
          tabs={CATEGORIES.map((c) => ({ key: c, label: c }))}
          activeKey={activeCategory}
          onChange={setActiveCategory}
        />

        {/* FAQ List */}
        <div className="space-y-2">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <span className="material-symbols-outlined text-[48px] text-outline mb-3 block">search_off</span>
              <p className="font-bold text-on-surface">Tidak ditemukan</p>
              <p className="text-sm text-on-surface-variant">Coba kata kunci lain atau ubah kategori.</p>
            </div>
          ) : (
            filtered.map((faq) => (
              <details
                key={faq.id}
                className="group bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer font-bold text-sm text-on-surface list-none">
                  <span className="pr-4">{faq.question}</span>
                  <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform text-[20px] flex-shrink-0">
                    expand_more
                  </span>
                </summary>
                <p className="px-4 pb-4 text-sm text-on-surface-variant leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))
          )}
        </div>

        {/* WhatsApp CTA */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 md:relative md:bg-transparent md:backdrop-blur-none md:border-none md:p-0 md:mt-8">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 py-4 bg-[#25D366] text-white rounded-2xl font-bold text-sm hover:bg-[#20BE5A] active:scale-[0.98] transition-all shadow-lg"
          >
            <span className="text-[20px]">💬</span>
            Chat Admin via WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}
