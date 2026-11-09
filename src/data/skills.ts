/**
 * Technology map for the Engineering Core.
 * Deliberately no percentages or "years of experience" — those would be
 * fabricated. Each node explains where the tool is used instead.
 */

export type TechNode = {
  name: string;
  note: string;
};

export type SkillCategory = {
  id: string;
  label: string;
  index: string;
  code: string;
  summary: string;
  nodes: TechNode[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    index: "01",
    code: "LANG",
    summary:
      "The languages underneath the interfaces, the services and the analysis.",
    nodes: [
      { name: "Java", note: "Core language for academic computer engineering work." },
      { name: "Python", note: "Security telemetry pipelines, parsing and AI tooling." },
      { name: "JavaScript", note: "Interactive products across the browser and server." },
      { name: "SQL", note: "Relational modelling and querying for application data." },
    ],
  },
  {
    id: "frontend",
    label: "Frontend",
    index: "02",
    code: "UI",
    summary:
      "Interface systems built for clarity, motion and real-time feedback.",
    nodes: [
      { name: "React", note: "Component systems behind LogX, SatyaScan, Shadow Blade and this portfolio." },
      { name: "Next.js", note: "App-router surfaces and server-rendered product pages." },
      { name: "Vite", note: "Fast build tooling for the project frontends." },
      { name: "Tailwind CSS", note: "Design-token driven styling across projects." },
      { name: "Framer Motion", note: "Interface choreography and spatial transitions." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    index: "03",
    code: "API",
    summary:
      "Services, schemas and validation layers that turn raw input into trusted data.",
    nodes: [
      { name: "Node.js", note: "Event-driven services for web products." },
      { name: "Express", note: "Inspection and analysis APIs for SatyaScan." },
      { name: "Flask", note: "Lightweight Python services for experiments and tooling." },
      { name: "FastAPI", note: "Typed telemetry ingestion and forensic endpoints in LogX." },
    ],
  },
  {
    id: "data",
    label: "Database",
    index: "04",
    code: "DATA",
    summary:
      "Persistence chosen per project — relational where integrity matters, document or real-time where flow matters.",
    nodes: [
      { name: "PostgreSQL", note: "Relational storage for structured application data." },
      { name: "Supabase", note: "Postgres-backed application backends." },
      { name: "Firebase", note: "Realtime application infrastructure." },
      { name: "MongoDB", note: "Document storage for flexible schemas." },
      { name: "Convex", note: "Reactive backend and real-time game state in Shadow Blade and this portfolio's inbox." },
    ],
  },
  {
    id: "ai",
    label: "AI",
    index: "05",
    code: "AI",
    summary:
      "Applied intelligence: models doing a defined, inspectable job inside a product.",
    nodes: [
      { name: "Gemini API", note: "Declaration analysis and assistance inside SatyaScan." },
      { name: "LLM integrations", note: "Study assistance and document question answering in StudyLens AI." },
      { name: "AI application development", note: "Retrieval, prompting and interface design around models." },
    ],
  },
  {
    id: "tools",
    label: "Tools",
    index: "06",
    code: "OPS",
    summary:
      "The everyday workshop: version control, editing, delivery and iteration.",
    nodes: [
      { name: "Git", note: "Version control across every project." },
      { name: "GitHub", note: "Source hosting, collaboration and review." },
      { name: "VS Code", note: "Primary development environment." },
      { name: "Vercel", note: "Deployment target for frontend work such as StudyLens AI." },
      { name: "Netlify", note: "Alternative hosting for static and JAMstack projects." },
    ],
  },
];
