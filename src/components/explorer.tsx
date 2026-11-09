"use client";

import { experiences } from "@/data/experiences";
import { useExperiences } from "@/hooks/useExperiences";
import { categories } from "@/types/experience";
import { ExperienceGrid } from "./experience-card";

const countries = [...new Set(experiences.map((item) => item.country))].sort();
const cities = [...new Set(experiences.map((item) => item.city))].sort();

export function Explorer({ favorites, onToggle }: { favorites: string[]; onToggle: (id: string) => void }) {
  const { filters, sort, minRating, items, invalid, returnTo, setParam, clearFilters } = useExperiences();
  const categoryValue = categories.find((item) => item.toLowerCase() === filters.category.trim().toLowerCase()) ?? "";
  const destination = filters.destination.trim().toLowerCase();
  const destinationValue = [...countries, ...cities].find((item) => item.toLowerCase() === destination)
    ?? experiences.find((item) => item.destination.toLowerCase() === destination)?.city
    ?? "";

  return (
    <main id="main-content" tabIndex={-1}>
      <section className="explorer-intro"><div className="container">
        <p className="eyebrow">YOUR NEXT STORY STARTS HERE</p>
        <h1>Find something extraordinary.</h1>
        <p>Discover local experiences, unforgettable places, and moments worth sharing.</p>
      </div></section>
      <section className="container explorer-content">
        <div className="filters">
          <label className="search-field">Search experiences
            <input type="search" placeholder="Try sailing, street food..." value={filters.search}
              onChange={(event) => setParam("search", event.target.value, true)} />
          </label>
          <label htmlFor="experience-category"><span id="experience-category-label">Category</span>
            <select id="experience-category" aria-labelledby="experience-category-label" value={categoryValue} onChange={(event) => setParam("category", event.target.value.toLowerCase())}>
              <option value="">All categories</option>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </label>
          <label htmlFor="experience-destination"><span id="experience-destination-label">Destination</span>
            <select id="experience-destination" aria-labelledby="experience-destination-label" value={destinationValue} onChange={(event) => setParam("destination", event.target.value)}>
              <option value="">All destinations</option>
              <optgroup label="Countries">
                {countries.map((country) => <option key={country} value={country}>{country}</option>)}
              </optgroup>
              <optgroup label="Cities">
                {cities.map((city) => <option key={city} value={city}>{city}</option>)}
              </optgroup>
            </select>
          </label>
          <label>Minimum rating
            <select aria-label="Minimum rating" value={minRating} onChange={(event) => setParam("rating", event.target.value)}>
              <option value="">Any rating</option>
              <option value="4">4+ stars</option>
              <option value="4.5">4.5+ stars</option>
              <option value="4.8">4.8+ stars</option>
            </select>
          </label>
          <label>Sort by
            <select aria-label="Sort experiences" value={sort} onChange={(event) => setParam("sort", event.target.value === "recommended" ? "" : event.target.value)}>
              <option value="recommended">Recommended</option>
              <option value="rating">Top rated</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </label>
          <button type="button" className="clear-button" onClick={clearFilters}>Clear filters</button>
        </div>
        {invalid.length > 0 && <p className="notice" role="alert">Unknown {invalid.join(" and ")} filter. Clear filters or choose a valid option.</p>}
        <div className="section-heading"><div><p className="eyebrow">EXPLORE THE WORLD</p><h2>Experiences for you</h2></div>
          <p aria-live="polite">{items.length} {items.length === 1 ? "experience" : "experiences"}</p>
        </div>
        {items.length ? <ExperienceGrid items={items} favorites={favorites} onToggle={onToggle} returnTo={returnTo} /> :
          <div className="empty"><h2>No results found</h2><p>Try a different search or clear your filters.</p><button className="button" type="button" onClick={clearFilters}>Clear filters</button></div>}
      </section>
    </main>
  );
}
