import { useState, useEffect } from "react";
import StaffHeadshot from "./StaffHeadshot";

interface StaffMember {
  imageSrc: string;
  altText: string;
  name: string;
  title: string;
  credits: string;
  bio: string;
}

export default function StaffSection() {
  const [staffData, setStaffData] = useState<StaffMember[]>([]);

  useEffect(() => {
    async function fetchStaffData() {
      try {
        const res = await fetch(
          "https://strange-luck-website.s3.us-east-1.amazonaws.com/headshots/staff-bios.json"
        );
        const data = await res.json();
        setStaffData(data);
      } catch (err) {
        console.error("Failed to fetch staff data", err);
      }
    }

    fetchStaffData();
  }, []);

  return (
    <section
      id="staff"
      className="flex flex-col  min-h-screen sm:p-20 pt-20 sm:pt-0 gap-y-10 text-center sm:text-left"
    >
      <h1 className="pl-4 sm:pl-0 text-3xl desktop-title sl-h1-mobile blur-md sm:mt-[70px]">
        About
      </h1>
      <div className="min-h-screen flex items-center justify-center mb-20">
        <div className="flex flex-col gap-32 sm:gap-40">
          {staffData.map((staff, index) => (
            <StaffHeadshot
              key={index}
              imageSrc={staff.imageSrc}
              altText={staff.altText}
              name={staff.name}
              title={staff.title}
              credits={staff.credits}
              bio={staff.bio}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
