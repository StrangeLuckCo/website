import Image from "next/image";

const FilmThumbnail = ({ src }: { src: string }) => {
  return (
    <>
      <Image src={src} width={340} height={493} alt="Movie poster" />
    </>
  );
};

export default FilmThumbnail;
