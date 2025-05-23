"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!menuRef.current) return;

    const el = menuRef.current;

    if (isOpen) {
      el.style.display = "flex";
      gsap.fromTo(
        el,
        { x: "100%" },
        {
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    } else {
      gsap.to(el, {
        x: "100%",
        duration: 0.5,
        ease: "power2.in",
        onComplete: () => {
          el.style.display = "none";
        },
      });
    }
  }, [isOpen]);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname === "/") {
      const el = document.querySelector(`#${hash}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      } else {
        // fallback to scrolling top if element not found
        document
          .querySelector(".container-main")
          ?.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      router.push(`/?scrollTo=${hash}`);
    }
  };

  const scrollToTop = (e) => {
    e.preventDefault();
    setIsOpen(false);

    if (pathname === "/") {
      document
        .querySelector(".container-main")
        ?.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      router.push("/?scrollTo=");
    }
  };

  return (
    <nav
      className="sm:hidden fixed top-0 left-0 w-full flex justify-between items-center z-30 pl-[14px] pr-[25px] py-3 text-white"
      style={{
        background:
          "linear-gradient(180deg, #0D0888 0%, #0D0888 26.92%, rgba(54, 56, 99, 0.00) 100%)",
      }}
    >
      <Link href="#" onClick={(e) => scrollToTop(e)}>
        <Image
          src={"/StrangeLuck-Logo-VHS-Wide.svg"}
          alt="Black background with 'Strange Luck: A Storytelling Studio' text"
          height={39}
          width={205}
          priority
        />
      </Link>
      <button
        className="mobile-nav-menu blur-xs"
        onClick={() => setIsOpen(true)}
      >
        MENU
      </button>

      <div
        ref={menuRef}
        className="fixed top-0 right-0 w-full h-full bg-black bg-custom-gradient text-white flex-col items-center hidden"
        style={{ transform: "translateX(100%)" }}
      >
        <Link href="#" onClick={(e) => scrollToTop(e)}>
          <Image
            src={"/StrangeLuck-Logo-VHS-Wide.svg"}
            alt="Black background with 'Strange Luck: A Storytelling Studio' text"
            height={39}
            width={205}
            priority
            className="absolute top-3 left-3.5 "
          />
        </Link>
        <button
          className="absolute top-6 right-6"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-6 w-6" />
        </button>

        <ul className="flex flex-col gap-3 mt-[125px] text-center">
          <Link
            href="#"
            onClick={(e) => scrollToTop(e)}
            className="sl-h1-mobile blur-sm mb-10"
            style={{ WebkitTextStrokeWidth: "0.75px" }}
          >
            Home
          </Link>
          <li>
            <Link
              href="#work"
              className="sl-h4-mobile blur-xs"
              style={{ WebkitTextStrokeWidth: "0.75px" }}
              onClick={(e) => handleNavClick(e, "work")}
            >
              WORK
            </Link>
          </li>
          <li>
            <Link
              href="#services"
              className="sl-h4-mobile blur-xs"
              style={{ WebkitTextStrokeWidth: "0.75px" }}
              onClick={(e) => handleNavClick(e, "services")}
            >
              SERVICES
            </Link>
          </li>
          <li>
            <Link
              href="#about"
              className="sl-h4-mobile blur-xs"
              style={{ WebkitTextStrokeWidth: "0.75px" }}
              onClick={(e) => handleNavClick(e, "about")}
            >
              ABOUT
            </Link>
          </li>
          <li>
            <Link
              href="#contact"
              className="sl-h4-mobile blur-xs"
              style={{ WebkitTextStrokeWidth: "0.75px" }}
              onClick={(e) => handleNavClick(e, "contact")}
            >
              CONTACT
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
