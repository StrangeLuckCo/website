// hooks/useUnicornEmbedding.ts
"use client";

import { useState, useEffect, useRef } from "react";

export type PlaybackDirection = "forward" | "reverse";

export function isModernChrome(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined")
    return false;

  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  const hasWebGLSupport = (() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      return !!gl;
    } catch {
      return false;
    }
  })();

  const isModern = hasWebGLSupport && window.devicePixelRatio >= 1;

  return isChrome && isModern;
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView =
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileView);
    };

    checkMobile();
  }, []);

  return isMobile;
}

type UnicornConfig = {
  elementId: string;
  filePath: string;
  altText?: string;
  ariaLabel?: string;
};

export function useUnicornEmbedding({
  elementId,
  filePath,
  altText = "Welcome to Unicorn Studio",
  ariaLabel = "Canvas animation scene",
}: UnicornConfig) {
  useEffect(() => {
    if (!isModernChrome()) return;

    const scriptId = "unicornstudio-script";
    const scriptAlreadyExists = document.getElementById(scriptId);

    const initScene = () => {
      if (window.UnicornStudio) {
        window.UnicornStudio.addScene({
          elementId,
          filePath,
          lazyLoad: false,
          scale: 1,
          dpi: 1.5,
          altText,
          ariaLabel,
          interactivity: {
            mouse: {
              disableMobile: true,
            },
          },
        }).catch((err) => console.error("❌ UnicornStudio error:", err));
      }
    };

    const whenReady = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(initScene);
      } else {
        setTimeout(initScene, 200);
      }
    };

    if (window.UnicornStudio) {
      whenReady();
    } else if (!scriptAlreadyExists) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.19/dist/unicornStudio.umd.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ UnicornStudio script loaded");
        whenReady();
      };
      document.body.appendChild(script);
    } else {
      // Script exists but UnicornStudio isn't yet available
      const waitForScript = setInterval(() => {
        if (window.UnicornStudio) {
          clearInterval(waitForScript);
          whenReady();
        }
      }, 50);
    }

    return () => {
      if (window.UnicornStudio?.destroy) {
        window.UnicornStudio.destroy();
      }
    };
  }, [elementId, filePath, altText, ariaLabel]);
}

