import { Metadata } from "next";
import SkillBar from "@/components/SkillBar";
import {
  skillCategories,
  methodologies,
  tools,
  certifications,
  patents,
  notableWork,
} from "@/data/skills";

export const metadata: Metadata = {
  title: "Skills & Expertise",
  description:
    "Technical depth in cloud infrastructure, data platforms (9PB scale), AI/ML, release management, cost optimization, and cross-functional leadership.",
};

export default function SkillsPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Skills & Expertise
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            15+ years of technical depth across cloud infrastructure, data
            platforms, and program leadership.
          </p>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Technical Skills
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {skillCategories.map((category) => (
              <div key={category.title}>
                <h3 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-300">
                  {category.title}
                </h3>
                <div>
                  {category.skills.map((skill) => (
                    <SkillBar
                      key={skill.name}
                      name={skill.name}
                      level={skill.level}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodologies & Tools */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Methodologies */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Methodologies & Frameworks
              </h2>
              <div className="flex flex-wrap gap-3">
                {methodologies.map((method) => (
                  <span
                    key={method}
                    className="bg-black text-white px-4 py-2 text-sm font-medium"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Tools & Platforms
              </h2>
              <div className="flex flex-wrap gap-3">
                {tools.map((tool) => (
                  <span
                    key={tool}
                    className="bg-gray-100 text-gray-800 px-4 py-2 text-sm font-medium"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">Certifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="bg-white border border-gray-200 p-6"
              >
                <div className="flex items-start gap-4">
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
                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-base font-semibold mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-500">
                      {cert.issuer} &middot; {cert.year}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patents & Notable Work */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Patents & Notable Work
          </h2>

          <div className="space-y-8">
            {/* Patents */}
            {patents.map((patent) => (
              <div
                key={patent.name}
                className="border-l-4 border-black pl-6 py-2"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Patent
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{patent.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{patent.company}</p>
                <p className="text-gray-700">{patent.description}</p>
              </div>
            ))}

            {/* Notable Work */}
            {notableWork.map((work) => (
              <div
                key={work.name}
                className="border-l-4 border-gray-300 pl-6 py-2"
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                    Notable Work
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{work.name}</h3>
                <p className="text-gray-700">{work.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to see these skills in action?
          </h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Check out my project portfolio to see how I&apos;ve applied these
            skills to deliver real business impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/work"
              className="bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-block"
            >
              View My Work
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-black transition-colors duration-200 inline-block"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
