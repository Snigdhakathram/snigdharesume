"use client";

import React from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import RotatingText from "../ui/RotatingText";
import Skills from "./skills";
import Projects from "./projects";
import PixelTransition from "../ui/PixelTransition";
import Image from "next/image";
import Link from "next/link";
import { socialLinks, type SocialLink } from "@/data/social";

function SocialIconWithTooltip({
  link,
  index,
}: {
  link: SocialLink;
  index: number;
}) {
  const Icon = link.icon;
  const [isHovered, setIsHovered] = React.useState(false);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const target = event.currentTarget;
    const halfWidth = target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        delay: 0.5 + index * 0.1,
      }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.95 }}>
        <Link
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-10 h-10 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center transition-all duration-200 group"
          aria-label={link.title}
          onMouseMove={handleMouseMove}
        >
          <Icon className="w-5 h-5 text-neutral-600 group-hover:text-foreground transition-colors duration-200" />
        </Link>
      </motion.div>
      <AnimatePresence mode="popLayout">
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.6 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 260,
                damping: 10,
              },
            }}
            exit={{ opacity: 0, y: 20, scale: 0.6 }}
            style={{
              translateX: translateX,
              rotate: rotate,
              whiteSpace: "nowrap",
            }}
            className="absolute -top-12 left-1/2 -translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-foreground z-50 shadow-xl px-4 py-1.5"
          >
            <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent h-px" />
            <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px" />
            <div className="font-bold text-background relative z-30 text-sm">
              {link.title}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

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

              <div className="text-xl flex items-center gap-2 md:text-4xl font-semibold text-neutral-700 mt-4">
                <span>I&apos;m </span>
                <RotatingText
                  texts={roles}
                  rotationInterval={3000}
                  staggerDuration={0.015}
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  mainClassName="px-3 bg-gradient-to-tl from-neutral-200 to-neutral-300 text-foreground overflow-hidden py-2 justify-center rounded-lg"
                  splitLevelClassName="overflow-hidden pb-1"
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
                      src="https://res.cloudinary.com/dyetf2h9n/image/upload/v1763065667/032c0f5b-f53e-4c4f-be53-d5697d0872a0_oczzk2.png"
                      alt="Vranda Garg"
                      width={400}
                      height={400}
                      className="w-full bg-gradient-to-tl from-neutral-700 to-neutral-800 h-full object-cover"
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

            <p className="text-base md:text-lg text-justify text-neutral-600 leading-relaxed">
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
            className="flex flex-col  items-start sm:items-start gap-4 pt-4"
          >
            <div className="flex gap-3">
              <Link
                href="#contact"
                className="group relative inline-flex h-12 items-center outline-1 outline-neutral-50 justify-center overflow-hidden rounded-lg border-1 border-neutral-300 font-medium"
              >
                <div className="inline-flex h-12 translate-x-0 items-center justify-center bg-gradient-to-r from-neutral-100 to-neutral-200 px-6 text-foreground transition group-hover:-translate-x-[150%]">
                  Contact
                </div>
                <div className="absolute inline-flex h-12 w-full translate-x-full items-center justify-center bg-foreground px-6 text-background transition duration-300 group-hover:translate-x-0">
                  Contact
                </div>
              </Link>
              <Link
                href="https://vrandagarg.in/VrandaGargResume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex h-12 items-center outline-1 outline-neutral-50 justify-center overflow-hidden rounded-lg border-1 border-neutral-300 font-medium"
              >
                <div className="inline-flex h-12 translate-x-0 items-center justify-center bg-gradient-to-r from-neutral-100 to-neutral-200 px-6 text-foreground transition group-hover:-translate-x-[150%]">
                  Resume
                </div>
                <div className="absolute inline-flex h-12 w-full translate-x-full items-center justify-center bg-foreground px-6 text-background transition duration-300 group-hover:translate-x-0">
                  Resume
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              {socialLinks.map((link, index) => (
                <SocialIconWithTooltip
                  key={link.title}
                  link={link}
                  index={index}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <Skills />
        <Projects limit={2} />
      </div>
    </section>
  );
}
