"use client";

import { Caveat } from "next/font/google";
import { useEffect, useRef, useState } from "react";

interface FlipCardProps {
  image: string;
  message: string;
  bgColor: string;
}

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const FlipCard = ({ image, message, bgColor }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsFlipped(true);
        } else {
          setIsFlipped(false);
        }
      });
    }, options);

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div className="flex items-center justify-center p-4">
      <div ref={cardRef} className="relative w-80 h-96 perspective-1000">
        <div
          className={`relative w-full h-full transition-transform duration-3000 transform-style-3d ${
            isFlipped ? "rotate-y-180" : ""
          }`}
        >
          <div className="absolute w-full h-full bg-blue-500 text-white rounded-lg shadow-lg backface-hidden flex flex-col justify-center items-center">
            <img
              src={image}
              alt="flipcard-image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          <div
            className="absolute w-full h-full text-white p-6 rounded-lg shadow-lg backface-hidden rotate-y-180 flex flex-col justify-center items-center"
            style={{ backgroundColor: bgColor }}
          >
            <p
              className={`${caveat.className} text-3xl font-semibold text-center mb-4`}
            >
              {message}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
};

export default FlipCard;
