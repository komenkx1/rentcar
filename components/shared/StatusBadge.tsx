import { cn } from "@/lib/utils";

type BadgeVariant = "available" | "rented" | "service" | "blocked" | "pending" | "approved" | "rejected" | "active" | "completed" | "cancelled";

const badgeConfig: Record<BadgeVariant, { label: string; className: string; dot?: boolean }> = {
  available:  { label: "Tersedia",   className: "bg-tertiary-fixed text-on-tertiary-fixed", dot: true },
  rented:     { label: "Disewa",     className: "bg-primary-fixed text-on-primary-fixed", dot: true },
  service:    { label: "Servis",     className: "bg-yellow-100 text-yellow-800" },
  blocked:    { label: "Diblokir",   className: "bg-error-container text-on-error-container" },
  pending:    { label: "Pending",    className: "bg-orange-100 text-orange-800" },
  approved:   { label: "Disetujui", className: "bg-tertiary-fixed text-on-tertiary-fixed", dot: true },
  rejected:   { label: "Ditolak",   className: "bg-error-container text-on-error-container" },
  active:     { label: "Aktif",     className: "bg-tertiary-fixed text-on-tertiary-fixed", dot: true },
  completed:  { label: "Selesai",   className: "bg-surface-container text-on-surface-variant" },
  cancelled:  { label: "Dibatalkan", className: "bg-error-container/50 text-on-error-container" },
};

interface StatusBadgeProps {
  status: BadgeVariant;
  className?: string;
  showLabel?: boolean;
}

export function StatusBadge({ status, className, showLabel = true }: StatusBadgeProps) {
  const config = badgeConfig[status];
  if (!config) return null;

  return (
    <span className={cn("badge", config.className, className)}>
      {config.dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {showLabel && config.label}
    </span>
  );
}
