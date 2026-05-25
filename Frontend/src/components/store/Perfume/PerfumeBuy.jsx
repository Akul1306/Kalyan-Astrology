"use client";
import { useEffect, useMemo, useState } from "react";
import { Heart, Share2, Truck, ShieldCheck, RefreshCcw } from "lucide-react";
export default function PerfumeBuy({ title, sku, price, sizeOptions, fragranceNotes, longevity, hallmarks = [
    "Authentic & Sealed",
    "Free Express Delivery",
    "30-Day Return Policy",
], onAddToCart, onBuyNow, }) {
    const [size, setSize] = useState(sizeOptions[0]?.value || "");
    const [pincode, setPincode] = useState("");
    const [eta, setEta] = useState(null);
    const sale = price.sale ?? price.mrp;
    // Fake ETA calculation
    useEffect(() => {
        if (pincode.length === 6) {
            const days = 2 + (parseInt(pincode[pincode.length - 1]) % 3);
            setEta(`${days}-${days + 2} days`);
        }
        else
            setEta(null);
    }, [pincode]);
    const discount = useMemo(() => {
        if (!price.sale || price.sale >= price.mrp)
            return 0;
        return Math.round(((price.mrp - price.sale) / price.mrp) * 100);
    }, [price]);
    const payload = { title, sku, size, price: sale };
    return (<aside className="w-full rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm">
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-semibold leading-snug text-neutral-900">
        {title}
      </h1>

      {/* Price */}
      <div className="mt-3 flex items-end gap-3">
        <div className="text-2xl md:text-3xl font-bold text-neutral-900">
          ₹{sale.toLocaleString("en-IN")}
        </div>
        {price.sale && (<div className="text-sm text-neutral-500 line-through">
            ₹{price.mrp.toLocaleString("en-IN")}
          </div>)}
        {discount > 0 && (<span className="rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700">
            {discount}% OFF
          </span>)}
      </div>

      {/* Fragrance Info */}
      <div className="mt-3 space-y-1 text-sm text-neutral-700">
        {fragranceNotes && (<div>
            <span className="font-medium">Notes:</span> {fragranceNotes}
          </div>)}
        {longevity && (<div>
            <span className="font-medium">Longevity:</span> {longevity}
          </div>)}
        <div>
          <span className="font-medium">SKU:</span> {sku}
        </div>
      </div>

      {/* Pincode Check */}
      <div className="mt-5 flex items-center gap-2">
        <input placeholder="Enter pincode" inputMode="numeric" maxLength={6} className="h-10 w-40 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-600" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}/>
        <button className="h-10 rounded-md border border-neutral-200 px-3 text-sm hover:bg-neutral-50">
          Check
        </button>
        <span className="text-sm text-neutral-600">
          {eta ? `Delivery in ${eta}` : "Check delivery time"}
        </span>
      </div>

      {/* Size Selector */}
      <div className="mt-5">
        <label className="block text-xs text-neutral-600 mb-1">Size</label>
        <select title="Size" value={size} onChange={(e) => setSize(e.target.value)} className="h-10 w-full rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-600">
          {sizeOptions.map((o) => (<option key={o.value} value={o.value}>
              {o.label}
            </option>))}
        </select>
      </div>

      {/* CTA Buttons */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="h-11 rounded-md bg-black text-white text-sm font-medium hover:opacity-90 transition" onClick={() => onBuyNow?.(payload)}>
          BUY NOW
        </button>
        <button className="h-11 rounded-md border border-neutral-300 text-sm font-medium hover:bg-neutral-50 transition" onClick={() => onAddToCart?.(payload)}>
          ADD TO CART
        </button>
      </div>

      {/* Wishlist / Share */}
      <div className="mt-4 flex gap-3 text-sm">
        <button className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 transition">
          <Heart className="h-4 w-4"/> Wishlist
        </button>
        <button className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50 transition">
          <Share2 className="h-4 w-4"/> Share
        </button>
      </div>

      {/* Trust Badges */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-lg border border-neutral-200 p-3 bg-neutral-50/30">
        {hallmarks.map((h, i) => (<div key={i} className="flex items-center justify-center gap-2 text-sm text-neutral-700">
            {i === 0 && <ShieldCheck className="h-4 w-4 text-green-600"/>}
            {i === 1 && <Truck className="h-4 w-4 text-blue-600"/>}
            {i === 2 && <RefreshCcw className="h-4 w-4 text-orange-500"/>}
            {h}
          </div>))}
      </div>

      {/* Policies */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 text-xs text-neutral-600 gap-2">
        <div>30-Day Returnable</div>
        <div>Authenticity Guaranteed</div>
        <div>Free Express Shipping</div>
      </div>
    </aside>);
}
