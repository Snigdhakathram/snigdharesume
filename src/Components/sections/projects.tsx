"use client";

import { motion } from "framer-motion";
import { projectsData } from "@/data/projects";
import ProjectCard from "@/Components/ui/ProjectCard";

interface ProjectsProps {
  limit?: number;
}

export default function Projects({ limit }: ProjectsProps) {
  const displayedProjects = limit ? projectsData.slice(0, limit) : projectsData;

  return (
    <section className="py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-left">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              name={project.name}
              description={project.description}
              image={project.image}
              techStack={project.techStack}
              githubUrl={project.githubUrl}
              liveDemoUrl={project.liveDemoUrl}
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
