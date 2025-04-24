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
    <div className="max-w-4xl">
      <div className="flex flex-col items-center sm:items-start gap-y-3">
        <div className="flex text-4xl sm:text-5xl leading-none gap-3 items-center text-glow-small">
          <h3>{name}</h3>
          <span> | </span>
          {/* <h3 className="sm:hidden text-3xl mb-4">{name}</h3> */}
          <h4>{title}</h4>
        </div>
        <div className="flex gap-x-4 items-center">
          <Image src={imageSrc} width={200} height={350} alt={altText} />
          <div className="flex flex-col gap-y-4 text-2xl leading-none text-glow-extra-small">
            <p>{credits}</p>
            <p className="text-xs sm:text-[22px] font-normal leading-none">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
