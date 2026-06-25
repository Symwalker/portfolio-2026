export type Project = {
  id: string;
  index: string;       // "01", "02"
  title: string;
  client: string;
  year: string;
  role: string;
  stack: string[];
  accent: string;      // hex, drives cover gradient
  href: string;
  cover?: string;
  coverFit?: "contain" | "cover";
  coverType?: "image" | "twoWindow";
  coverBack?: string;
  coverFront?: string;
};

export const projects: Project[] = [
  {
    id: "360-xpert-dashboard",
    index: "01",
    title: "360-Xpert Enterprise",
    client: "360-Xpert Solutions",
    year: "2025",
    role: "Lead Frontend Architect",
    stack: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    accent: "#1d4ed8", // Deep Blue
    href: "https://shayan-builds.ai",
    cover: "/projects/360xpert.webp"
  },
  {
    id: "360-xpert-mobile",
    index: "02",
    title: "Attendify",
    client: "Attendify",
    year: "2024",
    role: "Frontend Developer",
    stack: ["React Native", "Node.js", "PostgreSQL"],
    accent: "#3a2f6e", // deep purple matching cover background
    href: "https://shayan-builds.ai",
    cover: "/projects/attendify-cover.webp",
    coverFit: "contain"
  },
  {
    id: "kloudboard",
    index: "03",
    title: "Kloudboard",
    client: "Kloudboard",
    year: "2025",
    role: "Frontend Developer",
    stack: ["React", "Tailwind CSS", "Framer Motion"],
    accent: "#161a22", // dark slate so the white page pops
    href: "https://shayan-builds.ai",
    cover: "/projects/kloudboard.webp",
    coverFit: "cover"
  },
  {
    id: "hedy-agency",
    index: "04",
    title: "Callify",
    client: "Callify",
    year: "2025",
    role: "Frontend Developer",
    stack: ["React", "Tailwind CSS", "Node.js"],
    accent: "#d81fb0", // Bold magenta
    href: "https://shayan-builds.ai",
    cover: "/projects/callify-cover.webp",
    coverFit: "contain"
  },
  {
    id: "menu-ocr",
    index: "05",
    title: "PaperPod",
    client: "PaperPod",
    year: "2025",
    role: "Frontend Developer",
    stack: ["React Native", "Node.js", "PostgreSQL"],
    accent: "#0a0810", // deep purple-black
    href: "https://shayan-builds.ai",
    cover: "/projects/paperpod-cover.png",
    coverFit: "contain"
  }
];
