"use client";
import { useEffect, useMemo, useState } from "react";
import { Heart, Share2 } from "lucide-react";
export default function ProductBuy({ title, sku, price, metalOptions, colorOptions, sizeOptions, diamondSpec, hallmarks = ["BIS Hallmarked", "IGI/SGL Certified", "30-Day Returns"], onAddToCart, onBuyNow, }) {
    const [metal, setMetal] = useState(metalOptions[0]?.value);
    const [color, setColor] = useState(colorOptions[0]?.value);
    const [size, setSize] = useState(sizeOptions[0]?.value);
    const [pincode, setPincode] = useState("");
    const [eta, setEta] = useState(null);
    const sale = price.sale ?? price.mrp;
    // Fake pincode ETA (replace with your API)
    useEffect(() => {
        if (pincode.length === 6) {
            const days = 3 + (parseInt(pincode[pincode.length - 1]) % 4);
            setEta(`${days}–${days + 2} days`);
        }
        else {
            setEta(null);
        }
    }, [pincode]);
    const discount = useMemo(() => {
        if (!price.sale || price.sale >= price.mrp)
            return 0;
        return Math.round(((price.mrp - price.sale) / price.mrp) * 100);
    }, [price]);
    const payload = { title, sku, metal, color, size, price: sale };
    return (<aside className="w-full rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6">
      {/* Title + price */}
      <h1 className="text-xl font-semibold leading-snug md:text-2xl">{title}</h1>

      <div className="mt-2 flex items-end gap-3">
        <div className="text-2xl font-bold md:text-3xl">₹{sale.toLocaleString("en-IN")}</div>
        {price.sale && (<div className="text-sm text-neutral-500 line-through">
            ₹{price.mrp.toLocaleString("en-IN")}
          </div>)}
        {discount > 0 && (<span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
            {discount}% OFF
          </span>)}
      </div>

      {/* Promo hint */}
      <p className="mt-2 text-sm text-neutral-600">
        Flat 5% off on preset solitaires — Use code <strong>WINTERSPARK5</strong>
      </p>

      {/* Pincode */}
      <div className="mt-4 flex items-center gap-2">
        <input placeholder="Enter pincode" inputMode="numeric" maxLength={6} className="h-10 w-40 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-500" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}/>
        <button className="h-10 rounded-md border border-neutral-200 px-3 text-sm hover:bg-neutral-50" onClick={() => null}>
          Check
        </button>
        <span className="text-sm text-neutral-600">
          {eta ? `Delivery in ${eta}` : "Provide pincode for delivery ETA"}
        </span>
      </div>

      {/* Specs */}
      <div className="mt-4 border-t border-neutral-200 pt-4 text-sm">
        <div className="text-neutral-800">
          <span className="font-medium">SKU:</span> {sku}
        </div>
        {diamondSpec && (<div className="text-neutral-800">
            <span className="font-medium">Diamonds:</span> {diamondSpec}
          </div>)}
      </div>

      {/* Options */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Selector label="Metal Purity" value={metal} onChange={setMetal} options={metalOptions}/>
        <Selector label="Color" value={color} onChange={setColor} options={colorOptions}/>
        <Selector label="Size" value={size} onChange={setSize} options={sizeOptions}/>
      </div>

      {/* CTA */}
      <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button className="h-11 rounded-md bg-neutral-900 text-white hover:opacity-90" onClick={() => onBuyNow?.(payload)}>
          BUY NOW
        </button>
        <button className="h-11 rounded-md border border-neutral-300 hover:bg-neutral-50" onClick={() => onAddToCart?.(payload)}>
          ADD TO CART
        </button>
        <button className="h-11 rounded-md border border-neutral-300 hover:bg-neutral-50 sm:col-span-2">
          10+1 MONTHLY PLAN
        </button>
      </div>

      {/* Utilities */}
      <div className="mt-4 flex gap-3 text-sm">
        <button className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50">
          <Heart className="h-4 w-4"/> Wishlist
        </button>
        <button className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50">
          <Share2 className="h-4 w-4"/> Share
        </button>
      </div>

      {/* Trust badges */}
      <div className="mt-6 grid grid-cols-1 gap-3 rounded-lg border border-neutral-200 p-3 sm:grid-cols-3">
        {hallmarks.map((h, i) => (<div key={i} className="text-center text-sm text-neutral-700">
            {h}
          </div>))}
      </div>

      {/* Small policy row */}
      <div className="mt-3 grid grid-cols-1 gap-2 text-xs text-neutral-600 sm:grid-cols-3">
        <div>30-Day Returnable</div>
        <div>Lifetime Exchange & Buy-Back</div>
        <div>Free Insured Shipping</div>
      </div>
    </aside>);
}
function Selector({ label, value, onChange, options, }) {
    return (<label className="flex flex-col gap-1">
      <span className="text-xs text-neutral-600">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 rounded-md border border-neutral-300 bg-white px-3 text-sm outline-none focus:border-neutral-500">
        {options.map((o) => (<option key={o.value} value={o.value}>
            {o.label}
          </option>))}
      </select>
    </label>);
}
