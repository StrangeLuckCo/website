"use client";

import Image from "next/image";
import { useIsMobile } from "../utility/hooks";

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer className="w-full flex flex-col items-center justify-center mt-[45px] px-[24px] sm:m-0">
      <div className="flex flex-col items-center justify-center gap-y-[53px] sm:gap-y-0 sm:mb-16 sm:mx-12">
        <Image
          src={"/StrangeLuck-Logo-VHS-Wide.svg"}
          alt="Black background with 'Strange Luck: A Storytelling Studio' text"
          height={isMobile ? 63 : 207}
          width={isMobile ? 330 : 1083}
          priority
        />
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-0 text-center sm:text-left !text-[15px] !font-normal !tracking-[0.75px] sl-p sl-p-mobile">
          <p>New York City • Mexico City • Worldwide</p>
          <p>@2025 StrangeLuck Productions</p>
        </div>
      </div>
      {/* <Link
        href="mailto:hi@yourstrangeluck.com"
        className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
      >
        EMAIL
      </Link>
      <Link
        href="https://vimeo.com/strangeluck"
        className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        target="_blank"
      >
        VIMEO
      </Link>
      <Link
        href="https://www.instagram.com/yourstrangeluck/"
        className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        target="_blank"
      >
        INSTAGRAM
      </Link> */}
    </footer>
  );
}
