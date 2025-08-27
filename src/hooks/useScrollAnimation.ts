import { useRef, useMemo } from "react";
import { useInView } from "motion/react";

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-20% 0px -20% 0px",
  });

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.15,
          delayChildren: 0.1,
        },
      },
    }),
    []
  );

  const itemVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 0.6,
        },
      },
    }),
    []
  );

  const slideUpVariants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y: 30,
      },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          stiffness: 120,
          damping: 20,
          duration: 0.8,
        },
      },
    }),
    []
  );

  const slideInFromLeft = useMemo(
    () => ({
      hidden: { opacity: 0, x: -50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        },
      },
    }),
    []
  );

  const slideInFromRight = useMemo(
    () => ({
      hidden: { opacity: 0, x: 50 },
      visible: {
        opacity: 1,
        x: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        },
      },
    }),
    []
  );

  const scaleInVariants = useMemo(
    () => ({
      hidden: { opacity: 0, scale: 0.8, rotateY: -15 },
      visible: {
        opacity: 1,
        scale: 1,
        rotateY: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 15,
          duration: 1,
        },
      },
    }),
    []
  );

  const progressVariants = useMemo(
    () => ({
      hidden: { width: "0%" },
      visible: (level: number) => ({
        width: `${level}%`,
        transition: { duration: 1.5, delay: 0.5, ease: "easeOut" },
      }),
    }),
    []
  );

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants,
    slideUpVariants,
    slideInFromLeft,
    slideInFromRight,
    scaleInVariants,
    progressVariants,
  };
}
