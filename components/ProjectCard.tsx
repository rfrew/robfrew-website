import Link from "next/link";
import { Project } from "@/data/projects";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 flex flex-col h-full">
      {/* Company & Category Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span className="text-xs bg-black text-white px-3 py-1 font-medium">
          {project.company}
        </span>
        <span className="text-xs bg-gray-100 text-gray-700 px-3 py-1">
          {project.category}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold mb-3">{project.title}</h3>

      {/* Description */}
      <p className="text-gray-700 mb-4 flex-grow">{project.shortDescription}</p>

      {/* Impact Highlights */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {project.impact.slice(0, 2).map((item, index) => (
            <span
              key={index}
              className="text-xs font-medium text-gray-600 bg-gray-50 px-2 py-1"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.slice(0, 4).map((tech) => (
          <span key={tech} className="text-xs text-gray-500">
            {tech}
          </span>
        ))}
      </div>

      {/* CTA */}
      <Link
        href={`/work/${project.slug}`}
        className="text-black font-semibold hover:underline inline-flex items-center gap-1 mt-auto"
      >
        Learn More
        <span aria-hidden="true">&rarr;</span>
      </Link>
    </div>
  );
}
