"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProjectBySlug } from "@/pages/api/project";
import { ProjectSummary } from "../components/Project/ProjectSummary";
import Carousel from "../components/Project/Carousel";
import Footer from "../components/Footer";
import type { Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Options } from "@contentful/rich-text-react-renderer";
import { useIsMobile } from "../utility/hooks";
import Navigation from "../components/Navigation";
import MobileNav from "../components/MobileNav";
import AudioScrubber from "../components/Project/AudioScrubber";
import MediaScrubber from "../components/Project/MediaScrubber";
import MediaControls from "../components/Project/MediaControls";

const options: Options = {
  renderText: (text) => {
    return text
      .split("\n")
      .flatMap((part, index, arr) => [
        part,
        index < arr.length - 1 ? <br key={index} /> : null,
      ]);
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, children) => {
      return <p className="mb-4">{children}</p>;
    },
  },
};

type ProjectFields = {
  title: string;
  shortDescription: string;
  description?: string;
  markdownDescription?: Document;
  slug: string;
  fileUrl: string;
  thumbnailUrl?: string;
  productionCredits?: string;
  filmPoster?: string;
  releaseDate?: string;
  displayType: string;
  projectImages?: string[];
  projectAudioFiles?: string[];
  externalUrl?: string;
};

export type Project = {
  fields: ProjectFields;
};

