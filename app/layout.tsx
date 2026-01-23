import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
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
  ],
  authors: [{ name: "Rob Frew" }],
  creator: "Rob Frew",
  openGraph: {
    title: "Rob Frew | Senior Technical Program Manager",
    description:
      "Senior TPM with 15+ years building platforms at scale. Managed Amazon's 9PB-daily security data lake, delivered $50M+ impact.",
    url: "https://robfrew.com",
    siteName: "Rob Frew",
    locale: "en_US",
    type: "website",
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
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-white text-black antialiased`}>
        <Header />
        <main className="pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
