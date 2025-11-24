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
      "Next-generation AI chat platform engineered for **performance** and **scalability**.\n\n• **30+ Premium AI Models** - GPT-5, Gemini 2.5, Claude 4, Grok 4, DeepSeek, Qwen with **intelligent routing**\n• **Sub-100ms Response Time** - Local-first architecture with **IndexedDB + Appwrite** cloud integration\n• **Plan Mode** - Interactive diagrams and visualizations using **Mermaid syntax**\n• **AI-Powered Image Generation** - Google Gemini 2.5 Flash with **context-aware** generation\n• **Voice Input** - OpenAI Whisper **speech-to-text** integration\n• **Intelligent Web Search** - Parallel AI, Tavily, and Exa with **automatic tool selection**\n• **Multi-Format File Upload** - AI analysis with **PDF thumbnails** and pagination\n• **Real-Time Sync** - Instant synchronization across all devices with **WebSocket** connections\n• **Advanced Features** - BYOK support, tiered access system, **Better Stack** logging, **Upstash Redis** rate limiting",
    techStack: [
      "Next.js 15",
      "TypeScript",


      "Zustand",

      "Appwrite",
      "OpenRouter",


      "Cloudinary",
      "Better Stack",

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
      "AI-powered resume builder designed to help job seekers craft **professional, ATS-friendly resumes** with **intelligent optimization**.\n\n• **Step-by-Step Builder** - Guided form inputs for personal info, education, experience, and **certifications**\n• **Resume Upload & Analysis** - Upload resumes (PDF/DOCX) with instant **ATS scoring**\n• **Create from Upload** - Auto-populate templates with **intelligent parsing**\n• **Live Preview & Editor** - Real-time editing with **formatting options** and hyperlink support\n• **3 Professional Templates** - Classic, Sidebar, and Standard with **instant switching**\n• **AI Bullet Enhancer** - Transform points into **action-oriented** statements\n• **Role-Specific Optimization** - Tailor resumes with **AI-powered suggestions**\n• **Job Description Matching** - Get match scores and **improvement tips**\n• **ATS Compatibility Checker** - Score (0-100) on **ATS friendliness**\n• **PDF Export** - Download **pixel-perfect PDFs** ready for applications",
    techStack: [
      "React (Vite)",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "OpenAI API",
      "Firebase",
      "Appwrite",
      "react-to-print",
    ],
    liveDemoUrl: "https://resumate.vrandagarg.in/",
    githubUrl: "https://github.com/VrandaaGarg/ResuMate",
    dateCreated: "May 2025",
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
      "AI-powered learning platform that **revolutionizes education** by creating **personalized learning experiences** tailored to individual needs, skills, and career aspirations.\n\n• **AI-Generated Learning Paths** - Personalized curricula based on **your profile and goals**\n• **Interactive Content** - Engaging modules, explanations, and **learning resources**\n• **Smart Flashcards** \n• **Adaptive Quizzes** - Dynamic assessments that **adapt to your progress**\n• **Real-Time Analytics** - Comprehensive progress tracking and **performance insights**\n• **Gamification** - Points, streaks, and achievements to **keep you motivated**\n• **AI Coaching** - Intelligent nudges and **personalized recommendations**\n• **Dual AI Engine** - Powered by **Gemini 2.0 Flash** and **Groq (Llama 3.3 70B)**\n• **Cloud Synchronization** - Learn anytime, anywhere with **24/7 availability**",
    techStack: [
      "React 18",
      "Vite",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
      "Gemini 2.0",
      "Groq (Llama 3.3)",
      "Cloudflare",
    ],
    liveDemoUrl: "https://skillcompass.glucon-d.xyz/",
    githubUrl: "https://github.com/Glucon-D/SkillCompass",
    dateCreated: "June 2025",
    timeCreatedIn: "48 hours",
    isLive: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
      { name: "Raghav Gaba", githubUrl: "https://github.com/raghavvvgaba" },
      { name: "Atishay Jain", githubUrl: "https://github.com/atishay-jain04" },
    ],
  },
  {
    id: "3",
    name: "SmartBite",
    image: "https://smartbite.vrandagarg.in/banner.png",
    description:
      "Full-stack restaurant ordering system for **single restaurant owners** to **digitize their service** with intuitive UI.\n\n• **Role-Based Access** - **User, Admin, and Super Admin** roles\n• **Cart System** - Quantity control with **subtotal, tax, and delivery** calculations\n• **Order Management** - Order tracking with **status updates** (static for now)\n• **Review System** - **Write, edit, and delete** reviews\n• **Dish Management** - CRUD operations for **menu items**\n• **Orders Dashboard** - Admin view with **date/name filters**\n• **Customer Management** - **Promote/demote** admin (Super Admin only)\n• **Order Notifications** - Automated **email alerts** via EmailJS\n• **Context API** - State management for **Cart, Auth, and Orders**\n• **Smooth Animations** - **Framer Motion** transitions",
    techStack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
      "EmailJS",
      "Context API",
      "React Router",
    ],
    liveDemoUrl: "https://smartbite.vrandagarg.in/",
    githubUrl: "https://github.com/VrandaaGarg/smartbite",
    dateCreated: "April 2025",
    timeCreatedIn: "1 weeks",
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
      "Full-stack gaming platform featuring **10 classic games** with **competitive leaderboards** and authentication.\n\n• **10 Games** - Chess, 2048, Memory Card, Minesweeper, Pacman, Rock Paper Scissors, Snake, Sudoku, Tic-Tac-Toe\n• **Leaderboards** - Competitive rankings for **each game**\n• **Authentication** - **Login, signup, forgot and reset password**\n• **User Profiles** - Pages with **game statistics**\n• **Score Tracking** - Persistent storage in **MongoDB**\n• **Smooth Animations** - **Framer Motion** transitions\n• **Email Notifications** - Password recovery via **Nodemailer**\n• **Context API** - State management for **sessions and data**\n• **Responsive Design** - Optimized across **all devices**\n• **MERN Stack** - **React** frontend and **Node.js/Express** backend",
    techStack: [
      "React",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Nodemailer",
      "Context API",
    ],
    liveDemoUrl: "https://arcadia.vrandagarg.me/",
    githubUrl: "https://github.com/VrandaaGarg/Arcadia",
    dateCreated: "September 2024",
    timeCreatedIn: "3 weeks",
    isLive: true,
    contributors: [
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
    ],
  },
  {
    id: "6",
    name: "FinWise",
    image:
      "https://res.cloudinary.com/dyetf2h9n/image/upload/q_60/v1752582425/finwise_obzcir.png",
    description:
      "AI-powered investment assistant helping **beginners understand and plan investments** based on **risk, capital, age, and financial goals**.\n\n• **Gemini AI Fund Suggestions** - Personalized investment recommendations via **Google Gemini AI**\n• **Live Gold Rate Integration** - Real-time gold prices via **MetalsAPI**\n• **FunBot AI Chatbot** - Interactive financial assistant for **investment queries**\n• **Beginner-Focused Blog** - Educational content with **AI-powered summarization**\n• **'I'm 18' Mode** - Simplified explanations for **complex financial concepts**\n• **Multi-Step Profile Form** - User profiling for **goal and risk-based investing**\n• **Secure Authentication** - User management with **Appwrite Auth & Database**\n• **Real-Time Market Data** - Financial API integration for **live investment insights**\n• **Smooth UX Design** - Polished interface with **Framer Motion animations**\n• **Educational Focus** - Built for **financial literacy** and beginner investors",
    techStack: [
      "React",
      "Vite",
      "JavaScript",
      "Tailwind CSS",
      "Framer Motion",
      "Appwrite",
      "Gemini API",
      "MetalsAPI",
      "React Icons",
    ],
    liveDemoUrl: "https://finwise.ayush-sharma.in/",
    githubUrl: "https://github.com/Glucon-D/FinWise",
    dateCreated: "August 2024",
    timeCreatedIn: "1 week",
    isLive: true,
    contributors: [
      { name: "Ayush Sharma", githubUrl: "https://github.com/cyberboyayush" },
      { name: "Vranda Garg", githubUrl: "https://github.com/VrandaaGarg" },
      { name: "Atishay Jain", githubUrl: "https://github.com/atishay-jain04" },
      { name: "Raghav Gaba", githubUrl: "https://github.com/raghavvvgaba" },
      { name: "Raghav Katta", githubUrl: "https://github.com/raghavxkatta" },
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
