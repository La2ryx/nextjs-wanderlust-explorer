"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import type { Experience } from "@/types/experience";
import { FavoriteButton } from "./experience-card";
import { ExperienceBackLink } from "./experience-back-link";

export function ExperienceDetail({ experience, favorites = [], onToggle = () => undefined }: { experience: Experience; favorites?: string[]; onToggle?: (id: string) => void }) {
  const favorite = favorites.includes(experience.id);
  return (
    <main id="main-content" tabIndex={-1} className="container detail">
      <Suspense fallback={<Link href="/experiences" className="text-link">← Back to experiences</Link>}><ExperienceBackLink /></Suspense>
      <article className="detail-layout">
        <figure><Image className="detail-image" src={experience.imageUrl} alt={experience.imageAlt} width={1200} height={900} /><figcaption className="photo-caption">Illustrative photo; not a photograph of the listed experience.</figcaption></figure>
        <div><p className="eyebrow">{experience.category} · {experience.destination}</p><h1>{experience.title}</h1>
          <p className="rating">★ {experience.rating.toFixed(1)} / 5 <span className="review-note">Guest rating</span></p><p>{experience.description}</p>
          <div className="detail-facts"><span><strong>{experience.duration}</strong>Duration</span><span><strong>Up to {experience.groupSize} guests</strong>Group size</span><span><strong>From ${experience.price}</strong>Per person</span></div>
          <h2 className="detail-highlights-title">What you&apos;ll enjoy</h2><ul className="detail-highlights">{experience.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
          <div className="detail-actions"><FavoriteButton id={experience.id} title={experience.title} isFavorite={favorite} onToggle={onToggle} /><span>{favorite ? "Saved to favorites" : "Save this experience"}</span></div>
        </div>
      </article>
    </main>
  );
}
