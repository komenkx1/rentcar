"use client";

import { useState } from "react";

export function FilterModal() {
  const [isOpen, setIsOpen] = useState(false);

  // States for filter choices
  const [sortOrder, setSortOrder] = useState("lowest");
  const [transmission, setTransmission] = useState("all");

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-1 text-xs text-primary font-bold bg-primary/10 px-3 py-1.5 rounded-lg hover:bg-primary/20 transition-colors"
      >
        <span className="material-symbols-outlined text-[16px]">tune</span>
        Filter
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-on-surface/40 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Bottom Sheet Modal */}
      <div 
        className={`fixed bottom-0 left-0 right-0 z-[70] bg-surface rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300 transform ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full mx-auto my-3" />
        
        <div className="px-5 pb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline text-lg font-bold text-on-surface">Filter & Urutkan</h2>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container hover:bg-surface-container-high transition-colors text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Sort By Section */}
          <div className="mb-6">
            <h3 className="text-sm font-bold text-on-surface mb-3 uppercase tracking-wider">Urutkan Harga</h3>
            <div className="grid grid-cols-2 gap-3">
              <label className="cursor-pointer">
                <input 
                  type="radio" 
                  name="sortOrder" 
                  value="lowest" 
                  checked={sortOrder === "lowest"}
                  onChange={() => setSortOrder("lowest")}
                  className="peer sr-only"
                />
                <div className="p-3 rounded-xl border-2 border-surface-container text-center transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                  <span className="font-bold text-sm text-on-surface peer-checked:text-primary">Termurah</span>
                </div>
              </label>
              <label className="cursor-pointer">
                <input 
                  type="radio" 
                  name="sortOrder" 
                  value="highest" 
                  checked={sortOrder === "highest"}
                  onChange={() => setSortOrder("highest")}
                  className="peer sr-only"
                />
                <div className="p-3 rounded-xl border-2 border-surface-container text-center transition-all peer-checked:border-primary peer-checked:bg-primary/5">
                  <span className="font-bold text-sm text-on-surface peer-checked:text-primary">Termahal</span>
                </div>
              </label>
            </div>
          </div>

          {/* Transmission Section */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-on-surface mb-3 uppercase tracking-wider">Transmisi</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setTransmission("all")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${transmission === "all" ? "bg-primary text-on-primary shadow-md" : "bg-surface-container text-on-surface-variant"}`}
              >
                Semua
              </button>
              <button 
                onClick={() => setTransmission("automatic")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${transmission === "automatic" ? "bg-primary text-on-primary shadow-md" : "bg-surface-container text-on-surface-variant"}`}
              >
                Automatic
              </button>
              <button 
                onClick={() => setTransmission("manual")}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${transmission === "manual" ? "bg-primary text-on-primary shadow-md" : "bg-surface-container text-on-surface-variant"}`}
              >
                Manual
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => {
                setSortOrder("lowest");
                setTransmission("all");
              }}
              className="flex-1 py-3.5 rounded-xl font-bold text-sm text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors"
            >
              Reset
            </button>
            <button 
              onClick={() => setIsOpen(false)}
              className="flex-[2] btn-primary py-3.5 shadow-lg"
            >
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
