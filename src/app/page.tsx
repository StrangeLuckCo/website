"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import PortfolioThumbnail from "./components/PortfolioThumbnail";
import Navigation from "./components/Navigation";
import MobileNav from "./components/MobileNav";
import GradientBackgroundHomepageSections from "./components/GradientBackgroundHomepageSections";
import { getEntities } from "../pages/api/entities";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollHandler from "./components/ScrollHandler";
import ScrollTargetSetter from "./components/ScrollTargetSetter";
// import { useIsMobile } from "./utility/hooks";

gsap.registerPlugin(ScrollTrigger);

interface Tag {
  sys: { id: string };
}

interface Project {
  fields: {
    title: string;
    thumbnailRanking: number;
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
  const [introReady, setIntroReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const hasUserScrolledRef = useRef(false);
  const [scrollTarget, setScrollTarget] = useState<string | null | undefined>(
    null
  );
  // const [isReady, setIsReady] = useState(false);
  // const [shouldShowUnicorn, setShouldShowUnicorn] = useState(false);
  // const isMobile = useIsMobile();

  useEffect(() => {
    const container = document.querySelector(".container-main");
    if (!container) return;

    const onScroll = () => {
      hasUserScrolledRef.current = true;
      container.removeEventListener("scroll", onScroll);
    };

    container.addEventListener("scroll", onScroll, { passive: true });

    return () => container.removeEventListener("scroll", onScroll);
  }, [introDone]);

  <Suspense fallback={null}>
    <ScrollTargetSetter setScrollTarget={setScrollTarget} />
  </Suspense>;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const played = localStorage.getItem("introPlayed") === "true";
      setIntroDone(played);
      setIntroReady(true); // ✅ we now know whether to show the intro
    }
  }, []);

  useEffect(() => {
    if (!introDone || !scrollTarget) return;

    const el = document.getElementById(scrollTarget);
    if (!el) return;

    // Try a layout-stable observer
    const ro = new ResizeObserver(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    ro.observe(document.body);

    const timeout = setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      ro.disconnect();
    }, 1000);

    return () => {
      ro.disconnect();
      clearTimeout(timeout);
    };
  }, [introDone, scrollTarget]);

  const heroVideo = () => {
    return (
      <video
        src="https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/REEL-WEBSITE-SLSTUDIO-NOSOUND-16x9-20250701_FORSITE.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/lowres-placeholder.png"
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
      />
    );
  };
  // Sort by thumbnail ranking first, then alphabetically second
  const sortProjects = (groupedProjects: Record<string, Project[]>) => {
    Object.entries(groupedProjects).forEach((group) => {
      const [, projects] = group;
      projects.sort((a, b) => {
        return (
          a.fields.thumbnailRanking - b.fields.thumbnailRanking ||
          a.fields.title.localeCompare(b.fields.title)
        );
      });
    });
  };

  useEffect(() => {
    ScrollTrigger.defaults({
      scroller: ".container-main",
    });
  }, []);

  useEffect(() => {
    if (!introDone) return;

    const fetchEntities = async () => {
      try {
        const res: Project[] = await getEntities();
        if (!res) return;

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

        sortProjects(groupedProjects);

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

  useEffect(() => {
    if (!introDone) return;

    const aboutVideo = document.getElementById(
      "about-video"
    ) as HTMLVideoElement;
    const about2Video = document.getElementById(
      "about2-video"
    ) as HTMLVideoElement;

    ScrollTrigger.create({
      trigger: "#about",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (hasUserScrolledRef.current) aboutVideo?.play();
      },
      onLeave: () => {
        if (hasUserScrolledRef.current) aboutVideo?.pause();
      },
      onEnterBack: () => {
        if (hasUserScrolledRef.current) aboutVideo?.play();
      },
      onLeaveBack: () => {
        if (hasUserScrolledRef.current) aboutVideo?.pause();
      },
    });

    ScrollTrigger.create({
      trigger: "#about-2",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (hasUserScrolledRef.current) about2Video?.play();
      },
      onLeave: () => {
        if (hasUserScrolledRef.current) about2Video?.pause();
      },
      onEnterBack: () => {
        if (hasUserScrolledRef.current) about2Video?.play();
      },
      onLeaveBack: () => {
        if (hasUserScrolledRef.current) about2Video?.pause();
      },
    });

    const workVideo = document.getElementById("work-video") as HTMLVideoElement;

    ScrollTrigger.create({
      trigger: "#work",
      start: "top center",
      end: "bottom center",
      onEnter: () => {
        if (hasUserScrolledRef.current) workVideo?.play();
      },
      onLeave: () => {
        if (hasUserScrolledRef.current) workVideo?.pause();
      },
      onEnterBack: () => {
        if (hasUserScrolledRef.current) workVideo?.play();
      },
      onLeaveBack: () => {
        if (hasUserScrolledRef.current) workVideo?.pause();
      },
    });

    const waitForThumbnails = () => {
      const videos = document.querySelectorAll(
        ".portfolio-thumbnail"
      ) as NodeListOf<HTMLVideoElement>;

      let loadedCount = 0;

      videos.forEach((video) => {
        if (video.readyState >= 2) {
          loadedCount++;
        } else {
          video.addEventListener("loadeddata", () => {
            loadedCount++;
            if (loadedCount === videos.length) {
              setTimeout(() => {
                ScrollTrigger.refresh();
              }, 100); // slight delay ensures layout stabilizes
            }
          });
        }
      });

      // If all already loaded
      if (loadedCount === videos.length) {
        setTimeout(() => {
          ScrollTrigger.refresh();
        }, 100);
      }
    };

    waitForThumbnails();
  }, [introDone, projects]);

  const handleTagClick = (category: string) => {
    const tag = CATEGORY_TO_TAG[category];
    setSelectedTag(tag);

    const items = projects[tag] || [];

    console.log(items);
    const sortedItems = [...items].sort((a, b) => {
      console.log(
        a.fields.thumbnailRanking,
        b.fields.thumbnailRanking,
        a.fields.title,
        b.fields.title
      );
      return (
        a.fields.thumbnailRanking - b.fields.thumbnailRanking ||
        a.fields.title.localeCompare(b.fields.title)
      );
    });

    setFilteredItems(sortedItems);
  };

  // useEffect(() => {
  //   // Run client-only logic after hydration
  //   setShouldShowUnicorn(isModernChrome() && !isMobile);
  //   // setIsReady(true);
  // }, [isMobile]);

  // useUnicornEmbedding({
  //   elementId: "unicorn-hero",
  //   filePath: "/16x9Mouse_Shader_Background.json.txt",
  //   altText: "Welcome to Strange Luck",
  //   ariaLabel: "Canvas animation scene",
  // });

  if (!introReady) return null;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://use.typekit.net/hqi1rdb.css" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          // rel="preload"
          as="video"
          href="https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/LogoAnimation-WithTagline.mp4"
          type="video/mp4"
        />
        <link
          // rel="preload"
          as="video"
          href="https://strange-luck.s3.us-east-1.amazonaws.com/homepage_hero/REEL-WEBSITE-SLSTUDIO-NOSOUND-16x9-20250701_FORSITE.mp4"
          type="video/mp4"
        />
      </Head>

      <Suspense fallback={null}>
        <ScrollHandler introDone={introDone} />
      </Suspense>

      {!introDone ? (
        <IntroVideo onIntroEnd={() => setIntroDone(true)} />
      ) : (
        <>
          <Navigation />
          <MobileNav />

          {/* CONTENT */}
          <div className="container-main relative z-10 max-w-screen overflow-hidden">
            {/* HERO VIDEO */}
            <div className="section-snap relative z-10 h-screen w-full overflow-hidden">
              {/* {shouldShowUnicorn && ( */}
              {heroVideo()}
              {/* )} */}
              {/* TODO: add unicorn mouse-hover effect or Three.js effect */}
              {/* {isReady && shouldShowUnicorn && (
                // <div className="relative w-full aspect-[16/9]">
                <div
                  id="unicorn-hero"
                  className="absolute top-0 left-0 w-full h-full z-10"
                />
                // </div>
              )} */}
            </div>

            <section
              id="about"
              className="section-snap z-10 flex h-screen text-xl items-center justify-center relative overflow-hidden"
            >
              <video
                id="about-video"
                muted
                loop
                playsInline
                // preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              >
                <source src="/about_background.mp4" type="video/mp4" />
              </video>
              <div className="absolute z-10 text-left max-w-[min(50vw,450px)] left-[clamp(1rem,8vw,6rem)] bottom-[clamp(5rem,16vh,8rem)] sm:left-[clamp(4rem,12vw,12rem)] sm:bottom-[clamp(3rem,12vh,7rem)] mobile-title sl-h2 sm:blur-md blur-sm">
                <h2>
                  Strange Luck is a storytelling studio for the human spirit.
                </h2>
              </div>
            </section>

            <section
              id="about-2"
              className="section-snap z-10 flex h-screen text-xl items-center justify-center relative overflow-hidden"
            >
              <video
                id="about2-video"
                muted
                loop
                playsInline
                // preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              >
                <source src="/about2_background.mp4" type="video/mp4" />
              </video>
              <div className="absolute z-10 text-left max-w-[min(80vw,600px)] right-[clamp(1rem,8vw,6rem)] bottom-[clamp(5rem,16vh,8rem)] sm:right-[clamp(4rem,12vw,6.5rem)] sm:bottom-[clamp(3rem,12vh,7rem)] mobile-title sl-h2 sm:blur-md blur-sm">
                <h2>
                  We work with brands, nonprofits, and media companies to tell
                  stories that generate empathy and drive engagement.
                </h2>
              </div>
            </section>

            <section
              id="work"
              className="section-snap z-10 relative flex flex-col text-white pt-28 px-10 sm:px-20 sm:pt-24 pb-20"
            >
              <video
                id="work-video"
                muted
                loop
                playsInline
                // preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
              >
                <source src="/BlueVHS.mp4" type="video/mp4" />
                <source src="/BlueVHS.mov" type="video/quicktime" />
                Your browser does not support the video tag.
              </video>
              <div className="relative z-10 mb-8">
                <div className="flex flex-col items-center sm:items-start mb-6 sm:mt-20 sm:mb-0">
                  <h1 className="sl-h1-mobile gradient-text blur-sm text-center sm:text-left w-3/4">
                    Choose your path
                  </h1>
                </div>

                <nav className="justify-center sm:justify-between p-1 mb-[70px] sm:mb-0">
                  <div className="flex flex-wrap justify-center sm:justify-start text-md gap-x-2 sm:mb-8 sm:gap-4 sm:text-[32px]">
                    {Object.keys(CATEGORY_TO_TAG).map((category, idx, arr) => (
                      <div
                        key={category}
                        className="flex items-center gap-x-2 sm:gap-4"
                      >
                        <button
                          onClick={() => handleTagClick(category)}
                          className={`sl-list-item mobile-subtitle blur-xs focus:text-[#DFFC3C]  focus:underline !hover:text-gray-400 cursor-[url('/hand_cursor_2.png'),_pointer] focus:decoration-[#DFFC3C] `}
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
                          <span className="sl-list-item mobile-subtitle blur-xs text-gray-400">
                            |
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </nav>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-[42px] gap-y-[115px] sm:gap-y-[120px]">
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
            <GradientBackgroundHomepageSections />
            <div className="!h-[1px] section-snap dummy-footer min-h-[1px] max-h-[1px]"></div>
          </div>

          {/* Parallax Background */}
          {/* <div className="fixed top-0 left-0 w-full h-full z-0">
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
          </div> */}
        </>
      )}
    </>
  );
}

// const ContactSection = dynamic(() => import("./components/ContactSection"), {
//   ssr: false,
// });
