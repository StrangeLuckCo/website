"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getAudioEntityBySlug } from "../../../../pages/api/audio";
import DescriptionOverlay from "../../../components/DescriptionOverlay";
import Image from "next/image";

export default function SoundDesign() {
  const { slug } = useParams();
  // const [audioUrl, setAudioUrl] = useState();
  const [audioMetadata, setAudioMetadata] = useState({
    markdownDescription: "",
    credits: "",
    thumbnailUrl: "",
    fileUrl: "",
  });
  // const [thumbnailUrl, setThumbnailUrl] = useState();
  const [error, setError] = useState<string | null>(null);
  //const req = "https://cdn.contentful.com/spaces/t86k561yagqf/environments/master/entries?access_token=2Zr43owZxrmzOCYvgwPnlz1kJ7iYH0TlaP1_qsfb4Ic&content_type=soundDesign"

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const res = await getAudioEntityBySlug(slug);
        console.log("res: ", res);

        if (!res || !res.fields) {
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

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center p-10 bg-black text-white">
      {audioMetadata.thumbnailUrl && (
        <Image
          src={audioMetadata.thumbnailUrl}
          alt="Song Thumbnail"
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        />
      )}

      {audioMetadata.fileUrl && (
        <audio controls autoPlay className="mt-5">
          <source src={audioMetadata.fileUrl} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      )}

      <DescriptionOverlay
        description={audioMetadata.markdownDescription}
        credits={audioMetadata.credits}
        image={audioMetadata.thumbnailUrl}
      />
    </div>
  );
}
