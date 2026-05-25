"use client";
import FloatingGems from "@/components/store/Gems/FloatingGems";
import HeroGemContact from "@/components/store/Gems/GuideGems";
import PreciousGems from "@/components/store/Gems/PreciousGems";
import SemiGems from "@/components/store/Gems/SemiGems";
import Image from "next/image";
export default function GemsPage() {
    return (<div>
    <div className="w-full h-full overflow-hidden bg-[#FFFAE6] flex justify-center items-center">
  <Image src="/Gems/Gems-Banner.jpg" alt="Gems Banner" width={1920} // UHD resolution for sharp scaling
     height={1080} // EXACT height you want
     priority quality={100} className="w-full h-full object-contain object-center" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4="/>
    </div>


        <FloatingGems />
    <PreciousGems />
    <HeroGemContact imageSrc="/Gems/Gems-confused.webp" title="Confused About Which Gem to Choose?" subtitle="Not sure which gemstone to choose? Contact us for personalized recommendations." ctaText="Contact Us" ctaHref="/contact" height="h-[40vh]"/>
    <SemiGems />
    </div>);
}
