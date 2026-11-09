/**
 * Curated project model for the Project Universe.
 *
 * `verification: "documented"` means the description comes from material
 * supplied by Mohd Ali Pathan. `verification: "pending"` means the repository
 * could not be reached while this build was produced, so the entry is kept
 * intentionally thin and the UI shows an editable placeholder.
 *
 * No metrics, users, awards or deployment claims are stored here.
 */

export type ProjectVisual =
  | "telemetry"
  | "scan"
  | "library"
  | "blade"
  | "civic"
  | "network"
  | "alumni"
  | "health"
  | "rural"
  | "school"
  | "school-redesign";

export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  priority: boolean;
  tagline: string;
  summary: string;
  problem: string;
  stack: string[];
  features: string[];
  roadmap: string[];
  contribution: string | null;
  repo: string;
  extraRepos?: { label: string; url: string }[];
  live?: { label: string; url: string; note: string };
  status: string;
  statusNote: string;
  verification: "documented" | "pending";
  verificationNote: string;
  visual: ProjectVisual;
  accent: string;
  artifacts: { label: string; note: string }[];
  caseStudy: { title: string; body: string }[];
};

export const projects: Project[] = [
  {
    slug: "logx",
    index: "01",
    name: "LogX",
    category: "Security Engineering",
    priority: true,
    tagline: "Universal security telemetry, made trustworthy.",
    summary:
      "A pre-processing and forensic intelligence platform for heterogeneous security telemetry.",
    problem:
      "Firewalls, IDS/IPS, VPNs, network devices and security sensors all speak in different formats. Before an investigation can trust that data, someone has to preserve the raw record, identify what it is, parse it safely, and prove where every field came from.",
    stack: [
      "Python",
      "FastAPI",
      "Pydantic",
      "SQLAlchemy",
      "SQLite",
      "React",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Recharts",
    ],
    features: [
      "Raw telemetry preservation",
      "SHA-256 integrity hashing",
      "Format detection",
      "Source detection",
      "Parser registry",
      "Normalization",
      "Validation",
      "Quarantine",
      "Field-level lineage",
      "Provenance tracking",
      "Historical replay",
      "Forensic investigation",
      "Unknown telemetry analysis",
    ],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/LogX",
    status: "Public repository",
    statusNote:
      "Build state should be read from the latest commits and repository documentation.",
    verification: "documented",
    verificationNote:
      "Capabilities come from the owner's project documentation. Repository access was unavailable during this build — confirm against the current README.",
    visual: "telemetry",
    accent: "#2be39b",
    artifacts: [
      { label: "Telemetry command center", note: "Screenshot slot 01" },
      { label: "Lineage & provenance view", note: "Screenshot slot 02" },
      { label: "Investigation replay", note: "Screenshot slot 03" },
    ],
    caseStudy: [
      {
        title: "The problem space",
        body: "Security teams inherit evidence in dozens of shapes. A single incident can involve perimeter logs, intrusion alerts, VPN sessions and device exports. If the pipeline silently reshapes those records, the investigation loses its claim to truth.",
      },
      {
        title: "The pipeline",
        body: "LogX is documented as an ingest-to-intelligence pipeline: preserve the original payload, hash it, detect format and source, route it through a registry of parsers, normalize and validate it, quarantine what fails, then keep field-level lineage and provenance attached to every normalized record. Historical replay and unknown-telemetry analysis support the forensic workflow.",
      },
      {
        title: "Interface intent",
        body: "The frontend uses React, Framer Motion and Recharts to make a dense dataset legible — showing the journey from raw record to trusted, investigation-ready evidence instead of a wall of logs.",
      },
      {
        title: "Open items",
        body: "Performance benchmarks, dataset scale and deployment details are not documented here. A contribution record and real interface captures are pending.",
      },
    ],
  },
  {
    slug: "satyascan",
    index: "02",
    name: "SatyaScan",
    category: "AI · Legal Metrology",
    priority: true,
    tagline: "Inspection intelligence for packaged commodities.",
    summary:
      "An AI-assisted compliance inspection platform for packaged goods, labels and declarations.",
    problem:
      "Inspecting packaged commodities against Legal Metrology requirements means reading dense declarations, comparing them with labels and working through rules consistently. Doing it by hand is slow and easy to apply unevenly.",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Express",
      "Google Gemini",
      "Tesseract.js",
    ],
    features: [
      "Declaration extraction from labels and images",
      "Label inspection workflows",
      "Compliance-oriented analysis",
      "AI-assisted interpretation with Google Gemini",
      "On-device optical character recognition with Tesseract.js",
    ],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/SatyaScan",
    status: "Public repository",
    statusNote:
      "Documented functionality is listed as implemented; anything beyond it is treated as unbuilt.",
    verification: "documented",
    verificationNote:
      "Functionality reflects the owner's documentation. The repository could not be reached during this build, so the latest state of implemented versus planned work should be confirmed there.",
    visual: "scan",
    accent: "#8af0c6",
    artifacts: [
      { label: "Label capture & extraction", note: "Screenshot slot 01" },
      { label: "Declaration breakdown", note: "Screenshot slot 02" },
      { label: "Inspection result", note: "Screenshot slot 03" },
    ],
    caseStudy: [
      {
        title: "Implemented, not imagined",
        body: "The documented build extracts declarations from product labels and images using Tesseract.js OCR and Google Gemini, and runs inspection and compliance-oriented analysis workflows through a React frontend and Express backend.",
      },
      {
        title: "Why OCR plus a model",
        body: "OCR gives the system the literal characters on a label. The model helps interpret messy declarations and structure them. Keeping those roles separate makes the output easier to inspect — and easier to challenge when it is wrong.",
      },
      {
        title: "Roadmap discipline",
        body: "No future features are claimed here. The roadmap panel in this portfolio is intentionally empty until the owner documents planned work; SatyaScan's detail view separates 'Documented today' from 'Roadmap placeholder'.",
      },
      {
        title: "Open items",
        body: "A contribution record, real screenshots and any regulatory scope limits are pending confirmation.",
      },
    ],
  },
  {
    slug: "studylens-ai",
    index: "03",
    name: "StudyLens AI",
    category: "AI · Learning",
    priority: true,
    tagline: "A quieter way to study your own notes.",
    summary:
      "An AI study assistant built around the material a student already has.",
    problem:
      "Students collect notes, PDFs and slides, then lose time turning that material into active recall. A useful assistant should work from the student's own documents rather than generic answers from the open web.",
    stack: [
      "React",
      "TypeScript",
      "AI integration",
      "PDF ingestion",
      "Vercel deployment",
    ],
    features: [
      "PDF uploads",
      "Summary generation",
      "Quiz generation",
      "Ask questions about study materials",
    ],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/StudyLens-AI",
    live: {
      label: "study-lens-ai-sable.vercel.app",
      url: "https://study-lens-ai-sable.vercel.app/",
      note: "Previously documented live deployment. Availability was not verified during this build.",
    },
    status: "Live link documented",
    statusNote:
      "The deployment link was documented previously; treat uptime as unverified until checked.",
    verification: "documented",
    verificationNote:
      "Only the four documented capabilities are listed. No additional features are claimed.",
    visual: "library",
    accent: "#b9e8d5",
    artifacts: [
      { label: "Document workspace", note: "Screenshot slot 01" },
      { label: "Generated summary", note: "Screenshot slot 02" },
      { label: "Quiz session", note: "Screenshot slot 03" },
    ],
    caseStudy: [
      {
        title: "Scope",
        body: "StudyLens AI is documented as an AI learning assistant for uploaded notes and study material: PDF uploads, summary generation, quiz generation and questions answered against the material.",
      },
      {
        title: "Product logic",
        body: "The documented loop is small: bring your own material, compress it into a summary, test yourself with a quiz, then ask the questions the summary did not answer. The value is in the study loop, not in an open-ended chatbot.",
      },
      {
        title: "Open items",
        body: "No additional features, usage metrics or model details are asserted here. Real captures and a contribution record are pending.",
      },
    ],
  },
  {
    slug: "shadow-blade",
    index: "04",
    name: "Shadow Blade",
    category: "Interactive 3D · Game",
    priority: true,
    tagline: "A browser dimension with an edge.",
    summary:
      "An interactive browser-based game rendered in real time with React, Three.js and Convex.",
    problem:
      "Games usually ask for an install. Shadow Blade explores what real-time 3D play and reactive state can feel like when the only client is a browser tab.",
    stack: [
      "React",
      "TypeScript",
      "Three.js",
      "Convex",
      "Framer Motion",
      "Tailwind CSS",
    ],
    features: [],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/shadow-blade",
    status: "Public repository",
    statusNote:
      "Gameplay systems and completion state should be read from the repository.",
    verification: "documented",
    verificationNote:
      "Stack is documented. Gameplay features and captures could not be verified during this build and are shown as placeholders rather than invented.",
    visual: "blade",
    accent: "#5fe0b0",
    artifacts: [
      { label: "Gameplay capture", note: "Screenshot / video slot 01" },
      { label: "Blade dimension", note: "Screenshot slot 02" },
    ],
    caseStudy: [
      {
        title: "Documented stack",
        body: "Shadow Blade is documented as a React + TypeScript browser game using Three.js for the 3D layer, Convex for reactive backend state, Framer Motion for motion and Tailwind CSS for interface styling.",
      },
      {
        title: "Why it matters in this portfolio",
        body: "It is the collection's playable WebGL experiment — real-time input, scene composition and state you can feel, built on the same browser-rendering foundations as this portfolio.",
      },
      {
        title: "Verification pending",
        body: "Specific gameplay mechanics, level content and development status are not listed because the repository could not be reached. Actual gameplay media should replace the placeholder slots.",
      },
    ],
  },
  {
    slug: "janmitra-ai",
    index: "05",
    name: "JanMitra AI",
    category: "AI · Civic Technology",
    priority: false,
    tagline: "An AI-assisted door into public services.",
    summary:
      "A citizen-assistance concept exploring accessible, guided access to public services.",
    problem:
      "Public-service information is fragmented and written for institutions, not citizens. A guided, AI-assisted layer can make the first step less intimidating — provided it is built on verified information.",
    stack: ["To be documented from the repository"],
    features: [],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/janmitra-ai",
    status: "Verification pending",
    statusNote:
      "Detailed capabilities, stack and implementation status await repository verification.",
    verification: "pending",
    verificationNote:
      "Repository contents could not be retrieved during this build. Only the high-level civic-assistance direction is presented; feature claims are placeholders.",
    visual: "civic",
    accent: "#a8e6cf",
    artifacts: [{ label: "Citizen interaction", note: "Screenshot slot 01" }],
    caseStudy: [
      {
        title: "Direction",
        body: "JanMitra AI is presented as an AI-related citizen-assistance project: a digital public-service world with an accessible holographic interaction concept.",
      },
      {
        title: "Verification pending",
        body: "Actual features, technology and contribution await access to the repository. Nothing further is claimed.",
      },
    ],
  },
  {
    slug: "seniorconnect",
    index: "06",
    name: "SeniorConnect",
    category: "Community · Networking",
    priority: false,
    tagline: "A network between students, not above them.",
    summary:
      "A student networking project designed around peer connection and shared ground.",
    problem:
      "Students need ways to find each other, share context and build communities that outlast a single classroom or event.",
    stack: ["To be documented from the repository"],
    features: [],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/SeniorConnect",
    status: "Verification pending",
    statusNote:
      "Purpose is documented at a high level; features and stack await verification.",
    verification: "pending",
    verificationNote:
      "Repository access was unavailable during this build. Visual identity uses connected communication nodes; implementation details are intentionally unclaimed.",
    visual: "network",
    accent: "#7fe6c1",
    artifacts: [{ label: "Community network", note: "Screenshot slot 01" }],
    caseStudy: [
      {
        title: "Direction",
        body: "A student networking project represented in ALIVERSE as interconnected communication nodes, community networks and digital pathways.",
      },
      {
        title: "Verification pending",
        body: "Feature list and stack are placeholders until the repository can be reviewed.",
      },
    ],
  },
  {
    slug: "aluminiconnect",
    index: "07",
    name: "AluminiConnect",
    category: "Community · Alumni",
    priority: false,
    tagline: "Connections that cross graduating years.",
    summary:
      "An alumni-connectivity project representing links across generations of students.",
    problem:
      "Institutional knowledge leaves when students graduate. An alumni network can keep mentorship and opportunity flowing back.",
    stack: ["To be documented from the repository"],
    features: [],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/AluminiConnect",
    status: "Verification pending",
    statusNote:
      "Presented as a separate project from SeniorConnect; relationship unconfirmed.",
    verification: "pending",
    verificationNote:
      "Repository access was unavailable during this build. This entry is kept separate from SeniorConnect because ownership and relationship are not confirmed.",
    visual: "alumni",
    accent: "#9adfc4",
    artifacts: [{ label: "Alumni network", note: "Screenshot slot 01" }],
    caseStudy: [
      {
        title: "Direction",
        body: "A digital network representing connections across generations of students.",
      },
      {
        title: "Verification pending",
        body: "No features, stack or relationship to SeniorConnect are asserted until the repository is reviewed.",
      },
    ],
  },
  {
    slug: "nabha-sihat",
    index: "08",
    name: "NABHA-SIHAT",
    category: "Health · Full-stack",
    priority: false,
    tagline: "A healthcare software initiative.",
    summary:
      "A healthcare-related software initiative with a separate frontend and backend repository.",
    problem:
      "Healthcare software rarely lives in a single layer; it needs an interface and a service layer that can evolve independently.",
    stack: ["Frontend and backend repositories (to be documented)"],
    features: [],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/NABHA-SIHAT",
    extraRepos: [
      {
        label: "Backend repository",
        url: "https://github.com/high-flyer007/NABHA-SIHAT-backend",
      },
    ],
    status: "Verification pending",
    statusNote:
      "Frontend/backend split is confirmed by the pair of public repositories.",
    verification: "pending",
    verificationNote:
      "Repository contents could not be retrieved during this build. Only the healthcare direction and the two-repository relationship are shown.",
    visual: "health",
    accent: "#86e7c9",
    artifacts: [
      { label: "Frontend capture", note: "Screenshot slot 01" },
      { label: "Backend interface", note: "Screenshot slot 02" },
    ],
    caseStudy: [
      {
        title: "Structure",
        body: "NABHA-SIHAT has a dedicated frontend repository and a separate backend repository, presented here as one initiative with two layers.",
      },
      {
        title: "Verification pending",
        body: "User flows, data models and stack details await access to both repositories.",
      },
    ],
  },
  {
    slug: "ruralcare",
    index: "09",
    name: "RuralCare",
    category: "Community Systems",
    priority: false,
    tagline: "Software aimed at community needs.",
    summary:
      "A community-oriented project in the collection; purpose to be verified from source.",
    problem:
      "Community-oriented software has to start from an actual local need. The direction is documented; the specifics are not.",
    stack: ["To be documented from the repository"],
    features: [],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/ruralcare",
    status: "Verification pending",
    statusNote:
      "Purpose is documented as community-oriented only; features await verification.",
    verification: "pending",
    verificationNote:
      "The repository could not be read. No domain features are claimed — including healthcare claims that exist in unrelated projects with a similar name.",
    visual: "rural",
    accent: "#8fd9a8",
    artifacts: [{ label: "Community context", note: "Screenshot slot 01" }],
    caseStudy: [
      {
        title: "Verification pending",
        body: "RuralCare is presented in the community-oriented collection. Its actual purpose and capabilities will be documented after a repository review; no external project with a similar name is used as evidence.",
      },
    ],
  },
  {
    slug: "strawberry-little-star-school",
    index: "10",
    name: "Strawberry Little Star",
    category: "Web Design · School",
    priority: false,
    tagline: "A school's first digital front door.",
    summary:
      "A school website project — the original build in a two-part design case study.",
    problem:
      "A school needs a clear, welcoming place online for parents to find information and understand its character.",
    stack: ["To be documented from the repository"],
    features: [],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/strawberry-little-star-school",
    extraRepos: [
      {
        label: "Redesign repository",
        url: "https://github.com/high-flyer007/strawberry-little-star-redesign",
      },
    ],
    status: "Verification pending",
    statusNote:
      "Presented as the original build alongside the separate redesign repository.",
    verification: "pending",
    verificationNote:
      "Repository access was unavailable. This entry is presented as the original, not merged with the redesign.",
    visual: "school",
    accent: "#e8d5a8",
    artifacts: [{ label: "Original homepage", note: "Screenshot slot 01" }],
    caseStudy: [
      {
        title: "Original build",
        body: "The first school website in a two-repository design story. Details await verification from the source.",
      },
      {
        title: "Redesign",
        body: "A separate repository exists for the redesign. Both are kept distinct here to preserve the design evolution.",
      },
    ],
  },
  {
    slug: "strawberry-little-star-redesign",
    index: "11",
    name: "Strawberry Little Star — Redesign",
    category: "Web Design · School",
    priority: false,
    tagline: "The same school, reconsidered.",
    summary:
      "The redesign repository in the school web-design case study.",
    problem:
      "A first website is a starting point. A redesign is a chance to improve hierarchy, warmth and clarity without losing the school's identity.",
    stack: ["To be documented from the repository"],
    features: [],
    roadmap: [],
    contribution: null,
    repo: "https://github.com/high-flyer007/strawberry-little-star-redesign",
    extraRepos: [
      {
        label: "Original repository",
        url: "https://github.com/high-flyer007/strawberry-little-star-school",
      },
    ],
    status: "Verification pending",
    statusNote:
      "Kept distinct from the original build; design changes await verification.",
    verification: "pending",
    verificationNote:
      "Repository access was unavailable. No redesign outcomes are claimed without evidence.",
    visual: "school-redesign",
    accent: "#d8e6b8",
    artifacts: [{ label: "Redesigned homepage", note: "Screenshot slot 01" }],
    caseStudy: [
      {
        title: "Redesign direction",
        body: "The second repository in the school case study. Visual and structural changes will be documented once the repository can be reviewed.",
      },
    ],
  },
];

export const featuredProjects = projects.filter((project) => project.priority);

export function getProject(slug: string | null | undefined) {
  if (!slug) return null;
  return projects.find((project) => project.slug === slug) ?? null;
}

export function getProjectNeighbours(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: projects[(index - 1 + projects.length) % projects.length],
    next: projects[(index + 1) % projects.length],
  };
}
