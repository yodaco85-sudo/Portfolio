export const profile = {
  name: "Yoann Dos Santos Da Costa",
  fullName: "Yoann Berth Dos Santos Da Costa",
  role: "Product Builder",
  tagline: "NoCode · IA · Automatisation",
  pitch:
    "22 ans en mer. Aujourd'hui je construis des produits digitaux — sites, workflows n8n, agents IA — pour des PME qui veulent des résultats, pas des slides.",
  location: "Saint-Denis-la-Chevasse, Vendée",
  alternance: {
    status: "En recherche d'alternance",
    school: "Alegria.academy",
    program: "Product Builder Low Code / NoCode & IA",
    rncp: "RNCP 37873 — Niveau 6 (Bac+3/4)",
  },
  contact: {
    email: "contact@besmara.fr",
    phone: "06 48 82 94 68",
    phoneHref: "tel:+33648829468",
    website: "https://besmara.fr",
  },
} as const;

export const stats = [
  { value: "22", label: "ans en mer" },
  { value: "6", label: "projets déployés" },
  { value: "3", label: "piliers — web · auto · IA" },
  { value: "2024", label: "reconversion tech" },
] as const;

export const traits = [
  "Résilience",
  "Leadership",
  "Autonomie",
  "Rigueur opérationnelle",
  "Résolution de problèmes",
  "Curiosité tech",
] as const;

export const skills = [
  { category: "AUTO", items: ["n8n", "Python", "API REST", "Docker"] },
  { category: "WEB", items: ["Next.js", "React", "TypeScript", "Vercel"] },
  { category: "DATA", items: ["Airtable", "Notion", "Supabase"] },
  { category: "IA", items: ["Claude", "GPT", "Ollama", "Multi-agents"] },
] as const;

export const learning = ["Bubble", "Webflow", "Xano", "FlutterFlow", "WeWeb"] as const;

export type ProjectType = "web" | "ia" | "auto" | "nocode";

export type Project = {
  id: string;
  title: string;
  client: string;
  type: ProjectType;
  stack: string;
  hook: string;
  result: string;
  url?: string;
  image?: string;
  featured?: boolean;
  span?: "wide" | "tall" | "default";
};

export const projects: Project[] = [
  {
    id: "nomade-tasty",
    title: "Nomade Tasty",
    client: "Traiteur · Vendée",
    type: "web",
    stack: "Next.js · Vercel",
    hook: "Zéro présence en ligne → site vitrine avec devis en ligne.",
    result: "Galerie, services, témoignages — 100% responsive.",
    url: "https://nomade-tasty.vercel.app/",
    featured: true,
    span: "wide",
  },
  {
    id: "anne-ce",
    title: "Anne-Cécile Collet",
    client: "Immobilier luxe · Côte d'Azur",
    type: "web",
    stack: "Next.js · Vercel",
    hook: "Positionnement prestige Sotheby's — preuve sociale visible.",
    result: "4.9/5 · 27 avis · 1.3M€ en avant-plan.",
    url: "https://anne-ce-website.vercel.app/",
    featured: true,
    span: "tall",
  },
  {
    id: "multi-agents",
    title: "Multi-Agents Email",
    client: "Pipeline IA · Gmail",
    type: "ia",
    stack: "n8n · Claude · Airtable",
    hook: "4 agents en chaîne : lire → classer → documenter → rédiger.",
    result: "Workflow actif — démo sur demande.",
    span: "wide",
  },
  {
    id: "trading-bot",
    title: "Bot Trading Crypto",
    client: "Projet personnel",
    type: "auto",
    stack: "Python · Freqtrade · Ollama",
    hook: "Scalping algo + sentiment Grok + alertes Telegram.",
    result: "Stack complète Docker — démo sur demande.",
  },
  {
    id: "alter-prospect",
    title: "Alter Prospect",
    client: "CRM · Besmara",
    type: "nocode",
    stack: "Supabase · Next.js · n8n",
    hook: "CRM sur-mesure : qualification GPCT, scoring prospect, relances automatisées.",
    result: "Déployé en production — pipeline commercial actif.",
    image: "/projects/alter-prospect-dashboard.png",
  },
  {
    id: "besmara",
    title: "Besmara.fr",
    client: "Site pro · IA & pêche",
    type: "web",
    stack: "Next.js · Vercel",
    hook: "Expertise maritime + offres IA pour PME.",
    result: "Positionnement niche pêche & aquaculture.",
    url: "https://besmara.fr",
  },
];

export const typeLabels: Record<ProjectType, string> = {
  web: "SITE WEB",
  ia: "AGENT IA",
  auto: "AUTOMATION",
  nocode: "NOCODE",
};

export const navLinks = [
  { href: "#projets", label: "Projets" },
  { href: "#stack", label: "Stack" },
  { href: "#profil", label: "Profil" },
  { href: "#contact", label: "Contact" },
] as const;
