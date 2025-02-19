export default async function handler(req, res) {
  // if (req.method !== "GET") {
  //   return res.status(405).json({ error: "Method not allowed" });
  // }

  try {
    const { proxyRequestURL } = req.body;
    const response = await fetch(proxyRequestURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data", details: json });
    }

    return res.status(200).send(json);
  } catch (error) {
    console.error("Proxy error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
