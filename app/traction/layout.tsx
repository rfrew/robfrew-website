import { traction } from "@/data/traction";

// Shared frame for the TrAction public pages (privacy, support, join). Kept
// deliberately plain: these are reference pages the app stores link to.
// The bar's links are plain anchors (full page loads), so Back to the join
// form is either a fresh load or a back/forward-cache restore, which the
// form's pageshow handler cleans up (passwords, submit state).
export default function TractionLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen">
      <section className="border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl py-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          <span className="text-base font-bold">{traction.name}</span>
          <nav aria-label="TrAction pages" className="flex gap-x-6">
            <a
              href={traction.supportPath}
              className="text-gray-600 hover:text-black underline-offset-4 hover:underline"
            >
              Support
            </a>
            <a
              href={traction.privacyPath}
              className="text-gray-600 hover:text-black underline-offset-4 hover:underline"
            >
              Privacy Policy
            </a>
          </nav>
        </div>
      </section>
      <section className="py-8 md:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-3xl">
          {children}
        </div>
      </section>
    </div>
  );
}
