import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import {
  Home,
  Scan,
  Wallet,
  History,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
  Filter,
  Search,
  LogOut,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { LoginContext } from "@/context/LoginContext";

function Transaction() {
  const navigate = useNavigate();
  const { name, walletAddress } = useContext(LoginContext);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedTx, setSelectedTx] = useState<any | null>(null);
  const [filter, setFilter] = useState<"all" | "sent" | "received">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!name) navigate("/");
  }, [navigate, name]);

  // ✅ Fetch real transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const address = walletAddress;
        if (!address) {
          toast.error(
            "Wallet address not found. Please connect your wallet first."
          );
          return;
        }

        // --- UPDATED: URL now matches the WalletPage component ---
        const res = await fetch(
          `http://localhost:8081/getWallet?address=${address}`
        );
        if (!res.ok) throw new Error("Failed to fetch wallet data");

        const data = await res.json();

        // Flatten the lastTransactions object which contains arrays of transactions from different chains
        const allTxs = Object.values(data.lastTransactions || {}).flat();

        // Map the raw transaction data to a structured format for the UI
        const mapped = allTxs.map((tx: any, idx: number) => ({
          id: `tx-${idx}`,
          type:
            tx.from?.toLowerCase() === address.toLowerCase()
              ? "send"
              : "receive",
          amount: parseFloat(tx.valueETH || "0"),
          currency: tx.symbol || "ETH",
          recipient: tx.to || "Unknown",
          recipientAddress: tx.to || "",
          sender: tx.from || "Unknown",
          senderAddress: tx.from || "",
          status: "completed", // Assuming all fetched txs are completed
          timestamp: new Date(Number(tx.timeStamp) * 1000).toISOString(),
          hash: tx.hash,
          fee: 0, // Fee data would need to be provided by the backend
          valueInr: parseFloat(tx.valueInr || "0"), // Assuming backend provides this conversion
          category: "crypto",
        }));

        setTransactions(mapped);
      } catch (err) {
        console.error("Error fetching transactions", err);
        toast.error("Could not fetch transaction history.");
      } finally {
        setLoading(false); // stop loader
      }
    };

    fetchTransactions();
  }, []);

  // --- helpers ---
  const allCount = transactions.length;
  const sentCount = transactions.filter((tx) => tx.type === "send").length;
  const receivedCount = transactions.filter(
    (tx) => tx.type === "receive"
  ).length;
  const pendingCount = transactions.filter(
    (tx) => tx.status === "pending"
  ).length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "failed":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

  const filteredTransactions = transactions.filter((tx) => {
    if (
      filter !== "all" &&
      ((filter === "sent" && tx.type !== "send") ||
        (filter === "received" && tx.type !== "receive"))
    ) {
      return false;
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        tx.currency.toLowerCase().includes(query) ||
        tx.recipient.toLowerCase().includes(query) ||
        tx.sender.toLowerCase().includes(query) ||
        tx.status.toLowerCase().includes(query) ||
        tx.hash.toLowerCase().includes(query)
      );
    }
    return true;
  });

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-[#070b16] text-white overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-black to-black"></div>
        {/* Stars */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white animate-pulse-glow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Navbar */}
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
                <span>Logout</span>
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto pt-20 px-4 py-6 pb-16 md:pb-6 relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Transactions</h1>
          <p className="text-gray-400 mb-8">View your transaction history</p>

          {/* Transaction Summary */}
          <Card className="mb-8 bg-gray-900/40 border-gray-800 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-800">
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 mb-2">
                    <History size={20} className="text-white" />
                  </div>
                  <p className="text-gray-400 text-sm">All Transactions</p>
                  <p className="text-2xl font-bold">{allCount}</p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-red-500/20 mb-2">
                    <ArrowUpRight size={20} className="text-red-500" />
                  </div>
                  <p className="text-gray-400 text-sm">Sent</p>
                  <p className="text-2xl font-bold">{sentCount}</p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 mb-2">
                    <ArrowDownLeft size={20} className="text-green-500" />
                  </div>
                  <p className="text-gray-400 text-sm">Received</p>
                  <p className="text-2xl font-bold">{receivedCount}</p>
                </div>
                <div className="p-4 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-yellow-500/20 mb-2">
                    <div className="w-5 h-5 rounded-full border-2 border-yellow-500 border-t-transparent animate-spin"></div>
                  </div>
                  <p className="text-gray-400 text-sm">Pending</p>
                  <p className="text-2xl font-bold">{pendingCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search by address, hash, or currency..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900/40 border border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-crypto-blue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="flex rounded-lg overflow-hidden bg-gray-900/40 border border-gray-800">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 text-sm transition-colors ${
                    filter === "all"
                      ? "bg-crypto-blue text-white"
                      : "bg-transparent text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("sent")}
                  className={`px-4 py-2 text-sm transition-colors ${
                    filter === "sent"
                      ? "bg-crypto-blue text-white"
                      : "bg-transparent text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  Sent
                </button>
                <button
                  onClick={() => setFilter("received")}
                  className={`px-4 py-2 text-sm transition-colors ${
                    filter === "received"
                      ? "bg-crypto-blue text-white"
                      : "bg-transparent text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  Received
                </button>
              </div>

              <Button
                variant="outline"
                size="icon"
                className="border-gray-800 bg-gray-900/40 hover:bg-gray-800"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Advanced Filters (Placeholder) */}
          {showFilters && (
            <div className="mb-6 p-4 bg-gray-900/40 border border-gray-800 rounded-lg animate-fade-in">
              <h3 className="font-medium mb-3">Advanced Filters</h3>
              <p className="text-gray-500 text-sm">
                Advanced filtering options will be available in a future update.
              </p>
            </div>
          )}

          {/* Transactions List */}

          {loading ? (
            <div className="p-12 text-center bg-gray-900/40 border border-gray-800 rounded-lg">
              <div className="flex justify-center mb-4">
                <Loader2 className="h-10 w-10 animate-spin text-crypto-blue" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                Fetching transactions...
              </h3>
              <p className="text-gray-400">
                Please wait while we load your history.
              </p>
            </div>
          ) : filteredTransactions.length > 0 ? (
            <div className="space-y-4 mb-8">
              {filteredTransactions.map((tx, index) => (
                <div
                  key={tx.id}
                  className="p-4 bg-gray-900/40 border border-gray-800 rounded-lg cursor-pointer hover:bg-gray-800/40 transition-all duration-300 animate-fade-in"
                  onClick={() => setSelectedTx(tx)}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-full ${
                          tx.type === "send"
                            ? "bg-red-500/10"
                            : "bg-green-500/10"
                        }`}
                      >
                        {tx.type === "send" ? (
                          <ArrowUpRight className="h-5 w-5 text-red-500" />
                        ) : (
                          <ArrowDownLeft className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {tx.type === "send"
                            ? `Sent ${tx.currency}`
                            : `Received ${tx.currency}`}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {formatDate(tx.timestamp)}
                        </p>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${getStatusColor(
                            tx.status
                          )}`}
                        >
                          {tx.status.charAt(0).toUpperCase() +
                            tx.status.slice(1)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-medium ${
                          tx.type === "send" ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {tx.type === "send" ? "-" : "+"}
                        {tx.amount} {tx.currency}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-gray-900/40 border border-gray-800 rounded-lg">
              <div className="flex justify-center mb-4">
                <History size={48} className="text-gray-600" />
              </div>
              <h3 className="text-xl font-medium mb-2">
                No transactions found
              </h3>
              <p className="text-gray-400 mb-6">
                {searchQuery
                  ? "Try adjusting your search or filters"
                  : "Your transaction history will appear here"}
              </p>
              <Button className="bg-crypto-blue hover:bg-crypto-blue/90">
                Make a Transaction
              </Button>
            </div>
          )}
        </div>
      </main>

      {/* Transaction Details Dialog */}
      <Dialog
        open={!!selectedTx}
        onOpenChange={(open) => !open && setSelectedTx(null)}
      >
        <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-2xl">Transaction Details</DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete information about this transaction
            </DialogDescription>
          </DialogHeader>

          {selectedTx && (
            <div className="space-y-4 mt-4">
              <div className="p-4 rounded-lg bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Transaction Type</span>
                  <span className="capitalize font-medium flex items-center">
                    {selectedTx.type === "send" ? (
                      <>
                        <ArrowUpRight className="h-4 w-4 text-red-500 mr-1" />
                        <span>Send</span>
                      </>
                    ) : (
                      <>
                        <ArrowDownLeft className="h-4 w-4 text-green-500 mr-1" />
                        <span>Receive</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Amount</span>
                  <span className="font-medium">
                    {selectedTx.amount} {selectedTx.currency}
                  </span>
                </div>

                <div className="flex justify-between mb-2">
                  <span className="text-gray-400">Value (INR)</span>
                  <span className="font-medium">
                    ₹{selectedTx.valueInr.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span
                    className={`px-2 py-0.5 text-xs rounded-full ${getStatusColor(
                      selectedTx.status
                    )}`}
                  >
                    {selectedTx.status.charAt(0).toUpperCase() +
                      selectedTx.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-400 text-sm">Date & Time</span>
                  <p className="font-medium">
                    {formatDate(selectedTx.timestamp)}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Transaction Fee</span>
                  <p className="font-medium">
                    {selectedTx.fee} {selectedTx.currency}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">From</span>
                <div className="mt-1 font-mono text-xs bg-black/50 p-2 rounded-md overflow-x-auto">
                  {selectedTx.senderAddress}
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">To</span>
                <div className="mt-1 font-mono text-xs bg-black/50 p-2 rounded-md overflow-x-auto">
                  {selectedTx.recipientAddress}
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">Transaction Hash</span>
                <div className="mt-1 font-mono text-xs bg-black/50 p-2 rounded-md overflow-x-auto flex justify-between items-center">
                  <span className="truncate pr-2">{selectedTx.hash}</span>
                  <button
                    className="p-1 hover:bg-gray-700 rounded-full transition-all duration-300 flex-shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        `https://etherscan.io/tx/${selectedTx.hash}`,
                        "_blank"
                      );
                    }}
                    title="View on Explorer"
                  >
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <Button
                  variant="outline"
                  className="border-gray-700 hover:bg-gray-800"
                  onClick={() => setSelectedTx(null)}
                >
                  Close
                </Button>
                <Button
                  className="bg-crypto-blue hover:bg-crypto-blue/90"
                  onClick={() => {
                    window.open(
                      `https://etherscan.io/tx/${selectedTx.hash}`,
                      "_blank"
                    );
                  }}
                >
                  View on Explorer <ExternalLink className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Transaction;
