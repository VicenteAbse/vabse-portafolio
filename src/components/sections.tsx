import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { contact, projects, site, techGroups, terminalScript } from "@/content/site";
import { cn } from "@/lib/utils";
import { CopyEmail } from "./copy-email";
import { GitHubIcon, LinkedInIcon } from "./icons";
import { Reveal } from "./reveal";
import { SpotlightCard } from "./spotlight-card";
import { Terminal } from "./terminal";

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-10">
      <p className="mb-2 font-mono text-sm text-accent-bright">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </Reveal>
  );
}

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden">
      <div aria-hidden className="bg-grid absolute inset-0" />
      <div
        aria-hidden
        className="absolute -top-40 left-1/2 h-[480px] w-[min(900px,140vw)] -translate-x-1/2 rounded-full bg-accent/25 blur-[120px]"
      />

      <div className="relative mx-auto grid min-h-dvh max-w-6xl items-center gap-12 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="animate-fade-up">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1 font-mono text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-bright opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-accent-bright" />
            </span>
            Disponible para nuevos proyectos
          </p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
            Hola, soy{" "}
            <span className="bg-gradient-to-r from-accent-bright via-[#8fb0ff] to-accent bg-clip-text text-transparent">
              {site.name.split(" ")[0]}
            </span>
          </h1>
          <p className="mt-3 font-mono text-lg text-foreground/90 sm:text-xl">{site.role}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{site.tagline}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#proyectos"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_-6px] shadow-accent transition hover:bg-accent-bright"
            >
              Ver proyectos <ArrowDown className="size-4" />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium transition hover:border-accent/60"
            >
              Contactar
            </a>
          </div>
        </div>

        <div className="animate-fade-up [animation-delay:150ms]">
          <Terminal script={terminalScript} />
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="sobre-mi" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="// sobre mí" title="Quién soy" />
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="space-y-4 text-base leading-relaxed text-muted sm:text-lg">
          {site.about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <dl className="divide-y divide-border rounded-2xl border border-border bg-surface/60 font-mono text-sm">
            {site.facts.map((f) => (
              <div key={f.label} className="flex justify-between gap-4 px-5 py-4">
                <dt className="text-muted">{f.label}</dt>
                <dd className="text-right text-foreground">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="// proyectos" title="Cosas que he construido" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.08} className={cn(p.featured && "md:col-span-2")}>
            <SpotlightCard className="h-full">
              <article className="flex h-full flex-col p-6 sm:p-8">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-xl font-semibold sm:text-2xl">{p.name}</h3>
                  {p.featured && (
                    <span className="rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 font-mono text-xs text-accent-bright">
                      destacado
                    </span>
                  )}
                </div>
                <p className={cn("leading-relaxed text-muted", p.featured && "max-w-2xl")}>{p.description}</p>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((t) => (
                    <li key={t} className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-xs text-foreground/80">
                      {t}
                    </li>
                  ))}
                </ul>
                {(p.repo || p.demo) && (
                  <div className="mt-auto flex gap-4 pt-6 text-sm">
                    {p.repo && (
                      <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted transition hover:text-foreground">
                        <GitHubIcon className="size-4" /> Código
                      </a>
                    )}
                    {p.demo && (
                      <a href={p.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-muted transition hover:text-foreground">
                        Ver demo <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                )}
              </article>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Stack() {
  const all = techGroups.flatMap((g) => g.items);
  return (
    <section id="stack" className="py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="// stack" title="Tecnologías con las que trabajo" />
      </div>

      {/* Cinta infinita: la lista va duplicada y se desplaza -50%. */}
      <div className="relative overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
          {[...all, ...all].map((t, i) => (
            <li
              key={i}
              aria-hidden={i >= all.length}
              className="rounded-full border border-border bg-surface/60 px-4 py-2 font-mono text-sm whitespace-nowrap text-foreground/90"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>

      <div className="mx-auto mt-12 grid max-w-6xl gap-5 px-4 sm:px-6 md:grid-cols-3">
        {techGroups.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.08}>
            <SpotlightCard className="h-full p-6">
              <h3 className="mb-4 font-mono text-sm text-accent-bright">{g.title}</h3>
              <ul className="space-y-2 text-foreground/90">
                {g.items.map((t) => (
                  <li key={t} className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-accent" /> {t}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contacto" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 px-6 py-14 text-center sm:px-12 sm:py-20">
          <div aria-hidden className="absolute -bottom-32 left-1/2 h-64 w-[min(640px,120vw)] -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]" />
          <div className="relative">
            <p className="mb-3 font-mono text-sm text-accent-bright">{"// contacto"}</p>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">¿Trabajamos juntos?</h2>
            <p className="mx-auto mt-4 max-w-lg text-muted">
              Si tienes un proyecto, una oferta o solo quieres conversar, escríbeme.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`mailto:${contact.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-[0_0_30px_-6px] shadow-accent transition hover:bg-accent-bright"
              >
                <Mail className="size-4" /> {contact.email}
              </a>
              <CopyEmail email={contact.email} />
            </div>
            <div className="mt-8 flex justify-center gap-3">
              <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="rounded-full border border-border p-3 text-muted transition hover:border-accent/60 hover:text-foreground">
                <GitHubIcon className="size-5" />
              </a>
              <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="rounded-full border border-border p-3 text-muted transition hover:border-accent/60 hover:text-foreground">
                <LinkedInIcon className="size-5" />
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-8 font-mono text-xs text-muted sm:flex-row sm:px-6">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <p>Hecho con Next.js · servido por Caddy</p>
      </div>
    </footer>
  );
}
