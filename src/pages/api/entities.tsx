/* eslint-disable @typescript-eslint/no-explicit-any */
export const getEntities = async (): Promise<any> => {
  const url = process.env.NEXT_PUBLIC_CONTENTFUL_API_URL;
  if (!url) {
    console.warn("API URL is undefined NEXT_PUBLIC_CONTENTFUL_API_URL");
    return null;
  }

  const contenfulAPIURL = `${process.env.NEXT_PUBLIC_CONTENTFUL_API_URL}/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENV}/entries?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}&order=-sys.createdAt&limit=100`;
  try {
    const res = await fetch(`/api/proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proxyRequestURL: contenfulAPIURL }),
    });

    if (res.status === 404) {
      console.warn(`Entities not found.`);
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch entities. Status: ${res.status}`);
    }

    const data = await res.json();

    // Parse the first asset and return the required structure
    // const firstAsset = data?.includes?.Asset?.[0];
    if (!data || !data.items) {
      console.warn("No assets found in the response.");
      return null;
    }

    return data.items;
  } catch (error) {
    console.error("Something went wrong fetching entities:", error);
    return null;
  }
};
