"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TerminalProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Terminal({ className, children, ...props }: TerminalProps) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center border-b bg-muted/50 px-4 py-2">
        <div className="flex space-x-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
      </div>
      <div className="p-4 font-mono text-sm text-white">{children}</div>
    </div>
  );
}

interface AnimatedSpanProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export function AnimatedSpan({
  children,
  delay = 0,
  className,
  ...props
}: AnimatedSpanProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!isVisible) return null;

  return (
    <div className={cn("mb-2", className)} {...props}>
      {children}
    </div>
  );
}

interface TypingAnimationProps extends React.HTMLAttributes<HTMLDivElement> {
  delay?: number;
}

export function TypingAnimation({
  children,
  delay = 0,
  className,
  ...props
}: TypingAnimationProps) {
  const [displayText, setDisplayText] = React.useState("");
  const text = React.useMemo(
    () => (typeof children === "string" ? children : ""),
    [children]
  );

  React.useEffect(() => {
    let currentIndex = 0;
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(intervalId);
        }
      }, 50);

      return () => clearInterval(intervalId);
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [text, delay]);

  return (
    <div className={cn("mb-2", className)} {...props}>
      {displayText}
    </div>
  );
}
