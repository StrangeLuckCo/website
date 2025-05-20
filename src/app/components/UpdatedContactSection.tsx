import Link from "next/link";

export default function UpdatedContactSection() {
  return (
    <section
      id="contact"
      className="z-10 h-screen flex flex-col items-center justify-center text-center"
    >
      <h2 className="sl-h2 blur-md w-4/5 mb-4">
        Want to fall in love with the world — its sounds, its stories, its
        textures, its contradictions, its juxtapositions, its surprises?
      </h2>
      <h3 className="sl-h3 blur-sm mb-6">
        A dream collaboration could be in your future.
      </h3>
      <Link href="mailto:hi@yourstrangeluck.com">
        <h1
          className="desktop-title blur-md mb-10 underline text-[#E6FC6D] cursor-[url('/hand_cursor.png'),_pointer]"
          style={{
            WebkitTextFillColor: "#DFFC3C",
            textDecorationColor: "#DFFC3C",
          }}
        >
          HI@YOURSTRANGELUCK.COM
        </h1>
      </Link>
      <p className="sl-p blur-sm mb-10">
        OFFER EXPIRES 6:00PM FEBRUARY 23, 2060
      </p>
      <h4 className="sl-h4 blur-sm mb-10">Continue your strange journey? </h4>
      <div className="flex flex-row gap-x-4">
        <Link
          href="https://vimeo.com/strangeluck"
          target="_blank"
          className="cursor-[url('/hand_cursor.png'),_pointer]"
        >
          <p
            className="sl-p text-[#E6FC6D] underline blur-xxs"
            style={{
              WebkitTextFillColor: "#DFFC3C",
              textDecorationColor: "#DFFC3C",
            }}
          >
            VIMEO
          </p>
        </Link>
        <Link
          href="https://www.instagram.com/yourstrangeluck/"
          target="_blank"
          className="cursor-[url('/hand_cursor.png'),_pointer]"
        >
          <p
            className="sl-p text-[#E6FC6D] underline blur-xxs"
            style={{
              WebkitTextFillColor: "#DFFC3C",
              textDecorationColor: "#DFFC3C",
            }}
          >
            INSTAGRAM
          </p>
        </Link>
      </div>
    </section>
  );
}
