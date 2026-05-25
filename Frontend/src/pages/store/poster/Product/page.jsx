"use client";
import PosterDetail from "@/components/store/Poster/PosterDetail";
import ProductCarousel from "@/components/store/ProductCarousel";
import PosterBuy from "@/components/store/Poster/PosterBuy";
import Features from "@/components/store/Gems/FeatureItem";
import RelatedProducts from "@/components/store/RelatedProduct";
import { Badge, MapPin, ShieldCheck, Smile, Truck, Sparkles, } from "lucide-react";
export default function PosterProductPage() {
    const media = [
        { kind: "image", src: "/Poster/Posters/pos1.webp", alt: "Poster 1" },
        { kind: "image", src: "/Poster/Posters/pos2.webp", alt: "Poster 2" },
        { kind: "image", src: "/Poster/Posters/pos3.webp", alt: "Poster 3" },
        { kind: "image", src: "/Poster/Posters/pos4.webp", alt: "Poster 4" },
    ];
    const base = [
        { id: 1, title: "25 Years of Trust", subtitle: "100% Purity Guaranteed", icon: <ShieldCheck /> },
        { id: 2, title: "Worldwide Shipping", subtitle: "Free Delivery in India", icon: <Truck /> },
        { id: 3, title: "Certified Quality", subtitle: "Unheated & Untreated Prints", icon: <Badge /> },
        { id: 4, title: "Energized & Activated", subtitle: "Perfect for Spiritual Spaces", icon: <Sparkles /> },
        { id: 5, title: "Ethically Sourced", subtitle: "Direct from Artists", icon: <MapPin /> },
        { id: 6, title: "Happy Customers", subtitle: "100,000+ Satisfied Buyers", icon: <Smile /> },
    ];
    const relatedProducts = [
        { id: "1", title: "Yoga Mandala Poster", image: "/Posters/Yoga-Mandala.webp", price: 699 },
        { id: "2", title: "Sri Yantra Wall Art", image: "/Posters/Sri-Yantra.webp", price: 999 },
        { id: "3", title: "Mahadev Canvas", image: "/Posters/Mahadev.webp", price: 1199 },
        { id: "4", title: "Meditation Vibes Poster", image: "/Posters/Meditation.webp", price: 599 },
    ];
    return (<main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-10 py-10 md:py-16">
      {/* Main Product Section */}
      <section className="grid gap-10 md:grid-cols-2 lg:gap-16 items-start">
        {/* Image Carousel */}
        <div className="w-full">
          <ProductCarousel items={media} aspect={4 / 5}/>
        </div>

        {/* Product Buy Section */}
        <div className="w-full">
          <PosterBuy title="Sacred Geometry Poster" sku="POSTER-001" price={{ mrp: 1199, sale: 899 }} sizes={[
            { label: "A4", value: "A4" },
            { label: "A3", value: "A3" },
            { label: "A2", value: "A2" },
            { label: "12x18", value: "12x18" },
            { label: "24x36", value: "24x36" },
        ]} paperTypes={[
            { label: "Glossy", value: "Glossy" },
            { label: "Matte", value: "Matte" },
            { label: "Textured", value: "Textured" },
        ]} frameOptions={[
            { label: "No Frame", value: "No Frame" },
            { label: "Black Frame", value: "Black Frame" },
            { label: "White Frame", value: "White Frame" },
            { label: "Wood Frame", value: "Wood Frame" },
        ]} finishOptions={[
            { label: "Laminated", value: "Laminated" },
            { label: "Non-Laminated", value: "Non-Laminated" },
        ]} onAddToCart={(p) => {
            // Add to cart functionality
            console.log("Add to cart", p);
        }} onBuyNow={(p) => {
            // Buy now functionality
            console.log("Buy now", p);
        }}/>
        </div>
      </section>

      {/* Product Details */}
      <section className="mt-16">
        <PosterDetail specs={[
            { label: "Size", value: "A3" },
            { label: "Paper Type", value: "Glossy" },
            { label: "Frame", value: "Black Frame" },
            { label: "Finish", value: "Laminated" },
        ]} description="Elevate your space with this divine sacred geometry poster — designed to harmonize energy and bring calmness to your environment. Printed on premium paper with a stunning finish, this piece embodies both artistry and spiritual depth." benefits="Perfect for meditation rooms, yoga spaces, offices, and homes seeking spiritual energy and positivity." badges={["High Quality", "Fade Resistant", "Museum Grade"]} className="max-w-screen-xl mx-auto px-4 sm:px-8 lg:px-12 py-10"/>
      </section>

      {/* Trust & Brand Features */}
      <section className="mt-10 lg:mt-16">
        <Features items={base} columns={6} accentColor="#B77634"/>
      </section>

      {/* Related Products */}
      <section className="mt-16">
        <RelatedProducts title="You Might Also Like" products={relatedProducts}/>
      </section>
    </main>);
}
