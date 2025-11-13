import { projectsData } from "@/data/projects";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { IconBrandGithub } from "@tabler/icons-react";
import { FiCalendar, FiClock, FiVideo } from "react-icons/fi";
import SkillCard from "@/Components/ui/SkillCard";

export async function generateStaticParams() {
  return projectsData.map((project) => ({
    name: project.name.toLowerCase().replace(/\s+/g, "-"),
  }));
}

interface ProjectPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { name } = await params;
  const project = projectsData.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (!project) {
    notFound();
  }

  return (
    <main className="flex justify-center px-6">
      <div className="w-full max-w-3xl py-32">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-neutral-600 hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground">
              {project.name}
            </h1>
            <div className="flex gap-3">
              {project.liveDemoUrl && (
                <Link
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-foreground text-background hover:bg-neutral-800 transition-colors text-base font-medium flex items-center gap-2"
                >
                  Visit Site <ExternalLink className="w-4 h-4" />
                </Link>
              )}
              <Link
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full border border-neutral-300 hover:border-neutral-400 transition-colors text-base font-medium text-foreground flex items-center gap-2"
              >
                <IconBrandGithub className="w-5 h-5" />
              </Link>
            </div>
          </div>

          <div className="relative w-full h-96 rounded-2xl overflow-hidden border border-neutral-300">
            <Image
              src={project.image}
              alt={project.name}
              fill
              className="object-cover"
            />
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About the Project
              </h2>
              <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <FiCalendar className="w-5 h-5 text-neutral-600" />
                <div>
                  <p className="text-base font-medium text-foreground">
                    {project.dateCreated}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <FiClock className="w-5 h-5 text-neutral-600" />
                <div>
                  <p className="text-base font-medium text-foreground">
                    {project.timeCreatedIn}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.techStack.map((tech) => (
                  <SkillCard key={tech} name={tech} showIcon={false} />
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Contributors
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.contributors.map((contributor) => (
                  <Link
                    key={contributor.name}
                    href={contributor.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 hover:border-neutral-400 transition-all"
                  >
                    <IconBrandGithub className="w-4 h-4 text-foreground" />
                    <span className="text-sm md:text-base text-foreground">
                      {contributor.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {project.videoLinks && project.videoLinks.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  Video Demonstrations
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.videoLinks.map((link, index) => (
                    <Link
                      key={index}
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 hover:border-neutral-400 transition-all"
                    >
                      <FiVideo className="w-4 h-4 text-foreground" />
                      <span className="text-sm md:text-base text-foreground">
                        Video {index + 1}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
