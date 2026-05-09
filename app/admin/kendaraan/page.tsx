import prisma from "@/lib/prisma";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { Suspense } from "react";

async function FleetList({ search, statusFilter }: { search: string; statusFilter: string }) {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: { created_at: "desc" },
  });

  const filtered = vehicles.filter((v) => {
    const matchSearch = !search ||
      v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.plate_number?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      {/* Mobile cards */}
      <div className="grid gap-4 md:hidden">
        {filtered.map((v) => (
          <div key={v.id} className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-primary text-[28px]">directions_car</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-bold text-on-surface text-base">{v.brand} {v.name}</p>
                    <p className="text-xs text-on-surface-variant">{v.model} · {v.year} · {v.color}</p>
                    <p className="text-xs text-outline mt-1 font-mono">{v.plate_number ?? "-"}</p>
                  </div>
                  <StatusBadge status={v.status} />
                </div>
                <div className="mt-3 pt-3 border-t border-outline-variant/10 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-primary text-sm">{formatRupiah(v.price_self_drive_per_day)}</p>
                    <p className="text-[10px] text-outline capitalize">{v.type} · {v.transmission}</p>
                  </div>
                  {v.has_driver_option && <p className="text-[10px] text-outline">+ Supir</p>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container text-left">
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Kendaraan</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Plat</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Tipe</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Harga/Hari</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary text-[22px]">directions_car</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{v.brand} {v.name}</p>
                        <p className="text-xs text-on-surface-variant">{v.model} · {v.year} · {v.color}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-on-surface-variant font-mono text-xs">{v.plate_number ?? "-"}</td>
                  <td className="p-4 text-xs">
                    <span className="capitalize">{v.type}</span> · <span className="capitalize">{v.transmission}</span>
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-primary text-xs">{formatRupiah(v.price_self_drive_per_day)}</p>
                    {v.has_driver_option && (
                      <p className="text-[10px] text-outline">{formatRupiah(v.price_with_driver_per_day)} (supir)</p>
                    )}
                  </td>
                  <td className="p-4">
                    <StatusBadge status={v.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 bg-surface-container-low rounded-2xl text-on-surface-variant text-sm">
          <span className="material-symbols-outlined text-[48px] text-outline block mb-2">search_off</span>
          Tidak ada kendaraan ditemukan.
        </div>
      )}
    </>
  );
}

async function FleetCount() {
  const count = await prisma.vehicle.count();
  return <p className="text-sm text-on-surface-variant mt-1">{count} kendaraan terdaftar</p>;
}

export default function AdminFleetPage({
  searchParams,
}: {
  searchParams: { search?: string; status?: string };
}) {
  const search = searchParams.search ?? "";
  const statusFilter = searchParams.status ?? "all";

  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold text-on-surface">Manajemen Armada</h1>
          <Suspense fallback={<p className="text-sm text-on-surface-variant mt-1">Memuat...</p>}>
            <FleetCount />
          </Suspense>
        </div>
        <Link href="/admin/kendaraan/tambah" className="btn-primary text-sm inline-flex items-center gap-2 self-start shadow-lg hover:shadow-xl transition-shadow">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah Kendaraan
        </Link>
      </div>

      {/* Filters */}
      <form className="flex gap-3 flex-wrap bg-surface-container-low p-4 rounded-2xl border border-outline-variant/20">
        <input
          type="search" name="search" defaultValue={search}
          placeholder="🔍 Cari nama, merk, atau plat..."
          className="input-field h-11 flex-1 min-w-[250px] text-sm"
        />
        <select name="status" defaultValue={statusFilter}
          className="input-field h-11 w-auto text-sm min-w-[150px]"
        >
          <option value="all">📋 Semua Status</option>
          <option value="available">✅ Tersedia</option>
          <option value="rented">🚗 Disewa</option>
          <option value="service">🔧 Servis</option>
          <option value="blocked">🚫 Diblokir</option>
        </select>
        <button type="submit" className="btn-secondary h-11 px-6 font-bold">Filter</button>
      </form>

      <Suspense fallback={
        <div className="animate-pulse h-96 bg-surface-container rounded-2xl" />
      }>
        <FleetList search={search} statusFilter={statusFilter} />
      </Suspense>
    </div>
  );
}
