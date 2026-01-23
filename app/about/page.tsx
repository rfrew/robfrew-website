import { Metadata } from "next";
import Image from "next/image";
import Timeline from "@/components/Timeline";
import { experiences, testimonials, approachItems } from "@/data/experience";

export const metadata: Metadata = {
  title: "About",
  description:
    "Problem solver with 15+ years transforming complex technical challenges into business impact. 'Exceeds High Bar' performer at Amazon Security.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            About Me
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Problem solver. Technical leader. Builder of platforms that scale.
          </p>
        </div>
      </section>

      {/* Personal Introduction */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Headshot */}
            <div className="lg:col-span-4">
              <div className="aspect-square bg-gray-200 relative overflow-hidden">
                <Image
                  src="/images/headshot.jpg"
                  alt="Rob Frew"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Bio */}
            <div className="lg:col-span-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  I&apos;m Rob Frew, a Senior Technical Program Manager with 15+
                  years transforming complex technical challenges into measurable
                  business impact. Currently based in San Luis Obispo, California,
                  I specialize in the intersection of technical depth and
                  cross-functional leadership—building platforms that don&apos;t just
                  work, but scale.
                </p>

                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  My career has been defined by a passion for solving problems
                  others consider insurmountable. Whether it&apos;s managing
                  Amazon&apos;s Basin platform processing 9PB daily, pioneering
                  usage-based cost allocation across AWS services, or scaling
                  systems through 965% year-over-year growth while maintaining
                  99.9% availability, I thrive in environments where there&apos;s no
                  established playbook.
                </p>

                <p className="text-lg leading-relaxed text-gray-700 mb-6">
                  What drives me is the opportunity to unblock technical challenges
                  that have real business impact. I&apos;ve delivered over $50 million
                  in cumulative cost savings and revenue growth throughout my
                  career, but I&apos;m most proud of the teams I&apos;ve empowered and the
                  frameworks I&apos;ve established that continue delivering value long
                  after projects complete.
                </p>

                <p className="text-lg leading-relaxed text-gray-700">
                  I believe the best technical program managers combine three rare
                  skills: deep technical judgment to understand system complexity,
                  business acumen to prioritize what matters, and interpersonal
                  effectiveness to influence without authority. This combination
                  has allowed me to coordinate initiatives spanning 40+
                  microservices across multiple organizations—none reporting to
                  me—and consistently earn &quot;Exceeds High Bar&quot; performance ratings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">My Approach</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {approachItems.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 p-8 hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Journey */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            Career Journey
          </h2>

          <Timeline experiences={experiences} />
        </div>
      </section>

      {/* What Others Say */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">
            What Others Say
          </h2>

          <div className="space-y-8">
            {testimonials.map((testimonial) => (
              <blockquote
                key={testimonial.id}
                className="border-l-4 border-black pl-8 py-4"
              >
                <p className="text-xl text-gray-700 leading-relaxed mb-4 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
                <footer className="text-gray-600">
                  <span className="font-semibold">{testimonial.author}</span>
                  <span className="mx-2">—</span>
                  <span>{testimonial.company}</span>
                  {testimonial.context && (
                    <span className="text-gray-500">
                      {" "}
                      ({testimonial.context})
                    </span>
                  )}
                </footer>
              </blockquote>
            ))}
          </div>

          {/* Leadership Principles */}
          <div className="mt-12 p-8 bg-gray-50 border border-gray-200">
            <h3 className="text-lg font-semibold mb-4">
              Leadership Principles Demonstrated
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
              <div>
                <span className="font-medium">Solid Strength:</span> Dive Deep,
                Learn and Be Curious, Deliver Results
              </div>
              <div>
                <span className="font-medium">Growth Focus:</span> Bias for
                Action, Think Big, Hire and Develop the Best
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond Work */}
      <section className="py-16 bg-black text-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Beyond Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
                Location
              </h3>
              <p className="text-xl">San Luis Obispo, California</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
                Work Preferences
              </h3>
              <ul className="space-y-1">
                <li>Open to: On-site, Hybrid, or Remote</li>
                <li>Willing to relocate: Yes, for the right opportunity</li>
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-400 mb-2">
                Availability
              </h3>
              <p className="text-xl">Available Immediately</p>
            </div>
          </div>
        </div>
      </section>

      {/* What I'm Seeking */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            What I&apos;m Seeking
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Senior Technical Program Manager or Principal Product Manager roles
            in AI/ML platforms, autonomous vehicles, cloud infrastructure, or any
            organization building innovative technology at scale.
          </p>
          <a
            href="/contact"
            className="bg-black text-white px-8 py-4 text-lg font-semibold hover:bg-gray-900 transition-colors duration-200 inline-block"
          >
            Let&apos;s Talk
          </a>
        </div>
      </section>
    </div>
  );
}
