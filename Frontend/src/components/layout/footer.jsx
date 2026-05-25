"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, HeartHandshake, FileText, Store, GraduationCap, Home, Send, } from "lucide-react";
import { GeistSans } from "@/next-shim/geist";
const containerVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.15,
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};
const itemVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: [0.22, 1, 0.36, 1],
        },
    },
};
export function Footer() {
    const currentYear = new Date().getFullYear();
    const footerRef = useRef(null);

    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle"); // 'idle' | 'loading' | 'success'
    const [message, setMessage] = useState("");

    const handleSubscribe = async (e) => {
        e.preventDefault();
        if (!email) return;

        setStatus("loading");
        
        // Simulate a sleek cosmic API validation call
        setTimeout(() => {
            setStatus("success");
            setMessage("Welcome to the Cosmic Circle! 🌟 You have successfully subscribed to the Kalyan Astro • AI Newsletter.");
            setEmail("");
        }, 1200);
    };
    // Cursor tracking
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    // radial gradient size (large to fill space without popping)
    const RADIUS = 600;
    // Smooth spring for cursor following
    const cursorX = useSpring(mouseX, { damping: 25, stiffness: 200 });
    const cursorY = useSpring(mouseY, { damping: 25, stiffness: 200 });
    // Gradient center follows pointer precisely
    const gradientX = useTransform(cursorX, (v) => v - RADIUS);
    const gradientY = useTransform(cursorY, (v) => v - RADIUS);
    useEffect(() => {
        const footer = footerRef.current;
        if (!footer)
            return;
        const handleMove = (e) => {
            const rect = footer.getBoundingClientRect();
            mouseX.set(e.clientX - rect.left);
            mouseY.set(e.clientY - rect.top);
        };
        const handleLeave = () => {
            mouseX.set(-2000);
            mouseY.set(-2000);
        };
        footer.addEventListener("pointermove", handleMove, { passive: true });
        footer.addEventListener("mousemove", handleMove, { passive: true });
        footer.addEventListener("pointerleave", handleLeave, { passive: true });
        footer.addEventListener("mouseleave", handleLeave, { passive: true });
        return () => {
            footer.removeEventListener("pointermove", handleMove);
            footer.removeEventListener("mousemove", handleMove);
            footer.removeEventListener("pointerleave", handleLeave);
            footer.removeEventListener("mouseleave", handleLeave);
        };
    }, [mouseX, mouseY]);
    return (<footer ref={footerRef} className={`${GeistSans.className} relative z-30 bg-white border-t border-gray-100 overflow-hidden`}>
      {/* --- Ambient background layer --- */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-transparent to-white"/>

        {/* Smooth GPU-animated background */}
        <motion.div className="absolute inset-0 opacity-10 footer-ambient-bg" animate={{
            backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }} transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear",
        }}/>

        {/* --- Cursor-following radial glow (fixed) --- */}
        <motion.div className="pointer-events-none absolute" style={{
            width: RADIUS * 2,
            height: RADIUS * 2,
            background: "radial-gradient(circle 600px at center, rgba(255,244,194,0.10) 0%, transparent 70%)",
            x: gradientX,
            y: gradientY,
            willChange: "transform",
        }}/>

        {/* Depth Orbs */}
        <motion.div className="absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-amber-300/10 blur-3xl" animate={{ x: [0, 20, -10, 0], opacity: [0.2, 0.4, 0.3, 0.2] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}/>
        <motion.div className="absolute -top-32 right-0 h-64 w-64 rounded-full bg-amber-500/8 blur-3xl" animate={{ x: [0, -15, 10, 0], opacity: [0.15, 0.35, 0.25, 0.15] }} transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}/>
      </div>

      {/* --- Content --- */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <motion.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-140px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6 group">
              <motion.div whileHover={{ scale: 1.05, rotate: 4 }} whileTap={{ scale: 0.96 }} className="relative">
                <div className="relative h-11 w-11 rounded-2xl flex items-center justify-center overflow-hidden">
                  <Image src="/Logo/Logo.svg" alt="Kalyan Logo" width={32} height={32} priority className="object-contain"/>
                </div>
              </motion.div>
              <span className="text-2xl font-semibold tracking-tight text-gray-900 group-hover:text-[#FFF000] transition-colors duration-300">
                Kalyan
              </span>
            </Link>

            <p className="text-gray-600 text-sm leading-relaxed max-w-md mb-6">
              AI-enabled Vedic astrology & research platform. Generate precise Kundlis, explore
              spiritual analytics, and discover insights blending{" "}
              <span className="font-medium text-[#FFF000]">ancient wisdom</span> with{" "}
              <span className="font-medium text-[#FFF000]">modern intelligence</span>.
            </p>

            <div className="flex items-center gap-3">
              {[
            { icon: Facebook, href: "#", label: "Facebook" },
            { icon: Twitter, href: "#", label: "Twitter" },
            { icon: Instagram, href: "#", label: "Instagram" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Youtube, href: "#", label: "YouTube" },
        ].map((social) => (<motion.a key={social.label} href={social.href} whileHover={{ scale: 1.12, y: -2 }} whileTap={{ scale: 0.92 }} className="group relative p-2.5 rounded-xl bg-gray-50/80 backdrop-blur-sm
                    border border-gray-100 hover:bg-[#FFF000] hover:border-[#FFF000] transition-all duration-300">
                  <social.icon className="h-4 w-4 text-gray-600 group-hover:text-gray-900 transition-colors"/>
                </motion.a>))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-semibold text-gray-900 mb-4 tracking-[0.18em] uppercase">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {[
            { href: "/", label: "Home", icon: Home },
            { href: "/match-making", label: "Match Making", icon: HeartHandshake },
            { href: "/research", label: "Research", icon: FileText },
            { href: "/store", label: "Store", icon: Store },
            { href: "/education", label: "Education", icon: GraduationCap },
        ].map((link) => (<li key={link.href}>
                  <Link href={link.href} className="group flex items-center gap-2 text-sm text-gray-600 hover:text-[#FFF000]">
                    <link.icon className="h-4 w-4 text-gray-400 group-hover:text-yellow-600"/>
                    <span className="relative">{link.label}</span>
                  </Link>
                </li>))}
            </ul>
          </motion.div>

          {/* Ecosystem */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xs font-semibold text-gray-900 mb-4 tracking-[0.18em] uppercase">
              Ecosystem
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              {/* Research */}
              <li>
                <span className="text-[11px] font-medium text-gray-400 uppercase">
                  Research
                </span>
                <ul className="mt-2 space-y-1.5">
                  {[
            { href: "/research/blogs", label: "Blogs" },
            { href: "/research/research-papers", label: "Papers" },
            { href: "/research/aiblogs", label: "AI Blogs" },
        ].map((s) => (<li key={s.href}>
                      <Link href={s.href} className="pl-2 text-xs text-gray-500 hover:text-[#FFF000]">
                        {s.label}
                      </Link>
                    </li>))}
                </ul>
              </li>

              {/* Store */}
              <li className="pt-2">
                <span className="text-[11px] font-medium text-gray-400 uppercase">
                  Store
                </span>
                <ul className="mt-2 space-y-1.5">
                  {[
            { href: "/store/perfume", label: "Perfume" },
            { href: "/store/poster", label: "Posters" },
            { href: "/store/gems", label: "Gems" },
            { href: "/store/accessories", label: "Accessories" },
            { href: "/store/bracelet", label: "Bracelets" },
        ].map((s) => (<li key={s.href}>
                      <Link href={s.href} className="pl-2 text-xs text-gray-500 hover:text-[#FFF000]">
                        {s.label}
                      </Link>
                    </li>))}
                </ul>
              </li>

              {/* Learning */}
              <li className="pt-2">
                <span className="text-[11px] font-medium text-gray-400 uppercase">
                  Learning
                </span>
                <ul className="mt-2 space-y-1.5">
                  {[
            { href: "/education/books", label: "Books" },
            { href: "/education/test", label: "Astro Test" },
        ].map((s) => (<li key={s.href}>
                      <Link href={s.href} className="pl-2 text-xs text-gray-500 hover:text-[#FFF000]">
                        {s.label}
                      </Link>
                    </li>))}
                </ul>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h3 className="text-xs font-semibold text-gray-900 mb-4 tracking-[0.18em] uppercase">
              Contact
            </h3>

            <ul className="space-y-2.5 mb-5 text-sm text-gray-600">
              {[
            { icon: Mail, text: "support@kalyan.com", href: "mailto:support@kalyan.com" },
            { icon: Phone, text: "+91-98765-43210", href: "tel:+919876543210" },
            { icon: MapPin, text: "New Delhi, India", href: "#" },
        ].map((c, i) => (<li key={i}>
                  <a href={c.href} className="group flex items-start gap-3 hover:text-[#FFF000]">
                    <c.icon className="h-4 w-4 mt-0.5 text-gray-400 group-hover:text-[#FFF000]"/>
                    <span className="text-xs text-gray-500 group-hover:text-[#FFF000] transition-colors">{c.text}</span>
                  </a>
                </li>))}
            </ul>

            {/* Newsletter */}
            <div className="mt-4">
              <h4 className="text-xs font-semibold text-gray-900 mb-2 tracking-[0.16em] uppercase">
                Astro • AI Newsletter
              </h4>
              <p className="text-xs text-gray-500 mb-3">
                Monthly drops on cosmic trends, research updates, and product releases.
              </p>

              {status === "success" ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-4 rounded-2xl border border-yellow-200/50 bg-yellow-50/30 backdrop-blur-xs text-[11px] text-yellow-900 leading-relaxed font-mono"
                >
                  <p className="font-bold mb-1">Cosmic Connection established! 🪐</p>
                  <p className="text-gray-700">{message}</p>
                  <button 
                    onClick={() => setStatus("idle")} 
                    className="mt-3 text-[9px] uppercase font-bold text-yellow-800 hover:text-yellow-900 underline block"
                  >
                    Subscribe another email
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input 
                    type="email" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" 
                    disabled={status === "loading"}
                    className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-200
                      bg-gray-50/80 backdrop-blur-sm focus:ring-2 focus:ring-yellow-400/60
                      placeholder:text-gray-400 disabled:opacity-50"
                  />

                  <motion.button 
                    type="submit" 
                    disabled={status === "loading"}
                    whileHover={{ scale: status === "loading" ? 1 : 1.02, y: status === "loading" ? 0 : -1 }} 
                    whileTap={{ scale: status === "loading" ? 1 : 0.97 }} 
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5
                      text-sm font-medium text-gray-900 bg-linear-to-r from-yellow-300
                      via-yellow-400 to-yellow-500 rounded-xl shadow disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      <>Aligning Stars...</>
                    ) : (
                      <>Subscribe <Send className="h-4 w-4"/></>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <motion.div variants={itemVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="mt-12 pt-6 border-t border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {currentYear} Kalyan. Crafted at the intersection of code & cosmos.
            </p>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-xs text-gray-500 hover:text-yellow-700">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-xs text-gray-500 hover:text-yellow-700">
                Terms of Service
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Thin glowing bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-yellow-400/50 to-transparent"/>
    </footer>);
}
