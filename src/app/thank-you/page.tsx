"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  isModernChrome,
  useUnicornEmbedding,
  useIsMobile,
} from "../utility/hooks";

declare global {
  interface Window {
    UnicornStudio: {
      addScene: (config: unknown) => Promise<unknown>;
      destroy: () => void;
    };
  }
}

export default function ThankYou() {
  const [isReady, setIsReady] = useState(false);
  const [shouldShowUnicorn, setShouldShowUnicorn] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Run client-only logic after hydration
    console.log(isModernChrome());
    setShouldShowUnicorn(isModernChrome());
    setIsReady(true);
  }, []);

  useUnicornEmbedding({
    elementId: "unicorn-welcome",
    filePath: "/Cursor_Footer_Welcome_Page.json.txt",
    altText: "Welcome to Strange Luck",
    ariaLabel: "Canvas animation scene",
  });

  return (
    <div className="flex flex-col h-screen">
      <div
        className={`flex flex-col flex-grow items-center gap-24 sm:gap-12 z-20 ${
          shouldShowUnicorn ? "pt-[100px]" : "justify-evenly sm:pt-[200px]"
        }`}
      >
        <h2 className="sl-h2 thank-you-glow text-center text-[40px]">
          Thank you for your submission.
        </h2>
        {isReady && !shouldShowUnicorn && (
          <div className="flex flex-col gap-y-[53px] sm:gap-y-0 mb-16 mx-12">
            <Image
              src={"/StrangeLuck-Logo-VHS-Wide.svg"}
              alt="Black background with 'Strange Luck: A Storytelling Studio' text"
              height={isMobile ? 63 : 207}
              width={isMobile ? 330 : 1083}
              className=""
              priority
            />
            <div className="flex flex-col sm:flex-row sm:justify-between text-center sl-h2-mobile !text-[15px] !font-normal !tracking-[0.75px] eighties-glow menu-glow-blur">
              <p className="">New York City • Mexico City • Worldwide</p>
              <p>@2025 StrangeLuck Productions</p>
            </div>
          </div>
        )}
      </div>
      {isReady && shouldShowUnicorn ? (
        <div
          id="unicorn-welcome"
          className="absolute top-0 left-0 w-full min-h-[550px] h-full max-w-screen overflow-hidden z-0"
          style={{
            maxWidth: "100vw",
            overflow: "hidden",
          }}
        />
      ) : null}
    </div>
  );
}
