import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, subject, description } = req.body;

  try {
    const data = await resend.emails.send({
      from: `<${email}>`,
      to: ["michael.chrupcala@gmail.com"],
      subject: `${subject}`,
      text: `
New Message from Strange Luck Contact Form

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${description}
      `,
    });

    if (data?.error?.name) {
      return res.status(500).json({ success: false, data });
    }

    // console.log("data res: ", data);

    return res.status(200).json({ success: true, data });
  } catch (error) {
    // console.log("error res: ", error);
    console.error("Error sending email:", error);
    return res.status(500).json({ success: false, error });
  }
}
