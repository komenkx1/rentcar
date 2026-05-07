"use client";

import { MOCK_VEHICLES } from "@/lib/mock";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { formatRupiah } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

export default function AdminFleetPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = MOCK_VEHICLES.filter((v) => {
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.brand.toLowerCase().includes(search.toLowerCase()) ||
      v.plate_number.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || v.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="font-headline text-2xl font-bold text-on-surface">Manajemen Armada</h1>
          <p className="text-sm text-on-surface-variant mt-1">{MOCK_VEHICLES.length} kendaraan terdaftar</p>
        </div>
        <Link href="/admin/kendaraan/tambah" className="btn-primary text-sm inline-flex items-center gap-2 self-start">
          <span className="material-symbols-outlined text-[18px]">add</span>
          Tambah Kendaraan
        </Link>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        <input
          type="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="Cari nama, merk, atau plat..."
          className="input-field h-10 max-w-xs text-sm"
        />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="input-field h-10 w-auto text-sm"
        >
          <option value="all">Semua Status</option>
          <option value="available">Tersedia</option>
          <option value="rented">Disewa</option>
          <option value="service">Servis</option>
          <option value="blocked">Diblokir</option>
        </select>
      </div>

      {/* Table / List */}
      <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface-container text-left">
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Kendaraan</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant hidden sm:table-cell">Plat</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant hidden md:table-cell">Tipe</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Harga/Hari</th>
                <th className="p-4 font-bold text-xs uppercase tracking-wider text-on-surface-variant">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10">
              {filtered.map((v) => (
                <tr key={v.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-outline text-[20px]">directions_car</span>
                      </div>
                      <div>
                        <p className="font-bold text-on-surface">{v.brand} {v.name}</p>
                        <p className="text-xs text-on-surface-variant">{v.model} · {v.year} · {v.color}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-on-surface-variant font-mono text-xs hidden sm:table-cell">{v.plate_number}</td>
                  <td className="p-4 text-xs hidden md:table-cell">
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
        {filtered.length === 0 && (
          <div className="text-center py-12 text-on-surface-variant text-sm">Tidak ada kendaraan ditemukan.</div>
        )}
      </div>
    </div>
  );
}
