export const getEntities = async (): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_CONTENTFUL_API_URL;
  if (!url) {
    console.warn("API URL is undefined NEXT_PUBLIC_CONTENTFUL_API_URL");
    return null;
  }

  try {
    const res = await fetch(`/api/proxy`);

    if (res.status === 404) {
      console.warn(`Entities not found.`);
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch entities. Status: ${res.status}`);
    }

    const data = await res.json();

    // Parse the first asset and return the required structure
    const firstAsset = data?.includes?.Asset?.[0];
    if (!firstAsset) {
      console.warn("No assets found in the response.");
      return null;
    }

    return {
      fields: firstAsset.fields,
      URL: `https:${firstAsset.fields?.file?.url}` || "",
    };
  } catch (error) {
    console.error("Something went wrong fetching entities:", error);
    return null;
  }
};
