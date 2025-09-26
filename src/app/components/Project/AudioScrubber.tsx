// AudioScrubber.tsx
"use client";

import { useEffect, useRef } from "react";
import { useAudioEngine } from "../../utility/hooks";
import Image from "next/image";
import { useState } from "react";

interface Props {
  audioUrls: string[];
  showControls?: boolean;
}

export default function AudioScrubber({
  audioUrls,
  showControls = true,
}: Props) {
  const {
    currentTime,
    duration,
    goTo,
    handleStop,
    handleRewind,
    handleFastForward,
    handlePlayPause,
  } = useAudioEngine(audioUrls);

  const scrubberRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const [internalTime, setInternalTime] = useState(0);

  useEffect(() => {
    if (!isDraggingRef.current) {
      setInternalTime(currentTime);
    }
  }, [currentTime]);

  const handleScrub = (e: React.PointerEvent<HTMLDivElement>) => {
    const scrubber = scrubberRef.current;
    if (!scrubber || !duration) return;
    const rect = scrubber.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, offsetX / rect.width));
    const newTime = percent * duration;
    goTo(newTime);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDraggingRef.current || !scrubberRef.current || !duration) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, offsetX / rect.width));
    setInternalTime(percent * duration);
  };

  const handlePointerUp = (e: PointerEvent) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    handleScrub(e as unknown as React.PointerEvent<HTMLDivElement>);
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerUp);
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    handleScrub(e);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
  };

  const formatTime = (secs: number): string => {
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="w-full max-w-[342px] sm:max-w-[756px] gap-y-6 flex flex-col items-center ">
      <h2
        className="sl-h2 vhs-scrubber-text !text-[40px] !tracking-[6px]"
        style={{ WebkitTextStrokeWidth: "0.75px", WebkitTextFillColor: "#FFF" }}
      >
        {formatTime(internalTime)}
      </h2>

      <div
        ref={scrubberRef}
        onPointerDown={handlePointerDown}
        className="w-full h-[27px] bg-[#3c3436] border-2 border-[#D9D9D9] z-40 relative"
      >
        <div
          className="h-full bg-[#D9D9D9] absolute top-0 left-0"
          style={{
            width:
              duration && duration > 0
                ? `${(internalTime / duration) * 100}%`
                : "0%",
          }}
        ></div>
      </div>

      {showControls && (
        <div className="flex gap-x-[19px] mt-4 max-h-[34px] blur-xxs">
          <Image
            src="/controls/audio-stop-01.svg"
            onClick={handleStop}
            width={60}
            height={30}
            style={{ filter: "drop-shadow(-5px 4px 4px #000)" }}
            alt="Stop"
          />
          <Image
            src="/controls/audio-rewind-01.svg"
            onClick={handleRewind}
            width={60}
            height={30}
            style={{ filter: "drop-shadow(-5px 4px 4px #000)" }}
            alt="Reverse"
          />

          <Image
            src="/controls/audio-play-01.svg"
            onClick={handlePlayPause}
            width={60}
            height={30}
            style={{ filter: "drop-shadow(-5px 4px 4px #000)" }}
            alt="Play"
          />
          <Image
            src="/controls/audio-ff-01.svg"
            onClick={handleFastForward}
            width={60}
            height={30}
            style={{ filter: "drop-shadow(-5px 4px 4px #000)" }}
            alt="Fast forward"
          />
        </div>
      )}
    </div>
  );
}
