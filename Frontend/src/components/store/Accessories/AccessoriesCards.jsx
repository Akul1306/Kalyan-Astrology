"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const currency = (n) => {
    const formatted = n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `₹ ${formatted}`;
};
export default function AccessoriesCards({ accessories, className = "" }) {
    const discount = accessories.oldPrice && accessories.oldPrice > accessories.price
        ? Math.round(((accessories.oldPrice - accessories.price) / accessories.oldPrice) * 100)
        : null;
    const productHref = accessories.href ?? `/store/accessories/Product?id=${accessories.id}`;
    return (<Link href={productHref} className={`bg-white rounded-lg overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group block ${className}`}>
      {/* Image Block */}
      <div className="block relative w-full aspect-square bg-gray-50" aria-label={accessories.title}>
        <Image src={accessories.image} alt={accessories.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw"/>
      </div>

      {/* Content Block */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 leading-tight line-clamp-2 min-h-[2.5rem] mb-3">
          {accessories.title}
        </h3>

        {/* Price Section */}
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-2 flex-wrap">
            {accessories.showFrom && (<span className="text-xs text-gray-500 font-normal">From</span>)}
            <span className="text-lg font-semibold text-gray-900">
              {currency(accessories.price)}
            </span>
            {accessories.oldPrice && (<>
                <span className="text-sm text-gray-400 line-through">
                  {currency(accessories.oldPrice)}
                </span>
                {discount && (<span className="text-xs font-semibold text-white bg-gray-900 px-2 py-0.5 rounded">
                    {discount}% OFF
                  </span>)}
              </>)}
          </div>
        </div>
      </div>
    </Link>);
}
