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
import AudioScrubber from "../components//Project/AudioScrubber";

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

  return (
    <div className="flex flex-col">
      <Navigation />
      <MobileNav />
      {project && displayType === "video" && (
        <div className="relative z-10 h-screen overflow-hidden">
          {renderMedia()}
          <div className="absolute vhs-scrubber-text top-0 left-0 w-full pb-20 px-20 h-full flex justify-between z-40 pointer-events-none">
            <div className="flex flex-col justify-end w-[450px]">
              <div>
                {/* Scrubber */}
                <div className=" w-[250px] h-[27px] bg-[#3c3436] border-2 border-[#D9D9D9] z-40 pointer-events-none">
                  <div
                    className="h-full bg-[#D9D9D9]"
                    style={{
                      width: duration
                        ? `${(currentTime / duration) * 100}%`
                        : "0%",
                    }}
                  ></div>
                </div>
                <h4>SP {currentTime.toString().padStart(2, "0")}</h4>
              </div>
            </div>
            <div className="flex flex-row items-end justify-center pointer-events-auto">
              <div className="max-h-[80px] w-full flex flex-row items-center gap-x-2">
                <div className="w-[125px] text-center flex justify-end">
                  <h4>{playState === "play" ? "PLAY" : "PAUSE"}</h4>
                </div>
                <div
                  onClick={() => {
                    setPlayState("play");
                    videoRef.current?.play();
                  }}
                >
                  <Image
                    src={"/play_button.svg"}
                    width={35}
                    height={29}
                    style={{ maxHeight: "29px" }}
                    alt="Play button"
                  />
                </div>
                <div
                  className="flex gap-x-1"
                  onClick={() => {
                    setPlayState("pause");
                    videoRef.current?.pause();
                  }}
                >
                  <Image
                    src={"/pause_button.svg"}
                    width={10}
                    height={29}
                    alt="Pause button"
                  />
                  <Image
                    src={"/pause_button.svg"}
                    width={10}
                    height={29}
                    alt="Pause button"
                  />
                </div>
                <div onClick={() => setIsMuted(!isMuted)}>
                  <Image
                    src={isMuted ? "/sound-max.svg" : "/sound-min.svg"}
                    style={{ color: "white" }}
                    width={32}
                    height={32}
                    alt="Mute button"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {project && (displayType === "audio" || displayType === "art") && (
        <div className="flex flex-col">
          {isMobile && (
            <h1 className="sl-h1 sl-h1-mobile blur-xs z-20 text-stroke-lg text-[64px] leading-[0.9] mb-4 sm:mb-0 text-center sm:text-left">
              {project?.fields.title}
            </h1>
          )}
          <div className="relative z-10 flex pt-32 justify-center items-center flex-col">
            <Image
              src={project.fields.thumbnailUrl || ""}
              width={721}
              height={541}
              alt="Thumbnail image"
            />
            {displayType === "audio" && (
              <AudioScrubber audio={project.fields.fileUrl} />
            )}
          </div>
        </div>
      )}

      <div className="h-full relative z-10 pt-28 text-white text-2xl">
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
                <Carousel images={project.fields.projectImages || []} />
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
        <div className="pt-[250px]">
          <Footer />
        </div>
      </div>

      {/* Background Gradient */}
      <div className="fixed bg-custom-gradient top-0 left-0 w-full h-full z-0"></div>
    </div>
  );
}
