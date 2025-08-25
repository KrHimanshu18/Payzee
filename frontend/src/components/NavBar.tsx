import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Reusable SVG Icon
const CryptoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-cryptoBlue"
  >
    <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.16-6.2L12.19 4.2" />
    <path d="M7.48 20.364c3.42.602 4.261-4.182.842-4.784m-3.756 5.344 2.914.512m-2.914-.512c-2.235-.394-2.792-3.016-.556-3.41" />
  </svg>
);

// Logo Component
const Logo = () => (
  <Link to="/" className="flex items-center gap-2">
    <div className="crypto-icon blue-glow">
      <CryptoIcon />
    </div>
    <span className="text-xl font-bold text-white">Payzee</span>
  </Link>
);

// Navigation Links
const NavLinks = ({
  isMobile = false,
  onClick,
}: {
  isMobile?: boolean;
  onClick?: () => void;
}) => {
  const links = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
  ];

  return (
    <div
      className={`${
        isMobile ? "flex flex-col gap-4 pt-4" : "hidden md:flex gap-8"
      } items-center`}
    >
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="text-gray-300 hover:text-white transition-colors"
          onClick={onClick}
        >
          {link.label}
        </a>
      ))}
      <Link
        to="/sign-in"
        className="text-gray-300 hover:text-white transition-colors"
        onClick={onClick}
      >
        Login
      </Link>
    </div>
  );
};

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);

  return (
    <nav
      aria-label="Primary navigation"
      className="fixed top-0 left-0 right-0 z-50 bg-cryptoDark/80 backdrop-blur-md border-b border-white/10 shadow-sm"
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />

        {/* Desktop Links */}
        <NavLinks />

        {/* Get Started Button */}
        <div className="hidden md:block">
          <Link to="/sign-up">
            <Button className="bg-cryptoBlue hover:bg-cryptoBlue/90 text-white rounded-full px-6">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-gray-300 hover:text-white focus:outline-none text-2xl p-2"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <NavLinks isMobile onClick={toggleMobileMenu} />
          <Link to="/sign-up" onClick={toggleMobileMenu}>
            <Button className="w-full mt-4 bg-cryptoBlue hover:bg-cryptoBlue/90 text-white rounded-full">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
