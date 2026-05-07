"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MOCK_BOOKINGS } from "@/lib/mock";
import { formatRupiah, formatDate } from "@/lib/utils";
import { EmptyState } from "@/components/shared/EmptyState";

const TIMELINE_STEPS = [
  { key: "pending", label: "Bayar", icon: "payments" },
  { key: "approved", label: "Verifikasi", icon: "verified_user" },
  { key: "active", label: "Konfirmasi", icon: "key" },
  { key: "completed", label: "Perjalanan", icon: "directions_car" },
];

const STATUS_ORDER = ["pending", "approved", "active", "completed"];

function getCurrentStep(status: string): number {
  if (status === "rejected" || status === "cancelled") return 0;
  return STATUS_ORDER.indexOf(status);
}

export default function OrderStatusPage() {
  const params = useParams();
  const code = params.code as string;
  const booking = MOCK_BOOKINGS.find((b) => b.booking_code === code);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);

  if (!booking) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <EmptyState
          icon="receipt_long"
          title="Pesanan Tidak Ditemukan"
          description={`Kode reservasi ${code} tidak ditemukan dalam sistem kami.`}
          actionLabel="Cek Pesanan Lain"
          actionHref="/status"
        />
      </div>
    );
  }

  const currentStep = getCurrentStep(booking.status);
  const isPending = booking.status === "pending";
  const isRejected = booking.status === "rejected";
  const isCancelled = booking.status === "cancelled";
  const isProblem = isRejected || isCancelled;

  const simulateUpload = () => {
    setUploadProgress(0);
    setUploaded(false);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploaded(true);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/20 px-4 h-14 flex items-center shadow-sm">
        <Link href="/status" className="text-primary hover:opacity-80 transition-opacity flex items-center active:scale-95">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="ml-4 font-headline font-bold tracking-tight text-primary text-lg">Detail Pesanan</h1>
      </div>

      <main className="pt-6 px-4 space-y-6">
        {/* Reservation Code */}
        <div className="flex justify-between items-center bg-surface-container rounded-xl p-4 border border-outline-variant/20 shadow-sm">
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-1">Kode Reservasi</p>
            <p className="text-xl font-headline font-black text-primary tracking-widest">{booking.booking_code}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-1">Total</p>
            <p className="text-sm font-bold text-on-surface">{formatRupiah(booking.total_price)}</p>
          </div>
        </div>

        {/* Booking Info */}
        <div className="bg-surface-container rounded-xl p-4 border border-outline-variant/20 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-outline">Kendaraan</span>
            <span className="font-bold text-on-surface">{booking.vehicle.brand} {booking.vehicle.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-outline">Periode</span>
            <span className="font-medium text-on-surface">{formatDate(booking.start_date)} — {formatDate(booking.end_date)} ({booking.duration_days} hari)</span>
          </div>
          <div className="flex justify-between">
            <span className="text-outline">Tipe Sewa</span>
            <span className="font-medium text-on-surface">{booking.rental_type === "self_drive" ? "Lepas Kunci" : "Dengan Supir"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-outline">Lokasi Jemput</span>
            <span className="font-medium text-on-surface text-right max-w-[200px] truncate">{booking.pickup_location}</span>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-center gap-2">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${
            isProblem ? "bg-error-container text-on-error-container" :
            isPending ? "bg-orange-100 text-orange-800" :
            "bg-tertiary-fixed text-on-tertiary-fixed"
          }`}>
            {booking.status === "pending" && "Menunggu Bayar"}
            {booking.status === "approved" && "Disetujui"}
            {booking.status === "active" && "Berjalan"}
            {booking.status === "completed" && "Selesai"}
            {booking.status === "cancelled" && "Dibatalkan"}
            {booking.status === "rejected" && "Ditolak"}
          </span>
        </div>

        {/* Rejection Reason */}
        {isRejected && booking.rejection_reason && (
          <div className="bg-error-container/30 rounded-xl p-4 border border-error/20">
            <p className="text-xs font-bold text-error mb-1">Alasan Penolakan</p>
            <p className="text-sm text-on-surface-variant">{booking.rejection_reason}</p>
          </div>
        )}

        {/* Timeline */}
        <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary/60">
                Langkah {isProblem ? "-" : `${currentStep + 1} dari 4`}
              </span>
              <h2 className="text-xl font-extrabold text-on-surface mt-1">
                {isProblem ? "Pesanan Tidak Aktif" :
                 isPending ? "Menunggu Pembayaran" :
                 booking.status === "approved" ? "Pembayaran Terverifikasi" :
                 booking.status === "active" ? "Perjalanan Aktif" :
                 "Perjalanan Selesai"}
              </h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary filled">payments</span>
            </div>
          </div>

          <div className="relative flex justify-between items-start">
            <div className="absolute top-4 left-0 w-full h-0.5 bg-surface-container-high -z-0" />
            <div
              className="absolute top-4 left-0 h-0.5 bg-primary -z-0 transition-all duration-500"
              style={{ width: isProblem ? "0%" : `${(currentStep / (TIMELINE_STEPS.length - 1)) * 100}%` }}
            />

            {TIMELINE_STEPS.map((step, i) => {
              const done = i <= currentStep && !isProblem;
              return (
                <div key={step.key} className="relative z-10 flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-surface-container-lowest ${
                    done ? "bg-primary text-white" : "bg-surface-container-high text-outline"
                  }`}>
                    <span className="material-symbols-outlined text-sm">{done ? "check" : step.icon}</span>
                  </div>
                  <span className={`text-[10px] font-medium text-center ${done ? "text-primary font-bold" : "text-outline"}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bank Transfer */}
        {isPending && (
          <section className="bg-surface-container-low rounded-xl p-1 overflow-hidden">
            <div className="bg-surface-container-lowest rounded-[calc(0.75rem-4px)] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-10 bg-surface-container flex items-center justify-center rounded-lg border border-outline-variant/20 overflow-hidden px-2">
                  <span className="font-bold text-primary tracking-tighter text-xs">BCA</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Instruksi Transfer Bank</h3>
                  <p className="text-sm text-on-surface-variant">PT RentCar Indonesia</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-surface rounded-xl border-b-2 border-primary">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Nomor Rekening</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-mono font-bold tracking-tighter text-on-surface">801 234 5678</span>
                    <button onClick={() => navigator.clipboard?.writeText("8012345678")} className="text-primary hover:bg-primary/5 p-2 rounded-full transition-colors active:scale-95">
                      <span className="material-symbols-outlined">content_copy</span>
                    </button>
                  </div>
                </div>

                <div className="p-4 bg-surface rounded-xl border-b-2 border-primary">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Nominal Tepat</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-black text-on-surface tracking-tight">{formatRupiah(booking.total_price)}</span>
                    <button onClick={() => navigator.clipboard?.writeText(String(booking.total_price))} className="text-primary hover:bg-primary/5 p-2 rounded-full transition-colors active:scale-95">
                      <span className="material-symbols-outlined">content_copy</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-error mt-2 font-medium">Transfer sesuai nominal agar verifikasi otomatis.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Upload Section */}
        {isPending && (
          <section className="space-y-4 pt-2">
            <h3 className="font-headline text-lg font-extrabold text-on-surface px-1">Unggah Bukti Transfer</h3>

            <button
              onClick={simulateUpload}
              className="group relative block w-full aspect-[4/3] rounded-3xl border-2 border-dashed border-outline-variant bg-surface-container-lowest hover:bg-primary/5 hover:border-primary transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden"
            >
              <div className="flex flex-col items-center justify-center space-y-3 group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">{uploaded ? "check_circle" : "cloud_upload"}</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-on-surface">
                    {uploaded ? "Bukti Terkirim!" : "Pilih Foto Bukti (Tap)"}
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1">JPG, PNG atau PDF (Max 5MB)</p>
                </div>
              </div>
            </button>

            {uploadProgress > 0 && uploadProgress < 100 && (
              <div className="bg-surface-container rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-200"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            )}
          </section>
        )}
      </main>

      {/* Floating CTA */}
      <div className="fixed bottom-[72px] left-0 right-0 z-50">
        <div className="max-w-xl mx-auto px-5 py-4 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex gap-3">
          {isPending && (
            <button className="flex-1 btn-primary py-3.5 shadow-lg flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Kirim Bukti
            </button>
          )}
          {!isProblem && (
            <a
              href="https://wa.me/628123456789"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-[#25D366] text-white hover:bg-[#20BE5A] shadow-md transition-colors"
            >
              <span className="material-symbols-outlined">chat</span>
            </a>
          )}
          {(isProblem || booking.status === "completed") && (
            <Link href="/" className="flex-1 btn-primary py-3.5 shadow-lg flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">directions_car</span>
              Sewa Lagi
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
