import React, { useState, useContext, lazy, Suspense } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { LoginContext } from "@/context/LoginContext";

// Lazy load heavy components
const Button = lazy(() =>
  import("@/components/ui/button").then((module) => ({
    default: module.Button,
  }))
);

const Input = lazy(() =>
  import("@/components/ui/input").then((module) => ({ default: module.Input }))
);

import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { name, email, password, setName, setEmail, setPassword } =
    useContext(LoginContext);

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const url = "https://payzee.onrender.com";

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${url}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success("Account created! Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Signup failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Reusable input component
  const FormInput = ({
    id,
    type,
    placeholder,
    value,
    onChange,
    icon,
    extraProps = {},
  }: {
    id: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: JSX.Element;
    extraProps?: React.InputHTMLAttributes<HTMLInputElement>;
  }) => (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-gray-300">
        {placeholder}
      </label>
      <div className="relative">
        {React.cloneElement(icon, {
          className: "absolute left-3 top-3 h-5 w-5 text-gray-400",
        })}
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10 pr-10 bg-crypto-dark/50 border-white/10 text-white"
          {...extraProps}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-crypto-darker p-4">
      <div className="w-full max-w-md p-8 backdrop-blur-md bg-crypto-dark/70 border border-white/10 rounded-2xl shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Sign up</h1>
          <p className="text-gray-400">Create a new account</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-6">
          <Suspense>
            <FormInput
              id="name"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User />}
              extraProps={{ required: true }}
            />
            <FormInput
              id="email"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail />}
              extraProps={{ required: true }}
            />
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pl-10 pr-10 bg-crypto-dark/50 border-white/10 text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </Suspense>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 bg-crypto-dark/50"
              required
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
              I agree to the{" "}
              <Link
                to="/terms"
                className="text-crypto-blue hover:text-crypto-blue/80"
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                to="/privacy"
                className="text-crypto-blue hover:text-crypto-blue/80"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <Suspense>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white py-6 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
          </Suspense>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link
            to="/sign-in"
            className="text-crypto-blue hover:text-crypto-blue/80 font-medium"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
