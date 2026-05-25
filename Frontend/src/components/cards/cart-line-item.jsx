"use client";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
export function CartLineItem({ id, name, description, category, deliveryEstimate, thumbnail, price, quantity, onQuantityChange, onRemove, }) {
    return (<motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} whileHover={{ y: -4, scale: 1.01 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} className="
        relative flex flex-col gap-4 sm:flex-row sm:items-center
        rounded-3xl border border-yellow-100 bg-gradient-to-r from-white via-amber-50/60 to-white
        p-4 shadow-[0_10px_20px_rgba(250,204,21,0.12)]
      ">
      {/* Soft halo */}
      <div className="pointer-events-none absolute -left-6 top-6 h-16 w-16 rounded-full bg-yellow-200/30 blur-2xl"/>

      <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-yellow-100 bg-white shadow-sm">
        <Image src={thumbnail} alt={name} fill className="object-cover" sizes="80px"/>
      </div>

      <div className="flex-1 relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">
          {category}
        </p>
        <h3 className="mt-1 font-mono text-lg text-gray-900">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <p className="mt-1 text-xs text-gray-500">{deliveryEstimate}</p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <p className="font-mono text-lg sm:text-xl text-gray-900">
          ₹{(price * quantity).toFixed(2)}
        </p>

        <div className="flex items-center rounded-full border border-yellow-200 bg-white/90 shadow-sm">
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-700" onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}>
            <Minus className="h-4 w-4"/>
          </Button>
          <span className="w-10 text-center font-mono text-sm text-gray-800">
            {quantity.toString().padStart(2, "0")}
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-gray-700" onClick={() => onQuantityChange(id, quantity + 1)}>
            <Plus className="h-4 w-4"/>
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="text-xs text-gray-500 hover:text-red-600" onClick={() => onRemove(id)}>
          <Trash2 className="mr-1 h-4 w-4"/>
          Remove
        </Button>
      </div>
    </motion.div>);
}
