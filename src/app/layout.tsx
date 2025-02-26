import type { Metadata } from "next";
import { Comic_Neue } from "next/font/google";
import "./globals.css";

const comicNeue = Comic_Neue({
  weight: ["400", "700"],
  variable: "--font-comic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title:
    "Walkin&apos; Talkin&apos; - Text-to-Speech in Christopher Walken&apos;s Style",
  description:
    "Generate speech in the style of Christopher Walken&apos;s distinctive voice",
  keywords: [
    "Christopher Walken",
    "text to speech",
    "voice generator",
    "speech synthesis",
  ],
  authors: [{ name: "Walkin Talkin Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="generator" content="FrontPage 5.0" />
        <meta
          name="keywords"
          content="christopher walken, voice generator, text to speech, walken talk"
        />
        <meta
          name="description"
          content="The BEST Christopher Walken voice generator on the web! Make Christopher Walken say anything you want!"
        />
      </head>
      <body className={`${comicNeue.variable} antialiased`}>{children}</body>
    </html>
  );
}
