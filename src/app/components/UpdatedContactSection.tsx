"use client";
import Link from "next/link";
import { useIsMobile } from "../utility/hooks";

export default function UpdatedContactSection() {
  const isMobile = useIsMobile();
  return (
    <section
      id="contact"
      className="z-10 sm:h-screen pt-20 sm:pt-0 mb-12 sm:mb-20 max-w-screen overflow-hidden flex flex-col items-center justify-center text-center"
    >
      <h2 className="sl-h2 sl-h4-mobile blur-xs sm:blur-md w-4/5 mb-16 sm:mt-20 sm:mb-4 ">
        Want to fall in love with the world — its sounds, its stories, its
        textures, its contradictions, its juxtapositions, its surprises?
      </h2>
      <h3 className="sl-h4-mobile sl-h3 blur-xs sm:blur-sm mb-6">
        A dream collaboration could be in your future.
      </h3>
      <Link href="mailto:hi@yourstrangeluck.com">
        <h1
          className="sl-h5-mobile desktop-title blur-xs sm:blur-md mb-2 sm:mb-10 underline cursor-[url('/hand_cursor.png'),_pointer]"
          style={{
            WebkitTextFillColor: isMobile ? "#E6FC6D" : "#DFFC3C",
            textDecorationColor: "#DFFC3C",
            WebkitTextStrokeWidth: "0.25px",
          }}
        >
          HI@YOURSTRANGELUCK.COM
        </h1>
      </Link>
      <p className="sl-p2-mobile sl-p blur-xs sm:blur-sm mb-12 sm:mb-10">
        OFFER EXPIRES 6:00PM FEBRUARY 23, 2060
      </p>
      <h4 className="sl-h4-mobile sl-h4 blur-xs sm:blur-sm mb-10">
        Continue your strange journey?{" "}
      </h4>
      <div className="flex flex-row gap-x-4">
        <Link
          href="https://vimeo.com/strangeluck"
          target="_blank"
          className="cursor-[url('/hand_cursor.png'),_pointer]"
        >
          <p
            className="sl-p text-[#E6FC6D] underline blur-xxs"
            style={{
              WebkitTextFillColor: isMobile ? "#E6FC6D" : "#DFFC3C",
              textDecorationColor: isMobile ? "#E6FC6D" : "#DFFC3C",
            }}
          >
            VIMEO
          </p>
        </Link>
        <Link
          href="https://www.instagram.com/yourstrangeluck/"
          target="_blank"
          className="cursor-[url('/hand_cursor.png'),_pointer]"
        >
          <p
            className="sl-p text-[#E6FC6D] underline blur-xxs"
            style={{
              WebkitTextFillColor: "#DFFC3C",
              textDecorationColor: "#DFFC3C",
            }}
          >
            INSTAGRAM
          </p>
        </Link>
      </div>
    </section>
  );
}
