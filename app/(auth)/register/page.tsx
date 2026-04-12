import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  return (
    <div className="w-full animate-fade-in flex flex-col items-center lg:items-start">
      <div className="text-center lg:text-left w-full mb-10">
        <h1 className="font-headline text-3xl lg:text-4xl font-black text-on-surface leading-tight mb-3">Buat Akun<br className="lg:hidden"/> Baru</h1>
        <p className="text-on-surface-variant text-sm lg:text-base px-4 lg:px-0">Bergabung sekarang untuk menikmati kemudahan sewa mobil di seluruh kota.</p>
      </div>

      <div className="w-full bg-surface-container-lowest lg:bg-transparent rounded-3xl p-6 lg:p-0 border border-outline-variant/20 lg:border-none shadow-md lg:shadow-none">
        
        <button type="button" className="w-full h-14 rounded-full border-2 border-outline-variant/30 bg-surface-container-lowest text-on-surface font-bold text-sm flex items-center justify-center gap-3 hover:bg-surface transition-all shadow-sm hover:shadow active:scale-[0.98] mb-6">
          <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="w-5 h-5"/>
          Daftar dengan Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-outline-variant/30 flex-1"></div>
          <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Atau dengan Email</span>
          <div className="h-px bg-outline-variant/30 flex-1"></div>
        </div>

        <form className="space-y-5">
          <div className="form-control group">
            <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">Nama Lengkap</label>
            <input 
              type="text" 
              placeholder="Sesuai KTP/Identitas"
              className="w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/30 focus:border-primary/50 focus:bg-surface-container-lowest transition-all font-medium placeholder:text-outline/70" 
            />
          </div>

          <div className="form-control group">
            <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">No. WhatsApp</label>
            <input 
              type="tel" 
              placeholder="08123xxxx"
              className="w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/30 focus:border-primary/50 focus:bg-surface-container-lowest transition-all font-medium placeholder:text-outline/70" 
            />
          </div>

          <div className="form-control group">
            <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">Alamat Email</label>
            <input 
              type="email" 
              placeholder="nama@email.com"
              className="w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/30 focus:border-primary/50 focus:bg-surface-container-lowest transition-all font-medium placeholder:text-outline/70" 
            />
          </div>
          
          <div className="form-control group">
            <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">Kata Sandi</label>
            <input 
              type="password" 
              placeholder="Minimal 8 karakter"
              className="w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border border-outline-variant/30 focus:border-primary/50 focus:bg-surface-container-lowest transition-all font-medium placeholder:text-outline/70" 
            />
          </div>

          <button type="button" className="btn-primary w-full py-4 mt-4 shadow-[0_4px_14px_0_rgba(0,49,128,0.39)] text-base">
            Daftar Sekarang
          </button>
        </form>

        <p className="text-[11px] text-on-surface-variant mt-6 text-center leading-relaxed">
          Dengan mendaftar, Anda menyetujui <br className="lg:hidden" /> <Link href="/syarat-ketentuan" className="font-bold text-primary hover:underline">Syarat & Ketentuan</Link> serta <Link href="/kebijakan-privasi" className="font-bold text-primary hover:underline">Kebijakan Privasi</Link> kami.
        </p>
      </div>

      <p className="text-sm text-on-surface-variant mt-10 text-center lg:text-left w-full">
        Sudah memiliki akun? {" "}
        <Link href="/auth/login" className="font-bold text-primary hover:underline">Masuk di sini</Link>
      </p>
    </div>
  );
}
