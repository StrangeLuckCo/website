"use client";

import { useState, useEffect } from "react";
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

  return (
    <div className="flex flex-col">
      <Navigation />
      <MobileNav />
      {project && displayType === "video" && (
        <div className="relative z-10 h-screen overflow-hidden">
          <video
            src={project.fields.thumbnailUrl}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-full h-auto transform -translate-x-1/2 -translate-y-1/2 object-cover"
          />
        </div>
      )}

      {project && (displayType === "audio" || displayType === "art") && (
        <div className="flex flex-col">
          {isMobile && (
            <h1 className="sl-h1 sl-h1-mobile blur-xs z-20 text-stroke-lg text-[64px] leading-[0.9] mb-4 sm:mb-0 text-center sm:text-left">
              {project?.fields.title}
            </h1>
          )}
          <div className="relative z-10 flex pt-32 justify-center">
            <Image
              src={project.fields.thumbnailUrl || ""}
              width={721}
              height={541}
              alt="Thumbnail image"
            />
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
                <Carousel
                  images={project.fields.projectImages || []}
                  className={displayType !== "video" ? "mb-[300px]" : ""}
                />
              )}

            {project.fields.markdownDescription && (
              <div className="sl-h4 sl-p2-mobile blur-xs px-10 mb-24">
                {documentToReactComponents(
                  project.fields.markdownDescription as Document,
                  options
                )}
              </div>
            )}
          </div>
        )}
        <Footer />
      </div>

      {/* Background Gradient */}
      <div className="fixed bg-custom-gradient top-0 left-0 w-full h-full z-0"></div>
    </div>
  );
}
