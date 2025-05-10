import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

// Mock transaction data
const mockTransactions = [
  // Crypto Transactions
  {
    id: "tx1",
    type: "send",
    amount: 0.01,
    currency: "BTC",
    recipient: "Coffee Shop",
    recipientAddress: "0x9A8EB5bB5cF88cfcEe9613368636f458800e73DE",
    sender: "Your Wallet",
    senderAddress: "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB",
    status: "completed",
    timestamp: new Date("2025-03-31T07:22:36").toISOString(),
    hash: "0x3a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b",
    fee: 0.0001,
    valueInr: 2500,
    category: "crypto",
  },
  {
    id: "tx2",
    type: "receive",
    amount: 0.5,
    currency: "ETH",
    recipient: "Your Wallet",
    recipientAddress: "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB",
    sender: "John Doe",
    senderAddress: "0x1A2B3C4D5E6F7A8B9C0D1E2F3A4B5C6D7E8F9A0B",
    status: "completed",
    timestamp: new Date("2025-03-31T05:52:36").toISOString(),
    hash: "0x9b8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a",
    fee: 0.002,
    valueInr: 5000,
    category: "crypto",
  },
  {
    id: "tx3",
    type: "send",
    amount: 100,
    currency: "USDT",
    recipient: "Online Store",
    recipientAddress: "0x8F7E6D5C4B3A2918F7E6D5C4B3A291D2C1B3A4F5",
    sender: "Your Wallet",
    senderAddress: "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB",
    status: "completed",
    timestamp: new Date("2025-03-30T14:25:36").toISOString(),
    hash: "0x7d6e5f4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e",
    fee: 0.5,
    valueInr: 8000,
    category: "crypto",
  },
  {
    id: "tx4",
    type: "receive",
    amount: 0.008,
    currency: "BTC",
    recipient: "Your Wallet",
    recipientAddress: "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB",
    sender: "Mining Pool",
    senderAddress: "0x6A5F4E3D2C1B0A9F8E7D6C5B4A3F2E1D0C9B8A7",
    status: "pending",
    timestamp: new Date("2025-03-29T18:42:36").toISOString(),
    hash: "0x5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b9a8f7e6d",
    fee: 0,
    valueInr: 12000,
    category: "crypto",
  },
  // INR Transactions
  {
    id: "tx5",
    type: "send",
    amount: 5000,
    currency: "INR",
    recipient: "Movie Tickets",
    recipientAddress: "user123@upi",
    sender: "Your Wallet",
    senderAddress: "user456@upi",
    status: "completed",
    timestamp: new Date("2025-03-28T10:15:22").toISOString(),
    hash: "UPI123456789",
    fee: 0,
    valueInr: 5000,
    category: "inr",
  },
  {
    id: "tx6",
    type: "receive",
    amount: 10000,
    currency: "INR",
    recipient: "Your Wallet",
    recipientAddress: "user456@upi",
    sender: "Monthly Salary",
    senderAddress: "user789@upi",
    status: "completed",
    timestamp: new Date("2025-03-27T09:30:45").toISOString(),
    hash: "UPI987654321",
    fee: 0,
    valueInr: 10000,
    category: "inr",
  },
];

