import Link from "next/link";

interface EmptyStateProps {
  icon: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionHref, className = "" }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-20 text-center ${className}`}>
      <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-outline mb-4">
        <span className="material-symbols-outlined text-[32px]">{icon}</span>
      </div>
      <h2 className="text-on-surface font-bold text-lg mb-1">{title}</h2>
      {description && (
        <p className="text-on-surface-variant text-sm max-w-xs">{description}</p>
      )}
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="mt-4 btn-primary inline-flex"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
