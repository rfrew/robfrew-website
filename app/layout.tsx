import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // The site is served on www (apex 307s there) — every absolute URL we
  // advertise to crawlers must use the www host or they all hit redirects.
  metadataBase: new URL("https://www.robfrew.com"),
  alternates: {
    canonical: "./",
  },
  title: {
    default: "Rob Frew | Senior Technical Program Manager",
    template: "%s | Rob Frew",
  },
  description:
    "Senior TPM with 15+ years building platforms at scale. Managed Amazon's 9PB-daily security data lake, delivered $50M+ impact. Currently seeking senior TPM roles.",
  keywords: [
    "technical program manager",
    "TPM",
    "AI/ML infrastructure",
    "platform engineering",
    "AWS",
    "data platforms",
    "senior TPM",
    "Amazon",
    "cloud infrastructure",
    "release management",
  ],
  authors: [{ name: "Rob Frew", url: "https://www.robfrew.com" }],
  creator: "Rob Frew",
  publisher: "Rob Frew",
  openGraph: {
    title: "Rob Frew | Senior Technical Program Manager",
    description:
      "Senior TPM with 15+ years building platforms at scale. Managed Amazon's 9PB-daily security data lake, delivered $50M+ impact.",
    url: "https://www.robfrew.com",
    siteName: "Rob Frew",
    locale: "en_US",
    type: "website",
    // Images come from app/opengraph-image.tsx / app/twitter-image.tsx —
    // don't list them here or the metadata points at files that don't exist.
  },
  twitter: {
    card: "summary_large_image",
    title: "Rob Frew | Senior Technical Program Manager",
    description:
      "Senior TPM with 15+ years building platforms at scale. Managed Amazon's 9PB-daily security data lake, delivered $50M+ impact.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className={`${inter.variable} font-sans bg-white text-black antialiased`}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
