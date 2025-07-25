"use client";

interface MediaItem {
  src: string;
  type: "image" | "video";
}

interface GalleryProps {
  items: MediaItem[];
}

export const Gallery = ({ items }: GalleryProps) => {
  return (
    <div className="relative h-[600px] overflow-hidden">
      <div className="absolute animate-scrollUp w-full">
        <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
          {[...items, ...items].map((item, index) => (
            <div key={index} className="break-inside-avoid">
              {item.type === "image" ? (
                <img
                  src={item.src}
                  className="w-full rounded-lg"
                  alt={`media-${index}`}
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full rounded-lg"
                  autoPlay
                  muted
                  loop
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollUp {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(-50%);
          }
        }

        .animate-scrollUp {
          animation: scrollUp 30s linear infinite;
        }
      `}</style>
    </div>
  );
};
