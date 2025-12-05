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
      "Built and optimized a responsive, user-friendly landing page using TypeScript, Tailwind CSS, and Framer Motion to enhance user engagement and improve website comprehension.",
      "Architected and redesigned the dashboard section with intuitive UI/UX patterns, significantly reducing client friction and improving overall user experience.",
      "Developed interactive micro-components and animations to create seamless user interactions across the platform.",
    
    ],
    technologies: [
      "Next.js",
      "React.js",
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
