"use client";
import React, { useState, useEffect } from "react";

import StaffSection from "./StaffSection";
import ServicesSection from "./ServicesSection";
import UpdatedContactSection from "./UpdatedContactSection";
import GradientVisibilityController from "./GradientVisibilityController";

import Footer from "./Footer";
import {
  isModernChrome,
  useUnicornEmbedding,
  //   useIsMobile,
} from "../utility/hooks";

export default function GradientBackgroundHomepageSections() {
  const [isReady, setIsReady] = useState(false);
  const [shouldShowUnicorn, setShouldShowUnicorn] = useState(false);

  useEffect(() => {
    // Run client-only logic after hydration
    setShouldShowUnicorn(isModernChrome());
    setIsReady(true);
  }, []);

  useUnicornEmbedding({
    elementId: "purple-red-gradient",
    filePath: "/Purple_Red_Gradient_Background.json.txt",
    altText: "Welcome to Strange Luck",
    ariaLabel: "Canvas animation scene",
  });

  return (
    <div>
      {/* Low-power fallback */}
      <div className="low-power-gradient" />

      {/* WebGL animation */}
      {shouldShowUnicorn && isReady && (
        <>
          <GradientVisibilityController />
          <div
            id="purple-red-gradient"
            className="animated-background fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-0"
          />
        </>
      )}

      <main className="section-snap relative z-0">
        <div id="gradient-trigger" className="relative top-[-35vh] h-[1px]" />
        <ServicesSection />
        <StaffSection />
        <section>
          <UpdatedContactSection />
          <Footer />
        </section>
      </main>
    </div>
  );
}
