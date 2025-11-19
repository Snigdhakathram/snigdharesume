"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ExternalLink,
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  Video,
  Layers,
  Github,
  Globe,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Project, projectsData } from "@/data/projects";
import ReactMarkdown from "react-markdown";
import Magnetic from "@/Components/ui/Magnetic";

interface ProjectDetailsViewProps {
  project: Project;
}

export default function ProjectDetailsView({
  project,
}: ProjectDetailsViewProps) {
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const stagger: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const prevProject =
    projectsData[currentIndex - 1] || projectsData[projectsData.length - 1];
  const nextProject =
    projectsData[currentIndex + 1] || projectsData[0];

  return (
    <div className="min-h-screen w-full  pb-10">
      {/* Fixed Morphed Background */}
      {/* <div className="fixed top-0 left-0 right-0 h-screen w-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background z-10" />
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover blur-3xl opacity-20 scale-110"
          priority
        />
      </div> */}

      <div className="max-w-4xl mx-auto relative z-10 px-4 md:px-0">
        <div className="w-full border-l border-r pt-16 border-neutral-200 relative  ">
          {/* Top Border & Icons */}
          {/* <div className="border-t border-neutral-200 relative">
            <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
            <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
          </div> */}

          <div className="p-6 md:p-10">
            {/* Back Link */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-foreground transition-colors px-4 py-2 rounded-full bg-card border border-neutral-200 hover:bg-neutral-100"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="space-y-8"
            >
              {/* Header Section */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6  pb-4">
                <motion.h1
                  variants={fadeInUp}
                  className="text-4xl md:text-6xl font-bold text-foreground"
                >
                  {project.name}
                </motion.h1>

                <motion.div
                  variants={fadeInUp}
                  className="flex items-center gap-3"
                >
                  {project.liveDemoUrl && (
                    <Magnetic>
                      <Link
                        href={project.liveDemoUrl}
                        target="_blank"
                        className="relative group block cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-full bg-card border border-neutral-200 flex items-center justify-center text-neutral-800 transition-all duration-500 group-hover:bg-foreground group-hover:text-background shadow-md">
                          <Globe className="w-5 h-5" />
                        </div>
                      </Link>
                    </Magnetic>
                  )}

                  <Magnetic>
                    <Link
                      href={project.githubUrl}
                      target="_blank"
                      className="relative group block cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-card border border-neutral-200 flex items-center justify-center text-neutral-800 transition-all duration-500 group-hover:bg-foreground group-hover:text-background shadow-md">
                        <Github className="w-5 h-5" />
                      </div>
                    </Link>
                  </Magnetic>
                </motion.div>
              </div>

              {/* Main Image */}
              <motion.div
                variants={fadeInUp}
                className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-neutral-200 bg-neutral-100"
              >
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 pt-4">
                {/* Left Column - Description */}
                <div className="lg:col-span-2 space-y-8">
                  <motion.div variants={fadeInUp}>
                    <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Layers className="w-5 h-5 text-neutral-500" />
                      Overview
                    </h2>
                    <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 leading-relaxed text-sm md:text-base">
                      <ReactMarkdown
                        components={{
                          strong: ({ children }) => (
                            <strong className="font-bold text-foreground">
                              {children}
                            </strong>
                          ),
                          ul: ({ children }) => (
                            <ul className="space-y-3 list-disc pl-4 marker:text-neutral-400">
                              {children}
                            </ul>
                          ),
                          li: ({ children }) => (
                            <li className="pl-1">{children}</li>
                          ),
                          p: ({ children }) => (
                            <p className="whitespace-pre-wrap mb-4">
                              {children}
                            </p>
                          ),
                        }}
                      >
                        {project.description}
                      </ReactMarkdown>
                    </div>
                  </motion.div>

                  {project.videoLinks && project.videoLinks.length > 0 && (
                    <motion.div variants={fadeInUp} className="space-y-4">
                      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
                        <Video className="w-5 h-5 text-neutral-500" />
                        Demo Videos
                      </h2>
                      <div className="grid gap-3">
                        {project.videoLinks.map((link, idx) => (
                          <Link
                            key={idx}
                            href={link}
                            target="_blank"
                            className="group flex items-center justify-between p-3 rounded-lg bg-white border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all shadow-sm"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Video className="w-4 h-4" />
                              </div>
                              <span className="font-medium text-foreground text-sm">
                                Watch Video {idx + 1}
                              </span>
                            </div>
                            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-foreground transition-colors" />
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Right Column - Details Sidebar */}
                <div className="space-y-6">
                  <motion.div
                    variants={fadeInUp}
                    className="p-5 rounded-xl bg-card border border-neutral-200 space-y-4 shadow-sm"
                  >
                    <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider  mb-2">
                      Project Info
                    </h3>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <div className="flex items-center gap-2 text-neutral-600 text-sm">
                          <Calendar className="w-4 h-4" />
                          <span>Date</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {project.dateCreated}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2 border-b border-neutral-100">
                        <div className="flex items-center gap-2 text-neutral-600 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>Timeline</span>
                        </div>
                        <span className="text-sm font-medium text-foreground">
                          {project.timeCreatedIn}
                        </span>
                      </div>

                      <div className="flex justify-between items-center py-2">
                        <div className="flex items-center gap-2 text-neutral-600 text-sm">
                          <div
                            className={`w-2 h-2 rounded-full ${project.isLive ? "bg-emerald-500" : "bg-amber-500"
                              }`}
                          />
                          <span>Status</span>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${project.isLive
                            ? "bg-emerald-100 dark:bg-emerald-700 dark:text-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                            }`}
                        >
                          {project.isLive ? "Live" : "In Progress"}
                        </span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeInUp} className="space-y-3">
                    <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider ">
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 text-xs rounded-md bg-card border border-neutral-200 text-neutral-700 font-medium shadow-sm"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {project.contributors && project.contributors.length > 0 && (
                    <motion.div variants={fadeInUp} className="space-y-4">
                      <h3 className="font-semibold text-foreground text-sm uppercase tracking-wider flex items-center gap-2">
                        <Users className="w-4 h-4 text-neutral-500" />
                        Team
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {project.contributors.map((contributor) => {
                          const username = contributor.githubUrl
                            .replace(/\/$/, "")
                            .split("/")
                            .pop();
                          return (
                            <Link
                              key={contributor.name}
                              href={contributor.githubUrl}
                              target="_blank"
                              className="group flex items-center gap-3 p-1.5 pr-4 rounded-full bg-card border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 transition-all shadow-sm"
                            >
                              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-neutral-200 group-hover:scale-105 transition-transform bg-neutral-100">
                                <Image
                                  src={`https://github.com/${username}.png`}
                                  alt={contributor.name}
                                  fill
                                  className="object-cover"
                                  sizes="36px"
                                />
                              </div>
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-foreground group-hover:text-foreground transition-colors">
                                  {contributor.name}
                                </span>
                                <span className="text-[10px] text-neutral-500 font-medium flex items-center gap-1">
                                  <Github className="w-3 h-3" />
                                  @{username}
                                </span>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Project Navigation */}
          <div className="border-t border-neutral-200 relative">
            <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
            <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
            <div className="grid grid-cols-2 divide-x divide-neutral-200">
              <Link
                href={`/projects/${prevProject.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group p-6 md:p-8 flex flex-col gap-2 hover:bg-neutral-50 transition-colors text-left"
              >
                <span className="text-xs font-medium text-neutral-500 flex items-center gap-1 group-hover:text-foreground transition-colors">
                  <ChevronLeft className="w-3 h-3" /> Previous Project
                </span>
                <span className="text-lg md:text-xl font-bold text-foreground group-hover:underline decoration-neutral-300 underline-offset-4">
                  {prevProject.name}
                </span>
              </Link>

              <Link
                href={`/projects/${nextProject.name
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="group p-6 md:p-8 flex flex-col gap-2 items-end hover:bg-neutral-50 transition-colors text-right"
              >
                <span className="text-xs font-medium text-neutral-500 flex items-center gap-1 group-hover:text-foreground transition-colors">
                  Next Project <ChevronRight className="w-3 h-3" />
                </span>
                <span className="text-lg md:text-xl font-bold text-foreground group-hover:underline decoration-neutral-300 underline-offset-4">
                  {nextProject.name}
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Border & Icons */}
          <div className="border-t border-neutral-200 relative">
            <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
            <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
          </div>
        </div>
      </div>
    </div>
  );
}
