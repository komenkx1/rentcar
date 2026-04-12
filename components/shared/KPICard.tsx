import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface KPICardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: string;
  delta?: {
    value: string;
    positive?: boolean;
  };
  accent?: "primary" | "success" | "warning" | "error";
  className?: string;
  children?: ReactNode;
}

const accentConfig = {
  primary: {
    icon: "bg-primary-fixed text-primary",
    badge: "bg-primary/10 text-primary",
  },
  success: {
    icon: "bg-tertiary-fixed text-tertiary",
    badge: "bg-tertiary-fixed/50 text-on-tertiary-fixed",
  },
  warning: {
    icon: "bg-yellow-100 text-yellow-700",
    badge: "bg-yellow-100 text-yellow-800",
  },
  error: {
    icon: "bg-error-container text-error",
    badge: "bg-error-container text-on-error-container",
  },
};

export function KPICard({
  label,
  value,
  subtitle,
  icon,
  delta,
  accent = "primary",
  className,
  children,
}: KPICardProps) {
  const colors = accentConfig[accent];

  return (
    <div className={cn("kpi-card", className)}>
      <div className="flex items-start justify-between mb-3">
        <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
          {label}
        </p>
        {icon && (
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", colors.icon)}>
            <span className="material-symbols-outlined text-[18px]">{icon}</span>
          </div>
        )}
      </div>

      <p className="font-headline text-2xl font-extrabold text-on-surface tracking-tight">
        {value}
      </p>

      <div className="flex items-center gap-2 mt-2">
        {subtitle && (
          <p className="text-xs text-on-surface-variant">{subtitle}</p>
        )}
        {delta && (
          <span
            className={cn(
              "inline-flex items-center gap-0.5 text-xs font-bold px-1.5 py-0.5 rounded-full",
              delta.positive
                ? "bg-tertiary-fixed/50 text-tertiary"
                : "bg-error-container/50 text-error"
            )}
          >
            <span className="material-symbols-outlined text-[12px]">
              {delta.positive ? "arrow_upward" : "arrow_downward"}
            </span>
            {delta.value}
          </span>
        )}
      </div>

      {children}
    </div>
  );
}
