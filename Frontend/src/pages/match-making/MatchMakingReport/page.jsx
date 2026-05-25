"use client";

import React, { useEffect, useState, useRef } from "react";
import { useSearchParams } from "@/next-shim/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Heart, Sparkles, Loader2, AlertTriangle, CheckCircle, 
  HelpCircle, Send, RefreshCw, Star, Info, ShieldAlert, ArrowRightLeft
} from "lucide-react";
import { kundliAPI } from "@/lib/api";
import { useKundliStore } from "@/lib/store";
import MatchTable from "@/components/MatchMaking/MatchTable";
import MovingGradient from "@/components/store/Perfume/MovingGradient";
import Link from "next/link";
import AIChatBox from "@/components/Chatbot/AIChatBox";

export default function MatchMakingReportPage() {
  const searchParams = useSearchParams();
  const { currentUser } = useKundliStore();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const [astrologyUserId, setAstrologyUserId] = useState(null);

  // Chatbot state
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [chatStarted, setChatStarted] = useState(false);
  const chatEndRef = useRef(null);

  // Parse search parameters
  const name1 = searchParams.get("partner1") || "Partner 1";
  const name2 = searchParams.get("partner2") || "Partner 2";
  const dataParam = searchParams.get("data");

  // Fetch astrology session ID for the chatbot
  useEffect(() => {
    let storedId = localStorage.getItem("astrology_user_id");
    if (!storedId && currentUser && currentUser.astrologyUserId) {
      storedId = currentUser.astrologyUserId;
      localStorage.setItem("astrology_user_id", storedId);
    }
    if (storedId) {
      setAstrologyUserId(storedId);
    }
  }, [currentUser]);

  // Fetch Matchmaking details
  useEffect(() => {
    const fetchReport = async () => {
      if (!dataParam) {
        setError("Missing partner parameters. Please return to the matchmaking form and submit.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        
        const parsed = JSON.parse(dataParam);
        const { partnerOne, partnerTwo } = parsed;

        if (!partnerOne || !partnerTwo) {
          throw new Error("Invalid partner details payload.");
        }

        const res = await kundliAPI.calculateMatch(partnerOne, partnerTwo);
        
        if (res.status === "success" && res.data) {
          setData(res.data);
        } else {
          throw new Error("Failed to load matching data.");
        }
      } catch (err) {
        console.error("Matchmaking fetch error:", err);
        setError(err.message || "An error occurred while computing astrological compatibility.");
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, [dataParam]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isThinking]);

  if (loading) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center p-6">
        <MovingGradient />
        <div className="z-10 flex flex-col items-center text-center max-w-md">
          {/* Animated Celestial Rings */}
          <div className="relative h-32 w-32 mb-8 flex items-center justify-center">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-pink-400 opacity-60"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
              className="absolute inset-2 rounded-full border border-pink-200 opacity-80"
            />
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-4xl"
            >
              ❤️
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 tracking-tight mb-2">
            Weaving Celestial Alignments
          </h2>
          <p className="text-sm text-gray-500 font-medium tracking-wide mb-6">
            Querying Swiss Ephemeris data & calculating Ashtakoot Guna Milan for {name1} and {name2}...
          </p>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/40 border border-white/20 backdrop-blur-md rounded-full">
            <Loader2 className="h-4 w-4 text-pink-500 animate-spin" />
            <span className="text-[11px] font-semibold text-pink-600 uppercase tracking-widest font-mono">
              Analyzing charts
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center p-6">
        <MovingGradient />
        <div className="z-10 w-full max-w-md rounded-3xl border border-red-100 bg-white/80 p-8 shadow-xl backdrop-blur-md text-center">
          <div className="h-16 w-16 mb-6 mx-auto rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shadow-inner">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Cosmic Interruption
          </h3>
          <p className="text-xs text-gray-500 mb-6 leading-relaxed">
            {error}
          </p>
          <div className="flex flex-col gap-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs py-3 shadow transition-transform active:scale-95"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Try Again
            </button>
            <Link href="/match-making" className="text-xs font-semibold text-pink-600 hover:text-pink-700 hover:underline">
              Back to Form
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { astroDetails, gunaMilan } = data || {};
  const totalScore = gunaMilan?.total_score ?? gunaMilan?.total_points ?? 0;
  const compatibilityLevel = gunaMilan?.compatibility || "Neutral";

  // Map API response to MatchTable format
  const mappedRows = (gunaMilan?.koots || []).map((koot) => {
    let result = "Neutral";
    const half = koot.max / 2;
    if (koot.points > half) {
      result = "Good";
    } else if (koot.points === half) {
      result = "Neutral";
    } else {
      result = "Bad";
    }

    // Custom deep descriptions for Koots
    const kootMeta = {
      Varna: { desc: "Spiritual and ego alignment" },
      Vashya: { desc: "Dominance, attraction, and mutual control" },
      Tara: { desc: "Birth star compatibility & destiny path" },
      Yoni: { desc: "Physical and intimate compatibility" },
      "Graha Maitri": { desc: "Mental connection and natural friendship" },
      Gana: { desc: "Temperament and behavioral traits (behavior/nature)" },
      Bhakoot: { desc: "Emotional bonding, health, and family prosperity" },
      Nadi: { desc: "Health, progeny, and genetics (the most critical check)" }
    };

    const meta = kootMeta[koot.name] || { desc: koot.description };

    // Format highly specific notes
    let notes = `Earned ${koot.points} out of ${koot.max} points. `;
    if (koot.name === "Nadi" && koot.points === 0) {
      notes += "⚠️ Nadi Dosha detected. Critical health and genetic mismatch. Consider seeking remedies.";
    } else if (koot.name === "Bhakoot" && koot.points === 0) {
      notes += "⚠️ Bhakoot Dosha detected. Financial or family harmony issues predicted.";
    } else if (koot.points === koot.max) {
      notes += "✨ Perfect planetary compatibility in this domain.";
    } else if (koot.points > 0) {
      notes += "Harmonious connection with minor differences.";
    } else {
      notes += "Planetary alignment suggests disharmony; adjustments needed.";
    }

    return {
      name: koot.name === "Graha Maitri" ? "Graha Maitram" : koot.name,
      desc: meta.desc,
      result,
      notes
    };
  });

  // Calculate score circle color
  let scoreColorClass = "text-emerald-500 border-emerald-500 bg-emerald-50/50";
  let scoreTextClass = "text-emerald-700";
  if (totalScore < 18) {
    scoreColorClass = "text-[#FF4D67] border-[#FF4D67] bg-red-50/50";
    scoreTextClass = "text-[#FF4D67]";
  } else if (totalScore < 25) {
    scoreColorClass = "text-amber-500 border-amber-500 bg-amber-50/50";
    scoreTextClass = "text-amber-600";
  }

  // Pre-seed chat questions
  const preSeedQuestions = [
    { id: "remedies", label: "🛠️ remedies for low points & doshas", text: "What remedies can we perform to neutralize any low koot points or doshas in our match?" },
    { id: "emotional", label: "💖 emotional & mental connection", text: "How will our mental compatibility and emotional bonding be based on Graha Maitri and Bhakoot?" },
    { id: "intimacy", label: "🔥 physical & intimate compatibility (Yoni)", text: "What does our Yoni compatibility indicate about our physical attraction, passion, and intimate resonance?" },
    { id: "temperament", label: "✨ temperament compatibility (Gana)", text: "What does our Gana compatibility tell about our personality traits and behavioral differences?" },
    { id: "health", label: "🧬 Nadi or Bhakoot Dosha risk status", text: "Are there critical health or family doshas in our chart, and how severe are they?" },
    { id: "career", label: "📈 career & wealth synergy potential", text: "How will our partnership influence our career success, financial growth, and overall prosperity?" }
  ];

  const getStaticResponse = (questionId) => {
    const nadi = gunaMilan?.koots?.find(k => k.name === "Nadi") || { points: 0, max: 8 };
    const bhakoot = gunaMilan?.koots?.find(k => k.name === "Bhakoot") || { points: 0, max: 7 };
    const gana = gunaMilan?.koots?.find(k => k.name === "Gana") || { points: 0, max: 6 };
    const maitriReal = gunaMilan?.koots?.find(k => k.name === "Graha Maitri") || { points: 3, max: 5 };
    const yoni = gunaMilan?.koots?.find(k => k.name === "Yoni") || { points: 0, max: 4 };

    if (questionId === "remedies") {
      let text = `Based on your specific compatibility score of ${totalScore}/36, here are the targeted Vedic remedies:\n\n`;
      let remediesList = [];
      if (nadi.points === 0) {
        remediesList.push("🔴 **For Nadi Dosha:** Chant the Maha Mrityunjaya Mantra (108 times daily), donate grains and clothes to the needy on Wednesdays, and perform a Nadi Nivarana Pooja.");
      }
      if (bhakoot.points === 0) {
        remediesList.push("🟡 **For Bhakoot Dosha:** Chant the Vishnu Sahasranama, perform a Shiva Pooja together on Mondays, and donate yellow-colored sweets to temple priests on Thursdays.");
      }
      if (gunaMilan?.mangal_dosh?.male && !gunaMilan?.mangal_dosh?.female) {
        remediesList.push(`🔥 **For Male Manglik Dosha:** Perform Mangal Shanti Pooja or chant the Hanuman Chalisa daily. Male partner can wear a red coral ring on the ring finger after consultation.`);
      }
      if (gunaMilan?.mangal_dosh?.female && !gunaMilan?.mangal_dosh?.male) {
        remediesList.push(`🔥 **For Female Manglik Dosha:** Perform Kumbha Vivah or chant Hanuman Chalisa. Female partner can worship Goddess Durga on Tuesdays.`);
      }
      if (remediesList.length === 0) {
        remediesList.push("✨ **General Harmony Boosters:** Your charts share excellent basic coordinates. To strengthen your resonance further, practice collaborative charity, chant the Ganesha Gayatri Mantra daily, and dedicate one day a week to shared spiritual practice.");
      }
      return text + remediesList.join("\n\n");
    }

    if (questionId === "emotional") {
      if (maitriReal.points === 5 && bhakoot.points === 7) {
        return `🌟 **Exceptional Emotional Resonance:**\nYour Graha Maitram and Bhakoot koots are in perfect alignment!\n\n- **Mental Unity:** You share a natural emotional frequency. Conversing feels effortless, and you naturally respect each other's emotional space.\n- **Deep Heart-Connection:** You have an instinctive understanding of each other's moods. Frictions are quickly neutralized by shared humor and love.`;
      } else if (maitriReal.points >= 3 && bhakoot.points > 0) {
        return `💖 **Healthy Emotional Bond:**\nYour charts indicate a strong, stable, and warm mental relationship.\n\n- **Communication:** You share consistent core values. Differing opinions are resolved with maturity.\n- **Mutual Support:** You act as emotional anchors for each other, providing comfort and steady companionship during life's high and low cycles.`;
      } else {
        return `⚠️ **Emotional Growth & Patience Required:**\nYour emotional indicators suggest contrasting mental frequencies:\n\n- **Differing Viewpoints:** One partner may seek analytical space while the other thrives on intuitive emotion. Frictions can arise if you expect identical viewpoints.\n- **Remedy:** Treat communication as a conscious practice. Avoid assumptions and practice active, non-judgmental listening to bridge any emotional gaps.`;
      }
    }

    if (questionId === "intimacy") {
      if (yoni.points === 4) {
        return `🔥 **Intense Intimate & Physical Chemistry:**\nYour Yoni compatibility is rated a perfect 4/4!\n\n- **Deep Physical Bond:** There is natural, intense attraction and magnetic physical resonance between your stars.\n- **Instinctive Safety:** You share a strong sense of comfort, passion, and safety in each other's physical presence, laying a solid foundation for sensual harmony.`;
      } else if (yoni.points >= 2) {
        return `💕 **Warm & Stable Chemistry:**\nYour Yoni score of ${yoni.points}/4 indicates a highly compatible, affectionate physical relationship.\n\n- **Steady Passion:** Attraction is strong and nurtured by emotional closeness.\n- **Harmony:** You have highly compatible intimate desires that grow stronger as emotional trust and vulnerability deepen over time.`;
      } else {
        return `🌱 **Gentle Intimacy Development Needed:**\nYour Yoni score of ${yoni.points}/4 suggests contrasting sub-energies:\n\n- **Pacing Differences:** You may have different emotional tempos for intimacy.\n- **Harmony Path:** Do not rush. Physical attraction is best cultivated by building deep, non-physical emotional safety, mutual massage, and active open communication.`;
      }
    }

    if (questionId === "temperament") {
      if (gana.points === 6) {
        return `✨ **Flawless Behavioral Synergy:**\nYour Gana Koot is in perfect alignment (6/6 points)!\n\n- **Shared Behavior:** Both partners belong to the same Gana category, indicating identical behavioral and lifestyle frequencies.\n- **Harmony:** You share a similar attitude towards daily living, social interactions, and spiritual goals.`;
      } else if (gana.points >= 4) {
        return `🤝 **Balanced Behavioral Resonance:**\nYour Gana score shows high compatibility.\n\n- **Complementary Qualities:** Your temperaments complement rather than clash. One partner's fiery or energetic approach is beautifully balanced by the other's calm, patient attitude.`;
      } else {
        return `⚡ **Temperament Differences & Active Harmony:**\nYour Gana points indicate contrasting nature archetypes (e.g. Deva vs Rakshasa or Manushya vs Rakshasa):\n\n- **Contrasting Styles:** One partner may be highly sensitive or idealistic, while the other is intensely direct, assertive, and pragmatic. Clashes can arise during times of high stress.\n- **Advice:** View these differences as a strength. Balance directness with gentleness. Practice active cooling-off periods during arguments.`;
      }
    }

    if (questionId === "health") {
      let responseText = "";
      if (nadi.points === 8) {
        responseText += "✅ **Stellar Genetic & Progeny Harmony (8/8 Nadi points):**\nNo Nadi Dosha exists in your matchup. You share highly balanced elemental constitutions (Vata, Pitta, Kapha), ensuring strong health, mutual longevity, and beautiful coordinates for healthy progeny.\n\n";
      } else {
        responseText += "⚠️ **Nadi Dosha Mismatch (0/8 Nadi points):**\nYou share the same basic astrological constitution (Nadi). Vedic astrology warns of potential imbalances in physical energy, hereditary elements, or planning children.\n\n";
      }

      if (bhakoot.points === 7) {
        responseText += "✅ **Flawless Family Prosperity (7/7 Bhakoot points):**\nNo Bhakoot Dosha exists. Your mutual planetary houses indicate joy, longevity of relationship, and prosperity for the lineage.";
      } else {
        responseText += "⚠️ **Bhakoot Dosha Friction (0/7 Bhakoot points):**\nBhakoot Dosha is present, indicating possible differences regarding domestic planning or family adjustments. Chanting daily and setting shared goals together neutralizes this friction.";
      }
      return responseText;
    }

    if (questionId === "career") {
      if (totalScore >= 25) {
        return `📈 **Excellent Shared Success Coordinates:**\nYour compatibility score of ${totalScore}/36 indicates highly synergistic wealth and success coordinates.\n\n- **Linage Prosperity:** Your planetary configurations support joint financial investments, long-term property acquisitions, and stable professional growth.\n- **Support:** You serve as mutual muses, inspiring focus and ambition in each other's career journeys.`;
      } else if (totalScore >= 18) {
        return `💰 **Steady & Favorable Material Growth:**\nYour charts represent stable career and financial coordinates.\n\n- **Growth:** Wealth increases steadily through consistent hard work and collaborative planning.\n- **Advice:** Maintain independent savings accounts alongside joint budgets. Mutual respect in money matters keeps your wealth path smooth and positive.`;
      } else {
        return `💼 **Conscious Financial Management Recommended:**\n\n- **Separate Goals:** To avoid any friction, it is highly recommended to maintain independent financial domains.\n- **Remedy:** Do not let business or career stresses bleed into your personal connection. Collaborate on secure, low-risk long-term investments rather than speculative ventures.`;
      }
    }

    return "The stars are in transition. Let us consult the Oracle again.";
  };

  // Send message to AI Chatbot
  const handleSendMessage = async (text) => {
    if (!text.trim() || isThinking) return;

    if (!chatStarted) setChatStarted(true);
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    setIsThinking(true);

    if (!astrologyUserId) {
      return new Promise((resolve) => {
        setTimeout(() => {
          let questionId = "remedies";
          const query = text.toLowerCase();
          if (query.includes("remedy") || query.includes("solve") || query.includes("fix")) questionId = "remedies";
          else if (query.includes("emotional") || query.includes("mental") || query.includes("mind") || query.includes("bond")) questionId = "emotional";
          else if (query.includes("intimate") || query.includes("physical") || query.includes("sex") || query.includes("passion") || query.includes("yoni")) questionId = "intimacy";
          else if (query.includes("temperament") || query.includes("behavior") || query.includes("personality") || query.includes("gana")) questionId = "temperament";
          else if (query.includes("nadi") || query.includes("bhakoot") || query.includes("dosha") || query.includes("health")) questionId = "health";
          else if (query.includes("career") || query.includes("wealth") || query.includes("money") || query.includes("success")) questionId = "career";
          
          const staticText = getStaticResponse(questionId);
          setChatMessages((prev) => [...prev, { role: "ai", text: staticText }]);
          setIsThinking(false);
          resolve();
        }, 800);
      });
    }

    // Build context-rich prompt
    const compatibilityContext = `
[MATChMAKING REPORT CONTEXT]
Partner 1 (Male/First): ${name1}
- Moon Sign: ${gunaMilan?.male_moon_sign || astroDetails?.male?.moon_sign || "Unknown"}
- Nakshatra: ${gunaMilan?.male_nakshatra || astroDetails?.male?.nakshatra || "Unknown"} (Pada ${astroDetails?.male?.nakshatra_pada || "?"})
- Ascendant: ${astroDetails?.male?.ascendant || "Unknown"}
Partner 2 (Female/Second): ${name2}
- Moon Sign: ${gunaMilan?.female_moon_sign || astroDetails?.female?.moon_sign || "Unknown"}
- Nakshatra: ${gunaMilan?.female_nakshatra || astroDetails?.female?.nakshatra || "Unknown"} (Pada ${astroDetails?.female?.nakshatra_pada || "?"})
- Ascendant: ${astroDetails?.female?.ascendant || "Unknown"}
Guna Milan Score: ${totalScore} out of 36 points (${compatibilityLevel} Compatibility).
Koot Breakdown:
${(gunaMilan?.koots || []).map(k => `- ${k.name}: ${k.points}/${k.max} (${k.description})`).join("\n")}
Manglik Dosha Status:
- Male has Manglik Dosha: ${gunaMilan?.mangal_dosh?.male ? "Yes" : "No"}
- Female has Manglik Dosha: ${gunaMilan?.mangal_dosh?.female ? "Yes" : "No"}
- Status Notes: ${gunaMilan?.mangal_dosh?.note || "Neutral"}
[END OF CONTEXT]

User Question: ${text}
`;

    try {
      const res = await kundliAPI.chatWithAI(compatibilityContext, astrologyUserId);
      const botReply = res.data?.reply || res.data?.message || res.reply || res.message;
      if (botReply) {
        setChatMessages((prev) => [...prev, { role: "ai", text: botReply }]);
      } else {
        throw new Error("No bot reply");
      }
    } catch (err) {
      console.error("AI matchmaking chat error, falling back to static response:", err);
      let questionId = "remedies";
      const query = text.toLowerCase();
      if (query.includes("remedy") || query.includes("solve") || query.includes("fix")) questionId = "remedies";
      else if (query.includes("emotional") || query.includes("mental") || query.includes("mind") || query.includes("bond")) questionId = "emotional";
      else if (query.includes("intimate") || query.includes("physical") || query.includes("sex") || query.includes("passion") || query.includes("yoni")) questionId = "intimacy";
      else if (query.includes("temperament") || query.includes("behavior") || query.includes("personality") || query.includes("gana")) questionId = "temperament";
      else if (query.includes("nadi") || query.includes("bhakoot") || query.includes("dosha") || query.includes("health")) questionId = "health";
      else if (query.includes("career") || query.includes("wealth") || query.includes("money") || query.includes("success")) questionId = "career";

      const staticText = getStaticResponse(questionId);
      setChatMessages((prev) => [...prev, { role: "ai", text: staticText }]);
    } finally {
      setIsThinking(false);
    }
  };

  const handleQuestionSelect = (question) => {
    handleSendMessage(question.text);
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <MovingGradient />

      <div className="w-full max-w-5xl mx-auto py-10 z-10 space-y-10">
        
        {/* Header Title */}
        <div className="text-center">
          <span className="px-4 py-1.5 rounded-full text-[10px] font-bold tracking-[0.25em] bg-pink-100/60 border border-pink-200/50 text-pink-600 uppercase font-mono shadow-sm">
            Astrological Affinity
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight mt-3">
            Guna Milan Compatibility Report
          </h1>
          <p className="text-sm text-gray-500 mt-2 max-w-lg mx-auto font-medium">
            A precise synthesis of mental, emotional, spiritual, and physical alignment according to the Vedic Ashtakoot system.
          </p>
        </div>

        {/* Score Summary Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Circular Score Guna */}
          <div className="bg-white/80 border border-white/30 backdrop-blur-xl rounded-[32px] p-8 shadow-xl flex flex-col items-center justify-center text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-semibold mb-4">
              Gunas Matched
            </span>
            <div className={`relative h-36 w-36 rounded-full border-4 ${scoreColorClass} flex flex-col items-center justify-center shadow-inner`}>
              <span className={`text-4xl font-extrabold ${scoreTextClass}`}>
                {totalScore}
              </span>
              <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-widest mt-0.5">
                of 36
              </span>
              {/* Decorative Pulsing Aura */}
              <div className="absolute inset-0 rounded-full animate-ping opacity-10 border border-pink-500 pointer-events-none" />
            </div>
            <div className="mt-4">
              <span className={`px-4 py-1.5 text-xs font-bold rounded-full border uppercase tracking-wider ${
                totalScore >= 25 ? "bg-emerald-50 border-emerald-200 text-emerald-600" :
                totalScore >= 18 ? "bg-amber-50 border-amber-200 text-amber-600" :
                "bg-red-50 border-red-200 text-[#FF4D67]"
              }`}>
                {compatibilityLevel} Compatibility
              </span>
            </div>
          </div>

          {/* Quick AI Summary */}
          <div className="bg-white/80 border border-white/30 backdrop-blur-xl rounded-[32px] p-8 shadow-xl flex flex-col justify-between md:col-span-2">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">✨</span>
                  <h3 className="text-base font-semibold text-gray-900 font-mono">
                    Affinity Resonance
                  </h3>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-pink-50 border border-pink-100 rounded-full px-3 py-1">
                  <Heart className="h-3 w-3 text-pink-500 fill-pink-500" />
                  <span>{name1} & {name2}</span>
                </div>
              </div>
              <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent w-full mb-4" />
              <p className="text-sm leading-relaxed text-gray-600 font-mono">
                {totalScore >= 25 ? (
                  `Excellent celestial alignment! With a Guna Milan score of ${totalScore} out of 36, your horoscopes represent highly complementary energetic flows. There is outstanding mental cohesion, strong underlying friendship, and stellar long-term harmony. Minor differences can be effortlessly navigated.`
                ) : totalScore >= 18 ? (
                  `A promising, balanced relationship. Your Guna Milan score of ${totalScore} out of 36 meets the classical Vedic thresholds. You enjoy solid common values and functional compatibility. The stars support a nurturing relationship, provided you communicate mindfully to navigate minor temperament differences.`
                ) : (
                  `A complex karmic matchup. With a Guna Milan score of ${totalScore} out of 36, the stars suggest that you are drawing close to teach and refine each other. You may encounter contrasting mental viewpoints, communication blocks, or doshas. Vedic remedies (poojas, mantras, charity) are highly recommended to balance the planetary frictions.`
                )}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[11px] text-pink-600 font-bold uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Vedic Astrological Matchmaking System</span>
            </div>
          </div>

        </div>

        {/* Individual Birth Star Comparisons */}
        <div className="bg-white/80 border border-white/30 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-6">
            <ArrowRightLeft className="h-5 w-5 text-pink-500" />
            <h3 className="text-base font-semibold text-gray-900 font-mono">
              Birth Star & Zodiac Alignment
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
            
            {/* Divider line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-[1px] bg-gray-100 -translate-x-1/2" />

            {/* Partner 1 Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-blue-600 font-bold">
                <span className="h-2 w-2 rounded-full bg-blue-500" />
                <h4 className="text-sm font-mono uppercase tracking-wider">{name1} Details</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-semibold block">Moon Sign (Rashi)</span>
                  <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">
                    {gunaMilan?.male_moon_sign || astroDetails?.male?.moon_sign || "Loading..."}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-semibold block">Nakshatra (Pada)</span>
                  <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">
                    {gunaMilan?.male_nakshatra || astroDetails?.male?.nakshatra || "Loading..."} 
                    {astroDetails?.male?.nakshatra_pada ? ` (Pada ${astroDetails.male.nakshatra_pada})` : ""}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-semibold block">Ascendant (Lagna)</span>
                  <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">
                    {astroDetails?.male?.ascendant || "Unknown"}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-semibold block">Ascendant Lord</span>
                  <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">
                    {astroDetails?.male?.ascendant_lord || "Unknown"}
                  </span>
                </div>
              </div>
            </div>

            {/* Partner 2 Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-pink-600 font-bold">
                <span className="h-2 w-2 rounded-full bg-pink-500" />
                <h4 className="text-sm font-mono uppercase tracking-wider">{name2} Details</h4>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-semibold block">Moon Sign (Rashi)</span>
                  <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">
                    {gunaMilan?.female_moon_sign || astroDetails?.female?.moon_sign || "Loading..."}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-semibold block">Nakshatra (Pada)</span>
                  <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">
                    {gunaMilan?.female_nakshatra || astroDetails?.female?.nakshatra || "Loading..."}
                    {astroDetails?.female?.nakshatra_pada ? ` (Pada ${astroDetails.female.nakshatra_pada})` : ""}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-semibold block">Ascendant (Lagna)</span>
                  <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">
                    {astroDetails?.female?.ascendant || "Unknown"}
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-gray-100">
                  <span className="text-[10px] text-gray-400 font-semibold block">Ascendant Lord</span>
                  <span className="text-sm font-bold text-gray-800 font-mono mt-0.5 block">
                    {astroDetails?.female?.ascendant_lord || "Unknown"}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Manglik Dosha Verification Panel */}
        {gunaMilan?.mangal_dosh && (
          <div className="bg-white/80 border border-white/30 backdrop-blur-xl rounded-[32px] p-8 shadow-xl">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4 mb-5">
              <ShieldAlert className="h-5 w-5 text-red-500" />
              <h3 className="text-base font-semibold text-gray-900 font-mono">
                Manglik Dosha Affliction Status
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Partner 1 Status */}
              <div className={`p-5 rounded-2xl border text-center ${
                gunaMilan.mangal_dosh.male ? "bg-red-50/40 border-red-100 text-[#FF4D67]" : "bg-emerald-50/40 border-emerald-100 text-emerald-600"
              }`}>
                <span className="text-2xl mb-1.5 block">
                  {gunaMilan.mangal_dosh.male ? "🔥" : "✨"}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  {name1} Status
                </span>
                <span className="text-sm font-extrabold font-mono mt-1 block">
                  {gunaMilan.mangal_dosh.male ? "Manglik" : "Non-Manglik"}
                </span>
              </div>

              {/* Partner 2 Status */}
              <div className={`p-5 rounded-2xl border text-center ${
                gunaMilan.mangal_dosh.female ? "bg-red-50/40 border-red-100 text-[#FF4D67]" : "bg-emerald-50/40 border-emerald-100 text-emerald-600"
              }`}>
                <span className="text-2xl mb-1.5 block">
                  {gunaMilan.mangal_dosh.female ? "🔥" : "✨"}
                </span>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  {name2} Status
                </span>
                <span className="text-sm font-extrabold font-mono mt-1 block">
                  {gunaMilan.mangal_dosh.female ? "Manglik" : "Non-Manglik"}
                </span>
              </div>

              {/* Aggregation Verdict */}
              <div className="p-5 rounded-2xl bg-white border border-gray-100 flex flex-col justify-center h-full">
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
                  Overall Verdict
                </span>
                <p className="text-xs text-gray-600 mt-2 font-mono leading-relaxed">
                  {gunaMilan.mangal_dosh.male && gunaMilan.mangal_dosh.female ? (
                    "🎉 Cancelled! Both partners are Manglik. This dual alignment fully neutralizes the planetary friction, ensuring long-term domestic peace!"
                  ) : !gunaMilan.mangal_dosh.male && !gunaMilan.mangal_dosh.female ? (
                    "✅ Perfect Harmony! Neither partner is Manglik. Your charts share smooth, unobstructed domestic energy."
                  ) : (
                    `⚠️ Frictional! ${gunaMilan.mangal_dosh.note || "One partner is Manglik. We recommend performing remedies or consulting an astrologer before marriage."}`
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic 8 Koots Table */}
        <MatchTable rows={mappedRows} />

        {/* Celestial AI Compatibility Chatbot */}
        <div className="bg-gradient-to-tr from-pink-50/40 via-white to-purple-50/40 border border-white/40 backdrop-blur-xl rounded-[32px] p-8 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-5">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-pink-600 font-mono">
                Relationship Guide
              </span>
              <h3 className="text-xl font-bold text-gray-900 font-mono mt-1">
                💬 Ask the Relationship AI Astrologer
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                Enter your question below or click any of the suggested compatibility topics to get instant readings.
              </p>
            </div>
            <div className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" title="Ready to assist" />
          </div>

          <div className="space-y-6">
            {/* Question Selector Panel */}
            <div className="space-y-2">
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider font-mono block">
                Suggested Compatibility Topics:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {preSeedQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionSelect(q)}
                    disabled={isThinking}
                    className="text-left p-3.5 rounded-xl border border-pink-100 bg-white text-[11px] font-mono hover:border-pink-300 hover:bg-pink-50/10 transition-all leading-relaxed shadow-sm hover:shadow flex items-start gap-2 text-gray-700 disabled:opacity-50 disabled:pointer-events-none hover:scale-[1.01]"
                  >
                    <Star className="h-3 w-3 text-pink-500 fill-pink-500 shrink-0 mt-0.5" />
                    <span className="font-semibold">{q.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Messages Log */}
            {chatStarted && (
              <div className="h-[320px] overflow-y-auto border border-gray-100 rounded-2xl bg-white/40 p-4 space-y-4 scrollbar-thin">
                <AnimatePresence initial={false}>
                  {chatMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25 }}
                      className={`w-fit max-w-[90%] px-4 py-3 rounded-2xl text-[12px] leading-relaxed font-mono shadow-sm whitespace-pre-line ${
                        msg.role === "user"
                          ? "ml-auto bg-purple-100 text-purple-700 rounded-br-sm border border-purple-200/50"
                          : "mr-auto bg-white border border-gray-100 text-gray-800 rounded-bl-sm"
                      }`}
                    >
                      {msg.text}
                    </motion.div>
                  ))}
                  {isThinking && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mr-auto bg-white border border-gray-100 text-gray-400 px-4 py-3 rounded-2xl rounded-bl-sm text-xs flex items-center gap-1.5 shadow-sm font-mono"
                    >
                      <span>Analyzing compatibility alignment</span>
                      <span className="flex gap-0.5">
                        <span className="h-1 w-1 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="h-1 w-1 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="h-1 w-1 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
                <div ref={chatEndRef} />
              </div>
            )}

            {/* AIChatBox Prompter - Same as in Kundli Generator page */}
            <div className="pt-2 border-t border-gray-100/50">
              <AIChatBox 
                onSend={handleSendMessage} 
                placeholder="Ask about remedies, doshas, emotional intimacy, or financial growth..." 
                disabled={isThinking} 
              />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
