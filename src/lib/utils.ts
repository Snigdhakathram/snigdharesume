import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOptimizedMediaUrl(url: string | undefined, type: "image" | "video" = "image") {
  if (!url) return "";
  if (!url.includes("res.cloudinary.com")) return url;
  
  // Check if already optimized to avoid duplication
  if (url.includes("f_auto") || url.includes("q_auto")) return url;

  const transformation = type === "video" ? "f_auto:video,q_auto" : "f_auto,q_auto";
  
  // Insert transformations after /upload/
  // Handle case where other transformations might exist or not
  if (url.includes("/upload/")) {
    return url.replace("/upload/", `/upload/${transformation}/`);
  }
  
  return url;
}
