# Wanderlust Explorer

A Next.js travel discovery demo with 100 locally generated experiences.

## Getting started

Install Node.js 20.9 or newer, then run:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run lint`, `npm test`, and `npm run build` for quality checks. The automated Node test suite validates the 100-item dataset and URL filter logic.

## Features

- Browse experiences by title, category, country, minimum rating, and sort order at `/experiences`. All controls are shareable in the URL, for example `/experiences?search=sailing&category=adventure&destination=Croatia&rating=4.5&sort=price-asc`. Search treats input as literal text using an escaped case-insensitive regular expression.
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
