import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  const logo =
    "https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/Logo-WIDE.png";
  return (
    <nav className="hidden sm:flex fixed top-0 left-0 w-full text-#b6b7b9 justify-between items-center px-12 py-10 z-20">
      <Link href="/" className="cursor-[url('/hand_cursor.png'),_pointer]">
        <Image
          alt="demo"
          priority
          src={logo}
          height={51}
          width={267}
          style={{ width: "267px", height: "auto" }}
          className="hidden sm:block "
        />
      </Link>
      <div className="flex space-x-4 text-2xl bold text-glow-extra-small">
        <a
          href="#work"
          className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        >
          Work
        </a>
        <a
          href="#services"
          className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        >
          Services
        </a>
        <a
          href="#staff"
          className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        >
          About
        </a>
        <a
          href="#contact"
          className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        >
          Contact
        </a>
      </div>
    </nav>
  );
}
