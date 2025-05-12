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
    <div>
      <div className="hidden items-center md:flex justify-center my-12 flex-col">
        <h1 className="mb-8 text-4xl font-bold">FOR LOVE</h1>
        <nav className="flex font-medium text-sm px-8 gap-5">
          {routes.map((route) => (
            <NextLink
              key={route.path}
              href={route.path}
              className={`${caveat.className} px-4 py-3 text-xl`}
              onClick={() => setOpen(true)}
            >
              {route.label}
            </NextLink>
          ))}
        </nav>
      </div>
    </div>
  );
};
