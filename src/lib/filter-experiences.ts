import { categories, type Experience } from "../types/experience";

export type ExperienceFilters = {
  search: string;
  category: string;
  destination: string;
  rating?: string;
};

function matchesDestination(experience: Experience, destination: string): boolean {
  return [experience.city, experience.country, experience.destination].some(
    (value) => value.toLowerCase() === destination,
  );
}

export function filterExperiences(
  experiences: Experience[],
  { search, category, destination, rating }: ExperienceFilters,
): Experience[] {
  const term = search.trim();
  const escapedTerm = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const titlePattern = term ? new RegExp(escapedTerm, "i") : null;
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedDestination = destination.trim().toLowerCase();
  const normalizedRating = rating?.trim() ?? "";

  return experiences.filter(
    (experience) =>
      (!titlePattern || titlePattern.test(experience.title)) &&
      (!normalizedCategory ||
        experience.category.toLowerCase() === normalizedCategory) &&
      (!normalizedDestination ||
        matchesDestination(experience, normalizedDestination)) &&
      (!normalizedRating || experience.rating >= Number(normalizedRating)),
  );
}

export function getInvalidFilters(
  experiences: Experience[],
  { category, destination, rating }: ExperienceFilters,
): string[] {
  const invalid: string[] = [];
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedDestination = destination.trim().toLowerCase();
  const normalizedRating = rating?.trim() ?? "";

  if (
    normalizedCategory &&
    !categories.some((item) => item.toLowerCase() === normalizedCategory)
  ) {
    invalid.push("category");
  }
  if (
    normalizedDestination &&
    !experiences.some(
      (experience) => matchesDestination(experience, normalizedDestination),
    )
  ) {
    invalid.push("destination");
  }
  if (normalizedRating && !["4", "4.5", "4.8"].includes(normalizedRating)) invalid.push("rating");
  return invalid;
}
