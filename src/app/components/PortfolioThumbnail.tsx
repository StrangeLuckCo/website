import Image from "next/image";

const PortfolioThumbnail = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <Image alt="SL thumbnail" src={"/SL.png"} height={300} width={300} />
      <h3 className="text-2xl">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default PortfolioThumbnail;
