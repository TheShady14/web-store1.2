"use client";

import type React from "react";
import { useEffect, useRef } from "react";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  size?: number;
  delay?: number;
  activeOnHover?: boolean;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = "",
  duration = 1,
  size = 100,
  delay = 0.1,
  activeOnHover = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mousePosition = useMousePosition();
  const mousePositionRef = useRef(mousePosition);

  useEffect(() => {
    mousePositionRef.current = mousePosition;
  }, [mousePosition]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = () => {
      clearTimeout(timeoutId);
      container.style.setProperty("--x", mousePositionRef.current.x + "px");
      container.style.setProperty("--y", mousePositionRef.current.y + "px");
      container.style.setProperty("--size", size + "px");
      container.style.setProperty("--animation-duration", duration + "s");
      container.style.setProperty("--animation-delay", delay + "s");
      container.classList.add("beam-fade-in");

      timeoutId = setTimeout(() => {
        container.classList.remove("beam-fade-in");
      }, (duration + delay) * 1000);
    };

    if (activeOnHover) {
      container.addEventListener("mousemove", handleMouseMove);
    } else {
      handleMouseMove();
    }

    return () => {
      if (activeOnHover) {
        container.removeEventListener("mousemove", handleMouseMove);
      }
      clearTimeout(timeoutId);
    };
  }, [duration, size, delay, activeOnHover]);

  return (
    <div
      ref={containerRef}
      className={`border-beam ${className}`}
      style={
        {
          "--size": size + "px",
          "--animation-duration": duration + "s",
          "--animation-delay": delay + "s",
        } as React.CSSProperties
      }
    />
  );
};
