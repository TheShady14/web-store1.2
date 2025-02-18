"use client";

import type React from "react";
import { useRef, useEffect } from "react";
import { useMousePosition } from "@/lib/hooks/use-mouse-position";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export const Particles: React.FC<ParticlesProps> = ({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mousePosition = useMousePosition();
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, []);

  useEffect(() => {
    onMouseMove();
  }, []); // Removed mousePosition from dependencies

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const { w, h } = canvasSize.current;
      const x = mousePosition.x - rect.left - w / 2;
      const y = mousePosition.y - rect.top - h / 2;
      const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
      if (inside) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const drawParticles = () => {
    for (let i = 0; i < quantity; i++) {
      const x = Math.random() * canvasSize.current.w;
      const y = Math.random() * canvasSize.current.h;
      const radius = Math.random() * 1.5 + 0.5;
      circles.current.push({ x, y, radius, originalX: x, originalY: y });
    }
  };

  const animate = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
      circles.current.forEach((circle, i) => {
        const { x, y, radius, originalX, originalY } = circle;
        const dx = (mouse.current.x - x) / staticity;
        const dy = (mouse.current.y - y) / staticity;
        const distanceFromMouse = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 100;
        const force = (maxDistance - distanceFromMouse) / maxDistance;
        const accelerationX = dx * force;
        const accelerationY = dy * force;
        const newX = x + accelerationX;
        const newY = y + accelerationY;
        const distanceFromOriginal = Math.sqrt(
          (newX - originalX) * (newX - originalX) +
            (newY - originalY) * (newY - originalY)
        );
        const easeDistance = distanceFromOriginal / ease;
        const easedX = originalX + (newX - originalX) / easeDistance;
        const easedY = originalY + (newY - originalY) / easeDistance;

        context.current.beginPath();
        context.current.arc(easedX, easedY, radius, 0, 2 * Math.PI);
        context.current.fillStyle = "rgba(255, 255, 255, 0.8)";
        context.current.fill();

        circles.current[i] = { ...circle, x: easedX, y: easedY };
      });
    }
    requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
};
