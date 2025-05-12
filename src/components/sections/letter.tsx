"use client";

import { Categories, Letters } from "@/data/letter";
import { CardLetter } from "../features/card/cardLetter";
import { Button } from "../ui/button";
import { useState } from "react";

export const Letter = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleFilter = (categoryId: number) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId));
  };

  const filteredLetters = selectedCategory
    ? Letters.filter((letter) => letter.categories.includes(selectedCategory))
    : Letters.slice(0, 9);

  console.log(filteredLetters);
  return (
    <div className="my-10 scroll-mt-10" id="letters">
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-2xl mb-4 font-semibold">Letters</h1>
        <div className="w-md text-center">
          <p>Categorized Letters 💌</p>
        </div>
      </div>

      <div className="flex gap-2">
        {Categories.map((value) => {
          const isSelected = value.idCategory == selectedCategory;
          return (
            <Button
              key={value.idCategory}
              style={{
                backgroundColor:
                  selectedCategory === null || isSelected
                    ? value.bgColor
                    : "transparent",
                borderColor: value.borderColor,
                borderWidth: "1px",
                borderStyle: "solid",
                color: isSelected ? "white" : "#334155", // highlight text when selected
              }}
              onClick={() => handleFilter(value.idCategory)}
              className="mb-6 text-sm px-4 py-2 rounded text-slate-700 cursor-pointer"
            >
              {value.name}
            </Button>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {filteredLetters.map((value, index) => (
          <CardLetter
            categories={value.categories}
            message={value.message}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};
