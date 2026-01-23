import { MetadataRoute } from "next";
import { projectsData } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://vrandagarg.in";

  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  // Dynamic project routes - only featured projects
  const featuredProjects = projectsData.filter((project) => project.featured);
  const projectRoutes = featuredProjects.map((project) => ({
    url: `${baseUrl}/projects/${project.name.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(project.dateCreated),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...routes, ...projectRoutes];
}

