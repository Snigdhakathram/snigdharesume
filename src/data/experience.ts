export interface Experience {
  id?: string;
  name: string;
  company?: string;
  role: string;
  description: string[];
  duration: string;
  technologies: string[];
  logo: string;
  left: boolean;
  type: "achievement" | "experience" | "education";
  iconType: "trophy" | "medal" | "code" | "academic";
  isCurrent?: boolean;
  positions?: {
    role: string;
    duration: string;
    type: "promotion" | "role_change";
  }[];
}

export const experienceData: Experience[] = [
  {
    id: "1",
    name: "Kakiyo OÜ",
    role: "Full Stack Developer",
    company: "",
    duration: "Jan 2026 - Present",
    isCurrent: true,
    positions: [
      {
        role: "Full Stack Developer",
        duration: "Jan 2026 - Present",
        type: "promotion",
      },
      {
        role: "Frontend Developer",
        duration: "Nov 2025 - Jan 2026",
        type: "role_change",
      },
    ],
    description: [
      // "Transitioned to Full Stack role, leading backend integration and database architecture while maintaining frontend excellence.",
      "Developed core features with optimized, scalable architecture ensuring efficient rendering and maintainable code structure.",
      "Built intuitive UI/UX designs focusing on seamless user navigation and accessibility across all device types.",
      "Implemented responsive layouts, leveraging performance optimizations and code splitting techniques.",
      "Created interactive micro-components and animations using Framer Motion, enhancing user engagement and visual feedback.",
    ],
    technologies: [
      "Next.js",
      "React.js",
      // "Node.js",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
    ],
    logo: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1757182382/logo_etjtoe.png",
    left: false,
    type: "experience",
    iconType: "code",
  },
];
