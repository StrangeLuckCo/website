import Image from "next/image";

const PortfolioThumbnail = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-4 max-w-[400px] mb-2">
      <Image
        alt="SL thumbnail"
        src={"/SL.png"}
        height={300}
        width={300}
        className="w-full max-h-[250px]"
      />
      <h3 className="text-2xl">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default PortfolioThumbnail;
