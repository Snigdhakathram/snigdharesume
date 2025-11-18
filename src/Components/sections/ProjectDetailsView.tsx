"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowLeft, Calendar, Clock, Users, Video, Layers } from "lucide-react";
import { Project } from "@/data/projects";
import ReactMarkdown from "react-markdown";

interface ProjectDetailsViewProps {
  project: Project;
}

export default function ProjectDetailsView({ project }: ProjectDetailsViewProps) {
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
    <div className="min-h-screen w-full">
      {/* Fixed Morphed Background */}
      <div className="fixed top-0 left-0 right-0 h-screen w-full z-0 pointer-events-none">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/50 to-background z-10" />
        <Image
          src={project.image}
          alt={project.name}
          fill
          className="object-cover blur-3xl opacity-30 scale-110"
          priority
        />
      </div>

      {/* Hero Section */}
      <div className="relative pt-20  w-full flex items-center justify-center overflow-hidden">

        <div className="relative z-20  max-w-3xl mx-auto px-6 w-full">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="space-y-2"
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
              className="text-5xl md:text-7xl font-bold text-foreground tracking-tight"
            >
              {project.name}
            </motion.h1>


          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-6 pb-20  relative z-30">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative w-full mt-8 aspect-video max-h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200/50 bg-neutral-100"
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
                <ReactMarkdown
                  components={{
                    strong: ({ children }) => <strong className="font-bold text-foreground">{children}</strong>,
                    ul: ({ children }) => <ul className="space-y-6 list-none">{children}</ul>,
                    li: ({ children }) => <li className="flex items-start gap-2 leading-relaxed">{children}</li>,
                    p: ({ children }) => <p className="whitespace-pre-wrap mb-4">{children}</p>,
                  }}
                >
                  {project.description}
                </ReactMarkdown>
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
            <div className="sticky top-24 space-y-5">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="p-5 rounded-2xl bg-neutral-50/50 backdrop-blur-sm border border-neutral-200 space-y-3"
              >
                <h3 className="text-md font-semibold text-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Project Details
                </h3>

                <div className="">
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

                  <div className="flex items-center justify-between pt-3">
                    <div className="flex items-center gap-3 text-neutral-600">
                      <div className={`w-2 h-2 rounded-full ${project.isLive ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                      <span className="text-sm font-medium">Status</span>
                    </div>
                    <span className={`text-sm font-medium px-2 py-0.5 rounded-full ${project.isLive
                      ? 'bg-emerald-800 text-emerald-200'
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
