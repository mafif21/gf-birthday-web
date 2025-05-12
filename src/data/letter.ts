export type Category = {
  idCategory: number;
  bgColor: string;
  borderColor: string;
  name: string;
};

export const Categories: Category[] = [
  {
    idCategory: 1,
    bgColor: "#fdcac9",
    borderColor: "#7c5c5f",
    name: "health",
  },
  {
    idCategory: 2,
    bgColor: "#efddc9",
    borderColor: "#99918b",
    name: "love",
  },
  {
    idCategory: 3,
    bgColor: "#d6d2ea",
    borderColor: "#676571",
    name: "career",
  },
  {
    idCategory: 4,
    bgColor: "#dfe1e6",
    borderColor: "#a0a1a3",
    name: "you",
  },
];

type Letter = {
  categories: number[];
  message: string;
};

export const Letters: Letter[] = [
  {
    categories: [1, 2, 3],
    message:
      "Happy Birthday, my love. You make life brighter just by being in it.",
  },
  {
    categories: [3, 4],
    message:
      "Every moment with you is a gift. Today, we celebrate the beautiful soul that you are.",
  },
  {
    categories: [1, 3, 4],
    message:
      "Your smile is my favorite view, and your heart is my favorite place to be. Happy Birthday!",
  },
  {
    categories: [3, 4],
    message:
      "You deserve all the love, laughter, and happiness today and always. I'm so lucky to have you.",
  },
  {
    categories: [1, 2, 3, 4],
    message:
      "To my favorite person — may this year bring you endless joy and unforgettable memories. Happy Birthday ❤️",
  },
];
