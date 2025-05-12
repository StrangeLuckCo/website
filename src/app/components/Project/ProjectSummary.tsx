import { Project } from "../../[slug]/page";
import FilmThumbnail from "./FilmThumbnail";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

export const ProjectSummary = ({ project }: { project: Project }) => {
  const { title, filmPoster, description, releaseDate, productionCredits } =
    project.fields;
  console.log(project);
  return (
    <div className="flex flex-col gap-y-12">
      <h1 className="font-bold text-[64px]">{title}</h1>
      <div className="flex gap-x-10">
        {filmPoster && <FilmThumbnail src={filmPoster} />}
        <div className="flex flex-col gap-y-6">
          <div>
            <h3 className="font-medium text-[32px]">Release Date</h3>
            <h4 className="font-medium text-[28px]">{releaseDate}</h4>
          </div>
          <div>
            <h3 className="font-medium text-[32px]">Production Credits</h3>
            <h4 className="font-medium text-[28px]">{productionCredits}</h4>
          </div>
          <p className="font-normal text-xl">{description}</p>
        </div>
      </div>
    </div>
  );
};
