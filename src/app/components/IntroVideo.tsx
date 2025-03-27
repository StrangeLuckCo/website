"use client";

import { useState, useRef } from "react";

export default function IntroVideo() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasFinished, setHasFinished] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handlePlay = () => {
    setHasStarted(true);
  };

  const handleEnded = () => {
    setHasFinished(true);
  };

  return (
    <>
      {/* Full-screen video wrapper */}
      {!hasFinished && (
        <div className="fixed inset-0 z-[9998] bg-black">
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
      )}

      {/* Fade-out black overlay */}
      {!hasFinished && (
        <div
          className={`fixed inset-0 bg-black z-[9999] transition-opacity duration-700 ease-in-out ${
            hasStarted ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        />
      )}
    </>
  );
}
