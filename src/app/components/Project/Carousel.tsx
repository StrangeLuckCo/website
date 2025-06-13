"use client";

import Image from "next/image";
import {
  Carousel as CarouselShad,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

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
              className="flex justify-center items-center basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 grow"
            >
              <div className="relative w-full aspect-[3/2]">
                <Image
                  src={src}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 z-10 cursor-[url('/hand_cursor_2.png'),_pointer]" />
        <CarouselNext className="right-4 top-1/2 -translate-y-1/2 z-10 cursor-[url('/hand_cursor_2.png'),_pointer]" />
      </div>
    </CarouselShad>
  );
}
