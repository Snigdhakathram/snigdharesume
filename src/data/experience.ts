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
      "Delivered the website build, including micro-interactive elements that highlight key features and provide clear visual feedback.",
      "Redesigned the dashboard UI/UX to improve clarity and make the workflow easier to follow between pages.",
      "Resolved user-flow blocking bugs, including real-time updates that improved car-queue productivity and reliability.",
      "Shipped core product features with thoughtful UI/UX enhancements to elevate overall usability and engagement.",
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