export function useAudioEngine(audioUrls: string[]) {
  const audioContextRef = useRef<AudioContext | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [buffer, setBuffer] = useState<AudioBuffer | null>(null);
  const sourceRef = useRef<AudioBufferSourceNode | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [direction, setDirection] = useState<PlaybackDirection>("forward");
  const animationFrameRef = useRef<number | null>(null);
  const preloadCache = useRef<Record<string, AudioBuffer>>({});
  const [fastForwardClicked, setFastForwardClicked] = useState(false);
  const [rewindClicked, setRewindClicked] = useState(false);

  const handleFastForward = () => {
    if (!fastForwardClicked) {
      play(2, "forward");
      setFastForwardClicked(true);
      setRewindClicked(false); // reset other
    } else {
      setFastForwardClicked(false);
      next();
    }
  };

  const handleRewind = () => {
    if (!rewindClicked) {
      play(2, "reverse");
      setRewindClicked(true);
      setFastForwardClicked(false); // reset other
    } else {
      setRewindClicked(false);
      prev();
    }
  };

  const handleStop = () => {
    stop();
    setFastForwardClicked(false);
    setRewindClicked(false);
  };

  const handlePlayPause = () => {
    if (duration > 0) {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
      setFastForwardClicked(false);
      setRewindClicked(false);
    }
  };

  const stopPlayback = () => {
    sourceRef.current?.stop();
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    setIsPlaying(false);
    cancelAnimationFrame(animationFrameRef.current!);
  };

  const stopPlaybackAndReset = () => {
    sourceRef.current?.stop();
    sourceRef.current?.disconnect();
    sourceRef.current = null;
    setIsPlaying(false);
    setCurrentTime(0); // ✅ reset scrubber and audio time
    cancelAnimationFrame(animationFrameRef.current!);
  };

  const loadAudio = async (url: string) => {
    const ctx = audioContextRef.current!;
    if (preloadCache.current[url]) {
      const audioBuffer = preloadCache.current[url];
      setBuffer(audioBuffer);
      setDuration(audioBuffer.duration);
      setCurrentTime(0);
      return;
    }
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    preloadCache.current[url] = audioBuffer;
    setBuffer(audioBuffer);
    setDuration(audioBuffer.duration);
    setCurrentTime(0);
  };

  const reverseBuffer = (original: AudioBuffer) => {
    const reversed = audioContextRef.current!.createBuffer(
      original.numberOfChannels,
      original.length,
      original.sampleRate
    );

    for (let i = 0; i < original.numberOfChannels; i++) {
      const channelData = original.getChannelData(i);
      const reversedData = new Float32Array(channelData.length);
      for (let j = 0; j < channelData.length; j++) {
        reversedData[j] = channelData[channelData.length - 1 - j];
      }
      reversed.copyToChannel(reversedData, i);
    }
    return reversed;
  };

  const play = (rate = 1, dir: PlaybackDirection = "forward") => {
    if (!buffer || !audioContextRef.current) return;

    stopPlayback();
    setPlaybackRate(rate);
    setDirection(dir);

    const ctx = audioContextRef.current;
    const src = ctx.createBufferSource();
    const activeBuffer = dir === "reverse" ? reverseBuffer(buffer) : buffer;
    src.buffer = activeBuffer;
    src.playbackRate.value = rate;
    src.connect(ctx.destination);
    sourceRef.current = src;

    const offset =
      dir === "reverse" ? activeBuffer.duration - currentTime : currentTime;
    src.start(0, offset);

    const playbackStartTime = ctx.currentTime;
    const update = () => {
      const elapsed = ctx.currentTime - playbackStartTime;
      const newTime =
        dir === "reverse"
          ? currentTime - elapsed * rate
          : currentTime + elapsed * rate;

      setCurrentTime(Math.max(0, Math.min(newTime, activeBuffer.duration)));

      if (newTime >= 0 && newTime <= activeBuffer.duration) {
        animationFrameRef.current = requestAnimationFrame(update);
      } else {
        stopPlayback();
      }
    };

    setIsPlaying(true);
    animationFrameRef.current = requestAnimationFrame(update);
  };

  const pause = () => {
    stopPlayback();
  };
  const goTo = (time: number) => {
    setCurrentTime(time);

    if (!buffer || !audioContextRef.current) return;

    if (isPlaying) {
      stopPlayback();

      const ctx = audioContextRef.current;
      const src = ctx.createBufferSource();
      const activeBuffer =
        direction === "reverse" ? reverseBuffer(buffer) : buffer;
      src.buffer = activeBuffer;
      src.playbackRate.value = playbackRate;
      src.connect(ctx.destination);
      sourceRef.current = src;

      const offset =
        direction === "reverse" ? activeBuffer.duration - time : time;

      src.start(0, offset);

      const playbackStartTime = ctx.currentTime;
      const update = () => {
        const elapsed = ctx.currentTime - playbackStartTime;
        const newTime =
          direction === "reverse"
            ? time - elapsed * playbackRate
            : time + elapsed * playbackRate;

        setCurrentTime(Math.max(0, Math.min(newTime, activeBuffer.duration)));

        if (newTime >= 0 && newTime <= activeBuffer.duration) {
          animationFrameRef.current = requestAnimationFrame(update);
        } else {
          stopPlayback();
        }
      };

      setIsPlaying(true);
      animationFrameRef.current = requestAnimationFrame(update);
    }
  };

  const next = () => {
    stopPlayback();
    const nextIndex = (currentIndex + 1) % audioUrls.length;
    setCurrentIndex(nextIndex);
    loadAudio(audioUrls[nextIndex]);
  };

  const prev = () => {
    stopPlayback();
    const prevIndex = (currentIndex - 1 + audioUrls.length) % audioUrls.length;
    setCurrentIndex(prevIndex);
    loadAudio(audioUrls[prevIndex]);
  };

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    audioUrls.forEach((url) => loadAudio(url)); // preload all
    loadAudio(audioUrls[currentIndex]);
    return () => stopPlayback();
  }, [audioUrls, currentIndex]);

  return {
    currentTime,
    duration,
    isPlaying,
    play,
    pause,
    goTo,
    stop: stopPlaybackAndReset,
    next,
    prev,
    playbackRate,
    direction,
    handleStop,
    handleRewind,
    handleFastForward,
    handlePlayPause,
  };
}