export default function Project() {
  const [project, setProject] = useState<Project | null>(null);
  const [displayType, setDisplayType] = useState<
    "video" | "audio" | "art" | null
  >(null);
  const [playState, setPlayState] = useState<"play" | "pause">("play");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);

  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [displayControls, setDisplayControls] = useState(false);

  const params = useParams();
  const slug = params?.slug as string;
  // const isMobile = useIsMobile();

  const toggleControlsDisplay = () => {
    setDisplayControls(true);
    clearTimeout(controlsTimeoutRef.current as NodeJS.Timeout);
    controlsTimeoutRef.current = setTimeout(() => {
      setDisplayControls(false);
    }, 3000);
  }


  useEffect(() => {
    const getProject = async () => {
      const res = await getProjectBySlug(slug);
      setProject(res);
      setDisplayType(res.fields.displayType.toLowerCase());
    };

    getProject();
  }, [slug]);

  useEffect(() => {
    if (!videoRef.current || displayType !== "video") return;

    const video = videoRef.current;

    const updateTime = () => {
      setCurrentTime(Math.floor(video.currentTime));
      setDuration(Math.floor(video.duration));
    };

    const interval = setInterval(() => {
      if (!video.paused && !video.ended) {
        updateTime();
      }
    }, 1000);

    // Reset and replay video when it ends
    const handleEnded = () => {
      setCurrentTime(0);
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener("ended", handleEnded);

    toggleControlsDisplay();

    return () => {
      clearInterval(interval);
      video.removeEventListener("ended", handleEnded);
    };
  }, [project, displayType]);

  const renderMedia = () => {
    if (!project) return null;
    const { fileUrl, thumbnailUrl } = project.fields;

    const isValidVideo =
      fileUrl && fileUrl !== "n/a" && /\.(mp4|mov|webm)$/i.test(fileUrl);

    return (
      <video
        ref={videoRef}
        src={isValidVideo ? fileUrl : thumbnailUrl}
        autoPlay
        muted={isMuted ? true : false}
        playsInline
        onPlay={() => console.log("video is playing")}
        onEnded={() => {
          setCurrentTime(0);
          videoRef.current?.play();
        }}
        className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
      />
    );
  };

  const formatTime = (secs: number): string => {
    const totalSeconds = Math.floor(secs);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hh = hours > 0 ? `${hours.toString().padStart(2, "0")}:` : "";
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");

    return `${hh}${mm}:${ss}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playState === "play") {
      videoRef.current.pause();
      setPlayState("pause");
    } else {
      videoRef.current.play();
      setPlayState("play");
    }
  };

  return (
    <>
      <Navigation />
      <MobileNav />


    <div className="flex flex-col" onMouseMove={toggleControlsDisplay}>
      {project && displayType === "video" && (
        <div className="relative z-10 h-screen overflow-hidden">
          {renderMedia()}
          <div
            id="controls"
            className="container-x relative flex flex-col h-full pt-20 pb-24 sm:pt-24 sm:pb-6 z-40"
            style={{ opacity: displayControls ? 1 : 0, transition: "opacity 0.5s" }}
          >
            <div className="grow">
              <div className="flex flex-row gap-x-3">
              {playState === "play" ? (
                <>
                  <h4 className="!text-[30px] vhs-scrubber-text">PLAY</h4>
                  <Image
                    src={"/controls/play-white-01.svg"}
                    width={19}
                    height={32}
                    className="h-auto opacity-90"
                    alt="Playing Icon"
                  />
                </>
              ) : (
                <>
                  <h4 className="!text-[28px] vhs-scrubber-text">PAUSE</h4>
                  <Image
                    src={"/controls/pause-white-01.svg"}
                    width={15}
                    height={32}
                    className="h-auto opacity-90"
                    alt="Paused Icon"
                  />
                </>
              )}
              </div>
            </div>
            <div className="justify-start flex flex-row items-start">
              <div className="flex flex-col grow">
                <MediaScrubber
                  currentTime={currentTime}
                  duration={duration}
                  onScrub={(newTime) => {
                    if (videoRef.current) {
                      videoRef.current.currentTime = newTime;
                      setCurrentTime(newTime);
                    }
                  }}
                />
                <div className="flex flow-row items-center mt-2">
                  <h4 className="vhs-scrubber-text grow">
                    SP {formatTime(currentTime)}
                  </h4>
                </div>

              </div>

              <div className="
                  flex flex-row gap-x-10
                  absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                  sm:translate-x-0 sm:translate-y-0 sm:static sm:gap-x-4
                  ">
                <button
                  onClick={() => togglePlay() }
                >
                {playState === "play" ? (
                  <Image
                    src={"/controls/pause-white-01.svg"}
                    width={16}
                    height={32}
                    className="w-8 sm:w-4 h-auto opacity-95"
                    alt="Paused Icon"
                  />
                ) : (
                  <Image
                    src={"/controls/play-white-01.svg"}
                    width={20}
                    height={32}
                    className="w-8 sm:w-4 h-auto opacity-95"
                    alt="Playing Icon"
                  />
                )}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-15 sm:w-7 h-auto"
                >
                  {isMuted ? (
                    <Image
                      src={"/controls/volume-off-white-01.svg"}
                      width={32}
                      height={35}
                      className="w-12 sm:w-8 h-auto opacity-95"
                      alt="Volume On Icon"
                    />
                  ) : (
                    <Image
                      src={"/controls/volume-on-white-01.svg"}
                      width={32}
                      height={35}
                      className="w-12 sm:w-8 h-auto opacity-95"
                      alt="Volume Off Icon"
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {project && (displayType === "audio" || displayType === "art") && (
        <div className="flex flex-col">
          {/*isMobile && (
            <h1 className="sl-h1 sl-h1-mobile sl-h1-tablet blur-xs z-20 leading-[0.9] mb-4 sm:mb-0 text-center sm:text-left">
              {project?.fields.title}
            </h1>
          )*/}
          <div className="relative z-10 flex sm:pt-32 justify-center items-center flex-col gap-y-6">
            {/\.(mp4|mov|webm)$/i.test(project.fields.thumbnailUrl || "") ? (
              <video
                src={project.fields.thumbnailUrl}
                autoPlay
                loop
                muted
                playsInline
                width={721}
                height={541}
              />
            ) : (
              <Image
                src={project.fields.thumbnailUrl || ""}
                width={721}
                height={541}
                alt="Thumbnail image"
              />
            )}
            {displayType === "audio" && (
              <AudioScrubber
                audioUrls={project.fields.projectAudioFiles || []}
              />
            )}
          </div>
        </div>
      )}

      <div className="h-full relative z-10 pt-16 sm:pt-28 text-white text-2xl">
        {project && (
          <div className="flex flex-col container-flex-y container-x">
            {/*isMobile && displayType === "video" && (
              <h1 className="sl-h1 sl-h1-mobile sl-h1-tablet blur-xs leading-[0.9] mb-4 sm:mb-0">
                {project?.fields.title}.
              </h1>
            )*/}

            <ProjectSummary project={project} />

            {project.fields.projectImages &&
              project.fields.projectImages.length > 0 && (
                <Carousel
                  images={project.fields.projectImages || []}
                  className="relative left-1/2 w-dvw max-w-none -translate-x-1/2"
                />
              )}

            {project.fields.markdownDescription && (
              <div className="sl-p sl-p-mobile blur-xxs">
                {documentToReactComponents(
                  project.fields.markdownDescription as Document,
                  options
                )}
              </div>
            )}
          </div>
        )}
        <div className="sm:pt-[250px] pt-[150px] pb-8 sm:pb-0">
          <Footer />
        </div>
      </div>

      {/* Background Gradient */}
      <div className="fixed bg-custom-gradient top-0 left-0 w-full h-full z-0"></div>
    </div>

    </>
  );
}
