import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { Footer, Navbar } from "@/components";
import { getContentByTag } from "@/lib/actions/content.actions";
import { Content } from "@/common.types";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const organization: Content = await getContentByTag("organization");

  return {
    title: organization?.title,
    description: organization?.subtitle,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex min-h-screen flex-col items-center justify-between text-primary-black ${inter.className}`}
      >
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}
