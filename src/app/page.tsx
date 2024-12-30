import React from "react";
import Head from "next/head";

export default async function Home() {
  const videoUrl =
    "https://strange-luck.s3.us-east-1.amazonaws.com/sample-15s.mp4";

  return (
    <>
      {/* Preload the video */}
      <Head>
        <link rel="preload" as="video" href={videoUrl} />
      </Head>
      <div
        style={{ position: "relative", height: "100vh", overflow: "hidden" }}
      >
        {/* Background Video */}
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minWidth: "100%",
            minHeight: "100%",
            width: "100%",
            height: "auto",
            objectFit: "cover",
            zIndex: -1,
          }}
        />

        {/* Content Overlay */}
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            textShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          }}
        >
          <h1
            style={{
              backgroundColor: "black",
              padding: "5px",
              fontSize: "40px",
            }}
          >
            Welcome to My Website
          </h1>
        </div>
      </div>
    </>
  );
}
