"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface CarouselProps {
  images: string[];
  height: string;
}

export default function Carousel({ images, height }: CarouselProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Scroll animation
  const scroll = (dir: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.6;
    gsap.to(el, {
      scrollLeft:
        dir === "left" ? el.scrollLeft - amount : el.scrollLeft + amount,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  // Modal open/close animation
  useEffect(() => {
    if (activeIndex !== null && modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [activeIndex]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <div className="relative w-full overflow-hidden" style={{ height }}>
      {/* Arrows */}
      <button
        onMouseEnter={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white px-3 py-2 hover:bg-black/60"
      >
        &#8592;
      </button>
      <button
        onMouseEnter={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white px-3 py-2 hover:bg-black/60"
      >
        &#8594;
      </button>

      {/* Image row */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scroll-smooth"
        style={{ height }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 relative cursor-pointer"
            style={{ height, minWidth: "auto", aspectRatio: "16 / 9" }}
            onClick={() => setActiveIndex(idx)}
          >
            <Image
              src={src}
              alt={`image-${idx}`}
              fill
              className="object-cover "
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {activeIndex !== null && (
        <div
          ref={modalRef}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="relative max-w-full w-full h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[activeIndex]}
              alt={`modal-image-${activeIndex}`}
              fill
              className="object-contain"
            />

            {/* Modal Arrows */}
            {activeIndex > 0 && (
              <button
                onClick={() => setActiveIndex((prev) => (prev ?? 1) - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white text-3xl px-4 py-2 rounded-full"
              >
                &#8592;
              </button>
            )}
            {activeIndex < images.length - 1 && (
              <button
                onClick={() => setActiveIndex((prev) => (prev ?? 0) + 1)}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white text-3xl px-4 py-2 rounded-full"
              >
                &#8594;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
