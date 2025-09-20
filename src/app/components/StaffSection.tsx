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
      className="sm:min-h-screen flex flex-col py-24 gap-20 text-center sm:text-left container-x"
    >
      <h1 className="sl-h1 sl-h1-mobile sl-h1-tablet blur-sm">
        About
      </h1>
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
      { /* <div className="min-h-screen flex items-center justify-center mb-20">
        <div className="flex flex-col gap-32 sm:gap-40">
        </div>
      </div> */ }
    </section>
  );
}
