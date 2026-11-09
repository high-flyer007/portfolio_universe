export const SECTIONS = [
  { id: "origin", label: "Origin", index: "02" },
  { id: "projects", label: "Projects", index: "03" },
  { id: "engineering", label: "Engineering", index: "04" },
  { id: "journey", label: "Journey", index: "05" },
  { id: "beyond", label: "Beyond", index: "06" },
  { id: "contact", label: "Contact", index: "07" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

export const SCENE_NAMES = [
  "Awakening",
  "Origin",
  "Project Universe",
  "Engineering Core",
  "Journey",
  "Beyond the Screen",
  "Connection",
] as const;

export const SECTION_IDS = ["awakening", ...SECTIONS.map((s) => s.id)] as const;
