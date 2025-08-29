import { contactLinks, name, position } from "@/data/about";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ArrowDown, Download, Github, Linkedin, Mail } from "lucide-react";
import { motion } from "motion/react";
import { useMemo } from "react";
import { TypingEffectMemo } from "./TypingEffect";

const Hero = () => {
  const {
    ref,
    containerVariants,
    itemVariants,
    profileVariants,
    letterVariants,
    socialIconVariants,
    nameVariants,
    socialVariants,
  } = useScrollAnimation();

  const scrollToNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const aboutSection = document.getElementById("about");
    if (aboutSection) aboutSection.scrollIntoView({ behavior: "smooth" });
  };

  const typingConfig = useMemo(
    () => ({
      texts: position,
      typeSpeed: 120,
      deleteSpeed: 80,
      pauseDuration: 2500,
      startDelay: 500,
    }),
    []
  );

  return (
    <section
      ref={ref}
      id="home"
      className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-background to-accent/20"
    >
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div variants={profileVariants} className="mb-8">
            <motion.div
              animate={{
                y: [-5, 5, -5],
              }}
              transition={{
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 2,
              }}
            >
              <img
                src={"/profile.jpg"}
                alt="Profile"
                className="w-32 h-32 rounded-full mx-auto mb-6 object-cover shadow-lg object-center"
              />
            </motion.div>
          </motion.div>
          <motion.h1
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl mb-6"
          >
            Hi, I'm{" "}
            <motion.span
              className="text-primary inline-block"
              variants={nameVariants}
            >
              {name.split("").map((letter, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {letter === " " ? "\u00A0" : letter}
                </motion.span>
              ))}
            </motion.span>
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto"
          >
            A passionate{" "}
            <TypingEffectMemo
              {...typingConfig}
              className="font-bold"
              cursorClassName="text-primary"
            />
            crafting AI solutions
          </motion.p>

          <motion.div
            variants={socialVariants}
            className="flex justify-center space-x-6 mb-12"
          >
            {[
              { href: contactLinks.github, icon: Github },
              { href: contactLinks.linkedIn, icon: Linkedin },
              { href: `mailto:${contactLinks.mail}`, icon: Mail },
            ].map(({ href, icon: Icon }, index) => (
              <motion.a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                variants={socialIconVariants}
                whileHover={{
                  scale: 1.1,
                  rotate: 5,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
                className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <Icon className="h-6 w-6" />
              </motion.a>
            ))}
          </motion.div>
          <motion.div variants={itemVariants} className="flex space-x-4">
            {/* Resume Button */}
            <a href="/Arkar_Phyo.pdf" download>
              <div className="relative group w-[200px] items-center">
                <div className="absolute inset-0 rounded-lg p-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden">
                  <motion.div
                    className="absolute inset-0 w-full h-full"
                    animate={{
                      background: [
                        "conic-gradient(from 0deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e)",
                        "conic-gradient(from 360deg, #ff006e, #8338ec, #3a86ff, #06ffa5, #ffbe0b, #fb5607, #ff006e)",
                      ],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  {/* Inner mask to create border effect */}
                  <div className="absolute inset-[2px] bg-background rounded-[6px]" />
                </div>

                {/* Static border for non-hover state */}
                <div className="absolute inset-0 border-2 border-border group-hover:border-transparent transition-all duration-300 rounded-lg" />

                {/* Button content */}
                <motion.button
                  className="relative w-full h-full bg-background border-2 border-foreground shadow-md group-hover:border-transparent rounded-lg transition-all duration-300 group-hover:bg-secondary/10 px-12 py-4"
                  whileTap={{ scale: 0.8 }}
                >
                  <span className="relative z-10">Resume</span>
                  <Download className="w-5 h-5 inline-block ml-2 relative z-10" />
                </motion.button>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>

      <motion.button
        onClick={scrollToNext}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, delay: 1.5 },
        }}
        whileHover={{ scale: 1.1 }}
        className="absolute bottom-10 left-1/2 animate-bounce transform -translate-x-1/2 p-2 rounded-full border border-border text-muted-foreground transition-colors"
      >
        <ArrowDown className="w-8 h-8 text-primary" />
      </motion.button>
    </section>
  );
};

export default Hero;
