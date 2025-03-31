import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const QuoteSection = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-glow-orange"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-crypto-darker to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-crypto-darker to-transparent"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="section-heading">
            What Our{" "}
            <span className="bg-gradient-to-r from-crypto-orange to-crypto-purple bg-clip-text text-transparent">
              Users Say
            </span>
          </h2>
          <p className="section-subheading">
            Join thousands of satisfied users who are transforming the way they
            make payments in India.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Featured testimonial */}
          <div className="flex-1 backdrop-blur-sm bg-crypto-dark/40 border border-white/10 rounded-2xl p-8 shadow-lg">
            <div className="mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="h-5 w-5 text-crypto-orange fill-crypto-orange"
                  />
                ))}
              </div>
            </div>

            <blockquote className="text-2xl font-light italic mb-8">
              "CryptoQR has completely changed how I use my crypto holdings. Now
              I can easily pay at any local store with UPI QR codes using my
              crypto. The conversion is instant and the rates are excellent."
            </blockquote>

            <div className="flex items-center">
              <Avatar className="h-12 w-12 border-2 border-crypto-orange">
                <AvatarFallback className="bg-crypto-dark text-white">
                  RP
                </AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <div className="font-semibold">Rajesh Patel</div>
                <div className="text-sm text-gray-400">Crypto Enthusiast</div>
              </div>
            </div>
          </div>

          {/* Secondary testimonials */}
          <div className="flex-1 space-y-8">
            <div className="backdrop-blur-sm bg-crypto-dark/40 border border-white/10 rounded-2xl p-6 shadow-lg">
              <blockquote className="text-lg mb-6">
                "The app is incredibly user-friendly. I've never found it easier
                to bridge the gap between my crypto investments and daily
                payments."
              </blockquote>

              <div className="flex items-center">
                <Avatar className="h-10 w-10 border-2 border-crypto-blue">
                  <AvatarFallback className="bg-crypto-dark text-white">
                    SM
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="font-semibold">Sunita Mehta</div>
                  <div className="text-xs text-gray-400">Business Owner</div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-crypto-dark/40 border border-white/10 rounded-2xl p-6 shadow-lg">
              <blockquote className="text-lg mb-6">
                "The conversion rates are competitive and the transaction speed
                is impressive. This is exactly what the Indian crypto community
                needed."
              </blockquote>

              <div className="flex items-center">
                <Avatar className="h-10 w-10 border-2 border-crypto-green">
                  <AvatarFallback className="bg-crypto-dark text-white">
                    AK
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <div className="font-semibold">Arjun Kumar</div>
                  <div className="text-xs text-gray-400">
                    Software Developer
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

export default QuoteSection;
