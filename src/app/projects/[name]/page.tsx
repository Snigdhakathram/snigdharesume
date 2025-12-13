import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectDetailsView from "@/Components/sections/ProjectDetailsView";
import type { Metadata } from "next";

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

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { name } = await params;
  const project = projectsData.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const siteUrl = "https://vrandagarg.in";
  const projectUrl = `${siteUrl}/projects/${name}`;
  const description = project.description
    .replace(/\*\*/g, "")
    .replace(/\n/g, " ")
    .substring(0, 160);

  return {
    title: project.name,
    description,
    keywords: [
      project.name,
      ...project.techStack,
      "Web Development",
      "Portfolio Project",
      "Vranda Garg",
    ],
    openGraph: {
      title: `${project.name} - Vranda Garg`,
      description,
      url: projectUrl,
      siteName: "Vranda Garg - Portfolio",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: `${project.name} - Project by Vranda Garg`,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} - Vranda Garg`,
      description,
      images: [project.image],
      creator: "@vrandaagarg",
    },
    alternates: {
      canonical: projectUrl,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { name } = await params;
  const project = projectsData.find(
    (p) => p.name.toLowerCase().replace(/\s+/g, "-") === name
  );

  if (!project) {
    notFound();
  }

  return <ProjectDetailsView project={project} />;
}
