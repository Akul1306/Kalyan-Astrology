import React, { useState } from "react";
import Image from "next/image";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useKundliStore } from "@/lib/store";
import { loginWithEmail, googleAuth } from "@/lib/auth";
import { GoogleLogin } from "@react-oauth/google";
import { Mail, Lock, Sparkles, ArrowRight, Eye, EyeOff, Loader2 } from "lucide-react";
import MovingGradient from "@/components/store/Perfume/MovingGradient";

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useKundliStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect after login
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }
    
    setError(null);
    setLoading(true);
    try {
      const response = await loginWithEmail(email, password);
      store.setUser(response.data.user, response.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    setLoading(true);
    setError(null);
    try {
      const response = await googleAuth(credentialResponse.credential);
      store.setUser(response.data.user, response.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Google Sign-In failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google Sign-In was unsuccessful. Please try again.");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <MovingGradient />
      {/* Decorative celestial background elements adapted for light mode */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-yellow-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-500/10 rounded-full pointer-events-none animate-spin" style={{ animationDuration: "120s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-amber-500/10 rounded-full pointer-events-none animate-spin" style={{ animationDuration: "60s", animationDirection: "reverse" }} />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-300">
            <Image src="/Logo/Logo.svg" alt="Kalyan Logo" width={64} height={64} priority className="drop-shadow-[0_4px_12px_rgba(245,158,11,0.2)] animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 font-playfair">
            Welcome back to <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 font-bold">Kalyan</span>
          </h2>
          <p className="mt-2 text-sm text-gray-600 font-poppins">
            Access your sacred charts and astrological insights
          </p>
        </div>

        {/* Card Content */}
        <div className="bg-white/80 backdrop-blur-xl border border-amber-500/25 rounded-3xl p-8 shadow-[0_20px_50px_rgba(251,191,36,0.1)] relative overflow-hidden">
          {/* Subtle golden top border sheen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl text-sm text-red-700 flex items-start gap-3 animate-headShake">
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="block text-xs font-semibold text-gray-700 tracking-wide uppercase font-poppins">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-700/70">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-white/90 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-poppins"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-xs font-semibold text-gray-700 tracking-wide uppercase font-poppins">
                  Password
                </label>
                <Link to="/forgot-password" className="text-xs text-amber-700 hover:text-amber-600 transition font-poppins font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-amber-700/70">
                  <Lock className="h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 bg-white/90 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all font-poppins"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 border border-amber-400/20 text-neutral-950 font-semibold rounded-xl hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 font-poppins cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-neutral-950" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-poppins">
              <span className="bg-white/80 px-3 text-gray-500 rounded-md">
                Or Continue With
              </span>
            </div>
          </div>

          {/* Google Sign-in Container */}
          <div className="flex justify-center w-full relative z-20">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="outline"
              shape="rectangular"
              text="signin_with"
              width="320"
            />
          </div>

          {/* Register Link */}
          <div className="mt-6 text-center text-sm font-poppins">
            <span className="text-gray-600">Don't have an account? </span>
            <Link to="/register" className="font-medium text-amber-700 hover:text-amber-600 transition">
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
