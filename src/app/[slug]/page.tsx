"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { getProjectBySlug } from "@/pages/api/project";
import { ProjectSummary } from "../components/Project/ProjectSummary";

type ProjectFields = {
  description: string;
  fileUrl: string;
  markdownDescription: string;
  slug: string;
  thumbnailUrl: string;
  title: string;
};

export type Project = {
  fields: ProjectFields;
};

export default function Project() {
  const [project, setProject] = useState(null);
  const params = useParams();
  const slug = params?.slug as string;

  useEffect(() => {
    const getProject = async () => {
      const res = await getProjectBySlug(slug);
      console.log("browser res: ", res);

      setProject(res);
    };

    getProject();
  }, [slug]);

  return (
    <div className="h-full pt-40 px-10 text-white text-2xl">
      {project && (
        <div className="">
          <ProjectSummary project={project} />
        </div>
      )}
    </div>
  );
}
