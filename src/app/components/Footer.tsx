import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden sm:flex justify-between w-full text-white px-10 py-14 text-xl">
      <Link href="mailto:hi@strangeluck.com">EMAIL</Link>
      <Link href="https://vimeo.com/strangeluck" target="_blank">
        VIMEO
      </Link>
      <Link href="https://www.instagram.com/yourstrangeluck/" target="_blank">
        INSTAGRAM
      </Link>
    </footer>
  );
}
