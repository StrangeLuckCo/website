/* eslint-disable @typescript-eslint/no-explicit-any */
import { getEntities } from "./entities";

export const getProjectBySlug = async (slug: string): Promise<any> => {
  console.log("get project: ", slug);
  const url = process.env.NEXT_PUBLIC_CONTENTFUL_API_URL;
  if (!url) {
    console.warn("API URL is undefined NEXT_PUBLIC_CONTENTFUL_API_URL");
    return null;
  }

  //   const contenfulAPIURL = `${process.env.NEXT_PUBLIC_CONTENTFUL_API_URL}/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENV}/entries?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}&fields.slug=${slug}`;

  try {
    const allEntities = await getEntities();

    if (!allEntities || !Array.isArray(allEntities)) {
      console.warn("No entities found or invalid response.");
      return null;
    }

    const match = allEntities.find((entity) => entity.fields?.slug === slug);

    if (!match) {
      console.warn(`Project with slug '${slug}' not found.`);
      return null;
    }

    return match;
  } catch (error) {
    console.error("Something went wrong fetching entities:", error);
    return null;
  }
};
