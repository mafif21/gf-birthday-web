"use client";

import { useEffect, useRef } from "react";

interface MediaItem {
  type: "image" | "video";
  src: string;
}

interface GalleryProps {
  items: MediaItem[];
}

export const Gallery = ({ items }: GalleryProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrame: number;

    const scroll = () => {
      if (container.scrollTop >= container.scrollHeight / 2) {
        const currentScroll = container.scrollTop;
        container.style.scrollBehavior = "auto";

        container.scrollTop = 0;
        container.style.scrollBehavior = "smooth";

        container.scrollTop = currentScroll % (container.scrollHeight / 2);
      } else {
        container.scrollTop += 0.5;
      }

      animationFrame = requestAnimationFrame(scroll);
    };

    animationFrame = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div
      ref={containerRef}
      className="max-h-[600px] overflow-y-hidden rounded-lg"
    >
      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {[...items, ...items].map((item, i) => (
          <img
            key={i}
            src={item.src}
            className="w-full rounded-lg break-inside-avoid"
          />
        ))}
      </div>
    </div>
  );
};
