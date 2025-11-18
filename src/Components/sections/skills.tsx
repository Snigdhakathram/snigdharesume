"use client";

import { motion } from "framer-motion";
import { skillsData } from "@/data/skills";
import SkillCard from "@/Components/ui/SkillCard";

export default function Skills() {
  return (
    <section className="py-16  ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-4xl font-bold text-foreground mb-8 text-left">
          Skills
        </h2>

        <div className="space-y-8">
          {Object.entries(skillsData).map(
            ([category, skills], categoryIndex) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              >
                <h3 className="text-xl md:text-2xl  text-neutral-600 mb-4">
                  {category}
                </h3>

                <div className="flex flex-wrap gap-3">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.1 + index * 0.05,
                      }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <SkillCard
                        name={skill.name}
                        icon={skill.icon}
                        className="border-neutral-300/50 hover:border-neutral-400/80 transition-all duration-200"
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </div>
      </motion.div>
    </section>
  );
}
