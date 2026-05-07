"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
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
        <h1 className="font-headline text-3xl lg:text-4xl font-black text-on-surface leading-tight mb-3">Selamat Datang<br className="lg:hidden"/> Kembali!</h1>
        <p className="text-on-surface-variant text-sm lg:text-base px-4 lg:px-0">Masuk untuk melihat pesanan dan melanjutkan perjalanan Anda.</p>
      </div>

      <div className="w-full bg-surface-container-lowest lg:bg-transparent rounded-3xl p-6 lg:p-0 border border-outline-variant/20 lg:border-none shadow-md lg:shadow-none">
        <button type="button" className="w-full h-14 rounded-full border-2 border-outline-variant/30 bg-surface-container-lowest text-on-surface font-bold text-sm flex items-center justify-center gap-3 hover:bg-surface transition-all shadow-sm hover:shadow active:scale-[0.98] mb-6">
          <Image src="https://www.google.com/favicon.ico" alt="Google" width={20} height={20} className="w-5 h-5"/>
          Lanjutkan dengan Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-outline-variant/30 flex-1"></div>
          <span className="text-xs text-on-surface-variant font-bold uppercase tracking-wider">Atau masuk dengan Email</span>
          <div className="h-px bg-outline-variant/30 flex-1"></div>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-on-tertiary-fixed text-[32px] filled">check_circle</span>
            </div>
            <p className="font-headline text-lg font-bold text-on-surface mb-2">Berhasil Masuk!</p>
            <p className="text-sm text-on-surface-variant mb-6">Selamat datang kembali. Anda akan dialihkan ke beranda.</p>
            <Link href="/" className="btn-primary inline-flex">Ke Beranda</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control group">
              <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">Alamat Email</label>
              <input
                type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: "" })); }}
                placeholder="nama@email.com"
                className={`w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all font-medium placeholder:text-outline/70 ${errors.email ? "border-error ring-2 ring-error" : "border-outline-variant/30 focus:border-primary/50"}`}
              />
              {errors.email && <p className="text-xs text-error mt-1 ml-1">{errors.email}</p>}
            </div>

            <div className="form-control group">
              <div className="flex justify-between items-center mb-2 ml-1">
                <label className="text-xs font-bold text-on-surface-variant group-focus-within:text-primary transition-colors">Kata Sandi</label>
                <Link href="/lupa-sandi" className="text-xs font-bold text-primary hover:underline pr-1">Lupa sandi?</Link>
              </div>
              <input
                type="password" value={password} onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: "" })); }}
                placeholder="••••••••"
                className={`w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all font-medium placeholder:text-outline/70 ${errors.password ? "border-error ring-2 ring-error" : "border-outline-variant/30 focus:border-primary/50"}`}
              />
              {errors.password && <p className="text-xs text-error mt-1 ml-1">{errors.password}</p>}
            </div>

            <button type="submit" className="btn-primary w-full py-4 mt-4 shadow-[0_4px_14px_0_rgba(0,49,128,0.39)] text-base">
              Masuk Sekarang
            </button>
          </form>
        )}
      </div>

      <p className="text-sm text-on-surface-variant mt-10 text-center lg:text-left w-full">
        Belum punya akun?{" "}
        <Link href="/register" className="font-bold text-primary hover:underline">Daftar Gratis</Link>
      </p>
    </div>
  );
}
