import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "motion/react";
import React from "react";

interface TypingEffectProps {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
  cursorClassName?: string;
  loop?: boolean;
}

function TypingEffect({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  className = "",
  cursorClassName = "",
  loop = true,
}: TypingEffectProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialized = useRef(false);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const runTypingEffect = useCallback(() => {
    if (isComplete || texts.length === 0) return;

    const currentFullText = texts[currentTextIndex];

    if (!isDeleting) {
      // Typing
      if (currentText.length < currentFullText.length) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentFullText.slice(0, currentText.length + 1));
        }, typeSpeed);
      } else {
        // Finished typing, start pause before deleting
        if (loop || currentTextIndex < texts.length - 1) {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, pauseDuration);
        } else {
          setIsComplete(true);
        }
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        timeoutRef.current = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, deleteSpeed);
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        if (loop) {
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        } else if (currentTextIndex < texts.length - 1) {
          setCurrentTextIndex((prev) => prev + 1);
        }
      }
    }
  }, [
    currentText,
    currentTextIndex,
    isDeleting,
    isComplete,
    texts,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    loop,
  ]);

  useEffect(() => {
    // Initialize with first character immediately
    if (!isInitialized.current && texts.length > 0) {
      isInitialized.current = true;
      setCurrentText("");
    }

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    runTypingEffect();
  }, [runTypingEffect]);

  return (
    <span className={className}>
      {currentText}
      <motion.span
        className={`inline-block font-bold ${cursorClassName}`}
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        _
      </motion.span>
    </span>
  );
}

// Memoize the component to prevent unnecessary re-renders
export const TypingEffectMemo = React.memo(
  TypingEffect,
  (prevProps, nextProps) => {
    // Only re-render if the texts array or other props actually change
    return (
      JSON.stringify(prevProps.texts) === JSON.stringify(nextProps.texts) &&
      prevProps.typeSpeed === nextProps.typeSpeed &&
      prevProps.deleteSpeed === nextProps.deleteSpeed &&
      prevProps.pauseDuration === nextProps.pauseDuration &&
      prevProps.className === nextProps.className &&
      prevProps.cursorClassName === nextProps.cursorClassName &&
      prevProps.loop === nextProps.loop
    );
  }
);

TypingEffectMemo.displayName = "TypingEffect";
