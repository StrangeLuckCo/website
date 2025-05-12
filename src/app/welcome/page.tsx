"use client";

import { useState } from "react";
import NewFooter from "../components/NewFooter";

export default function Welcome() {
  const [email, setEmail] = useState("");

  return (
    <div className="pt-20 flex flex-col items-center">
      <h2 className="text-glow text-white text-5xl">
        A new, strange feature is coming soon.
      </h2>
      <h2 className="text-glow text-white text-5xl">Don&#39;t miss it.</h2>

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
          className=""
          required
        />
        <input type="submit" value="SUBMIT" className="" />
      </form>
      <NewFooter />
    </div>
  );
}
