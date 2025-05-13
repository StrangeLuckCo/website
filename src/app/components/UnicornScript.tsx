// components/UnicornScript.tsx
"use client";

import { useEffect } from "react";

export default function UnicornScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.19/dist/unicornStudio.umd.js";
    script.async = true;

    script.onload = () => {
      console.log("✅ UnicornStudio script loaded");
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}
