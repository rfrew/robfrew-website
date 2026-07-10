import { Metadata } from "next";
import ServicePackages from "@/components/ServicePackages";

export const metadata: Metadata = {
  title: "Work With Me",
  description:
    "Hire Rob Frew for web design and development. Choose a package and pay securely online via Stripe.",
};

export default function PayPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Work With Me
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Pick the package that fits your project and pay securely online.
            Need something custom?{" "}
            <a href="/contact" className="underline hover:text-black">
              Get in touch
            </a>{" "}
            and I&apos;ll send you a tailored invoice.
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <ServicePackages />
        </div>
      </section>
    </div>
  );
}
