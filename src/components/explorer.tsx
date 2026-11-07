"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { experiences } from "@/data/experiences";
import { filterExperiences, getInvalidFilters } from "@/lib/filter-experiences";
import { categories } from "@/types/experience";
import { ExperienceGrid } from "./experience-card";

const countries = [...new Set(experiences.map((item) => item.country))].sort();

export function Explorer({ favorites, onToggle }: { favorites: string[]; onToggle: (id: string) => void }) {
  const searchParams = useSearchParams();
  const filters = {
    search: searchParams.get("search") ?? "",
    category: searchParams.get("category") ?? "",
    destination: searchParams.get("destination") ?? "",
  };
  const [search, setSearch] = useState(filters.search);
  useEffect(() => {
    const syncSearch = () => setSearch(new URLSearchParams(window.location.search).get("search") ?? "");
    window.addEventListener("popstate", syncSearch);
    return () => window.removeEventListener("popstate", syncSearch);
  }, []);

  function updateFilter(key: string, value: string, replace = false) {
    const url = new URL(window.location.href);
    if (value) url.searchParams.set(key, value);
    else url.searchParams.delete(key);
    if (replace) window.history.replaceState(null, "", url);
    else window.history.pushState(null, "", url);
  }

  function clearFilters() {
    const url = new URL(window.location.href);
    ["search", "category", "destination"].forEach((key) => url.searchParams.delete(key));
    setSearch("");
    window.history.pushState(null, "", url);
  }

  const items = filterExperiences(experiences, filters);
  const invalid = getInvalidFilters(experiences, filters);
  const categoryValue = categories.find((item) => item.toLowerCase() === filters.category.toLowerCase()) ?? "";
  const destinationValue = countries.find((item) => item.toLowerCase() === filters.destination.toLowerCase()) ?? "";

  return (
    <main>
      <section className="explorer-intro"><div className="container">
        <p className="eyebrow">YOUR NEXT STORY STARTS HERE</p>
        <h1>Find something extraordinary.</h1>
        <p>Discover local experiences, unforgettable places, and moments worth sharing.</p>
      </div></section>
      <section className="container explorer-content">
        <div className="filters">
          <label className="search-field">Search experiences
            <input type="search" placeholder="Try sailing, street food..." value={search}
              onChange={(event) => { setSearch(event.target.value); updateFilter("search", event.target.value, true); }} />
          </label>
          <label>Category
            <select value={categoryValue} onChange={(event) => updateFilter("category", event.target.value.toLowerCase())}>
              <option value="">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label>Destination
            <select value={destinationValue} onChange={(event) => updateFilter("destination", event.target.value)}>
              <option value="">All countries</option>
              {countries.map((country) => <option key={country} value={country}>{country}</option>)}
            </select>
          </label>
          <button type="button" className="clear-button" onClick={clearFilters}>Clear filters</button>
        </div>
        {invalid.length > 0 && <p className="notice" role="alert">Unknown {invalid.join(" and ")} filter. Clear filters or choose a valid option.</p>}
        <div className="section-heading"><div><p className="eyebrow">EXPLORE THE WORLD</p><h2>Experiences for you</h2></div>
          <p aria-live="polite">{items.length} {items.length === 1 ? "experience" : "experiences"}</p>
        </div>
        {items.length ? <ExperienceGrid items={items} favorites={favorites} onToggle={onToggle} /> :
          <div className="empty"><h2>No results found</h2><p>Try a different search or clear your filters.</p><button className="button" type="button" onClick={clearFilters}>Clear filters</button></div>}
      </section>
    </main>
  );
}
