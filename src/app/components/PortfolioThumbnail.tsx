import Image from "next/image";
// import Link from "next/link";

const PortfolioThumbnail = ({
  title,
  description,
  imgURL,
}: // slug,
{
  title: string;
  description: string;
  imgURL: string;
  // slug: string;
}) => {
  return (
    // <Link href={`/work/sound-design/${slug}`}>
    <div className="flex flex-col gap-4  mb-2">
      <div className="w-full aspect-[4/3] relative overflow-hidden">
        <Image
          alt="SL thumbnail"
          src={imgURL || "/SL.png"}
          fill
          className="object-cover"
        />
      </div>
      <h3 className="text-2xl">{title}</h3>
      <p className="hidden sm:block">{description}</p>
    </div>
    // </Link>
  );
};

export default PortfolioThumbnail;
