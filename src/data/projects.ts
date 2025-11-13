export interface Contributor {
  name: string;
  githubUrl: string;
}

export interface Project {
  id: string;
  name: string;
  image: string;
  description: string;
  techStack: string[];
  liveDemoUrl?: string;
  githubUrl: string;
  dateCreated: string;
  timeCreatedIn: string;
  isLive: boolean;
  contributors: Contributor[];
  videoLinks?: string[];
}

export const projectsData: Project[] = [
  {
    id: "2",
    name: "CappyChat",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/v1759138327/AV_1_zztl3w.png",
    description:
      "Next-Generation AI Chat Platform-Experience intelligent conversations with 20+ advanced AI models. Fast, secure, and designed for the future of communication.",
    techStack: [
      "Tailwind CSS",
      "Next.js",
      "TypeScript",
      "Open Router",
      "Vercel AI SDK",
      "Appwrite Realtime DB",
      "Zustand",
    ],
    liveDemoUrl: "https://cappychat.com",
    githubUrl: "https://github.com/cyberboyayush/cappychat",
    dateCreated: "January 2025",
    timeCreatedIn: "2 weeks",
    isLive: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  {
    id: "1",
    name: "ResuMate",
    image: "https://resumate.vrandagarg.in/banner.png",
    description:
      "ResuMate is an AI-powered platform for building professional, ATS-friendly resumes with live editing, smart formatting, and real-time feedback.",
    techStack: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "OpenAI API",
      "Firebase",
      "Appwrite",
    ],
    liveDemoUrl: "https://resumate.vrandagarg.in/",
    githubUrl: "https://github.com/VrandaaGarg/ResuMate",
    dateCreated: "December 2024",
    timeCreatedIn: "3 weeks",
    isLive: true,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  {
    id: "5",
    name: "SkillCompass",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/q_60/v1752582426/skillcompass_ci3gur.png",
    description:
      "SkillCompass is an AI-powered learning platform that personalizes your learning journey with interactive modules, adaptive quizzes, and real-time feedback.",
    techStack: [
      "React JS",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
      "Gemini API",
    ],
    liveDemoUrl: "https://skillcompass.glucon-d.xyz/",
    githubUrl: "https://github.com/Glucon-D/SkillCompass",
    dateCreated: "November 2024",
    timeCreatedIn: "1 week",
    isLive: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  {
    id: "3",
    name: "SmartBite",
    image: "https://smartbite.vrandagarg.in/banner.png",
    description:
      "SmartBite is a full-stack food ordering app for single restaurants, offering seamless menu browsing, order management, and customer tracking—all",
    techStack: ["React JS", "JavaScript", "Appwrite", "Email JS"],
    liveDemoUrl: "https://smartbite.vrandagarg.in/",
    githubUrl: "https://github.com/VrandaaGarg/smartbite",
    dateCreated: "October 2024",
    timeCreatedIn: "2 weeks",
    isLive: true,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  {
    id: "4",
    name: "Arcadia",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/q_60/v1752582425/arcadia_cq0ncn.png",
    description:
      "A social media platform with user profiles, posts, comments, likes, and real-time messaging functionality.",
    techStack: ["React JS", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    liveDemoUrl: "https://arcadia.vrandagarg.me/",
    githubUrl: "https://github.com/VrandaaGarg/Arcadia",
    dateCreated: "September 2024",
    timeCreatedIn: "3 weeks",
    isLive: true,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  {
    id: "6",
    name: "FinWise",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/q_60/v1752582425/finwise_obzcir.png",
    description:
      "FinWise is an AI-powered investment platform that helps beginners understand and plan their investments based on risk, capital, age, and financial goals.",
    techStack: [
      "React JS",
      "JavaScript",
      "Appwrite",
      "Tailwind CSS",
      "Framer Motion",
      "Gemini API",
    ],
    liveDemoUrl: "https://finwise.ayush-sharma.in/",
    githubUrl: "https://github.com/Glucon-D/FinWise",
    dateCreated: "August 2024",
    timeCreatedIn: "1 week",
    isLive: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
  {
    id: "7",
    name: "Portfolio",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/q_60/v1752582425/portfolio_qamgzu.png",
    description:
      "This portfolio showcases my skills, projects, and experiences. It features a modern design with smooth animations, responsive layout, and interactive elements.",
    techStack: [
      "Next JS",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Lucide Icons",
    ],
    liveDemoUrl: "https://vrandagarg.in/",
    githubUrl: "https://github.com/VrandaaGarg/next-portfolio",
    dateCreated: "July 2024",
    timeCreatedIn: "2 weeks",
    isLive: true,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
    ],
  },
];
