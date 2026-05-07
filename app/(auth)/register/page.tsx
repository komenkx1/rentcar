"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const passwordStrength = (pw: string): { label: string; color: string; width: number } => {
    if (pw.length < 6) return { label: "Lemah", color: "bg-error", width: 25 };
    if (pw.length < 8) return { label: "Cukup", color: "bg-amber-500", width: 50 };
    if (pw.length < 10 || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return { label: "Baik", color: "bg-primary", width: 75 };
    return { label: "Kuat", color: "bg-tertiary-container", width: 100 };
  };

  const strength = passwordStrength(password);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!name || name.trim().length < 3) newErrors.name = "Nama minimal 3 karakter";
    if (!phone || !/^[0-9+\-\s]{9,15}$/.test(phone)) newErrors.phone = "Nomor telepon tidak valid";
    if (!email || !/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email tidak valid";
    if (!password || password.length < 8) newErrors.password = "Kata sandi minimal 8 karakter";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSubmitted(true);
    }
  };

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

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-on-tertiary-fixed text-[32px] filled">check_circle</span>
            </div>
            <p className="font-headline text-lg font-bold text-on-surface mb-2">Pendaftaran Berhasil!</p>
            <p className="text-sm text-on-surface-variant mb-6">Akun Anda telah dibuat. Silakan masuk untuk melanjutkan.</p>
            <Link href="/login" className="btn-primary inline-flex">Masuk Sekarang</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control group">
              <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">Nama Lengkap</label>
              <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: "" })); }}
                placeholder="Sesuai KTP/Identitas"
                className={`w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all font-medium placeholder:text-outline/70 ${errors.name ? "border-error ring-2 ring-error" : "border-outline-variant/30 focus:border-primary/50"}`}
              />
              {errors.name && <p className="text-xs text-error mt-1 ml-1">{errors.name}</p>}
            </div>

            <div className="form-control group">
              <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">No. WhatsApp</label>
              <input type="tel" value={phone} onChange={(e) => { setPhone(e.target.value); setErrors((p) => ({ ...p, phone: "" })); }}
                placeholder="08123xxxx"
                className={`w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all font-medium placeholder:text-outline/70 ${errors.phone ? "border-error ring-2 ring-error" : "border-outline-variant/30 focus:border-primary/50"}`}
              />
              {errors.phone && <p className="text-xs text-error mt-1 ml-1">{errors.phone}</p>}
            </div>

            <div className="form-control group">
              <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">Alamat Email</label>
              <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                placeholder="nama@email.com"
                className={`w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all font-medium placeholder:text-outline/70 ${errors.email ? "border-error ring-2 ring-error" : "border-outline-variant/30 focus:border-primary/50"}`}
              />
              {errors.email && <p className="text-xs text-error mt-1 ml-1">{errors.email}</p>}
            </div>

            <div className="form-control group">
              <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">Kata Sandi</label>
              <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                placeholder="Minimal 8 karakter"
                className={`w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all font-medium placeholder:text-outline/70 ${errors.password ? "border-error ring-2 ring-error" : "border-outline-variant/30 focus:border-primary/50"}`}
              />
              {password && (
                <div className="mt-2 space-y-1">
                  <div className="h-1.5 rounded-full bg-surface-container overflow-hidden">
                    <div className={`h-full rounded-full transition-all ${strength.color}`} style={{ width: `${strength.width}%` }} />
                  </div>
                  <p className="text-[10px] text-on-surface-variant font-bold">{strength.label}</p>
                </div>
              )}
              {errors.password && <p className="text-xs text-error mt-1 ml-1">{errors.password}</p>}
            </div>

            <button type="submit" className="btn-primary w-full py-4 mt-4 shadow-[0_4px_14px_0_rgba(0,49,128,0.39)] text-base">
              Daftar Sekarang
            </button>
          </form>
        )}

        <p className="text-[11px] text-on-surface-variant mt-6 text-center leading-relaxed">
          Dengan mendaftar, Anda menyetujui <br className="lg:hidden" /> <Link href="/syarat-ketentuan" className="font-bold text-primary hover:underline">Syarat & Ketentuan</Link> serta <Link href="/kebijakan-privasi" className="font-bold text-primary hover:underline">Kebijakan Privasi</Link> kami.
        </p>
      </div>

      <p className="text-sm text-on-surface-variant mt-10 text-center lg:text-left w-full">
        Sudah memiliki akun?{" "}
        <Link href="/login" className="font-bold text-primary hover:underline">Masuk di sini</Link>
      </p>
    </div>
  );
}