function Transaction() {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState(mockTransactions);
  const [selectedTx, setSelectedTx] = useState<
    (typeof mockTransactions)[0] | null
  >(null);
  const [filter, setFilter] = useState<"all" | "sent" | "received">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    // if (!user || !JSON.parse(user).isAuthenticated) {
    //   navigate("/signin");
    // }
  }, [navigate]);

  // Get counts for the summary
  const allCount = transactions.length;
  const sentCount = transactions.filter((tx) => tx.type === "send").length;
  const receivedCount = transactions.filter(
    (tx) => tx.type === "receive"
  ).length;
  const pendingCount = transactions.filter(
    (tx) => tx.status === "pending"
  ).length;

  const user = JSON.parse(localStorage.getItem("user") || "{}");

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // Apply filters to transactions
  const filteredTransactions = transactions.filter((tx) => {
    // Apply type filter
    if (
      filter !== "all" &&
      ((filter === "sent" && tx.type !== "send") ||
        (filter === "received" && tx.type !== "receive"))
    ) {
      return false;
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        tx.currency.toLowerCase().includes(query) ||
        tx.recipient.toLowerCase().includes(query) ||
        tx.sender.toLowerCase().includes(query) ||
        tx.status.toLowerCase().includes(query)
      );
    }

    return true;
  });

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In a real app, we would handle actual logout logic here
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
              <span className="text-xl font-bold">ZollPay</span>
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

      {/* Main Content */}
      <main className="container mx-auto pt-20 px-4 py-6 pb-16 md:pb-6 relative z-10">
        <div className="animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Transactions</h1>
          <p className="text-gray-400 mb-8">View your transaction history</p>

          {/* Transaction Summary */}
          <Card className="mb-8 bg-gray-900/40 border-gray-800 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-4 divide-x divide-gray-800">
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
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 bg-gray-900/40 border border-gray-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-crypto-blue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <div className="flex rounded-lg overflow-hidden bg-gray-900/40 border border-gray-800">
                <button
                  onClick={() => setFilter("all")}
                  className={`px-4 py-2 text-sm ${
                    filter === "all"
                      ? "bg-crypto-blue text-white"
                      : "bg-transparent text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setFilter("sent")}
                  className={`px-4 py-2 text-sm ${
                    filter === "sent"
                      ? "bg-crypto-blue text-white"
                      : "bg-transparent text-gray-400 hover:bg-gray-800"
                  }`}
                >
                  Sent
                </button>
                <button
                  onClick={() => setFilter("received")}
                  className={`px-4 py-2 text-sm ${
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

          {/* Advanced Filters (toggleable) */}
          {showFilters && (
            <div className="mb-6 p-4 bg-gray-900/40 border border-gray-800 rounded-lg animate-fade-in">
              <h3 className="font-medium mb-3">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Currency
                  </label>
                  <select className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg">
                    <option value="">All Currencies</option>
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="USDT">Tether (USDT)</option>
                    <option value="INR">Indian Rupee (INR)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Status
                  </label>
                  <select className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg">
                    <option value="">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Date Range
                  </label>
                  <select className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg">
                    <option value="">All Time</option>
                    <option value="today">Today</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                    <option value="year">This Year</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end mt-4">
                <Button
                  variant="outline"
                  className="mr-2 border-gray-700 text-gray-400 hover:bg-gray-800"
                >
                  Reset
                </Button>
                <Button className="bg-crypto-blue hover:bg-crypto-blue/90">
                  Apply Filters
                </Button>
              </div>
            </div>
          )}

          {/* Transactions List */}
          {filteredTransactions.length > 0 ? (
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
                            ? `Sent to ${tx.recipient}`
                            : `Received from ${tx.sender}`}
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
                        {tx.type === "send" ? "-" : "+"} ₹
                        {tx.valueInr.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-400">
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
                <div className="mt-1 flex gap-2 items-center">
                  <div className="font-medium">{selectedTx.sender}</div>
                </div>
                <div className="mt-1 font-mono text-xs bg-black/50 p-2 rounded-md overflow-x-auto">
                  {selectedTx.senderAddress}
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">To</span>
                <div className="mt-1 flex gap-2 items-center">
                  <div className="font-medium">{selectedTx.recipient}</div>
                </div>
                <div className="mt-1 font-mono text-xs bg-black/50 p-2 rounded-md overflow-x-auto">
                  {selectedTx.recipientAddress}
                </div>
              </div>

              <div>
                <span className="text-gray-400 text-sm">Transaction Hash</span>
                <div className="mt-1 font-mono text-xs bg-black/50 p-2 rounded-md overflow-x-auto flex justify-between items-center">
                  <span>{selectedTx.hash}</span>
                  <button
                    className="p-1 hover:bg-gray-700 rounded-full transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(
                        selectedTx.category === "crypto"
                          ? `https://etherscan.io/tx/${selectedTx.hash}`
                          : `https://upi.trx/${selectedTx.hash}`,
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
                {selectedTx.category === "crypto" && (
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
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Transaction;
