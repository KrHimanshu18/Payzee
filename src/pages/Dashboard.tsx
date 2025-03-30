
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Wallet, Scan, History, Bitcoin, Ethereum, BarChart4, Shield, Zap, Globe, LogOut } from "lucide-react";
import { toast } from "sonner";

const Dashboard = () => {
  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In a real app, we would handle actual logout logic here
  };

  return (
    <div className="min-h-screen bg-crypto-darker text-white">
      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-crypto-dark/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2">
              <div className="crypto-icon blue-glow">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-crypto-blue">
                  <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.16-6.2L12.19 4.2" />
                  <path d="M7.48 20.364c3.42.602 4.261-4.182.842-4.784m-3.756 5.344 2.914.512m-2.914-.512c-2.235-.394-2.792-3.016-.556-3.41" />
                </svg>
              </div>
              <span className="text-xl font-bold">CryptoQR</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="flex items-center gap-1 text-white">
              <span>Home</span>
            </Link>
            <Link to="/scan" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <Scan size={18} />
              <span>Scan & Pay</span>
            </Link>
            <Link to="/wallet" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <Wallet size={18} />
              <span>Wallet</span>
            </Link>
            <Link to="/history" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <History size={18} />
              <span>History</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-crypto-dark/40 rounded-full px-3 py-1.5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-crypto-blue flex items-center justify-center text-white font-medium">J</div>
              <span>John Doe</span>
            </div>
            <Link to="/" onClick={handleLogout}>
              <Button variant="ghost" size="sm" className="text-white">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-hero-gradient"></div>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 mb-10 md:mb-0">
                <div className="inline-block px-4 py-1 rounded-full bg-crypto-dark/40 border border-white/10 text-white mb-4">
                  Welcome to CryptoQR
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                  Your Crypto,<br/>
                  <span className="text-crypto-blue">Your Control</span>
                </h1>
                <p className="text-gray-300 mb-8 max-w-md">
                  Send, receive, and manage your cryptocurrency with ease. Secure, fast, and user-friendly.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/scan">
                    <Button size="lg" className="bg-crypto-blue hover:bg-crypto-blue/90 text-white rounded-lg">
                      <Scan size={18} />
                      Scan & Pay
                    </Button>
                  </Link>
                  <Link to="/wallet">
                    <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-lg">
                      <Wallet size={18} />
                      View Wallet
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex justify-center">
                <div className="relative w-64 h-64 md:w-80 md:h-80">
                  <div className="absolute inset-0 rounded-full bg-glow-blue animate-pulse-glow"></div>
                  <div className="relative z-10 w-full h-full rounded-full bg-crypto-dark flex items-center justify-center border border-white/10">
                    <Bitcoin size={100} className="text-crypto-blue" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Scan & Pay */}
              <div className="bg-crypto-dark/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Scan & Pay</h3>
                  <Scan className="text-crypto-blue" size={24} />
                </div>
                <p className="text-gray-300 mb-4">Scan QR codes to make quick and secure payments</p>
                <Link to="/scan">
                  <Button variant="link" className="px-0 text-crypto-blue hover:text-crypto-blue/80 flex items-center gap-2">
                    Scan Now
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </Link>
              </div>
              
              {/* Wallet */}
              <div className="bg-crypto-dark/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">Wallet</h3>
                  <Wallet className="text-crypto-blue" size={24} />
                </div>
                <p className="text-gray-300 mb-4">View your balance and manage your crypto wallets</p>
                <Link to="/wallet">
                  <Button variant="link" className="px-0 text-crypto-blue hover:text-crypto-blue/80 flex items-center gap-2">
                    View Wallet
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </Link>
              </div>
              
              {/* History */}
              <div className="bg-crypto-dark/70 border border-white/10 rounded-2xl p-6 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">History</h3>
                  <History className="text-crypto-blue" size={24} />
                </div>
                <p className="text-gray-300 mb-4">Track all your transaction history and status</p>
                <Link to="/history">
                  <Button variant="link" className="px-0 text-crypto-blue hover:text-crypto-blue/80 flex items-center gap-2">
                    View History
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3.33334 8H12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M8 3.33337L12.6667 8.00004L8 12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Market Overview */}
        <section className="py-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Market Overview</h2>
              <div className="flex bg-crypto-dark/70 rounded-full p-1">
                <Button size="sm" className="bg-crypto-blue text-white rounded-full">Market Prices</Button>
                <Button size="sm" variant="ghost" className="text-gray-300 rounded-full">Recent Activity</Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Bitcoin */}
              <div className="bg-crypto-dark/70 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Bitcoin size={20} className="text-[#F7931A]" />
                    <span className="font-medium">Bitcoin</span>
                  </div>
                  <span className="text-xs text-gray-400">BTC</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold">₹3,245,000</span>
                  <span className="text-green-500 text-sm">+2.4%</span>
                </div>
              </div>
              
              {/* Ethereum */}
              <div className="bg-crypto-dark/70 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <Ethereum size={20} className="text-[#627EEA]" />
                    <span className="font-medium">Ethereum</span>
                  </div>
                  <span className="text-xs text-gray-400">ETH</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold">₹175,000</span>
                  <span className="text-red-500 text-sm">-1.2%</span>
                </div>
              </div>
              
              {/* Tether */}
              <div className="bg-crypto-dark/70 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 2000 2000" className="mr-1">
                      <path d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.38,0,1000,447.68,0,1000,0" fill="#53ae94"/>
                      <path d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18" fill="#fff"/>
                    </svg>
                    <span className="font-medium">Tether</span>
                  </div>
                  <span className="text-xs text-gray-400">USDT</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold">₹83</span>
                  <span className="text-green-500 text-sm">+0.1%</span>
                </div>
              </div>
              
              {/* XRP */}
              <div className="bg-crypto-dark/70 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2">
                    <svg width="20" height="20" viewBox="0 0 24 24" className="mr-1">
                      <path d="M21.96 11.216L19.193 6l-2.743 5.216h-2.277L17.18 6h-2.343l-3.388 6.602H9.18L11.343 6H9.09L5.913 11.216h-1.53l-1.928 3.728h9.091l1.515-2.927h1.515l-1.515 2.927h9.091z" fill="#23292F"/>
                    </svg>
                    <span className="font-medium">Ripple</span>
                  </div>
                  <span className="text-xs text-gray-400">XRP</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-xl font-bold">₹40</span>
                  <span className="text-green-500 text-sm">+5.7%</span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-lg">
                View All Markets
              </Button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-crypto-dark/50">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Choose CryptoQR?</h2>
            <p className="text-gray-300 mb-12 max-w-2xl mx-auto">
              Experience the future of cryptocurrency transactions with our secure, fast, and user-friendly platform.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="p-6 rounded-xl bg-crypto-dark/50 border border-white/10">
                <div className="w-12 h-12 bg-crypto-dark/70 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Shield className="text-crypto-blue" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Secure Transactions</h3>
                <p className="text-gray-400">End-to-end encryption and advanced security protocols to keep your assets safe.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-crypto-dark/50 border border-white/10">
                <div className="w-12 h-12 bg-crypto-dark/70 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Zap className="text-crypto-blue" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Lightning Fast</h3>
                <p className="text-gray-400">Instant transactions with minimal fees, saving you time and money.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-crypto-dark/50 border border-white/10">
                <div className="w-12 h-12 bg-crypto-dark/70 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <Globe className="text-crypto-blue" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Access</h3>
                <p className="text-gray-400">Send and receive crypto from anywhere in the world without borders.</p>
              </div>
              
              <div className="p-6 rounded-xl bg-crypto-dark/50 border border-white/10">
                <div className="w-12 h-12 bg-crypto-dark/70 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                  <BarChart4 className="text-crypto-blue" size={24} />
                </div>
                <h3 className="text-xl font-bold mb-2">Market Insights</h3>
                <p className="text-gray-400">Stay updated with real-time market data and price alerts.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-glow-blue opacity-30"></div>
          <div className="container mx-auto px-4">
            <div className="bg-crypto-dark/70 border border-white/10 rounded-2xl p-10 backdrop-blur-md relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:pr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
                <p className="text-gray-300 max-w-lg">
                  Explore all the features CryptoQR has to offer. Manage your crypto portfolio, make transactions, and track your history all in one place.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-crypto-blue hover:bg-crypto-blue/90 text-white rounded-lg">
                  Make Your First Transaction
                </Button>
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 rounded-lg">
                  Explore Your Wallet
                </Button>
              </div>
              <div className="absolute right-10 bottom-0 text-crypto-blue/20">
                <Wallet size={120} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
