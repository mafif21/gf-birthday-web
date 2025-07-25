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
    categories: [4],
    message:
      "Happy Birthday, my love. You make life brighter just by being in it.",
  },
  {
    categories: [2, 4],
    message:
      "Every moment with you is a gift. Today, we celebrate the beautiful soul that you are.",
  },
  {
    categories: [2, 4],
    message:
      "Your smile is my favorite view, and your heart is my favorite place to be. Happy Birthday!",
  },
  {
    categories: [2, 4],
    message:
      "You deserve all the love, laughter, and happiness today and always. I'm so lucky to have you.",
  },
  {
    categories: [4],
    message:
      "To my favorite person — may this year bring you endless joy and unforgettable memories. Happy Birthday ❤️",
  },
  {
    categories: [1],
    message: "Don’t forget to eat—no more stomach aches like last time, okay?",
  },
  {
    categories: [1],
    message:
      "Don’t pick at your hands again, okay? I just want you to be gentle with yourself—like I’d be with you.",
  },
  {
    categories: [3],
    message:
      "Hope this internship leads you straight to the Big 4—fingers crossed 😊",
  },
  {
    categories: [4],
    message:
      "I hope all the good things in this world always find their way to you.",
  },
  {
    categories: [4],
    message:
      "Happy birthday, love. I hope this year brings out the best in you, in every way.",
  },
  {
    categories: [3],
    message: "Take it slow, but take it seriously. You’ve got this 🤍",
  },
];
