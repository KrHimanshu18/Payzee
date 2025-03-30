
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Plus, QrCode, Copy, Wallet, Scan, History, LogOut } from "lucide-react";
import { toast } from "sonner";

const Wallet = () => {
  const [activeTab, setActiveTab] = useState("main");
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText("0x7F5E8D5B5CF88CFcEe96133686367F45880e52CB");
    toast.success("Wallet address copied to clipboard!");
  };
  
  const handleShowQR = () => {
    toast.info("QR code will be displayed in a modal", {
      description: "This feature is under development"
    });
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In a real app, we would handle actual logout logic here
  };

  return (
    <div className="min-h-screen bg-crypto-darker text-white overflow-x-hidden">
      {/* Starry Background */}
      <div className="fixed inset-0 z-0 opacity-50">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white animate-pulse"></div>
        <div className="absolute top-3/4 left-1/2 w-1.5 h-1.5 rounded-full bg-white animate-pulse" style={{animationDelay: '0.5s'}}></div>
        <div className="absolute top-1/3 left-3/4 w-1 h-1 rounded-full bg-white animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-2/3 left-1/5 w-2 h-2 rounded-full bg-white animate-pulse" style={{animationDelay: '1.5s'}}></div>
        <div className="absolute top-1/2 left-4/5 w-1 h-1 rounded-full bg-white animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
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
          
          <div className="hidden md:flex items-center gap-8 px-6 py-3 backdrop-blur-md bg-white/5 rounded-full border border-white/10">
            <Link to="/dashboard" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <span>Home</span>
            </Link>
            <Link to="/scan" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <Scan size={18} />
              <span>Scan & Pay</span>
            </Link>
            <Link to="/wallet" className="flex items-center gap-1 text-white">
              <Wallet size={18} />
              <span>Wallet</span>
            </Link>
            <Link to="/history" className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors">
              <History size={18} />
              <span>History</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 backdrop-blur-md bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-crypto-blue flex items-center justify-center text-white font-medium">J</div>
              <span>John Doe</span>
            </div>
            <Link to="/" onClick={handleLogout}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8">My Wallet</h1>
          
          <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="main" value={activeTab} onValueChange={setActiveTab} className="w-auto">
              <TabsList className="bg-white/5 border border-white/10">
                <TabsTrigger 
                  value="main" 
                  className="data-[state=active]:bg-crypto-blue data-[state=active]:text-white"
                >
                  Main Wallet
                </TabsTrigger>
                <TabsTrigger 
                  value="savings" 
                  className="data-[state=active]:bg-crypto-blue data-[state=active]:text-white"
                >
                  Savings Wallet
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button className="bg-crypto-blue hover:bg-crypto-blue/90 text-white rounded-full">
              <Plus size={18} />
              Add Wallet
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Total Balance */}
            <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-1">Total Balance</h2>
              <p className="text-sm text-gray-400 mb-4">Your total wallet balance in INR</p>
              
              <div className="mb-6">
                <span className="text-4xl font-bold">₹125,000</span>
              </div>
              
              <Button onClick={handleShowQR} variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <QrCode size={18} />
                Show QR Code
              </Button>
            </div>
            
            {/* Wallet Address */}
            <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-xl p-6">
              <h2 className="text-xl font-bold mb-1">Wallet Address</h2>
              <p className="text-sm text-gray-400 mb-4">Your wallet address</p>
              
              <div className="mb-6 bg-white/5 border border-white/10 rounded-lg p-3 text-gray-300 font-mono text-sm break-all">
                0x7F5E8D5B5CF88CFcEe96133686367F45880e52CB
              </div>
              
              <Button onClick={handleCopyAddress} variant="outline" className="border-white/20 text-white hover:bg-white/5">
                <Copy size={18} />
                Copy Address
              </Button>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold mb-6">Cryptocurrencies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Bitcoin */}
            <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#F7931A]/20 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#F7931A]">
                      <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.16-6.2L12.19 4.2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Bitcoin</h3>
                    <span className="text-xs text-gray-400">BTC</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">0.05</div>
                  <div className="text-sm text-gray-400">₹75,000</div>
                </div>
              </div>
            </div>
            
            {/* Ethereum */}
            <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#627EEA]/20 flex items-center justify-center">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      width="20" 
                      height="20" 
                      viewBox="0 0 32 32"
                      className="text-[#627EEA]"
                    >
                      <g fill="none" fillRule="evenodd">
                        <circle cx="16" cy="16" r="16" fill="#627EEA"/>
                        <g fill="#FFF" fillRule="nonzero">
                          <path fillOpacity=".602" d="M16.498 4v8.87l7.497 3.35z"/>
                          <path d="M16.498 4L9 16.22l7.498-3.35z"/>
                          <path fillOpacity=".602" d="M16.498 21.968v6.027L24 17.616z"/>
                          <path d="M16.498 27.995v-6.028L9 17.616z"/>
                          <path fillOpacity=".2" d="M16.498 20.573l7.497-4.353-7.497-3.348z"/>
                          <path fillOpacity=".602" d="M9 16.22l7.498 4.353v-7.701z"/>
                        </g>
                      </g>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Ethereum</h3>
                    <span className="text-xs text-gray-400">ETH</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">1.2</div>
                  <div className="text-sm text-gray-400">₹40,000</div>
                </div>
              </div>
            </div>
            
            {/* Tether */}
            <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#53ae94]/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 2000 2000" className="text-[#53ae94]">
                      <path d="M1000,0c552.26,0,1000,447.74,1000,1000S1552.24,2000,1000,2000,0,1552.38,0,1000,447.68,0,1000,0" fill="#53ae94"/>
                      <path d="M1123.42,866.76V718H1463.6V491.34H537.28V718H877.5V866.64C601,879.34,393.1,934.1,393.1,999.7s208,120.36,484.4,133.14v476.5h246V1132.8c276-12.74,483.48-67.46,483.48-133s-207.48-120.26-483.48-133m0,225.64v-0.12c-6.94.44-42.6,2.58-122,2.58-63.48,0-108.14-1.8-123.88-2.62v0.2C633.34,1081.66,451,1039.12,451,988.22S633.36,894.84,877.62,884V1050.1c16,1.1,61.76,3.8,124.92,3.8,75.86,0,114-3.16,121-3.8V884c243.8,10.86,425.72,53.44,425.72,104.16s-182,93.32-425.72,104.18" fill="#fff"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Tether</h3>
                    <span className="text-xs text-gray-400">USDT</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">100</div>
                  <div className="text-sm text-gray-400">₹8,000</div>
                </div>
              </div>
            </div>
            
            {/* Ripple */}
            <div className="backdrop-blur-xl bg-black/30 border border-white/10 rounded-xl p-6 hover:bg-white/5 transition-colors">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#23292F]/20 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path d="M21.96 11.216L19.193 6l-2.743 5.216h-2.277L17.18 6h-2.343l-3.388 6.602H9.18L11.343 6H9.09L5.913 11.216h-1.53l-1.928 3.728h9.091l1.515-2.927h1.515l-1.515 2.927h9.091z" fill="#23292F"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold">Ripple</h3>
                    <span className="text-xs text-gray-400">XRP</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-end">
                <div>
                  <div className="text-2xl font-bold">500</div>
                  <div className="text-sm text-gray-400">₹2,000</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Wallet;
