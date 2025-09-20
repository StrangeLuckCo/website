"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const PortfolioThumbnail = ({
  title,
  shortDescription,
  url,
  slug,
}: {
  title: string;
  shortDescription: string;
  url: string;
  slug: string;
}) => {
  const router = useRouter();
  const isVideo = url?.toLowerCase().endsWith(".mp4");

  return (
    <div className="flex flex-col gap-y-4" onClick={() => router.push(`/${slug}`)}>
      <div className="w-full aspect-[4/3] mb-4 relative overflow-hidden glow-with-hover">
        {isVideo ? (
          <video
            src={url}
            autoPlay
            loop
            muted
            playsInline
            className="portfolio-thumbnail absolute top-0 left-0 w-full h-full object-cover"
          />
        ) : (
          <Image
            alt="SL thumbnail"
            src={url || "/SL.png"}
            fill
            className="object-cover"
            unoptimized={url?.toLowerCase().endsWith(".gif")}
          />
        )}
      </div>
      <h2 className="sl-h2 sl-h2-mobile sl-h2-tablet blur-sm sm:blur-xs">
        {title}
      </h2>
      <p className="sl-p sl-p-mobile blur-xxs">{shortDescription}</p>
    </div>
  );
};

export default PortfolioThumbnail;
