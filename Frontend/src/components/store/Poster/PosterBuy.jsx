"use client";
import { useEffect, useMemo, useState } from "react";
import { Heart, Share2, Wand2 } from "lucide-react";
export default function PosterBuy({ title, sku, price, sizes, paperTypes, frameOptions, finishOptions, hallmarks = ["Premium Art Print", "Fade-Resistant Ink", "Museum Quality"], onAddToCart, onBuyNow, onCustomPoster, }) {
    const [size, setSize] = useState(sizes[0]?.value);
    const [paper, setPaper] = useState(paperTypes[0]?.value);
    const [frame, setFrame] = useState(frameOptions[0]?.value);
    const [finish, setFinish] = useState(finishOptions[0]?.value);
    const [pincode, setPincode] = useState("");
    const [eta, setEta] = useState(null);
    const sale = price.sale ?? price.mrp;
    useEffect(() => {
        if (pincode.length === 6) {
            const days = 2 + (parseInt(pincode[pincode.length - 1]) % 4);
            setEta(`${days}–${days + 1} days`);
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
    const payload = {
        title,
        sku,
        size,
        paper,
        frame,
        finish,
        price: sale,
    };
    return (<aside className="w-full rounded-2xl border border-neutral-200 bg-white p-5 sm:p-6 shadow-sm">
      
      {/* TITLE */}
      <h1 className="text-2xl font-semibold leading-tight">{title}</h1>
      <p className="text-xs text-neutral-500 mt-1">SKU: {sku}</p>

      {/* PRICE */}
      <div className="mt-3 flex items-end gap-3">
        <div className="text-3xl font-bold">₹{sale.toLocaleString("en-IN")}</div>

        {price.sale && (<div className="text-sm text-neutral-500 line-through">
            ₹{price.mrp.toLocaleString("en-IN")}
          </div>)}

        {discount > 0 && (<span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
            {discount}% OFF
          </span>)}
      </div>

      <p className="mt-1 text-sm text-neutral-600">
        Free matte finish upgrade this week only ✨
      </p>

      {/* PINCODE CHECK */}
      <div className="mt-5 flex items-center gap-2">
        <input placeholder="Enter pincode" inputMode="numeric" maxLength={6} className="h-10 w-40 rounded-md border border-neutral-300 px-3 text-sm outline-none focus:border-neutral-500" value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}/>
        <button className="h-10 rounded-md border border-neutral-300 px-3 text-sm hover:bg-neutral-50">
          Check
        </button>

        <span className="text-sm text-neutral-600">
          {eta ? `Delivery in ${eta}` : "Delivery ETA available"}
        </span>
      </div>

      {/* OPTIONS */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Selector label="Size" value={size} onChange={setSize} options={sizes}/>
        <Selector label="Paper Type" value={paper} onChange={setPaper} options={paperTypes}/>
        <Selector label="Frame" value={frame} onChange={setFrame} options={frameOptions}/>
        <Selector label="Finish" value={finish} onChange={setFinish} options={finishOptions}/>
      </div>

      {/* CTA BUTTONS */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button className="h-11 rounded-md bg-black text-white hover:opacity-90" onClick={() => onBuyNow?.(payload)}>
          BUY NOW
        </button>

        <button className="h-11 rounded-md border border-neutral-300 hover:bg-neutral-50" onClick={() => onAddToCart?.(payload)}>
          ADD TO CART
        </button>

        <button className="h-11 rounded-md bg-white border border-neutral-300 hover:bg-neutral-50 sm:col-span-2 flex items-center justify-center gap-2" onClick={() => onCustomPoster?.()}>
          <Wand2 className="h-4 w-4"/>
          Custom Poster
        </button>
      </div>

      {/* WISHLIST + SHARE */}
      <div className="mt-5 flex gap-3 text-sm">
        <button className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-50">
          <Heart className="h-4 w-4"/> Wishlist
        </button>
        <button className="inline-flex items-center gap-1 rounded-md border border-neutral-300 px-4 py-2 hover:bg-neutral-50">
          <Share2 className="h-4 w-4"/> Share
        </button>
      </div>

      {/* TRUST BADGES */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-lg border border-neutral-200 p-3">
        {hallmarks.map((h, i) => (<div key={i} className="text-center text-sm text-neutral-700">
            {h}
          </div>))}
      </div>

      {/* POLICIES */}
      <div className="mt-3 text-xs text-neutral-600 grid sm:grid-cols-3 gap-2">
        <div>Easy Returns</div>
        <div>Premium Print Quality</div>
        <div>Free Protected Packaging</div>
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
