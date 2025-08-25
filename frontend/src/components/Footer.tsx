import React, { Suspense, lazy } from "react";

const Facebook = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Facebook }))
);
const Twitter = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Twitter }))
);
const Instagram = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Instagram }))
);
const Linkedin = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Linkedin }))
);
const Youtube = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Youtube }))
);
const Mail = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Mail }))
);
const Phone = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Phone }))
);

const Footer = () => {
  return (
    <footer className="bg-crypto-dark border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company & Logo */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              {/* Optional: Logo SVG can go here */}
              <span className="text-2xl font-bold text-crypto-blue">
                Payzee
              </span>
            </div>
            <p className="text-gray-400">
              Bridging cryptocurrency and everyday UPI payments in India.
            </p>
            <div className="flex space-x-4" aria-label="Social Media Links">
              <Suspense fallback={null}>
                <a
                  href="#"
                  className="text-gray-400 hover:text-crypto-blue"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-crypto-blue"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-crypto-blue"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-crypto-blue"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-crypto-blue"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </a>
              </Suspense>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Services</h3>
            <ul className="space-y-4">
              {[
                "Crypto to INR",
                "UPI QR Payments",
                "Merchant Solutions",
                "API Integration",
                "Corporate Accounts",
              ].map((service) => (
                <li key={service}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-4">
              {[
                "Documentation",
                "Help Center",
                "Blog",
                "Supported Cryptocurrencies",
                "FAQ",
              ].map((resource) => (
                <li key={resource}>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {resource}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <Suspense fallback={null}>
                <li className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-crypto-blue" />
                  <span className="text-gray-400">support@payzee.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-crypto-blue" />
                  <span className="text-gray-400">+91 9876543210</span>
                </li>
              </Suspense>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-2">
                Subscribe to our newsletter
              </h4>
              <form className="flex" aria-label="Newsletter Subscription">
                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Email address"
                  className="px-4 py-2 bg-crypto-darker border border-white/10 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-crypto-blue/50 text-white w-full"
                />
                <button
                  type="submit"
                  className="bg-crypto-blue hover:bg-crypto-blue/90 text-white px-4 py-2 rounded-r-lg"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-12 text-gray-400 text-sm flex flex-col md:flex-row justify-between items-center">
          <span>© 2023 Payzee. All rights reserved.</span>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {["Privacy Policy", "Terms of Service", "Cookies Policy"].map(
              (policy) => (
                <a key={policy} href="#" className="hover:text-white">
                  {policy}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
