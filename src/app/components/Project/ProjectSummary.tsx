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
    <div className={`flex flex-col sm:gap-y-12 ${className}`}>
      <h1 className="sl-h1 sl-h1-mobile blur-xs text-stroke-lg text-[64px] leading-[0.9] mb-4 sm:mb-0 text-center sm:text-left">
        {title}
      </h1>
      <div className="flex flex-col sm:flex-row sm:gap-x-10">
        {filmPoster && (
          <div className="mb-[58px] sm:mb-0  w-full sm:min-w-[340px]">
            <FilmThumbnail src={filmPoster} />{" "}
          </div>
        )}
        <div className="flex flex-col gap-y-6">
          {releaseDate && (
            <div>
              <h3 className="sl-h3 sl-h3-mobile font-medium text-[32px]">
                Release Date
              </h3>
              <h4 className="sl-h4 sl-h5-mobile blur-xxs font-medium text-[28px]">
                {releaseDate}
              </h4>
            </div>
          )}
          {productionCredits && (
            <div>
              <h3 className="sl-h3 sl-h3-mobile font-medium text-[32px]">
                Production Credits
              </h3>
              <h4 className="sl-h4 sl-h5-mobile blur-xxs font-medium text-[28px]">
                {productionCredits}
              </h4>
            </div>
          )}
          <p className="sl-p sl-p-mobile blur-xxs font-normal text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
