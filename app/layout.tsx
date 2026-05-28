import type { Metadata } from "next";
import { Outfit, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Alistair Vance | Film Director & Cinematic Director",
    template: "%s | Alistair Vance"
  },
  description: "Explore the premium cinematic portfolio of Alistair Vance, featuring award-winning feature films, commercial campaigns, and music videos.",
  keywords: ["Film Director", "Cinematic Portfolio", "Commercial Filmmaker", "Alistair Vance", "Next.js Portfolio", "Framer Motion Portfolio"],
  authors: [{ name: "Alistair Vance" }],
  creator: "Alistair Vance",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://alistairvance.com",
    title: "Alistair Vance | Film Director",
    description: "Cinematic portfolio showcasing selected works, commercial productions, and narrative films.",
    siteName: "Alistair Vance Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alistair Vance | Film Director",
    description: "Cinematic portfolio showcasing narrative films, commercials, and music videos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-black text-foreground font-sans">
        {children}
      </body>
    </html>
  );
}
