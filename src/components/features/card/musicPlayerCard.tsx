"use client";
import React, { useState, useRef, useEffect } from "react";

const BirthdayMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<number | null>(null);

  const togglePlayPause = () => {
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
            transform: translateY(-50px) rotate(15deg);
            opacity: 0;
          }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-10px);
          }
          60% {
            transform: translateY(-5px);
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
    const newHeartStyles = Array.from({ length: 8 }).map(() => ({
      left: `${Math.random() * 60 + 20}%`,
      animDuration: `${Math.random() * 2 + 2}s`,
      animDelay: `${Math.random() * 2}s`,
    }));
    setHeartStyles(newHeartStyles);
  }, []);

  const heartParticles = heartStyles.map((style, i) => (
    <div
      key={i}
      className={`absolute w-2 h-2 text-pink-500 transform ${
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
        fontSize: "10px",
      }}
    >
      ❤️
    </div>
  ));

  return (
    <>
      {/* Desktop Version - Full Player */}
      <div className="hidden md:flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 rounded-xl w-full relative overflow-hidden border-4 border-pink-200">
        {heartParticles}

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

      {/* Mobile Version - Floating Player */}
      <div className="md:hidden fixed top-115 right-4 z-50">
        {/* Floating Container */}
        <div
          className={`bg-white rounded-2xl shadow-2xl border-2 border-pink-200 overflow-hidden transition-all duration-300 ${
            isMinimized ? "w-16 h-16" : "w-72 h-auto"
          }`}
          style={{
            backdropFilter: "blur(10px)",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          {/* Minimized State */}
          {isMinimized ? (
            <div
              className="relative w-full h-full flex items-center justify-center cursor-pointer"
              onClick={() => setIsMinimized(false)}
            >
              {/* Mini Heart Particles */}
              {isPlaying && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {heartStyles.slice(0, 3).map((style, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 text-pink-500"
                      style={{
                        left: `${30 + i * 20}%`,
                        top: "80%",
                        animationName: isPlaying ? "float" : "none",
                        animationDuration: "2s",
                        animationTimingFunction: "ease-in-out",
                        animationIterationCount: "infinite",
                        animationDelay: `${i * 0.5}s`,
                        fontSize: "8px",
                      }}
                    >
                      ❤️
                    </div>
                  ))}
                </div>
              )}

              {/* Mini Play/Pause Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent expanding when clicking play/pause
                  togglePlayPause();
                }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center shadow-md"
                style={{
                  animation: isPlaying ? "bounce 2s infinite" : "none",
                }}
              >
                {isPlaying ? (
                  <svg
                    className="w-4 h-4 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
                    className="w-4 h-4 text-gray-800"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
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
          ) : (
            /* Expanded State */
            <div className="relative p-4 overflow-hidden">
              {/* Heart Particles */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {heartParticles}
              </div>

              {/* Header with Minimize Button */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
                  <span className="text-xs font-medium text-gray-600">
                    Now Playing
                  </span>
                </div>
                <button
                  onClick={() => setIsMinimized(true)}
                  className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg
                    className="w-3 h-3 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 12H4"
                    />
                  </svg>
                </button>
              </div>

              {/* Mini Album Art */}
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white shadow-md">
                  <div
                    className={`w-full h-full rounded-full bg-black opacity-80 transform ${
                      isPlaying ? "animate-spin" : ""
                    }`}
                    style={{ animationDuration: "3s" }}
                  >
                    <div className="absolute inset-2 rounded-full border border-gray-600 opacity-40"></div>
                    <div className="absolute inset-4 rounded-full border border-gray-600 opacity-40"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-pink-200 to-purple-200"></div>
                  </div>
                </div>

                {/* Song Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-800 truncate">
                    Pilihanku
                  </h3>
                  <p className="text-xs text-gray-600 truncate">
                    MALIQ & D'Essentials
                  </p>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-3">
                <button
                  onClick={togglePlayPause}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                >
                  {isPlaying ? (
                    <svg
                      className="w-5 h-5 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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
                      className="w-5 h-5 text-gray-800"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
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

              {/* Progress Bar */}
              <div className="w-full h-1 bg-gray-200 rounded-full mb-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-pink-300 to-purple-300 rounded-full"
                  style={{ width: `${progress}%`, transition: "width 0.1s" }}
                ></div>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 text-gray-600"
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
                  className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-400"
                />
                <span className="text-xs text-gray-600 w-8 text-right">
                  {volume}%
                </span>
              </div>
            </div>
          )}
        </div>

        <audio ref={audioRef} preload="auto">
          <source src="/music/maliq-pilihanku.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </>
  );
};

export default BirthdayMusicPlayer;
