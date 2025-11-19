'use client';

import { usePathname } from 'next/navigation';

export default function Background() {
  const pathname = usePathname();
  const isProjectDetails = pathname?.startsWith("/projects/") && pathname !== "/projects";

  if (isProjectDetails) {
    return null;
  }

  return (
    <div className="fixed mx-auto inset-0 -z-10 bg-background" />
  );
}
