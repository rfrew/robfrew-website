import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://robfrew.com"),
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
  authors: [{ name: "Rob Frew", url: "https://robfrew.com" }],
  creator: "Rob Frew",
  publisher: "Rob Frew",
  openGraph: {
    title: "Rob Frew | Senior Technical Program Manager",
    description:
      "Senior TPM with 15+ years building platforms at scale. Managed Amazon's 9PB-daily security data lake, delivered $50M+ impact.",
    url: "https://robfrew.com",
    siteName: "Rob Frew",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Rob Frew - Senior Technical Program Manager",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rob Frew | Senior Technical Program Manager",
    description:
      "Senior TPM with 15+ years building platforms at scale. Managed Amazon's 9PB-daily security data lake, delivered $50M+ impact.",
    images: ["/og-image.png"],
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
  verification: {
    // Add these when you set up Google Search Console
    // google: "your-google-verification-code",
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
      </body>
    </html>
  );
}
