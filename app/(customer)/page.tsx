import prisma from "@/lib/prisma";
import { VehicleCard } from "@/components/shared/VehicleCard";
import { FilterModal } from "@/components/customer/FilterModal";
import { BudgetModal } from "@/components/customer/BudgetModal";

const filterTypes = ["Semua", "Sedan", "SUV", "MPV", "Pickup"];

export default async function CatalogPage() {
  // Fetch vehicles from Supabase DB where status is not blocked or archived
  const vehicles = await prisma.vehicle.findMany({
    where: {
      status: {
        in: ["available", "rented", "service"],
      },
    },
    orderBy: {
      price_self_drive_per_day: "asc", 
    },
  });

  return (
    <div className="animate-fade-in">
      {/* Editorial Header */}
      <section className="px-5 pt-6 pb-6">
        <h1 className="font-headline text-3xl font-extrabold tracking-tight text-on-surface leading-tight">
          Pilih Kendaraan<br />
          <span className="text-primary">Terbaik Anda</span>
        </h1>
        <p className="text-on-surface-variant text-sm mt-2 font-medium">
          Armada premium untuk setiap perjalanan Anda.
        </p>
      </section>

      {/* Search & Filter */}
      <section className="px-5 space-y-4 mb-6 max-w-2xl">
        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-outline text-[20px]">search</span>
          </div>
          <input
            type="search"
            placeholder="Cari model atau merk mobil..."
            className="w-full h-14 pl-12 pr-4 bg-surface-container border-none rounded-2xl text-on-surface focus:ring-2 focus:ring-primary/30 transition-all placeholder:text-outline"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide">
          {filterTypes.map((type, i) => (
            <button
              key={type}
              className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95 ${
                i === 0
                  ? "bg-primary text-on-primary shadow-md"
                  : "bg-surface-container text-on-surface-variant border border-outline-variant/20 hover:bg-surface-container-high"
              }`}
            >
              {type}
            </button>
          ))}
          <BudgetModal />
        </div>
      </section>

      {/* Vehicle Grid */}
      <section className="px-4">
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-sm font-semibold text-on-surface-variant">
            <span className="text-on-surface font-bold">{vehicles.length}</span> kendaraan tersedia
          </p>
          <FilterModal />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.id} vehicle={vehicle} />
          ))}
        </div>

        {/* Load more */}
        <div className="py-8 text-center">
          <button className="btn-secondary text-sm">
            Lihat Lebih Banyak
          </button>
        </div>
      </section>
    </div>
  );
}
