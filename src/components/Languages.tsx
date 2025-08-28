import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Globe } from "lucide-react";
import { motion } from "motion/react";
import LanguageCard from "./LanguageCard";
import { langPoints, languages } from "@/data/language";

const Languages = () => {
  const {
    ref,
    isInView,
    slideInFromLeft,
    slideInFromRight,
    containerVariants,
  } = useScrollAnimation();

  return (
    <section
      ref={ref}
      id="languages"
      className="min-h-screen py-20 bg-accent/30 overflow-hidden"
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
              <Globe className="w-8 h-8 text-primary mr-3" />
            </motion.span>

            <motion.h2
              className="text-3xl md:text-4xl"
              variants={slideInFromRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              Language Proficiency
            </motion.h2>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Certified multilingual abilities enabling effective communication
            across cultures.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 gap-8 mb-8"
        >
          {languages.map((lang, index) => (
            <LanguageCard lang={lang} key={index} />
          ))}
        </motion.div>

        <motion.div
          className="text-center bg-background rounded-xl border border-border shadow-sm p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-xl mb-4">Language Learning Journey</h3>
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
            My multilingual journey began with English proficiency for
            international collaboration, followed by Japanese to deepen cultural
            understanding and expand business opportunities in the Asia-Pacific
            region. These language skills enable me to work effectively with
            diverse, global teams and communicate complex technical concepts
            across cultural boundaries.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {langPoints.map((point, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className={`flex items-center justify-center mx-auto mb-3 text-white text-2xl w-16 h-16 rounded-full bg-gradient-to-r ${point.color}`}
                >
                  {point.icon}
                </div>
                <h2 className="text-sm mb-2">{point.title}</h2>
                <p className="text-xs text-muted-foreground">
                  {point.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Languages;
