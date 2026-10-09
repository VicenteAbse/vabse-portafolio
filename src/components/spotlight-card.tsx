"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

// Tarjeta con un foco de luz que sigue al puntero (solo en dispositivos con hover).
export function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors hover:border-accent/50",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,50%),rgb(47_107_255/0.16),transparent_45%)]"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
