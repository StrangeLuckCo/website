"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProjectBySlug } from "@/pages/api/project";
import { ProjectSummary } from "../components/Project/ProjectSummary";
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
};

export type Project = {
  fields: ProjectFields;
};

export default function Project() {
  const [project, setProject] = useState<Project | null>(null);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    const getProject = async () => {
      const res = await getProjectBySlug(slug);

      setProject(res);
    };

    getProject();
  }, [slug]);

  return (
    <>
      {project && (
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
      <div className="h-full relative z-10 pt-28 px-10 text-white text-2xl">
        {project && (
          <div className="">
            <ProjectSummary project={project} />
            {/* <Carousel /> */}
            {project.fields.markdownDescription && (
              <div className="font-medium text-[28px]">
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
  );
}
