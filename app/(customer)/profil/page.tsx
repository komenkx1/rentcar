"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_USERS, MOCK_BOOKINGS } from "@/lib/mock";
import { Tabs } from "@/components/shared/Tabs";
import { EmptyState } from "@/components/shared/EmptyState";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatRupiah, formatDate } from "@/lib/utils";
import { StatusBadge } from "@/components/shared/StatusBadge";

const user = MOCK_USERS.find((u) => u.role === "customer") ?? null;
const userBookings = user ? MOCK_BOOKINGS.filter((b) => b.user_id === user.id) : MOCK_BOOKINGS;

const DASHBOARD_TABS = [
  { key: "overview", label: "Ringkasan" },
  { key: "bookings", label: "Pesanan Saya" },
  { key: "documents", label: "Dokumen" },
  { key: "settings", label: "Pengaturan" },
];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("overview");

  const activeBookings = userBookings.filter((b) => ["pending", "approved", "active"].includes(b.status));

  return (
    <div className="animate-fade-in pb-24 max-w-3xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20 px-4 pt-4 pb-2">
        <h1 className="font-headline text-2xl font-bold text-on-surface mb-3">Akun Saya</h1>
        <Tabs tabs={DASHBOARD_TABS} activeKey={activeTab} onChange={setActiveTab} />
      </div>

      <div className="px-5 pt-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Profile Card */}
            <AnimatedCard className="p-5">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <span className="font-headline text-2xl font-black">
                    {user ? user.name.charAt(0) : "G"}
                  </span>
                </div>
                <div className="flex-1">
                  <h2 className="font-headline text-lg font-bold text-on-surface">
                    {user ? user.name : "Guest User"}
                  </h2>
                  <p className="text-sm text-on-surface-variant">{user?.email ?? "guest@rentcars.com"}</p>
                  {user && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-tertiary-fixed text-on-tertiary-fixed text-[10px] font-bold rounded-full">
                      Customer Premium
                    </span>
                  )}
                </div>
                <Link href="/login" className="text-xs font-bold text-primary hover:underline">
                  {user ? "Edit" : "Masuk"}
                </Link>
              </div>
            </AnimatedCard>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-3">
              <AnimatedCard className="p-4 text-center">
                <p className="font-headline text-2xl font-black text-primary">{userBookings.length}</p>
                <p className="text-xs text-on-surface-variant mt-1">Total Pesanan</p>
              </AnimatedCard>
              <AnimatedCard className="p-4 text-center">
                <p className="font-headline text-2xl font-black text-primary">{activeBookings.length}</p>
                <p className="text-xs text-on-surface-variant mt-1">Pesanan Aktif</p>
              </AnimatedCard>
            </div>

            {/* Recent Bookings */}
            {userBookings.length > 0 && (
              <section>
                <h3 className="font-headline text-lg font-bold text-on-surface mb-3">Pesanan Terbaru</h3>
                <div className="space-y-2">
                  {userBookings.slice(0, 3).map((b) => (
                    <Link key={b.id} href={`/pesanan/${b.booking_code}`}>
                      <AnimatedCard className="p-4 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-outline">directions_car</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-on-surface truncate">{b.vehicle.brand} {b.vehicle.name}</p>
                          <p className="text-xs text-on-surface-variant">{formatDate(b.start_date)} &middot; {b.duration_days} hari</p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <StatusBadge status={b.status as "pending" | "approved" | "active" | "completed" | "cancelled" | "rejected"} />
                          <p className="text-sm font-bold text-primary mt-1">{formatRupiah(b.total_price)}</p>
                        </div>
                      </AnimatedCard>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Links */}
            <div className="space-y-1">
              {[
                { icon: "history", label: "Riwayat Pesanan", href: "/status" },
                { icon: "favorite", label: "Kendaraan Tersimpan", href: "/wishlist" },
                { icon: "help", label: "Pusat Bantuan", href: "/bantuan" },
                { icon: "description", label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
                { icon: "shield", label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
              ].map((item) => (
                <Link key={item.label} href={item.href}
                  className="flex items-center justify-between p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/10 hover:bg-surface-container transition-colors active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline text-[20px]">{item.icon}</span>
                    <span className="text-sm font-medium text-on-surface">{item.label}</span>
                  </div>
                  <span className="material-symbols-outlined text-outline text-[18px]">chevron_right</span>
                </Link>
              ))}
            </div>

            <p className="text-center text-[11px] text-outline mt-4">rentCars v2.3 &middot; Frontend Demo</p>
          </div>
        )}

        {activeTab === "bookings" && (
          <div className="space-y-4">
            {userBookings.length === 0 ? (
              <EmptyState icon="receipt_long" title="Belum Ada Pesanan" description="Pesan kendaraan pertama Anda sekarang." actionLabel="Lihat Katalog" actionHref="/" />
            ) : (
              userBookings.map((b) => (
                <Link key={b.id} href={`/pesanan/${b.booking_code}`}>
                  <AnimatedCard className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-on-surface text-sm">{b.vehicle.brand} {b.vehicle.name}</p>
                        <p className="text-xs text-on-surface-variant">{b.booking_code}</p>
                      </div>
                      <StatusBadge status={b.status as "pending" | "approved" | "active" | "completed" | "cancelled" | "rejected"} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-outline">{formatDate(b.start_date)} — {formatDate(b.end_date)}</span>
                      <span className="font-bold text-primary">{formatRupiah(b.total_price)}</span>
                    </div>
                  </AnimatedCard>
                </Link>
              ))
            )}
          </div>
        )}

        {activeTab === "documents" && (
          <div className="space-y-4">
            <p className="text-sm text-on-surface-variant">Unggah dokumen untuk mempercepat proses verifikasi.</p>
            {[
              { type: "ktp", label: "KTP", desc: "Kartu Tanda Penduduk" },
              { type: "sim", label: "SIM A", desc: "Surat Izin Mengemudi" },
            ].map((doc) => (
              <AnimatedCard key={doc.type} className="p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-outline text-[24px]">credit_card</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-on-surface text-sm">{doc.label}</p>
                  <p className="text-xs text-on-surface-variant">{doc.desc}</p>
                  <p className="text-[10px] text-outline mt-1">Belum diunggah</p>
                </div>
                <button className="text-xs font-bold text-primary hover:bg-primary/5 px-3 py-1.5 rounded-full transition-colors">
                  Unggah
                </button>
              </AnimatedCard>
            ))}
          </div>
        )}

        {activeTab === "settings" && (
          <div className="space-y-4">
            <AnimatedCard className="p-5">
              <h3 className="font-bold text-on-surface mb-4">Informasi Akun</h3>
              <div className="space-y-3">
                {[
                  { label: "Nama", value: user?.name ?? "Guest User" },
                  { label: "Email", value: user?.email ?? "guest@rentcars.com" },
                  { label: "Telepon", value: user?.phone ?? "-" },
                ].map((field) => (
                  <div key={field.label}>
                    <label className="text-xs font-bold text-on-surface-variant">{field.label}</label>
                    <input type="text" defaultValue={field.value}
                      className="w-full input-field h-12 mt-1 text-sm"
                    />
                  </div>
                ))}
              </div>
            </AnimatedCard>

            <AnimatedCard className="p-5">
              <h3 className="font-bold text-on-surface mb-4">Notifikasi</h3>
              <div className="space-y-3">
                {[
                  { label: "Email Promo", checked: true },
                  { label: "Status Pesanan via WhatsApp", checked: true },
                  { label: "Newsletter Bulanan", checked: false },
                ].map((item) => (
                  <label key={item.label} className="flex items-center justify-between cursor-pointer">
                    <span className="text-sm text-on-surface">{item.label}</span>
                    <input type="checkbox" defaultChecked={item.checked}
                      className="w-5 h-5 rounded accent-primary"
                    />
                  </label>
                ))}
              </div>
            </AnimatedCard>

            <button className="w-full py-4 text-error font-bold text-sm hover:bg-error-container/30 rounded-2xl transition-colors">
              Keluar dari Akun
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
