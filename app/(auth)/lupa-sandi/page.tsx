"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError("Email tidak valid");
      return;
    }
    setSent(true);
  };

  return (
    <div className="w-full animate-fade-in flex flex-col items-center lg:items-start">
      <div className="text-center lg:text-left w-full mb-10">
        <h1 className="font-headline text-3xl lg:text-4xl font-black text-on-surface leading-tight mb-3">Lupa<br className="lg:hidden"/> Kata Sandi?</h1>
        <p className="text-on-surface-variant text-sm lg:text-base px-4 lg:px-0">
          Masukkan email Anda dan kami akan mengirimkan tautan untuk mengatur ulang kata sandi.
        </p>
      </div>

      <div className="w-full bg-surface-container-lowest lg:bg-transparent rounded-3xl p-6 lg:p-0 border border-outline-variant/20 lg:border-none shadow-md lg:shadow-none">
        {sent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-tertiary-fixed flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-on-tertiary-fixed text-[32px] filled">mark_email_read</span>
            </div>
            <p className="font-headline text-lg font-bold text-on-surface mb-2">Email Terkirim!</p>
            <p className="text-sm text-on-surface-variant mb-2">
              Kami telah mengirim tautan reset ke <strong>{email}</strong>
            </p>
            <p className="text-xs text-outline mb-6">Cek folder spam jika tidak menemukan email kami.</p>
            <Link href="/login" className="btn-primary inline-flex">Kembali ke Login</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="form-control group">
              <label className="text-xs font-bold text-on-surface-variant mb-2 block ml-1 group-focus-within:text-primary transition-colors">Alamat Email</label>
              <input
                type="email" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="nama@email.com"
                className={`w-full bg-surface-container-low h-14 px-5 rounded-2xl text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/40 border transition-all font-medium placeholder:text-outline/70 ${error ? "border-error ring-2 ring-error" : "border-outline-variant/30 focus:border-primary/50"}`}
              />
              {error && <p className="text-xs text-error mt-1 ml-1">{error}</p>}
            </div>

            <button type="submit" className="btn-primary w-full py-4 mt-4 shadow-[0_4px_14px_0_rgba(0,49,128,0.39)] text-base">
              Kirim Tautan Reset
            </button>
          </form>
        )}
      </div>

      <p className="text-sm text-on-surface-variant mt-10 text-center lg:text-left w-full">
        <Link href="/login" className="font-bold text-primary hover:underline flex items-center justify-center lg:justify-start gap-1">
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Kembali ke Login
        </Link>
      </p>
    </div>
  );
}
