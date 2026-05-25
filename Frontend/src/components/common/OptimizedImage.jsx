"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
// Fallback placeholder image (transparent 1x1 PNG)
const FALLBACK_IMAGE = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiNmNWY1ZjUiLz48L3N2Zz4=";
/**
 * Optimized Image Component
 * - Automatic fallback for missing/broken images
 * - Proper quality and sizes for performance
 * - WebP/AVIF format support (handled by Next.js)
 * - Responsive sizing
 * - Error handling
 */
export default function OptimizedImage({ src, alt, quality = 85, priority = false, loading, sizes, fallback = FALLBACK_IMAGE, aspectRatio, objectFit = "cover", className = "", onError, fill, width, height, ...props }) {
    const [imgSrc, setImgSrc] = useState(src || fallback);
    const [hasError, setHasError] = useState(false);
    useEffect(() => {
        if (src && src !== imgSrc) {
            setImgSrc(src);
            setHasError(false);
        }
    }, [src, imgSrc]);
    const handleError = () => {
        if (!hasError && imgSrc !== fallback) {
            setHasError(true);
            setImgSrc(fallback);
            onError?.();
        }
    };
    // Validate src exists
    if (!src || src === "" || src === "null" || src === "undefined") {
        return (<div className={`relative bg-gray-100 flex items-center justify-center ${className}`} style={fill
                ? { width: "100%", height: "100%" }
                : aspectRatio
                    ? { aspectRatio, width: width || "100%", height: height || "auto" }
                    : { width: width || "100%", height: height || "auto" }}>
        <Image src={fallback} alt={alt} fill={fill} width={!fill ? width : undefined} height={!fill ? height : undefined} quality={quality} priority={priority} loading={loading || (priority ? "eager" : "lazy")} sizes={sizes || "100vw"} className={`object-${objectFit} ${className}`} {...props}/>
      </div>);
    }
    // Determine sizes if not provided - optimized for performance
    const computedSizes = sizes ||
        (fill
            ? "(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
            : width && typeof width === 'number'
                ? `(max-width: ${width * 2}px) 100vw, ${width}px`
                : width && typeof width === 'string'
                    ? `(max-width: 640px) 100vw, ${width}`
                    : "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw");
    // Determine loading strategy
    const loadingStrategy = loading || (priority ? "eager" : "lazy");
    return (<div className={`relative ${className}`} style={aspectRatio && !fill
            ? { aspectRatio, width: width || "100%", height: height || "auto" }
            : fill
                ? { width: "100%", height: "100%" }
                : undefined}>
      <Image src={imgSrc} alt={alt} fill={fill} width={!fill ? width : undefined} height={!fill ? height : undefined} quality={quality} priority={priority} loading={loadingStrategy} sizes={computedSizes} className={`object-${objectFit}`} onError={handleError} placeholder="blur" blurDataURL={FALLBACK_IMAGE} {...props}/>
    </div>);
}
