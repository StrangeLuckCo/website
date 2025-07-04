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

  const params = useParams();
  const slug = params?.slug as string;
  const isMobile = useIsMobile();

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

  return (
    <div className="flex flex-col">
      <Navigation />
      <MobileNav />
      {project && displayType === "video" && (
        <div className="relative z-10 h-screen overflow-hidden">
          {renderMedia()}
          <div className="absolute vhs-scrubber-text top-0 left-0 w-full pb-20 px-20 h-full flex justify-between z-40">
            <div className="relative flex flex-col w-full h-full items-center">
              {isMobile && (
                <div className="absolute top-1/2 -translate-y-1/2">
                  <MediaControls
                    playState={playState}
                    setPlayState={setPlayState}
                    isMuted={isMuted}
                    setIsMuted={setIsMuted}
                    videoRef={videoRef}
                  />
                </div>
              )}

              <div className="absolute bottom-1 sm:left-2 sm:bottom-0">
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
                <h4 className="vhs-scrubber-text mt-2">
                  SP {formatTime(currentTime)}
                </h4>
              </div>
            </div>
            {!isMobile && (
              <MediaControls
                playState={playState}
                setPlayState={setPlayState}
                isMuted={isMuted}
                setIsMuted={setIsMuted}
                videoRef={videoRef}
              />
            )}
          </div>
        </div>
      )}

      {project && (displayType === "audio" || displayType === "art") && (
        <div className="flex flex-col mt-[100px] sm:mt-0">
          {isMobile && (
            <h1 className="sl-h1 sl-h1-mobile blur-xs z-20 text-stroke-lg text-[64px] leading-[0.9] mb-4 sm:mb-0 text-center sm:text-left">
              {project?.fields.title}
            </h1>
          )}
          <div className="relative z-10 flex pt-12 sm:pt-32 justify-center items-center flex-col gap-y-6">
            <Image
              src={project.fields.thumbnailUrl || ""}
              width={721}
              height={541}
              alt="Thumbnail image"
            />
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
          <div className="flex flex-col gap-y-[77px]">
            {isMobile && displayType === "video" && (
              <h1 className="sl-h1 sl-h1-mobile blur-xs text-stroke-lg text-[64px] leading-[0.9] mb-4 sm:mb-0 text-center sm:text-left">
                {project?.fields.title}
              </h1>
            )}
            <ProjectSummary project={project} className="px-4 sm:px-20" />
            {project.fields.projectImages &&
              project.fields.projectImages.length > 0 && (
                <Carousel
                  images={project.fields.projectImages || []}
                  className="sm:mt-12"
                />
              )}

            {project.fields.markdownDescription && (
              <div className="sl-h4 sl-p2-mobile blur-xs px-10 mb-24 sm:mb-2">
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
  );
}
