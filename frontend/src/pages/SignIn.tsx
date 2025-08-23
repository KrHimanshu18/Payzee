import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { toast } from "sonner";
import { LoginContext } from "@/context/LoginContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { email, password, setName, setEmail, setPassword, setWalletAddress } =
    useContext(LoginContext);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:8081";

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `${url}/login?email=${email}&password=${password}`
      );
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
        return;
      }

      setName(data.user.name);
      if (data.user.account) {
        if (data.user.account.walletAddress) {
          console.log(data.user.account.walletAddress);
          setWalletAddress(data.user.account.walletAddress);
        } else {
          setWalletAddress("");
          console.log("No wallet address found");
        }
      } else {
        setWalletAddress("");
      }

      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        navigate("/dashboard", {
          state: data,
        });
      }, 1000);
    } catch (error) {
      toast.error("Login failed. Try again.");
    } finally {
      setLoading(false); // stop loader after request completes
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-crypto-darker">
      <div className="w-full max-w-md p-8 backdrop-blur-md bg-crypto-dark/70 border border-white/10 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Sign in</h1>
          <p className="text-gray-400">Sign in to access your account</p>
        </div>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                className="pl-10 bg-crypto-dark/50 border-white/10 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pl-10 pr-10 bg-crypto-dark/50 border-white/10 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
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
