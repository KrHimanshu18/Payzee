import React, {
  useContext,
  useState,
  useCallback,
  Suspense,
  lazy,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoginContext } from "@/context/LoginContext";

// Lazy load icons
const MailIcon = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Mail }))
);
const LockIcon = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Lock }))
);
const EyeIcon = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.Eye }))
);
const EyeOffIcon = lazy(() =>
  import("lucide-react").then((mod) => ({ default: mod.EyeOff }))
);

const SignIn = () => {
  const navigate = useNavigate();
  const { email, password, setName, setEmail, setPassword, setWalletAddress } =
    useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = "https://payzee.onrender.com";

  const handleSignIn = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      if (!email || !password) {
        toast.error("Please fill in all fields");
        return;
      }

      setLoading(true);
      try {
        const res = await fetch(
          `${url}/login?email=${encodeURIComponent(
            email
          )}&password=${encodeURIComponent(password)}`
        );
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Login failed");
          return;
        }

        setName(data.user?.name || "");
        setWalletAddress(data.user?.account?.walletAddress || "");

        toast.success("Login successful! Redirecting...");
        setTimeout(() => navigate("/dashboard", { state: data }), 1000);
      } catch (err) {
        toast.error("Login failed. Try again.");
      } finally {
        setLoading(false);
      }
    },
    [email, password, navigate, setName, setWalletAddress]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-crypto-darker">
      <div className="w-full max-w-md p-8 backdrop-blur-md bg-crypto-dark/70 border border-white/10 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Sign in</h1>
          <p className="text-gray-400">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6" aria-busy={loading}>
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <div className="relative">
              <Suspense
                fallback={
                  <span className="absolute left-3 top-3 h-5 w-5 bg-gray-400 rounded-full" />
                }
              >
                <MailIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </Suspense>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10 bg-crypto-dark/50 border-white/10 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                aria-invalid={!email ? "true" : "false"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-crypto-blue hover:text-crypto-blue/80"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Suspense
                fallback={
                  <span className="absolute left-3 top-3 h-5 w-5 bg-gray-400 rounded-full" />
                }
              >
                <LockIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              </Suspense>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 bg-crypto-dark/50 border-white/10 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                aria-invalid={!password ? "true" : "false"}
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                <Suspense
                  fallback={
                    <span className="h-5 w-5 bg-gray-400 rounded-full" />
                  }
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </Suspense>
              </button>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 bg-crypto-dark/50"
            />
            <label htmlFor="remember" className="ml-2 text-sm text-gray-300">
              Remember me
            </label>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white py-6 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-400">
            Don't have an account yet?{" "}
            <Link
              to="/sign-up"
              className="text-crypto-blue hover:text-crypto-blue/80 font-medium"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
