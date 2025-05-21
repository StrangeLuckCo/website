import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (pathname === "/") {
      document
        .querySelector(".container-main")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/");
    }
  };

  const logo =
    "https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/Logo-WIDE.png";
  return (
    <nav className="hidden sm:flex h-[127px] absolute w-full text-#b6b7b9 justify-center items-center px-[94px] pt-[22px] pb-[62px] z-20 bg-nav-gradient backdrop-blur-sm">
      <div className="flex gap-x-[156px] shrink-0 items-start sl-p2 blur-xs">
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
        <Link
          href="/"
          onClick={handleLogoClick}
          className="cursor-[url('/hand_cursor.png'),_pointer]"
        >
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
        <a
          href="#about"
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
