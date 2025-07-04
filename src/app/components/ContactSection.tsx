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
    <section id="contact" className="text-white sm:pt-20">
      <h1 className="pl-4 sm:pl-20 text-3xl sm:text-5xl text-glow-extra-small sm:text-glow">
        Contact
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-center w-full p-4 gap-20">
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

              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
              });

              const result = await res.json();
              if (result.success) {
                console.log("Message sent successfully");
              } else {
                alert("Something went wrong. Please try again.");
              }
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
                  className="w-full p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-[url('/hand_cursor_2.png'),_pointer]"
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
                  className="w-full p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-[url('/hand_cursor_2.png'),_pointer]"
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
              className="w-full p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-[url('/hand_cursor_2.png'),_pointer]"
              required
            />

            <textarea
              id="description"
              placeholder="Could a dream collaboration be in our future? Tell us more."
              value={formData.description}
              onChange={handleChange}
              className="w-full h-60 p-2 bg-transparent border border-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-[url('/hand_cursor_2.png'),_pointer]"
              required
            />

            <input
              type="submit"
              value="SUBMIT"
              className="self-center w-40 h-16 hover:bg-gray-600 text-2xl text-gray-200 py-2 px-4  cursor-[url('/hand_cursor_2.png'),_pointer]"
            />
          </form>
        </div>
      </div>
    </section>
  );
}
