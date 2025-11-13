"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";

export default function Skills() {
  return (
    <section className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-12 text-left">
          Skills
        </h2>

        <div className="space-y-10">
          {Object.entries(skillsData).map(
            ([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-600 mb-4">
                  {category}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.3,
                          delay: categoryIndex * 0.1 + index * 0.05,
                        }}
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-neutral-100 border border-neutral-300/50 hover:border-neutral-400/80 transition-all duration-200"
                      >
                        <Icon className="text-lg text-foreground" />
                        <span className="text-sm md:text-base font-medium text-foreground">
                          {skill.name}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
