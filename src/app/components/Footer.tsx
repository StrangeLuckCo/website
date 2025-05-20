"use client";

import Link from "next/link";
import Image from "next/image";
import { useIsMobile } from "../utility/hooks";

export default function Footer() {
  const isMobile = useIsMobile();

  return (
    <footer className="hidden sm:flex justify-center w-full items-center">
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
