import assert from "node:assert/strict";
import test from "node:test";
import { experiences } from "../src/data/experiences";
import { filterExperiences, getInvalidFilters } from "../src/lib/filter-experiences";

const emptyFilters = { search: "", category: "", destination: "" };

test("dataset contains 100 unique experiences across all five categories", () => {
  assert.equal(experiences.length, 100);
  assert.equal(new Set(experiences.map(({ id }) => id)).size, 100);
  assert.deepEqual(new Set(experiences.map(({ category }) => category)), new Set(["Adventure", "Culture", "Food", "Wellness", "Nature"]));
  assert.ok(experiences.every(({ duration, groupSize, highlights }) => duration && groupSize > 0 && highlights.length === 3));
});

test("literal case-insensitive title matching safely handles regex metacharacters", () => {
  const all = filterExperiences(experiences, emptyFilters);
  assert.equal(all.length, 100);
  assert.equal(filterExperiences(experiences, { ...emptyFilters, search: "SAILING" })[0]?.id, "split-adventure");
  assert.deepEqual(filterExperiences(experiences, { ...emptyFilters, search: "[" }), []);
});

test("category, country, title, and rating filters stack independently", () => {
  const result = filterExperiences(experiences, { search: "sailing", category: "adventure", destination: "Croatia", rating: "4" });
  assert.equal(result.length, 1);
  assert.equal(result[0].id, "split-adventure");
  assert.equal(filterExperiences(experiences, { ...emptyFilters, category: "Food", destination: "Japan" }).length, 1);
  assert.ok(filterExperiences(experiences, { ...emptyFilters, rating: "4.8" }).every(({ rating }) => rating >= 4.8));
});

test("unknown URL filters produce actionable validation results", () => {
  assert.deepEqual(getInvalidFilters(experiences, { ...emptyFilters, category: "Space", destination: "Atlantis", rating: "NaN" }), ["category", "destination", "rating"]);
  assert.deepEqual(getInvalidFilters(experiences, { ...emptyFilters, category: "culture", destination: "croatia" }), []);
});
