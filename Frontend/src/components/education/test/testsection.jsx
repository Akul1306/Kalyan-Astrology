"use client";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
const TestSection = ({ onSubmitEmail }) => {
    const [email, setEmail] = useState("");
    const router = useRouter();
    const emailIsValid = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), [email]);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!emailIsValid)
            return;
        onSubmitEmail?.(email);
        router.push("/education/test");
    };
    // 1x1 transparent PNG as data URI to avoid next/image errors for missing local files
    const transparentPng = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR4nGNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    const [avatarSrcs, setAvatarSrcs] = useState([
        "/avatars/avatar1.png",
        "/avatars/avatar2.png",
        "/avatars/avatar3.png",
        "/avatars/avatar4.png",
    ]);
    const [heroSrc, setHeroSrc] = useState("/images/testsection.png");
    return (<section className="relative mb-6 mx-auto w-[95%] overflow-hidden rounded-3xl bg-white py-16 sm:py-20 md:py-24" aria-labelledby="test-section-title">
      {/* --- Background Effects --- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-yellow-200/60 blur-3xl"/>
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-purple-200/60 blur-3xl"/>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(250,204,21,0.12),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(168,85,247,0.12),transparent_40%)]"/>
      </div>

      {/* --- Content Grid --- */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        {/* --- Left Content --- */}
        <div>
          <h1 id="test-section-title" className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Test Your
            <br />
            <span className="block bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
              Astrology Skills
            </span>{" "}
            with AI
          </h1>

          <p className="mt-5 max-w-xl text-base text-gray-600 sm:text-lg">
            Learn astrology interactively with AI — take quick quizzes, get personalized feedback, and sharpen your predictions like a pro.
          </p>

          {/* --- Email Form --- */}
          <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row">
            <div className="relative flex-1 w-full">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" aria-label="Email address" className="w-full rounded-2xl border border-gray-200 bg-white/80 px-4 py-3 text-base text-gray-900 shadow-sm outline-none placeholder:text-gray-400 backdrop-blur focus:border-gray-300 focus:ring-2 focus:ring-yellow-400/40"/>
              {emailIsValid && (<span className="absolute inset-y-0 right-3 my-auto hidden h-6 w-6 items-center justify-center rounded-full bg-green-500/10 text-green-600 ring-1 ring-green-500/20 sm:flex">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </span>)}
            </div>

            <button disabled={!emailIsValid} type="submit" className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-yellow-400 to-yellow-500 px-6 py-3 text-sm font-semibold text-gray-900 shadow-[0_10px_30px_rgba(250,204,21,0.35)] transition-all hover:from-yellow-500 hover:to-yellow-600 disabled:cursor-not-allowed disabled:opacity-60">
              Get Started
            </button>
          </form>

          {/* --- Avatars Section --- */}
          <div className="mt-6 flex items-center gap-3">
            <div className="flex -ml-1">
              {avatarSrcs.map((src, i) => (<div key={i} className="-ml-2 h-9 w-9 rounded-full ring-2 ring-white overflow-hidden">
                  <Image src={src || transparentPng} alt={`Student ${i + 1}`} width={36} height={36} quality={85} className="object-cover" priority={false} loading="lazy" placeholder="blur" blurDataURL={transparentPng} onError={() => {
                setAvatarSrcs((prev) => {
                    const copy = [...prev];
                    copy[i] = transparentPng;
                    return copy;
                });
            }}/>
                </div>))}
            </div>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-sm font-semibold text-gray-700">
              2M+
            </span>
            <span className="text-sm text-gray-600">Students Enrolled</span>
          </div>
        </div>

        {/* --- Right Image --- */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[450px] animate-float">
          <Image src={heroSrc || transparentPng} alt="Astrology AI Learning" fill quality={90} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 50vw" className="object-contain drop-shadow-xl" priority loading="eager" placeholder="blur" blurDataURL={transparentPng} onError={() => setHeroSrc(transparentPng)}/>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>);
};
export default TestSection;
