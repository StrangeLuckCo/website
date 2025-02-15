"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import PortfolioThumbnail from "./components/PortfolioThumbnail";
import { getEntities } from "../pages/api/entities";

export default function Home() {
  const [imageEntity, setImageEntity] = useState({ URL: "" });
  const [error, setError] = useState<string | null>(null);

  const videoUrl =
    "https://strange-luck.s3.us-east-1.amazonaws.com/DRAFT-REEL-SLSTUDIO-20250102_v2.mp4";
  const logoUrl =
    "https://strange-luck.s3.us-east-1.amazonaws.com/VHS+TEXT-StrangeLuck-Transparent-9-glow.png";

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const res = await getEntities();
        console.log("app res: ", res);
        if (!res) {
          setError("Entity not found.");
        } else {
          setImageEntity(res);
        }
      } catch (err) {
        console.error("Error fetching entities:", err);
        setError("Failed to fetch entities. Please try again later.");
      }
    };

    fetchEntities();
  }, []);

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
        className="min-h-24 text-xl flex items-center justify-center bg-gray-900 text-white p-60"
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
        className="relative min-h-screen flex flex-col text-white py-10 px-32 pb-20"
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/BlueVHS.mp4" type="video/mp4" />
          <source src="/BlueVHS.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>

        {/* Content Overlay */}
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">CHOOSE YOUR PATH</h2>
          <nav className="flex justify-between p-1 mb-6">
            <div className="flex space-x-6">
              <a className="hover:text-gray-400">Cinematography</a>
              <span>|</span>
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
            {imageEntity?.URL && (
              <PortfolioThumbnail
                title={"TITLE"}
                description={
                  "Lena migrated with her family to Boston from Sudan, where she was born. She has since found her voice and a supportive community that allows her to be who she is in the summer camp programs put on by Crossroads. This series highlights young leaders on track for the C5 program at Crossroads Development."
                }
                imgURL={imageEntity.URL}
              />
            )}
            {imageEntity?.URL && (
              <PortfolioThumbnail
                title={"TITLE"}
                description={
                  "Lena migrated with her family to Boston from Sudan, where she was born. She has since found her voice and a supportive community that allows her to be who she is in the summer camp programs put on by Crossroads. This series highlights young leaders on track for the C5 program at Crossroads Development."
                }
                imgURL={imageEntity.URL}
              />
            )}
            {imageEntity?.URL && (
              <PortfolioThumbnail
                title={"TITLE"}
                description={
                  "Lena migrated with her family to Boston from Sudan, where she was born. She has since found her voice and a supportive community that allows her to be who she is in the summer camp programs put on by Crossroads. This series highlights young leaders on track for the C5 program at Crossroads Development."
                }
                imgURL={imageEntity.URL}
              />
            )}
            {imageEntity?.URL && (
              <PortfolioThumbnail
                title={"TITLE"}
                description={
                  "Lena migrated with her family to Boston from Sudan, where she was born. She has since found her voice and a supportive community that allows her to be who she is in the summer camp programs put on by Crossroads. This series highlights young leaders on track for the C5 program at Crossroads Development."
                }
                imgURL={imageEntity.URL}
              />
            )}
          </div>
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
            <h3 className="text-3xl underline mb-5">Consulting</h3>
            <ul>
              <li>Brand Strategy</li>
              <li>Creative Development and Direction</li>
              <li>Research and Insight</li>
            </ul>
          </div>
          <div>
            <h3 className="text-3xl underline mb-5">Production</h3>
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
            <h3 className="text-3xl underline mb-5">Experiences</h3>
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
        <div className="flex gap-10">
          <div className="flex flex-col gap-3">
            <h3 className="text-4xl mb-4">
              Jacki <br /> Huntington
            </h3>
            <Image
              src="/SL.png"
              width={200}
              height={350}
              alt="Jackie Huntington"
            />
            <h4>CO-FOUNDER</h4>
            <p>DIRECTOR • CINEMATOGRAPHER • PRODUCER • WRITER</p>
            <p>
              Storytelling work has taken Jacki across continents and cultures,
              from the bustling streets of Port-au-Prince, Haiti, to the serene
              landscapes of the Mississippi Delta. With a background as a
              producer at Refinery29 working in New York City and Los Angeles,
              Jacki has pioneered groundbreaking feminist and body-positive
              video content that continues to shape the media industry's
              aesthetic. Jacki has worked as a producer, editor, and composer
              for a variety of podcasts including The City of the Rails, Under
              the Influence with Jo Piazza and Really Good Shares. These days,
              she is managing communications for the Center for Global Health at
              Mass General Brigham as she forges ahead with a handful of
              independent documentary film projects.
            </p>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <h3 className="text-4xl mb-4">
                JESS DIPIERRO
                <br />
                OBERT
              </h3>
              <Image
                src="/SL.png"
                width={200}
                height={350}
                alt="Jess DiPierro Obert"
              />
              <h4>CO-FOUNDER</h4>
              <p>DIRECTOR • CINEMATOGRAPHER • PRODUCER • WRITER • EDITOR</p>
              <p>
                Jess is an award-winning investigative visual journalist,
                producer and filmmaker. She is focused on solution-based
                storytelling, and has worked globally in countries like Haiti
                since 2016. From 2018 to 2020, Jess led a series of workshops
                for Girls Voices, a nonprofit organization that empowers young
                girls globally to develop their media storytelling skills. She
                received a ‘Still I Rise’ Visual Arts Grant to work on a film
                about women peace builders in conflict zones within Port Au
                Prince, Haiti, which premiered at FESPACO in Burkina Faso. Jess’
                work has been exhibited at Prix Bayeux Calvados-Normandie and
                has received a Radio Television Digital News Association (RTDNA)
                Murrow award and Vimeo Staff Pick.
              </p>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-3">
              <h3 className="text-4xl">
                JEN <br /> NG
              </h3>
              <Image src="/SL.png" width={200} height={350} alt="Jen Ng" />
              <h4>CO-FOUNDER</h4>
              <p>
                ART DIRECTOR • BRAND STRATEGIST • DESIGNER • STORY CONSULTANT
              </p>
              <p>
                Jen’s world is a playground for human connection. Her lifelong
                interest in art, media, and psychology has led her to work as an
                art director, brand strategist, and experience designer for
                clients with a story to tell. Projects range from design for an
                oral history program to research and design for an augmented
                reality immersive news app. She works on social justice projects
                rooted in LGBTQIA+ issues, race, and youth empowerment. Workshop
                design and facilitation create a nice break from the screen,
                allowing her to take her digital skills offline. Her ongoing
                work explores ways that story, identity, and self-expression can
                work together to strengthen communities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="min-h-screen flex flex-col bg-gray-500 text-white p-10 gap-10"
      >
        <h2 className="flex justify-center text-5xl font-bold">
          LET&#39;S TALK
        </h2>
        <div className="flex items-center">
          <div>IMAGE</div>
          <div className="flex flex-col gap-4 items-center mx-auto p-6 text-white">
            <form className="space-y-4 w-[450px]">
              <div>
                <label
                  className="text-sm font-medium mb-1 hidden"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  placeholder="Full Name"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
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
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label
                  className="text-sm font-medium mb-1 hidden"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Tell us a bit about your dream project"
                  className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md"
              >
                SEND
              </button>
            </form>
            <p>hi@strangeluck.com</p>
          </div>

          <div className="flex flex-col items-center gap-10 text-2xl">
            <a>INSTAGRAM</a>
            <a>VIMEO</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white text-center py-4">
        <div className="space-x-4 flex justify-center">
          <p>© 2025 STRANGE LUCK. All rights reserved.</p>
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
