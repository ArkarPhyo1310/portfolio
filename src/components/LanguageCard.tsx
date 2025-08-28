import { getProficiencyLevel } from "@/data/language";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import type { LanguageProps } from "@/types/default";
import { Award, Calendar, Star } from "lucide-react";
import { motion } from "motion/react";

const LanguageCard = ({ lang }: { lang: LanguageProps }) => {
  const { ref, isInView, itemVariants } = useScrollAnimation();

  const calProficienty = (lang: LanguageProps) => {
    return Number((lang.score / lang.totalScore) * 100).toFixed();
  };

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className="relative bg-background rounded-xl overflow-hidden shadow-lg border border-border group"
      whileHover={{
        y: -10,
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        transition: { duration: 0.3 },
      }}
    >
      <div className="bg-accent-foreground p-1">
        <div className="bg-background rounded-xl p-8 pt-1">
          {/* Language Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="absolute -top-3 -left-0 z-10 w-[60px] bg-accent-foreground text-background text-3xl text-center rounded-br-xl py-3 px-3">
              <motion.p
                animate={{ rotate: [-10, 10] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                {lang.flag}
              </motion.p>
            </div>
            <div className="flex items-center justify-between space-x-4">
              <div className="w-[30px]"></div>
              <h2 className="text-2xl mb-1">
                {lang.language} [ {lang.level} ]
              </h2>
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  getProficiencyLevel(Number(calProficienty(lang))).color
                } bg-primary/10`}
              >
                {getProficiencyLevel(Number(calProficienty(lang))).label}
              </span>
            </div>
          </div>

          {/* Progres bar */}
          <div className="mb-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm italic">Proficiency Level</span>
              <span className="text-sm text-primary ">
                {calProficienty(lang)} %
              </span>
            </div>
            <div className="w-full bg-accent rounded-full h-4 overflow-hidden">
              <motion.div
                className={`bg-gradient-to-r ${lang.color} h-4 rounded-full relative`}
                initial={{ width: "0%" }}
                animate={
                  isInView
                    ? { width: `${calProficienty(lang)}%` }
                    : { width: "0%" }
                }
                transition={{
                  duration: 2,
                  delay: 0.5 + 0.2,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-full"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                  }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
              </motion.div>
            </div>
          </div>

          {/* Certificate Info */}
          <div className="bg-accent/20 rounded-lg p-4 mb-2">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-primary" />
                <div>
                  <h4 className="text-sm font-medium">{lang.certificate}</h4>
                  <p className="text-xs text-muted-foreground">{lang.issuer}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg text-primary">
                  {lang.score} / {lang.totalScore}
                </div>
                <div className="text-xs text-muted-foreground">Score</div>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Issued: {lang.date}</span>
              </div>

              <div className="mt-2 text-xs text-muted-foreground">
                ID: {lang.credentialId}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
            {lang.description}
          </p>

          {/* Skills */}
          <div className="mb-6">
            <h5 className="text-sm mb-3 flex items-center">
              <Star className="w-4 h-4 mr-2 text-primary" />
              Core Competencies
            </h5>
            <div className="flex flex-wrap gap-2">
              {lang.skills.map((skill, skillIndex) => (
                <motion.span
                  key={skillIndex}
                  className="px-3 py-1 bg-accent text-accent-foreground rounded-full text-xs"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={
                    isInView
                      ? { opacity: 1, scale: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ delay: 0.6 + skillIndex * 0.05 }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "var(--primary)",
                    color: "var(--primary-foreground)",
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h5 className="text-sm mb-3 flex items-center">
              <Award className="w-4 h-4 mr-2 text-primary" />
              Key Achievements
            </h5>
            <div className="space-y-2">
              {lang.achievements.map((achievement, achIndex) => (
                <motion.div
                  key={achIndex}
                  className="flex items-center space-x-2 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.8 + achIndex * 0.1 }}
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>{achievement}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LanguageCard;
