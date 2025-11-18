import { projectsData } from "@/data/projects";
import { notFound } from "next/navigation";
import ProjectDetailsView from "@/Components/sections/ProjectDetailsView";

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

  return <ProjectDetailsView project={project} />;
}
