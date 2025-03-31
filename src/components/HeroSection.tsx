import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight, IndianRupee, Bitcoin } from "lucide-react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-32">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-hero-gradient"></div>
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-glow-blue opacity-20 rounded-full filter blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-1/4 w-80 h-80 bg-glow-green opacity-20 rounded-full filter blur-3xl animate-pulse-glow"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div
            className="mb-6 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.1s" }}
          >
            <span className="inline-flex items-center gap-2 bg-white/10 text-white px-4 py-2 rounded-full text-sm font-medium">
              <span className="inline-block w-2 h-2 rounded-full bg-crypto-green"></span>
              The Future of Crypto Payments is Here
            </span>
          </div>

          <h1
            className="section-heading animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.2s" }}
          >
            Pay Indian QR Codes <br />
            <span className="bg-gradient-to-r from-crypto-blue via-crypto-green to-crypto-orange bg-clip-text text-transparent">
              Using Crypto
            </span>
          </h1>

          <p
            className="section-subheading animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.3s" }}
          >
            Seamlessly bridge the gap between cryptocurrency and INR payments.
            Scan any UPI QR code and pay with your favorite crypto instantly.
          </p>

          <div
            className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.4s" }}
          >
            <Link to="/sign-up">
              <Button className="bg-crypto-blue hover:bg-crypto-blue/90 text-white px-8 py-6 rounded-full text-lg flex items-center gap-2">
                Get Started <ChevronRight className="h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              className="border-white/20 hover:bg-white/5 text-white px-8 py-6 rounded-full text-lg"
            >
              How it Works
            </Button>
          </div>

          {/* Animated illustration */}
          <div
            className="relative w-full max-w-3xl mx-auto mt-8 animate-fade-in-up opacity-0"
            style={{ animationDelay: "0.5s" }}
          >
            <div className="relative bg-crypto-dark/60 backdrop-blur-sm border border-white/10 rounded-2xl p-8 overflow-hidden">
              <div className="absolute top-0 left-1/4 w-40 h-40 bg-glow-blue rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-glow-green rounded-full filter blur-3xl"></div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8 relative">
                <div className="flex-1 flex flex-col items-center">
                  <div className="crypto-icon green-glow animate-float">
                    <Bitcoin className="h-6 w-6 text-crypto-green" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold">Cryptocurrency</h3>
                    <p className="text-gray-400">BTC, ETH, USDT, etc.</p>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  <div className="w-16 h-16 flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-white animate-pulse" />
                  </div>
                  <span className="text-xs text-gray-400">
                    Instant Conversion
                  </span>
                </div>

                <div className="flex-1 flex flex-col items-center">
                  <div
                    className="crypto-icon orange-glow animate-float"
                    style={{ animationDelay: "1s" }}
                  >
                    <IndianRupee className="h-6 w-6 text-crypto-orange" />
                  </div>
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold">INR Payment</h3>
                    <p className="text-gray-400">Any UPI QR Code</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
