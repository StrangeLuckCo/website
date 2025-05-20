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
        <div className="relative z-10 flex pt-32 justify-center">
          <Image
            src={project.fields.thumbnailUrl || ""}
            width={721}
            height={541}
            alt="Thumbnail image"
          />
        </div>
      )}
      <div className="h-full relative z-10 pt-28 text-white text-2xl">
        {project && (
          <div className="flex flex-col gap-y-10">
            <ProjectSummary project={project} className="px-20" />
            <Carousel images={project.fields.projectImages || []} />

            {project.fields.markdownDescription && (
              <div className="sl-h4 blur-xs px-10">
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
