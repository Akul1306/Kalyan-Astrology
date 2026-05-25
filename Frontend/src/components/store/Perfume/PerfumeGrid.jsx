import React from "react";
import { PerfumeCard } from "./PerfumeCard";
/** Your 8 products */
const perfumes = [
    { id: 1, name: "Sun", price: 15.0, images: ["/Perfume/Planets/sun.webp", "/Perfume/Bottles/saturn.png"] },
    { id: 2, name: "Moon", price: 22.0, images: ["/Perfume/Planets/moon.webp", "/Perfume/Bottles/saturn.png"] },
    { id: 3, name: "Rahu", price: 20.0, images: ["/Perfume/Planets/rahu.webp", "/Perfume/Bottles/saturn.png"] },
    { id: 4, name: "Mars", price: 16.0, images: ["/Perfume/Planets/mars.webp", "/Perfume/Bottles/saturn.png"] },
    { id: 5, name: "Mercury", price: 19.0, images: ["/Perfume/Planets/mercury.webp", "/Perfume/Bottles/saturn.png"] },
    { id: 6, name: "Jupiter", price: 25.0, images: ["/Perfume/Planets/jupiter.webp", "/Perfume/Bottles/saturn.png"] },
    { id: 7, name: "Venus", price: 18.0, images: ["/Perfume/Planets/venus.webp", "/Perfume/Bottles/saturn.png"] },
    { id: 8, name: "Saturn", price: 21.0, images: ["/Perfume/Planets/saturn.webp", "/Perfume/Bottles/saturn.png"] },
];
const PerfumeGrid = React.memo(function PerfumeGrid() {
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
export default PerfumeGrid;
