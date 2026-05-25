"use client";
import React, { memo } from "react";
import Image from "next/image";
const CustomRing = () => {
    const webps = [
        { className: "image1", src: "/Gems/b1.webp", alt: "Bottom Left Gem" },
        { className: "image2", src: "/Gems/b2.webp", alt: "Bottom Right Gem" },
        { className: "image3", src: "/Gems/c2.webp", alt: "Center Accent Gem" },
        { className: "image4", src: "/Gems/tl.webp", alt: "Top Left Gem" },
        { className: "image5", src: "/Gems/tro.webp", alt: "Top Right Outer Gem" },
        { className: "image7", src: "/Gems/tr.webp", alt: "Top Right Gem" },
        { className: "image8", src: "/Gems/bl.webp", alt: "Bottom Left Accent Gem" },
        { className: "image9", src: "/Gems/center.webp", alt: "Center Gem" },
        { className: "image11", src: "/Gems/wood.webp", alt: "Wooden Base" },
        { className: "image12", src: "/Gems/top.webp", alt: "Top Accent Gem" },
    ];
    return (<div className="container">
      {webps.map((webp, index) => (<div key={index} className={`gemImage ${webp.className}`}>
          <Image src={webp.src} alt={webp.alt} width={180} // HD intrinsic size
         height={180} quality={100} // crystal–clear HD
         loading="lazy" className="gifImg" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
                const target = e.target;
                target.src = "/Gems/center.webp";
            }}/>
        </div>))}

      <div className="textGems">
        <h1 className="font-maginia">Exquisite Gems, Craft Your Own Ring</h1>
        <h3 className="font-BKANT">Bring Elegance Home with Custom Rings</h3>
      </div>

      <style>{`
        .container {
          position: relative;
          width: 100%;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background: #fffae6;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .gemImage {
          position: absolute;
          width: 180px;
          height: 180px;
          transform: translate(-50%, -50%);
          opacity: 1;
          animation: float 6s ease-in-out infinite;
          will-change: transform;
          z-index: 100;
        }

        .gifImg {
          object-fit: contain;
          image-rendering: -webkit-optimize-contrast;
          image-rendering: crisp-edges;
          backface-visibility: hidden;
        }

        @keyframes float {
          0% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-15px) scale(1.02);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }

        /* Gem Positions */
        .image1 { top: 15%; left: 10%; }
        .image2 { top: 12%; left: 65%; }
        .image3 { top: 60%; left: 55%; }
        .image4 { top: 60%; left: 75%; }
        .image5 { top: 20%; left: 45%; }
        .image7 { top: 45%; left: 80%; }
        .image8 { top: 45%; left: 10%; }
        .image9 { top: 25%; left: 25%; }
        .image11 { top: 15%; left: 80%; }
        .image12 { top: 70%; left: 30%; }

        /* Text Section */
        .textGems {
          text-align: center;
          z-index: 10;
          color: #4a2f1c;
        }

        .textGems h1 {
          font-size: 4rem;
          color: #aa6c39;
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
          margin-bottom: 0.5rem;
        }

        .textGems h3 {
          font-size: 2rem;
          color: #7b4a2b;
          font-weight: 400;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
        }

        /* Mobile Optimized */
        @media (max-width: 768px) {
          .gemImage {
            width: 80px;
            height: 80px;
          }

          .textGems h1 {
            font-size: 2rem;
          }

          .textGems h3 {
            font-size: 1rem;
          }

          .image1 { top: 11%; left: 2%; }
          .image2 { top: 15%; left: 60%; }
          .image3 { top: 80%; left: 55%; }
          .image4 { top: 75%; left: 75%; }
          .image5 { top: 20%; left: 40%; }
          .image7 { top: 11%; left: 50%; }
          .image8 { top: 75%; left: 5%; }
          .image9 { top: 20%; left: 20%; }
          .image11 { top: 15%; left: 80%; }
          .image12 { top: 79%; left: 30%; }
        }

        @media (min-width: 768px) and (max-width: 1200px) {
          .gemImage {
            width: 8vw;
            height: 8vw;
          }
        }
      `}</style>
    </div>);
};
export default memo(CustomRing);
