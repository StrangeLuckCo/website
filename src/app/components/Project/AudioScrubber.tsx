"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function AudioScrubber({ audio }: { audio: string }) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const scrubberRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);
    };

    const interval = setInterval(() => {
      if (!audio.paused && !audio.ended && !isDraggingRef.current) {
        updateTime();
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [audio]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = 1;
    setPlaybackSpeed(1);

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setCurrentTime(0);
    setIsPlaying(false);
    setPlaybackSpeed(1);
  };

  const fastForward = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = 2;
    audio.play();
    setPlaybackSpeed(2);
    setIsPlaying(true);
  };

  const handleScrub = (e: React.PointerEvent<HTMLDivElement>) => {
    const scrubber = scrubberRef.current;
    const audio = audioRef.current;
    if (!scrubber || !audio || !duration) return;

    const rect = scrubber.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, offsetX / rect.width));
    const newTime = percent * duration;

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDraggingRef.current) return;
    const scrubber = scrubberRef.current;
    const audio = audioRef.current;
    if (!scrubber || !audio || !duration) return;

    const rect = scrubber.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, offsetX / rect.width));
    const newTime = percent * duration;

    setCurrentTime(newTime); // visual feedback
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
    <div className="gap-y-6 flex flex-col items-center">
      <audio
        ref={audioRef}
        src={audio}
        autoPlay
        controls={false}
        preload="auto"
      />

      <h2 className="sl-h2 vhs-scrubber-text">{formatTime(currentTime)}</h2>

      <div
        ref={scrubberRef}
        onPointerDown={handlePointerDown}
        className="w-full max-w-[250px] h-[27px] bg-[#3c3436] border-2 border-[#D9D9D9] z-40 cursor-pointer relative"
      >
        <div
          className="h-full bg-[#D9D9D9] absolute top-0 left-0"
          style={{
            width: duration ? `${(currentTime / duration) * 100}%` : "0%",
          }}
        ></div>
      </div>

      <div className="flex gap-x-4">
        <Image
          src={"/forward_reverse.png"}
          onClick={() =>
            alert("Reverse playback not supported in browsers natively")
          }
          width={70}
          height={40}
          className="rotate-180 cursor-pointer"
          style={{ maxHeight: "29px" }}
          alt="Reverse button"
        />
        <Image
          src={"/stop_button_container.svg"}
          onClick={stopAudio}
          width={70}
          height={40}
          className="cursor-pointer"
          style={{ maxHeight: "29px" }}
          alt="Stop button"
        />
        <Image
          src={"/play_button_container.svg"}
          onClick={togglePlayback}
          width={70}
          height={40}
          className="cursor-pointer"
          style={{ maxHeight: "29px" }}
          alt="Play button"
        />
        <Image
          src={"/forward_reverse.png"}
          onClick={fastForward}
          width={70}
          height={40}
          className="cursor-pointer"
          style={{ maxHeight: "29px" }}
          alt="Fast forward button"
        />
      </div>
    </div>
  );
}
