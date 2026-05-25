"use client";
import React from "react";
import AccessoriesCards from "./AccessoriesCards";
export default function AccessoriesBestSeller({ items, className = "" }) {
    return (<section className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Shop Our Best Seller</h2>
        <a className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition-colors" href="/store/accessories">
          View all products &gt;&gt;&gt;
        </a>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {items.map((it) => (<AccessoriesCards key={it.id} accessories={it}/>))}
      </div>
    </section>);
}
