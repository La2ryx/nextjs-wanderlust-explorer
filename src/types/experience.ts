export const categories = [
  "Adventure",
  "Culture",
  "Food",
  "Wellness",
  "Nature",
] as const;

export type Category = (typeof categories)[number];

export type Experience = {
  id: string;
  title: string;
  description: string;
  category: Category;
  city: string;
  country: string;
  destination: string;
  price: number;
  rating: number;
  imageUrl: string;
  imageAlt: string;
};
