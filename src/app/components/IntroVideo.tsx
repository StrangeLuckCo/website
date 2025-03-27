"use client";

import { useEffect, useState, useRef } from "react";

export default function IntroVideo({ onIntroEnd }: { onIntroEnd: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setHasStarted(true);
  };

  const handleEnded = () => {
    setHasFinished(true);
    onIntroEnd(); // Inform parent that intro is done
  };

  useEffect(() => {
    // As an extra safety: pause the video and remove its source after ending
    if (hasFinished && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
    }
  }, [hasFinished]);

  if (hasFinished) return null; // ⛔ remove the component from the DOM completely

  return (
    <>
      {/* Full-screen black screen while intro loads */}
      <div className="fixed inset-0 bg-black z-[9998]">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onPlay={handlePlay}
          onEnded={handleEnded}
          className="w-full h-full object-cover"
        >
          <source
            src="https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/LogoAnimation-WithTagline.mov"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Fade-out overlay when video starts */}
      <div
        className={`fixed inset-0 bg-black z-[9999] transition-opacity duration-700 ease-in-out ${
          hasStarted ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </>
  );
}
