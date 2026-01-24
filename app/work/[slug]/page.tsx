import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { Metadata } from "next";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  // Find related projects (same company or category, excluding current)
  const relatedProjects = projects
    .filter(
      (p) =>
        p.id !== project.id &&
        (p.company === project.company || p.category === project.category)
    )
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Project Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          {/* Back Link */}
          <Link
            href="/work"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-black transition-colors duration-200 mb-8"
          >
            <span aria-hidden="true">&larr;</span>
            Back to Work
          </Link>

          {/* Title & Meta */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {project.title}
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mb-8">
            {project.shortDescription}
          </p>

          {/* Project Meta */}
          <div className="flex flex-wrap gap-4 text-sm">
            <div className="bg-black text-white px-4 py-2 font-medium">
              {project.company}
            </div>
            <div className="bg-gray-100 text-gray-700 px-4 py-2">
              {project.category}
            </div>
          </div>
        </div>
      </section>

      {/* Project Image */}
      {project.image && (
        <section className="py-8">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="flex justify-center border border-gray-200 bg-gray-50 p-4">
              <Image
                src={project.image}
                alt={project.title}
                width={1200}
                height={800}
                className="max-w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>
      )}

      {/* Impact Metrics */}
      <section className="py-12 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {project.impact.map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold mb-1">{item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Challenge & Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Challenge */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                The Challenge
              </h2>
              <p className="text-gray-700 leading-relaxed">{project.challenge}</p>
            </div>

            {/* Approach */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-6">My Approach</h2>
              <p className="text-gray-700 leading-relaxed">{project.approach}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Deliverables */}
      {project.keyDeliverables && project.keyDeliverables.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Key Deliverables
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.keyDeliverables.map((deliverable, index) => (
                <div
                  key={index}
                  className="bg-white border border-gray-200 p-6"
                >
                  <p className="text-gray-700">{deliverable}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Technologies & Tools
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="bg-gray-100 text-gray-800 px-4 py-2 text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Related Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProjects.map((related) => (
                <Link
                  key={related.id}
                  href={`/work/${related.slug}`}
                  className="bg-white border border-gray-200 p-6 hover:shadow-lg transition-shadow duration-200 block"
                >
                  <div className="flex gap-2 mb-3">
                    <span className="text-xs bg-black text-white px-2 py-1">
                      {related.company}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1">
                      {related.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{related.title}</h3>
                  <p className="text-gray-600 text-sm">
                    {related.shortDescription}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Want to discuss this project?
          </h2>
          <p className="text-gray-600 mb-8">
            I&apos;d love to share more details about my approach and results.
          </p>
          <Link
            href="/contact"
            className="bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-900 transition-colors duration-200 inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
