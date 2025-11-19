"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";

interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  techStack: string[];
  githubUrl: string;
  liveDemoUrl?: string;
  index: number;
}

import SpotlightCard from "./SpotlightCard";

export default function ProjectCard({
  name,
  description,
  image,
  techStack,
  githubUrl,
  liveDemoUrl,
  index,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <SpotlightCard className="group h-full bg-neutral-100 border-neutral-300/50 hover:border-neutral-400/80 hover:shadow-xl transition-all duration-300 flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105" 
          />
        </div>

        <div className="p-6 flex flex-col grow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl md:text-2xl font-bold text-foreground">
              {name}
            </h3>
            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 border border-neutral-300 bg-neutral-200 hover:bg-neutral-300 transition-colors z-10"
              aria-label="View GitHub"
            >
              <IconBrandGithub className="w-5 h-5 text-foreground" />
            </Link>
          </div>

          <p className="text-sm text-justify text-neutral-600 mb-4 leading-relaxed line-clamp-3 grow">
            {description}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs border border-neutral-300 bg-neutral-200 text-foreground"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 4 && (
              <span className="px-3 py-1 text-xs border border-neutral-300 bg-neutral-200 text-foreground">
                +{techStack.length - 4}
              </span>
            )}
          </div>

          <div className="flex gap-3 mt-auto z-10 relative">
            <Link
              href={`/projects/${name.toLowerCase().replace(/\s+/g, "-")}`}
              className="flex-1 px-4 py-2.5 border border-foreground bg-foreground text-background hover:bg-neutral-800 transition-colors text-center text-sm font-medium"
            >
              Details
            </Link>
            {liveDemoUrl && (
              <Link
                href={liveDemoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 border border-neutral-300 hover:border-neutral-400 transition-colors text-center text-sm font-medium text-foreground flex items-center justify-center gap-2"
              >
                Live <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
