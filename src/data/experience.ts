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
}

export const experienceData: Experience[] = [
  {
    id: "1",
    name: "Kakiyo OÜ",
    role: "Frontend Developer",
    company: "",
    duration: "Nov 2025 - Present",
    isCurrent: true,
    description: [
      "Developed core features with optimized, scalable architecture ensuring efficient rendering and maintainable code structure.",
      "Built intuitive UI/UX designs focusing on seamless user navigation and accessibility across all device types.",
      "Implemented responsive layouts with high uptime, leveraging performance optimizations and code splitting techniques.",
      "Created interactive micro-components and animations using Framer Motion, enhancing user engagement and visual feedback.",
    ],
    technologies: [
      "Next.js",
      "React.js",
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
