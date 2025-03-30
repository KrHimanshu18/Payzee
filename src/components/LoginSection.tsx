
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";

const LoginSection = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Login successful! Redirecting...");
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Account created! Please check your email.");
  };

  return (
    <section id="login" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-glow-blue"></div>
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-crypto-darker to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-crypto-darker to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left column - Text content */}
          <div className="flex-1">
            <h2 className="section-heading">Begin Your <span className="bg-gradient-to-r from-crypto-blue to-crypto-green bg-clip-text text-transparent">Crypto Payment</span> Journey</h2>
            <p className="section-subheading text-left mx-0">
              Join thousands of users who are already enjoying the convenience of paying any UPI QR code with cryptocurrency.
            </p>
            
            <div className="space-y-8 mt-12">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-crypto-blue/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-crypto-blue" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Secure Transactions</h3>
                  <p className="text-gray-400">End-to-end encrypted payments with multi-factor authentication.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-crypto-green/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-crypto-green" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Competitive Rates</h3>
                  <p className="text-gray-400">Get the best exchange rates with minimal fees for your crypto-to-INR conversions.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-crypto-orange/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-crypto-orange" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Instant Settlements</h3>
                  <p className="text-gray-400">Your payments are processed in seconds, not days.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column - Login/Signup form */}
          <div className="flex-1 w-full max-w-md">
            <div className="backdrop-blur-md bg-crypto-dark/70 border border-white/10 rounded-2xl p-8 shadow-xl">
              <Tabs defaultValue="login" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Email Address"
                          className="pl-10 bg-crypto-dark/50 border-white/10 text-white"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
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
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="remember"
                          className="h-4 w-4 rounded border-gray-300 bg-crypto-dark/50"
                        />
                        <label htmlFor="remember" className="text-sm text-gray-300">
                          Remember me
                        </label>
                      </div>
                      
                      <a href="#" className="text-sm text-crypto-blue hover:text-crypto-blue/80">
                        Forgot password?
                      </a>
                    </div>
                    
                    <Button type="submit" className="w-full bg-crypto-blue hover:bg-crypto-blue/90 text-white py-6">
                      Login
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-6">
                    <div className="space-y-2">
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="text"
                          placeholder="Full Name"
                          className="pl-10 bg-crypto-dark/50 border-white/10 text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type="email"
                          placeholder="Email Address"
                          className="pl-10 bg-crypto-dark/50 border-white/10 text-white"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          className="pl-10 pr-10 bg-crypto-dark/50 border-white/10 text-white"
                          required
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-3 text-gray-400"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-gray-300 bg-crypto-dark/50"
                        required
                      />
                      <label htmlFor="terms" className="text-sm text-gray-300">
                        I agree to the <a href="#" className="text-crypto-blue hover:text-crypto-blue/80">Terms</a> and <a href="#" className="text-crypto-blue hover:text-crypto-blue/80">Privacy Policy</a>
                      </label>
                    </div>
                    
                    <Button type="submit" className="w-full bg-crypto-green hover:bg-crypto-green/90 text-black py-6">
                      Create Account
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
