import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Kirt Morris | Operator Turned Workforce Strategist",
  description:
    "Enterprise performance strategist with 25+ years bridging technology delivery and people strategy for Fortune 1000 organizations.",
  keywords:
    "Kirt Morris, Head of People Analytics, Workforce Strategy, Chief People Officer, Talent Analytics, Culture Transformation",
  openGraph: {
    title: "Kirt Morris | Operator Turned Workforce Strategist",
    description:
      "I turn workforce data into competitive advantage. 25+ years bridging technology delivery and people strategy.",
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
      </body>
    </html>
  );
}
