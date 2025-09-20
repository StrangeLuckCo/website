"use client";

import { Project } from "../../[slug]/page";
import FilmThumbnail from "./FilmThumbnail";
import { useIsMobile } from "../../utility/hooks";

export const ProjectSummary = ({
  project,
  className = "",
}: {
  project: Project;
  className?: string;
}) => {
  const {
    title,
    filmPoster,
    description,
    releaseDate,
    productionCredits,
    externalUrl,
  } = project.fields;
  const isMobile = useIsMobile();
  return (
    <div className={`flex flex-col gap-y-10 ${className}`}>
      {/*!isMobile && (
        <h1 className="sl-h1 sl-h1-mobile sl-h1-tablet blur-xs">
          {title}
        </h1>
      )*/}

      <h1 className="sl-h1 sl-h1-mobile sl-h1-tablet blur-sm">
        {title}
      </h1>
      <div className="flex flex-col gap-y-10 sm:flex-row sm:gap-x-10">
        {filmPoster && (
          <div className="film-thumb sm:mb-0 w-full sm:min-w-[220px] md:min-w-[340px]">
            <FilmThumbnail src={filmPoster} />{" "}
          </div>
        )}
        <div className="flex flex-col container-flex-y">
          {releaseDate && (
            <div className="release-date flex flex-col gap-y-[6px]">
              <h3 className="sl-h3 sl-h3-mobile sl-h3-tablet blur-xxs">
                Release Date
              </h3>
              <h4 className="sl-h4 sl-h5-mobile sl-h5-tablet blur-xxs">
                {releaseDate}
              </h4>
            </div>
          )}
          {productionCredits && (
            <div className="production-credits flex flex-col gap-y-[6px]">
              <h3 className="sl-h3 sl-h3-mobile sl-h3-tablet blur-xxs">
                Production Credits
              </h3>
              <h4 className="sl-h4 sl-h5-mobile sl-h5-tablet blur-xxs">
                {productionCredits}
              </h4>
            </div>
          )}
          {description && (
          <p className="sl-p sl-p-mobile blur-xxs">
            {description}
          </p>
          )}
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sl-h4 sl-h5-mobile text-xl font-medium underline hover:text-blue-300 transition cursor-[url('/hand_cursor_2.png'),_pointer]"
            >
              Explore more →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
