"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Github, Calendar, Clock, Users, Video, Layers } from "lucide-react";
import { Project } from "@/data/projects";
import { useRef } from "react";

interface ProjectDetailsViewProps {
  project: Project;
}

export default function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const stagger: Variants = {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen w-full" ref={containerRef}>
      {/* Hero Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden bg-neutral-50/50">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background z-10" />
          <motion.div style={{ y, opacity }} className="relative w-full h-full">
             <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover blur-2xl opacity-30 scale-110"
              priority
            />
          </motion.div>
        </div>

        <div className="relative z-20 max-w-5xl mx-auto px-6 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-6"
          >
            <motion.div variants={fadeInUp}>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-foreground transition-colors px-4 py-2 rounded-full bg-background/50 backdrop-blur-sm border border-neutral-200/50 hover:bg-background/80"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Projects
              </Link>
            </motion.div>
            
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground tracking-tight"
            >
              {project.name}
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 pt-4">
              {project.liveDemoUrl && (
                <Link
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 rounded-full bg-foreground text-background hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 text-base font-medium flex items-center gap-2 shadow-lg shadow-neutral-500/20"
                >
                  Visit Live Site <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 rounded-full bg-background border border-neutral-200 hover:border-neutral-400 transition-all hover:scale-105 active:scale-95 text-base font-medium text-foreground flex items-center gap-2 shadow-sm"
              >
                View Code <Github className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pb-20 -mt-20 relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/50 bg-neutral-100"
        >
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-16">
          {/* Left Column - Description */}
          <div className="lg:col-span-8 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-1 bg-foreground rounded-full" />
                Overview
              </h2>
              <div className="prose prose-neutral prose-lg max-w-none text-neutral-600 leading-relaxed">
                <p className="whitespace-pre-wrap">{project.description}</p>
              </div>
            </motion.div>

            {project.videoLinks && project.videoLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
                  <span className="w-8 h-1 bg-foreground rounded-full" />
                  Demo & Walkthrough
                </h2>
                <div className="grid gap-4">
                  {project.videoLinks.map((link, idx) => (
                    <Link 
                      key={idx}
                      href={link}
                      target="_blank"
                      className="group flex items-center justify-between p-4 rounded-xl bg-neutral-50 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-100 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Video className="w-5 h-5" />
                        </div>
                        <span className="font-medium text-foreground">Watch Demo Video {idx + 1}</span>
                      </div>
                      <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-foreground transition-colors" />
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-6 rounded-2xl bg-neutral-50/50 backdrop-blur-sm border border-neutral-200 space-y-6"
              >
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Layers className="w-5 h-5" />
                  Project Details
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200/50">
                    <div className="flex items-center gap-3 text-neutral-600">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm font-medium">Date</span>
                    </div>
                    <span className="text-sm text-foreground font-medium">{project.dateCreated}</span>
                  </div>
                  
                  <div className="flex items-center justify-between py-3 border-b border-neutral-200/50">
                    <div className="flex items-center gap-3 text-neutral-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm font-medium">Timeline</span>
                    </div>
                    <span className="text-sm text-foreground font-medium">{project.timeCreatedIn}</span>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-neutral-200/50">
                    <div className="flex items-center gap-3 text-neutral-600">
                      <div className={`w-2 h-2 rounded-full ${project.isLive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="text-sm font-medium">Status</span>
                    </div>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${
                      project.isLive 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-amber-100 text-amber-700'
                    }`}>
                      {project.isLive ? 'Live' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold text-foreground">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1.5 text-sm rounded-lg bg-neutral-100 border border-neutral-200 text-foreground font-medium shadow-sm hover:shadow-md transition-shadow cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {project.contributors && project.contributors.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="space-y-4"
                >
                  <h3 className="text-lg font-semibold text-foreground">Team</h3>
                  <div className="space-y-3">
                    {project.contributors.map((contributor) => (
                      <Link
                        key={contributor.name}
                        href={contributor.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 border border-neutral-200 hover:border-neutral-300 hover:bg-neutral-200 transition-all group"
                      >
                        <div className="w-8 h-8 rounded-full bg-neutral-200 flex items-center justify-center text-neutral-600 group-hover:bg-foreground group-hover:text-background transition-colors">
                          <Users className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-foreground">{contributor.name}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
