"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import PortfolioThumbnail from "./components/PortfolioThumbnail";
import Navigation from "./components/Navigation";
import StaffSection from "./components/StaffSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { getEntities } from "../pages/api/entities";

interface Tag {
  sys: { id: string };
}

interface Project {
  fields: {
    title: string;
    description: string;
    thumbnailUrl: string;
    slug: string;
  };
  metadata?: { tags?: Tag[] };
}

const CATEGORY_TO_TAG: Record<string, string> = {
  Film: "film",
  Sound: "sound",
  Design: "design",
  Photo: "photo",
  Writing: "writing",
};

const IntroVideo = dynamic(() => import("./components/IntroVideo"), {
  ssr: false,
  loading: () => null,
});

export default function Home() {
  const [projects, setProjects] = useState<Record<string, Project[]>>({});
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredItems, setFilteredItems] = useState<Project[]>([]);
  // const [error, setError] = useState<string | null>(null);
  const [introDone, setIntroDone] = useState(false);

  const videoUrl =
    "https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/WEBSITE-REEL.mp4";

  useEffect(() => {
    if (!introDone) return;

    const fetchEntities = async () => {
      try {
        const res: Project[] = await getEntities();
        if (!res) {
          return;
        }

        const groupedProjects = res.reduce(
          (acc, item) => {
            const tags = item.metadata?.tags?.map((tag) => tag.sys.id) || [];
            tags.forEach((tag) => {
              if (!acc[tag]) acc[tag] = [];
              if (acc[tag].length < 4) acc[tag].push(item);
            });
            return acc;
          },
          {} as Record<string, Project[]>
        );

        setProjects(groupedProjects);
        const firstTag = Object.keys(groupedProjects)[0];
        setSelectedTag(firstTag);
        setFilteredItems(groupedProjects[firstTag] || []);
      } catch (err) {
        console.error("Error fetching entities:", err);
      }
    };

    fetchEntities();
  }, [introDone]);

  const handleTagClick = (category: string) => {
    const tag = CATEGORY_TO_TAG[category];
    setSelectedTag(tag);
    setFilteredItems(projects[tag] || []);
  };

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="preload"
          as="video"
          href="https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/LogoAnimation-WithTagline.mp4"
          type="video/mp4"
        />
      </Head>

      {!introDone ? (
        <IntroVideo onIntroEnd={() => setIntroDone(true)} />
      ) : (
        <>
          <Navigation />

          {/* HERO VIDEO */}
          <div className="relative z-10 h-screen overflow-hidden">
            <video
              src={videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
            />
            <div className="block sm:hidden leading-none absolute top-1/2 left-1/2 w-3/4 text-md text-black z-10 transform -translate-x-1/2">
              <p>
                Strange Luck helps your audience fall in love with the world —
                its sounds, its stories, its textures, its contradictions, its
                juxtapositions, its surprises.
              </p>
            </div>
          </div>

          {/* CONTENT */}
          <div className="relative z-10">
            <section
              id="about"
              className="hidden sm:flex min-h-24 text-xl items-center justify-center relative overflow-hidden"
            >
              <div className="relative h-screen z-10 p-60 text-3xl">
                <p>
                  Strange Luck helps your audience fall in love with the world —
                  its sounds, its stories, its textures, its contradictions, its
                  juxtapositions, its surprises.
                </p>
              </div>
            </section>

            <section
              id="work"
              className="relative flex flex-col text-white py-10 px-10 sm:px-32 pb-20"
            >
              <div className="relative z-10">
                <h1 className="text-2xl sm:text-4xl font-bold mb-4">
                  CHOOSE YOUR PATH
                </h1>

                <nav className="flex flex-wrap justify-center sm:justify-between p-1 mb-6">
                  <div className="flex flex-wrap gap-3 sm:gap-6 text-md sm:text-xl">
                    {Object.keys(CATEGORY_TO_TAG).map((category) => (
                      <button
                        key={category}
                        onClick={() => handleTagClick(category)}
                        className={`focus:text-[#FF23CB]  hover:text-gray-400  cursor-[url('/hand_cursor.png'),_pointer] ${
                          selectedTag === CATEGORY_TO_TAG[category]
                            ? "text-[#FF23CB] font-bold underline"
                            : ""
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </nav>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-5">
                  {filteredItems.map((entity) => {
                    const asset = entity.fields;
                    return (
                      <PortfolioThumbnail
                        key={asset.slug}
                        title={asset.title}
                        description={asset.description}
                        imgURL={asset.thumbnailUrl}
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
              <h1 className="text-3xl sm:text-6xl font-bold">Services</h1>
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

            <StaffSection />
            <ContactSection />
            <Footer />
          </div>

          {/* Parallax Background */}
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
        </>
      )}
    </>
  );
}
