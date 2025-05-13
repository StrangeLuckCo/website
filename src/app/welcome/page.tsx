"use client";

import { useState, useEffect } from "react";
import NewFooter from "../components/NewFooter";

declare global {
  interface Window {
    UnicornStudio: {
      addScene: (config: unknown) => Promise<unknown>;
      destroy: () => void;
    };
  }
}

export default function Welcome() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (window.UnicornStudio) {
        console.log("UnicornStudio loaded, initializing...");
        window.UnicornStudio.addScene({
          elementId: "unicorn-welcome",
          filePath: "/Cursor_Footer_Welcome_Page.json.txt",
          lazyLoad: false,
          scale: 1,
          dpi: 1.5,
          altText: "Welcome to Strange Luck",
          ariaLabel: "This is a canvas scene",
          interactivity: {
            mouse: {
              disableMobile: true,
            },
          },
        }).catch((err) => console.error("UnicornStudio error", err));

        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col  justify-center items-center">
      <div className="relative pt-[110px] flex flex-col z-20 gap-y-[120px] w-4/5 items-center">
        <h2 className="eighties-glow text-5xl">
          A new, strange feature is coming soon.
        </h2>

        <div className="flex flex-col w-full justify-center items-center gap-y-8">
          <h3 className="sl-h3 eighties-glow text-5xl">Don&#39;t miss it.</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();

              const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(email),
              });

              const result = await res.json();
              if (result.success) {
                console.log("Message sent successfully");
              } else {
                alert("Something went wrong. Please try again.");
              }
            }}
            className="w-full border-2 border-[#D9D9D9] flex justify-between max-w-[650px] h-full items-stretch"
          >
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => {
                console.log(email);
                setEmail(e.target.value);
              }}
              className="sl-p desktop-body input-box-glow w-4/5 flex flex-1 bg-black p-2 cursor-[url('/hand_cursor.png'),_pointer]"
              required
            />
            <input
              type="submit"
              value="Submit"
              className="bg-[#D9D9D9] menu-glow menu-glow-blur !text-sm !font-medium px-[25px] text-black cursor-[url('/hand_cursor.png'),_pointer]"
            />
          </form>
        </div>
        {/* <NewFooter /> */}
      </div>
      <div
        id="unicorn-welcome"
        className="absolute top-0 left-0 w-full min-h-[700px] h-full z-0 unicorn-embed"
      />
    </div>
  );
}
