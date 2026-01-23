"use client";

import { useState } from "react";
import { projects, companies, categories, Company, ProjectCategory } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";

export default function WorkPage() {
  const [selectedCompany, setSelectedCompany] = useState<Company | "All">("All");
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | "All">("All");

  const filteredProjects = projects.filter((project) => {
    const companyMatch = selectedCompany === "All" || project.company === selectedCompany;
    const categoryMatch = selectedCategory === "All" || project.category === selectedCategory;
    return companyMatch && categoryMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Selected Work
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Deep dives into major programs I&apos;ve led, from scaling Amazon&apos;s
            9PB-daily security data lake to pioneering usage-based cost
            allocation frameworks.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="border-y border-gray-200 bg-gray-50 sticky top-20 z-40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Company Filter */}
            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-500 self-center mr-2">
                Company:
              </span>
              <button
                onClick={() => setSelectedCompany("All")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  selectedCompany === "All"
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300 hover:border-black"
                }`}
              >
                All
              </button>
              {companies.map((company) => (
                <button
                  key={company}
                  onClick={() => setSelectedCompany(company)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    selectedCompany === company
                      ? "bg-black text-white"
                      : "bg-white text-black border border-gray-300 hover:border-black"
                  }`}
                >
                  {company}
                </button>
              ))}
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 md:ml-auto">
              <span className="text-sm font-medium text-gray-500 self-center mr-2">
                Type:
              </span>
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === "All"
                    ? "bg-black text-white"
                    : "bg-white text-black border border-gray-300 hover:border-black"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-white text-black border border-gray-300 hover:border-black"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-600 text-lg">
                No projects match the selected filters.
              </p>
              <button
                onClick={() => {
                  setSelectedCompany("All");
                  setSelectedCategory("All");
                }}
                className="mt-4 text-black font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
