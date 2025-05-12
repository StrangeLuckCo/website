"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProjectBySlug } from "@/pages/api/project";
import { ProjectSummary } from "../components/Project/ProjectSummary";
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
    <div className="h-full pt-40 px-10 text-white text-2xl">
      {project && (
        <div className="">
          <ProjectSummary project={project} />
          {/* <Carousel /> */}
          <p className="font-normal text-xl">
            {documentToReactComponents(
              project.fields.markdownDescription as Document,
              options
            )}
          </p>
          {/* {project.fields.markdownDescription && <div>{project.fields.markdownDescription}</div>} */}
        </div>
      )}
    </div>
  );
}
