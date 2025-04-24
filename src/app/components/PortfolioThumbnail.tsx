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
    <div className="flex flex-col gap-4 mb-2">
      <div className="w-full aspect-[4/3] relative overflow-hidden shadow-[2px_2px_13px_0px_#ffffffcc,_-2px_-2px_13px_0px_#ffffff] hover:shadow-[4px_4px_18px_1px_#E6FC6D,_-4px_-4px_18px_1px_#E6FC6D]">
        <Image
          alt="SL thumbnail"
          src={imgURL || "/SL.png"}
          fill
          className="object-cover "
        />
      </div>
      <h3 className="text-2xl sm:text-5xl text-glow">{title}</h3>
      <p className="hidden text-glow-extra-small sm:block">{description}</p>
    </div>
    // </Link>
  );
};

export default PortfolioThumbnail;
