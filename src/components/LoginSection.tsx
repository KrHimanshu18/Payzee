
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const LoginSection = () => {
  return (
    <section id="login" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-glow-blue"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-crypto-darker to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-crypto-darker to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left column - Text content */}
          <div className="flex-1">
            <h2 className="section-heading">Begin Your <span className="bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">Crypto Payment</span> Journey</h2>
            <p className="section-subheading text-left mx-0">
              Join thousands of users who are already enjoying the convenience of paying any UPI QR code with cryptocurrency.
            </p>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-crypto-blue/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-crypto-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                  <p className="text-gray-400">End-to-end encrypted payments with multi-factor authentication.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-crypto-green/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-crypto-green" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
                  <p className="text-gray-400">Get the best exchange rates with minimal fees for your crypto-to-INR conversions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-crypto-orange/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-crypto-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Settlements</h3>
                  <p className="text-gray-400">Your payments are processed in seconds, not days.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Call to action */}
          <div className="flex-1 w-full max-w-md">
            <div className="backdrop-blur-md bg-crypto-dark/70 border border-white/10 rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold mb-4 text-center">Ready to Get Started?</h3>
              <p className="text-gray-400 mb-8 text-center">Create an account or sign in to access our platform.</p>
              
              <div className="space-y-4">
                <Link to="/sign-in" className="block w-full">
                  <Button className="w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white py-6">
                    Sign In
                  </Button>
                </Link>
                
                <Link to="/sign-up" className="block w-full">
                  <Button className="w-full bg-crypto-green hover:bg-crypto-green/90 text-black py-6">
                    Create Account
                  </Button>
                </Link>
              </div>
              
              <p className="mt-6 text-center text-sm text-gray-400">
                By signing up, you agree to our{" "}
                <Link to="/terms" className="text-crypto-blue hover:text-crypto-blue/80">
                  Terms
                </Link>{" "}
                and{" "}
                <Link to="/privacy" className="text-crypto-blue hover:text-crypto-blue/80">
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
