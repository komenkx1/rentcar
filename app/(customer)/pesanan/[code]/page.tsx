import Link from "next/link";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { formatRupiah, formatDateRange } from "@/lib/utils";

interface PageProps {
  params: {
    code: string;
  };
}

export default async function OrderStatusPage({ params }: PageProps) {
  const booking = await prisma.booking.findUnique({
    where: { booking_code: params.code },
    include: {
      vehicle: true,
    },
  });

  if (!booking) {
    notFound();
  }

  // Assuming pending status requires payment upload
  const isPending = booking.status === "pending";

  return (
    <div className="animate-fade-in pb-28 max-w-3xl mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/20 px-4 h-14 flex items-center shadow-sm">
        <Link href="/status" className="text-primary hover:opacity-80 transition-opacity scale-95 flex items-center">
          <span className="material-symbols-outlined">arrow_back</span>
        </Link>
        <h1 className="ml-4 font-headline font-bold tracking-tight text-primary text-lg">Detail Pesanan</h1>
      </div>

      <main className="pt-6 px-4 space-y-6">
        
        {/* Reservation Code Snippet */}
        <div className="flex justify-between items-center bg-surface-container rounded-xl p-4 border border-outline-variant/20 shadow-sm">
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-1">Kode Resevasi</p>
            <p className="text-xl font-headline font-black text-primary tracking-widest">{booking.booking_code}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest font-bold mb-1">Total</p>
            <p className="text-sm font-bold text-on-surface">{formatRupiah(booking.total_price)}</p>
          </div>
        </div>

        {/* Status Timeline Section (Stylized from Booking_Status.html) */}
        <section className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary/60">Langkah 1 dari 4</span>
              <h2 className="text-xl font-extrabold text-on-surface mt-1">Menunggu Pembayaran</h2>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary" style={{fontVariationSettings: "'FILL' 1"}}>payments</span>
            </div>
          </div>
          <div className="relative flex justify-between items-start">
            {/* Timeline Line */}
            <div className="absolute top-4 left-0 w-full h-0.5 bg-surface-container-high -z-0"></div>
            <div className="absolute top-4 left-0 w-1/4 h-0.5 bg-primary -z-0"></div>
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white ring-4 ring-surface-container-lowest">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <span className="text-[10px] font-bold text-primary text-center">Bayar</span>
            </div>
            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline ring-4 ring-surface-container-lowest">
                <span className="material-symbols-outlined text-sm">verified_user</span>
              </div>
              <span className="text-[10px] font-medium text-outline text-center">Verifikasi</span>
            </div>
            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline ring-4 ring-surface-container-lowest">
                <span className="material-symbols-outlined text-sm">key</span>
              </div>
              <span className="text-[10px] font-medium text-outline text-center">Konfirmasi</span>
            </div>
            {/* Step 4 */}
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-outline ring-4 ring-surface-container-lowest">
                <span className="material-symbols-outlined text-sm">directions_car</span>
              </div>
              <span className="text-[10px] font-medium text-outline text-center">Perjalanan</span>
            </div>
          </div>
        </section>

        {/* Instruction Section: Bank Transfer */}
        {isPending && (
          <section className="bg-surface-container-low rounded-xl p-1 overflow-hidden">
            <div className="bg-surface-container-lowest rounded-[calc(0.75rem-4px)] p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-10 bg-surface-container flex items-center justify-center rounded-lg border border-outline-variant/20 overflow-hidden px-2">
                  <span className="font-bold text-primary tracking-tighter text-xs">BCA</span>
                </div>
                <div>
                  <h3 className="font-bold text-on-surface">Instruksi Transfer Bank</h3>
                  <p className="text-sm text-on-surface-variant">PT RentaCar Indonesia</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-surface rounded-xl border-b-2 border-primary">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Nomor Rekening</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xl font-mono font-bold tracking-tighter text-on-surface">801 234 5678</span>
                    <button className="text-primary hover:bg-primary/5 p-2 rounded-full transition-colors active:scale-95">
                      <span className="material-symbols-outlined">content_copy</span>
                    </button>
                  </div>
                </div>
                
                <div className="p-4 bg-surface rounded-xl border-b-2 border-primary">
                  <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">Nominal Tepat</span>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-on-surface tracking-tight">
                        {formatRupiah(booking.total_price)}
                      </span>
                    </div>
                    <button className="text-primary hover:bg-primary/5 p-2 rounded-full transition-colors active:scale-95">
                      <span className="material-symbols-outlined">content_copy</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-error mt-2 font-medium">Mohon transfer sesuai nominal untuk mempercepat verifikasi.</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Action Section: Upload Proof */}
        {isPending && (
          <section className="space-y-4 pt-2">
            <h3 className="font-headline text-lg font-extrabold text-on-surface px-1">Unggah Bukti Transfer</h3>
            
            <label className="group relative block w-full aspect-[4/3] rounded-3xl border-2 border-dashed border-outline-variant bg-surface-container-lowest hover:bg-primary/5 hover:border-primary transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden">
              <div className="flex flex-col items-center justify-center space-y-3 group-hover:scale-105 transition-transform duration-300">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                </div>
                <div className="text-center">
                  <p className="font-bold text-on-surface">Pilih Foto Bukti (Tap)</p>
                  <p className="text-xs text-on-surface-variant mt-1">JPG, PNG atau PDF (Max 5MB)</p>
                </div>
              </div>
              <input type="file" className="hidden" accept="image/*,.pdf" />
            </label>
          </section>
        )}
      </main>

      {/* Floating CTA WhatsApp */}
      <div className="fixed bottom-[72px] left-0 right-0 z-50">
        <div className="max-w-xl mx-auto px-5 py-4 bg-surface/80 backdrop-blur-xl border-t border-outline-variant/20 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] flex gap-3">
            <button className="flex-1 btn-primary py-3.5 shadow-lg flex justify-center items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              Kirim Bukti
            </button>
            <Link
              href="https://wa.me/628123456789"
              target="_blank"
              className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center bg-[#25D366] text-white hover:bg-[#20BE5A] shadow-md transition-colors"
            >
              <span className="material-symbols-outlined">chat</span>
            </Link>
        </div>
      </div>
    </div>
  );
}
