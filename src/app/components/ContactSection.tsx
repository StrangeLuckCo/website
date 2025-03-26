import Image from "next/image";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="sm:min-h-screen flex flex-col sm:flex-row items-center justify-center w-full text-white p-4 py-20 sm:p-10 gap-20"
    >
      <Image
        height={250}
        width={474}
        src="/psychic_hands.jpeg"
        alt="Hands of a fortune teller"
        className="hidden sm:block"
        priority
      />

      <div className="flex-1 flex flex-col max-w-[600px] w-full items-center px-6 text-white gap-12 sm:gap-auto">
        <form className="space-y-4 mb-10 w-full flex flex-col">
          <div className="flex w-full gap-x-3">
            <div className="w-1/2">
              <label className="text-sm font-medium mb-1 hidden" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Name"
                className="w-full p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="w-1/2">
              <label
                className="text-sm font-medium mb-1 hidden"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                className="w-full p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="w-full">
            <label
              className="text-sm font-medium mb-1 hidden"
              htmlFor="subject"
            >
              SUBJECT
            </label>
            <input
              type="subject"
              id="subject"
              placeholder="SUBJECT"
              className="w-full p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="w-full">
            <label
              className="text-sm font-medium mb-1 hidden"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              placeholder="Could a dream collaboration be in our future? Tell us more."
              className="w-full h-60 p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="self-center w-40 h-16 hover:bg-gray-600 text-2xl text-gray-200 py-2 px-4 "
          >
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
}
