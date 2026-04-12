import Link from "next/link";


export default function ProfilePage() {
  return (
    <div className="animate-fade-in pb-24 max-w-3xl mx-auto">
      <div className="sticky top-0 z-40 bg-surface/80 backdrop-blur-md border-b border-outline-variant/20 px-4 h-16 flex items-center justify-between">
        <h1 className="font-headline text-lg font-bold text-on-surface">Akun Saya</h1>
      </div>

      <div className="px-5 pt-6">
        {/* Profile Card Mock */}
        <div className="bg-primary/5 rounded-3xl p-6 border border-primary/10 flex items-center gap-4 mb-6 relative overflow-hidden">
          {/* Background pattern mock */}
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant overflow-hidden relative border-2 border-surface shadow-sm">
             <span className="material-symbols-outlined text-[32px]">person</span>
          </div>
          <div className="relative z-10">
            <h2 className="text-on-surface font-headline font-bold text-lg leading-tight">Guest User</h2>
            <p className="text-on-surface-variant text-sm font-medium mt-0.5">Belum login</p>
          </div>
        </div>

        {/* Action Menu */}
        <div className="bg-surface-container rounded-3xl border border-outline-variant/20 overflow-hidden divide-y divide-outline-variant/10">
          <Link href="/auth/login" className="flex items-center justify-between p-5 hover:bg-surface-container-high transition-colors active:bg-surface-container-highest">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">login</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Masuk / Daftar</span>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </Link>

          <Link href="/bantuan" className="flex items-center justify-between p-5 hover:bg-surface-container-high transition-colors active:bg-surface-container-highest">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">help_center</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Pusat Bantuan</span>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </Link>

          <Link href="/kebijakan-privasi" className="flex items-center justify-between p-5 hover:bg-surface-container-high transition-colors active:bg-surface-container-highest">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">shield</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Kebijakan Privasi</span>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </Link>
          
          <Link href="/syarat-ketentuan" className="flex items-center justify-between p-5 hover:bg-surface-container-high transition-colors active:bg-surface-container-highest">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-surface-container-high text-on-surface-variant flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">gavel</span>
              </div>
              <span className="font-bold text-sm text-on-surface">Syarat & Ketentuan</span>
            </div>
            <span className="material-symbols-outlined text-outline">chevron_right</span>
          </Link>
        </div>
        
        <p className="text-center text-xs font-medium text-outline mt-8 uppercase tracking-widest">
          rentCars v2.2
        </p>
      </div>
    </div>
  );
}
