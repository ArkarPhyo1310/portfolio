import { name } from "@/data/about";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { motion } from "motion/react";

const About = () => {
  const { ref, isInView, containerVariants, itemVariants, slideInFromLeft } =
    useScrollAnimation();

  const statsData = [
    { title: "Location", value: "Bangkok, Thailand" },
    { title: "Experience", value: "5+ Years" },
    { title: "Education", value: "B.E. Computer Engineering & IT" },
    { title: "Availability", value: "Open to opportunities" },
  ];

  return (
    <section
      ref={ref}
      id="about"
      className="py-20 bg-background overflow-hidden min-h-screen"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know more about who I am, what I do, and what I'm passionate
            about
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            variants={slideInFromLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <h3 className="text-2xl">Hello! I'm {name}.</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                I'm an AI Engineer with over 5 years of experience in building
                computer vision and full-stack AI systems across industries like
                automotive, retail, and manufacturing. I specialize in designing
                end-to-end pipelines—from model research and optimization to
                scalable deployment on GPU environments.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                My technical expertise spans Python, C++, PyTorch, TensorFlow,
                FastAPI, ROS2, Docker, and Kubernetes. I’ve led projects such as
                multi-camera baggage tracking, blueprint symbol detection,
                real-time person re-identification, and multimodal visual
                understanding systems, always focusing on scalability,
                performance, and real-world impact.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Beyond work, I enjoy exploring robotics, LLMs, DevOps/AIOps
                practices, and contributing to innovative solutions that bridge
                research and production. I'm passionate about leveraging AI to
                create smarter, more efficient technologies for the future.
              </p>
            </div>
          </motion.div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-2 gap-4 pt-6"
          >
            {statsData.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  x: 5,
                  transition: { duration: 0.3 },
                }}
                className="p-4 bg-accent/50 rounded-lg cursor-pointer"
              >
                <h4 className="mb-2">{stat.title}</h4>
                <p className="text-muted-foreground">{stat.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 text-center space-y-6 italic font-bold"
        >
          <p className="text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            I enjoy hiking, photography, and exploring new technologies. I
            believe in writing clean, maintainable code, fostering teamwork, and
            creating AI solutions that have real-world impact.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
