"use client";

import Image from "next/image";
import { RefObject } from "react";

interface MediaControlsProps {
  playState: "play" | "pause";
  setPlayState: (state: "play" | "pause") => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  videoRef: RefObject<HTMLVideoElement | null>;
  className?: string;
}

export default function MediaControls({
  playState,
  setPlayState,
  isMuted,
  setIsMuted,
  videoRef,
  className = "",
}: MediaControlsProps) {
  return (
    <div
      className={`flex items-end justify-center pointer-events-auto ${className}`}
    >
      <div className="max-h-[80px] w-full flex flex-row items-center gap-x-2">
        <div className="w-[125px] text-center flex justify-end">
          {playState === "play" ? (
            <h4 className="!text-[30px]">PLAY</h4>
          ) : (
            <h4 className="!text-[28px]">PAUSE</h4>
          )}
        </div>

        <div
          onClick={() => {
            setPlayState("play");
            videoRef.current?.play();
          }}
        >
          <Image
            src={"/play_button.svg"}
            width={37}
            height={43}
            style={{ maxHeight: "43px" }}
            alt="Play button"
          />
        </div>

        <div
          className="flex sm:gap-x-1"
          onClick={() => {
            setPlayState("pause");
            videoRef.current?.pause();
          }}
        >
          <Image
            src={"/pause_button.svg"}
            width={12}
            height={32}
            alt="Pause button"
          />
          <Image
            src={"/pause_button.svg"}
            width={12}
            height={32}
            alt="Pause button"
          />
        </div>

        <div
          onClick={() => setIsMuted(!isMuted)}
          className="w-[32px] min-w-[32px] h-[32px] relative!"
        >
          <Image
            src={isMuted ? "/sound-on.svg" : "/sound-mute.svg"}
            width={32}
            height={32}
            alt="Mute button"
            style={{
              display: "block",
              width: "32px",
              height: "32px",
              objectFit: "contain",
              color: "white",
            }}
          />
        </div>
      </div>
    </div>
  );
}
