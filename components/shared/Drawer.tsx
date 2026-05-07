"use client";

import { useEffect } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-[80] bg-on-surface/40 backdrop-blur-[2px] animate-fade-in"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed z-[90] bg-surface-container-lowest
          bottom-0 left-0 right-0 rounded-t-3xl max-h-[90dvh] overflow-y-auto
          md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:bottom-auto md:w-[440px] md:rounded-3xl md:max-h-[85vh]
          shadow-2xl border border-outline-variant/20 transition-all duration-300
          ${open ? "translate-y-0" : "translate-y-full"}`}
      >
        <div className="w-12 h-1.5 bg-outline-variant/30 rounded-full mx-auto mt-3 md:hidden" />
        {title && (
          <div className="flex justify-between items-center px-6 pt-4 md:pt-6 mb-4">
            <h2 className="font-headline text-lg font-bold text-on-surface">{title}</h2>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>
        )}
        <div className="px-6 pb-8">{children}</div>
      </div>
    </>
  );
}
