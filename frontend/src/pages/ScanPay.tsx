import { useState, useEffect, useRef, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Home,
  Scan,
  Wallet,
  History,
  Camera,
  RefreshCw,
  ArrowLeftRight,
  CheckCircle2,
  XCircle,
  QrCode,
  ArrowRight,
  Send,
  Bitcoin,
  DollarSign,
  LogOut,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { LoginContext } from "@/context/LoginContext";

declare global {
  interface Window {
    ethereum?: any;
  }
}

function ScanPay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { username, email, password, setUsername, setEmail, setPassword } =
    useContext(LoginContext);
  const [walletAddress, setWalletAddress] = useState("");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [amount, setAmount] = useState("");
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [cameraActive, setCameraActive] = useState(true);
  const [scanning, setScanning] = useState(false);
  const [scanningMessage, setScanningMessage] = useState(
    "Align QR code within the frame"
  );
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<HTMLDivElement | null>(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const availableCryptos = [
    {
      name: "Bitcoin",
      icon: <Bitcoin size={20} className="text-yellow-500" />,
      symbol: "BTC",
    },
    {
      name: "Ethereum",
      icon: <ArrowLeftRight size={20} className="text-crypto-purple" />,
      symbol: "ETH",
    },
    {
      name: "USDT",
      icon: <DollarSign size={20} className="text-green-500" />,
      symbol: "USDT",
    },
  ];
  const upiId = "example@upi";

  useEffect(() => {
    // update this when authentication added
    // if (!user || !user.name) {
    //   navigate("/");
    // }

    const startCamera = async () => {
      try {
        if (cameraActive) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        toast.error("Could not access camera. Please check permissions.");
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, [user, navigate, cameraActive]);

  const toggleCamera = async () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
    }

    setCameraActive((prev) => !prev);
  };

  const captureImage = () => {
    setScanning(true);
    setScanningMessage("Scanning QR code...");

    // Simulate QR code scanning with a progress effect
    setTimeout(() => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");
        if (context) {
          context.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          setCapturedImage(canvasRef.current.toDataURL("image/png"));
          setScanningMessage("QR code detected!");

          // Success animation
          setTimeout(() => {
            setScanning(false);
            setShowDialog(true);
          }, 800);
        }
      }
    }, 1500);
  };

  const handleSubmit = async () => {
    if (!amount || !selectedCrypto) {
      toast.error("Please enter amount and select cryptocurrency");
      return;
    }

    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const sender = accounts[0];
        const transactionParameters = {
          // to: "0x9fF40834755C55896da370aC057A7E3E1f24Bf07", // Replace with recipient's wallet address
          to: { walletAddress },
          from: sender,
          value: (parseFloat(amount) * 1e18).toString(16), // Convert amount to Wei
        };

        toast.promise(
          window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParameters],
          }),
          {
            loading: "Processing transaction...",
            success: "Transaction completed successfully!",
            error: "Transaction failed. Please try again.",
          }
        );

        console.log("Transaction submitted with:", {
          amount,
          selectedCrypto,
          upiId,
          sender,
        });
      } else {
        toast.error("MetaMask is not installed. Please install it to proceed.");
      }
      setShowDialog(false);

      // Clear form after successful submission
      setAmount("");
      setSelectedCrypto("");
      setCapturedImage(null);
    } catch (error) {
      console.error("Error processing transaction:", error);
      toast.error("Transaction failed. Please try again.");
    }
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
    // In a real app, we would handle actual logout logic here
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#1A1F2C] via-[#1E2334] to-[#131722]">
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
      </div>

      {/* Background accents */}
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-20 -left-20 w-80 h-80 bg-neon-yellow/5 rounded-full blur-[100px]"></div>

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
              <span>{username}</span>
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

      <div className="container mx-auto pt-24 pb-16 px-4 z-10 relative animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
              Scan & Pay
            </h1>
            <p className="text-gray-400">
              Scan QR code and make crypto payments instantly
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/20 border border-gray-800/50 shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-neon-yellow/5 pointer-events-none"></div>

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-2">
                  <QrCode className="text-crypto-blue" />
                  <span>QR Scanner</span>
                </CardTitle>
                <CardDescription>
                  Align QR code within the scanner frame
                </CardDescription>
              </CardHeader>

              <CardContent className="relative z-10 flex flex-col items-center">
                <div
                  ref={frameRef}
                  className={cn(
                    "relative w-full aspect-square rounded-lg overflow-hidden border-2 border-dashed transition-all duration-300 flex items-center justify-center",
                    scanning ? "border-crypto-blue" : "border-gray-600",
                    !cameraActive && "bg-gray-900"
                  )}
                >
                  {cameraActive ? (
                    <>
                      <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        autoPlay
                        playsInline
                      ></video>

                      {/* Scanner overlay */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div
                          className={cn(
                            "w-4/5 h-4/5 border-2 rounded-lg transition-all duration-300",
                            scanning
                              ? "border-crypto-blue animate-pulse"
                              : "border-white/30"
                          )}
                        >
                          {/* Corner markers */}
                          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl border-neon-yellow"></div>
                          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 rounded-tr border-neon-yellow"></div>
                          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 rounded-bl border-neon-yellow"></div>
                          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br border-neon-yellow"></div>
                        </div>
                      </div>

                      {/* Scan line animation */}
                      {scanning && (
                        <div className="absolute left-0 w-full h-0.5 bg-crypto-blue animate-[scanline_1.5s_ease-in-out_infinite]"></div>
                      )}

                      {/* Scan message */}
                      <div
                        className={cn(
                          "absolute bottom-4 left-0 right-0 text-center py-2 px-4 backdrop-blur-md bg-black/40 mx-auto w-max rounded-full transition-all",
                          scanning ? "bg-crypto-blue/20" : "bg-black/40"
                        )}
                      >
                        <span className="text-sm font-medium flex items-center gap-2">
                          {scanning ? (
                            <RefreshCw size={14} className="animate-spin" />
                          ) : (
                            <Scan size={14} />
                          )}
                          {scanningMessage}
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <Camera size={48} className="mb-4 opacity-50" />
                      <p>Camera is turned off</p>
                      <p className="text-sm">
                        Click the button below to enable
                      </p>
                    </div>
                  )}
                </div>

                <canvas
                  ref={canvasRef}
                  className="hidden"
                  width={640}
                  height={480}
                ></canvas>
              </CardContent>

              <CardFooter className="relative z-10 flex flex-col gap-3">
                <div className="flex w-full gap-3">
                  <Button
                    variant="outline"
                    onClick={toggleCamera}
                    className="flex-1 border-gray-700/50 bg-black/20 hover:bg-black/40 transition-all duration-300"
                  >
                    <Camera size={18} className="mr-2 text-crypto-blue" />
                    {cameraActive ? "Turn Off Camera" : "Turn On Camera"}
                  </Button>
                </div>

                <Button
                  onClick={captureImage}
                  disabled={!cameraActive || scanning}
                  className={cn(
                    "w-full bg-gradient-to-r from-crypto-blue to-crypto-blue/80 hover:opacity-90 transition-all duration-300 shadow-lg shadow-crypto-blue/20",
                    (!cameraActive || scanning) &&
                      "opacity-50 cursor-not-allowed"
                  )}
                >
                  {scanning ? (
                    <>
                      <RefreshCw size={18} className="mr-2 animate-spin" />
                      Scanning...
                    </>
                  ) : (
                    <>
                      <Scan size={18} className="mr-2" />
                      Scan QR Code
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            <div className="space-y-6">
              <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/20 border border-gray-800/50 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-crypto-purple/10 to-crypto-blue/5 pointer-events-none"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <Wallet className="text-crypto-blue" />
                    <span>Quick Instructions</span>
                  </CardTitle>
                  <CardDescription>
                    How to use Scan & Pay feature
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-full bg-crypto-blue/20 flex items-center justify-center text-crypto-blue">
                        1
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          Enable Camera
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Make sure your camera is enabled and permissions are
                          granted
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-full bg-crypto-blue/20 flex items-center justify-center text-crypto-blue">
                        2
                      </div>
                      <div>
                        <h3 className="font-medium text-white">Scan QR Code</h3>
                        <p className="text-gray-400 text-sm">
                          Position the QR code within the scanning frame
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-full bg-crypto-blue/20 flex items-center justify-center text-crypto-blue">
                        3
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          Enter Details
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Fill in amount and select cryptocurrency
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="h-8 w-8 rounded-full bg-crypto-blue/20 flex items-center justify-center text-crypto-blue">
                        4
                      </div>
                      <div>
                        <h3 className="font-medium text-white">
                          Complete Transaction
                        </h3>
                        <p className="text-gray-400 text-sm">
                          Review and confirm payment details
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="relative overflow-hidden backdrop-blur-sm bg-gradient-to-br from-black/40 to-black/20 border border-gray-800/50 shadow-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-yellow/5 to-orange-500/10 pointer-events-none"></div>

                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2">
                    <Send className="text-crypto-blue" />
                    <span>Recent Payments</span>
                  </CardTitle>
                  <CardDescription>
                    Your recent scan & pay transactions
                  </CardDescription>
                </CardHeader>

                <CardContent className="relative z-10">
                  <div className="text-center py-6">
                    <p className="text-gray-400 mb-2">No recent payments</p>
                    <p className="text-sm text-gray-500">
                      Your recent payments will appear here
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="backdrop-blur-xl bg-gradient-to-br from-[#131722]/95 to-[#1A1F2C]/95 border border-gray-800/50 shadow-xl sm:max-w-md text-white">
          <div className="absolute inset-0 bg-gradient-to-br from-crypto-blue/5 to-neon-yellow/5 rounded-lg pointer-events-none"></div>

          <DialogHeader className="relative z-10">
            <DialogTitle className="text-xl flex items-center gap-2">
              <Send size={20} className="text-crypto-blue" />
              Complete Your Payment
            </DialogTitle>
            <DialogDescription>
              Enter payment details to complete this transaction
            </DialogDescription>
          </DialogHeader>

          <div className="relative z-10 space-y-6 py-4">
            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                UPI ID / Wallet Address
              </label>
              <div className="bg-black/40 border border-gray-800/50 rounded-md p-3 flex justify-between items-center">
                <span className="text-gray-300 text-sm font-mono truncate">
                  {upiId}
                </span>
                <div className="h-6 w-6 rounded-full bg-crypto-blue/20 flex items-center justify-center text-crypto-blue">
                  <CheckCircle2 size={14} />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">Amount</label>
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-black/40 border-gray-800/50 focus:border-crypto-blue focus:ring-crypto-blue/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400">
                Select Cryptocurrency
              </label>
              <div className="grid grid-cols-3 gap-2">
                {availableCryptos.map((crypto) => (
                  <button
                    key={crypto.name}
                    onClick={() => setSelectedCrypto(crypto.name)}
                    className={cn(
                      "flex flex-col items-center p-3 rounded-md border transition-all",
                      selectedCrypto === crypto.name
                        ? "bg-crypto-blue/20 border-crypto-blue"
                        : "bg-black/40 border-gray-800/50 hover:bg-black/60"
                    )}
                  >
                    <span className="mb-1">{crypto.icon}</span>
                    <span className="text-sm">{crypto.symbol}</span>
                  </button>
                ))}
              </div>
            </div>

            {amount && selectedCrypto && (
              <div className="space-y-4">
                <div className="flex justify-between items-center bg-black/40 border border-gray-800/50 rounded-md p-3">
                  <span className="text-gray-400">Estimated Value</span>
                  <span className="font-bold">
                    ₹{(parseFloat(amount) * 1500).toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-black/40 border border-gray-800/50 rounded-md p-3">
                  <span className="text-gray-400">Network Fee</span>
                  <span>~₹50.00</span>
                </div>
              </div>
            )}
          </div>

          <DialogFooter className="relative z-10 flex sm:justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => setShowDialog(false)}
              className="border-gray-700/50 bg-black/20 hover:bg-black/40 transition-all duration-300"
            >
              <XCircle size={18} className="mr-2 text-gray-400" />
              Cancel
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={!amount || !selectedCrypto}
              className={cn(
                "bg-gradient-to-r from-crypto-blue to-crypto-blue/80 hover:opacity-90 transition-all duration-300 shadow-lg shadow-crypto-blue/20",
                (!amount || !selectedCrypto) && "opacity-50 cursor-not-allowed"
              )}
            >
              <Send size={18} className="mr-2" />
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Mobile navigation bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 backdrop-blur-xl bg-black/30 border-t border-white/10 z-50">
        <div className="flex justify-around items-center py-3">
          <Link
            to="/"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Home size={20} />
            <span className="text-xs">Home</span>
          </Link>
          <Link
            to="/scanpay"
            className="flex flex-col items-center gap-1 text-crypto-blue"
          >
            <Scan size={20} />
            <span className="text-xs">Scan</span>
          </Link>
          <Link
            to="/wallet"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <Wallet size={20} />
            <span className="text-xs">Wallet</span>
          </Link>
          <Link
            to="/history"
            className="flex flex-col items-center gap-1 text-gray-400"
          >
            <History size={20} />
            <span className="text-xs">History</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ScanPay;
