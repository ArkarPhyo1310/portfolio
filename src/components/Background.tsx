import { useTheme } from "@/hooks/useTheme";
import { useCallback, useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  color: string;
  connections: number[];
}

interface MousePosition {
  x: number;
  y: number;
}

const Background = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<MousePosition>({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);
  const { theme } = useTheme();

  const CONNECTION_DISTANCE = 120;
  const CONNECTION_DISTANCE_SQ = CONNECTION_DISTANCE * CONNECTION_DISTANCE;
  const MOUSE_RADIUS = 150;

  // helpers: adaptive particle count based on viewport
  const getParticleCount = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1200;
    if (w < 640) return 24; // small screens
    if (w < 1280) return 48; // medium
    return 80; // large
  };

  const getThemeColors = useCallback(() => {
    if (theme === "dark") {
      return {
        particles: [
          "rgba(255, 255, 255, 0)",
          "rgba(96, 165, 250, 0.7)", // Blue
          "rgba(139, 92, 246, 0.6)", // Purple
          "rgba(34, 197, 94, 0.5)", // Green
        ],
        connections: "rgba(255, 255, 255, 0.15)",
        glow: "rgba(96, 165, 250, 0.3)",
      };
    } else {
      return {
        particles: [
          "rgba(0, 0, 0, 0)",
          "rgba(59, 130, 246, 0.7)", // Blue
          "rgba(168, 85, 247, 0.6)", // Purple
          "rgba(34, 197, 94, 0.5)", // Green
        ],
        connections: "rgba(15, 23, 42, 0.1)",
        glow: "rgba(59, 130, 246, 0.2)",
      };
    }
  }, [theme]);

  const createParticle = useCallback(
    (width: number, height: number): Particle => {
      const colors = getThemeColors().particles;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        connections: [],
      };
    },
    [getThemeColors]
  );

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const count = getParticleCount();
    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      particles.push(createParticle(canvas.width, canvas.height));
    }
    particlesRef.current = particles;
  }, [createParticle]);

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // increment frame counter for background tasks
    frameCounterRef.current ||= 0;
    frameCounterRef.current += 1;

    particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Boundary checks with wrapping
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Mouse interaction
      const dx = mouse.x - particle.x;
      const dy = mouse.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < MOUSE_RADIUS) {
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        const angle = Math.atan2(dy, dx);
        particle.vx -= Math.cos(angle) * force * 0.01;
        particle.vy -= Math.sin(angle) * force * 0.01;
        particle.opacity = Math.min(1, particle.opacity + force * 0.02);
        particle.size = Math.min(6, particle.size + force * 2);
      } else {
        // Return to normal
        particle.opacity = Math.max(0.2, particle.opacity - 0.01);
        particle.size = Math.max(1, particle.size - 0.05);
        // Add some friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;
      }

      // Find connections (compute every N frames to reduce CPU)
      if (frameCounterRef.current % 3 === 0) {
        particle.connections = [];
        for (let j = index + 1; j < particles.length; j++) {
          const other = particles[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECTION_DISTANCE_SQ) {
            particle.connections.push(j);
          }
        }
      }
    });
  }, [CONNECTION_DISTANCE_SQ]);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles = particlesRef.current;
    const colors = getThemeColors();

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    ctx.strokeStyle = colors.connections;
    ctx.lineWidth = 1;
    particles.forEach((particle) => {
      particle.connections.forEach((connectionIndex) => {
        const connected = particles[connectionIndex];
        const dx = particle.x - connected.x;
        const dy = particle.y - connected.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const opacity = 1 - dist / CONNECTION_DISTANCE;

        ctx.globalAlpha = opacity * 0.5;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(connected.x, connected.y);
        ctx.stroke();
      });
    });

    // Draw particles (use shadowBlur for glow instead of per-particle radial gradients)
    particles.forEach((particle) => {
      ctx.globalAlpha = particle.opacity;

      // Glow via shadow (cheaper than radial gradients)
      ctx.save();
      ctx.fillStyle = particle.color;
      ctx.shadowBlur = Math.max(6, particle.size * 6);
      ctx.shadowColor = colors.glow;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size * 2.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Draw particle core
      ctx.fillStyle = particle.color;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Reset alpha
    ctx.globalAlpha = 1;
  }, [getThemeColors]);

  const animate = useCallback(() => {
    // respect reduced motion or visibility
    if (reducedMotionRef.current || document.hidden) {
      // schedule a low-frequency update when reduced-motion or hidden
      animationFrameRef.current = requestAnimationFrame(() => {
        // still update positions slowly to avoid sudden jumps
        updateParticles();
        drawParticles();
        setTimeout(() => requestAnimationFrame(animate), 200);
      });
      return;
    }

    updateParticles();
    drawParticles();
    animationFrameRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }, [initParticles]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // rAF-throttled mouse update
    latestMouseRef.current = { x: e.clientX, y: e.clientY };
    if (!mousePendingRef.current) {
      mousePendingRef.current = true;
      requestAnimationFrame(() => {
        mouseRef.current = latestMouseRef.current || mouseRef.current;
        mousePendingRef.current = false;
      });
    }
  }, []);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length > 0) {
      mouseRef.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    initParticles();

    // Start animation
    animate();

    // Add event listeners
    let resizePending = false;
    const onResize = () => {
      if (!resizePending) {
        resizePending = true;
        requestAnimationFrame(() => {
          handleResize();
          resizePending = false;
        });
      }
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    const onVisibility = () => {
      if (document.hidden) {
        // cancel to reduce CPU when tab hidden
        if (animationFrameRef.current)
          cancelAnimationFrame(animationFrameRef.current);
      } else {
        // resume
        animate();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [animate, handleResize, handleMouseMove, handleTouchMove, initParticles]);

  // Re-initialize particles when theme changes
  useEffect(() => {
    const particles = particlesRef.current;
    const colors = getThemeColors().particles;
    particles.forEach((particle) => {
      particle.color = colors[Math.floor(Math.random() * colors.length)];
    });
  }, [theme, getThemeColors]);

  // refs used for optimizations
  const latestMouseRef = useRef<MousePosition | null>(null);
  const mousePendingRef = useRef(false);
  const frameCounterRef = useRef<number>(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    // detect reduced motion preference
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mq.matches;
    const listener: (this: MediaQueryList, e: MediaQueryListEvent) => void =
      function (e) {
        reducedMotionRef.current = e.matches;
      };
    if (mq.addEventListener) mq.addEventListener("change", listener);
    else
      mq.addListener(listener as unknown as (ev?: MediaQueryListEvent) => void);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", listener);
      else
        mq.removeListener(
          listener as unknown as (ev?: MediaQueryListEvent) => void
        );
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 gpu-accelerated"
      style={{
        background: "transparent",
        mixBlendMode: theme === "dark" ? "screen" : "multiply",
        transition: "mix-blend-mode 0.3s ease",
      }}
    />
  );
};

export default Background;
