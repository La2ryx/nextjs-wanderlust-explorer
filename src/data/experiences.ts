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

const experienceDetails: Record<(typeof categories)[number], { description: string; duration: string; groupSize: number; highlights: [string, string, string] }> = {
  Adventure: { description: "Trade the usual sightseeing route for an active, small-group outing. Your local host shares practical tips and favorite viewpoints along the way.", duration: "3 hours", groupSize: 8, highlights: ["Local expert guide", "Small-group pace", "All essential equipment"] },
  Culture: { description: "Get beyond the guidebook with neighborhood stories, thoughtful context, and time to notice the details most visitors pass by.", duration: "2.5 hours", groupSize: 10, highlights: ["Stories from a local host", "Historic neighborhood stops", "Time for questions and photos"] },
  Food: { description: "Meet the flavors of the neighborhood through a hosted tasting, local ingredients, and the traditions behind each delicious stop.", duration: "3 hours", groupSize: 8, highlights: ["Multiple local tastings", "Meet neighborhood makers", "Dietary needs welcomed"] },
  Wellness: { description: "Leave room in your itinerary to reset with a welcoming local practitioner in a restorative setting away from the crowds.", duration: "90 minutes", groupSize: 6, highlights: ["Experienced local instructor", "Beginner-friendly session", "Equipment provided"] },
  Nature: { description: "Step into a quieter landscape with a knowledgeable local, following scenic paths and learning about the habitat as you go.", duration: "3.5 hours", groupSize: 8, highlights: ["Scenic local route", "Nature interpretation", "Small group experience"] },
};

export const experiences: Experience[] = destinations.flatMap((place, placeIndex) =>
  categories.map((category, categoryIndex) => {
    const title = place.titles[categoryIndex];
    const detail = experienceDetails[category];
    const distinctNote = category === "Food"
      ? `Explore the flavors of ${place.city}, from market-fresh ingredients to recipes rooted in ${place.country}'s food culture.`
      : category === "Culture"
        ? `Follow the layers of ${place.city}'s identity, connecting its landmarks and neighborhood stories to the wider history of ${place.country}.`
        : category === "Adventure"
          ? `Set out from ${place.city} for an active perspective on ${place.country}, with a route selected for its scenery and local character.`
          : category === "Wellness"
            ? `Find a calm corner of ${place.city} and enjoy a restorative pause inspired by local rhythms in ${place.country}.`
            : `Discover the landscapes around ${place.city}, with time to notice the plants, wildlife, and changing scenery of ${place.country}.`;
    return {
      id: `${place.city.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${category.toLowerCase()}`,
      title,
      description: `${detail.description} ${distinctNote} Your host will meet you in ${place.city}; the exact meeting point is shared after booking.`,
      category,
      city: place.city,
      country: place.country,
      destination: `${place.city}, ${place.country}`,
      price: 35 + ((placeIndex * 13 + categoryIndex * 17) % 116),
      rating: Number((4.2 + ((placeIndex + categoryIndex) % 9) / 10).toFixed(1)),
      imageUrl: place.city === "Split" && category === "Adventure" ? adriaticImage.url : categoryImages[category].url,
      imageAlt: place.city === "Split" && category === "Adventure" ? adriaticImage.alt : categoryImages[category].alt,
      duration: detail.duration,
      groupSize: detail.groupSize,
      highlights: [title, ...detail.highlights.slice(0, 2)] as [string, string, string],
    };
  }),
);
