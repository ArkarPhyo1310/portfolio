import { workExperiences } from "@/data/about";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ExperienceCard from "./ExperienceCard";

const Experiences = () => {
  const { ref, isInView, containerVariants, itemVariants } =
    useScrollAnimation();
  const timelineRef = useRef<HTMLDivElement>(null);

  // Scroll progress for timeline animation
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.3", "end 0.7"],
  });

  // Transform scroll progress to height percentage
  const timelineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      id="experience"
      className="min-h-screen py-20 bg-accent/50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl mb-4">Professional Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My journey through the tech industry, showcasing growth, impact, and
            achievements
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 transform md:-translate-x-0.5">
            {/* Background line */}
            <div className="w-full h-full bg-border" />

            {/* Animated progress line */}
            <motion.div
              className="absolute top-0 left-0 w-full bg-primary"
              style={{ height: timelineHeight }}
              initial={{ height: "0%" }}
            />
          </div>

          {/* Experience items */}
          <div className="space-y-0">
            {workExperiences.map((exp, index) => (
              <ExperienceCard key={index} exp={exp} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
