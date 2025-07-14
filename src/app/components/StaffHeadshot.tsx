import Image from "next/image";

export default function StaffHeadshot({
  imageSrc,
  altText,
  name,
  title,
  credits,
  bio,
}: {
  imageSrc: string;
  altText: string;
  name: string;
  title: string;
  credits: string;
  bio: string;
}) {
  return (
    <div className="max-w-5xl">
      <div className="flex flex-col items-center sm:items-start gap-y-3">
        <div className="flex flex-col sm:flex-row text-4xl sm:text-5xl leading-none gap-3 items-center">
          <h2 className="sl-h2 sl-h2-mobile blur-xs sm:blur-sm">{name}</h2>
          <span className="hidden sm:block sl-h2 blur-xs sm:blur-sm"> | </span>
          <h2 className="sl-h2 sl-h3-mobile blur-xs sm:blur-sm">{title}</h2>
        </div>
        <div className="flex flex-col sm:flex-row gap-y-4 sm:gap-y-0 gap-x-4 sm:gap-x-[31px] items-center sm:items-start">
          <Image src={imageSrc} width={280} height={350} alt={altText} />
          <div className="flex flex-col gap-y-4 px-8 sm:px-0 text-2xl leading-none">
            <h4 className="sl-h4 sl-h4-mobile blur-sm">{credits}</h4>
            <p className="text-xs sl-p sl-p-mobile font-normal leading-none blur-xs">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
