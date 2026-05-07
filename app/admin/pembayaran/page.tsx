"use client";

import { MOCK_PAYMENTS } from "@/lib/mock";
import { AnimatedCard } from "@/components/shared/AnimatedCard";
import { formatRupiah, formatDate } from "@/lib/utils";
import { useState } from "react";

export default function AdminPaymentsPage() {
  const [filter, setFilter] = useState("all");

  const payments = MOCK_PAYMENTS.filter((p) => {
    if (filter === "pending") return p.status === "pending";
    if (filter === "confirmed") return p.status === "confirmed";
    return true;
  });

  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      <div>
        <h1 className="font-headline text-2xl font-bold text-on-surface">Verifikasi Pembayaran</h1>
        <p className="text-sm text-on-surface-variant mt-1">{MOCK_PAYMENTS.length} total pembayaran</p>
      </div>

      <div className="flex gap-2">
        {["all", "pending", "confirmed"].map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
              filter === f ? "bg-primary text-white" : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {f === "all" ? "Semua" : f === "pending" ? "Pending" : "Terkonfirmasi"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {payments.map((p) => (
          <AnimatedCard key={p.id} className="p-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <p className="font-bold text-on-surface text-sm">{p.booking_code}</p>
                <p className="text-xs text-on-surface-variant">{p.payment_method === "bank_transfer" ? "Transfer Bank" : p.payment_method}</p>
                <p className="text-xs text-outline">{formatDate(p.created_at)}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="font-bold text-primary text-sm">{formatRupiah(p.amount)}</p>
                  <p className="text-xs text-on-surface-variant">{p.bank_account?.split(" ")[0]}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                  p.status === "confirmed" ? "bg-tertiary-fixed text-on-tertiary-fixed" :
                  p.status === "rejected" ? "bg-error-container text-on-error-container" :
                  "bg-orange-100 text-orange-800"
                }`}>
                  {p.status === "confirmed" ? "✓" : p.status === "rejected" ? "✗" : "Pending"}
                </span>
                {p.status === "pending" && (
                  <div className="flex gap-1">
                    <button className="px-3 py-1.5 bg-tertiary-fixed text-on-tertiary-fixed rounded-full text-[10px] font-bold hover:scale-105 transition-transform">Terima</button>
                    <button className="px-3 py-1.5 bg-error-container text-on-error-container rounded-full text-[10px] font-bold hover:scale-105 transition-transform">Tolak</button>
                  </div>
                )}
              </div>
            </div>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
