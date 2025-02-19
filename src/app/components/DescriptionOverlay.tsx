"use client";

import { useState } from "react";
import Image from "next/image";

export default function DescriptionOverlay() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={`fixed bottom-0 left-0 w-full ${
        expanded ? "h-[30vh]" : "h-[15vh]"
      } bg-transparent transition-all duration-300 ease-in-out flex flex-col items-start px-6 py-4 cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Show/Hide Button */}
      <div className="flex items-center gap-2 text-lg font-semibold">
        <span
          className={`transform transition-transform duration-300 ${
            expanded ? "rotate-180" : ""
          }`}
        >
          ▲
        </span>
        {expanded ? "Hide" : "Show"}
      </div>

      {/* Content - Visible when expanded */}
      {expanded && (
        <div className="flex flex-row items-start w-full mt-4">
          <div className="flex flex-col">
            <p className="text-sm text-gray-300">
              PRODUCTION + SOUND DESIGN + MIXING
            </p>

            {/* Image and Text */}
            <div className="flex flex-row mt-4">
              {/* Thumbnail Image */}
              <Image
                src="/placeholder-thumbnail.jpg" // Replace with dynamic prop later
                alt="Project Thumbnail"
                width={150}
                height={150}
                className="rounded-lg"
              />

              {/* Description (Scrollable) */}
              <div className="ml-4 overflow-hidden h-20 overflow-y-auto text-sm text-gray-300">
                <p>
                  This is an example description of the project. It extends
                  beyond four lines to demonstrate scrolling behavior. Keep
                  reading for more details on the process, collaboration, and
                  inspiration behind the sound design work. This is an example
                  description of the project. It extends beyond four lines to
                  demonstrate scrolling behavior. Keep reading for more details
                  on the process, collaboration, and inspiration behind the
                  sound design work. This is an example description of the
                  project. It extends beyond four lines to demonstrate scrolling
                  behavior. Keep reading for more details on the process,
                  collaboration, and inspiration behind the sound design work.
                  This is an example description of the project. It extends
                  beyond four lines to demonstrate scrolling behavior. Keep
                  reading for more details on the process, collaboration, and
                  inspiration behind the sound design work.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
