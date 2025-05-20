"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import PortfolioThumbnail from "./components/PortfolioThumbnail";
import Navigation from "./components/Navigation";
import StaffSection from "./components/StaffSection";
import ServicesSection from "./components/ServicesSection";
// import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import { getEntities } from "../pages/api/entities";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Tag {
  sys: { id: string };
}

interface Project {
  fields: {
    title: string;
    shortDescription: string;
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

  const sortProjectsAlphabetically = (
    groupedProjects: Record<string, Project[]>
  ) => {
    Object.entries(groupedProjects).forEach((group) => {
      const [, projects] = group;
      projects.sort((a, b) => {
        return a.fields.title.localeCompare(b.fields.title);
      });
    });
  };

  useEffect(() => {
    ScrollTrigger.defaults({
      scroller: ".container-main",
      snap: {
        snapTo: 1, // snaps to every full panel (1 = whole number scroll)
        duration: 4.5, // how long it takes to snap (increase for more resistance)
        delay: 0.4, // how long to wait before snapping
        ease: "power3.inOut", // easing curve for natural deceleration
      },
    });
  }, []);

  useEffect(() => {
    if (!introDone) return;

    gsap.utils.toArray<HTMLElement>(".section-snap").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        scroller: ".container-main", // <—— This is the fix!
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: 1,
          duration: 1.5,
          delay: 0.1,
          ease: "power1.inOut",
        },
      });
    });

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
              acc[tag].push(item);
            });
            return acc;
          },
          {} as Record<string, Project[]>
        );

        sortProjectsAlphabetically(groupedProjects);

        setProjects(groupedProjects);
        const firstTag = Object.keys(groupedProjects).includes("film")
          ? "film"
          : Object.keys(groupedProjects)[0];

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
        <link rel="stylesheet" href="https://use.typekit.net/hqi1rdb.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
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

          {/* CONTENT */}
          <div className="container-main relative z-10">
            {/* HERO VIDEO */}
            <div className="section-snap relative z-10 h-screen overflow-hidden">
              <video
                src={videoUrl}
                autoPlay
                loop
                muted
                playsInline
                className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
              />
              {/* <div
                id="unicorn-hero"
                className="absolute top-0 left-0 w-full h-full z-20 unicorn-embed"
              /> */}
              <div className="block sm:hidden leading-none absolute top-1/2 left-1/2 w-3/4 text-md text-white text-glow-extra-small z-10 transform -translate-x-1/2">
                <p>
                  Strange Luck helps your audience fall in love with the world —
                  its sounds, its stories, its textures, its contradictions, its
                  juxtapositions, its surprises.
                </p>
              </div>
            </div>

            <section
              id="about"
              className="section-snap hidden sm:flex h-screen text-xl items-center justify-center relative overflow-hidden"
            >
              <div className="relative z-10 p-60 text-3xl text-glow-small">
                <p>
                  Strange Luck helps your audience fall in love with the world —
                  its sounds, its stories, its textures, its contradictions, its
                  juxtapositions, its surprises.
                </p>
              </div>
            </section>

            <section
              id="work"
              className="section-snap relative flex flex-col text-white py-10 px-10 sm:px-20 sm:pt-24 pb-20"
            >
              <div className="relative z-10">
                <span className="">
                  <h1 className="gradient-text blur-sm">Choose your path</h1>
                </span>

                <nav className="flex flex-wrap justify-center sm:justify-between p-1 mb-6">
                  <div className="flex flex-wrap text-md gap-3 sm:gap-4 sm:text-[32px]">
                    {Object.keys(CATEGORY_TO_TAG).map((category, idx, arr) => (
                      <div
                        key={category}
                        className="flex items-center gap-3 sm:gap-4"
                      >
                        <button
                          onClick={() => handleTagClick(category)}
                          className={`sl-list-item focus:text-[#DFFC3C]  focus:underline !hover:text-gray-400 cursor-[url('/hand_cursor.png'),_pointer] focus:decoration-[#DFFC3C] `}
                          style={{
                            WebkitTextFillColor:
                              selectedTag === CATEGORY_TO_TAG[category]
                                ? "#DFFC3C"
                                : "",
                            textDecoration:
                              selectedTag === CATEGORY_TO_TAG[category]
                                ? "underline"
                                : "none",
                            textDecorationColor:
                              selectedTag === CATEGORY_TO_TAG[category]
                                ? "#DFFC3C"
                                : "inherit",
                          }}
                        >
                          {category}
                        </button>
                        {idx !== arr.length - 1 && (
                          <span className="text-gray-400 text-glow-small">
                            |
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[42px] gap-y-[120px]">
                  {filteredItems.map((entity) => {
                    const asset = entity.fields;
                    return (
                      <PortfolioThumbnail
                        key={asset.slug}
                        title={asset.title}
                        shortDescription={asset.shortDescription}
                        url={asset.thumbnailUrl}
                        slug={asset.slug}
                      />
                    );
                  })}
                </div>
              </div>
            </section>

            <ServicesSection />
            <StaffSection />
            <section className="section-snap relative py-10 sm:py-0">
              <ContactSection />
              <Footer />
            </section>
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

const ContactSection = dynamic(() => import("./components/ContactSection"), {
  ssr: false,
});
