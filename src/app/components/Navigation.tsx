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
    "https://strange-luck-website.s3.us-east-1.amazonaws.com/homepage_hero/Logo-WIDE.svg";
  const logoGlow =
    "https://strange-luck-website.s3.us-east-1.amazonaws.com/homepage_hero/Logo-WIDE-Glowing.svg";
  return (
    <nav className="hidden sm:block h-[77px] absolute w-full text-#b6b7b9 justify-center items-center pt-[22px] pb-[12px] z-20 bg-nav-gradient backdrop-blur-sm">
      {/*<div className="container-x flex gap-x-[15px] md:gap-x-[45px] lg:gap-x-[100px] xl:gap-x-[156px] shrink-0 items-center sl-p2">*/}
      <div className="container-x flex items-center sl-p2">
        <a
          href="#work"
          onClick={(e) => handleLogoClick(e, "work")}
          className="cursor-[url('/hand_cursor_2.png'),_pointer] hover-fill-neon blur-xs grow"
        >
          WORK
        </a>
        <a
          href="#services"
          onClick={(e) => handleLogoClick(e, "services")}
          className="cursor-[url('/hand_cursor_2.png'),_pointer] hover-fill-neon blur-xs grow"
        >
          SERVICES
        </a>
        <Link
          href="/"
          onClick={(e) => handleLogoClick(e)}
          className="cursor-[url('/hand_cursor_2.png'),_pointer] grow"
        >
          {/* SVG for most browsers */}

          <Image
            src={"/logo-white-yellow-01.svg"}
            alt="Black background with 'Strange Luck: A Storytelling Studio' text"
            height="100"
            width="267"
            priority
            className="sm:block h-auto blur-[1.0px] opacity-85"
            // className="blur-[1.25px] sm:blur-[2px] opacity-90 w-auto"
          />
        </Link>

        <a
          href="#staff"
          onClick={(e) => handleLogoClick(e, "staff")}
          className="cursor-[url('/hand_cursor_2.png'),_pointer] hover-fill-neon blur-xs grow"
        >
          ABOUT
        </a>
        <a
          // href="#contact"
          onClick={(e) => handleLogoClick(e, "contact")}
          className="cursor-[url('/hand_cursor_2.png'),_pointer] hover-fill-neon blur-xs"
        >
          CONTACT
        </a>
      </div>
    </nav>
  );
}

          {/*<Image
            alt="Logo"
            priority
            src={hovered ? logoGlow : logo}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            height={51}
            width={267}
            className="logo-svg hidden sm:block"
            style={{ height: "auto" }}
          />*/}

          {/* PNG fallback for Safari */}
          {/*<Image
            alt="Logo PNG fallback"
            priority
            src={hovered ? "/Logo-glow.png" : "/Logo.png"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            height={51}
            width={267}
            className="logo-png hidden sm:block"
          />*/}
