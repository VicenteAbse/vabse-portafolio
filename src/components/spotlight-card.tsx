"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

// Tarjeta con un foco de luz que sigue al puntero (solo en dispositivos con hover).
// `accent` cambia el color del foco y del borde (por defecto, el azul del sitio).
export function SpotlightCard({
  children,
  className,
  accent,
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
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
      style={accent ? ({ "--spot": accent } as React.CSSProperties) : undefined}
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors hover:border-[color-mix(in_srgb,var(--spot,var(--accent))_50%,transparent)]",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(420px_circle_at_var(--x,50%)_var(--y,50%),color-mix(in_srgb,var(--spot,var(--accent))_16%,transparent),transparent_45%)]"
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
