import { routes } from "@/data/routes";
import { useState } from "react";
import NextLink from "next/link";
import { Caveat } from "next/font/google";

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const Navigation = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <div className="hidden items-center md:flex justify-center my-12 flex-col">
        <h1 className="mb-8 text-4xl font-bold tracking-wide">FOR LOVE</h1>
        <nav className="flex font-medium text-sm px-8 gap-5">
          {routes.map((route) => (
            <NextLink
              key={route.path}
              href={route.path}
              className={`${caveat.className} px-4 py-3 text-xl hover:text-rose-500 transition-colors duration-200 hover:scale-105 transform`}
            >
              {route.label}
            </NextLink>
          ))}
        </nav>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-between px-6 py-4 mt-6">
          <h1 className="text-2xl font-bold tracking-wide">FOR LOVE</h1>
          <button
            onClick={() => setOpen(!open)}
            className="relative z-50 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow duration-200"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span
                className={`block w-5 h-0.5 bg-gray-800 transition-transform duration-300 ${
                  open ? "rotate-45 translate-y-0.5" : "-translate-y-1"
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-800 transition-opacity duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`block w-5 h-0.5 bg-gray-800 transition-transform duration-300 ${
                  open ? "-rotate-45 -translate-y-0.5" : "translate-y-1"
                }`}
              />
            </div>
          </button>
        </div>

        <div
          className={`fixed inset-0 bg-transparent bg-opacity-50 z-30 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setOpen(false)}
        />

        <nav
          className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-rose-50 to-pink-50 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-20 px-8">
            <div className="flex flex-col space-y-6">
              {routes.map((route, index) => (
                <NextLink
                  key={route.path}
                  href={route.path}
                  className={`${caveat.className} text-2xl font-medium text-gray-800 hover:text-rose-500 transition-all duration-200 transform hover:translate-x-2 hover:scale-105 py-3 border-b border-rose-100 last:border-b-0`}
                  onClick={() => setOpen(false)}
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animation: open
                      ? "slideInRight 0.5s ease-out forwards"
                      : "none",
                  }}
                >
                  {route.label}
                </NextLink>
              ))}
            </div>
          </div>
        </nav>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
