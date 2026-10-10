import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ProjectGallery } from "@/components/project-gallery";
import { Reveal } from "@/components/reveal";
import { StatusBadge, StackList } from "@/components/sections";
import { GitHubIcon } from "@/components/icons";
import { projects, site } from "@/content/site";

// Solo existen las páginas de los proyectos con `detail`; el resto es 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.flatMap((p) => (p.detail ? [{ slug: p.detail.slug }] : []));
}

function findProject(slug: string) {
  return projects.find((p) => p.detail?.slug === slug);
}

export async function generateMetadata(props: PageProps<"/proyectos/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const p = findProject(slug);
  if (!p) return {};
  const title = `${p.name} — ${site.name}`;
  return {
    title,
    description: p.description,
    alternates: { canonical: `/proyectos/${slug}/` },
    openGraph: { title, description: p.description, url: `/proyectos/${slug}/` },
  };
}

function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Reveal className="mb-8">
      <p className="mb-2 font-mono text-sm text-[var(--brand)]">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
    </Reveal>
  );
}

export default async function ProjectPage(props: PageProps<"/proyectos/[slug]">) {
  const { slug } = await props.params;
  const p = findProject(slug);
  if (!p?.detail) notFound();
  const d = p.detail;
  const brand = p.brand?.accent ?? "var(--accent)";

  return (
    <main style={{ "--brand": brand } as React.CSSProperties}>
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid absolute inset-0" />
        <div
          aria-hidden
          className="absolute -top-40 left-1/2 h-[420px] w-[min(900px,140vw)] -translate-x-1/2 rounded-full bg-[var(--brand)] opacity-25 blur-[120px]"
        />
        <div className="relative mx-auto max-w-6xl px-4 pt-28 pb-12 sm:px-6 sm:pt-32">
          <Link
            href="/#proyectos"
            className="mb-8 inline-flex items-center gap-1.5 font-mono text-sm text-muted transition hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Volver a proyectos
          </Link>
          <div className="animate-fade-up">
            {p.status && (
              <div className="mb-4">
                <StatusBadge status={p.status} />
              </div>
            )}
            <ViewTransition name={`project-${d.slug}`} share="morph" default="none">
              <h1 className="w-fit text-5xl font-semibold tracking-tight sm:text-6xl">{p.name}</h1>
            </ViewTransition>
            <p className="mt-3 text-xl text-[var(--brand)] brightness-125 sm:text-2xl">{d.tagline}</p>
            <div className="mt-6 max-w-3xl space-y-4 text-base leading-relaxed text-muted sm:text-lg">
              {d.intro.map((t, i) => (
                <p key={i}>{t}</p>
              ))}
            </div>
            <StackList stack={p.stack} />
            {(p.url || p.repo) && (
              <div className="mt-6 flex flex-wrap gap-4 text-sm">
                {p.url && (
                  <a href={p.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-full bg-[var(--brand)] px-4 py-2 font-medium text-white transition hover:brightness-125">
                    Ver en vivo <ArrowUpRight className="size-4" />
                  </a>
                )}
                {p.repo && (
                  <a href={p.repo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-muted transition hover:text-foreground">
                    <GitHubIcon className="size-4" /> Código
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {d.screenshots.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <Heading eyebrow="// capturas" title="Así se ve" />
          <Reveal>
            <ProjectGallery screenshots={d.screenshots} />
          </Reveal>
        </section>
      )}

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Heading eyebrow="// cómo funciona" title="De la idea al grupo" />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {d.steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.08} className="h-full">
              <li className="h-full rounded-2xl border border-border bg-surface/60 p-6">
                <span className="font-mono text-3xl font-semibold text-[var(--brand)]">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Heading eyebrow="// funcionalidades" title="Lo que hace" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {d.features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-surface/60 p-6 transition-colors hover:border-[color-mix(in_srgb,var(--brand)_50%,transparent)]">
                <h3 className="font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <Heading eyebrow="// stack" title="Cómo está construido" />
        <div className="grid gap-5 md:grid-cols-3">
          {d.tech.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08} className="h-full">
              <div className="h-full rounded-2xl border border-border bg-surface/60 p-6">
                <h3 className="mb-4 font-mono text-sm text-[var(--brand)]">{g.title}</h3>
                <ul className="space-y-2 text-foreground/90">
                  {g.items.map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="size-1.5 rounded-full bg-[var(--brand)]" /> {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 max-w-3xl">
          <p className="font-mono text-sm text-[var(--brand)]">{"// mi rol"}</p>
          <p className="mt-2 text-lg leading-relaxed text-foreground/90">{d.role}</p>
        </Reveal>
        <Reveal className="mt-12">
          <Link
            href="/#proyectos"
            className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/60 px-5 py-2.5 text-sm font-medium transition hover:border-[var(--brand)]"
          >
            <ArrowLeft className="size-4" /> Ver otros proyectos
          </Link>
        </Reveal>
      </section>
    </main>
  );
}
