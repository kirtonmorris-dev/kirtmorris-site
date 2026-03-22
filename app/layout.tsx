import type { Metadata } from "next";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Kirt Morris | People Operations & Talent Strategy Executive",
  description:
    "People operations executive with 25+ years bridging enterprise technology delivery and global people strategy in professional services. Building workforce analytics, talent systems, and operational infrastructure at scale.",
  keywords:
    "Kirt Morris, People Operations, Talent Strategy, Workforce Analytics, Professional Services, VP People Operations, HRIS, Workday, Organizational Design, Talent Systems",
  openGraph: {
    title: "Kirt Morris | People Operations & Talent Strategy Executive",
    description:
      "I build the talent infrastructure that scaling professional services firms need. 25+ years bridging enterprise technology delivery and global people strategy.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.JSX.Element {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily: "'DM Sans', sans-serif",
          WebkitFontSmoothing: "antialiased",
          background: "#0D1117",
          overflowX: "hidden",
        }}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
