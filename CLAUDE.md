@AGENTS.md

# Portafolio — vicenteabse.cl

Portafolio personal de Vicente Abse. Landing de una sola página, en español, tema oscuro con acento azul eléctrico.

## Node

- Usa **Node 22.14.0** (`.nvmrc`). La versión por defecto de nvm en esta máquina es la 18, así que antes de cualquier comando: `source ~/.nvm/nvm.sh && nvm use`.

## Comandos

- `npm run dev`: servidor de desarrollo (http://localhost:3000)
- `npm run build`: exportación estática a `out/`
- `npm run lint`: ESLint

## Stack y restricciones

- Next.js 16 (App Router) + TypeScript + Tailwind v4 + Motion (`motion/react`).
- **Solo exportación estática** (`output: "export"` en `next.config.ts`). En producción no hay servidor Node: Caddy sirve `out/`. No uses nada que necesite servidor: route handlers dinámicos, server actions, `cookies()`/`headers()`, redirects/rewrites/headers en `next.config`, ISR ni el optimizador de `next/image` (está `images.unoptimized`). Las redirecciones van en el Caddyfile.
- `cacheComponents`/`partialPrefetching` se quitaron a propósito: son para contenido dinámico.
- Next 16 tiene cambios de API: revisa `node_modules/next/dist/docs/` antes de usar algo nuevo.

## Estructura

- `src/content/site.ts`: **todo el contenido** (textos, proyectos, tecnologías, contacto, script de la terminal). Los `TODO` son textos de ejemplo por reemplazar.
- `src/components/sections.tsx`: secciones de la página (Hero, About, Projects, Stack, Contact, Footer). Son Server Components.
- Componentes cliente: `terminal.tsx` (tipeo del hero), `navbar.tsx`, `spotlight-card.tsx` (foco que sigue al puntero), `reveal.tsx` (aparición al hacer scroll), `copy-email.tsx`.
- `motion-provider.tsx`: `LazyMotion` (en modo `strict`) + `MotionConfig reducedMotion="user"`. Usa siempre `m.*`, nunca `motion.*`, para que el bundle quede chico.
- `src/components/icons.tsx`: logos de GitHub/LinkedIn como SVG propios (lucide ya no incluye marcas).
- Tokens de color y keyframes en `src/app/globals.css` (`--accent`, `--surface`, `--border`, etc. → clases `bg-accent`, `text-muted`...).

## Criterios

- Vistoso pero liviano: prefiere animaciones CSS; usa Motion solo cuando aporte. Respeta `prefers-reduced-motion`.
- Mobile first: revisa a 375px de ancho que no haya scroll horizontal.
- El contenido del hero no se anima con Motion (afecta al LCP); usa la clase `animate-fade-up` de CSS.

## Despliegue (planificado, aún no implementado)

- Servidor: Droplet de DigitalOcean (Ubuntu 24.04), `ssh vabse-prod` (usuario `vicente`).
- Proxy Caddy compartido con Docker en `~/proxy` (docker-compose.yml + Caddyfile); hoy sirve `tribu-api.vicenteabse.cl`.
- Los archivos estáticos irán en `~/sites/vicenteabse/` (montado en el contenedor de Caddy), con un bloque `vicenteabse.cl` en el Caddyfile y `www` → sin `www`.
- DNS en DigitalOcean: faltan los registros A de `@` y `www`.
- CI/CD: GitHub Actions en push a `main` → build + rsync, con una llave SSH dedicada restringida con `rrsync` en `authorized_keys`. Secrets: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`, `DEPLOY_KNOWN_HOSTS` (mismo esquema que el backend).
