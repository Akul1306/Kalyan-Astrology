"use client";
import ProductCarousel from "@/components/store/ProductCarousel";
import Confused from "@/components/store/confused";
import GemsDetail from "@/components/store/Gems/GemsDetail";
import Features from "@/components/store/Gems/FeatureItem";
import { Badge, ShieldCheck, Truck, Sparkles, MapPin, Smile } from "lucide-react";
import RelatedProducts from "@/components/store/RelatedProduct";
import PerfumeBuy from "@/components/store/Perfume/PerfumeBuy";
export default function ProductPage() {
    const media = [
        { kind: "image", src: "/rings/nomi-1.webp", alt: "Nomi bridal set angle" },
        { kind: "video", src: "/rings/nomi-360.mp4", poster: "/rings/nomi-1.webp" },
        { kind: "image", src: "/rings/nomi-hand.webp", alt: "On-hand view" },
        { kind: "image", src: "/rings/nomi-close.webp", alt: "Close up" },
    ];
    const specs = [
        { label: "Color", value: "Royal Blue" },
        { label: "Weight/Size", value: "3.25 Carat" },
        { label: "Cut", value: "Oval Brilliant" },
        { label: "Origin", value: "Sri Lanka (Ceylon)" },
        { label: "Certification", value: "IGI Certified" },
    ];
    const description = (<>
      Exquisite natural blue sapphire from Sri Lanka — untreated and ethically sourced.
      Ideal for everyday wear and astrological use.
    </>);
    const benefits = (<>
      Brings clarity, focus and career growth. Wear on a Wednesday or Saturday as advised by your astrologer.
    </>);
    const badges = ["Good Fortune", "Wealth", "Energized", "Certified Natural"];
    const base = [
        { id: 1, title: "25 Years of Trust", subtitle: "100% Purity Guaranteed", icon: <ShieldCheck /> },
        { id: 2, title: "Worldwide Shipping", subtitle: "Free Delivery In India", icon: <Truck /> },
        { id: 3, title: "Certified Natural", subtitle: "Unheated & Untreated", icon: <Badge /> },
        { id: 4, title: "Energized & Activated", subtitle: "For Astrological Results", icon: <Sparkles /> },
        { id: 5, title: "Direct From Mines", subtitle: "Ethically Sourced", icon: <MapPin /> },
        { id: 6, title: "Happy & Satisfied", subtitle: "100,000+ Customers", icon: <Smile /> },
    ];
    const relatedProducts = [
        { id: "1", title: "Yellow Sapphire", image: "/Gems/Yellow-Sapphire.webp", price: 106434 },
        { id: "2", title: "Red Coral", image: "/Gems/Red-Coral.webp", price: 106434 },
        { id: "3", title: "Pearl", image: "/Gems/Pearl.webp", price: 106434 },
        { id: "4", title: "Hessonite", image: "/Gems/Hessonite.webp", price: 106434 },
        { id: "5", title: "Cats Eye", image: "/Gems/Cats-Eye.webp", price: 106434 },
        { id: "6", title: "Blue Sapphire", image: "/Gems/Blue-Sapphire.webp", price: 106434 },
        { id: "7", title: "Ruby", image: "/Gems/Ruby.webp", price: 106434 },
        { id: "8", title: "White Sapphire", image: "/Gems/White-Sapphire.webp", price: 106434 },
        { id: "9", title: "Green Emerald", image: "/Gems/Green-Emerald.webp", price: 106434 },
    ];
    return (<main className="mx-auto max-w-6xl px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        <ProductCarousel items={media} aspect={1}/>

        <PerfumeBuy title="The Nomi Bridal Ring Set" sku="PF-NOMI-18Y-DS" sizeOptions={[
            { label: "30ml", value: "30ml" },
            { label: "50ml", value: "50ml" },
            { label: "100ml", value: "100ml" },
        ]} price={{ mrp: 112900, sale: 106434 }} fragranceNotes="Woody, Floral, Musky" longevity="8-10 hours" hallmarks={["Authentic & Sealed", "Free Express Delivery", "30-Day Return Policy"]}/>
      </div>

      <GemsDetail specs={specs} description={description} benefits={benefits} badges={badges}/>
      <Confused title="The Nomi Bridal Ring Set" subtitle="The Nomi Bridal Ring Set is a beautiful set of rings that are perfect for a wedding." imageSrc="/rings/nomi-1.webp" ctaText="Buy Now"/>
    <Features items={base} columns={6} accentColor="#B77634"/> 

    <RelatedProducts title="Related Products" products={relatedProducts}/>
      {/* Basic product schema for SEO */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
                "@context": "https://schema.org/",
                "@type": "Product",
                name: "The Nomi Bridal Ring Set",
                sku: "RG-NOMI-18Y-DS",
                image: ["/rings/nomi-1.webp"],
                brand: { "@type": "Brand", name: "Your Brand" },
                offers: {
                    "@type": "Offer",
                    priceCurrency: "INR",
                    price: 106434,
                    availability: "https://schema.org/InStock",
                },
            }),
        }}/>
    </main>);
}
