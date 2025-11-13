"use client";

import { motion } from "framer-motion";
import RotatingText from "../ui/RotatingText";
import Skills from "./skills";
import PixelTransition from "../ui/PixelTransition";
import Image from "next/image";
import Link from "next/link";
import { socialLinks } from "@/data/social";

export default function HeroSection() {
  const roles = [
    "A Full Stack Developer",
    "A Frontend Expert",
    "A Website Designer",
  ];

  return (
    <section className="min-h-screen max-w-3xl mx-auto flex items-center justify-center py-20">
      <div className="w-full pt-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <div className="flex items-start gap-6 lg:gap-8">
            <div className="flex-1">
              <h1 className="text-3xl md:text-6xl font-bold text-foreground">
                Hi,
                <br /> Vranda Garg
              </h1>

              <div className="text-xl flex gap-2 md:text-4xl font-semibold text-neutral-700 mt-4">
                <span>I&apos;m </span>
                <RotatingText
                  texts={roles}
                  rotationInterval={3000}
                  staggerDuration={0.015}
                  transition={{ type: "spring", damping: 20, stiffness: 200 }}
                  className="text-neutral-700"
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="shrink-0"
            >
              <div className="w-32 h-32 md:w-40 md:h-40">
                <PixelTransition
                  firstContent={
                    <Image
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
                      alt="Vranda Garg"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  }
                  secondContent={
                    <div className="w-full h-full flex items-center justify-center bg-neutral-100">
                      <p className="text-xl font-bold text-foreground">
                        Let&apos;s <br /> Connect!
                      </p>
                    </div>
                  }
                  gridSize={12}
                  pixelColor="var(--foreground)"
                  once={false}
                  animationStepDuration={0.4}
                  aspectRatio="100%"
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="space-y-3"
          >
            <p className="text-base md:text-lg text-justify text-neutral-600 leading-relaxed">
              I&apos;m a Full Stack Developer with a passion for creating
              beautiful, responsive, and user-friendly web experiences. I
              specialize in building modern web applications that combine
              stunning design with seamless functionality. With expertise in{" "}
              <span className="text-foreground font-semibold">Next.js</span>,{" "}
              <span className="text-foreground font-semibold">TypeScript</span>,
              and <span className="text-foreground font-semibold">React</span>,
              I craft scalable and performant solutions. My backend experience
              spans{" "}
              <span className="text-foreground font-semibold">Firebase</span>{" "}
              and{" "}
              <span className="text-foreground font-semibold">Appwrite</span>,
              enabling me to build full-stack applications with real-time
              capabilities, authentication, and database management.
            </p>

            <p className="text-sm md:text-base text-neutral-600 leading-relaxed"></p>

            <p className="text-sm md:text-base text-neutral-600 leading-relaxed">
              I focus on delivering pixel-perfect interfaces with smooth
              animations using{" "}
              <span className="text-foreground font-semibold">
                Framer Motion
              </span>{" "}
              and modern CSS frameworks. Every project I work on prioritizes
              user experience, accessibility, and clean, maintainable code.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
            className="flex items-center gap-4 pt-4"
          >
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: 0.5 + index * 0.1,
                  }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all duration-200 group"
                    aria-label={link.title}
                  >
                    <Icon className="w-5 h-5 text-neutral-600 group-hover:text-foreground transition-colors duration-200" />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <Skills />
      </div>
    </section>
  );
}
