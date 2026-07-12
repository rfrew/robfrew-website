"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Experience } from "@/data/experience";

interface TimelineProps {
  experiences: Experience[];
}

export default function Timeline({ experiences }: TimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);

  useEffect(() => {
    // Expand + scroll to the experience named in the URL hash — on load and
    // whenever an in-page #experience-… link changes the hash.
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#experience-')) {
        const id = hash.replace('#experience-', '');
        const experienceExists = experiences.some(exp => exp.id === id);
        if (experienceExists) {
          setExpandedId(id);
          // Scroll to the element after a short delay to ensure it's rendered
          setTimeout(() => {
            const element = document.getElementById(`experience-${id}`);
            if (element) {
              element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
          }, 100);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, [experiences]);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-200 transform md:-translate-x-1/2" />

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            id={`experience-${exp.id}`}
            className={`relative flex flex-col md:flex-row gap-8 ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-black rounded-full transform -translate-x-1/2 md:-translate-x-1/2 mt-1.5 z-10" />

            {/* Date badge - mobile */}
            <div className="md:hidden pl-8 text-sm font-medium text-gray-500">
              {exp.startDate} — {exp.endDate}
            </div>

            {/* Content card */}
            <div
              className={`ml-8 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12" : "md:pl-12"
              }`}
            >
              <button
                onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                aria-expanded={expandedId === exp.id}
                className="w-full text-left bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200"
              >
                {/* Date badge - desktop */}
                <div className="hidden md:block text-sm font-medium text-gray-500 mb-2">
                  {exp.startDate} — {exp.endDate}
                </div>

                <div className="flex items-center gap-3 mb-1">
                  {exp.logo && (
                    <div className="relative w-10 h-10 flex-shrink-0">
                      <Image
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        fill
                        sizes="40px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <h3 className="text-xl font-bold">{exp.company}</h3>
                </div>
                <p className="text-gray-600 mb-2">{exp.role}</p>
                <p className="text-sm text-gray-500">{exp.location}</p>

                {/* Expanded content */}
                {expandedId === exp.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="flex gap-2 text-gray-700">
                          <span className="text-gray-400">•</span>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Expand indicator */}
                <div className="mt-4 text-sm font-medium text-gray-500">
                  {expandedId === exp.id ? "Click to collapse" : "Click to expand"}
                </div>
              </button>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block md:w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
}
