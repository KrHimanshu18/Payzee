import React, {
  useState,
  useEffect,
  useContext,
  lazy,
  Suspense,
  memo,
  FC,
} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  Scan,
  History,
  LogOut,
  ChevronRight,
  Shield,
  Zap,
  Globe,
  LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { LoginContext } from "@/context/LoginContext";
import scan from "../assets/Scan.jpg";
import crypto from "../assets/Crypto.jpg";

// Lazy load CryptoGrid for better performance
const CryptoGrid = lazy(() => import("@/pages/CryptoGrid"));

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  link: string;
  colorClass: string;
}

// Memoize repeated card content to avoid unnecessary re-renders
const FeatureCard: FC<FeatureCardProps> = memo(
  ({ icon: Icon, title, description, link, colorClass }) => (
    <Card className="bg-gradient-to-br from-black to-crypto-dark/80 border-white/10 rounded-2xl overflow-hidden hover:translate-y-[-5px] transition-all duration-300 relative">
      <div
        className={`absolute top-0 right-0 w-32 h-32 ${colorClass}/10 rounded-full filter blur-3xl`}
      ></div>
      <CardContent className="p-8">
        <div
          className={`w-14 h-14 mb-6 rounded-2xl ${colorClass}/20 flex items-center justify-center`}
        >
          <Icon className={`text-${colorClass}`} size={28} aria-hidden />
        </div>
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-gray-300 mb-6">{description}</p>
        <Link to={link}>
          <Button
            variant="link"
            className={`px-0 text-${colorClass} hover:text-${colorClass}/80 flex items-center gap-2`}
            aria-label={`Go to ${title}`}
          >
            {title.includes("View") ? title : `${title} Now`}
            <ChevronRight size={18} aria-hidden />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
);

const Dashboard = () => {
  const navigate = useNavigate();
  const { name } = useContext(LoginContext);
  const location = useLocation();
  const [walletAddress, setWalletAddress] = useState("");

  useEffect(() => {
    if (!name) navigate("/");

    if (location.state?.user?.walletAddress) {
      setWalletAddress(location.state.user.walletAddress);
    }
  }, [location.state, name, navigate]);

  const handleLogout = () => toast.success("Logged out successfully");

  return (
    <div className="min-h-screen bg-gradient-to-b from-crypto-darker to-black text-white overflow-x-hidden">
      {/* Starry Background */}
      <div className="fixed inset-0 z-0 opacity-50" aria-hidden="true">
        {[0, 0.5, 1, 1.5, 2, 2.5, 3].map((delay, idx) => (
          <div
            key={idx}
            className="absolute w-1 h-1 rounded-full bg-white animate-pulse"
            style={{
              top: ["25%", "75%", "33%", "66%", "50%", "16%", "80%"][idx],
              left: ["25%", "50%", "75%", "20%", "80%", "33%", "40%"][idx],
              animationDelay: `${delay}s`,
            }}
          />
        ))}
      </div>

      {/* Header/Navigation */}
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10"
        role="banner"
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-2"
              aria-label="Go to Dashboard"
            >
              <div className="crypto-icon blue-glow">
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
                  className="text-crypto-blue"
                  aria-hidden="true"
                >
                  <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.16-6.2L12.19 4.2" />
                  <path d="M7.48 20.364c3.42.602 4.261-4.182.842-4.784m-3.756 5.344 2.914.512m-2.914-.512c-2.235-.394-2.792-3.016-.556-3.41" />
                </svg>
              </div>
              <span className="text-xl font-bold">Payzee</span>
            </Link>
          </div>

          <nav
            className="hidden md:flex items-center gap-8 px-6 py-3 backdrop-blur-md bg-white/5 rounded-full border border-white/10"
            role="navigation"
            aria-label="Main Navigation"
          >
            <Link
              to="/dashboard"
              className="flex items-center gap-1 text-white"
            >
              Home
            </Link>
            <Link
              to="/scanpay"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Scan size={18} aria-hidden="true" />
              <span>Scan & Pay</span>
            </Link>
            <Link
              to="/wallet"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Wallet size={18} aria-hidden="true" />
              <span>Wallet</span>
            </Link>
            <Link
              to="/transaction"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <History size={18} aria-hidden="true" />
              <span>History</span>
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 backdrop-blur-md bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-crypto-blue flex items-center justify-center text-white font-medium">
                J
              </div>
              <span>{name}</span>
            </div>
            <Link to="/" onClick={handleLogout}>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                aria-label="Logout"
              >
                <LogOut size={16} aria-hidden="true" />
                <span>Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16 relative z-10">
        {/* Hero Section */}
        <section
          className="relative overflow-hidden"
          aria-labelledby="hero-title"
        >
          <section className="py-10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-crypto-blue/20 to-transparent"></div>
            <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-crypto-blue/20 filter blur-3xl"></div>
            <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-crypto-blue/20 filter blur-3xl"></div>

            <div className="container mx-auto px-4 relative z-10">
              <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
                  Your Crypto,
                  <br />
                  <span className="bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">
                    Your Control
                  </span>
                </h1>

                <p className="text-xl text-gray-300 mb-10 max-w-2xl">
                  Send, receive, and manage your cryptocurrency with ease.
                  Secure, fast, and user-friendly platform for all your crypto
                  needs.
                </p>

                <div className="flex flex-wrap gap-6 justify-center">
                  <Link to="/scanpay">
                    <Button
                      size="lg"
                      className="bg-crypto-blue hover:bg-crypto-blue/90 text-white rounded-full px-8 h-14 text-lg"
                    >
                      <Scan size={20} />
                      Scan & Pay
                      <ChevronRight size={20} />
                    </Button>
                  </Link>
                  <Link to="/wallet">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 hover:bg-white/5 text-white hover:text-white rounded-full px-8 h-14 text-lg"
                    >
                      <Wallet size={20} />
                      View Wallet
                    </Button>
                  </Link>
                </div>

                {/* Floating Device Mockup */}
                <div className="mt-20 relative">
                  <div className="absolute inset-0 bg-glow-blue rounded-full filter blur-3xl opacity-50"></div>
                  <div className="relative z-10 p-8 backdrop-blur-lg bg-black/30 border border-white/10 rounded-3xl">
                    <div className="grid grid-cols-2 gap-8 items-center">
                      <div className="text-left">
                        <h3 className="text-2xl font-bold mb-4">
                          Scan Any QR Code
                        </h3>
                        <p className="text-gray-300 mb-6">
                          Use your crypto to make payments by scanning any
                          standard UPI QR code. Fast, secure, and borderless.
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-crypto-blue/20 flex items-center justify-center">
                            <Shield size={20} className="text-crypto-blue" />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-crypto-green/20 flex items-center justify-center">
                            <Zap size={20} className="text-crypto-green" />
                          </div>
                          <div className="w-10 h-10 rounded-full bg-crypto-orange/20 flex items-center justify-center">
                            <Globe size={20} className="text-crypto-orange" />
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <div className="relative w-60">
                          <div className="absolute inset-0 bg-gradient-to-tr from-crypto-blue to-crypto-purple rounded-3xl blur-lg opacity-30"></div>
                          <div className="relative rounded-3xl overflow-hidden border-4 border-white/10 bg-crypto-dark shadow-lg">
                            <img
                              src={scan}
                              alt="Payzee App"
                              className="w-full h-auto"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>

        {/* Features Section */}
        <section className="py-20 relative" aria-labelledby="features-title">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-crypto-blue/20 border border-crypto-blue/30 text-crypto-blue font-medium text-sm mb-4">
                Features
              </div>
              <h2
                id="features-title"
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Powerful Crypto Tools
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Everything you need to manage your cryptocurrency in one place
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <FeatureCard
                icon={Scan}
                title="Scan & Pay"
                description="Scan QR codes to make quick and secure payments with your crypto assets"
                link="/scan"
                colorClass="crypto-blue"
              />
              <FeatureCard
                icon={Wallet}
                title="Wallet"
                description="View your balance and manage all your crypto wallets in one secure place"
                link="/wallet"
                colorClass="crypto-green"
              />
              <FeatureCard
                icon={History}
                title="History"
                description="Track all your transaction history and monitor your payment status"
                link="/transaction"
                colorClass="crypto-orange"
              />
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section className="py-20 relative" aria-labelledby="market-title">
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2
                id="market-title"
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                Market Overview
              </h2>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Track real-time cryptocurrency prices and market trends
              </p>
            </div>

            <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-3xl p-8 mb-12">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold">Popular Cryptocurrencies</h3>
                <div className="flex backdrop-blur-md bg-white/5 rounded-full p-1 gap-2">
                  <Button
                    size="sm"
                    className="bg-crypto-blue text-white rounded-full"
                  >
                    Top Assets
                  </Button>
                </div>
              </div>

              <Suspense
                fallback={
                  <div className="text-center text-gray-400">
                    Loading market data...
                  </div>
                }
              >
                <CryptoGrid />
              </Suspense>

              <div className="mt-8 text-center">
                <Button className="bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full px-8">
                  View All Markets
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 relative">
          <div className="container mx-auto px-4">
            <div className="backdrop-blur-xl bg-gradient-to-r from-crypto-blue/20 to-crypto-purple/20 border border-white/10 rounded-3xl p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-crypto-blue/30 rounded-full filter blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-crypto-purple/30 rounded-full filter blur-3xl"></div>

              <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="md:max-w-xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    Ready to Experience the Future of Crypto?
                  </h2>
                  <p className="text-xl text-gray-300 mb-8">
                    Explore all the features Payzee has to offer. Manage your
                    crypto portfolio, make transactions, and track your history
                    all in one place.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <Link to="/wallet">
                      <Button
                        size="lg"
                        className="bg-crypto-blue hover:bg-crypto-blue/90 text-white rounded-full px-8 h-14"
                      >
                        Get Started
                        <ChevronRight size={20} />
                      </Button>
                    </Link>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 hover:text-white rounded-full px-8 h-14"
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
                <div className="mt-10 md:mt-0">
                  <div className="relative">
                    <div className="absolute inset-0 bg-glow-blue rounded-full filter blur-xl opacity-70"></div>
                    <img
                      src={crypto}
                      alt="Mobile App"
                      className="relative z-10 w-60 h-auto rounded-2xl border-4 border-white/10 shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
