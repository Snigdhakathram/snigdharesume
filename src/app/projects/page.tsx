import Projects from "@/Components/sections/projects";
import { Plus } from "lucide-react";

export default function ProjectsPage() {
  return (
    <main className="min-h-screen max-w-4xl mx-auto flex flex-col items-center justify-center  px-4 md:px-0">
      <div className="w-full pt-16 border-l border-r border-neutral-200 relative ">


        <Projects />

        <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div>
      </div>
    </main>
  );
}
