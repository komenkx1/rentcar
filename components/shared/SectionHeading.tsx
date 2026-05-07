import Link from "next/link";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function SectionHeading({ title, subtitle, actionLabel, actionHref, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex items-end justify-between mb-4", className)}>
      <div>
        <h2 className="font-headline text-2xl font-extrabold text-on-surface tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-on-surface-variant mt-1">{subtitle}</p>
        )}
      </div>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="text-sm font-bold text-primary hover:underline flex-shrink-0"
        >
          {actionLabel}
        </Link>
      )}
    </div>
  );
}
