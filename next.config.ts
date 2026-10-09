import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exportación estática: `next build` genera `out/`, que Caddy sirve tal cual.
  output: "export",
  // `/ruta/` -> `out/ruta/index.html`, lo más simple de servir con file_server.
  trailingSlash: true,
  // Sin servidor no hay optimizador de imágenes: se sirven tal cual.
  images: { unoptimized: true },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
