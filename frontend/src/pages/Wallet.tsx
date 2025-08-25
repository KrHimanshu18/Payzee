import {
  Bitcoin,
  CircleDollarSign,
  DollarSign,
  Coins,
  Wallet,
  Scan,
  History,
  LogOut,
  Plus,
  RefreshCw,
  QrCode,
  Copy,
  ChevronDown,
  ChevronUp,
  CircleCheck,
  X,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  Suspense,
  lazy,
} from "react";
import { LoginContext } from "@/context/LoginContext";

// Lazy load ethers to optimize bundle
const ethersPromise = import("ethers");

// Modal for entering wallet address
const WalletAddressModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (address: string) => void;
}> = ({ isOpen, onClose, onSubmit }) => {
  const [address, setAddress] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.trim()) {
      onSubmit(address);
    } else {
      toast.error("Please enter a valid wallet address.");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
    >
      <div className="bg-gradient-to-br from-[#1A1F2C] to-[#131722] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md m-4 p-8 relative animate-fade-in-up">
        <button
          onClick={onClose}
          aria-label="Close wallet address modal"
          className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
        >
          <X size={20} aria-hidden="true" />
        </button>
        <h2
          id="wallet-modal-title"
          className="text-2xl font-bold mb-4 text-white"
        >
          Enter Your Wallet Address
        </h2>
        <p className="text-gray-400 mb-6">
          To view your assets, please provide your public wallet address.
        </p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="wallet-address" className="sr-only">
            Wallet Address
          </label>
          <input
            id="wallet-address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className="w-full bg-black/40 border border-gray-700 rounded-lg px-4 py-3 mb-6 text-white font-mono focus:outline-none focus:ring-2 focus:ring-[#33C3F0]"
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-[#33C3F0] to-[#1EAEDB] hover:opacity-90 transition-all duration-300 shadow-lg shadow-[#33C3F0]/20"
          >
            Submit Address
          </Button>
        </form>
      </div>
    </div>
  );
};

// --- Main Wallet Page Component ---
const WalletPage: React.FC = () => {
  const navigate = useNavigate();
  const { name, email, walletAddress, setWalletAddress } =
    useContext(LoginContext);

  const [walletData, setWalletData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddressModalOpen, setAddressModalOpen] = useState(false);

  const url = "https://payzee.onrender.com";
  const currency = "₹";

  const updateWalletAddressOnBackend = useCallback(
    async (name: string, address: string) => {
      toast.info("Saving your wallet address...", { id: "set-address" });
      try {
        const res = await fetch(`${url}/updateWalletAddress`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, walletAddress: address }),
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message);
          return false;
        }

        toast.success("Wallet address saved successfully!", {
          id: "set-address",
        });
        return true;
      } catch (error) {
        console.error("Failed to set wallet address:", error);
        toast.error("Could not save wallet address. Please try again.", {
          id: "set-address",
        });
        return false;
      }
    },
    [email, url]
  );

  const fetchWalletDetails = useCallback(
    async (address: string) => {
      setIsLoading(true);
      toast.info("Fetching wallet details...", { id: "fetch-wallet" });

      try {
        const response = await fetch(`${url}/getWallet?address=${address}`, {
          method: "GET",
        });
        if (!response.ok) throw new Error("Failed to fetch wallet data");

        const data = await response.json();

        const totalBalance = Object.values(data.balances)
          .map((val) => parseFloat(val as string) || 0)
          .reduce((acc, val) => acc + val, 0);

        const combinedTxs = Object.values(data.lastTransactions || {})
          .flat()
          .map((tx: any) => ({
            type:
              tx.from?.toLowerCase() === address.toLowerCase()
                ? "send"
                : "receive",
            crypto: tx.symbol || "ETH",
            amount: tx.valueETH || "0",
            from: tx.from,
            to: tx.to,
            date: new Date(Number(tx.timeStamp) * 1000).toLocaleDateString(),
            status: "completed",
            icon: <CircleDollarSign size={16} className="text-purple-500" />,
          }));

        setWalletData({
          walletAddress: data.walletAddress,
          balances: data.balances,
          lastTransactions: data.lastTransactions,
          recentTransactions: combinedTxs,
          totalBalance: totalBalance.toFixed(10),
        });

        toast.success("Wallet details loaded!", { id: "fetch-wallet" });
      } catch (err) {
        toast.error("Invalid wallet address", { id: "fetch-wallet" });
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    },
    [url]
  );

  useEffect(() => {
    if (!name) {
      navigate("/");
    }
    if (walletAddress) {
      fetchWalletDetails(walletAddress);
    } else {
      setIsLoading(false);
      setAddressModalOpen(true);
    }
  }, [name, walletAddress, navigate, fetchWalletDetails]);

  const handleLogout = useCallback(() => {
    toast.success("Logged out successfully");
  }, []);

  const handleModalSubmit = useCallback(
    async (newAddress: string) => {
      const isSuccess = await updateWalletAddressOnBackend(name, newAddress);
      if (isSuccess) {
        setWalletAddress(newAddress);
        fetchWalletDetails(newAddress);
        setAddressModalOpen(false);
      }
    },
    [fetchWalletDetails, updateWalletAddressOnBackend, name, setWalletAddress]
  );

  const copyAddress = useCallback((address: string) => {
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard");
  }, []);

  const showQRCode = useCallback(() => {
    toast.info("QR Code functionality will be implemented soon", {
      description: "This feature is coming in a future update.",
    });
  }, []);

  const getRandomAnimationDelay = useCallback(
    () => `${Math.random() * 5}s`,
    []
  );
  const getRandomPosition = useCallback(() => `${Math.random() * 100}%`, []);

  return (
    <>
      <WalletAddressModal
        isOpen={isAddressModalOpen}
        onClose={() => setAddressModalOpen(false)}
        onSubmit={handleModalSubmit}
      />
      <div className="min-h-screen flex flex-col relative bg-gradient-to-b from-[#131722] via-[#1A1F2C] to-[#131722] overflow-hidden">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
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
          <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-[#8B5CF6]/10 blur-[120px]"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 rounded-full bg-[#F97316]/10 blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[#1EAEDB]/5 blur-[120px]"></div>
        </div>

        {/* Header */}
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
                <span className="text-xl font-bold">Payzee</span>
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
                to="/transaction"
                className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
              >
                <History size={18} />
                <span>History</span>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 backdrop-blur-md bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
                <div className="w-8 h-8 rounded-full bg-crypto-blue flex items-center justify-center text-white font-medium">
                  {name ? name.charAt(0).toUpperCase() : "U"}
                </div>
                <span>{name || "User"}</span>
              </div>
              <Link to="/" onClick={handleLogout}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                >
                  <LogOut size={16} />
                  <span className="ml-2">Logout</span>
                </Button>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-grow container mx-auto px-4 pt-28 pb-16 relative z-10">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <RefreshCw className="animate-spin text-[#33C3F0]" size={40} />
            </div>
          ) : !walletData ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-white mb-4">
                No Wallet Connected
              </h2>
              <p className="text-gray-400 mb-6">
                Please enter your wallet address to see your assets.
              </p>
              <Button
                onClick={() => setAddressModalOpen(true)}
                className="bg-gradient-to-r from-[#33C3F0] to-[#1EAEDB] hover:opacity-90"
              >
                Enter Address
              </Button>
            </div>
          ) : (
            <div className="animate-fade-in">
              {/* Page Header */}
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
                    onClick={() => fetchWalletDetails(walletAddress)}
                    className="border-gray-700 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-all duration-300 group"
                  >
                    <RefreshCw
                      size={18}
                      className="mr-2 text-[#33C3F0] group-hover:rotate-180 transition-transform duration-500"
                    />
                    Refresh
                  </Button>
                  <Button
                    onClick={() => setAddressModalOpen(true)} // 👈 Open modal on click
                    className="bg-gradient-to-r from-[#33C3F0] to-[#1EAEDB] hover:opacity-90 transition-all duration-300 shadow-lg shadow-[#33C3F0]/20 group relative overflow-hidden"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    <Plus size={18} className="mr-2 relative" />
                    <span className="relative">Update/Change Wallet</span>
                  </Button>
                </div>
              </div>

              {/* Balance & Address Cards */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Total Balance Card */}
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
                      walletData.totalBalance.length > 8
                        ? "text-3xl"
                        : "text-5xl"
                    )}
                  >
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-gray-300">
                      {currency}
                      {walletData.totalBalance}
                    </span>
                  </h2>
                  <div className="bg-gradient-to-r from-[#33C3F0] to-white/5 h-1 w-full mt-auto transition-all duration-500 group-hover:from-[#33C3F0]/80"></div>
                </div>

                {/* Wallet Address Card */}
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

              {/* Recent Activity Section */}
              <div className="mt-16 mb-12">
                <h2 className="text-2xl font-bold mb-6 text-white/90 flex items-center">
                  <span className="relative">
                    Last Transaction
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-[#33C3F0] to-transparent"></span>
                  </span>
                </h2>

                {walletData.recentTransactions.length > 0 ? (
                  (() => {
                    const lastTx = walletData.recentTransactions[0];

                    return (
                      <div className="crypto-card relative overflow-hidden backdrop-blur-md bg-black/20 border border-white/10 shadow-xl rounded-2xl p-5 hover:border-white/20 transition-all duration-300 group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-black/40 flex items-center justify-center backdrop-blur-md border border-white/10">
                              {lastTx.icon}
                            </div>
                            <div>
                              <div className="flex items-center">
                                <span
                                  className={
                                    lastTx.type === "send"
                                      ? "text-red-400"
                                      : "text-green-400"
                                  }
                                >
                                  {lastTx.type === "send" ? "Sent" : "Received"}
                                </span>
                                <span className="text-gray-400 mx-2">•</span>
                                <span className="text-white">
                                  {lastTx.amount} {lastTx.crypto}
                                </span>
                              </div>
                              <p className="text-sm text-gray-400">
                                {lastTx.type === "send"
                                  ? `To: ${lastTx.to}`
                                  : `From: ${lastTx.from}`}
                              </p>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center justify-end mb-1">
                              <span className="text-sm text-gray-300">
                                {lastTx.date}
                              </span>
                              <CircleCheck
                                size={14}
                                className="ml-2 text-green-400"
                              />
                            </div>
                            <div className="text-xs text-gray-500 uppercase">
                              {lastTx.status}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="crypto-card flex flex-col items-center justify-center py-16 relative overflow-hidden backdrop-blur-md bg-black/20 border border-white/10 shadow-xl rounded-2xl hover:border-white/20 transition-all duration-300 group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#33C3F0]/5 to-purple-500/5 pointer-events-none"></div>
                    <p className="text-gray-400 mb-6 relative z-10">
                      No transactions found
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="py-6 border-t border-white/10 backdrop-blur-xl bg-black/20 relative z-10">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-sm text-gray-500">
                © 2023 Payzee. All rights reserved.
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
    </>
  );
};

export default WalletPage;
