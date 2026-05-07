"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  tap?: boolean;
  as?: "div" | "article" | "section";
}

export function AnimatedCard({ children, className, hover = true, tap = true, as: Tag = "div" }: AnimatedCardProps) {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Tag
      className={cn(
        "bg-surface-container-lowest rounded-2xl shadow-card border border-outline-variant/20",
        hover && "transition-all hover:shadow-card-hover hover:-translate-y-0.5",
        tap && "transition-transform active:scale-[0.98]",
        isPressed && "scale-[0.98]",
        className
      )}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
    >
      {children}
    </Tag>
  );
}
