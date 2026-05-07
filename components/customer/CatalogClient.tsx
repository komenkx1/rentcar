"use client";

import { useEffect, useMemo, useState } from "react";
import { VehicleCard, VehicleCardData } from "@/components/shared/VehicleCard";
import { formatRupiah } from "@/lib/utils";

const FILTER_TYPES = ["Semua", "Sedan", "SUV", "MPV", "Pickup"];
const MAX_BUDGET = 15_000_000;
const MIN_BUDGET = 300_000;

interface CatalogClientProps {
  vehicles: VehicleCardData[];
}

export function CatalogClient({ vehicles }: CatalogClientProps) {
  const [search, setSearch] = useState("");
  const [activeType, setActiveType] = useState("Semua");
  const [budget, setBudget] = useState(MAX_BUDGET);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [transmission, setTransmission] = useState("all");
  const [budgetOpen, setBudgetOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [pendingBudget, setPendingBudget] = useState(MAX_BUDGET);

  const budgetActive = budget < MAX_BUDGET;
  const overlayOpen = budgetOpen || filterOpen;

  useEffect(() => {
    if (!overlayOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setBudgetOpen(false);
        setFilterOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [overlayOpen]);

  // ─── Derived filtered + sorted list ───
  const filtered = useMemo(() => {
    return vehicles
      .filter((v) => {
        const minPrice = v.has_self_drive_option
          ? v.price_self_drive_per_day
          : v.price_with_driver_per_day;

        const matchSearch =
          search.trim() === "" ||
          v.name.toLowerCase().includes(search.toLowerCase()) ||
          v.brand.toLowerCase().includes(search.toLowerCase());

        const matchType =
          activeType === "Semua" ||
          v.type.toLowerCase() === activeType.toLowerCase();

        const matchBudget = minPrice <= budget;

        const matchTransmission =
          transmission === "all" ||
          v.transmission.toLowerCase() === transmission.toLowerCase();

        return matchSearch && matchType && matchBudget && matchTransmission;
      })
      .sort((a, b) => {
        const priceA = a.has_self_drive_option ? a.price_self_drive_per_day : a.price_with_driver_per_day;
        const priceB = b.has_self_drive_option ? b.price_self_drive_per_day : b.price_with_driver_per_day;
        return sortOrder === "asc" ? priceA - priceB : priceB - priceA;
      });
  }, [vehicles, search, activeType, budget, sortOrder, transmission]);

  return (
    <div className="animate-fade-in">
      {/* Editorial Header */}
      <section className="pt-2 pb-5 md:pt-0">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface leading-tight">
          Pilih Kendaraan<br />
          <span className="text-primary">Terbaik Anda</span>
        </h1>
        <p className="text-on-surface-variant text-sm mt-2 font-medium">
          Armada premium untuk setiap perjalanan Anda.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="mb-7 max-w-3xl space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline text-[20px]">search</span>
          </div>
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari model atau merk mobil..."
            className="w-full h-14 pl-12 pr-4 bg-surface-container border-none rounded-2xl text-on-surface focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute inset-y-0 right-4 flex items-center text-outline hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
          {FILTER_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${
                activeType === type
                  ? "bg-primary text-white shadow-md"
                  : "bg-surface-container text-on-surface-variant border border-outline-variant/20 hover:bg-surface-container-high"
              }`}
            >
              {type}
            </button>
          ))}

          {/* Budget Chip */}
          <button
            onClick={() => { setPendingBudget(budget); setBudgetOpen(true); }}
            className={`flex-shrink-0 flex items-center gap-1 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
              budgetActive
                ? "bg-primary text-white shadow-md"
                : "bg-surface-container text-on-surface-variant border border-outline-variant/20 hover:bg-surface-container-high"
            }`}
          >
            {budgetActive ? `≤ ${formatRupiah(budget)}` : "Harga Maks"}
            <span className="material-symbols-outlined text-[14px]">
              {budgetActive ? "check" : "expand_more"}
            </span>
          </button>
        </div>
      </section>

      {/* Result count + Sort filter trigger */}
      <section>
        <div className="mb-5 flex items-center justify-between px-1">
          <p className="text-sm font-semibold text-on-surface-variant">
            <span className="text-on-surface font-bold">{filtered.length}</span>{" "}
            kendaraan ditemukan
          </p>
          <button
            onClick={() => setFilterOpen(true)}
            className="flex items-center gap-1 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold text-primary transition-all hover:bg-primary/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">tune</span>
            Filter
            {(transmission !== "all" || sortOrder !== "asc") && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary ml-0.5" />
            )}
          </button>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="rounded-3xl border border-outline-variant/20 bg-surface-container-lowest px-5 py-16 text-center shadow-card">
            <span className="material-symbols-outlined text-[48px] text-outline mb-3 block">
              search_off
            </span>
            <p className="font-bold text-on-surface mb-1">Tidak ada kendaraan</p>
            <p className="text-sm text-on-surface-variant">
              Coba ubah filter atau tingkatkan budget Anda
            </p>
            <button
              onClick={() => { setSearch(""); setActiveType("Semua"); setBudget(MAX_BUDGET); setTransmission("all"); }}
              className="mt-4 btn-ghost text-sm"
            >
              Reset Semua Filter
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </section>

      {budgetOpen && (
        <div className="fixed inset-0 z-[80] animate-fade-in">
          <button
            type="button"
            aria-label="Tutup budget"
            className="absolute inset-0 bg-on-surface/45 backdrop-blur-[2px]"
            onClick={() => setBudgetOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 z-[90] max-h-[88dvh] overflow-y-auto rounded-t-3xl border border-outline-variant/20 bg-surface-container-lowest shadow-2xl animate-slide-up md:bottom-auto md:left-1/2 md:top-1/2 md:w-[440px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl">
            <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full mx-auto mt-3 md:hidden" />
            <div className="px-6 pb-8 pt-4 md:pt-6">
              <div className="flex justify-between items-center mb-5">
                <h2 className="font-headline text-lg font-bold text-on-surface">Budget Maksimum</h2>
                <button onClick={() => setBudgetOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

          {/* Live price display */}
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/15 rounded-2xl py-5 mb-6 text-center">
            <p className="text-xs font-bold uppercase tracking-widest text-primary/70 mb-1">Harga hingga</p>
            <p className="font-headline text-4xl font-black text-primary">
              {pendingBudget >= MAX_BUDGET ? "Semua" : formatRupiah(pendingBudget)}
            </p>
            {pendingBudget < MAX_BUDGET && (
              <p className="text-xs text-on-surface-variant mt-1">per hari</p>
            )}
          </div>

          {/* Slider */}
          <div className="px-1 mb-6">
            <input
              type="range"
              min={MIN_BUDGET}
              max={MAX_BUDGET}
              step="100000"
              value={pendingBudget}
              onChange={(e) => setPendingBudget(parseInt(e.target.value))}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs font-bold text-outline mt-2">
              <span>Rp 300rb</span>
              <span>Rp 15jt+</span>
            </div>
          </div>

          {/* Quick presets */}
          <div className="grid grid-cols-4 gap-2 mb-6">
            {[1_000_000, 3_000_000, 5_000_000, 10_000_000].map((preset) => (
              <button
                key={preset}
                onClick={() => setPendingBudget(preset)}
                className={`py-2 rounded-2xl text-xs font-bold transition-all ${
                  pendingBudget === preset
                    ? "bg-primary text-white"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                }`}
              >
                {preset >= 1_000_000 ? `${preset / 1_000_000}jt` : `${preset / 1000}rb`}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setPendingBudget(MAX_BUDGET); setBudget(MAX_BUDGET); setBudgetOpen(false); }}
              className="flex-1 py-3.5 rounded-full font-bold text-sm border-2 border-outline-variant/30 hover:bg-surface-container transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => { setBudget(pendingBudget); setBudgetOpen(false); }}
              className="flex-[2] py-3.5 rounded-full font-bold text-sm bg-primary text-white shadow-lg hover:-translate-y-0.5 active:scale-[0.97] transition-all"
            >
              Terapkan Budget
            </button>
          </div>
            </div>
          </div>
        </div>
      )}

      {filterOpen && (
        <div className="fixed inset-0 z-[80] animate-fade-in">
          <button
            type="button"
            aria-label="Tutup filter"
            className="absolute inset-0 bg-on-surface/45 backdrop-blur-[2px]"
            onClick={() => setFilterOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 z-[90] max-h-[88dvh] overflow-y-auto rounded-t-3xl border border-outline-variant/20 bg-surface-container-lowest shadow-2xl animate-slide-up md:bottom-auto md:left-1/2 md:top-1/2 md:w-[560px] md:-translate-x-1/2 md:-translate-y-1/2 md:rounded-3xl">
            <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full mx-auto mt-3 md:hidden" />
            <div className="px-6 pb-8 pt-4 md:pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-headline text-lg font-bold text-on-surface">Filter & Urutkan</h2>
                <button onClick={() => setFilterOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

          {/* Sort */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Urutkan Harga</h3>
            <div className="grid grid-cols-2 gap-3">
              {(["asc", "desc"] as const).map((order) => (
                <button
                  key={order}
                  onClick={() => setSortOrder(order)}
                  className={`py-3 rounded-2xl border-2 font-bold text-sm transition-all ${
                    sortOrder === order
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-surface-container-high text-on-surface-variant hover:border-outline-variant/40"
                  }`}
                >
                  {order === "asc" ? "Termurah" : "Termahal"}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-on-surface-variant mb-3 uppercase tracking-wider">Transmisi</h3>
            <div className="flex flex-wrap gap-2">
              {["all", "automatic", "manual"].map((t) => (
                <button
                  key={t}
                  onClick={() => setTransmission(t)}
                  className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                    transmission === t
                      ? "bg-primary text-white shadow-md"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {t === "all" ? "Semua" : t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => { setSortOrder("asc"); setTransmission("all"); setFilterOpen(false); }}
              className="flex-1 py-3.5 rounded-full font-bold text-sm border-2 border-outline-variant/30 hover:bg-surface-container transition-colors"
            >
              Reset
            </button>
            <button
              onClick={() => setFilterOpen(false)}
              className="flex-[2] py-3.5 rounded-full font-bold text-sm bg-primary text-white shadow-lg hover:-translate-y-0.5 active:scale-[0.97] transition-all"
            >
              Terapkan Filter
            </button>
          </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
