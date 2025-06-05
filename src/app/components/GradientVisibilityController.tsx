"use client";

import { useEffect } from "react";

export default function GradientVisibilityController() {
  useEffect(() => {
    const gradient = document.getElementById("purple-red-gradient");
    const trigger = document.getElementById("gradient-trigger");

    if (!gradient || !trigger) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        gradient.style.opacity = entry.isIntersecting ? "1" : "1";
      },
      { threshold: 0 }
    );

    observer.observe(trigger);

    return () => observer.disconnect();
  }, []);

  return null; // this component controls visibility only
}
