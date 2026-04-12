"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileHeaderProps {
  title?: string;
  showBack?: boolean;
  showNotification?: boolean;
  showAccount?: boolean;
  className?: string;
}

export function MobileHeader({
  title,
  showBack = false,
  showNotification = false,
  showAccount = false,
  className,
}: MobileHeaderProps) {
  const router = useRouter();

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 glass-effect border-b border-outline-variant/10",
        "h-16 flex items-center px-5",
        className
      )}
    >
      <div className="flex items-center justify-between w-full">
        {/* Left: Back button or Brand */}
        <div className="flex items-center gap-3">
          {showBack ? (
            <button
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-surface-container transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-on-surface">
                arrow_back
              </span>
            </button>
          ) : (
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  directions_car
                </span>
              </div>
              <span className="text-lg font-black font-headline text-primary tracking-tight">
                rentCars
              </span>
            </Link>
          )}

          {title && showBack && (
            <h1 className="font-headline font-bold text-on-surface text-lg tracking-tight">
              {title}
            </h1>
          )}
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-1">
          {showNotification && (
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-[22px]">
                notifications
              </span>
            </button>
          )}
          {showAccount && (
            <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-on-surface-variant text-[22px]">
                account_circle
              </span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
