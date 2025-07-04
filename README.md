Notes for Documentation:

ReSend -- email verification
*API Key
*MX and TXT records (in Porkbun)

DNS -- handled in Porkbun

- ALIAS and CNAME -- these point to the Netlify website/URL/IP Address
  \*MX and 2 TXT records -- these point to Resend for email verification (for the contact form)

Site Hosting -- Netlify
HTTPS certificate issued here. auto-renews every 3 months.

Contentful :: metadata
(Sound Design, etc.)
— description
— MarkdownDescription
— title
— slug
— credits
— S3 file location
— S3 thumbnail location

S3
!! this is in Mike's account right now. Need to migrate ownership to Strange Luck.
— object file
— thumbnail file

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
