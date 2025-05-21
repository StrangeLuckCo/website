import Image from "next/image";

const FilmThumbnail = ({ src }: { src: string }) => {
  return (
    <div className="w-full overflow-hidden">
      <Image
        src={src}
        alt="Movie poster"
        width={0}
        height={0}
        sizes="100vw"
        style={{ boxShadow: "-5px 6px 14px 0px #000" }}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default FilmThumbnail;
