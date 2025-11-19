export interface Experience {
  id?: string;
  name: string;
  company?: string;
  role: string;
  description: string;
  duration: string;
  technologies: string[];
  logo: string;
  left: boolean;
  type: "achievement" | "experience" | "education";
  iconType: "trophy" | "medal" | "code" | "academic";
}

export const experienceData: Experience[] = [
  {
    id: "1",
    name: "Kakiyo OÜ",
    role: "Frontend Developer",
    company: "",
    duration: "Aug 2025 - Sept 2025",
    description:
      "Implemented and optimized a responsive, user-friendly website landing page using Next.js, Tailwind CSS, TypeScript, and Framer Motion by enhancing user engagement through micro-interactive components for better website understanding.",
    technologies: ["Next JS", "TypeScript", "Tailwind CSS", "Framer Motion"],
    logo: "https://res.cloudinary.com/dyetf2h9n/image/upload/v1757182382/logo_etjtoe.png",
    left: false,
    type: "experience",
    iconType: "code",
  },
];
