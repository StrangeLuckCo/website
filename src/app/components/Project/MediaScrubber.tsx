"use client";

import { useRef, useState, useEffect } from "react";

interface Props {
  currentTime: number;
  duration: number;
  onScrub: (time: number) => void;
}

export default function MediaScrubber({
  currentTime,
  duration,
  onScrub,
}: Props) {
  const scrubberRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const [internalTime, setInternalTime] = useState(currentTime);

  // Sync internal state unless dragging
  useEffect(() => {
    if (!isDraggingRef.current) {
      setInternalTime(currentTime);
    }
  }, [currentTime]);

  const handleScrub = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!scrubberRef.current || !duration) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, offsetX / rect.width));
    const newTime = percent * duration;
    onScrub(newTime);
    setInternalTime(newTime);
  };

  const handlePointerMove = (e: PointerEvent) => {
    if (!isDraggingRef.current || !scrubberRef.current || !duration) return;
    const rect = scrubberRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(1, offsetX / rect.width));
    const newTime = percent * duration;
    setInternalTime(newTime);
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

  return (
    <div
      ref={scrubberRef}
      onPointerDown={handlePointerDown}
      className="w-[250px] h-[27px] bg-[#3c3436] border-2 border-[#D9D9D9] relative cursor-pointer z-40"
    >
      <div
        className="h-full bg-[#D9D9D9] absolute top-0 left-0"
        style={{
          width: duration > 0 ? `${(internalTime / duration) * 100}%` : "0%",
        }}
      ></div>
    </div>
  );
}
