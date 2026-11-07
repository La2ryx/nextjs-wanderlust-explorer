import type { Category } from "../types/experience";

type ExperienceImage = {
  url: string;
  alt: string;
};

export const adriaticImage: ExperienceImage = {
  url: "/images/adriatic.jpg",
  alt: "A sailboat on the water near Split, Croatia",
};

export const categoryImages: Record<Category, ExperienceImage> = {
  Adventure: {
    url: "/images/adventure.jpg",
    alt: "A hiking trail through a green mountain landscape in Norway",
  },
  Culture: {
    url: "/images/culture.jpg",
    alt: "A sunlit street lined with historic buildings in Paris",
  },
  Food: {
    url: "/images/food.jpg",
    alt: "People preparing food at an outdoor market stall",
  },
  Wellness: {
    url: "/images/wellness.jpg",
    alt: "A group practicing yoga beside a lake",
  },
  Nature: {
    url: "/images/nature.jpg",
    alt: "Sunlight falling through trees in a forest",
  },
};
