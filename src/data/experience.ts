/**
 * Journey + beyond-the-screen content.
 * Dates that are not verified are literally labelled as editable placeholders.
 */

export type Milestone = {
  id: string;
  chapter: string;
  index: string;
  title: string;
  meta: string;
  body: string;
  tags: string[];
  dateNote: string;
  editable: boolean;
};

export const milestones: Milestone[] = [
  {
    id: "education",
    chapter: "Education",
    index: "01",
    title: "Computer Engineering",
    meta: "Ajeenkya DY Patil School of Engineering · SPPU",
    body: "Studying computer engineering at Ajeenkya DY Patil School of Engineering, under Savitribai Phule Pune University. The foundation is systems, software and the discipline of building things that hold up.",
    tags: ["SPPU", "Expected 2028"],
    dateNote: "Expected graduation · 2028",
    editable: false,
  },
  {
    id: "academics",
    chapter: "Academics",
    index: "02",
    title: "A record built on consistency",
    meta: "Reported CGPA 9.55 · First-year college topper",
    body: "A reported CGPA of 9.55 and first-year college topper position. Class 10 finished at 94.6%, alongside earlier school academic achievements. The number matters less than the habit behind it.",
    tags: ["9.55 CGPA", "94.6% · Class 10"],
    dateNote: "Ongoing academic record",
    editable: false,
  },
  {
    id: "ieee",
    chapter: "Leadership",
    index: "03",
    title: "Vice Chair, IEEE Student Branch",
    meta: "IEEE Student Branch",
    body: "Serving as Vice Chair of the IEEE Student Branch — helping shape technical programming, coordinate people and create reasons for students to build outside the syllabus.",
    tags: ["IEEE", "Student branch"],
    dateNote: "Term dates to be added",
    editable: true,
  },
  {
    id: "startup",
    chapter: "Building",
    index: "04",
    title: "Co-founder, sponsored startup",
    meta: "Startup co-founder",
    body: "Co-founded a startup that secured sponsorship — a first, practical education in turning an idea into something other people are willing to back.",
    tags: ["Co-founder", "Sponsored"],
    dateNote: "Timeline to be added",
    editable: true,
  },
  {
    id: "sih",
    chapter: "Building",
    index: "05",
    title: "Smart India Hackathon team leader",
    meta: "Smart India Hackathon",
    body: "Led a Smart India Hackathon team through problem framing, division of work and building under deadline pressure. Also a freelance developer and a debate team participant — different rooms, same skill: making a case clearly.",
    tags: ["SIH", "Team lead", "Freelance"],
    dateNote: "Edition and year to be added",
    editable: true,
  },
  {
    id: "projects",
    chapter: "Building",
    index: "06",
    title: "The project universe",
    meta: "LogX · SatyaScan · StudyLens AI · Shadow Blade",
    body: "Security telemetry, legal-metrology inspection, AI-assisted study and a browser game. Different problems, one pattern: take something complicated and make it usable, inspectable or playable.",
    tags: ["Full-stack", "AI", "Security", "3D"],
    dateNote: "Ongoing",
    editable: false,
  },
];

export type Interest = {
  id: string;
  label: string;
  index: string;
  line: string;
  body: string;
  object: "chess" | "mma" | "cricket" | "hiphop" | "trekking" | "travel";
};

export const interests: Interest[] = [
  {
    id: "chess",
    label: "Chess",
    index: "01",
    line: "Think three moves ahead.",
    body: "The board rewards patience, structure and the willingness to sacrifice something now for a better position later. It is the same instinct as good architecture.",
    object: "chess",
  },
  {
    id: "mma",
    label: "MMA",
    index: "02",
    line: "Discipline under pressure.",
    body: "Combat sports are a lesson in preparation and composure — you cannot fake either when the round starts. The same is true of a launch.",
    object: "mma",
  },
  {
    id: "cricket",
    label: "Cricket",
    index: "03",
    line: "The long game.",
    body: "A match is built out of small decisions, partnerships and patience. Also the best excuse to spend an entire evening outside.",
    object: "cricket",
  },
  {
    id: "hiphop",
    label: "Hip-hop",
    index: "04",
    line: "Rhythm as a design language.",
    body: "Beat, cadence, space and timing. Hip-hop trained the ear that now shapes the motion and pacing of the interfaces I build.",
    object: "hiphop",
  },
  {
    id: "trekking",
    label: "Trekking",
    index: "05",
    line: "Earn the view.",
    body: "The best perspectives are never at the trailhead. Trekking is a reminder that most worthwhile things are uphill first.",
    object: "trekking",
  },
  {
    id: "travel",
    label: "Travelling",
    index: "06",
    line: "Change the coordinates.",
    body: "New places reset assumptions. Travelling is research for empathy — seeing how differently people live, solve and build.",
    object: "travel",
  },
];
