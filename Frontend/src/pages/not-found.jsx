"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Home, Grid, ShoppingBag, GraduationCap, FileText, ArrowRight } from "lucide-react";
export default function NotFound() {
    const links = [
        { href: "/", label: "Home", icon: Home },
        { href: "/research", label: "Research", icon: FileText },
        { href: "/store", label: "Store", icon: ShoppingBag },
        { href: "/education", label: "Education", icon: GraduationCap },
        { href: "/dashboard", label: "Dashboard", icon: Grid },
    ];
    return (<main className="relative min-h-[92dvh] w-full overflow-hidden bg-[#0b0d12] text-white">
      {/* Background visual */}
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(1200px_600px_at_50%_10%,rgba(255,26,26,0.15),transparent_60%),radial-gradient(1000px_500px_at_0%_100%,rgba(99,102,241,0.15),transparent_60%)]" aria-hidden/>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] mix-blend-screen">
        <Image src="/gridbg.png" alt="background grid" fill quality={85} sizes="100vw" priority={false} loading="lazy" className="object-cover" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMwYjBkMTIiLz48L3N2Zz4=" onError={(e) => {
            const target = e.target;
            target.style.display = "none";
        }}/>
      </div>

      <section aria-label="Page not found" className="relative mx-auto flex max-w-7xl flex-col items-center px-6 py-20 sm:py-28 md:py-32">
        {/* Logo */}
        <Link href="/" className="mb-10 inline-flex items-center gap-3 opacity-90 hover:opacity-100">
          <Image src="/Logo/Logo.svg" alt="Kalyan Logo" width={40} height={40} quality={90} priority loading="eager" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
            const target = e.target;
            if (target.src !== "/Logo/Logo.png") {
                target.src = "/Logo/Logo.png";
            }
        }}/>
          <span className="hidden sm:block text-base font-semibold tracking-wide text-white/90">Kalyan</span>
        </Link>

        {/* 404 headline */}
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-center text-6xl font-extrabold leading-none text-transparent sm:text-7xl md:text-8xl">
          404
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="mt-6 max-w-2xl text-center text-base text-white/80 sm:text-lg">
          The page you’re looking for has drifted into another constellation. Choose a destination below and continue your journey.
        </motion.p>

        {/* Primary actions */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-[0_0_24px_rgba(255,255,255,0.2)] transition hover:brightness-95">
            Go Home
            <ArrowRight className="h-4 w-4"/>
          </Link>
          <Link href="/research/aiblogs" className="inline-flex items-center gap-2 rounded-xl bg-[#FF1A1A] px-5 py-3 text-sm font-semibold text-white shadow-[0_0_24px_#FF1A1A] transition hover:brightness-110">
            Explore AI Blogs
          </Link>
        </motion.div>

        {/* Quick links grid */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }} className="mt-12 grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {links.map((l) => {
            const Icon = l.icon;
            return (<Link key={l.href} href={l.href} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition hover:bg-white/10">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                    <Icon className="h-5 w-5 text-white"/>
                  </span>
                  <span className="text-sm font-medium text-white/90 group-hover:text-white">{l.label}</span>
                </div>
                <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition"/>
              </Link>);
        })}
        </motion.div>

        {/* Footer hint */}
        <p className="mt-12 text-center text-xs text-white/60">
          If you believe this is an error, please reach out via the contact link in the footer.
        </p>
      </section>
    </main>);
}
