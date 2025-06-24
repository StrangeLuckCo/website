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

export default function Welcome() {
  const [isReady, setIsReady] = useState(false);
  const [shouldShowUnicorn, setShouldShowUnicorn] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Run client-only logic after hydration
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
    <div className="flex flex-col justify-center items-center h-full">
      <div className="relative pt-[117px] sm:pt-[90px] flex flex-col z-20 gap-y-12 sm:gap-y-[100px] w-4/5 items-center justify-between h-screen">
        <div>
          <h2 className="sl-h2-mobile text-center mb-[50px] sm:sl-h2 eighties-glow text-5xl">
            A new, strange future is coming soon.
          </h2>

          <div className="flex flex-col w-full justify-center items-center gap-y-8 sm:gap-y-10">
            <h3 className="sl-h3-mobile sm:sl-h3 eighties-glow text-5xl">
              Don&#39;t miss it.
            </h3>
            <form
              action="https://yourstrangeluck.us3.list-manage.com/subscribe/post"
              method="POST"
              target="_blank"
              noValidate
              className="w-full sm:border-2 border-[#D9D9D9] flex flex-col sm:flex-row gap-y-10 sm:gap-y-0 justify-between max-w-[650px] h-full sm:items-stretch items-center"
            >
              <input type="hidden" name="u" value="91ffec2a68b8a49943dc85b46" />
              <input type="hidden" name="id" value="f23e80cd72" />
              <input
                type="email"
                name="MERGE0"
                id="MERGE0"
                placeholder="Enter your email"
                className="sl-p desktop-body input-box-glow w-full sm:w-4/5 flex flex-1 bg-black p-2 border-2 border-[#D9D9D9] sm:border-0 text-center sm:text-left cursor-[url('/hand_cursor_2.png'),_pointer]"
                required
              />
              <input
                type="submit"
                value="Submit"
                className="bg-[#D9D9D9] menu-glow h-[48px] w-[115px] menu-glow-blur !text-md !font-medium px-[25px] text-black cursor-[url('/hand_cursor_2.png'),_pointer]"
              />
            </form>
          </div>
        </div>
        {isReady && !shouldShowUnicorn && (
          <div className="flex flex-col gap-y-[10px] sm:gap-y-0 mb-32 sm:mb-16">
            <Image
              src={"/StrangeLuck-Logo-VHS-Wide.svg"}
              alt="Black background with 'Strange Luck: A Storytelling Studio' text"
              height={isMobile ? 330 : 207}
              width={isMobile ? 330 : 1083}
              priority
            />
            <div className="flex flex-col sm:flex-row sm:justify-between text-center sl-h2-mobile !text-[15px] !font-normal !tracking-[0.75px] eighties-glow menu-glow-blur">
              <p className="">New York City • Mexico City • Worldwide</p>
              <p>@2025 Strange Luck Studios</p>
            </div>
          </div>
        )}
      </div>
      {isReady && shouldShowUnicorn ? (
        <div
          id="unicorn-welcome"
          className="absolute top-0 left-0 w-full min-h-[680px] h-full max-w-screen overflow-hidden z-0"
          style={{
            maxWidth: "100vw",
            overflow: "hidden",
          }}
        />
      ) : null}
    </div>
  );
}
