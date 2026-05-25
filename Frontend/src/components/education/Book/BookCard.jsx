"use client";
import React from "react";
import Image from "next/image";
import BookButton from "./BookButton";
import { Trash2 } from "lucide-react";
import { useKundliStore } from "@/lib/store";

const BookCard = ({ id, image, title, author, description, onAskAI, onDelete }) => {
    const { currentUser, isAuthenticated } = useKundliStore();
    const isAdmin = isAuthenticated && currentUser?.role === "admin";

    return (<div className="mt-2 group relative flex flex-col items-center overflow-hidden hover:shadow-xl rounded-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 bg-white">
      {/* Admin Delete Action */}
      {isAdmin && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
              onDelete(id);
            }
          }}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/80 hover:bg-rose-500 hover:text-white text-gray-500 backdrop-blur-sm shadow-md transition-all duration-200 cursor-pointer"
          title="Delete Book"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      )}

      {/* Book Image */}
      <div className="relative w-full h-[230px] sm:h-[250px] md:h-[270px] overflow-hidden bg-gray-50 flex items-center justify-center">
        <Image src={image || "/books/placeholder.webp"} alt={title} fill quality={90} className="object-contain p-4 transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" priority={false} loading="lazy" placeholder="blur" blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=" onError={(e) => {
            const target = e.target;
            if (target.src !== "/books/placeholder.webp") {
                target.src = "/books/placeholder.webp";
            }
        }}/>
        <div className="absolute inset-0 bg-gradient-to-t from-orange-50/40 via-transparent to-transparent pointer-events-none"/>
      </div>

      {/* Book Info */}
      <div className="flex flex-col items-center text-center w-full p-5 space-y-2 flex-grow">
        <h3 className="text-base font-bold text-gray-800 group-hover:text-orange-600 transition-colors duration-300 leading-tight line-clamp-1 px-2 w-full">
          {title}
        </h3>
        <p className="text-xs font-medium text-gray-400">{author}</p>
        {description && (<p className="text-xs text-gray-500 line-clamp-2 max-w-xs leading-relaxed">
            {description}
          </p>)}

        {/* Button */}
        <div className="mt-auto pt-3">
          <BookButton onClick={onAskAI} label="Ask AI"/>
        </div>
      </div>
    </div>);
};
export default BookCard;
