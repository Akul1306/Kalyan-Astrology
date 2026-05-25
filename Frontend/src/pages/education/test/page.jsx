"use client";
import React from "react";
import TestSection from "@/components/education/test/testsection";
import SubjectCard from "@/components/education/test/SubjectCard";
import TestHero from "@/components/education/test/TestHero";
import MovingGradient from "@/components/store/Perfume/MovingGradient";

export default function TestPage() {
    return (<>
      <MovingGradient />
      <section className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-transparent text-black font-[Inter]">
        <TestHero />
        <SubjectCard />
      </section>
      <div className="flex justify-center relative w-full bg-transparent">
        <TestSection onSubmitEmail={() => {
          if (process.env.NODE_ENV === "development") {
              console.log("Email submitted");
          }
        }}/>
      </div>
    </>);
}
