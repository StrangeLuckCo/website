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
    <div className="flex flex-col mb-2" onClick={() => router.push(`/${slug}`)}>
      <div className="w-full aspect-[4/3] mb-[32px] relative overflow-hidden shadow-[2px_2px_13px_0px_#ffffffcc,_-2px_-2px_13px_0px_#ffffff] hover:shadow-[4px_4px_18px_1px_#E6FC6D,_-4px_-4px_18px_1px_#E6FC6D]">
        {isVideo ? (
          <video
            src={url}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
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
      <h2 className="text-2xl sl-h2 sl-h2-mobile blur-sm sm:blur-xs mb-[12px]">
        {title}
      </h2>
      <p className="sl-p sl-p-mobile blur-xs">{shortDescription}</p>
    </div>
  );
};

export default PortfolioThumbnail;
