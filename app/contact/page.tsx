import { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Actively seeking Senior TPM roles in AI/ML platforms, autonomous vehicles, and cloud infrastructure. Based in San Luis Obispo, CA. Available immediately.",
};

const targetRoles = [
  "Senior Technical Program Manager",
  "Technical Program Manager, Release",
  "Principal Product Manager",
  "TPM - AI/ML Infrastructure",
  "TPM - Platform Engineering",
  "Program Manager - Autonomous Vehicles",
];

const industries = [
  { icon: "🚗", name: "Autonomous Vehicles" },
  { icon: "🤖", name: "AI/ML Platforms" },
  { icon: "☁️", name: "Cloud Infrastructure" },
  { icon: "🛠️", name: "Developer Tools & Productivity" },
  { icon: "📊", name: "Large-Scale Data Systems" },
  { icon: "🔒", name: "Security Platforms" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Let&apos;s Talk
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            I&apos;m actively seeking Senior TPM opportunities. Let&apos;s discuss how I
            can help solve your technical challenges.
          </p>
        </div>
      </section>

      {/* Contact Form + Info */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white border border-gray-200 p-8">
              <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              {/* Direct Contact */}
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="text-2xl font-bold mb-6">Direct Contact</h2>
                <ul className="space-y-4">
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <a
                        href="mailto:rob@robfrew.com"
                        className="font-medium hover:underline"
                      >
                        rob@robfrew.com
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <a
                        href="tel:309-751-7423"
                        className="font-medium hover:underline"
                      >
                        309-751-7423
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">LinkedIn</p>
                      <a
                        href="https://linkedin.com/in/frewrob"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                      >
                        linkedin.com/in/frewrob &rarr;
                      </a>
                    </div>
                  </li>
                  <li className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-black text-white flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">San Luis Obispo, California</p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Availability */}
              <div className="bg-white border border-gray-200 p-8">
                <h2 className="text-2xl font-bold mb-6">Availability</h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                    <span className="font-medium">Available Immediately</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">Open to:</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 px-3 py-1 text-sm">
                        On-site
                      </span>
                      <span className="bg-gray-100 px-3 py-1 text-sm">
                        Hybrid
                      </span>
                      <span className="bg-gray-100 px-3 py-1 text-sm">
                        Remote
                      </span>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">
                      Willing to relocate:
                    </p>
                    <p className="font-medium">Yes, for the right opportunity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Roles */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Roles I&apos;m Seeking
          </h2>
          <div className="flex flex-wrap gap-3">
            {targetRoles.map((role) => (
              <span
                key={role}
                className="bg-black text-white px-4 py-2 text-sm font-medium"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Industries of Interest
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {industries.map((industry) => (
              <div
                key={industry.name}
                className="bg-white border border-gray-200 p-4 text-center"
              >
                <div className="text-3xl mb-2">{industry.icon}</div>
                <p className="text-sm font-medium">{industry.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
