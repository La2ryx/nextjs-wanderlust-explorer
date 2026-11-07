import { categories, type Experience } from "../types/experience";
import { adriaticImage, categoryImages } from "./experience-images";

type Destination = {
  city: string;
  country: string;
  titles: [string, string, string, string, string];
};

const destinations: Destination[] = [
  { city: "Split", country: "Croatia", titles: ["Sailing the Adriatic Islands", "Diocletian's Palace Walk", "Dalmatian Kitchen Table", "Seaside Sunset Yoga", "Marjan Forest Discovery"] },
  { city: "Bangkok", country: "Thailand", titles: ["Bangkok Canal Kayaking", "Temples of Old Bangkok", "Bangkok Street Food Walk", "Thai Massage and Mindfulness", "Bang Krachao Green Escape"] },
  { city: "Kyoto", country: "Japan", titles: ["Kyoto Hillside Cycling", "Kyoto Tea Ceremony", "Nishiki Market Tasting", "Zen Garden Meditation", "Arashiyama Bamboo Walk"] },
  { city: "Lisbon", country: "Portugal", titles: ["Lisbon Coast Surfing", "Alfama Stories and Tiles", "Lisbon Pastry Workshop", "Riverside Morning Yoga", "Arrabida Coastal Nature Walk"] },
  { city: "Marrakech", country: "Morocco", titles: ["Atlas Mountain Trek", "Marrakech Medina Stories", "Moroccan Cooking Workshop", "Marrakech Hammam Ritual", "Ourika Valley Gardens"] },
  { city: "Reykjavik", country: "Iceland", titles: ["Iceland Glacier Hike", "Reykjavik Art and Folklore", "Icelandic Food Tasting", "Geothermal Lagoon Relaxation", "Iceland Waterfall Discovery"] },
  { city: "Cusco", country: "Peru", titles: ["Sacred Valley Mountain Biking", "Cusco Heritage Walk", "Peruvian Market and Cooking", "Andean Mindfulness Session", "Sacred Valley Nature Walk"] },
  { city: "Cape Town", country: "South Africa", titles: ["Cape Town Coastal Kayak", "Bo-Kaap Culture Walk", "Cape Malay Cooking Class", "Cape Town Beach Yoga", "Cape Peninsula Wildlife Walk"] },
  { city: "Rome", country: "Italy", titles: ["Rome Countryside Cycling", "Ancient Rome History Walk", "Roman Pasta Making", "Villa Borghese Yoga", "Appian Way Nature Walk"] },
  { city: "Barcelona", country: "Spain", titles: ["Barcelona Seaside Paddle", "Barcelona Architecture Walk", "Catalan Tapas Workshop", "Mediterranean Sound Bath", "Montseny Forest Walk"] },
  { city: "Istanbul", country: "Turkiye", titles: ["Bosphorus Kayaking", "Istanbul Heritage Walk", "Istanbul Spice Market Tasting", "Turkish Bath Relaxation", "Belgrad Forest Discovery"] },
  { city: "Queenstown", country: "New Zealand", titles: ["Queenstown Canyon Adventure", "Queenstown Local Stories", "Central Otago Farm Tasting", "Alpine Stretch and Breathe", "Lake Wakatipu Nature Walk"] },
  { city: "Vancouver", country: "Canada", titles: ["Vancouver Harbour Kayaking", "Vancouver Art and Heritage", "Granville Island Food Tour", "Pacific Coast Yoga", "Stanley Park Nature Walk"] },
  { city: "Mexico City", country: "Mexico", titles: ["Mexico City Volcano Hike", "Mexico City Mural Stories", "Mexico City Taco Walk", "Chapultepec Mindfulness", "Xochimilco Wetland Discovery"] },
  { city: "Cairo", country: "Egypt", titles: ["Cairo Desert Adventure", "Cairo Ancient History Walk", "Egyptian Home Cooking", "Nile Riverside Yoga", "Nile Birdwatching Walk"] },
  { city: "Ubud", country: "Indonesia", titles: ["Bali River Rafting", "Ubud Village Traditions", "Balinese Cooking Workshop", "Ubud Sunrise Yoga", "Bali Rice Terrace Walk"] },
  { city: "Athens", country: "Greece", titles: ["Athens Coastal Cycling", "Athens Mythology Walk", "Greek Meze Workshop", "Athens Rooftop Yoga", "Hymettus Mountain Nature Walk"] },
  { city: "Sydney", country: "Australia", titles: ["Sydney Harbour Sailing", "Sydney Aboriginal Culture Walk", "Sydney Market Tasting", "Bondi Beach Yoga", "Blue Mountains Nature Walk"] },
  { city: "Hanoi", country: "Vietnam", titles: ["Hanoi Countryside Cycling", "Hanoi Old Quarter Stories", "Hanoi Street Food Walk", "Hanoi Morning Tai Chi", "Red River Wetland Walk"] },
  { city: "Edinburgh", country: "United Kingdom", titles: ["Edinburgh Hillside Hike", "Edinburgh Old Town Stories", "Scottish Food Tasting", "Edinburgh Garden Meditation", "Arthur's Seat Nature Walk"] },
];

const descriptions: Record<(typeof categories)[number], string> = {
  Adventure: "Get moving on an active outing with a local guide and discover a different side of the destination.",
  Culture: "Explore local stories, heritage, and traditions with a guide who knows the area.",
  Food: "Discover local flavors and food traditions on a relaxed culinary experience.",
  Wellness: "Slow down and make time to recharge in a peaceful local setting.",
  Nature: "Spend time outdoors and discover the landscapes and wildlife of the area.",
};

export const experiences: Experience[] = destinations.flatMap((place, placeIndex) =>
  categories.map((category, categoryIndex) => ({
    id: `${place.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${category.toLowerCase()}`,
    title: place.titles[categoryIndex],
    description: `${descriptions[category]} This experience takes place in and around ${place.city}, ${place.country}.`,
    category,
    city: place.city,
    country: place.country,
    destination: `${place.city}, ${place.country}`,
    price: 35 + ((placeIndex * 13 + categoryIndex * 17) % 116),
    rating: Number((4.2 + ((placeIndex + categoryIndex) % 9) / 10).toFixed(1)),
    imageUrl: place.city === "Split" && category === "Adventure" ? adriaticImage.url : categoryImages[category].url,
    imageAlt: place.city === "Split" && category === "Adventure" ? adriaticImage.alt : categoryImages[category].alt,
  })),
);
