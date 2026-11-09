"use client";

import { startTransition, useCallback, useMemo, useOptimistic } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { experiences } from "@/data/experiences";
import { filterExperiences, getInvalidFilters } from "@/lib/filter-experiences";

const sortOptions = ["rating", "price-asc", "price-desc"];
const ratingOptions = ["4", "4.5", "4.8"];
const filterKeys = ["search", "category", "destination", "sort", "rating"] as const;
type FilterKey = (typeof filterKeys)[number];

export function useExperiences() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [query, setOptimisticQuery] = useOptimistic(searchParams.toString());
  const params = useMemo(() => new URLSearchParams(query), [query]);

  const search = params.get("search") ?? "";
  const category = params.get("category") ?? "";
  const destination = params.get("destination") ?? "";
  const rating = params.get("rating") ?? "";
  const filters = useMemo(
    () => ({ search, category, destination, rating }),
    [search, category, destination, rating],
  );
  const sortParam = params.get("sort") ?? "";
  const sort = sortOptions.includes(sortParam) ? sortParam : "recommended";
  const minRating = ratingOptions.includes(rating) ? rating : "";

  const navigate = useCallback((nextQuery: string, replace = false) => {
    const url = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    // Keep controls responsive while the router commits the new URL.
    startTransition(() => {
      setOptimisticQuery(nextQuery);
      if (replace) router.replace(url, { scroll: false });
      else router.push(url, { scroll: false });
    });
  }, [pathname, router, setOptimisticQuery]);

  const setParam = useCallback(
    (key: FilterKey, value: string, replace = false) => {
      const params = new URLSearchParams(query);
      if (value) params.set(key, value);
      else params.delete(key);
      navigate(params.toString(), replace);
    },
    [query, navigate],
  );

  const clearFilters = useCallback(() => {
    const params = new URLSearchParams(query);
    filterKeys.forEach((key) => params.delete(key));
    navigate(params.toString());
  }, [query, navigate]);

  const items = useMemo(() => {
    const byTitle = (a: { title: string }, b: { title: string }) => a.title.localeCompare(b.title);
    return filterExperiences(experiences, filters).sort((a, b) => {
      if (sort === "rating") return b.rating - a.rating || byTitle(a, b);
      if (sort === "price-asc") return a.price - b.price || byTitle(a, b);
      if (sort === "price-desc") return b.price - a.price || byTitle(a, b);
      return experiences.indexOf(a) - experiences.indexOf(b);
    });
  }, [filters, sort]);
  const invalid = useMemo(() => getInvalidFilters(experiences, filters), [filters]);

  return {
    filters,
    sort,
    minRating,
    items,
    invalid,
    returnTo: query ? `?${query}` : "",
    setParam,
    clearFilters,
  };
}
