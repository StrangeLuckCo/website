"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollHandlerProps {
  introDone: boolean;
}

export default function ScrollHandler({ introDone }: ScrollHandlerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams?.get("scrollTo");
    if (!introDone || !scrollTo) return;

    const container = document.querySelector(".container-main");

    let attempts = 0;
    const maxAttempts = 50;

    const tryScroll = () => {
      const el = document.getElementById(scrollTo);
      if (!container || !el) {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 50);
        }
        return;
      }

      ScrollTrigger.getAll().forEach((trigger) => trigger.disable());

      container.scrollTo({
        top: el.offsetTop,
        behavior: "smooth",
      });

      setTimeout(() => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.enable());
        window.history.replaceState({}, "", "/");
      }, 800);
    };

    requestAnimationFrame(() => {
      setTimeout(tryScroll, 100);
    });
  }, [introDone, searchParams]);

  return null;
}
