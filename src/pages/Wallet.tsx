import { Bitcoin, CircleDollarSign, DollarSign, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Scan, History, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Plus, RefreshCw } from "lucide-react";
import {
  QrCode,
  Copy,
  ChevronDown,
  ChevronUp,
  CircleCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const WalletPage = () => {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In a real app, we would handle actual logout logic here
  };

  const currency = "₹";

  // Mock data for the wallet
  const walletData = {
    totalBalance: "125,000",
    walletAddress: "0x7F5E85B85CF88cFcEe9613368636F45B880e62CB",
    cryptos: [
      {
        name: "Bitcoin",
        symbol: "BTC",
        amount: "0.05",
        fiatValue: "75,000",
        address: "3FZbqi29cpjq2GldwV8eyHuJJnKL1kfZc5",
        icon: <Bitcoin size={20} className="text-yellow-500" />,
        color: "from-yellow-500/20 to-yellow-600/10",
        accentColor: "yellow-500",
        change: "+3.2%",
        positive: true,
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        amount: "1.2",
        fiatValue: "40,000",
        address: "0x71C7656EC7ab88b098defB751B740101B5f6d8976F",
        icon: <CircleDollarSign size={20} className="text-purple-500" />,
        color: "from-purple-500/20 to-purple-600/10",
        accentColor: "purple-500",
        change: "-1.5%",
        positive: false,
      },
      {
        name: "Tether",
        symbol: "USDT",
        amount: "100",
        fiatValue: "8,000",
        address: "TKwLegRSqU9AHDmPCyLGZHTXKZZZZBKDDo",
        icon: <DollarSign size={20} className="text-green-500" />,
        color: "from-green-500/20 to-green-600/10",
        accentColor: "green-500",
        change: "+0.1%",
        positive: true,
      },
      {
        name: "Ripple",
        symbol: "XRP",
        amount: "500",
        fiatValue: "2,000",
        address: "rLW9gnQo7BQhU6igk5keqYnH3TVrCxGRzm",
        icon: <Coins size={20} className="text-blue-500" />,
        color: "from-blue-500/20 to-blue-600/10",
        accentColor: "blue-500",
        change: "+5.2%",
        positive: true,
      },
    ],
    recentTransactions: [
      {
        type: "send",
        crypto: "BTC",
        amount: "0.01",
        to: "3Hk7... (John)",
        date: "Oct 28, 2023",
        status: "completed",
        icon: <Bitcoin size={16} className="text-yellow-500" />,
      },
      {
        type: "receive",
        crypto: "ETH",
        amount: "0.5",
        from: "0x5e8... (Sara)",
        date: "Oct 25, 2023",
        status: "completed",
        icon: <CircleDollarSign size={16} className="text-purple-500" />,
      },
      {
        type: "send",
        crypto: "USDT",
        amount: "50",
        to: "TK9L... (Mike)",
        date: "Oct 20, 2023",
        status: "completed",
        icon: <DollarSign size={16} className="text-green-500" />,
      },
    ],
  };

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  };

  const showQRCode = () => {
    toast.info("QR Code functionality will be implemented soon", {
      description: "This feature is coming in a future update.",
    });
  };

  const toggleCardExpand = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

  // Random animations for particle effects
  const getRandomAnimationDelay = () => {
    return `${Math.random() * 5}s`;
  };

  const getRandomPosition = () => {
    return `${Math.random() * 100}%`;
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-[#131722] via-[#1A1F2C] to-[#131722] overflow-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/30 animate-pulse"
            style={{
              top: getRandomPosition(),
              left: getRandomPosition(),
              animationDelay: getRandomAnimationDelay(),
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}

        {/* Glow effects */}
        <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#8B5CF6]/10 blur-[120px]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-[#F97316]/10 blur-[120px]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#1EAEDB]/5 blur-[120px]"></div>
      </div>

      {/* Header/Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/20 border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/dashboard" className="flex items-center gap-2">
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
                >
                  <path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.16-6.2L12.19 4.2" />
                  <path d="M7.48 20.364c3.42.602 4.261-4.182.842-4.784m-3.756 5.344 2.914.512m-2.914-.512c-2.235-.394-2.792-3.016-.556-3.41" />
                </svg>
              </div>
              <span className="text-xl font-bold">CryptoQR</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-8 px-6 py-3 backdrop-blur-md bg-white/5 rounded-full border border-white/10">
            <Link
              to="/dashboard"
              className="flex items-center gap-1 text-white"
            >
              <span>Home</span>
            </Link>
            <Link
              to="/scanpay"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Scan size={18} />
              <span>Scan & Pay</span>
            </Link>
            <Link
              to="/wallet"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <Wallet size={18} />
              <span>Wallet</span>
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              <History size={18} />
              <span>History</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 backdrop-blur-md bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-crypto-blue flex items-center justify-center text-white font-medium">
                J
              </div>
              <span>John Doe</span>
            </div>
            <Link to="/" onClick={handleLogout}>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
              >
                <LogOut size={16} />
                <span>Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 pt-28 pb-16 relative z-10">
        <div className="animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-white/70">
                My Wallet
              </h1>
              <p className="text-gray-400">
                Manage and track your cryptocurrency assets
              </p>
            </div>
            <div className="flex items-center space-x-3 mt-6 md:mt-0">
              <Button
                variant="outline"
                className="border-gray-700 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 group"
              >
                <RefreshCw
                  size={18}
                  className="mr-2 text-[#33C3F0] group-hover:rotate-180 transition-transform duration-500"
                />
                Refresh
              </Button>
              <Button className="bg-gradient-to-r from-[#33C3F0] to-[#1EAEDB] hover:opacity-90 transition-all duration-300 shadow-lg shadow-[#33C3F0]/20 group relative overflow-hidden">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                <Plus size={18} className="mr-2 relative" />
                <span className="relative">Add Wallet</span>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="crypto-card flex flex-col relative overflow-hidden backdrop-blur-md bg-black/20 border border-white/10 shadow-xl rounded-2xl group hover:shadow-2xl transition-all duration-500 hover:border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-[#33C3F0]/10 to-purple-500/5 pointer-events-none"></div>
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-[#33C3F0]/20 rounded-full blur-[32px] group-hover:blur-[40px] transition-all duration-500"></div>

              <div className="flex items-start justify-between mb-6 relative z-10 p-6">
                <div>
                  <p className="text-gray-400 mb-1">Total Balance</p>
                  <p className="text-xs text-gray-500">
                    Your total wallet balance in INR
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-[#33C3F0]/30 to-[#33C3F0]/10 flex items-center justify-center text-[#33C3F0] backdrop-blur-md border border-white/10 shadow-lg shadow-[#33C3F0]/10 group-hover:shadow-[#33C3F0]/20 transition-all duration-500">
                  <Wallet size={20} />
                </div>
              </div>
              <h2
                className={cn(
                  "crypto-balance relative z-10 px-6 pb-6",
                  walletData.totalBalance.length > 8 ? "text-3xl" : "text-5xl"
                )}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-300">
                  {currency}
                  {walletData.totalBalance}
                </span>
              </h2>

              <div className="bg-gradient-to-r from-[#33C3F0] to-white/5 h-1 w-full mt-auto transition-all duration-500 group-hover:from-[#33C3F0]/80"></div>
            </div>

            <div className="crypto-card flex flex-col relative overflow-hidden backdrop-blur-md bg-black/20 border border-white/10 shadow-xl rounded-2xl group hover:shadow-2xl transition-all duration-500 hover:border-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-[#33C3F0]/10 pointer-events-none"></div>
              <div className="absolute -left-16 -top-16 w-32 h-32 bg-purple-500/20 rounded-full blur-[32px] group-hover:blur-[40px] transition-all duration-500"></div>

              <div className="flex items-start justify-between mb-4 relative z-10 p-6">
                <div>
                  <p className="text-gray-400 mb-1">Wallet Address</p>
                  <p className="text-xs text-gray-500">
                    Your unique identifier for transactions
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-500/30 to-purple-500/10 flex items-center justify-center text-purple-400 backdrop-blur-md border border-white/10 shadow-lg shadow-purple-500/10 group-hover:shadow-purple-500/20 transition-all duration-500">
                  <QrCode size={20} />
                </div>
              </div>
              <div className="crypto-address mx-6 mb-6 flex-grow relative z-10 bg-black/40 backdrop-blur-sm border border-gray-800/50 px-4 py-3 rounded-lg font-mono text-sm text-gray-300 truncate group-hover:text-white transition-colors duration-300">
                {walletData.walletAddress}
              </div>
              <div className="flex gap-3 relative z-10 p-6 pt-0">
                <Button
                  onClick={showQRCode}
                  variant="outline"
                  className="flex-1 border-gray-700/50 bg-black/20 hover:bg-black/40 transition-all duration-300 group"
                >
                  <QrCode
                    size={18}
                    className="mr-2 text-[#33C3F0] group-hover:scale-110 transition-transform duration-300"
                  />
                  Show QR
                </Button>
                <Button
                  onClick={() => copyAddress(walletData.walletAddress)}
                  variant="outline"
                  className="flex-1 border-gray-700/50 bg-black/20 hover:bg-black/40 transition-all duration-300 group"
                >
                  <Copy
                    size={18}
                    className="mr-2 text-[#33C3F0] group-hover:scale-110 transition-transform duration-300"
                  />
                  Copy
                </Button>
              </div>

              <div className="bg-gradient-to-r from-purple-500/60 to-white/5 h-1 w-full mt-auto transition-all duration-500 group-hover:from-purple-500/80"></div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 mt-12 text-white/90 flex items-center">
            <span className="relative">
              Cryptocurrencies
              <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#33C3F0] to-transparent"></span>
            </span>
            <span className="text-sm ml-4 text-gray-400 font-normal">
              4 assets
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {walletData.cryptos.map((crypto, index) => (
              <div
                key={index}
                className="transform transition-all duration-500 relative"
                style={{
                  transform:
                    expandedCard === index ? "scale(1.03)" : "scale(1)",
                  zIndex: expandedCard === index ? 20 : 10,
                }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  className={cn(
                    "crypto-card relative overflow-hidden backdrop-blur-md bg-black/20 border border-white/10 shadow-xl rounded-2xl transition-all duration-500",
                    hoveredCard === index && "border-white/20 shadow-2xl"
                  )}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${crypto.color} pointer-events-none opacity-30`}
                  ></div>
                  <div
                    className={`absolute -right-8 -top-8 w-24 h-24 bg-${crypto.accentColor}/30 rounded-full blur-[24px] transition-all duration-500`}
                  ></div>

                  <div className="flex items-center justify-between mb-4 relative z-10 p-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`h-12 w-12 rounded-full bg-gradient-to-r from-black/60 to-black/40 flex items-center justify-center backdrop-blur-md border border-${crypto.accentColor}/30`}
                      >
                        {crypto.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {crypto.name}
                        </h3>
                        <p className="text-sm text-gray-400">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs ${
                        crypto.positive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {crypto.change}
                    </div>
                  </div>

                  <div className="mb-4 relative z-10 px-5">
                    <p className="text-gray-400 text-sm mb-1">Balance</p>
                    <div className="flex items-baseline">
                      <span
                        className={cn(
                          "font-bold mr-2",
                          crypto.amount.length > 6 ? "text-xl" : "text-2xl"
                        )}
                      >
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-300">
                          {crypto.amount} {crypto.symbol}
                        </span>
                      </span>
                      <span className="text-gray-400 text-sm">
                        ≈ ₹{crypto.fiatValue}
                      </span>
                    </div>
                  </div>

                  <div
                    className={cn(
                      "transition-all duration-500 overflow-hidden",
                      expandedCard === index
                        ? "max-h-[200px] opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-5 mb-4 relative z-10">
                      <p className="text-gray-400 text-sm mb-1">Address</p>
                      <div className="relative">
                        <div className="crypto-address flex justify-between items-center bg-black/40 backdrop-blur-sm border border-gray-800/50 p-3 rounded-md">
                          <span className="truncate pr-2 text-sm font-mono text-gray-300">
                            {crypto.address}
                          </span>
                          <button
                            onClick={() => copyAddress(crypto.address)}
                            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/5 rounded-full"
                          >
                            <Copy size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-4 mb-4 relative z-10 px-5">
                    <Button
                      className={`wallet-action-button bg-gradient-to-r from-${crypto.accentColor} to-${crypto.accentColor}/70 hover:opacity-90 transition-all duration-300 shadow-lg shadow-${crypto.accentColor}/20`}
                    >
                      Send
                    </Button>
                    <Button
                      variant="outline"
                      className="wallet-action-button border-gray-700/50 bg-black/20 hover:bg-black/40 transition-all duration-300"
                    >
                      Receive
                    </Button>
                  </div>

                  <button
                    onClick={() => toggleCardExpand(index)}
                    className="w-full flex items-center justify-center py-2 text-sm text-gray-400 hover:text-white transition-colors relative z-10 border-t border-white/5 hover:bg-white/5"
                  >
                    {expandedCard === index ? (
                      <>
                        <ChevronUp size={16} className="mr-1" /> Less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} className="mr-1" /> More
                      </>
                    )}
                  </button>

                  <div
                    className={`bg-gradient-to-r from-${crypto.accentColor}/60 to-white/5 h-1 w-full mt-auto transition-all duration-500`}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white/90 flex items-center">
              <span className="relative">
                Recent Activity
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#33C3F0] to-transparent"></span>
              </span>
            </h2>

            {walletData.recentTransactions.length > 0 ? (
              <div className="space-y-4">
                {walletData.recentTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="crypto-card relative overflow-hidden backdrop-blur-md bg-black/20 border border-white/10 shadow-xl rounded-2xl p-5 hover:border-white/20 transition-all duration-300 group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md border border-white/10">
                          {transaction.icon}
                        </div>
                        <div>
                          <div className="flex items-center">
                            <span
                              className={
                                transaction.type === "send"
                                  ? "text-red-400"
                                  : "text-green-400"
                              }
                            >
                              {transaction.type === "send"
                                ? "Sent"
                                : "Received"}
                            </span>
                            <span className="text-gray-400 mx-2">•</span>
                            <span className="text-white">
                              {transaction.amount} {transaction.crypto}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            {transaction.type === "send"
                              ? `To: ${transaction.to}`
                              : `From: ${transaction.from}`}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="flex items-center justify-end mb-1">
                          <span className="text-sm text-gray-300">
                            {transaction.date}
                          </span>
                          <CircleCheck
                            size={14}
                            className="ml-2 text-green-400"
                          />
                        </div>
                        <div className="text-xs text-gray-500 uppercase">
                          {transaction.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Button className="w-full mt-4 bg-gradient-to-r from-[#33C3F0] to-[#1EAEDB] hover:opacity-90 transition-all duration-300 shadow-lg shadow-[#33C3F0]/20 group relative overflow-hidden">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative">View All Transactions</span>
                </Button>
              </div>
            ) : (
              <div className="crypto-card flex flex-col items-center justify-center py-16 relative overflow-hidden backdrop-blur-md bg-black/20 border border-white/10 shadow-xl rounded-2xl hover:border-white/20 transition-all duration-300 group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#33C3F0]/5 to-purple-500/5 pointer-events-none"></div>
                <p className="text-gray-400 mb-6 relative z-10">
                  No recent activity
                </p>
                <Button className="bg-gradient-to-r from-[#33C3F0] to-[#1EAEDB] hover:opacity-90 transition-all duration-300 shadow-lg shadow-[#33C3F0]/20 px-8 py-6 h-auto relative z-10 group">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                  <span className="relative">Make a Transaction</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-white/10 backdrop-blur-xl bg-black/20 relative z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-500">
              © 2023 CryptoQR. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms
              </Link>
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WalletPage;
