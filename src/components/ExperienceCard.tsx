import { workExperiences } from "@/data/about";
import { Award, Calendar, MapPin } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

const ExperienceCard = ({
  exp,
  index,
}: {
  exp: (typeof workExperiences)[0];
  index: number;
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isItemInView = useInView(itemRef, {
    once: true,
    margin: "-10% 0px -10% 0px",
  });

  return (
    <motion.div
      ref={itemRef}
      className={`relative flex items-center ${
        index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      } flex-col md:gap-8 mb-16`}
      initial={{ opacity: 0, y: 50 }}
      animate={isItemInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      {/* Timeline dot */}
      <motion.div
        className="absolute left-6 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background transform -translate-x-2 md:-translate-x-2 z-20 shadow-sm"
        initial={{ scale: 0 }}
        animate={isItemInView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
      />

      {/* Content card */}
      <motion.div
        className={`w-full md:w-5/12 ml-16 md:ml-0 ${
          index % 2 === 0 ? "md:text-left" : "md:text-left"
        }`}
        initial={{
          opacity: 0,
          x: index % 2 === 0 ? -30 : 30,
        }}
        animate={
          isItemInView
            ? {
                opacity: 1,
                x: 0,
              }
            : {
                opacity: 0,
                x: index % 2 === 0 ? -30 : 30,
              }
        }
        transition={{
          duration: 0.6,
          delay: 0.3 + index * 0.1,
        }}
      >
        <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <img
                src={exp.logo}
                alt={exp.company}
                className="w-30 h-[auto] object-cover bg-black p-3 rounded-2xl"
              />
              <div>
                <h3 className="text-lg">{exp.position}</h3>
                <p className="text-primary">{exp.company}</p>
              </div>
            </div>
            <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              {exp.type}
            </span>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{exp.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{exp.location}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-muted-foreground mb-4 leading-relaxed">
            {exp.description}
          </p>

          {/* Achievements */}
          <div className="mb-4">
            <h4 className="text-sm mb-3 flex items-center space-x-1">
              <Award className="w-4 h-4 text-primary" />
              <span>Key Achievements</span>
            </h4>
            <ul className="space-y-2">
              {exp.achievements.map((achievement, achievementIndex) => (
                <li
                  key={achievementIndex}
                  className="flex items-start space-x-2 text-sm text-muted-foreground"
                >
                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h4 className="text-sm mb-2">Technologies Used</h4>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Spacer for timeline alignment */}
      <div className="hidden md:block w-5/12" />
    </motion.div>
  );
};

export default ExperienceCard;
