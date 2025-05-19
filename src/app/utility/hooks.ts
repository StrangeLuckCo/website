// hooks/useUnicornEmbedding.ts
"use client";

import { useState, useEffect } from "react";

export function isModernChrome(): boolean {
  if (typeof window === "undefined" || typeof navigator === "undefined")
    return false;

  const isChrome =
    /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);

  const hasWebGLSupport = (() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl");
      return !!gl;
    } catch {
      return false;
    }
  })();

  const isModern = hasWebGLSupport && window.devicePixelRatio >= 1;

  return isChrome && isModern;
}

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileView =
        /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        );
      setIsMobile(isMobileView);
    };

    checkMobile();
  }, []);

  return isMobile;
}

type UnicornConfig = {
  elementId: string;
  filePath: string;
  altText?: string;
  ariaLabel?: string;
};

export function useUnicornEmbedding({
  elementId,
  filePath,
  altText = "Welcome to Unicorn Studio",
  ariaLabel = "Canvas animation scene",
}: UnicornConfig) {
  useEffect(() => {
    if (!isModernChrome()) return;

    const scriptId = "unicornstudio-script";
    const scriptAlreadyExists = document.getElementById(scriptId);

    const initScene = () => {
      if (window.UnicornStudio) {
        window.UnicornStudio.addScene({
          elementId,
          filePath,
          lazyLoad: false,
          scale: 1,
          dpi: 1.5,
          altText,
          ariaLabel,
          interactivity: {
            mouse: {
              disableMobile: true,
            },
          },
        }).catch((err) => console.error("❌ UnicornStudio error:", err));
      }
    };

    const whenReady = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(initScene);
      } else {
        setTimeout(initScene, 200);
      }
    };

    if (window.UnicornStudio) {
      whenReady();
    } else if (!scriptAlreadyExists) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.19/dist/unicornStudio.umd.js";
      script.async = true;
      script.onload = () => {
        console.log("✅ UnicornStudio script loaded");
        whenReady();
      };
      document.body.appendChild(script);
    } else {
      // Script exists but UnicornStudio isn't yet available
      const waitForScript = setInterval(() => {
        if (window.UnicornStudio) {
          clearInterval(waitForScript);
          whenReady();
        }
      }, 50);
    }

    return () => {
      if (window.UnicornStudio?.destroy) {
        window.UnicornStudio.destroy();
      }
    };
  }, [elementId, filePath, altText, ariaLabel]);
}
