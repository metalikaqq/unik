import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { StarfieldClient } from "@/components/cosmos/StarfieldClient";

import "./globals.css";

const interDisplay = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cosmos · An atlas of the observable universe",
    template: "%s · Cosmos",
  },
  description:
    "An atlas of the observable universe. Planets, galaxies, black holes, and nebulae — rendered in motion.",
  metadataBase: new URL("https://cosmos.local"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${interDisplay.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="relative flex min-h-full flex-col overflow-x-hidden">
        <StarfieldClient />
        <Nav />
        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
