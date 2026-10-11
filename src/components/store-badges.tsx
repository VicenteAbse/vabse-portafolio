import { cn } from "@/lib/utils";
import type { ProjectDetail } from "@/content/site";
import { AppleIcon, GooglePlayIcon } from "./icons";

const storeInfo = {
  "app-store": { name: "App Store", icon: AppleIcon },
  "google-play": { name: "Google Play", icon: GooglePlayIcon },
} as const;

// Botones con estilo de tienda (no son las insignias oficiales: esas solo se pueden usar
// enlazando a una app ya publicada). Sin `url` quedan deshabilitados con "Próximamente".
export function StoreBadges({ stores }: { stores: NonNullable<ProjectDetail["stores"]> }) {
  return (
    <ul className="mt-6 flex flex-wrap gap-3">
      {stores.map(({ store, url }) => {
        const { name, icon: Icon } = storeInfo[store];
        const content = (
          <>
            <Icon className="size-6 shrink-0" />
            <span className="leading-tight">
              <span className="block text-[11px] text-muted">{url ? "Descárgala en" : "Próximamente en"}</span>
              <span className="block font-semibold">{name}</span>
            </span>
          </>
        );
        const base = "flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm";
        return (
          <li key={store}>
            {url ? (
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className={cn(base, "border-border bg-background/60 transition hover:border-[var(--brand)]")}
              >
                {content}
              </a>
            ) : (
              <div
                aria-label={`${name}: próximamente`}
                className={cn(base, "cursor-default border-dashed border-border bg-surface/40 text-foreground/70")}
              >
                {content}
              </div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
