import type { Metadata, Viewport } from "next";
import { Bangers, Space_Grotesk } from "next/font/google";
import { PageMotion } from "@/app/components/page-motion";
import "./globals.css";

const sans = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const display = Bangers({
  variable: "--font-bangers",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Eurydion | Roblox worlds and films",
  description:
    "Play Eurydion's Roblox worlds and watch development films and short-form experiments.",
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable}`}
    >
      <body>
        <PageMotion />
        {children}
      </body>
    </html>
  );
}
