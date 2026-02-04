import Link from "next/link";
import Image from "next/image";
import { projects } from "@/data/projects";
import { testimonials } from "@/data/experience";
import ProjectCard from "@/components/ProjectCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

  const companyLogos = [
    { src: "/images/logos/aws.svg", alt: "Amazon Web Services" },
    { src: "/images/logos/nuorder.svg", alt: "NuORDER" },
    { src: "/images/logos/kibo.svg", alt: "Kibo Commerce" },
    { src: "/images/logos/john-deere.svg", alt: "John Deere" },
    { src: "/images/logos/pfg.svg", alt: "Performance Food Group" },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            I turn complex technical challenges
            <br />
            into executable programs
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl">
            Senior Technical Program Manager | 15+ years building platforms that
            scale
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold">9PB</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Daily Data Processing
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold">$50M+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Impact Delivered
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold">965%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                YoY Platform Growth
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-extrabold">2,000+</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">
                Teams Supported
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/work"
              className="bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-900 transition-colors duration-200 text-center"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="border-2 border-black text-black px-8 py-4 text-lg font-semibold hover:bg-black hover:text-white transition-colors duration-200 text-center"
            >
              Let&apos;s Talk
            </Link>
          </div>
        </div>
      </section>

      {/* Company Logo Strip */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-wide text-gray-500 text-center mb-8">
            Where I&apos;ve Made Impact
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
            {companyLogos.map((logo) => (
              <Image
                key={logo.alt}
                src={logo.src}
                alt={logo.alt}
                width={56}
                height={56}
                className="opacity-60 hover:opacity-100 transition-opacity duration-200"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Work
          </h2>
          <p className="text-gray-600 text-lg mb-12 max-w-2xl">
            Deep dives into programs that delivered measurable impact at scale.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/work"
              className="text-black font-semibold hover:underline inline-flex items-center gap-1 text-lg"
            >
              View All Projects
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What Others Say
          </h2>
          <TestimonialCarousel testimonials={testimonials} typingSpeed={20} pauseAfterTyping={5000} />
          <div className="mt-8 text-center">
            <Link
              href="/about#testimonials"
              className="text-black font-semibold hover:underline inline-flex items-center gap-1 text-lg"
            >
              View All Testimonials
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </section>

      {/* About Me */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-4">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <Image
                  src="/images/headshot.jpg"
                  alt="Rob Frew"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                About Me
              </h2>
              <p className="text-lg md:text-xl leading-relaxed text-gray-700 mb-6">
                I&apos;m a problem solver passionate about unblocking technical
                challenges. For 15+ years, I&apos;ve specialized in transforming
                complex platform problems into measurable business
                impact&mdash;from managing Amazon&apos;s 9PB-daily security data
                lake to pioneering usage-based cost allocation frameworks at
                scale.
              </p>
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm font-medium">
                  Currently seeking Senior TPM roles in AI/ML platforms,
                  autonomous vehicles, and cloud infrastructure | Available
                  Immediately
                </span>
              </div>
              <div>
                <Link
                  href="/about"
                  className="text-black font-semibold hover:underline inline-flex items-center gap-1 text-lg"
                >
                  Learn More About Me
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Solve Your Next Technical Challenge?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            I&apos;m actively seeking Senior TPM opportunities and available
            immediately. Let&apos;s discuss how I can help your organization
            build platforms that scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/work"
              className="bg-white text-black px-8 py-4 text-lg font-semibold hover:bg-gray-100 transition-colors duration-200 text-center"
            >
              View My Work
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white hover:text-black transition-colors duration-200 text-center"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
