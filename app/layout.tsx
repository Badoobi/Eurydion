import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { CustomCursor } from "@/app/components/custom-cursor";
import { InteractionSound } from "@/app/components/interaction-sound";
import { PageMotion } from "@/app/components/page-motion";
import { SiteLoader } from "@/app/components/site-loader";
import "./globals.css";

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Eurydion | Worlds, systems, and stories",
  description:
    "Explore Eurydion's Roblox worlds, development films, and short-form experiments.",
};

export const viewport: Viewport = {
  themeColor: "#0a080d",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable}`}
    >
      <body>
        <SiteLoader />
        <PageMotion />
        <CustomCursor />
        <InteractionSound />
        {children}
      </body>
    </html>
  );
}
