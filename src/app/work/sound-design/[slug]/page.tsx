"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAudioEntityBySlug } from "../../../../pages/api/audio";
import DescriptionOverlay from "../../../components/DescriptionOverlay";
import Image from "next/image";

export default function SoundDesign() {
  const { slug } = useParams();
  const [audioUrl, setAudioUrl] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState();
  const [error, setError] = useState<string | null>(null);
  //const req = "https://cdn.contentful.com/spaces/t86k561yagqf/environments/master/entries?access_token=2Zr43owZxrmzOCYvgwPnlz1kJ7iYH0TlaP1_qsfb4Ic&content_type=soundDesign"

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const res = await getAudioEntityBySlug(slug);

        if (!res) {
          setError("Audio file not found.");
        } else {
          const extractedThumbnailUrl =
            res.fields?.thumbnailUrl?.content?.[0]?.content?.[0]?.value || null;
          const extractedAudioUrl =
            res.fields?.fileUrl?.content?.[0]?.content?.[0]?.value || null;

          setThumbnailUrl(extractedThumbnailUrl);
          setAudioUrl(extractedAudioUrl);
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

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center p-10 bg-black text-white">
      {thumbnailUrl && (
        <Image
          src={thumbnailUrl}
          alt="Song Thumbnail"
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        />
      )}

      {audioUrl && (
        <audio controls autoPlay className="mt-5">
          <source src={audioUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}

      <DescriptionOverlay />
    </div>
  );
}
