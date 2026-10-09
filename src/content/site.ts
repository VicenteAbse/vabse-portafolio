// Todo el contenido del sitio vive aquí. Los textos marcados con TODO son de
// ejemplo: reemplázalos por los tuyos.

export const site = {
  url: "https://vicenteabse.cl",
  name: "Vicente Abse",
  // TODO: tu rol / título corto
  role: "Desarrollador Full Stack",
  // TODO: una frase que resuma qué haces
  tagline:
    "Construyo aplicaciones web y móviles de punta a punta: desde la API en Spring Boot hasta la app en Angular e Ionic.",
  location: "Chile",
  // TODO: tu presentación (1-3 párrafos)
  about: [
    "Soy desarrollador full stack y me gusta llevar ideas desde el boceto hasta producción. Trabajo principalmente con Java y Spring Boot en el backend, y con Angular, Ionic y Next.js en el frontend.",
    "Me interesa la arquitectura limpia, el despliegue automatizado y que las cosas funcionen bien en el celular. Este texto es de ejemplo: cuéntale aquí a la gente quién eres y qué te mueve.",
  ],
  // TODO: datos rápidos para la tarjeta "Sobre mí"
  facts: [
    { label: "Enfoque", value: "Backend + apps móviles" },
    { label: "Ubicación", value: "Chile" },
    { label: "Disponible para", value: "Proyectos freelance" },
  ],
} as const;

export const contact = {
  // TODO: reemplaza por tu email y tus perfiles
  email: "hola@vicenteabse.cl",
  github: "https://github.com/tu-usuario",
  linkedin: "https://www.linkedin.com/in/tu-usuario",
} as const;

export type Project = {
  name: string;
  description: string;
  stack: string[];
  // Enlaces opcionales: si no hay, no se muestra el botón.
  repo?: string;
  demo?: string;
  // Destacado: ocupa más espacio en la grilla.
  featured?: boolean;
};

export const projects: Project[] = [
  {
    name: "Trivvy",
    description:
      "App para encontrar grupos de personas con intereses en común. Perfiles, intereses, búsqueda de grupos y API REST propia.",
    stack: ["Ionic", "Angular", "Spring Boot", "PostgreSQL", "Docker"],
    // TODO: enlaces reales
    repo: "https://github.com/tu-usuario/trivvy",
    featured: true,
  },
  {
    name: "Exordia",
    // TODO: descripción real de Exordia
    description:
      "Descripción de ejemplo de Exordia: qué problema resuelve, para quién es y qué parte construiste tú.",
    stack: ["Next.js", "TypeScript", "Tailwind"],
  },
  {
    name: "Proyecto 3",
    // TODO: reemplaza o borra este proyecto
    description:
      "Proyecto de ejemplo. Agrega aquí otro trabajo, un proyecto de la universidad o algo open source.",
    stack: ["Java", "Spring Boot", "Docker"],
  },
];

export type TechGroup = { title: string; items: string[] };

export const techGroups: TechGroup[] = [
  { title: "Backend", items: ["Java", "Spring Boot", "PostgreSQL", "REST APIs"] },
  { title: "Frontend y móvil", items: ["Angular", "Ionic", "Next.js", "TypeScript", "Tailwind"] },
  { title: "DevOps", items: ["Docker", "Caddy", "GitHub Actions", "Linux"] },
];

// Líneas que se tipean en la terminal del hero.
export type TerminalLine = { command: string; output: string[] };

export const terminalScript: TerminalLine[] = [
  { command: "whoami", output: [`${site.name} — ${site.role}`] },
  {
    command: "cat stack.txt",
    output: ["Java · Spring Boot · Angular · Ionic", "Next.js · Docker · PostgreSQL"],
  },
  {
    command: "ls proyectos/",
    output: [projects.map((p) => p.name.toLowerCase().replace(/\s+/g, "-") + "/").join("  ")],
  },
  { command: "./contacto.sh", output: ["→ " + contact.email] },
];
