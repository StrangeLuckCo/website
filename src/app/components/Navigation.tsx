import Image from "next/image";

export default function Navigation() {
  const logo =
    "https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/Logo-WIDE.png";
  return (
    <nav className="hidden sm:flex fixed top-0 left-0 w-full text-#b6b7b9 justify-between items-center px-12 py-10 z-20">
      <Image
        alt="demo"
        priority
        src={logo}
        height={51}
        width={267}
        style={{ width: "267px", height: "auto" }}
        className="hidden sm:block "
      />
      <div className="flex space-x-4 text-2xl bold">
        <a href="#work" className="hover:text-gray-400">
          Work
        </a>
        <a href="#services" className="hover:text-gray-400">
          Services
        </a>
        <a href="#about" className="hover:text-gray-400">
          About
        </a>
        <a href="#contact" className="hover:text-gray-400">
          Contact
        </a>
      </div>
    </nav>
  );
}
