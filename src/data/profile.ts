/**
 * ALIVERSE — canonical profile data.
 * Only verified facts from the owner's brief live here. Anything unknown is
 * marked explicitly so the UI can show a placeholder instead of inventing it.
 */

export const profile = {
  name: "Mohd Ali Pathan",
  firstName: "Mohd Ali",
  lastName: "Pathan",
  wordmark: "ALIVERSE",
  tagline: "Building beyond the ordinary.",
  heroStatement:
    "I turn ambitious ideas into working digital products — AI applications, security platforms and interactive experiences.",
  role: "Engineer. Builder. Innovator.",
  metadata: "COMPUTER ENGINEERING / FULL-STACK DEVELOPMENT / AI",
  location: "Pune, Maharashtra · India",
  email: "m.alipathan2905@gmail.com",
  github: "https://github.com/high-flyer007",
  githubHandle: "high-flyer007",
  linkedin:
    "https://www.linkedin.com/in/mohd-ali-shakir-pathan-473913327/",
  /**
   * Placeholder portrait. Drop a real photograph at `public/portrait.jpg`
   * and change this path (or keep the SVG placeholder).
   */
  portrait: "/portrait-placeholder.svg",
  portraitAlt:
    "Portrait placeholder — add a photograph of Mohd Ali Pathan at public/portrait.jpg",
  /** Placeholder resume generated for this build. Replace with the real PDF. */
  resume: "/resume-placeholder.pdf",
  summary:
    "I enjoy transforming ambitious ideas into working digital products. From AI applications and cybersecurity platforms to interactive software experiences, I love building things that solve real problems.",
  shortBio:
    "Computer Engineering student building full-stack systems, AI applications and security tooling — and leading teams that ship them.",
  education: {
    degree: "Computer Engineering",
    institution: "Ajeenkya DY Patil School of Engineering",
    university: "Savitribai Phule Pune University (SPPU)",
    expectedGraduation: "2028",
    cgpa: "9.55",
  },
  /** Documented facts only. No invented awards, clients or job titles. */
  facts: [
    { value: "9.55", label: "Reported CGPA", note: "Computer Engineering" },
    { value: "94.6%", label: "Class 10 score", note: "School academics" },
    { value: "2028", label: "Expected graduation", note: "SPPU" },
    { value: "1st", label: "First-year college topper", note: "Academic record" },
  ],
  focus: [
    "Full-stack product engineering",
    "AI application development",
    "Cybersecurity & security telemetry",
    "Interactive 3D interfaces",
  ],
  availability: [
    "Collaboration opportunities",
    "Internship opportunities",
    "Build-with-me conversations",
  ],
} as const;

export const ownerEmailNormalized = profile.email.trim().toLowerCase();
