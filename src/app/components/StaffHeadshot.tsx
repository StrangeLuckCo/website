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
      <div className="flex flex-col items-center sm:items-start gap-y-3">
        <div className="flex flex-col sm:flex-row gap-y-5 sm:gap-y-0 gap-x-5 sm:gap-x-10 items-center sm:items-start">
          <Image
            src={imageSrc}
            width={280}
            height={350}
            alt={altText}
            className="w-auto sm:w-1/3 h-auto"
          />
          <div className="flex flex-col gap-y-4 px-8 sm:px-0 leading-none">
            <div className="flex flex-col md:flex-row leading-none gap-3 md:items-center">
              <h2 className="sl-h2 sl-h2-mobile sl-h2-tablet blur-sm sm:blur-xs whitespace-nowrap">
                {name}
              </h2>
              <span className="hidden md:block sl-h2 blur-xs sm:blur-sm"> | </span>
              <h3 className="sm:hidden md:block sl-h3 sl-h3-mobile sl-h3-tablet blur-xs whitespace-nowrap">
                {title}
              </h3>
            </div>
            <h4 className="sl-h4 sl-h5-mobile sl-h5-tablet blur-xxs">
              {credits}
            </h4>
            <p className="sl-p sl-p-mobile blur-xxs">
              {bio}
            </p>
          </div>
        </div>
      </div>
    // </div>
  );
}
