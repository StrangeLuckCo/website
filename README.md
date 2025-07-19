## Contentful

[Link here](https://app.contentful.com/spaces/t86k561yagqf)

<small>This is what we use for all of a project's data -- project name, release date, artwork and URL's, etc. You can create a new portfolio piece (or edit an existing) to create a new "Project" page on the website. Any changes that you save will appear _immediately_ on the live website.</small>

### Create a Project: Content --> Add entry --> Project

Required fields will be highlighted in red. Each field has some helper text that explains where you'll see this info. appear on the website. You can "archive" a project to remove it from the website without deleting all the data.

### Project Fields - updates these to edit your existing projects

- Title: this is the name of the project. You'll see this on the homepage and as the largest heading of the project page.

— Short Description: brief summary of the project -- this only appears on the homepage under Work.

— Description: longer summary of this project -- this will appear above the production credits on the project's page

— Markdown Description: Full-length credits section, or the longest version of a project's description. This is used only on the project's page at the bottom of the screen. Markdown is supported so you can customize this description however you'd like using HTML tags.

— Slug: This is used in the URL of the project page (ie. "https://yourstrangeluck.com/run-from-rain") Does not appear anywhere on the website itself.

- File URL: This is for Film/Video projects only -- this is the fullscreen display at the top of a Project page. If this field is missing (you can write "n/a"), Thumbnail URL will be used instead. Film can be controlled by the user with the media controls on top of the video -- ie. play/pause buttons, mute/unmute, and the scrub control is draggable as well. MP4 files are ideal here, and WEBM is fine too. MOV files should not be used.

- Thumbnail URL: This is for all project types -- it's used on the Work section of the homepage to preview the project. Additionally, Audio and Art projects will use this field for their Project page. MP4 or PNG files are ideal here. WEBM and SVG are fine too. GIF files should NOT be used here as they greatly reduce page load times. If this and the File URL are missing, a placeholder image will be shown where the thumbnail normally would be.

- Production Credits: the roles/credits that Strange Luck was responsible for on this project. Shown only on the Project page.

- Film Poster: visual artwork that will appear on the Project page to the left of other details (release date, credits, etc).

- Release Date: Month-Year format (ie. "May 2025").

- Display Type: this field is _super_ important -- it's used to decide which Project Page template to render on the website. Choice must be on of these three: Video, Art, or Audio. Podcast audio controls will only be available for Audio display types, for example. You can change this whenever you'd like, but you cannot choose both Video and Art for one project, for example.

- Project Images: Comma-separated list of the project's photos that will display on the carousel in the project page

- Project Audio Files: Comma-separated list of the project's audio files (uploaded to S3) that will be selectable/skippable from the project page's audio player. Audio Controls: fast-forward and rewind (2x speed) is supported. So is dragging or clicking the audio scrubber to change where you are on the track. To skip forward to the next track, double-click the fast-forward button (same deal with the rewind button).

- Thumbnail Ranking: Pick a number here to sort projects in the "Work" section by most-to-least priority. "1" will appear at the very top of the list, and "2"..."100"...etc. will appear lower. Projects of equal ranking within the same category (ie. "1" and "1") will appear alphabetically.

- External URL: This optional field will appear only on the Project page. Useful for sending a user to an external site (ie. if you want them to go read a published article), or anytime that you want a user to click and see some portfolio link somewhere else on the web.

- Tags: (optional) used to determine which category your project will appear underneath the Work section of the homepage. Choose from one or more of the following ("Design", "Film", "Photo", "Sound", "Writing"). These can be updated under Settings --> Tags.

## Amazon AWS (S3)

[Link here](https://us-east-1.console.aws.amazon.com/s3/buckets/strange-luck)

<small>All your files for the website are stored here for free/low-cost file storage.</small>

### How to upload a file:

1. Log into Amazon
2. Amazon S3 --> Buckets --> strange-luck --> folder (ie. headshots, homepage_hero, etc.)
3. "Upload" or drag a file in.
4. Permissions --> click "Grant public-read access" --> check yes for "I understand the risk of granting public-read access to the specified objects."
   P.S. Don't worry about the warning message -- anything you're sharing as a portfolio piece should be public, and these permissions only grant people the ability to view the image/video file that you're uploading online.
5. Click "Upload" at the bottom-right of the page. You're done!

### Folders

- /features/ --> All of the main File URLs for the Film projects are stored here. These are the full-screen long-form video files that you see on a Project page. File names aren't important as long as you also update the "File URL" field of the corresponding project in Contentful.

- /headshots/ --> your photos! These appear under About section of the homepage. You can replace these but make sure to keep the same file naming conventions in order to update the website ("Jacki_Huntington.png", "Jen_Ng.png", "Jess_Dipierro_Obert.png")

- /headshots/staff-bios.json --> all staff info under the "About" section can be edited here (ie. bios, etc.). Make sure to follow JSON file conventions or else the About section will break and parse the data incorrectly (ie. quote marks around keys ("imageSrc", "bio") and data values "Co-founder").

- /homepage_hero/ --> this folder's used for assets in the website. File naming must stay the same for all these files (the website looks for each file name in AWS).
  -- /REEL-WEBSITE-SLSTUDIO-NOSOUND-16x9-20250701_FORSITE.mp4 --> homepage hero video.
  -- /LogoAnimation-WithTagline_new.mp4 --> opening animation when a user visits Strange Luck for the first time.
  -- /Logo-WIDE.svg --> logo found in the navigation header.
  -- /Logo-WIDE-Glowing.svg --> glow version of the logo (used when a user hovers)

- /project_images/ --> These images are meant for the Carousel image slider in a project's page. You can save these images here and add them to project in Contentful. File names aren't important as long as you also update the "Project Images" field of the corresponding project in Contentful.

- /thumbnails/ --> All the thumbnail images for all projects are stored here. These appear on the Work section. File names aren't important as long as you also update the "File URL" field of the corresponding project in Contentful.

## Site Hosting & Site Certificates

ReSend -- email verification
*API Key
*MX and TXT records (in Porkbun)

DNS -- handled in Porkbun

- ALIAS and CNAME -- these point to the Netlify website/URL/IP Address
  \*MX and 2 TXT records -- these point to Resend for email verification (for the contact form)

Site Hosting -- Netlify
-- HTTPS certificate issued here. auto-renews every 3 months.
-- Updates in GitHub /main branch will automatically create a new deployment in Netlify. After a few minutes, as long as the netlify deployment doesn't fail, the changes will be live on the website!

## Getting Started with Github

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
