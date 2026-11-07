import Image from "next/image";
import Link from "next/link";
import type { Experience } from "@/types/experience";

export function FavoriteButton({ id, title, isFavorite, onToggle }: {
  id: string;
  title: string;
  isFavorite: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <button className={`heart ${isFavorite ? "heart-active" : ""}`} type="button"
      aria-label={`${isFavorite ? "Remove" : "Add"} ${title} ${isFavorite ? "from" : "to"} favorites`}
      aria-pressed={isFavorite} onClick={() => onToggle(id)}>
      {isFavorite ? "♥" : "♡"}
    </button>
  );
}

export function ExperienceCard({ experience, isFavorite, onToggle }: {
  experience: Experience;
  isFavorite: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <article className="card">
      <div className="card-image">
        <Link href={`/experiences/${experience.id}`} tabIndex={-1} aria-hidden="true">
          <Image src={experience.imageUrl} alt="" width={800} height={600} />
        </Link>
        <FavoriteButton id={experience.id} title={experience.title} isFavorite={isFavorite} onToggle={onToggle} />
        <span className="category-badge">{experience.category}</span>
      </div>
      <div className="card-body">
        <p className="location">{experience.destination}</p>
        <h3><Link href={`/experiences/${experience.id}`}>{experience.title}</Link></h3>
        <div className="card-bottom"><span>★ {experience.rating.toFixed(1)}</span><span>From <strong>${experience.price}</strong> / person</span></div>
      </div>
    </article>
  );
}

export function ExperienceGrid({ items, favorites, onToggle }: {
  items: Experience[];
  favorites: string[];
  onToggle: (id: string) => void;
}) {
  return <div className="grid">{items.map((item) => (
    <ExperienceCard key={item.id} experience={item} isFavorite={favorites.includes(item.id)} onToggle={onToggle} />
  ))}</div>;
}
