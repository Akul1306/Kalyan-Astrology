import React from "react";
import { PerfumeCard } from "./PerfumeCard";
/** Your 8 products */
const perfumes = [
    {
        id: 1,
        name: "Aries",
        price: 15.0,
        images: ["/Perfume/Zodiac/aries1.webp", "/Perfume/Zodiac/aries.webp"],
    },
    {
        id: 2,
        name: "Taurus",
        price: 18.0,
        images: ["/Perfume/Zodiac/taurus1.webp", "/Perfume/Zodiac/taurus.webp"],
    },
    {
        id: 3,
        name: "Gemini",
        price: 17.0,
        images: ["/Perfume/Zodiac/gemini1.webp", "/Perfume/Zodiac/gemini.webp"],
    },
    {
        id: 4,
        name: "Cancer",
        price: 19.0,
        images: ["/Perfume/Zodiac/cancer1.webp", "/Perfume/Zodiac/cancer.webp"],
    },
    {
        id: 5,
        name: "Leo",
        price: 20.0,
        images: ["/Perfume/Zodiac/leo1.webp", "/Perfume/Zodiac/leo.webp"],
    },
    {
        id: 6,
        name: "Virgo",
        price: 18.0,
        images: ["/Perfume/Zodiac/virgo1.webp", "/Perfume/Zodiac/virgo.webp"],
    },
    {
        id: 7,
        name: "Libra",
        price: 19.0,
        images: ["/Perfume/Zodiac/libra1.webp", "/Perfume/Zodiac/libra.webp"],
    },
    {
        id: 8,
        name: "Scorpio",
        price: 21.0,
        images: ["/Perfume/Zodiac/scorpio1.webp", "/Perfume/Zodiac/scorpio.webp"],
    },
    {
        id: 9,
        name: "Sagittarius",
        price: 20.0,
        images: ["/Perfume/Zodiac/sagittarius1.webp", "/Perfume/Zodiac/sagittarius.webp"],
    },
    {
        id: 10,
        name: "Capricorn",
        price: 22.0,
        images: ["/Perfume/Zodiac/capricorn1.webp", "/Perfume/Zodiac/capricorn.webp"],
    },
    {
        id: 11,
        name: "Aquarius",
        price: 21.0,
        images: ["/Perfume/Zodiac/aquarius1.webp", "/Perfume/Zodiac/aquarius.webp"],
    },
    {
        id: 12,
        name: "Pisces",
        price: 19.0,
        images: ["/Perfume/Zodiac/pisces1.webp", "/Perfume/Zodiac/pisces.webp"],
    },
];
const PerfumeZodiacGrid = React.memo(function PerfumeZodiacGrid() {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        itemListElement: perfumes.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
                "@type": "Product",
                name: p.name,
                image: p.images,
                offers: {
                    "@type": "Offer",
                    priceCurrency: "USD",
                    price: p.price.toFixed(2),
                    availability: "https://schema.org/InStock",
                },
            },
        })),
    };
    const handleAddToCart = React.useCallback((id) => {
        // Add to cart functionality (noop in prod, logs in dev)
        if (process.env.NODE_ENV === "development") {
            console.log("add-to-cart", id);
        }
    }, []);
    const handleToggleWishlist = React.useCallback((id, wishlisted) => {
        // Toggle wishlist functionality (noop in prod, logs in dev)
        if (process.env.NODE_ENV === "development") {
            console.log("wishlist", id, wishlisted);
        }
    }, []);
    return (<section className="w-full">
      <h1 className="sr-only">Perfume Collection</h1>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}/>

      {/* full-width brutalist + glassmorphism grid */}
      <ul className="
        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
        w-full
        border-t border-gray-300
        divide-x divide-y divide-gray-300
        bg-white/25
        backdrop-blur-md
        ">
        {perfumes.map((p, idx) => (<li key={p.id} className="p-8">
            <PerfumeCard item={p} priority={idx < 4} onAddToCart={handleAddToCart} onToggleWishlist={handleToggleWishlist}/>
          </li>))}
      </ul>
    </section>);
});
export default PerfumeZodiacGrid;
