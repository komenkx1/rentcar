import prisma from "@/lib/prisma";
import { formatRupiah, formatDate } from "@/lib/utils";
import { Suspense } from "react";

async function PaymentList({ filter }: { filter: string }) {
  const where = filter === "all" ? {} : { status: filter as "pending" | "confirmed" };

  const payments = await prisma.payment.findMany({
    where,
    include: { booking: true },
    orderBy: { created_at: "desc" },
  });

  return (
    <div className="space-y-3">
      {payments.map((p) => (
        <div key={p.id} className="bg-surface-container-lowest border border-outline-variant/20 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-tertiary-container/20 flex items-center justify-center flex-shrink-0">
                <span className="material-symbols-outlined text-on-tertiary-container text-[24px]">receipt</span>
              </div>
              <div>
                <p className="font-bold text-on-surface text-sm">{p.booking.booking_code}</p>
                <p className="text-xs text-on-surface-variant">{p.payment_method === "bank_transfer" ? "Transfer Bank" : p.payment_method}</p>
                <p className="text-xs text-outline">{formatDate(p.created_at.toISOString())}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-bold text-primary text-base">{formatRupiah(p.amount)}</p>
                <p className="text-xs text-on-surface-variant">{p.bank_account?.split(" ")[0] ?? "-"}</p>
              </div>
              <span className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase ${
                p.status === "confirmed" ? "bg-tertiary-fixed text-on-tertiary-fixed" :
                p.status === "rejected" ? "bg-error-container text-on-error-container" :
                "bg-orange-100 text-orange-800"
              }`}>
                {p.status === "confirmed" ? "✓ Confirmed" : p.status === "rejected" ? "✗ Rejected" : "⏳ Pending"}
              </span>
              {p.status === "pending" && (
                <div className="flex gap-2">
                  <form action={`/api/payments/${p.id}/confirm`} method="POST" className="inline">
                    <button className="px-4 py-2 bg-tertiary-fixed text-on-tertiary-fixed rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-sm">Terima</button>
                  </form>
                  <form action={`/api/payments/${p.id}/reject`} method="POST" className="inline">
                    <button className="px-4 py-2 bg-error-container text-on-error-container rounded-xl text-xs font-bold hover:scale-105 transition-transform shadow-sm">Tolak</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {payments.length === 0 && (
        <div className="text-center py-16 bg-surface-container-low rounded-2xl">
          <span className="material-symbols-outlined text-[64px] text-outline block mb-3">payments</span>
          <p className="font-bold text-on-surface">Tidak ada pembayaran</p>
          <p className="text-sm text-on-surface-variant mt-1">Belum ada data pembayaran untuk filter ini</p>
        </div>
      )}
    </div>
  );
}

async function PaymentCount() {
  const count = await prisma.payment.count();
  return <p className="text-sm text-on-surface-variant mt-1">{count} total pembayaran</p>;
}

export default function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: { filter?: string };
}) {
  const filter = searchParams.filter ?? "all";

  return (
    <div className="animate-fade-in p-4 lg:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-tertiary-container/30 flex items-center justify-center">
              <span className="material-symbols-outlined text-on-tertiary-container">payments</span>
            </div>
            <div>
              <h1 className="font-headline text-3xl font-bold text-on-surface">Verifikasi Pembayaran</h1>
              <Suspense fallback={<p className="text-sm text-on-surface-variant mt-1">Memuat...</p>}>
                <PaymentCount />
              </Suspense>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-surface-container-low p-2 rounded-2xl border border-outline-variant/20 w-fit">
        {[
          { key: "all", label: "Semua", icon: "list" },
          { key: "pending", label: "Pending", icon: "schedule" },
          { key: "confirmed", label: "Terkonfirmasi", icon: "check_circle" },
        ].map((f) => (
          <a key={f.key} href={`/admin/pembayaran?filter=${f.key}`}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
              filter === f.key
                ? "bg-primary text-white shadow-lg"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">{f.icon}</span>
            {f.label}
          </a>
        ))}
      </div>

      <Suspense fallback={
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse h-24 bg-surface-container rounded-2xl" />
          ))}
        </div>
      }>
        <PaymentList filter={filter} />
      </Suspense>
    </div>
  );
}
