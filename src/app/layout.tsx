import type { Metadata } from "next";
import "./globals.css";
import UnicornScript from "./components/UnicornScript";

export const metadata: Metadata = {
  title: "Strange Luck",
  description: "A Storytelling Studio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/hqi1rdb.css" />
        <link
          rel="preload"
          as="video"
          href="https://strange-luck-website-assets.s3.us-east-1.amazonaws.com/homepage_hero/LogoAnimation-WithTagline_new.mp4"
          type="video/mp4"
        />
        <link
          rel="preload"
          as="video"
          href="https://strange-luck-website-assets.s3.us-east-1.amazonaws.com/homepage_hero/REEL-WEBSITE-SLSTUDIO-NOSOUND-16x9-20250701_FORSITE.mp4"
          type="video/mp4"
        />
      </head>
      <body>
        <UnicornScript />
        {children}
      </body>
    </html>
  );
}
