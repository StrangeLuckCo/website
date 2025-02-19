export const getAudioEntityBySlug = async (slug: string): Promise<any> => {
  const contenfulAPIURL = `${process.env.NEXT_PUBLIC_CONTENTFUL_API_URL}/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${process.env.NEXT_PUBLIC_CONTENTFUL_ENV}/entries?access_token=${process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}&content_type=soundDesign`;

  try {
    const res = await fetch(`/api/proxy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ proxyRequestURL: contenfulAPIURL }),
    });

    if (res.status === 404) {
      console.warn(`Audio not found.`);
      return null;
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch audio. Status: ${res.status}`);
    }

    const data = await res.json();

    if (data.total < 1) {
      console.warn("No assets found in the response.");
      return null;
    }

    // ✅ Dynamically filter by slug from URL
    const filteredEntry = data.items?.find(
      (entry) => entry.fields.slug === slug
    );

    return filteredEntry || null;
  } catch (error) {
    console.error("Something went wrong fetching entities:", error);
    return null;
  }
};
