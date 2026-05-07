"use client";

import { useRouter } from "next/navigation";

interface PageHeaderProps {
  title: string;
  backHref?: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

export function PageHeader({ title, backHref, onBack, rightAction }: PageHeaderProps) {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backHref) {
      router.push(backHref);
    } else {
      router.back();
    }
  };

  return (
    <div className="sticky top-0 z-40 bg-surface/70 backdrop-blur-xl border-b border-outline-variant/20 px-4 h-14 flex items-center justify-between shadow-sm">
      <button
        onClick={handleBack}
        className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container rounded-full transition-colors active:scale-95"
        aria-label="Kembali"
      >
        <span className="material-symbols-outlined">arrow_back</span>
      </button>
      <h1 className="font-headline font-bold tracking-tight text-on-surface text-base truncate mx-2 flex-1">
        {title}
      </h1>
      {rightAction ? (
        <div className="flex-shrink-0">{rightAction}</div>
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
}
