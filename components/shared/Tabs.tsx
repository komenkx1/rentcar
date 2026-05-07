"use client";

import { cn } from "@/lib/utils";

interface Tab {
  key: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeKey, onChange, className }: TabsProps) {
  return (
    <div className={cn("flex gap-2.5 overflow-x-auto pb-1 scrollbar-hide", className)}>
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
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
