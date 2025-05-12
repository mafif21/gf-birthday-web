"use client";
import React, { useState, useRef, useEffect } from "react";

const BirthdayMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<number | null>(null);

  const togglePlayPause = () => {
    console.log("Toggle play/pause clicked");
    if (isPlaying) {
      if (audioRef.current) {
        console.log("Pausing audio");
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      if (audioRef.current) {
        console.log("Playing audio");
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log("Audio played successfully");
              setIsPlaying(true);
            })
            .catch((error) => {
              console.error("Error playing audio:", error);
            });
        }
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = volume / 100;
    }

    if (isPlaying) {
      intervalRef.current = window.setInterval(() => {
        if (audioRef.current) {
          const duration = audioRef.current.duration || 1;
          setProgress((audioRef.current.currentTime / duration) * 100);
        }
      }, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, volume]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const styleTag = document.createElement("style");
      styleTag.innerHTML = `
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          50% {
            transform: translateY(-100px) rotate(15deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(styleTag);

      return () => {
        if (document.head.contains(styleTag)) {
          document.head.removeChild(styleTag);
        }
      };
    }
  }, []);

  const [heartStyles, setHeartStyles] = useState<
    Array<{ left: string; animDuration: string; animDelay: string }>
  >([]);

  useEffect(() => {
    const newHeartStyles = Array.from({ length: 15 }).map(() => ({
      left: `${Math.random() * 80 + 10}%`,
      animDuration: `${Math.random() * 2 + 2}s`,
      animDelay: `${Math.random() * 2}s`,
    }));
    setHeartStyles(newHeartStyles);
  }, []);

  const heartParticles = heartStyles.map((style, i) => (
    <div
      key={i}
      className={`absolute w-3 h-3 text-pink-500 transform ${
        isPlaying ? "animate-float" : "opacity-0"
      }`}
      style={{
        left: style.left,
        top: "100%",
        animationName: isPlaying ? "float" : "none",
        animationDuration: style.animDuration,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        animationDelay: style.animDelay,
        opacity: isPlaying ? 0.7 : 0,
      }}
    >
      ❤️
    </div>
  ));

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 rounded-xl w-full  relative overflow-hidden border-4 border-pink-200">
      {heartParticles}
      {/* sm:max-w-sm md:max-w-md */}

      <div className="z-10 w-full">
        {/* Album Art & Vinyl Player */}
        <div
          className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 mb-4 md:mb-6 rounded-lg overflow-hidden transition-all duration-500 bg-white"
          style={{
            transform: isPlaying ? "translateY(-5px)" : "none",
            boxShadow: isPlaying
              ? "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
              : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-full h-full rounded-full bg-black opacity-80 absolute transform ${
                isPlaying ? "animate-spin" : ""
              }`}
              style={{
                animationDuration: "3s",
                width: "80%",
                height: "80%",
                top: "10%",
                left: "10%",
              }}
            >
              <div className="absolute inset-6 rounded-full border border-gray-600 opacity-40"></div>
              <div className="absolute inset-12 rounded-full border border-gray-600 opacity-40"></div>
              <div className="absolute inset-16 rounded-full border border-gray-600 opacity-40"></div>
              <div className="absolute inset-24 rounded-full border border-gray-600 opacity-40"></div>

              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center"></div>

              {/* Play/Pause Button (centered) */}
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  togglePlayPause();
                }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-pink-100 hover:bg-pink-200 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-pink-300 z-20"
              >
                {isPlaying ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 9v6m4-6v6M9 9h1m4 0h1"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 sm:h-6 sm:w-6 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex justify-center items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243a1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z"
              clipRule="evenodd"
            />
          </svg>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-20 sm:w-24 md:w-32 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-400"
          />
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full mb-4 md:mb-6 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-pink-300 to-purple-300 rounded-full"
            style={{ width: `${progress}%`, transition: "width 0.1s" }}
          ></div>
        </div>
      </div>

      {/* Song Title and Artist */}
      <div className="mt-2 md:mt-4 text-center z-10">
        <h2 className="text-lg sm:text-xl font-medium text-gray-800">
          Pilihanku
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mb-2">
          MALIQ & D'Essentials
        </p>
      </div>

      <audio ref={audioRef} preload="auto">
        <source src="/music/maliq-pilihanku.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BirthdayMusicPlayer;
