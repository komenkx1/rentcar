"use client";

import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange?: (key: string) => void;
  className?: string;
  /** If provided, tabs navigate via URL search param instead of onChange callback */
  baseUrl?: string;
  /** Search param name when using baseUrl (default: "tab") */
  paramName?: string;
}

export function Tabs({ tabs, activeKey, onChange, className, baseUrl, paramName = "tab" }: TabsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClick = useCallback(
    (key: string) => {
      if (baseUrl) {
        const params = new URLSearchParams(searchParams.toString());
        params.set(paramName, key);
        router.push(`${baseUrl}?${params.toString()}`);
      } else if (onChange) {
        onChange(key);
      }
    },
    [baseUrl, paramName, onChange, router, searchParams]
  );

  return (
    <div className={cn("flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => handleClick(tab.key)}
          className={cn(
            "flex-shrink-0 px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all active:scale-95",
            activeKey === tab.key
              ? "bg-primary text-on-primary shadow-md"
              : "bg-surface-container text-on-surface-variant border border-outline-variant/20 hover:bg-surface-container-high"
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
