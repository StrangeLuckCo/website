// components/StaffSection.tsx
import StaffHeadshot from "./StaffHeadshot";
import {
  JACKI_HEADSHOT,
  JESS_HEADSHOT,
  JEN_HEADSHOT,
} from "../utility/constants";

const staffData = [
  {
    imageSrc: JACKI_HEADSHOT,
    altText: "Jacki Huntington",
    name: "Jacki Huntington",
    title: "CO-FOUNDER",
    credits: "DIRECTOR • CINEMATOGRAPHER • PRODUCER • WRITER",
    bio: `Storytelling work has taken Jacki across continents and
      cultures, from the bustling streets of Port-au-Prince, Haiti, to
      the serene landscapes of the Mississippi Delta. With a
      background as a producer at Refinery29 working in New York City
      and Los Angeles, Jacki has pioneered groundbreaking feminist and
      body-positive video content that continues to shape the media
      industry’s aesthetic. Jacki has worked as a producer, editor,
      and composer for a variety of podcasts including The City of the
      Rails, Under the Influence with Jo Piazza and Really Good
      Shares. These days, she is managing communications for the
      Center for Global Health at Mass General Brigham as she forges
      ahead with a handful of independent documentary film projects.`,
  },
  {
    imageSrc: JESS_HEADSHOT,
    altText: "Jess DiPierro Obert",
    name: "JESS DIPIERRO OBERT",
    title: "CO-FOUNDER",
    credits: "DIRECTOR • CINEMATOGRAPHER • PRODUCER • WRITER • EDITOR",
    bio: `Jess is an award-winning investigative visual journalist,
      producer and filmmaker. She is focused on solution-based
      storytelling, and has worked globally in countries like Haiti
      since 2016. From 2018 to 2020, Jess led a series of workshops
      for Girls Voices, a nonprofit organization that empowers young
      girls globally to develop their media storytelling skills. She
      received a ‘Still I Rise’ Visual Arts Grant to work on a film
      about women peace builders in conflict zones within Port Au
      Prince, Haiti, which premiered at FESPACO in Burkina Faso.
      Jess’ work has been exhibited at Prix Bayeux
      Calvados-Normandie and has received a Radio Television Digital
      News Association (RTDNA) Murrow award and Vimeo Staff Pick.`,
  },
  {
    imageSrc: JEN_HEADSHOT,
    altText: "Jen Ng",
    name: "JEN NG",
    title: "CO-FOUNDER",
    credits: "ART DIRECTOR • BRAND STRATEGIST • DESIGNER • STORY CONSULTANT",
    bio: `Jen’s world is a playground for human connection. Her lifelong
      interest in art, media, and psychology has led her to work as
      an art director, brand strategist, and experience designer for
      clients with a story to tell. Projects range from design for an
      oral history program to research and design for an augmented
      reality immersive news app. She works on social justice
      projects rooted in LGBTQIA+ issues, race, and youth
      empowerment. Workshop design and facilitation create a nice
      break from the screen, allowing her to take her digital skills
      offline. Her ongoing work explores ways that story, identity,
      and self-expression can work together to strengthen
      communities.`,
  },
];

export default function StaffSection() {
  return (
    <section id="staff" className="min-h-screen text-white">
      <h1 className="pl-4 sm:pl-20 text-3xl sm:text-5xl text-glow-small">
        About
      </h1>
      <div className="min-h-screen flex items-center justify-center p-10 mb-20">
        <div className="flex flex-col gap-40">
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
