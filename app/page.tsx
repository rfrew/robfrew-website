import Link from "next/link";

export default function Home() {
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

      {/* Quick Intro */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
          <p className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-3xl mb-6">
            I&apos;m a problem solver passionate about unblocking technical
            challenges. For 15+ years, I&apos;ve specialized in transforming
            complex platform problems into measurable business impact&mdash;from
            managing Amazon&apos;s 9PB-daily security data lake to pioneering
            usage-based cost allocation frameworks at scale.
          </p>
          <div className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            <span className="text-sm font-medium">
              Currently seeking Senior TPM roles in AI/ML platforms, autonomous
              vehicles, and cloud infrastructure | Available Immediately
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
