import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
      document.documentElement.classList.add("safari");
    }
  }, []);

  const handleLogoClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash?: string
  ) => {
    e.preventDefault();

    if (pathname === "/") {
      if (hash) {
        const el = document.querySelector(`#${hash}`);
        el?.scrollIntoView();
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
    "https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/Logo-WIDE.svg";
  const logoGlow =
    "https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/Logo-WIDE-Glowing.svg";
  return (
    <nav className="hidden sm:flex h-[127px] absolute w-full text-#b6b7b9 justify-center items-center px-[94px] pt-[22px] pb-[62px] z-20 bg-nav-gradient backdrop-blur-sm">
      <div className="flex gap-x-[15px] md:gap-x-[45px] lg:gap-x-[100px] xl:gap-x-[156px] shrink-0 items-start sl-p2 blur-xs">
        <a
          href="#work"
          onClick={(e) => handleLogoClick(e, "work")}
          className="cursor-[url('/hand_cursor_2.png'),_pointer] hover-fill-neon hover:blur-xxs"
        >
          WORK
        </a>
        <a
          href="#services"
          onClick={(e) => handleLogoClick(e, "services")}
          className="cursor-[url('/hand_cursor_2.png'),_pointer] hover-fill-neon hover:blur-xxs"
        >
          SERVICES
        </a>
        <Link
          href="/"
          onClick={(e) => handleLogoClick(e)}
          className="cursor-[url('/hand_cursor_2.png'),_pointer]"
        >
          {/* SVG for most browsers */}
          <Image
            alt="Logo"
            priority
            src={hovered ? logoGlow : logo}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            height={51}
            width={267}
            className="logo-svg hidden sm:block"
            style={{ height: "auto" }}
          />

          {/* PNG fallback for Safari */}
          <Image
            alt="Logo PNG fallback"
            priority
            src={hovered ? "/Logo-glow.png" : "/Logo.png"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            height={51}
            width={267}
            className="logo-png hidden sm:block"
          />
        </Link>

        <a
          href="#staff"
          onClick={(e) => handleLogoClick(e, "staff")}
          className="cursor-[url('/hand_cursor_2.png'),_pointer] hover-fill-neon hover:blur-xxs"
        >
          ABOUT
        </a>
        <a
          // href="#contact"
          onClick={(e) => handleLogoClick(e, "contact")}
          className="cursor-[url('/hand_cursor_2.png'),_pointer] hover-fill-neon hover:blur-xxs"
        >
          CONTACT
        </a>
      </div>
    </nav>
  );
}
