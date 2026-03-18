import type { Metadata } from "next";
import Link from "next/link";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Snigdha Kathram",
  description:
    "The page you're looking for doesn't exist. Return to Snigdha Kathram's portfolio to explore projects and skills.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <section className="min-h-screen max-w-4xl mx-auto flex items-center justify-center px-6">
      <div className="w-full  relative">
        <div className="min-h-[70vh] flex flex-col items-center justify-center text-center py-16">
          <h1 className="text-6xl md:text-8xl font-serif font-bold text-neutral-600">
            404
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-neutral-500">
            Page not found
          </p>
          <p className="mt-2 text-neutral-500 max-w-md px-4">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-8 px-6 py-3 bg-neutral-800 hover:bg-neutral-700 text-background rounded-lg font-medium transition-colors"
          >
            Back to Home
          </Link>
        </div>

        {/* <div className="border-t border-neutral-200 relative">
          <Plus className="absolute -top-3 -left-3 h-6 w-6 text-neutral-400 z-20" />
          <Plus className="absolute -top-3 -right-3 h-6 w-6 text-neutral-400 z-20" />
        </div> */}
      </div>
    </section>
  );
}
