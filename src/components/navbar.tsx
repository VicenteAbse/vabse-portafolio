"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#stack", label: "Stack" },
  { href: "#contacto", label: "Contacto" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-3 z-50 flex justify-center px-4">
      <nav
        className={cn(
          "flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border px-2 py-1.5 transition-colors duration-300 sm:px-3",
          scrolled ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <a
          href="#inicio"
          className="rounded-full px-2 py-1 font-mono text-sm font-semibold text-foreground"
          aria-label="Ir al inicio"
        >
          <span className="text-accent-bright">&gt;</span>va<span className="animate-blink text-accent-bright">_</span>
        </a>
        <ul className="flex items-center">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-2 py-1.5 text-xs text-muted transition-colors hover:bg-white/5 hover:text-foreground sm:px-3 sm:text-sm"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
