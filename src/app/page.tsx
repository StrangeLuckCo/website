import React from "react";
import Head from "next/head";
import Image from "next/image";
import PortfolioThumbnail from "./components/PortfolioThumbnail";

export default async function Home() {
  const videoUrl =
    "https://strange-luck.s3.us-east-1.amazonaws.com/DRAFT-REEL-SLSTUDIO-20250102_v2.mp4";
  const logoUrl =
    "https://strange-luck.s3.us-east-1.amazonaws.com/VHS+TEXT-StrangeLuck-Transparent-9-glow.png";

  return (
    <>
      {/* Preload the video */}
      <Head>
        <link rel="preload" as="video" href={videoUrl} />
      </Head>

      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 w-full bg-black bg-opacity-70 text-white flex justify-between items-center p-4 z-20">
        <div className="flex space-x-6">
          <a href="#about" className="hover:text-gray-400">
            About
          </a>
          <a href="#work" className="hover:text-gray-400">
            Work
          </a>
          <a href="#services" className="hover:text-gray-400">
            Services
          </a>
        </div>
        <a
          href="#contact"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Contact
        </a>
      </nav>

      {/* Wrapper for full-screen video */}
      <div className="relative h-screen overflow-hidden">
        {/* Background Video */}
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover z-[-1]"
        />

        {/* Content Overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
          <Image
            alt="demo"
            src={logoUrl}
            height={300}
            width={500}
            className="max-w-[500px] drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
          />
        </div>
      </div>

      {/* About Section */}
      <section
        id="about"
        className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-10"
      >
        <p>
          Strange Luck helps your audience fall in love with the world — its
          sounds, its stories, its textures, its contradictions, its
          juxtapositions, its surprises. We approach our work through a
          documentary lens, crafting stories through art, design, and cinematic
          storytelling.
        </p>
      </section>

      {/* Work Section */}
      <section
        id="work"
        className="min-h-screen flex flex-col bg-gray-800 text-white p-10"
      >
        <h2 className="text-4xl font-bold">CHOOSE YOUR PATH</h2>
        <nav className="flex justify-between p-1">
          <div className="flex space-x-6">
            <a className="hover:text-gray-400">Cinematography</a> <span>|</span>
            <a className="hover:text-gray-400">Editing</a>
            <span>|</span>
            <a className="hover:text-gray-400">Directing</a>
            <span>|</span>
            <a className="hover:text-gray-400">Sound Design</a>
            <span>|</span>
            <a className="hover:text-gray-400">Art Direction</a>
          </div>
        </nav>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <PortfolioThumbnail
            title={"Title"}
            description={
              "Lena migrated with her family to Boston from Sudan, where she was born. She has since found her voice and a supportive community that allows her to be who she is in the summer camp programs put on by Crossroads. This series highlights young leaders on track for the C5 program at Crossroads Development."
            }
          />
          <PortfolioThumbnail
            title={"Title"}
            description={
              "Lena migrated with her family to Boston from Sudan, where she was born. She has since found her voice and a supportive community that allows her to be who she is in the summer camp programs put on by Crossroads. This series highlights young leaders on track for the C5 program at Crossroads Development."
            }
          />
          <PortfolioThumbnail
            title={"Title"}
            description={
              "Lena migrated with her family to Boston from Sudan, where she was born. She has since found her voice and a supportive community that allows her to be who she is in the summer camp programs put on by Crossroads. This series highlights young leaders on track for the C5 program at Crossroads Development."
            }
          />
          <PortfolioThumbnail
            title={"Title"}
            description={
              "Lena migrated with her family to Boston from Sudan, where she was born. She has since found her voice and a supportive community that allows her to be who she is in the summer camp programs put on by Crossroads. This series highlights young leaders on track for the C5 program at Crossroads Development."
            }
          />
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="min-h-screen flex flex-col p-20 gap-10 bg-gray-700 text-white"
      >
        <h2 className="text-6xl font-bold">Services</h2>
        <div className="flex gap-40 text-xl">
          <div>
            <h3>Consulting</h3>
            <ul>
              <li>Brand Strategy</li>
              <li>Creative Development and Direction</li>
              <li>Research and Insight</li>
            </ul>
          </div>
          <div>
            <h3>Production</h3>
            <ul>
              <li>Audio Podcast</li>
              <li>Production</li>
              <li>Brand Identity and Graphic Design</li>
              <li>Commercial Content Creation Documentary</li>
              <li>Music Videos</li>
              <li>Photography</li>
              <li>Post-Production</li>
            </ul>
          </div>
          <div>
            <h3>Experiences</h3>
            <ul>
              <li>Curation and Exhibition</li>
              <li>Immersive Media</li>
              <li>Social and Cultural Campaigns</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Staff Section */}
      <section
        id="staff"
        className="min-h-screen flex items-center justify-center bg-gray-600 text-white p-10"
      >
        <h2 className="text-4xl font-bold">Meet the Staff</h2>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center bg-gray-500 text-white p-10"
      >
        <h2 className="text-4xl font-bold">Contact Us</h2>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4">
        <div className="space-x-4">
          <a href="#" className="hover:text-gray-400">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-gray-400">
            Terms of Use
          </a>
        </div>
      </footer>
    </>
  );
}
