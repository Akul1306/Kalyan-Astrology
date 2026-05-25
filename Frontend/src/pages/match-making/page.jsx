"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import MatchMaking from "@/components/forms/match-making-form";
import MovingGradient from "@/components/store/Perfume/MovingGradient";

export default function MatchMakingPage() {
    const router = useRouter();
    const [partnerOne, setPartnerOne] = useState({});
    const [partnerTwo, setPartnerTwo] = useState({});
    
    const handlePartnerSubmit = (data, partner) => {
        if (partner === "Partner 1") {
            setPartnerOne(data);
        }
        else {
            setPartnerTwo(data);
        }
    };
    
    const handleGenerateReport = () => {
        if (!partnerOne?.name || !partnerTwo?.name) {
            alert("Please fill out both partner profiles to generate the match report.");
            return;
        }
        const query = new URLSearchParams({
            partner1: partnerOne.name,
            partner2: partnerTwo.name,
            data: JSON.stringify({ partnerOne, partnerTwo })
        }).toString();
        router.push(`/match-making/MatchMakingReport?${query}`);
    };
    
    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center p-6">
            <div className="pointer-events-none absolute inset-0 -z-10">
                <MovingGradient />
            </div>

            <h1 className="z-10 mb-8 text-3xl font-bold">Match Making</h1>

            <div className="z-10 grid w-full max-w-5xl grid-cols-1 items-center gap-6 md:grid-cols-3">
                <MatchMaking 
                    title="Partner 1" 
                    defaultGender="male" 
                    onSubmit={(data) => handlePartnerSubmit(data, "Partner 1")} 
                    onChange={(values) => setPartnerOne(values)}
                />

                <motion.div 
                    className="flex justify-center text-5xl" 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                >
                    ❤️
                </motion.div>

                <MatchMaking 
                    title="Partner 2" 
                    defaultGender="female" 
                    onSubmit={(data) => handlePartnerSubmit(data, "Partner 2")} 
                    onChange={(values) => setPartnerTwo(values)}
                />
            </div>

            <Button 
                onClick={handleGenerateReport} 
                className="z-10 mt-8 rounded-xl bg-pink-600 px-8 py-3 text-lg text-white shadow-md hover:bg-pink-700"
            >
                Generate Match Report
            </Button>
        </div>
    );
}
