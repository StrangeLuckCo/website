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
      <body>
        <UnicornScript />
        {children}
      </body>
    </html>
  );
}
