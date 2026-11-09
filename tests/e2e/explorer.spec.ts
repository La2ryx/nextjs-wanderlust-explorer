import { expect, test, type Page } from "@playwright/test";
import { experiences } from "../../src/data/experiences";

const browserErrors = new WeakMap<Page, string[]>();

test.beforeEach(async ({ page }) => {
  const errors: string[] = [];
  browserErrors.set(page, errors);
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test.afterEach(async ({ page }) => {
  expect(browserErrors.get(page)).toEqual([]);
});

test("all routes are navigable, with active links and no horizontal overflow", async ({ page }) => {
  for (const [name, path] of [["Explore", "/experiences"], ["Favorites", "/favorites"], ["Profile", "/profile"], ["Home", "/"]]) {
    await page.getByRole("navigation").getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`${path}$`));
    await expect(page.getByRole("navigation").getByRole("link", { name, exact: true })).toHaveAttribute("aria-current", "page");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.getByRole("link", { name: "Explore experiences", exact: false }).first().click();
  await expect(page.locator(".card")).toHaveCount(100);
});

test("shared URLs prefill all controls, filter results and survive reload", async ({ page }) => {
  await page.goto("/experiences?search=SAILING&category=Adventure&destination=Croatia&rating=4&sort=price-asc");
  await expect(page.getByRole("searchbox")).toHaveValue("SAILING");
  await expect(page.getByLabel("Category", { exact: true })).toHaveValue("Adventure");
  await expect(page.getByLabel("Destination", { exact: true })).toHaveValue("Croatia");
  await expect(page.getByLabel("Minimum rating")).toHaveValue("4");
  await expect(page.getByLabel("Sort experiences")).toHaveValue("price-asc");
  await expect(page.locator(".card")).toHaveCount(1);
  await expect(page.locator(".card h3")).toHaveText("Sailing the Adriatic Islands");
  await page.reload();
  await expect(page.getByRole("searchbox")).toHaveValue("SAILING");
  await expect(page.locator(".card")).toHaveCount(1);
});

test("city and full destination URLs prefill the destination control", async ({ page }) => {
  for (const destination of ["SPLIT", "Split, Croatia"]) {
    await page.goto(`/experiences?destination=${encodeURIComponent(destination)}`);
    await expect(page.getByLabel("Destination", { exact: true })).toHaveValue("Split");
    await expect(page.locator(".card")).toHaveCount(5);
    await expect(page.getByRole("main").getByRole("alert")).toHaveCount(0);
  }
  await page.getByLabel("Destination", { exact: true }).selectOption("Kyoto");
  await expect(page).toHaveURL(/destination=Kyoto/);
  await expect(page.locator(".card")).toHaveCount(5);
});

test("rapid typing and combined controls preserve the latest query", async ({ page }) => {
  await page.goto("/experiences?source=shared");
  const search = page.getByRole("searchbox");
  await search.pressSequentially("sailing", { delay: 10 });
  await page.getByLabel("Category", { exact: true }).selectOption("Adventure");
  await page.getByLabel("Destination", { exact: true }).selectOption("Croatia");
  await expect(search).toHaveValue("sailing");
  await expect.poll(() => new URL(page.url()).searchParams.get("search")).toBe("sailing");
  await expect.poll(() => new URL(page.url()).searchParams.get("category")).toBe("adventure");
  await expect.poll(() => new URL(page.url()).searchParams.get("destination")).toBe("Croatia");
  expect(new URL(page.url()).searchParams.get("source")).toBe("shared");
  await expect(page.locator(".card")).toHaveCount(1);
  await page.locator(".filters").getByRole("button", { name: "Clear filters", exact: true }).click();
  await expect(page).toHaveURL(/\/experiences\?source=shared$/);
  await expect(search).toHaveValue("");
  await expect(page.locator(".card")).toHaveCount(100);
});

test("back and forward synchronize controls and results", async ({ page }) => {
  await page.goto("/experiences");
  await page.getByLabel("Category", { exact: true }).selectOption("Food");
  await expect(page).toHaveURL(/category=food/);
  await page.getByLabel("Destination", { exact: true }).selectOption("Japan");
  await expect(page).toHaveURL(/destination=Japan/);
  await expect(page.locator(".card")).toHaveCount(1);
  await page.goBack();
  await expect(page.getByLabel("Destination", { exact: true })).toHaveValue("");
  await expect(page.locator(".card")).toHaveCount(20);
  await page.goBack();
  await expect(page.getByLabel("Category", { exact: true })).toHaveValue("");
  await expect(page.locator(".card")).toHaveCount(100);
  await page.goForward();
  await expect(page.getByLabel("Category", { exact: true })).toHaveValue("Food");
  await expect(page.locator(".card")).toHaveCount(20);
});

test("regex characters are literal, and invalid filters show actionable feedback", async ({ page }) => {
  await page.goto("/experiences");
  await page.getByRole("searchbox").fill("[(*");
  await expect(page.getByRole("heading", { name: "No results found" })).toBeVisible();
  await page.goto("/experiences?category=Space&destination=Atlantis&rating=NaN");
  await expect(page.getByRole("main").getByRole("alert")).toContainText("Unknown category and destination and rating filter");
  await page.locator(".filters").getByRole("button", { name: "Clear filters" }).click();
  await expect(page).toHaveURL(/\/experiences$/);
  await expect(page.locator(".card")).toHaveCount(100);
});

test("sort and rating controls match the dataset", async ({ page }) => {
  await page.goto("/experiences?rating=4.8&sort=price-asc");
  const expected = experiences.filter(({ rating }) => rating >= 4.8).sort((a, b) => a.price - b.price || a.title.localeCompare(b.title));
  await expect(page.locator(".card h3")).toHaveText(expected.map(({ title }) => title));
  await page.getByLabel("Sort experiences").selectOption("price-desc");
  await expect(page.locator(".card h3")).toHaveText([...expected].sort((a, b) => b.price - a.price || a.title.localeCompare(b.title)).map(({ title }) => title));
});

test("favorites synchronize across cards, detail, favorites and profile", async ({ page }) => {
  await page.goto("/experiences?search=sailing&category=adventure&destination=Croatia");
  const title = experiences[0].title;
  await page.getByRole("button", { name: `Add ${title} to favorites`, exact: true }).click();
  await expect(page.getByRole("button", { name: `Remove ${title} from favorites`, exact: true })).toHaveAttribute("aria-pressed", "true");
  await page.locator(".card h3 a").click();
  await expect(page).toHaveURL(/\/experiences\/split-adventure\?/);
  await expect(page.getByRole("navigation").getByRole("link", { name: "Explore", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.getByText("Saved to favorites", { exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole("link", { name: "Back to experiences", exact: false }).click();
  await expect(page).toHaveURL(/\/experiences\?search=sailing&category=adventure&destination=Croatia$/);
  await expect(page.locator(".card")).toHaveCount(1);
  await page.getByRole("navigation").getByRole("link", { name: "Profile", exact: true }).click();
  await expect(page.getByText("1 saved experience", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: /View favorites/ }).click();
  await expect(page.locator(".card")).toHaveCount(1);
  await page.getByRole("button", { name: `Remove ${title} from favorites`, exact: true }).click();
  await expect(page.getByRole("heading", { name: "No favorites yet" })).toBeVisible();
});
