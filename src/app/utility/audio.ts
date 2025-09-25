import { useEffect, useRef } from "react";

export function useAudio(url: string|null) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);

  const getAudioContext = async () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContextRef.current.state === "suspended") {
      await audioContextRef.current.resume();
    }
    return audioContextRef.current;
  };

  const play = async () => {
    const ctx = await getAudioContext();
    if (!audioBufferRef.current) {
      console.warn("Audio buffer is not loaded yet.");
      return;
    }
    const source = ctx.createBufferSource();
    source.buffer = audioBufferRef.current;
    source.connect(ctx.destination);
    source.start(0);
  };

  const load = async (url: string|null): Promise<AudioBuffer> => {
    if (!url) {
      return Promise.reject("No URL provided");
    }

    const ctx = await getAudioContext();
    const response = await fetch(url);
    const buf = await response.arrayBuffer();
    return await ctx.decodeAudioData(buf);
  };

  useEffect(() => {
    load(url).then((buffer) => {
      audioBufferRef.current = buffer;
    }).catch((err) => {
      console.error("Error loading audio:", err);
    });
  }, []);

  return {
    play,
  };
};
