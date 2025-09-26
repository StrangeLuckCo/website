"use client";

import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full flex flex-col items-center justify-center mt-[45px] pb-28 sm:m-0">
      <div className="flex flex-col items-center justify-center gap-y-[31px] sm:gap-y-10 sm:mb-16 sm:mx-12">
        <Image
          src={"/logo-white-yellow-01.svg"}
          alt="Black background with 'Strange Luck: A Storytelling Studio' text"
          height="100"
          width="100"
          priority
          className="blur-[1px] sm:blur-[1.2px] md:blur-[1.3px] lg:blur-[1.5px] opacity-90 w-auto sm:w-[600px] md:w-[800px]"
        />
        <div className="flex flex-col sm:w-full sm:flex-row sm:justify-between gap-4 sm:gap-0 text-center">
          <p className="sl-p sl-p-mobile blur-xs">New York City • Mexico City • Worldwide</p>
          <p className="sl-p sl-p-mobile blur-xs">@2025 Strange Luck Studios</p>
        </div>
      </div>
    </footer>
  );
}
