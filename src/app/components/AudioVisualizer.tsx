"use client";
import { useEffect, useRef, useState } from "react";

interface AudioVisualizerProps {
  audioRef: React.RefObject<HTMLAudioElement>;
}

export default function AudioVisualizer({ audioRef }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const [bufferLength, setBufferLength] = useState<number>(0);
  const [dataArray, setDataArray] = useState<Uint8Array | null>(null);

  // **Ensure AudioContext is created only when audio starts playing**
  useEffect(() => {
    const handleAudioPlay = () => {
      if (!audioRef.current || audioCtxRef.current) return;

      // ✅ Create AudioContext inside user interaction
      audioCtxRef.current = new (window.AudioContext ||
        window.webkitAudioContext)();
      analyserRef.current = audioCtxRef.current.createAnalyser();
      analyserRef.current.fftSize = 2048;

      setBufferLength(analyserRef.current.frequencyBinCount);
      setDataArray(new Uint8Array(analyserRef.current.frequencyBinCount));

      // ✅ Create MediaElementSource **only once**
      if (!sourceRef.current) {
        sourceRef.current = audioCtxRef.current.createMediaElementSource(
          audioRef.current
        );
        sourceRef.current.connect(analyserRef.current);
        analyserRef.current.connect(audioCtxRef.current.destination);
      }
    };

    audioRef.current?.addEventListener("play", handleAudioPlay);
    return () => audioRef.current?.removeEventListener("play", handleAudioPlay);
  }, [audioRef]);

  // **Waveform Drawing Effect**
  useEffect(() => {
    if (!analyserRef.current || !canvasRef.current || !dataArray) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const drawWaveform = () => {
      if (!analyserRef.current || !dataArray) return;
      analyserRef.current.getByteTimeDomainData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.lineWidth = 5;
      ctx.strokeStyle = "#FFFFFF";
      ctx.beginPath();

      const sliceWidth = canvas.width / bufferLength;
      let x = 0;

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
      animationFrameId = requestAnimationFrame(drawWaveform);
    };

    drawWaveform();

    return () => cancelAnimationFrame(animationFrameId);
  }, [dataArray, bufferLength]);

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={800}
        height={200}
        className="border border-gray-500 mt-4"
      />
    </div>
  );
}
