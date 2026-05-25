"use client";
import React, { useEffect, useRef } from "react";
const TestimonialSlider = ({ videos = [
    "/Poster/Testimonials/testimonial1.mp4",
    "/Poster/Testimonials/testimonial2.mp4",
    "/Poster/Testimonials/testimonial3.mp4",
    "/Poster/Testimonials/testimonial4.mp4",
], speed = 40, gap = 60, videoWidth = 320, videoHeight = 520, }) => {
    const trackRef = useRef(null);
    useEffect(() => {
        const track = trackRef.current;
        if (!track)
            return;
        let start = null;
        let translateX = 0;
        const totalWidth = (videoWidth + gap) * videos.length;
        const animate = (time) => {
            if (start === null)
                start = time;
            const elapsed = (time - start) / 1000;
            translateX = -(elapsed * speed) % totalWidth;
            track.style.transform = `translate3d(${translateX}px, 0, 0)`;
            requestAnimationFrame(animate);
        };
        const raf = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(raf);
    }, [videos, speed, gap, videoWidth]);
    return (<section className="lux-slider">
      <div className="lux-overlay"/>
      <div className="lux-track" ref={trackRef} style={{
            "--gap": `${gap}px`,
            "--vw": `${videoWidth}px`,
            "--vh": `${videoHeight}px`,
        }}>
        {[...videos, ...videos].map((src, i) => (<div key={i} className="lux-video">
            <video src={src} width={videoWidth} height={videoHeight} autoPlay muted loop playsInline preload="auto"/>
          </div>))}
      </div>

 

      <style>{`
        .lux-slider {
          position: relative;
          width: 100%;
          overflow: hidden;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
 
          padding: 100px 0;
          isolation: isolate;
        }

        .lux-track {
          display: flex;
          gap: var(--gap);
          will-change: transform;
          backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
          perspective: 1000px;
        }

        .lux-video {
          flex: 0 0 auto;
          width: var(--vw);
          height: var(--vh);
          border-radius: 24px;
          overflow: hidden;
          position: relative;
          background: #000;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
          transform-style: preserve-3d;
          transition: transform 0.6s ease, box-shadow 0.6s ease;
        }

        .lux-video video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s ease;
        }

        .lux-video:hover {
          transform: rotateY(6deg) scale(1.04) translateY(-6px);
          box-shadow: 0 30px 70px rgba(0, 0, 0, 0.18);
        }

        .lux-video:hover video {
          transform: scale(1.1);
        }

        .lux-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            #fefefe 5%,
            transparent 15%,
            transparent 85%,
            #fefefe 95%
          );
          pointer-events: none;
          z-index: 3;
        }

        @media (max-width: 1024px) {
          .lux-slider {
            padding: 80px 0;
          }
          .lux-heading {
            top: 8%;
          }
          .lux-video {
            width: 240px;
            height: 380px;
            border-radius: 18px;
          }
        }

        @media (max-width: 600px) {
          .lux-heading h2 {
            font-size: 1.8rem;
          }
          .lux-heading p {
            font-size: 0.95rem;
          }
          .lux-video {
            width: 200px;
            height: 320px;
          }
        }
      `}</style>
    </section>);
};
export default TestimonialSlider;
