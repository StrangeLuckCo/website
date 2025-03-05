import Image from "next/image";
import Link from "next/link";

const PortfolioThumbnail = ({
  title,
  description,
  imgURL,
  slug,
  tag,
}: {
  title: string;
  description: string;
  imgURL: string;
  slug: string;
  tag: string;
}) => {
  return (
    <Link href={`/work/sound-design/${slug}`}>
      <div className="flex flex-col gap-4  mb-2">
        <Image
          alt="SL thumbnail"
          src={imgURL || "/SL.png"}
          height={300}
          width={300}
          className="w-full max-h-[180px] sm:max-h-[250px]"
        />
        <h3 className="text-2xl">{title}</h3>
        <p className="hidden sm:block">{description}</p>
      </div>
    </Link>
  );
};

export default PortfolioThumbnail;
