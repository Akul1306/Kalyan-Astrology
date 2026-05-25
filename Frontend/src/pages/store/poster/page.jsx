"use client";
import { useEffect } from "react";
import TestimonialSlider from "@/components/store/Poster/TestimonialSlider";
import PosterHero from "@/components/store/Poster/posterhero";
import PosterGrid from "@/components/store/Poster/postercard";
import Trailback from "@/components/store/Poster/Trailback";
import BentoGrid from "@/components/ui/bits/MagicBento";
import Image from "next/image";
export default function PosterPage() {
    useEffect(() => {
        document.title = "Posters | Kalyan Store - Spiritual & Astrological Posters";
    }, []);
    const myItems = [
        { id: "a", title: "Cosmic Mandala Collection", link: "/store/poster/Product?id=1", imageUrl: "/Poster/Bento/1.webp" },
        { id: "b", title: "Vedic Astrology Charts", link: "/store/poster/Product?id=2", imageUrl: "/Poster/Bento/2.webp" },
        { id: "c", title: "Planetary Alignment", link: "/store/poster/Product?id=3", imageUrl: "/Poster/Bento/3.webp" },
        { id: "d", title: "Sacred Geometry", link: "/store/poster/Product?id=4", imageUrl: "/Poster/Bento/4.webp" },
        { id: "e", title: "Zodiac Constellations", link: "/store/poster/Product?id=5", imageUrl: "/Poster/Bento/5.webp" },
        { id: "f", title: "Spiritual Symbols", link: "/store/poster/Product?id=6", imageUrl: "/Poster/Bento/6.webp" },
        { id: "g", title: "Mantra Art Collection", link: "/store/poster/Product?id=7", imageUrl: "/Poster/Bento/7.webp" },
        { id: "h", title: "Chakra Energy Maps", link: "/store/poster/Product?id=8", imageUrl: "/Poster/Bento/8.webp" },
    ];
    const Collection_Poster = [
        {
            id: 1,
            title: "Cosmic Mandala - Golden Edition",
            category: "Spiritual Art",
            price: 299,
            oldPrice: 499,
            images: [
                "/Poster/Posters/pos1.webp",
                "/Poster/Posters/pos2.webp",
                "/Poster/Posters/pos3.webp",
            ],
        },
        {
            id: 2,
            title: "Vedic Astrology Birth Chart",
            category: "Astrological Charts",
            price: 349,
            oldPrice: 599,
            images: [
                "/Poster/Posters/pos2.webp",
                "/Poster/Posters/pos3.webp",
                "/Poster/Posters/pos4.webp",
            ],
        },
        {
            id: 3,
            title: "Planetary Alignment Map",
            category: "Astronomy Art",
            price: 279,
            oldPrice: 449,
            images: [
                "/Poster/Posters/pos3.webp",
                "/Poster/Posters/pos4.webp",
                "/Poster/Posters/pos5.webp",
            ],
        },
        {
            id: 4,
            title: "Sacred Geometry Patterns",
            category: "Geometric Art",
            price: 249,
            oldPrice: 399,
            images: [
                "/Poster/Posters/pos4.webp",
                "/Poster/Posters/pos5.webp",
                "/Poster/Posters/pos6.webp",
            ],
        },
        {
            id: 5,
            title: "Zodiac Constellation Series",
            category: "Zodiac Art",
            price: 329,
            oldPrice: 549,
            images: [
                "/Poster/Posters/pos5.webp",
                "/Poster/Posters/pos6.webp",
                "/Poster/Posters/pos5.webp",
            ],
        },
        {
            id: 6,
            title: "Spiritual Symbols Collection",
            category: "Sacred Symbols",
            price: 269,
            oldPrice: 429,
            images: [
                "/Poster/Posters/pos6.webp",
                "/Poster/Posters/pos5.webp",
                "/Poster/Posters/pos5.webp",
            ],
        },
        {
            id: 7,
            title: "Mantra Art - Om Collection",
            category: "Mantra Art",
            price: 289,
            oldPrice: 479,
            images: [
                "/Poster/Posters/pos5.webp",
                "/Poster/Posters/pos5.webp",
                "/Poster/Posters/pos1.webp",
            ],
        },
        {
            id: 8,
            title: "Chakra Energy Flow Map",
            category: "Chakra Art",
            price: 319,
            oldPrice: 529,
            images: [
                "/Poster/Posters/pos5.webp",
                "/Poster/Posters/pos1.webp",
                "/Poster/Posters/pos2.webp",
            ],
        },
    ];
    const Single_Poster = [
        {
            id: 9,
            title: "Minimalist Astrology Chart",
            category: "Modern Astrology",
            price: 199,
            oldPrice: 349,
            images: [
                "/Poster/Posters/pos1.webp",
                "/Poster/Posters/pos2.webp",
            ],
        },
        {
            id: 10,
            title: "Classic Vedic Calendar",
            category: "Traditional Art",
            price: 229,
            oldPrice: 379,
            images: [
                "/Poster/Posters/pos2.webp",
                "/Poster/Posters/pos3.webp",
            ],
        },
        {
            id: 11,
            title: "Nakshatra Star Map",
            category: "Star Maps",
            price: 259,
            oldPrice: 419,
            images: [
                "/Poster/Posters/pos3.webp",
                "/Poster/Posters/pos4.webp",
            ],
        },
        {
            id: 12,
            title: "Yantra Geometric Design",
            category: "Yantra Art",
            price: 239,
            oldPrice: 389,
            images: [
                "/Poster/Posters/pos4.webp",
                "/Poster/Posters/pos5.webp",
            ],
        },
    ];
    return (<>
      <PosterHero posters={["/Poster/Posters/pos1.webp", "/Poster/Posters/pos2.webp", "/Poster/Posters/pos3.webp", "/Poster/Posters/pos4.webp", "/Poster/Posters/pos5.webp", "/Poster/Posters/pos6.webp"]} marqueeText="Posters"/>
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">Collection Posters</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Premium spiritual and astrological posters perfect for meditation spaces, study rooms, and spiritual altars.
          </p>
          <PosterGrid posters={Collection_Poster}/>
        </div>
      </div>

    <div className="w-full flex justify-center">
  <Image src="/Poster/Bento/Banner.png" alt="Accessories" width={2000} // big enough to remain HD
     height={700} // EXACT height you want
     priority className="max-h-[700px] w-auto object-cover"/>
    </div>
     
      <div className="w-full flex justify-center">
        <TestimonialSlider videos={[
            "/Poster/Testimonials/testimonial1.mp4",
            "/Poster/Testimonials/testimonial2.mp4",
            "/Poster/Testimonials/testimonial3.mp4",
            "/Poster/Testimonials/testimonial4.mp4",
        ]} speed={60} videoWidth={280} videoHeight={480}/>
      </div>

      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gray-900">Single Posters</h1>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Individual posters featuring detailed astrological charts and spiritual artwork.
          </p>
          <PosterGrid posters={Single_Poster}/>
        </div>
      </div>

      <BentoGrid items={myItems}/> 

      <Trailback />
    </>);
}
