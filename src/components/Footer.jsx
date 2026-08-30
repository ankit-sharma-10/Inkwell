import { Link } from "react-router-dom";
import Logo from "./Logo";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Company",
      links: ["Features", "Pricing", "Affiliate Program", "Press Kit"],
    },
    {
      title: "Support",
      links: ["Account", "Help", "Contact Us", "Customer Support"],
    },
    {
      title: "Legals",
      links: ["Terms & Conditions", "Privacy Policy", "Licensing"],
    },
  ];

  return (
    <footer className="border-t border-glass-border bg-dark-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <Logo width="120px" />
            </div>
            <p className="text-neutral-300 text-sm leading-relaxed max-w-xs">
              Share your ideas with the world. A modern platform for thoughtful
              writing.
            </p>
            <p className="text-neutral-300/50 text-xs mt-6">
              &copy; {currentYear} Inkwell. All rights reserved.
            </p>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-300/60 mb-4">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link}>
                    <Link
                      to="/"
                      className="text-sm text-neutral-300 hover:text-accent-400 transition-colors duration-200"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
