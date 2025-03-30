import { Bitcoin, CircleDollarSign, DollarSign, Coins } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Wallet, Scan, History, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Plus, RefreshCw } from "lucide-react";
import { QrCode, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

const WalletPage = () => {
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
      },
      {
        name: "Ethereum",
        symbol: "ETH",
        amount: "1.2",
        fiatValue: "40,000",
        address: "0x71C7656EC7ab88b098defB751B740101B5f6d8976F",
        icon: <CircleDollarSign size={20} className="text-crypto-purple" />,
      },
      {
        name: "Tether",
        symbol: "USDT",
        amount: "100",
        fiatValue: "8,000",
        address: "TKwLegRSqU9AHDmPCyLGZHTXKZZZZBKDDo",
        icon: <DollarSign size={20} className="text-green-500" />,
      },
      {
        name: "Ripple",
        symbol: "XRP",
        amount: "500",
        fiatValue: "2,000",
        address: "rLW9gnQo7BQhU6igk5keqYnH3TVrCxGRzm",
        icon: <Coins size={20} className="text-crypto-blue" />,
      },
    ],
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletData.walletAddress);
    toast.success("Wallet address copied to clipboard");
  };

  const showQRCode = () => {
    toast.info("QR Code functionality will be implemented soon");
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-[#1A1F2C] via-[#1E2334] to-[#131722] overflow-hidden">
      {/* Starry Background */}
      <div className="fixed inset-0 z-0 opacity-50">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-white animate-pulse"></div>
        <div
          className="absolute top-3/4 left-1/2 w-1.5 h-1.5 rounded-full bg-white animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/3 left-3/4 w-1 h-1 rounded-full bg-white animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/5 w-2 h-2 rounded-full bg-white animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 left-4/5 w-1 h-1 rounded-full bg-white animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/6 left-1/3 w-1.5 h-1.5 rounded-full bg-white animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-4/5 left-2/5 w-1 h-1 rounded-full bg-white animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
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
              to="/scan"
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

      {/* Background effects */}
      <div className="pt-20 pb-16 relative z-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/lovable-uploads/48e1b049-1146-4447-b512-f1250c2180ff.png')] bg-cover bg-center opacity-10"></div>
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-crypto-blue/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 -left-20 w-80 h-80 bg-crypto-purple/10 rounded-full blur-[100px]"></div>
      </div>

      {/* <NavBar /> */}

      <main className="flex-grow container mx-auto px-4 py-8 relative z-10">
        <div className="animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                My Wallet
              </h1>
              <p className="text-gray-400">Manage your cryptocurrency assets</p>
            </div>
            <div className="flex items-center space-x-3 mt-6 md:mt-0">
              <Button
                variant="outline"
                className="border-gray-700 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300"
              >
                <RefreshCw size={18} className="mr-2 text-crypto-blue" />
                Refresh
              </Button>
              <Button className="bg-gradient-to-r from-crypto-blue to-crypto-blue/80 hover:opacity-90 transition-all duration-300 shadow-lg shadow-crypto-blue/20">
                <Plus size={18} className="mr-2" />
                Add Wallet
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="crypto-card flex flex-col relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/20 border border-gray-800/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-crypto-blue/10 to-purple-500/5 pointer-events-none"></div>
              <div className="flex items-start justify-between mb-6 relative z-10">
                <div>
                  <p className="text-gray-400 mb-1">Total Balance</p>
                  <p className="text-xs text-gray-500">
                    Your total wallet balance in INR
                  </p>
                </div>
                <div className="h-12 w-12 rounded-full bg-gradient-to-r from-crypto-blue/30 to-crypto-blue/10 flex items-center justify-center text-crypto-blue backdrop-blur-md">
                  <Wallet size={20} />
                </div>
              </div>
              <h2
                className={cn(
                  "crypto-balance relative z-10",
                  walletData.totalBalance.length > 8 ? "text-3xl" : "text-5xl"
                )}
              >
                <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                  {currency}
                  {walletData.totalBalance}
                </span>
              </h2>
            </div>

            <div className="crypto-card flex flex-col relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/20 border border-gray-800/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-crypto-blue/10 pointer-events-none"></div>
              <div className="flex items-start justify-between mb-4 relative z-10">
                <div>
                  <p className="text-gray-400 mb-1">Wallet Address</p>
                  <p className="text-xs text-gray-500">Your wallet address</p>
                </div>
              </div>
              <div className="crypto-address mb-6 flex-grow relative z-10 bg-black/40 backdrop-blur-sm border border-gray-800/50">
                {walletData.walletAddress}
              </div>
              <div className="flex gap-3 relative z-10">
                <Button
                  onClick={showQRCode}
                  variant="outline"
                  className="flex-1 border-gray-700/50 bg-black/20 hover:bg-black/40 transition-all duration-300"
                >
                  <QrCode size={18} className="mr-2 text-crypto-blue" />
                  Show QR Code
                </Button>
                <Button
                  onClick={copyAddress}
                  variant="outline"
                  className="flex-1 border-gray-700/50 bg-black/20 hover:bg-black/40 transition-all duration-300"
                >
                  <Copy size={18} className="mr-2 text-crypto-blue" />
                  Copy Address
                </Button>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold mb-6 mt-12 text-white/90">
            <span className="border-b-2 border-crypto-blue pb-1">
              Cryptocurrencies
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {walletData.cryptos.map((crypto, index) => (
              <div
                key={index}
                className="transform hover:scale-105 transition-all duration-300"
              >
                <div className="crypto-card relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/20 border border-gray-800/50 shadow-xl h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-crypto-blue/5 to-purple-500/5 pointer-events-none"></div>

                  <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-r from-black/60 to-black/40 flex items-center justify-center backdrop-blur-md border border-gray-800/50">
                        {crypto.icon}
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          {crypto.name}
                        </h3>
                        <p className="text-sm text-gray-400">{crypto.symbol}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6 relative z-10">
                    <p className="text-gray-400 text-sm mb-1">Balance</p>
                    <div className="flex items-baseline">
                      <span
                        className={cn(
                          "font-bold mr-2",
                          crypto.amount.length > 6 ? "text-xl" : "text-2xl"
                        )}
                      >
                        <span className="bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent">
                          {crypto.amount} {crypto.symbol}
                        </span>
                      </span>
                      <span className="text-gray-400 text-sm">
                        ≈ ₹{crypto.fiatValue}
                      </span>
                    </div>
                  </div>

                  <div className="mb-6 relative z-10">
                    <div className="relative">
                      <div className="crypto-address flex justify-between items-center bg-black/40 backdrop-blur-sm border border-gray-800/50 p-3 rounded-md">
                        <span className="truncate pr-2 text-sm font-mono">
                          {crypto.address}
                        </span>
                        <button
                          onClick={copyAddress}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <Copy size={16} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-6 relative z-10">
                    <Button className="wallet-action-button bg-crypto-blue hover:bg-crypto-blue/90 transition-all duration-300 shadow-lg shadow-crypto-blue/20">
                      Send
                    </Button>
                    <Button
                      variant="outline"
                      className="wallet-action-button border-gray-700/50 bg-black/20 hover:bg-black/40 transition-all duration-300"
                    >
                      Receive
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-6 text-white/90">
              <span className="border-b-2 border-crypto-blue pb-1">
                Recent Activity
              </span>
            </h2>
            <div className="crypto-card flex flex-col items-center justify-center py-16 relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/20 border border-gray-800/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-crypto-blue/5 to-purple-500/5 pointer-events-none"></div>
              <p className="text-gray-400 mb-6 relative z-10">
                No recent activity
              </p>
              <Button className="bg-gradient-to-r from-crypto-blue to-crypto-blue/80 hover:opacity-90 transition-all duration-300 shadow-lg shadow-crypto-blue/20 px-8 py-6 h-auto relative z-10">
                Make a Transaction
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WalletPage;
