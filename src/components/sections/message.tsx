import { FlipCards } from "@/data/flipCard";
import FlipCard from "../features/card/flipCard";

export const Message = () => {
  return (
    <div className="flex flex-col items-center my-16 scroll-mt-10" id="cards">
      {FlipCards.map((value, index) => (
        <FlipCard
          message={value.message}
          image={value.image}
          bgColor={value.bgColor}
          key={index}
        />
      ))}
    </div>
  );
};
