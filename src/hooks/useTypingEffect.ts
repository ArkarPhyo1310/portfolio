import { useState, useEffect, useRef, useCallback } from "react";

interface UseTypingEffectOptions {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  startDelay?: number;
}

export function useTypingEffect({
  texts,
  typeSpeed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  startDelay = 0,
}: UseTypingEffectOptions) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitialized = useRef(false);

  const clearCurrentTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const runTypingEffect = useCallback(() => {
    if (isComplete || texts.length === 0 || !isStarted) return;

    clearCurrentTimeout();

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
    isStarted,
    texts,
    typeSpeed,
    deleteSpeed,
    pauseDuration,
    loop,
    clearCurrentTimeout,
  ]);

  // Initialize the effect
  useEffect(() => {
    if (!isInitialized.current && texts.length > 0) {
      isInitialized.current = true;

      if (startDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          setIsStarted(true);
        }, startDelay);
      } else {
        setIsStarted(true);
      }
    }

    return () => {
      clearCurrentTimeout();
    };
  }, [texts, startDelay, clearCurrentTimeout]);

  // Run the typing effect
  useEffect(() => {
    runTypingEffect();
  }, [runTypingEffect]);

  const reset = useCallback(() => {
    clearCurrentTimeout();
    setCurrentTextIndex(0);
    setCurrentText("");
    setIsDeleting(false);
    setIsComplete(false);
    setIsStarted(true);
  }, [clearCurrentTimeout]);

  const pause = useCallback(() => {
    clearCurrentTimeout();
  }, [clearCurrentTimeout]);

  const resume = useCallback(() => {
    if (!isComplete) {
      runTypingEffect();
    }
  }, [runTypingEffect, isComplete]);

  return {
    currentText,
    isComplete,
    isDeleting,
    reset,
    pause,
    resume,
  };
}
