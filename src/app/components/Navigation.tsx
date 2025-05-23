import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash?: string
  ) => {
    e.preventDefault();

    if (pathname === "/") {
      if (hash) {
        const el = document.querySelector(`#${hash}`);
        el?.scrollIntoView({ behavior: "smooth" });
      } else {
        document
          .querySelector(".container-main")
          ?.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push(`/?scrollTo=${hash}`);
    }
  };

  const logo =
    "https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/Logo-WIDE.png";
  return (
    <nav className="hidden sm:flex h-[127px] absolute w-full text-#b6b7b9 justify-center items-center px-[94px] pt-[22px] pb-[62px] z-20 bg-nav-gradient backdrop-blur-sm">
      <div className="flex gap-x-[156px] shrink-0 items-start sl-p2 blur-xs">
        <a
          href="#work"
          onClick={(e) => handleLogoClick(e, "work")}
          className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        >
          WORK
        </a>
        <a
          href="#services"
          onClick={(e) => handleLogoClick(e, "services")}
          className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        >
          SERVICES
        </a>
        <Link
          href="/"
          onClick={(e) => handleLogoClick(e)}
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
          onClick={(e) => handleLogoClick(e, "about")}
          className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        >
          ABOUT
        </a>
        <a
          href="#contact"
          onClick={(e) => handleLogoClick(e, "contact")}
          className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        >
          CONTACT
        </a>
      </div>
    </nav>
  );
}
