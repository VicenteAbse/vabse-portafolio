"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectDetail } from "@/content/site";
import { cn } from "@/lib/utils";

type Shot = ProjectDetail["screenshots"][number];

function PhoneFrame({ shot, priority }: { shot: Shot; priority?: boolean }) {
  return (
    <div className="rounded-[2.4rem] border border-white/10 bg-[#0c0c10] p-2 shadow-2xl shadow-black/60">
      <div className="relative aspect-[720/1396] overflow-hidden rounded-[1.9rem] bg-surface">
        <Image
          src={shot.src}
          alt={shot.caption}
          fill
          priority={priority}
          sizes="(min-width: 768px) 260px, 70vw"
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

function NavButton({ dir, onClick, className }: { dir: 1 | -1; onClick: () => void; className?: string }) {
  const Icon = dir === 1 ? ChevronRight : ChevronLeft;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === 1 ? "Siguiente" : "Anterior"}
      className={cn("shrink-0 rounded-full border border-white/15 bg-black/40 p-2 text-white/80 transition hover:text-white", className)}
    >
      <Icon className="size-6" />
    </button>
  );
}

// Fila de capturas que se desliza con el dedo (scroll-snap) y se amplía al tocar.
export function ProjectGallery({ screenshots }: { screenshots: Shot[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open !== null && !dialog.open) dialog.showModal();
    if (open === null && dialog.open) dialog.close();
  }, [open]);

  function step(delta: number) {
    setOpen((i) => (i === null ? i : (i + delta + screenshots.length) % screenshots.length));
  }

  function scrollRow(dir: number) {
    const row = rowRef.current;
    if (row) row.scrollBy({ left: dir * row.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <ul
        ref={rowRef}
        className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] sm:-mx-6 sm:px-6 [&::-webkit-scrollbar]:hidden"
      >
        {screenshots.map((shot, i) => (
          <li key={shot.src} className="w-[68vw] max-w-[260px] shrink-0 snap-center sm:w-[240px]">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="block w-full cursor-zoom-in rounded-[2.4rem] text-left transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand)]"
              aria-label={`Ampliar: ${shot.caption}`}
            >
              <PhoneFrame shot={shot} priority={i < 2} />
            </button>
            <p className="mt-3 text-center font-mono text-xs text-muted">{shot.caption}</p>
          </li>
        ))}
      </ul>

      {screenshots.length > 3 && (
        <div className="mt-2 hidden justify-end gap-2 md:flex">
          <button type="button" onClick={() => scrollRow(-1)} aria-label="Capturas anteriores" className="rounded-full border border-border p-2 text-muted transition hover:text-foreground">
            <ChevronLeft className="size-5" />
          </button>
          <button type="button" onClick={() => scrollRow(1)} aria-label="Capturas siguientes" className="rounded-full border border-border p-2 text-muted transition hover:text-foreground">
            <ChevronRight className="size-5" />
          </button>
        </div>
      )}

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(null)}
        onClick={(e) => e.target === e.currentTarget && setOpen(null)}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") step(1);
          if (e.key === "ArrowLeft") step(-1);
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-black/85 backdrop:backdrop-blur-sm"
      >
        {open !== null && (
          // En el celular las flechas van bajo la imagen (a los costados no caben) y también
          // se puede deslizar con el dedo; desde `sm` van a los lados.
          <div className="flex items-center gap-6">
            <NavButton dir={-1} onClick={() => step(-1)} className="hidden sm:block" />
            <figure
              className="w-[min(calc(100vw-2rem),calc(75dvh*720/1396))] sm:w-[min(60vw,calc(85dvh*720/1396))]"
              onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                if (touchX.current === null) return;
                const dx = e.changedTouches[0].clientX - touchX.current;
                touchX.current = null;
                if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
              }}
            >
              <PhoneFrame shot={screenshots[open]} />
              <figcaption className="mt-3 flex items-center justify-between gap-3 font-mono text-sm text-white/80 sm:justify-center">
                <NavButton dir={-1} onClick={() => step(-1)} className="sm:hidden" />
                <span className="text-center">
                  {screenshots[open].caption} · {open + 1}/{screenshots.length}
                </span>
                <NavButton dir={1} onClick={() => step(1)} className="sm:hidden" />
              </figcaption>
            </figure>
            <NavButton dir={1} onClick={() => step(1)} className="hidden sm:block" />
          </div>
        )}
        <button
          type="button"
          onClick={() => setOpen(null)}
          aria-label="Cerrar"
          className="fixed top-4 right-4 rounded-full border border-white/15 bg-black/40 p-2 text-white/80 transition hover:text-white"
        >
          <X className="size-5" />
        </button>
      </dialog>
    </div>
  );
}
