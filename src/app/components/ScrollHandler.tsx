"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface ScrollHandlerProps {
  introDone: boolean;
}

export default function ScrollHandler({ introDone }: ScrollHandlerProps) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const scrollTo = searchParams?.get("scrollTo");
    if (!introDone || !scrollTo) return;

    const container = document.querySelector(
      ".container-main",
    ) as HTMLElement | null;

    let attempts = 0;
    const maxAttempts = 80;

    const disableAllTriggers = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.disable(false));
    };

    const enableAllTriggers = () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.enable(false));
    };

    const computeTargetY = (el: HTMLElement) => {
      return (
        el.getBoundingClientRect().top -
        container!.getBoundingClientRect().top +
        container!.scrollTop
      );
    };

    const waitForStableTargetY = (el: HTMLElement, cb: (y: number) => void) => {
      let lastY: number | null = null;
      let stableFrames = 0;
      const start = performance.now();

      const tick = () => {
        // stop waiting after 2s so we never hang
        if (performance.now() - start > 2000) {
          cb(computeTargetY(el));
          return;
        }

        const y = computeTargetY(el);

        if (lastY !== null && Math.abs(y - lastY) < 0.5) {
          stableFrames += 1;
        } else {
          stableFrames = 0;
        }

        lastY = y;

        // ~5 consecutive frames stable ≈ layout has “settled enough”
        if (stableFrames >= 5) cb(y);
        else requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    };

    const tryScroll = () => {
      const el = document.getElementById(scrollTo) as HTMLElement | null;

      if (!container || !el) {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(tryScroll, 50);
        }
        return;
      }

      // Temporarily disable CSS snap + CSS smooth scrolling so we can control scroll deterministically.
      container.classList.add("is-programmatic-scroll");

      // Keep triggers disabled while navigating (some may be created after route mount).
      disableAllTriggers();
      const disableInterval = window.setInterval(disableAllTriggers, 50);

      gsap.killTweensOf(container);

      waitForStableTargetY(el, (stableY) => {
        const distance = Math.abs(stableY - container.scrollTop);
        const duration = Math.min(1.8, Math.max(0.9, distance / 2000));

        const tween = gsap.to(container, {
          scrollTop: stableY,
          duration,
          ease: "power2.inOut",
          overwrite: "auto",
          onComplete: () => {
            // Final correction in case layout shifted during the tween
            waitForStableTargetY(el, (finalY) => {
              container.scrollTop = finalY; // snap-perfect landing

              window.clearInterval(disableInterval);
              container.classList.remove("is-programmatic-scroll");

              enableAllTriggers();
              ScrollTrigger.refresh();

              window.history.replaceState({}, "", "/");
            });
          },
          onInterrupt: () => {
            window.clearInterval(disableInterval);
            container.classList.remove("is-programmatic-scroll");

            enableAllTriggers();
            ScrollTrigger.refresh();
          },
        });

        return () => {
          window.clearInterval(disableInterval);
          tween.kill();
          container.classList.remove("is-programmatic-scroll");
          enableAllTriggers();
        };
      });
    };

    requestAnimationFrame(() => {
      setTimeout(tryScroll, 100);
    });
  }, [introDone, searchParams]);

  return null;
}
