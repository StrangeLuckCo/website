import Link from "next/link";

export default function Footer() {
  return (
    <footer className="hidden sm:flex justify-between w-full text-white px-10 py-14 text-xl">
      <Link
        href="mailto:hi@yourstrangeluck.com"
        className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
      >
        EMAIL
      </Link>
      <Link
        href="https://vimeo.com/strangeluck"
        className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        target="_blank"
      >
        VIMEO
      </Link>
      <Link
        href="https://www.instagram.com/yourstrangeluck/"
        className="hover:text-black hover:bg-[#dffc3c] cursor-[url('/hand_cursor.png'),_pointer]"
        target="_blank"
      >
        INSTAGRAM
      </Link>
    </footer>
  );
}
