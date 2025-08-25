import { lazy } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Lazy load icons or heavy components if necessary
const FeatureItem = ({ color, title, description }) => (
  <div className="flex items-start gap-4">
    <div
      className={`w-8 h-8 rounded-full ${color}/20 flex items-center justify-center shrink-0 mt-1`}
    >
      <Check className={`w-5 h-5 ${color}`} />
    </div>
    <div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  </div>
);

const LoginSection = () => {
  const features = [
    {
      color: "text-crypto-blue",
      title: "Secure Transactions",
      description:
        "End-to-end encrypted payments with multi-factor authentication.",
    },
    {
      color: "text-crypto-green",
      title: "Competitive Rates",
      description:
        "Best exchange rates with minimal fees for crypto-to-INR conversions.",
    },
    {
      color: "text-crypto-orange",
      title: "Instant Settlements",
      description: "Your payments are processed in seconds, not days.",
    },
  ];

  return (
    <section id="login" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-glow-blue"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-crypto-darker to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-crypto-darker to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left column - Text content */}
          <div className="flex-1">
            <h2 className="section-heading">
              Begin Your{" "}
              <span className="bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">
                Crypto Payment
              </span>{" "}
              Journey
            </h2>
            <p className="section-subheading mt-4">
              Join thousands of users enjoying the convenience of paying any UPI
              QR code with cryptocurrency.
            </p>

            <div className="space-y-8 mt-12">
              {features.map((f, idx) => (
                <FeatureItem
                  key={idx}
                  color={f.color}
                  title={f.title}
                  description={f.description}
                />
              ))}
            </div>
          </div>

          {/* Right column - Call to action */}
          <div className="flex-1 w-full max-w-md">
            <div className="backdrop-blur-md bg-crypto-dark/70 border border-white/10 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Ready to Get Started?
              </h3>
              <p className="text-gray-400 mb-8 text-center">
                Create an account or sign in to access our platform.
              </p>

              <div>
                <Link to="/sign-in">
                  <Button className="w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white py-6 mb-6">
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button className="w-full bg-crypto-green hover:bg-crypto-green/90 text-black py-6">
                    Create Account
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-center text-sm text-gray-400">
                By signing up, you agree to our{" "}
                <Link
                  to="/terms"
                  className="text-crypto-blue hover:text-crypto-blue/80"
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-crypto-blue hover:text-crypto-blue/80"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
