"use client";

import { useState } from "react";
import Image from "next/image";

export default function DescriptionOverlay({
  credits,
  image,
  description,
}: {
  credits: string;
  image: string;
  description: string;
}) {
  const [expanded, setExpanded] = useState(false);

  const dummyText =
    "This is an example description of the project. It extends beyond four lines to demonstrate scrolling behavior. Keep reading for more details on the process, collaboration, and inspiration behind the sound design work. This is an example description of the project. It extends beyond four lines to demonstrate scrolling behavior. Keep reading for more details on the process, collaboration, and inspiration behind the sound design work. This is an example description of the project. It extends beyond four lines to demonstrate scrolling behavior. Keep reading for more details on the process, collaboration, and inspiration behind the sound design work. This is an example description of the project. It extends beyond four lines to demonstrate scrolling behavior. Keep reading for more details on the process, collaboration, and inspiration behind the sound design work.";
  return (
    <div
      className={`fixed bottom-0 left-0 w-full z-10 ${
        expanded ? "h-[40vh]" : "h-[15vh]"
      } bg-transparent transition-all duration-300 ease-in-out flex flex-col items-start px-6 py-4 cursor-pointer`}
      onClick={() => setExpanded(!expanded)}
    >
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

      {expanded && (
        <div className="flex flex-row items-start w-full mt-4">
          <div className="flex flex-col">
            <p className="text-sm text-gray-300">
              PRODUCTION + SOUND DESIGN + MIXING
            </p>

            <div className="flex flex-row mt-4">
              <Image
                src={image}
                alt="Project Thumbnail"
                width={150}
                height={150}
                className="rounded-lg"
              />

              <div className="ml-4 overflow-hidden h-20 overflow-y-auto text-sm text-gray-300">
                <p>
                  {
                    // description ||
                    dummyText
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
