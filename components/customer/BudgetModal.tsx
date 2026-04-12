"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/utils";

export function BudgetModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [budget, setBudget] = useState(5000000);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex-shrink-0 flex items-center gap-1 px-5 py-2.5 rounded-full bg-surface-container text-on-surface-variant border border-outline-variant/20 text-xs font-bold uppercase tracking-widest hover:bg-surface-container-high transition-all"
      >
        Harga
        <span className="material-symbols-outlined text-[14px]">expand_more</span>
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[80] bg-on-surface/40 backdrop-blur-[2px] animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Modal / Bottom Sheet */}
      <div 
        className={`fixed z-[90] bg-surface-container-lowest 
          /* Mobile Bottom Sheet Styles */
          bottom-0 left-0 right-0 rounded-t-3xl md:rounded-3xl
          /* Desktop Center Modal Styles */
          md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-[400px]
          shadow-2xl border border-outline-variant/20 transition-transform duration-300 transform 
          ${isOpen ? "translate-y-0 md:scale-100" : "translate-y-full md:scale-95 md:opacity-0"}`}
      >
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full mx-auto my-3 md:hidden" />
        
        <div className="px-6 pb-8 pt-4 md:pt-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-lg font-bold text-on-surface">Pilih Budget Harga</h2>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <p className="text-sm font-medium text-on-surface-variant mb-4">
            Tampilkan kendaraan dengan harga sewa hingga:
          </p>
          
          <p className="font-headline text-3xl font-black text-primary mb-8 text-center bg-primary/5 py-4 rounded-2xl border border-primary/10">
            {formatRupiah(budget)}
          </p>

          <div className="px-2 mb-8">
            <input 
              type="range" 
              min="300000" 
              max="15000000" 
              step="100000"
              value={budget}
              onChange={(e) => setBudget(parseInt(e.target.value))}
              className="w-full h-2 bg-surface-container-high rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs font-bold text-outline mt-2">
              <span>Rp 300rb</span>
              <span>Rp 15jt+</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={() => { setBudget(15000000); setIsOpen(false); }}
              className="flex-1 py-3.5 rounded-full font-bold text-sm text-on-surface-variant border-2 border-outline-variant/30 hover:bg-surface-container transition-colors"
            >
              Reset
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="flex-[2] py-3.5 rounded-full font-bold text-sm bg-primary text-white shadow-lg hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              Terapkan Budget
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
