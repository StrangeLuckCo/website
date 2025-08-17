"use client";

import Image from "next/image";
import {
  Carousel as CarouselShad,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import { useEffect, useState } from "react";

export default function Carousel({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) {
  const [api, setApi] = useState<CarouselApi | null>(null);
  const [hideControls, setHideControls] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () => {
      const snaps = api.scrollSnapList().length;
      setHideControls(snaps <= 1);
    };

    update();
    api.on("reInit", update);
    api.on("resize", update);

    return () => {
      api.off("reInit", update);
      api.off("resize", update);
    };
  }, [api]);

  return (
    <CarouselShad
      setApi={setApi}
      className={`w-full max-w-screen ${className || ""}`}
    >
      <div className="relative">
        <CarouselContent className="flex">
          {images.map((src, index) => (
            <CarouselItem
              key={index}
              className="flex justify-center items-center basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 grow pl-1 py-4"
            >
              <div className="relative w-full aspect-[3/2] my-2">
                {/* rounded shadow layer behind the image */}
                <div
                  className="absolute left-0 right-0 bottom-0 top-[2px] rounded-xl pointer-events-none
               [box-shadow:-2px_-2px_13px_0_#FFF,2px_2px_13px_0_rgba(255,255,255,0.80)]"
                  aria-hidden
                />
                <Image
                  src={src}
                  alt={`Project image ${index + 1}`}
                  fill
                  className="object-cover relative z-10" // keep image on top, square corners
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {!hideControls && (
          <>
            <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 z-10 cursor-[url('/hand_cursor_2.png'),_pointer]" />
            <CarouselNext className="right-4 top-1/2 -translate-y-1/2 z-10 cursor-[url('/hand_cursor_2.png'),_pointer]" />
          </>
        )}
      </div>
    </CarouselShad>
  );
}
