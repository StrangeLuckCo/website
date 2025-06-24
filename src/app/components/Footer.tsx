"use client";

import Image from "next/image";
import { useIsMobile } from "../utility/hooks";

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer className="w-full flex flex-col items-center justify-center mt-[45px] px-[24px] pb-28 sm:m-0">
      <div className="flex flex-col items-center justify-center gap-y-[31px] sm:gap-y-0 sm:mb-16 sm:mx-12">
        <Image
          src={"/StrangeLuck-Logo-VHS-Wide.svg"}
          alt="Black background with 'Strange Luck: A Storytelling Studio' text"
          height={isMobile ? 63 : 207}
          width={isMobile ? 330 : 1083}
          priority
        />
        <div className="flex flex-col sm:w-full sm:flex-row sm:justify-between gap-4 sm:gap-0 text-center sm:text-left blur-xs sm:blur-sm sl-p sl-p-mobile">
          <p>New York City • Mexico City • Worldwide</p>
          <p>@2025 Strange Luck Studios</p>
        </div>
      </div>
    </footer>
  );
}
