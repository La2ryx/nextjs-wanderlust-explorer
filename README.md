# Wanderlust Explorer

A Next.js travel discovery demo with 100 locally generated experiences.

## Getting started

Install Node.js 20.9 or newer, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run lint`, `npm test`, and `npm run build` for quality checks. The automated Node test suite validates the 100-item dataset and URL filter logic.

## Browser regression tests

Install Chromium once with `npx playwright install chromium`, then run `npm run test:e2e`.
On Linux, if browser system libraries are missing, run `npx playwright install-deps chromium`.
The suite builds the app and starts its own production server on port 3100. It checks desktop and mobile layouts,
all routes, URL prefill and reload, rapid typing, combined filters, sorting, browser
back/forward, empty states, and shared favorites. Every test also checks for browser
errors and hydration warnings; these warnings are not suppressed by the app.

In Codespaces, open forwarded port **3000** to use the app, not a VS Code internal port.
If a hydration warning appears only in your usual browser, compare with an
extension-free private window and inspect the reported attribute diff.
Grammarly's `data-new-gr-c-s-check-loaded` and `data-gr-ext-installed` attributes
are extension-injected, not app-generated. Disable that extension for this site
instead of hiding all root hydration warnings.
The dev configuration allows local loopback and this Codespace's exact forwarded
port-3000 hostname for hot reload, without allowing every Codespaces origin.

## Features

- Browse experiences by title, category, city or country, minimum rating, and sort order at `/experiences`. All controls are shareable in the URL, for example `/experiences?search=sailing&category=adventure&destination=Croatia&rating=4.5&sort=price-asc`. Destination also accepts a full value such as `Split, Croatia`. Search treats input as literal text using an escaped case-insensitive regular expression.
- `src/hooks/useExperiences.ts` synchronizes controls with the URL using Next.js navigation and optimistic updates. Search replaces the current history entry; other filters push entries for back/forward navigation. Clearing filters preserves unrelated query parameters.
- Visit an experience's detail page, save or remove favorites, and view the saved count on the profile page.
- Favorites are held in React state and last only until the page is refreshed. There is no account, booking service, or persistence.
- The local dataset is in `src/data/experiences.ts`. Every experience includes a stable ID, category, city, country, destination, description, duration, group size, highlights, USD price per person, rating out of five, and an image URL and description. Photographs are illustrative, not photographs of the listed experiences; most are shared by category.

## Design References

The design direction was informed by real travel-discovery interfaces: [Viator](https://www.viator.com/), [GetYourGuide](https://www.getyourguide.com/), and [Visit A City](https://www.visitacity.com/). Their use of destination discovery, experience cards, prominent imagery, and clear trip details informed the visual approach. The interface is an original design; no images or assets were copied from those sites or from Airbnb.

## Photography credits

The following illustrative images are used under the [Unsplash License](https://unsplash.com/license):

- [Lawrence Chismorie — sailboat near Split](https://unsplash.com/photos/a-sailboat-in-the-middle-of-a-body-of-water-Dbn-pmq44Q0)
- [Mads Leif Hansen — hiking trail in Norway](https://unsplash.com/photos/hiking-trail-through-green-mountain-landscape-fIE-kIfsk7k)
- [Lens by Benji — Paris street](https://unsplash.com/photos/busy-city-street-with-blurred-cars-people-and-historic-buildings-3MeoZXyOJwI)
- [Rendy Novantino — market food stall](https://unsplash.com/photos/people-serving-food-at-market-stall-1a7FnF6J15g)
- [Alena Tretiakova — yoga by a lake](https://unsplash.com/photos/people-practicing-yoga-by-lake-Z4rh_4uUYYw)
- [Hugo Delauney — forest](https://unsplash.com/photos/landscape-photography-of-forest-0O4C9qtn_48)
