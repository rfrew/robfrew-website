import Link from "next/link";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="text-xl font-bold mb-4">ROB FREW</h3>
            <p className="text-gray-400">
              Problem solver passionate about unblocking technical challenges.
            </p>
          </div>

          {/* Links Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">
              Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a
                  href="mailto:rob@robfrew.com"
                  className="hover:text-white transition-colors duration-200"
                >
                  rob@robfrew.com
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/frewrob"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  LinkedIn &rarr;
                </a>
              </li>
              <li>San Luis Obispo, California</li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Rob Frew. All rights reserved. Built
          with Next.js
        </div>
      </div>
    </footer>
  );
}
