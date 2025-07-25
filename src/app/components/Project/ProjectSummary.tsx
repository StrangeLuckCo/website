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
    <div className={`flex flex-col sm:gap-y-12 ${className}`}>
      {!isMobile && (
        <h1 className="sl-h1 sl-h1-mobile sl-h1-tablet blur-xs text-stroke-lg text-[64px] leading-[0.9] mb-4 sm:mb-0 text-center sm:text-left">
          {title}
        </h1>
      )}
      <div className="flex flex-col sm:flex-row sm:gap-x-10">
        {filmPoster && (
          <div className="mb-[58px] sm:mb-0  w-full sm:min-w-[340px]">
            <FilmThumbnail src={filmPoster} />{" "}
          </div>
        )}
        <div className="flex flex-col gap-y-12">
          <div className="flex flex-col gap-y-6">
            {releaseDate && (
              <div className="flex flex-col gap-y-[6px]">
                <h3 className="sl-h3 sl-h3-mobile sl-h3-tablet font-medium text-[32px]">
                  Release Date
                </h3>
                <h4 className="sl-h4 sl-h5-mobile sl-h5-tablet blur-xxs font-medium text-[28px]">
                  {releaseDate}
                </h4>
              </div>
            )}
            {productionCredits && (
              <div className="flex flex-col gap-y-[6px]">
                <h3 className="sl-h3 sl-h3-mobile sl-h3-tablet font-medium text-[32px]">
                  Production Credits
                </h3>
                <h4 className="sl-h4 sl-h5-mobile sl-h5-tablet blur-xxs font-medium text-[28px]">
                  {productionCredits}
                </h4>
              </div>
            )}
          </div>
          <p className="sl-p sl-p-mobile blur-xxs font-normal text-xl">
            {description}
          </p>
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
