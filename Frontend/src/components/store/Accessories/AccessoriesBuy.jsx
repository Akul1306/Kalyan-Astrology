"use client";
import { useEffect, useMemo, useState } from "react";
import { Heart, Share2 } from "lucide-react";
export default function ProductBuy({ title, sku, price, beadSizeOptions = [], lengthOptions = [], energyOptions = [], materialOptions = [], certifications = [
    "Govt. Certified",
    "Lab Report Included",
    "100% Authentic & Energised",
], onAddToCart, onBuyNow, }) {
    const [beadSize, setBeadSize] = useState(beadSizeOptions[0]?.value);
    const [length, setLength] = useState(lengthOptions[0]?.value);
    const [energy, setEnergy] = useState(energyOptions[0]?.value);
    const [material, setMaterial] = useState(materialOptions[0]?.value);
    const [pincode, setPincode] = useState("");
    const [eta, setEta] = useState(null);
    const [energize, setEnergize] = useState(true);
    const salePrice = price.sale ?? price.mrp;
    // Mock delivery ETA
    useEffect(() => {
        if (pincode.length === 6) {
            const days = 3 + (parseInt(pincode[pincode.length - 1]) % 3);
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
    const payload = {
        title,
        sku,
        beadSize,
        length,
        energy,
        material,
        energize,
        price: salePrice,
    };
    return (<aside className="w-full rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6">
      {/* TITLE */}
      <h1 className="text-xl font-semibold md:text-2xl">{title}</h1>

      {/* PRICE ROW */}
      <div className="mt-2 flex items-end gap-3">
        <div className="text-2xl md:text-3xl font-bold">
          ₹{salePrice.toLocaleString("en-IN")}
        </div>
        {price.sale && (<div className="text-sm text-neutral-500 line-through">
            ₹{price.mrp.toLocaleString("en-IN")}
          </div>)}
        {discount > 0 && (<span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
            {discount}% OFF
          </span>)}
      </div>

      {/* PINCODE CHECK */}
      <div className="mt-4 flex items-center gap-2">
        <input title="Enter pincode" placeholder="Enter pincode" inputMode="numeric" maxLength={6} className="h-10 w-40 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-500" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}/>
        <button className="h-10 rounded-md border border-neutral-200 px-3 text-sm hover:bg-neutral-50">
          Check
        </button>
        <span className="text-sm text-neutral-600">
          {eta || "Delivery ETA"}
        </span>
      </div>

      {/* PRODUCT OPTIONS */}
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {materialOptions.length > 0 && (<Selector label="Material" value={material} onChange={setMaterial} options={materialOptions}/>)}

        {beadSizeOptions.length > 0 && (<Selector label="Bead Size" value={beadSize} onChange={setBeadSize} options={beadSizeOptions}/>)}

        {lengthOptions.length > 0 && (<Selector label="Length / Size" value={length} onChange={setLength} options={lengthOptions}/>)}

        {energyOptions.length > 0 && (<Selector label="Energization" value={energy} onChange={setEnergy} options={energyOptions}/>)}
      </div>

      {/* ENERGIZATION TOGGLE */}
      <div className="mt-4 flex items-center gap-3 text-sm">
        <input title="Energize before shipping (Free)" type="checkbox" checked={energize} onChange={(e) => setEnergize(e.target.checked)} className="h-4 w-4"/>
        <span>Energize before shipping (Free)</span>
      </div>

      {/* CTA BUTTONS */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button className="h-11 rounded-md bg-neutral-900 text-white hover:opacity-90" onClick={() => onBuyNow?.(payload)}>
          BUY NOW
        </button>
        <button className="h-11 rounded-md border border-neutral-300 hover:bg-neutral-50" onClick={() => onAddToCart?.(payload)}>
          ADD TO CART
        </button>
      </div>

      {/* UTILITIES */}
      <div className="mt-4 flex gap-3 text-sm">
        <button className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50">
          <Heart className="h-4 w-4"/> Wishlist
        </button>

        <button className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-3 py-2 hover:bg-neutral-50">
          <Share2 className="h-4 w-4"/> Share
        </button>
      </div>

      {/* CERTIFICATIONS */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 border border-neutral-200 p-3 rounded-lg text-sm text-neutral-700">
        {certifications.map((c, i) => (<div key={i} className="text-center">
            {c}
          </div>))}
      </div>

      {/* POLICIES */}
      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 text-xs text-neutral-600 gap-2">
        <div>Easy Returns</div>
        <div>Authenticity Guaranteed</div>
        <div>Free Insured Shipping</div>
      </div>
    </aside>);
}
/* ---------------------------------- */
function Selector({ label, value, onChange, options, }) {
    return (<label className="flex flex-col gap-1 text-sm">
      <span className="text-neutral-600">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-10 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-600">
        {options.map((o) => (<option key={o.value} value={o.value}>
            {o.label}
          </option>))}
      </select>
    </label>);
}
