"use client";

import Image from "next/image";
import {
  Carousel as CarouselShad,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

const CAROUSEL_MIN_HEIGHT = 208;
// const CAROUSEL_MAX_HEIGHT = 343;
const IMAGE_MIN_WIDTH = 421;

export default function Carousel({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  return (
    <CarouselShad className={`w-full max-w-screen ${className}`}>
      <div className="relative">
        <CarouselContent className="flex">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center basis-full sm:basis-1/2 lg:basis-1/3"
            >
              <div
                className="relative"
                style={{
                  height: `${CAROUSEL_MIN_HEIGHT}px`,
                  maxHeight: `${CAROUSEL_MIN_HEIGHT}px`,
                  minHeight: `${CAROUSEL_MIN_HEIGHT}px`,
                  minWidth: `${IMAGE_MIN_WIDTH}px`,
                }}
              >
                <Image
                  src={src}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-cover overflow-x-hidden h-full w-auto"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="right-4 top-1/2 -translate-y-1/2 z-10" />
      </div>
    </CarouselShad>
  );
}
