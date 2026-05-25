"use client";
import Confused from "@/components/store/confused";
import Features from "@/components/store/Gems/FeatureItem";
import ProductCarousel from "@/components/store/ProductCarousel";
import RelatedProducts from "@/components/store/RelatedProduct";
import { Badge, MapPin, ShieldCheck, Smile, Sparkles, Truck } from "lucide-react";
import AccessoriesBuy from "@/components/store/Accessories/AccessoriesBuy";
export default function AccessoriesProductPage() {
    // ✅ Feature items (OUTSIDE return)
    const base = [
        { id: 1, title: "25 Years of Trust", subtitle: "100% Purity Guaranteed", icon: <ShieldCheck size={26}/> },
        { id: 2, title: "Worldwide Shipping", subtitle: "Free Delivery In India", icon: <Truck size={26}/> },
        { id: 3, title: "Certified Natural", subtitle: "Unheated & Untreated", icon: <Badge size={26}/> },
        { id: 4, title: "Energized & Activated", subtitle: "For Astrological Results", icon: <Sparkles size={26}/> },
        { id: 5, title: "Direct From Mines", subtitle: "Ethically Sourced", icon: <MapPin size={26}/> },
        { id: 6, title: "Happy & Satisfied", subtitle: "100,000+ Customers", icon: <Smile size={26}/> },
    ];
    // ✅ Related products
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
    // ✅ final return
    return (<>
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* TOP SECTION: PRODUCT IMAGES + BUY BOX */}
        <div className="grid gap-8 md:grid-cols-2">
          <ProductCarousel items={[
            { kind: "image", src: "/Accessories/Accessories/accessories-1.webp", alt: "Accessories 1" },
            { kind: "image", src: "/Accessories/Accessories/accessories-2.webp", alt: "Accessories 2" },
            { kind: "image", src: "/Accessories/Accessories/accessories-3.webp", alt: "Accessories 3" },
            { kind: "image", src: "/Accessories/Accessories/accessories-4.webp", alt: "Accessories 4" },
            { kind: "image", src: "/Accessories/Accessories/accessories-5.webp", alt: "Accessories 5" },
            { kind: "image", src: "/Accessories/Accessories/accessories-6.webp", alt: "Accessories 6" },
        ]} aspect={1}/>

          <AccessoriesBuy title="Accessories 1" sku="ACCESSORIES-1" price={{ mrp: 100, sale: 90 }} beadSizeOptions={[
            { label: "6mm", value: "6mm" },
            { label: "8mm", value: "8mm" },
            { label: "10mm", value: "10mm" },
            { label: "12mm", value: "12mm" },
        ]} lengthOptions={[
            { label: "108", value: "108" },
            { label: "18", value: "18" },
            { label: "27", value: "27" },
        ]} energyOptions={[
            { label: "Energized", value: "Energized" },
            { label: "Non-Energized", value: "Non-Energized" },
        ]} materialOptions={[
            { label: "Wood", value: "Wood" },
            { label: "Rudraksha", value: "Rudraksha" },
            { label: "Stone", value: "Stone" },
        ]} certifications={["Govt. Certified", "Lab Report Included", "100% Authentic & Energised"]}/>
        </div>

        {/* CONFUSED SECTION */}
        <Confused title="Accessories 1" subtitle="Accessories 1 is a beautiful set of accessories that are perfect for a wedding." imageSrc="/Accessories/Accessories/accessories-1.webp" ctaText="Buy Now"/>

        {/* FEATURES */}
        <Features items={base} columns={6} accentColor="#B77634"/>

        {/* RELATED PRODUCTS */}
        <RelatedProducts title="Related Products" products={relatedProducts}/>
      </main>
    </>);
}
