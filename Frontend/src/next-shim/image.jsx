import React from 'react';

/**
 * next/image shim for plain React/Vite.
 * Strips all Next.js-specific props so they never reach the DOM <img>
 * and cause "Received `true` for a non-boolean attribute" warnings.
 */
export default function Image({
  src,
  alt,
  width,
  height,
  className,
  style,
  // ── Next.js-only props – consumed here, NOT forwarded to DOM ──
  priority,
  fill,
  quality,
  sizes,
  placeholder,
  blurDataURL,
  unoptimized,
  objectFit,
  onLoadingComplete,
  loader,
  // ─────────────────────────────────────────────────────────────
  loading,
  ...rest
}) {
  // Convert static imports (Next.js image objects) to a plain string URL
  const imageSrc =
    typeof src === 'object' && src !== null && src.src ? src.src : src;

  // `fill` mode: stretch to cover the positioned parent
  const fillStyle = fill
    ? { position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: objectFit || 'cover' }
    : undefined;

  // `priority` maps to native loading="eager"
  const loadingAttr = loading || (priority ? 'eager' : undefined);

  return (
    <img
      src={imageSrc}
      alt={alt || ''}
      width={!fill ? width : undefined}
      height={!fill ? height : undefined}
      className={className}
      style={{ ...fillStyle, ...style }}
      loading={loadingAttr}
      {...rest}
    />
  );
}
