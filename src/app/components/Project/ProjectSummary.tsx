import { Project } from "../../[slug]/page";

export const ProjectSummary = ({ project }: { project: Project }) => {
  return <>{project.fields.description}</>;
};
