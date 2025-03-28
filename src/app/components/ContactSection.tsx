import Image from "next/image";
import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    description: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <section
      id="contact"
      className="sm:min-h-screen flex flex-col sm:flex-row items-center justify-center w-full text-white p-4 py-20 sm:p-10 gap-20"
    >
      <div className="hidden sm:block flex-grow-0">
        <Image
          height={400}
          width={600}
          src="/psychic_hand.gif"
          alt="Hand of a fortune teller"
          className="max-w-[250px] sm:max-w-[500px]"
          priority
        />
      </div>

      <div className="flex-1 flex flex-col max-w-[600px] w-full items-center px-6 text-white gap-12 sm:gap-auto">
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            // TODO -- add ENS records and re-enable email contact form submissions
            // const res = await fetch("/api/contact", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify(formData),
            // });

            // const result = await res.json();
            // console.log("res: ", result);
            // if (result.success) {
            //   e.currentTarget.reset();
            // } else {
            //   alert("Something went wrong. Please try again.");
            // }
          }}
          className="space-y-4 w-full flex flex-col"
        >
          <div className="flex w-full gap-x-3">
            <div className="w-1/2">
              <input
                type="text"
                id="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-1/2">
              <input
                type="email"
                id="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <input
            type="text"
            id="subject"
            placeholder="SUBJECT"
            value={formData.subject}
            onChange={handleChange}
            className="w-full p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <textarea
            id="description"
            placeholder="Could a dream collaboration be in our future? Tell us more."
            value={formData.description}
            onChange={handleChange}
            className="w-full h-60 p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="self-center w-40 h-16 hover:bg-gray-600 text-2xl text-gray-200 py-2 px-4"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </section>
  );
}
