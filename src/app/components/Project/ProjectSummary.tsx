import { Project } from "../../[slug]/page";
import FilmThumbnail from "./FilmThumbnail";

export const ProjectSummary = ({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) => {
  const { title, filmPoster, description, releaseDate, productionCredits } =
    project.fields;
  return (
    <div className={`flex flex-col gap-y-12  ${className}`}>
      <h1 className="sl-h1 eighties-glow blur-md text-stroke-lg text-[64px] leading-[0.9]">
        {title}
      </h1>
      <div className="flex gap-x-10">
        {filmPoster && <FilmThumbnail src={filmPoster} />}
        <div className="flex flex-col gap-y-6">
          {releaseDate && (
            <div>
              <h3 className="sl-h3 eighties-glow text-stroke font-medium text-[32px]">
                Release Date
              </h3>
              <h4 className="sl-h4 eighties-glow font-medium text-[28px]">
                {releaseDate}
              </h4>
            </div>
          )}
          {productionCredits && (
            <div>
              <h3 className="sl-h3 eighties-glow text-stroke font-medium text-[32px]">
                Production Credits
              </h3>
              <h4 className="sl-h4 eighties-glow font-medium text-[28px]">
                {productionCredits}
              </h4>
            </div>
          )}
          <p className="sl-p blur-xxs eighties-glow font-normal text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
