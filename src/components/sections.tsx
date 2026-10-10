import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { contact, projects, site, techGroups, terminalScript, type Project } from "@/content/site";
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
            Full stack · Chile
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
              href="#redes"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium transition hover:border-accent/60"
            >
              Mis redes
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

const statusLabel = { produccion: "En producción", desarrollo: "En desarrollo" } as const;

export function StatusBadge({ status }: { status: NonNullable<Project["status"]> }) {
  const live = status === "produccion";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-2.5 py-0.5 font-mono text-xs text-foreground/80">
      <span className="relative flex size-2">
        {live && <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />}
        <span className={cn("relative inline-flex size-2 rounded-full", live ? "bg-emerald-400" : "bg-amber-400")} />
      </span>
      {statusLabel[status]}
    </span>
  );
}

export function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="mt-5 flex flex-wrap gap-2">
      {stack.map((t) => (
        <li key={t} className="rounded-md border border-border bg-background/60 px-2 py-1 font-mono text-xs text-foreground/80">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ p }: { p: Project }) {
  if (!p.url && !p.repo && !p.demo) return null;
  return (
    <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-6 text-sm">
      {p.url && (
        <a
          href={p.url}
          target="_blank"
          rel="noreferrer"
          style={p.brand ? { backgroundColor: p.brand.accent } : undefined}
          className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 font-medium text-white transition hover:brightness-125"
        >
          Visitar {new URL(p.url).hostname.replace(/^www\./, "")} <ArrowUpRight className="size-4" />
        </a>
      )}
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
  );
}

// Proyecto destacado: ocupa todo el ancho y muestra una captura del sitio
// dentro de una ventana de navegador, con el color de marca del proyecto.
function FeaturedProject({ p }: { p: Project }) {
  const host = p.url ? new URL(p.url).hostname.replace(/^www\./, "") : undefined;
  return (
    <SpotlightCard accent={p.brand?.accent}>
      <article className="grid items-center gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1.2fr] lg:gap-10">
        <div className="flex h-full flex-col">
          <div className="mb-5 flex flex-wrap items-center gap-3">
            {p.status && <StatusBadge status={p.status} />}
            <span className="font-mono text-xs text-muted">Estudio jurídico</span>
          </div>
          {p.brand?.logo ? (
            <h3>
              <Image src={p.brand.logo} alt={p.name} width={1778} height={649} className="h-14 w-auto sm:h-16" />
            </h3>
          ) : (
            <h3 className="text-2xl font-semibold sm:text-3xl">{p.name}</h3>
          )}
          <p className="mt-5 leading-relaxed text-muted">{p.description}</p>
          <StackList stack={p.stack} />
          <ProjectLinks p={p} />
        </div>

        {p.preview && (
          <a
            href={p.url}
            target="_blank"
            rel="noreferrer"
            aria-label={host ? `Abrir ${host}` : p.name}
            className="block overflow-hidden rounded-xl border border-border bg-background shadow-2xl shadow-black/50"
          >
            <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              <span className="size-2.5 rounded-full bg-white/15" />
              {host && (
                <span className="mx-auto rounded-md bg-white/5 px-3 py-0.5 font-mono text-[11px] text-muted">{host}</span>
              )}
            </div>
            <div className="overflow-hidden">
              <Image
                src={p.preview.src}
                alt={p.preview.alt}
                width={1100}
                height={687}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </a>
        )}
      </article>
    </SpotlightCard>
  );
}

// Tres capturas en abanico: la del centro adelante, las laterales inclinadas detrás.
function PhoneStack({ shots }: { shots: { src: string; caption: string }[] }) {
  // En el celular los teléfonos son más chicos y se superponen menos, para que quepan los tres.
  const pose = [
    "-rotate-6 translate-x-4 translate-y-3 sm:translate-x-6 sm:translate-y-4 group-hover:-rotate-9 group-hover:translate-x-3",
    "z-10 group-hover:-translate-y-2",
    "rotate-6 -translate-x-4 translate-y-3 sm:-translate-x-6 sm:translate-y-4 group-hover:rotate-9 group-hover:-translate-x-3",
  ];
  return (
    <div aria-hidden className="flex justify-center pt-2 pb-4 sm:pt-0 sm:pb-0">
      {shots.map((shot, i) => (
        <div
          key={shot.src}
          className={cn(
            "w-[30%] max-w-36 shrink-0 rounded-[1.1rem] border border-white/10 bg-[#0c0c10] p-1 shadow-2xl shadow-black/60 transition-transform duration-500 ease-out sm:w-36 sm:rounded-[1.6rem] sm:p-1.5 lg:w-40 lg:max-w-40",
            pose[i],
          )}
        >
          <div className="relative aspect-[720/1396] overflow-hidden rounded-[0.8rem] sm:rounded-[1.25rem]">
            <Image src={shot.src} alt="" fill sizes="(min-width: 640px) 160px, 30vw" className="object-cover object-top" />
          </div>
        </div>
      ))}
    </div>
  );
}

// `wide`: la tarjeta ocupa todo el ancho (no tiene pareja en la fila) y, si el proyecto
// tiene capturas, muestra las primeras en marcos de teléfono al costado.
function ProjectCard({ p, wide }: { p: Project; wide?: boolean }) {
  const href = p.detail ? `/proyectos/${p.detail.slug}/` : undefined;
  const shots = wide ? (p.detail?.screenshots.slice(0, 3) ?? []) : [];
  return (
    <SpotlightCard className="h-full" accent={p.brand?.accent}>
      {/* Con página de detalle, toda la tarjeta es clicable (enlace estirado sobre el título);
          los demás enlaces quedan encima con `relative z-10`. */}
      <article
        className={cn(
          "h-full p-6 sm:p-8",
          shots.length > 0 ? "grid items-center gap-8 lg:grid-cols-[1fr_1fr]" : "flex flex-col",
        )}
      >
        <div className="flex h-full flex-col">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            {href && p.detail ? (
              <ViewTransition name={`project-${p.detail.slug}`} share="morph" default="none">
                <h3 className="text-xl font-semibold sm:text-2xl">
                  <Link href={href} className="after:absolute after:inset-0 after:content-['']">
                    {p.name}
                  </Link>
                </h3>
              </ViewTransition>
            ) : (
              <h3 className="text-xl font-semibold sm:text-2xl">{p.name}</h3>
            )}
            {p.status && <StatusBadge status={p.status} />}
          </div>
          <p className="leading-relaxed text-muted">{p.description}</p>
          <StackList stack={p.stack} />
          {href && (
            <span
              aria-hidden
              style={p.brand ? { color: p.brand.accent } : undefined}
              className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent-bright brightness-125"
            >
              Ver detalle y capturas
              <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          )}
          <div className="relative z-10 mt-auto">
            <ProjectLinks p={p} />
          </div>
        </div>
        {shots.length > 0 && <PhoneStack shots={shots} />}
      </article>
    </SpotlightCard>
  );
}

export function Projects() {
  return (
    <section id="proyectos" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="// proyectos" title="Cosas que he construido" />
      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((p, i) => {
          // Una tarjeta normal sin pareja (impar y última) ocupa todo el ancho.
          const regular = projects.filter((q) => !q.featured);
          const alone = !p.featured && regular.length % 2 === 1 && regular.at(-1) === p;
          return (
            <Reveal key={p.name} delay={i * 0.08} className={cn((p.featured || alone) && "md:col-span-2")}>
              {p.featured ? <FeaturedProject p={p} /> : <ProjectCard p={p} wide={alone} />}
            </Reveal>
          );
        })}
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

// Último tramo de la URL de un perfil (el nombre de usuario).
function handle(url: string) {
  return url.replace(/\/$/, "").split("/").pop() ?? url;
}

export function Socials() {
  const links = [
    { label: "GitHub", handle: handle(contact.github), href: contact.github, icon: GitHubIcon, external: true },
    { label: "LinkedIn", handle: handle(contact.linkedin), href: contact.linkedin, icon: LinkedInIcon, external: true },
    { label: "Email", handle: contact.email, href: `mailto:${contact.email}`, icon: Mail, external: false },
  ];
  return (
    <section id="redes" className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 px-6 py-14 sm:px-12 sm:py-16">
          <div aria-hidden className="absolute -bottom-32 left-1/2 h-64 w-[min(640px,120vw)] -translate-x-1/2 rounded-full bg-accent/25 blur-[100px]" />
          <div className="relative">
            <div className="text-center">
              <p className="mb-3 font-mono text-sm text-accent-bright">{"// redes"}</p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">Mis redes</h2>
              <p className="mx-auto mt-4 max-w-lg text-muted">
                Aquí puedes ver lo que voy construyendo y seguirme. Si quieres conversar, escríbeme.
              </p>
            </div>
            <ul className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {links.map((l, i) => (
                // El último (email, el texto más largo) ocupa la fila completa hasta que caben los tres.
                <li key={l.label} className={cn(i === links.length - 1 && "sm:col-span-2 xl:col-span-1")}>
                  <SpotlightCard className="h-full bg-background/60">
                    <a
                      href={l.href}
                      {...(l.external && { target: "_blank", rel: "noreferrer" })}
                      className="flex items-center gap-4 p-5"
                    >
                      <span className="rounded-xl border border-border bg-surface p-3 text-foreground">
                        <l.icon className="size-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-medium">{l.label}</span>
                        <span className="block truncate font-mono text-xs text-muted">{l.handle}</span>
                      </span>
                      <ArrowUpRight className="size-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                    </a>
                  </SpotlightCard>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex justify-center">
              <CopyEmail email={contact.email} />
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
