"use client";
import { useEffect, useRef, useState } from "react";

interface AudioVisualizerProps {
  audioUrl: string;
}

export default function AudioVisualizer({ audioUrl }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);
  const [analyzer, setAnalyzer] = useState<AnalyserNode | null>(null);
  const [bufferLength, setBufferLength] = useState<number>(0);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (!audioUrl) return;
    const audio = new Audio(audioUrl);
    audio.crossOrigin = "anonymous";
    audioRef.current = audio;
  }, [audioUrl]);

  useEffect(() => {
    if (!analyzer || !canvasRef.current || !isPlaying) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let scrollOffset = 0;

    const drawWaveform = () => {
      if (!analyzer || !dataArray) return;
      analyzer.getByteTimeDomainData(dataArray);

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 5; // **Thicker Line**
      ctx.strokeStyle = "#FFFFFF"; // **Solid White Color**
      ctx.beginPath();

      const sliceWidth = (canvas.width / bufferLength) * 5;
      let x = scrollOffset;

      for (let i = 0; i < bufferLength; i++) {
        const v = dataArray[i] / 128.0;
        const y = (v * canvas.height) / 2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
        x += sliceWidth;
      }

      ctx.stroke();

      scrollOffset -= 1;
      if (scrollOffset < -canvas.width) {
        scrollOffset = 0;
      }

      animationFrameId = requestAnimationFrame(drawWaveform);
    };

    drawWaveform();

    return () => cancelAnimationFrame(animationFrameId);
  }, [analyzer, dataArray, isPlaying]);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (!audioCtx) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      setAudioCtx(ctx);

      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();

      analyser.fftSize = 2048;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      source.connect(analyser);
      analyser.connect(ctx.destination);

      setAnalyzer(analyser);
      setBufferLength(bufferLength);
      setDataArray(dataArray);
    }

    if (audioRef.current.paused) {
      audioCtx?.resume(); // ✅ Resume the AudioContext after user gesture
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="border border-gray-500 mt-4"
      />
      <button
        onClick={handlePlayPause}
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
