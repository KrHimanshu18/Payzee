import React, { Suspense } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Lazy load icons
const ChevronRight = React.lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.ChevronRight }))
);
const ArrowRight = React.lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.ArrowRight }))
);
const IndianRupee = React.lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.IndianRupee }))
);
const Bitcoin = React.lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Bitcoin }))
);

const HeroSection = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-32"
      aria-labelledby="hero-heading"
    >
      {/* Background gradients */}
      <div
        className="absolute inset-0 bg-hero-gradient"
        aria-hidden="true"
      ></div>
      <div
        className="absolute top-20 left-1/4 w-72 h-72 bg-glow-blue opacity-20 rounded-full filter blur-3xl animate-pulse-glow motion-safe:animate-pulse-glow"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-20 right-1/4 w-80 h-80 bg-glow-green opacity-20 rounded-full filter blur-3xl animate-pulse-glow motion-safe:animate-pulse-glow"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        {/* Badge */}
        <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6 motion-safe:animate-fade-in-up">
          <span
            className="inline-block w-2 h-2 rounded-full bg-crypto-green"
            aria-hidden="true"
          ></span>
          The Future of Crypto Payments is Here
        </span>

        {/* Heading */}
        <h1
          id="hero-heading"
          className="section-heading text-4xl md:text-5xl font-bold motion-safe:animate-fade-in-up"
        >
          Pay Indian QR Codes <br />
          <span className="bg-gradient-to-r from-crypto-blue via-crypto-green to-crypto-orange bg-clip-text text-transparent">
            Using Crypto
          </span>
        </h1>

        {/* Subheading */}
        <p className="section-subheading mt-4 text-lg md:text-xl text-gray-200 motion-safe:animate-fade-in-up">
          Seamlessly bridge cryptocurrency and INR payments. Scan any UPI QR
          code and pay instantly.
        </p>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 mt-8 mb-12 justify-center items-center motion-safe:animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <Link to="/sign-up">
            <Button
              className="bg-crypto-blue hover:bg-crypto-blue/90 text-white px-8 py-6 rounded-full text-lg flex items-center gap-2 focus:outline-none focus:ring-4 focus:ring-crypto-blue/50"
              aria-label="Get started with crypto payments"
            >
              <Suspense fallback={<span>→</span>}>
                Get Started <ChevronRight className="h-5 w-5" />
              </Suspense>
            </Button>
          </Link>

          <Button
            variant="outline"
            className="border-white/20 hover:bg-white/5 text-white px-8 py-6 rounded-full text-lg focus:outline-none focus:ring-4 focus:ring-white/30"
            aria-label="Learn how it works"
          >
            How it Works
          </Button>
        </div>

        {/* Illustration */}
        <div
          className="relative w-full max-w-3xl mx-auto mt-8 motion-safe:animate-fade-in-up"
          aria-hidden="true"
        >
          <div className="relative bg-crypto-dark/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden">
            <div className="absolute top-0 left-1/4 w-40 h-40 bg-glow-blue rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-glow-green rounded-full filter blur-3xl"></div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
              {/* Crypto */}
              <div className="flex-1 flex flex-col items-center">
                <Suspense
                  fallback={
                    <div className="h-6 w-6 bg-gray-600 rounded-full animate-pulse"></div>
                  }
                >
                  <Bitcoin
                    className="h-6 w-6 text-crypto-green motion-safe:animate-float"
                    aria-hidden="true"
                  />
                </Suspense>
                <h3 className="mt-4 text-xl font-bold text-white">
                  Cryptocurrency
                </h3>
                <p className="text-gray-400">BTC, ETH, USDT, etc.</p>
              </div>

              {/* Conversion Arrow */}
              <div className="flex flex-col items-center justify-center">
                <Suspense
                  fallback={
                    <div className="h-8 w-8 bg-gray-500 rounded-full animate-pulse"></div>
                  }
                >
                  <ArrowRight
                    className="h-8 w-8 text-white motion-safe:animate-pulse"
                    aria-hidden="true"
                  />
                </Suspense>
                <span className="text-xs text-gray-400 mt-2">
                  Instant Conversion
                </span>
              </div>

              {/* INR */}
              <div className="flex-1 flex flex-col items-center">
                <Suspense
                  fallback={
                    <div className="h-6 w-6 bg-gray-600 rounded-full animate-pulse"></div>
                  }
                >
                  <IndianRupee
                    className="h-6 w-6 text-crypto-orange motion-safe:animate-float"
                    aria-hidden="true"
                  />
                </Suspense>
                <h3 className="mt-4 text-xl font-bold text-white">
                  INR Payment
                </h3>
                <p className="text-gray-400">Any UPI QR Code</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
