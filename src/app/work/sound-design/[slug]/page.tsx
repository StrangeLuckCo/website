"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { getAudioEntityBySlug } from "../../../../pages/api/audio";
import DescriptionOverlay from "../../../components/DescriptionOverlay";
import AudioVisualizer from "../../../components/AudioVisualizer";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

export default function SoundDesign() {
  const params = useParams();
  const slug = params?.slug as string;

  const [audioMetadata, setAudioMetadata] = useState({
    markdownDescription: "",
    credits: "",
    thumbnailUrl: "",
    fileUrl: "",
    title: "",
  });
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const res = await getAudioEntityBySlug(slug);
        if (!res || !res.fields || !res.fields.fileUrl) {
          setError("Audio file not found.");
        } else {
          setAudioMetadata(res.fields);
        }
      } catch (err) {
        console.error("Error fetching audio file:", err);
        setError("Failed to fetch audio file. Please try again later.");
      }
    };

    if (slug) {
      fetchAudio();
    }
  }, [slug]);

  useEffect(() => {
    if (!audioMetadata.fileUrl || !audioRef.current) return;
    audioRef.current.src = audioMetadata.fileUrl; // ✅ Set the URL for the audio element
    audioRef.current.crossOrigin = "anonymous"; // ✅ Fix CORS issue

    // ✅ Ensure audio loads before attempting play
    audioRef.current.addEventListener("canplaythrough", () => {});

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current?.removeEventListener("canplaythrough", () => {});
    };
  }, [audioMetadata.fileUrl]);

  // 🔥 Toggle play/pause when clicking on z-index: 0 elements
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!audioRef.current) return;

      // 🔍 Check if the clicked element has z-index: 0
      const target = event.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      const zIndex = computedStyle.getPropertyValue("z-index");
      if (parseInt(zIndex, 10) <= 0) {
        if (!audioCtxRef.current) {
          // ✅ Create AudioContext inside user interaction
          audioCtxRef.current = new (window.AudioContext ||
            (window as any).webkitAudioContext)();
        }

        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume().then(() => {
            console.log("AudioContext resumed");
          });
        }

        if (audioRef.current.paused) {
          audioRef.current
            .play()
            .catch((err) => console.error("Play failed:", err));
        } else {
          console.log("Pausing audio...");
          audioRef.current.pause();
        }
      }
    };

    document.body.addEventListener("click", handleClick);
    return () => document.body.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full items-center gap-10 p-4 bg-black text-white relative z-0">
      <h1 className="text-[#d8f14f] text-6xl z-0">{audioMetadata.title}</h1>

      {audioMetadata.fileUrl && <AudioVisualizer audioRef={audioRef} />}

      {audioMetadata.fileUrl && (
        <audio ref={audioRef} className="hidden">
          <source src={audioMetadata.fileUrl} type="audio/mp3" />
        </audio>
      )}

      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        <DescriptionOverlay
          description={audioMetadata.markdownDescription}
          credits={audioMetadata.credits}
          image={audioMetadata.thumbnailUrl}
          className="z-10 pointer-events-auto"
        />
      </div>
    </div>
  );
}
