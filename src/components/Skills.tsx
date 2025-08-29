import { skills } from "@/data/skill";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useState } from "react";

const Skills = () => {
  const { ref, isInView, containerVariants, itemVariants, slideInFromRight } =
    useScrollAnimation();

  const categories = [
    "All",
    "Programming Languages",
    "Frameworks & Libraries",
    "Databases",
    "DevOps & Cloud",
    "Tools",
  ];

  const [activeCategory, setActiveCategory] = useState("All");

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "All" || skill.category === activeCategory
  );

  return (
    <section
      ref={ref}
      id="skills"
      className="min-h-screen py-20 bg-accent/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="container mx-auto max-w-5xl"
        >
          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            variants={slideInFromRight}
          >
            {categories.map((category, key) => (
              <button
                key={key}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/70 text-forefround hover:bd-secondary"
                )}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredSkills.map((skill, key) => (
              <motion.div
                key={key}
                className="flex flex-row items-center justify-between bg-card p-4 rounded-lg shadow-xs card-hover border border-foreground"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  isInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  opacity: { delay: 0.6 + key * 0.05, duration: 0.4 },
                  scale: { delay: 0.6 + key * 0.05, duration: 0.4 },
                }}
              >
                <h3 className={`font-semibold text-lg text-[${skill.color}]`}>
                  {skill.name}
                </h3>
                <img src={skill.logo} className={`w-12 h-12`} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
