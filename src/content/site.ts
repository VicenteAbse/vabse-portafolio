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
  about: [
    "Soy desarrollador full stack y me gusta llevar ideas desde el boceto hasta producción. Trabajo principalmente con Java y Spring Boot en el backend, y con Angular, Ionic y Next.js en el frontend.",
    // "¿Tienes una idea dando vueltas? Quiero ayudarte a hacerla realidad. Te acompaño desde el primer boceto hasta que está publicada y funcionando: te explico cada decisión en simple y construyo con bases sólidas, para que tu proyecto sea rápido, y pueda crecer contigo.",
  ],
  facts: [
    { label: "Enfoque", value: "Apps web, móviles y backend" },
    { label: "Ubicación", value: "Chile" },
    { label: "Experiencia", value: "4+ años" },
    // { label: "Disponible para", value: "Proyectos freelance" },
  ],
} as const;

export const contact = {
  // TODO: reemplaza por tu email y tus perfiles
  email: "vicente.abse@gmail.com",
  github: "https://github.com/VicenteAbse",
  linkedin: "https://www.linkedin.com/in/vicenteabsehidalgo",
} as const;

export type Project = {
  name: string;
  description: string;
  stack: string[];
  status?: "produccion" | "desarrollo";
  // Enlaces opcionales: si no hay, no se muestra el botón.
  url?: string; // sitio en producción
  repo?: string;
  demo?: string;
  // Destacado: ocupa todo el ancho, con captura y la identidad visual del proyecto.
  featured?: boolean;
  preview?: { src: string; alt: string };
  // Identidad del proyecto: tiñe el foco, el borde y los detalles de su tarjeta.
  brand?: { accent: string; logo?: string };
  // Si existe, el proyecto tiene página propia en /proyectos/<slug>/.
  detail?: ProjectDetail;
};

export type ProjectDetail = {
  slug: string;
  tagline: string;
  intro: string[];
  // Capturas en orden; se muestran dentro de un marco de teléfono.
  screenshots: { src: string; caption: string }[];
  steps: { title: string; text: string }[];
  features: { title: string; text: string }[];
  tech: { title: string; items: string[] }[];
  role: string;
};

export const projects: Project[] = [
  {
    name: "Abryl",
    // TODO: ajusta qué parte hiciste tú
    description:
      "Sitio web del estudio jurídico ABRyL (Abogadas Barbosa, Ramírez y Lemungürü). Diseño editorial con animaciones al hacer scroll y un blog que el estudio administra por su cuenta desde Sanity CMS.",
    stack: ["Next.js", "React", "Tailwind", "Framer Motion", "Sanity CMS", "Vercel"],
    status: "produccion",
    url: "https://www.abryl.cl",
    featured: true,
    preview: { src: "/projects/abryl.jpg", alt: "Portada del sitio abryl.cl" },
    brand: { accent: "#a70b0b", logo: "/projects/abryl-logo.svg" },
  },
  {
    name: "Trivvy",
    description:
      "App móvil para encontrar grupos de personas cercanas con intereses en común. Das like a los grupos que te interesan y, cuando se completa el mínimo de integrantes, se abre el chat del grupo.",
    stack: ["Ionic", "Angular", "Capacitor", "Spring Boot", "PostgreSQL", "WebSocket"],
    status: "desarrollo",
    brand: { accent: "#6c63ff" },
    detail: {
      slug: "trivvy",
      tagline: "Encuentra a tu grupo cerca de ti.",
      intro: [
        "Trivvy nace de una idea simple: armar un grupo para hacer algo que te gusta es difícil si no conoces a nadie con los mismos intereses. Creas un grupo (por ejemplo, «Devs Santiago»), defines cuántas personas necesitas como mínimo y la app se lo muestra a la gente que está cerca.",
        "Quien lo ve puede darle like o pasar. Al dar like se suma como interesado y, cuando se completa el mínimo de integrantes, el grupo se activa y se abre su chat. A partir de ahí, el creador y los administradores pueden organizar eventos y decidir quién más entra.",
      ],
      screenshots: [
        { src: "/projects/trivvy/01-descubrir.jpg", caption: "Descubrir grupos cercanos" },
        { src: "/projects/trivvy/02-deslizar.jpg", caption: "Deslizar: like o pasar" },
        { src: "/projects/trivvy/03-detalle-grupo.jpg", caption: "Detalle del grupo" },
        { src: "/projects/trivvy/04-chat.jpg", caption: "Chat en tiempo real" },
        { src: "/projects/trivvy/05-admin-eventos.jpg", caption: "Administración: eventos" },
        { src: "/projects/trivvy/06-nuevo-evento.jpg", caption: "Crear un evento" },
        { src: "/projects/trivvy/07-crear-grupo.jpg", caption: "Crear un grupo" },
        { src: "/projects/trivvy/08-crear-grupo-politica.jpg", caption: "Tamaño y política de acceso" },
      ],
      steps: [
        {
          title: "Crea un grupo",
          text: "Nombre, categoría, ubicación, mínimo y máximo de integrantes, y si cualquiera puede entrar o necesita aprobación.",
        },
        {
          title: "La gente cercana lo descubre",
          text: "Los usuarios ven tarjetas de grupos dentro de su radio de búsqueda y las deslizan: like para sumarse, pasar para descartar.",
        },
        {
          title: "Se completa el mínimo y se activa",
          text: "Cuando los likes alcanzan el mínimo de integrantes, el grupo pasa a activo, todos los interesados quedan como miembros y reciben una notificación.",
        },
        {
          title: "Chat, eventos y administración",
          text: "Los miembros conversan en tiempo real. El creador y los admins crean eventos, aprueban solicitudes y gestionan a los integrantes.",
        },
      ],
      features: [
        { title: "Búsqueda por cercanía", text: "Grupos filtrados por distancia (fórmula de Haversine) según el radio que elige cada usuario, con filtro por categoría." },
        { title: "Deslizar para unirse", text: "Tarjetas con gestos de like o pasar y un límite de likes diarios para que cada like cuente." },
        { title: "Activación por mínimo", text: "Barra de progreso hacia el mínimo de integrantes; al alcanzarlo, el grupo se activa automáticamente." },
        { title: "Chat en tiempo real", text: "Mensajería por WebSocket (STOMP) con historial paginado y contadores de mensajes sin leer en vivo." },
        { title: "Roles y aprobación", text: "Creador, administradores y miembros. Los grupos pueden exigir aprobación para entrar; los admins aceptan, silencian o expulsan." },
        { title: "Eventos y notificaciones", text: "Los admins crean eventos para el grupo y los miembros reciben notificaciones push con Firebase." },
      ],
      tech: [
        { title: "App", items: ["Ionic 8", "Angular 20", "Capacitor 8", "Geolocalización", "STOMP sobre WebSocket", "Tema claro y oscuro"] },
        { title: "API", items: ["Java 17", "Spring Boot 3", "Spring Security + JWT", "JPA / PostgreSQL", "WebSocket (STOMP)", "Firebase Cloud Messaging"] },
        { title: "Infraestructura", items: ["Docker", "Caddy (HTTPS automático)", "DigitalOcean", "GitHub Actions (CI/CD)"] },
      ],
      // TODO: ajusta tu rol si corresponde
      role: "Proyecto personal de punta a punta: diseño de la app, desarrollo del frontend móvil y de la API, modelo de datos y despliegue con CI/CD en un servidor propio.",
    },
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
