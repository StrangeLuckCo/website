import Image from "next/image";

const PortfolioThumbnail = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div>
      <Image alt="SL thumbnail" src={"/SL.png"} height={300} width={300} />
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default PortfolioThumbnail;
