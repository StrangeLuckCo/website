"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import PortfolioThumbnail from "./components/PortfolioThumbnail";
import Navigation from "./components/Navigation";
import { getEntities } from "../pages/api/entities";
import {
  JEN_HEADSHOT,
  JACKI_HEADSHOT,
  JESS_HEADSHOT,
} from "./utility/constants";

interface Tag {
  sys: {
    id: string;
  };
}

interface Project {
  fields: {
    title: string;
    description: string;
    thumbnailUrl: string;
    slug: string;
  };
  metadata?: {
    tags?: Tag[];
  };
}

const CATEGORY_TO_TAG: Record<string, string> = {
  Cinematography: "cinematography",
  Editing: "editing",
  Directing: "directing",
  "Sound Design": "soundDesign",
  "Art Direction": "artDirection",
};

export default function Home() {
  const [projects, setProjects] = useState<Record<string, Project[]>>({});
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const videoUrl =
    "https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/WEBSITE-REEL.mp4";
  // const logoUrl =
  //   "https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/StrangeLuck-Logo-VHS-Stacked-Round9-Transparent.png";

  console.log(error);
  // ✅ Group projects by tags (limit to 4 per tag)
  const groupByTags = (items: Project[]): Record<string, Project[]> => {
    return items.reduce((acc: Record<string, Project[]>, item: Project) => {
      const tags = item.metadata?.tags?.map((tag) => tag.sys.id) || [];

      tags.forEach((tag) => {
        if (!acc[tag]) acc[tag] = [];
        if (acc[tag].length < 4) acc[tag].push(item); // Keep only latest 4 per tag
      });

      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchEntities = async () => {
      try {
        const res: Project[] = await getEntities();
        if (!res) {
          setError("Entity not found.");
          return;
        }
        console.log("Fetched projects:", res);

        const groupedProjects = groupByTags(res);
        setProjects(groupedProjects);

        // ✅ Set default tag to first available tag
        const firstTag = Object.keys(groupedProjects)[0];
        setSelectedTag(firstTag);
        setFilteredItems(groupedProjects[firstTag] || []);
      } catch (err) {
        console.error("Error fetching entities:", err);
        setError("Failed to fetch entities. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEntities();
  }, []);

  const handleTagClick = (category: string) => {
    const tag = CATEGORY_TO_TAG[category];
    setSelectedTag(tag);
    setFilteredItems(projects[tag] || []);
  };

  return (
    <>
      {/* Preload the video */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      {/* Navigation Bar */}
      <Navigation />

      {/* Wrapper for full-screen video */}
      <div className="relative z-10 h-screen overflow-hidden">
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full sm:min-h-full w-full h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
        />

        {/* Mobile Content */}
        <div className="block sm:hidden leading-none absolute top-1/2 left-1/2 w-3/4 text-md text-black z-10 transform -translate-x-1/2">
          <p>
            Strange Luck helps your audience fall in love with the world — its
            sounds, its stories, its textures, its contradictions, its
            juxtapositions, its surprises. We approach our work through a
            documentary lens, crafting stories through art, design, and
            cinematic storytelling.
          </p>
        </div>

        {/* Content Overlay */}
        {/* <div className="relative h-[700px] sm:h-screen overflow-hidden">
          {!loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center text-white">
              <Image
                alt="demo"
                priority
                src={logoUrl}
                height={300}
                width={500}
                style={{ width: "auto", height: "auto" }}
                className="hidden sm:block drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
              />
            </div>
          )}
        </div> */}
      </div>

      <div className="relative z-10">
        <section
          id="about"
          className="hidden sm:flex min-h-24 text-xl items-center justify-center relative overflow-hidden"
        >
          {/* <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/VHSEdit.mp4" type="video/mp4" />
            <source src="/VHSEdit.mov" type="video/quicktime" />
            Your browser does not support the video tag.
          </video> */}
          <div className="relative h-screen z-10 p-60">
            <p>
              Strange Luck helps your audience fall in love with the world — its
              sounds, its stories, its textures, its contradictions, its
              juxtapositions, its surprises. We approach our work through a
              documentary lens, crafting stories through art, design, and
              cinematic storytelling.
            </p>
          </div>
        </section>

        {/* Work Section */}
        <section
          id="work"
          className="relative flex flex-col text-white py-10 px-10 sm:px-32 pb-20"
        >
          {/* Content Overlay */}
          <div className="relative z-10">
            <h2 className="text-2xl sm:text-4xl font-bold mb-4">
              CHOOSE YOUR PATH
            </h2>

            {/* Filter Navigation */}
            <nav className="flex flex-wrap justify-center sm:justify-between p-1 mb-6">
              <div className="flex flex-wrap gap-3 gap-y-0 leading-none sm:gap-6 text-md sm:text-xl">
                {Object.keys(CATEGORY_TO_TAG).map((category) => (
                  <button
                    key={category}
                    onClick={() => handleTagClick(category)}
                    className={`hover:text-gray-400 ${
                      selectedTag === CATEGORY_TO_TAG[category]
                        ? "font-bold underline"
                        : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </nav>

            {/* Render Filtered Projects */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-5">
              {filteredItems.map((entity) => {
                const asset = entity.fields;
                return (
                  <PortfolioThumbnail
                    key={asset.slug}
                    title={asset.title}
                    description={asset.description}
                    imgURL={asset.thumbnailUrl}
                    // slug={asset.slug}
                  />
                );
              })}
            </div>
          </div>
        </section>

        <section
          id="services"
          className="sm:min-h-screen flex flex-col p-12 py-6 pb-20 sm:pb-auto sm:p-20 gap-10 text-white"
        >
          <h2 className="text-3xl sm:text-6xl font-bold">Services</h2>
          <div className="flex flex-col justify-between sm:flex-row gap-10 sm:gap-40 text-xl">
            <div>
              <h3 className="text-5xl mb-5">Consulting</h3>
              <ul className="text-sm sm:text-xl">
                <li>Brand Strategy</li>
                <li>Creative Development and Direction</li>
                <li>Research and Insight</li>
              </ul>
            </div>
            <div>
              <h3 className="text-5xl mb-5">Production</h3>
              <ul className="text-sm sm:text-xl">
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
              <h3 className="text-5xl mb-5">Experiences</h3>
              <ul className="text-sm sm:text-xl">
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
          className="min-h-screen flex items-center justify-center text-white p-10"
        >
          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col items-center sm:items-start gap-3">
              <h3 className="hidden sm:block text-4xl mb-4">
                Jacki <br /> Huntington
              </h3>
              <h3 className="sm:hidden text-3xl mb-4">Jacki Huntington</h3>
              <Image
                src={JACKI_HEADSHOT}
                width={200}
                height={350}
                alt="Jacki Huntington"
              />
              <h4 className="self-start text-2xl sm:text-base sm:self-auto">
                CO-FOUNDER
              </h4>
              <p>DIRECTOR • CINEMATOGRAPHER • PRODUCER • WRITER</p>
              <p className="text-xs sm:text-base">
                Storytelling work has taken Jacki across continents and
                cultures, from the bustling streets of Port-au-Prince, Haiti, to
                the serene landscapes of the Mississippi Delta. With a
                background as a producer at Refinery29 working in New York City
                and Los Angeles, Jacki has pioneered groundbreaking feminist and
                body-positive video content that continues to shape the media
                industry&#39;s aesthetic. Jacki has worked as a producer,
                editor, and composer for a variety of podcasts including The
                City of the Rails, Under the Influence with Jo Piazza and Really
                Good Shares. These days, she is managing communications for the
                Center for Global Health at Mass General Brigham as she forges
                ahead with a handful of independent documentary film projects.
              </p>
            </div>
            <div>
              <div className="flex flex-col items-center sm:items-start gap-3">
                <h3 className="hidden sm:block text-4xl mb-4">
                  JESS DIPIERRO
                  <br />
                  OBERT
                </h3>
                <h3 className="sm:hidden text-2xl text-[28px] mb-4">
                  JESS DIPIERRO OBERT
                </h3>
                <Image
                  src={JESS_HEADSHOT}
                  width={200}
                  height={350}
                  alt="Jess DiPierro Obert"
                />
                <h4 className="self-start text-2xl sm:text-base sm:self-auto">
                  CO-FOUNDER
                </h4>
                <p>DIRECTOR • CINEMATOGRAPHER • PRODUCER • WRITER • EDITOR</p>
                <p className="text-xs sm:text-base">
                  Jess is an award-winning investigative visual journalist,
                  producer and filmmaker. She is focused on solution-based
                  storytelling, and has worked globally in countries like Haiti
                  since 2016. From 2018 to 2020, Jess led a series of workshops
                  for Girls Voices, a nonprofit organization that empowers young
                  girls globally to develop their media storytelling skills. She
                  received a ‘Still I Rise’ Visual Arts Grant to work on a film
                  about women peace builders in conflict zones within Port Au
                  Prince, Haiti, which premiered at FESPACO in Burkina Faso.
                  Jess’ work has been exhibited at Prix Bayeux
                  Calvados-Normandie and has received a Radio Television Digital
                  News Association (RTDNA) Murrow award and Vimeo Staff Pick.
                </p>
              </div>
            </div>
            <div>
              <div className="flex flex-col items-center sm:items-start gap-3">
                <h3 className="hidden sm:block text-4xl">
                  JEN <br /> NG
                </h3>
                <h3 className="sm:hidden text-3xl">JEN NG</h3>
                <Image
                  src={JEN_HEADSHOT}
                  width={200}
                  height={350}
                  alt="Jen Ng"
                />
                <h4 className="self-start text-2xl sm:text-base sm:self-auto">
                  CO-FOUNDER
                </h4>
                <p>
                  ART DIRECTOR • BRAND STRATEGIST • DESIGNER • STORY CONSULTANT
                </p>
                <p className="text-xs sm:text-base">
                  Jen’s world is a playground for human connection. Her lifelong
                  interest in art, media, and psychology has led her to work as
                  an art director, brand strategist, and experience designer for
                  clients with a story to tell. Projects range from design for
                  an oral history program to research and design for an
                  augmented reality immersive news app. She works on social
                  justice projects rooted in LGBTQIA+ issues, race, and youth
                  empowerment. Workshop design and facilitation create a nice
                  break from the screen, allowing her to take her digital skills
                  offline. Her ongoing work explores ways that story, identity,
                  and self-expression can work together to strengthen
                  communities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="sm:min-h-screen flex flex-col justify-center w-full text-white p-4 py-20 sm:p-10 gap-10"
        >
          <h2 className="flex justify-center text-3xl sm:text-5xl font-bold">
            LET&#39;S TALK
          </h2>
          <div className="flex flex-col sm:flex-row items-center w-full justify-evenly gap-12 sm:gap-auto">
            <div className="hidden sm:flex flex-1 justify-center">IMAGE</div>

            <div className="flex-1 flex flex-col max-w-[600px] w-full items-center px-6 text-white gap-12 sm:gap-auto">
              <form className="space-y-4 mb-10 w-full flex flex-col items-center">
                <div className="w-full">
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

                <div className="w-full">
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

                <div className="w-full">
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

                <button
                  type="submit"
                  className="w-40 h-16 bg-gray-700 hover:bg-gray-600 text-2xl text-gray-200 py-2 px-4 rounded-lg shadow-md"
                >
                  SEND
                </button>
              </form>
              <p>hi@strangeluck.com</p>
            </div>

            <div className="flex-1 flex flex-col items-center gap-12 sm:gap-10 text-2xl">
              <a>INSTAGRAM</a>
              <a>VIMEO</a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="hidden sm:block bg-black text-white text-center py-4">
          <div className="space-x-20 flex justify-center items-center h-16">
            <p>© 2025 STRANGE LUCK. All rights reserved.</p>
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms of Use
            </a>
          </div>
        </footer>
      </div>
      {/* Single Parallax Background Layer */}
      <div className="fixed top-0 left-0 w-full h-full z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/BlueVHS.mp4" type="video/mp4" />
          <source src="/BlueVHS.mov" type="video/quicktime" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* About Section */}
    </>
  );
}
