"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectDetail } from "@/content/site";

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

// Fila de capturas que se desliza con el dedo (scroll-snap) y se amplía al tocar.
export function ProjectGallery({ screenshots }: { screenshots: Shot[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const rowRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<number | null>(null);

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
          <div className="flex items-center gap-3 sm:gap-6">
            <button type="button" onClick={() => step(-1)} aria-label="Anterior" className="rounded-full border border-white/15 bg-black/40 p-2 text-white/80 transition hover:text-white">
              <ChevronLeft className="size-6" />
            </button>
            <figure className="w-[min(78vw,calc(85dvh*720/1396))]">
              <PhoneFrame shot={screenshots[open]} />
              <figcaption className="mt-3 text-center font-mono text-sm text-white/80">
                {screenshots[open].caption} · {open + 1}/{screenshots.length}
              </figcaption>
            </figure>
            <button type="button" onClick={() => step(1)} aria-label="Siguiente" className="rounded-full border border-white/15 bg-black/40 p-2 text-white/80 transition hover:text-white">
              <ChevronRight className="size-6" />
            </button>
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
