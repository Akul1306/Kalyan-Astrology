import React, { useState } from "react";
import Image from "next/image";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useKundliStore } from "@/lib/store";
import { registerUser, googleAuth } from "@/lib/auth";
import { GoogleLogin } from "@react-oauth/google";
import { User, Mail, Lock, Sparkles, ArrowRight, Eye, EyeOff, Loader2, Phone, MapPin, Clock } from "lucide-react";

export function RegisterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const store = useKundliStore();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [timeOfBirth, setTimeOfBirth] = useState("");
  const [bio, setBio] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Redirect after registration
  const from = location.state?.from?.pathname || "/";

  // Auto-format HH:MM time
  const handleTimeChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    
    if (value.length > 2) {
      value = `${value.slice(0, 2)}:${value.slice(2)}`;
    }
    setTimeOfBirth(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in name, email, and password.");
      return;
    }

    // Verify time format if provided
    if (timeOfBirth && !/^([01]\d|2[0-3]):([0-5]\d)$/.test(timeOfBirth)) {
      setError("Please provide a valid birth time in 24h format (HH:MM)");
      return;
    }
    
    setError(null);
    setLoading(true);
    try {
      const payload = {
        name,
        email,
        password,
        phone: phone || undefined,
        placeOfBirth: placeOfBirth || undefined,
        timeOfBirth: timeOfBirth || undefined,
        bio: bio || undefined,
      };

      const response = await registerUser(payload);
      store.setUser(response.data.user, response.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Registration failed. Email might already exist.");
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
      setError(err.message || "Google Sign-Up failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google registration was unsuccessful. Please try again.");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 px-4 py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative celestial background elements */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-amber-500/5 rounded-full pointer-events-none animate-spin" style={{ animationDuration: "120s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-dashed border-amber-500/5 rounded-full pointer-events-none animate-spin" style={{ animationDuration: "60s", animationDirection: "reverse" }} />

      <div className="max-w-xl w-full space-y-8 relative z-10 my-8">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4 hover:scale-105 transition-transform duration-300">
            <Image src="/Logo/Logo.svg" alt="Kalyan Logo" width={64} height={64} priority className="drop-shadow-[0_4px_12px_rgba(245,158,11,0.3)] animate-pulse" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-white font-playfair">
            Create your <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500">Kalyan</span> Account
          </h2>
          <p className="mt-2 text-sm text-neutral-400 font-poppins">
            Begin your journey with custom Vedic birth charts and guidance
          </p>
        </div>

        {/* Card Content */}
        <div className="bg-neutral-900/60 backdrop-blur-xl border border-neutral-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
          {/* Subtle golden top border sheen */}
          <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />
          
          {error && (
            <div className="mb-6 p-4 bg-red-950/40 border border-red-500/30 rounded-2xl text-sm text-red-300 flex items-start gap-3 animate-headShake">
              <span className="mt-0.5">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Name Field */}
              <div className="space-y-1">
                <label htmlFor="name" className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase font-poppins">
                  Full Name <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <User className="h-5 w-5" />
                  </div>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-poppins text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-1">
                <label htmlFor="email" className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase font-poppins">
                  Email Address <span className="text-amber-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <Mail className="h-5 w-5" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-poppins text-sm"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="password" className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase font-poppins">
                  Password <span className="text-amber-500">* (min 8 chars)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-poppins text-sm"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-300"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Phone Field */}
              <div className="space-y-1">
                <label htmlFor="phone" className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase font-poppins">
                  Phone Number <span className="text-neutral-500 text-[10px]">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <Phone className="h-4 w-4" />
                  </div>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-poppins text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              {/* Place of Birth */}
              <div className="space-y-1">
                <label htmlFor="placeOfBirth" className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase font-poppins">
                  Place of Birth <span className="text-neutral-500 text-[10px]">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <input
                    id="placeOfBirth"
                    type="text"
                    value={placeOfBirth}
                    onChange={(e) => setPlaceOfBirth(e.target.value)}
                    className="block w-full pl-10 pr-4 py-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-poppins text-sm"
                    placeholder="New Delhi, India"
                  />
                </div>
              </div>

              {/* Time of Birth */}
              <div className="space-y-1">
                <label htmlFor="timeOfBirth" className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase font-poppins">
                  Time of Birth <span className="text-neutral-500 text-[10px]">(Optional)</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
                    <Clock className="h-4 w-4" />
                  </div>
                  <input
                    id="timeOfBirth"
                    type="text"
                    value={timeOfBirth}
                    onChange={handleTimeChange}
                    className="block w-full pl-10 pr-4 py-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-poppins text-sm"
                    placeholder="14:30 (24-hour)"
                  />
                </div>
              </div>

              {/* Bio Field */}
              <div className="space-y-1 md:col-span-2">
                <label htmlFor="bio" className="block text-xs font-semibold text-neutral-300 tracking-wide uppercase font-poppins">
                  Bio / Spiritual Intentions <span className="text-neutral-500 text-[10px]">(Optional)</span>
                </label>
                <textarea
                  id="bio"
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="block w-full px-4 py-2.5 bg-neutral-950/80 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-poppins text-sm resize-none"
                  placeholder="Tell us briefly about your interest in Vedic astrology..."
                />
              </div>

            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full relative flex items-center justify-center px-4 py-3 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 border border-amber-400/20 text-neutral-950 font-semibold rounded-xl hover:opacity-95 active:scale-[0.98] transition-all disabled:opacity-50 disabled:scale-100 font-poppins cursor-pointer"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-neutral-950" />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
              <div className="w-full border-t border-neutral-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase font-poppins">
              <span className="bg-neutral-900/10 px-3 text-neutral-500 bg-neutral-900 rounded-md">
                Or Sign Up With
              </span>
            </div>
          </div>

          {/* Google Sign-in Container */}
          <div className="flex justify-center w-full relative z-20">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_dark"
              shape="rectangular"
              text="signup_with"
              width="320"
            />
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm font-poppins">
            <span className="text-neutral-400">Already have an account? </span>
            <Link to="/login" className="font-medium text-amber-400 hover:text-amber-300 transition">
              Sign In Instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
