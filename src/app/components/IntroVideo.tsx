"use client";

import { useEffect, useState, useRef } from "react";

export default function IntroVideo({ onIntroEnd }: { onIntroEnd: () => void }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const [hide, setHide] = useState(false); // ✅ add this
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Don't show video on localhost
    if (
      typeof window !== "undefined" &&
      window.location.hostname === "localhost"
    ) {
      setHide(true);
      onIntroEnd(); // still notify the main app
      return;
    }

    // If user has already seen the video, skip it
    const alreadyPlayed = localStorage.getItem("introPlayed");
    if (alreadyPlayed) {
      setHide(true);
      onIntroEnd();
    }
  }, []);

  const handlePlay = () => {
    setHasStarted(true);
  };

  const handleEnded = () => {
    setHasFinished(true);
    setHide(true);
    localStorage.setItem("introPlayed", "true");
    onIntroEnd(); // Notify parent that intro is done
  };

  useEffect(() => {
    // Extra safety: pause and unload video on finish
    if (hasFinished && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.src = "";
    }
  }, [hasFinished]);

  if (hide || hasFinished) return null;

  return (
    <>
      {/* Fullscreen video container */}
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

      {/* Black overlay that fades out on play */}
      <div
        className={`fixed inset-0 bg-black z-[9999] transition-opacity duration-700 ease-in-out ${
          hasStarted ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      />
    </>
  );
}
