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
  const [email, setEmail] = useState("");
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
    <div className="flex flex-col justify-center items-center">
      <div className="relative pt-[110px] flex flex-col z-20 gap-y-[55px] sm:gap-y-[120px] w-4/5 items-center">
        <h2 className="sl-h2-mobile text-center sm:sl-h2 eighties-glow text-5xl">
          A new, strange future is coming soon.
        </h2>

        <div className="flex flex-col w-full justify-center items-center gap-y-16 sm:gap-y-8">
          <h3 className="sl-h3-mobile sm:sl-h3 eighties-glow text-5xl">
            Don&#39;t miss it.
          </h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(email),
              });

              const result = await res.json();
              if (result.success) {
                console.log("Message sent successfully");
              } else {
                alert("Something went wrong. Please try again.");
              }
            }}
            className="w-full sm:border-2 border-[#D9D9D9] flex flex-col sm:flex-row gap-y-10 sm:gap-y-0 justify-between max-w-[650px] h-full sm:items-stretch items-center"
          >
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                console.log(email);
                setEmail(e.target.value);
              }}
              className="sl-p desktop-body input-box-glow w-full sm:w-4/5 flex flex-1 bg-black p-2 border-2 border-[#D9D9D9] sm:border-0 text-center sm:text-left cursor-[url('/hand_cursor.png'),_pointer]"
              required
            />
            <input
              type="submit"
              value="Submit"
              className="bg-[#D9D9D9] menu-glow h-[48px] w-[115px] menu-glow-blur !text-md !font-medium px-[25px] text-black cursor-[url('/hand_cursor.png'),_pointer]"
            />
          </form>
        </div>
      </div>
      {isReady && shouldShowUnicorn ? (
        <div
          id="unicorn-welcome"
          className="absolute top-0 left-0 w-full min-h-[700px] h-full z-0 unicorn-embed"
        />
      ) : isReady ? (
        <Image
          src={
            isMobile
              ? "/coming_soon_mobile_fallback.svg"
              : "/coming_soon_fallback.svg"
          }
          fill
          alt="Black background with 'Strange Luck: A Storytelling Studio' text"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : null}
    </div>
  );
}
