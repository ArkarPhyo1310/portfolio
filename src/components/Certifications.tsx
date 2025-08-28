import { certifications } from "@/data/certificate";
import { coreSkills } from "@/data/skill";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Medal } from "lucide-react";
import { motion } from "motion/react";
import CertificateCard from "./CertificateCard";

const Certifications = () => {
  const { ref, isInView, slideInFromLeft, slideInFromRight } =
    useScrollAnimation();

  return (
    <section
      ref={ref}
      id="certifications"
      className="min-h-screen py-20 bg-accent/20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div className="flex items-center justify-center mb-4">
            <motion.span
              variants={slideInFromLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Medal className="w-8 h-8 text-primary mr-3" />
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl"
              variants={slideInFromRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Certifications & Achievements
            </motion.h2>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional credentials and recognition that validates my expertise
          </p>
        </div>

        <div className="mb-16">
          <h3
            className={`text-2xl mb-8 text-center transition-all duration-600 delay-150 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4"
            }`}
          >
            Professional Certifications
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {certifications.map((cert, index) => (
              <CertificateCard cert={cert} key={index} />
            ))}
          </div>
        </div>

        <div
          className={`text-center transition-all duration-700 delay-300 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-2xl mb-8">Core Competencies</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreSkills.map((skill, index) => (
              <div
                key={index}
                className="text-center transition-all duration-700"
                style={{ transitionDelay: `${300 + index * 75}ms` }}
              >
                <div className="mb-2">
                  <span className="text-sm">{skill.name}</span>
                </div>
                <div className="w-full bg-accent rounded-full h-3 mb-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-primary to-primary/80 h-3 rounded-full relative transition-all duration-1000 ease-out"
                    style={{ width: isInView ? `${skill.level}%` : "0%" }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse" />
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">
                  {skill.level}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Certifications;
