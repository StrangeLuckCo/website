import Image from "next/image";

const PortfolioThumbnail = ({
  title,
  description,
  imgURL,
}: {
  title: string;
  description: string;
  imgURL: string;
}) => {
  return (
    <div className="flex flex-col gap-4  mb-2">
      <Image
        alt="SL thumbnail"
        src={imgURL || "/SL.png"}
        height={300}
        width={300}
        className="w-full max-h-[250px]"
      />
      <h3 className="text-2xl">{title}</h3>
      <p className="hidden sm:block">{description}</p>
    </div>
  );
};

export default PortfolioThumbnail;
