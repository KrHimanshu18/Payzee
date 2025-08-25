import React, { lazy, Suspense } from "react";
import { Star as StarIcon } from "lucide-react";

// Lazy load Avatar components
const Avatar = lazy(() =>
  import("@/components/ui/avatar").then((mod) => ({ default: mod.Avatar }))
);
const AvatarFallback = lazy(() =>
  import("@/components/ui/avatar").then((mod) => ({
    default: mod.AvatarFallback,
  }))
);

const stars = [1, 2, 3, 4, 5];

const QuoteSection = () => {
  return (
    <section
      className="relative py-24 overflow-hidden"
      aria-labelledby="testimonial-heading"
    >
      <div className="absolute inset-0 bg-glow-orange" aria-hidden="true"></div>
      <div
        className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-crypto-darker to-transparent"
        aria-hidden="true"
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-crypto-darker to-transparent"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 id="testimonial-heading" className="section-heading">
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

        <div className="flex flex-col md:flex-row gap-8 items-start">
          {/* Featured testimonial */}
          <div className="flex-1 backdrop-blur-sm bg-crypto-dark/40 border border-white/10 rounded-2xl p-8 shadow-lg min-h-[350px]">
            <div className="mb-6 flex" aria-label="5 star rating">
              <Suspense
                fallback={
                  <div className="flex space-x-1">
                    <div className="w-5 h-5 bg-gray-500 rounded"></div>
                  </div>
                }
              >
                {stars.map((star) => (
                  <StarIcon
                    key={star}
                    className="h-5 w-5 text-crypto-orange fill-crypto-orange mr-1"
                  />
                ))}
              </Suspense>
            </div>

            <blockquote className="text-2xl font-light italic mb-8">
              "Payzee has completely changed how I use my crypto holdings. Now I
              can easily pay at any local store with UPI QR codes using my
              crypto. The conversion is instant and the rates are excellent."
            </blockquote>

            <div className="flex items-center">
              <Suspense
                fallback={
                  <div className="h-12 w-12 rounded-full bg-gray-700"></div>
                }
              >
                <Avatar className="h-12 w-12 border-2 border-crypto-orange">
                  <AvatarFallback className="bg-crypto-dark text-white">
                    RP
                  </AvatarFallback>
                </Avatar>
              </Suspense>
              <div className="ml-4">
                <div className="font-semibold">Rajesh Patel</div>
                <div className="text-sm text-gray-400">Crypto Enthusiast</div>
              </div>
            </div>
          </div>

          {/* Secondary testimonials */}
          <div className="flex-1 space-y-8">
            <div className="backdrop-blur-sm bg-crypto-dark/40 border border-white/10 rounded-2xl p-6 shadow-lg min-h-[150px]">
              <blockquote className="text-lg mb-6">
                "The app is incredibly user-friendly. I've never found it easier
                to bridge the gap between my crypto investments and daily
                payments."
              </blockquote>
              <div className="flex items-center">
                <Suspense
                  fallback={
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                  }
                >
                  <Avatar className="h-10 w-10 border-2 border-crypto-blue">
                    <AvatarFallback className="bg-crypto-dark text-white">
                      SM
                    </AvatarFallback>
                  </Avatar>
                </Suspense>
                <div className="ml-3">
                  <div className="font-semibold">Sunita Mehta</div>
                  <div className="text-xs text-gray-400">Business Owner</div>
                </div>
              </div>
            </div>

            <div className="backdrop-blur-sm bg-crypto-dark/40 border border-white/10 rounded-2xl p-6 shadow-lg min-h-[150px]">
              <blockquote className="text-lg mb-6">
                "The conversion rates are competitive and the transaction speed
                is impressive. This is exactly what the Indian crypto community
                needed."
              </blockquote>
              <div className="flex items-center">
                <Suspense
                  fallback={
                    <div className="h-10 w-10 rounded-full bg-gray-700"></div>
                  }
                >
                  <Avatar className="h-10 w-10 border-2 border-crypto-green">
                    <AvatarFallback className="bg-crypto-dark text-white">
                      AK
                    </AvatarFallback>
                  </Avatar>
                </Suspense>
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
