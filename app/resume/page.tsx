import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download tailored resumes for TPM, Release Management, Product Management, and Solutions Architecture roles. 15+ years experience, $50M+ career impact.",
};

const quickStats = [
  { value: "15+", label: "Years Experience" },
  { value: "$50M+", label: "Career Impact" },
  { value: "6", label: "Certifications" },
  { value: "Exceeds", label: "High Bar Performer" },
];

const resumeVersions = [
  {
    title: "General TPM Resume",
    description:
      "Comprehensive 2-page resume highlighting technical program management experience across Amazon, NuORDER, Kibo Commerce, and earlier roles.",
    filename: "Rob_Frew_Resume_TPM.pdf",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    primary: true,
  },
  {
    title: "Release Management Focus",
    description:
      "Emphasizes CI/CD pipelines, release operations, quality frameworks, and deployment confidence—ideal for release management and DevOps-focused TPM roles.",
    filename: "Rob_Frew_Resume_Release_Management.pdf",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    primary: false,
  },
  {
    title: "Product Management Focus",
    description:
      "Highlights product strategy, roadmaps, go-to-market execution, and ARR growth—tailored for Principal Product Manager or Sr. PM roles.",
    filename: "Rob_Frew_Resume_Product_Manager.pdf",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      </svg>
    ),
    primary: false,
  },
  {
    title: "Solutions Architecture Focus",
    description:
      "Emphasizes customer-facing technical consulting, requirements gathering, and custom integration design—ideal for Solutions Architect or Pre-Sales Engineering roles.",
    filename: "Rob_Frew_Resume_Solutions_Architecture.pdf",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    primary: false,
  },
];

export default function ResumePage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Resume
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Download tailored versions for different role types, or view the
            highlights below.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {quickStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadable Versions */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Downloadable Versions
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resumeVersions.map((version) => (
              <div
                key={version.title}
                className={`border p-6 ${
                  version.primary
                    ? "border-black border-2"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`w-12 h-12 flex items-center justify-center flex-shrink-0 ${
                      version.primary
                        ? "bg-black text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {version.icon}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{version.title}</h3>
                      {version.primary && (
                        <span className="text-xs bg-black text-white px-2 py-0.5">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      {version.description}
                    </p>
                    <a
                      href={`/resumes/${version.filename}`}
                      download
                      className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold transition-colors duration-200 ${
                        version.primary
                          ? "bg-black text-white hover:bg-gray-800"
                          : "border border-gray-300 text-black hover:border-black"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resume Highlights */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Resume Highlights
          </h2>

          {/* Professional Summary */}
          <div className="bg-white border border-gray-200 p-8 mb-8">
            <h3 className="text-lg font-semibold mb-4 text-gray-500 uppercase tracking-wide">
              Professional Summary
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Senior Technical Program Manager with 15+ years transforming
              complex platform challenges into measurable business impact.
              Currently managing Amazon&apos;s Basin platform processing 9PB daily,
              delivering $24.9M in cost savings while scaling 965% YoY. Proven
              track record of cross-functional leadership across 40+
              microservices, pioneering AWS Metering integration, and
              consistently achieving &quot;Exceeds High Bar&quot; performance ratings.
              Seeking senior TPM roles in AI/ML platforms, autonomous vehicles,
              or cloud infrastructure.
            </p>
          </div>

          {/* Key Experience */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-500 uppercase tracking-wide">
              Key Experience
            </h3>

            {/* Amazon */}
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold">Amazon Web Services</h4>
                  <p className="text-gray-600">
                    Technical Program Manager III
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2 md:mt-0">
                  June 2022 — Present
                </p>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Led Basin platform (9PB daily, 350K+ sources, 99.9% SLA)
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Delivered $24.9M annual savings through 15 cost optimization initiatives
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Pioneered AWS Metering integration ($12.7M+ cost attribution)
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Managed 965% YoY growth across 30+ AWS regions
                </li>
              </ul>
            </div>

            {/* NuORDER */}
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold">NuORDER</h4>
                  <p className="text-gray-600">Principal Product Manager</p>
                </div>
                <p className="text-sm text-gray-500 mt-2 md:mt-0">
                  2021 — 2022
                </p>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Drove platform modernization from monolith to microservices
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Achieved 28% ARR growth in first 6 months
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Implemented comprehensive CI/CD pipelines
                </li>
              </ul>
            </div>

            {/* Kibo */}
            <div className="bg-white border border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold">Kibo Commerce</h4>
                  <p className="text-gray-600">
                    Product Manager → TPM → Principal PM
                  </p>
                </div>
                <p className="text-sm text-gray-500 mt-2 md:mt-0">
                  2011 — 2021
                </p>
              </div>
              <ul className="space-y-2 text-gray-700">
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Built fraud detection system from scratch for enterprise platform
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Reduced implementation time 50% (8mo → 4mo), improved margin 120%
                </li>
                <li className="flex gap-2">
                  <span className="text-gray-400">•</span>
                  Managed $110M+ revenue platform initiatives
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to learn more?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Download my full resume or get in touch to discuss how I can
            contribute to your team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/resumes/Rob_Frew_Resume_TPM.pdf"
              download
              className="bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-900 transition-colors duration-200 inline-flex items-center justify-center gap-2"
            >
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
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download Resume
            </a>
            <Link
              href="/contact"
              className="border-2 border-black text-black px-8 py-4 text-lg font-semibold hover:bg-black hover:text-white transition-colors duration-200 inline-block"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
