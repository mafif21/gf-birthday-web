"use client";
import { Carousels } from "@/data/carousel";
import { Separator } from "../ui/separator";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  useEffect(() => {
    if (!api) return;

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 3000);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <div className="scroll-mt-24 px-4">
      <div className="flex items-center flex-col gap-4">
        <div>
          <Carousel
            className="lg:w-2xl [&_.carousel-button]:hidden [&>button]:hidden"
            setApi={setApi}
            opts={{ align: "start", loop: true }}
          >
            <CarouselContent>
              {Carousels.map((v, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <img
                      src={v.path}
                      alt={`carousel-${index}`}
                      className="rounded-md"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-xl lg:text-2xl mb-4 font-semibold">
            Dear Ratu Andri
          </h1>
          <div className="text-center">
            <p className="text-sm">
              I truly treasure you. I love you so much and these are times when
              I see how beautiful you are. 💗
            </p>
          </div>
        </div>

        <div className="h-18 flex justify-center items-center my-8 flex-col gap-4">
          <Separator
            className="!w-1 rounded-full bg-gradient-to-b from-black/100 to-black/0"
            orientation="vertical"
          />
          <p>SCROLL</p>
        </div>
      </div>
    </div>
  );
};
