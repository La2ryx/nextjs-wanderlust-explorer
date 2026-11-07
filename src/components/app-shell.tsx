"use client";

import { Suspense, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { experiences } from "@/data/experiences";
import { adriaticImage } from "@/data/experience-images";
import { ExperienceGrid, FavoriteButton } from "./experience-card";
import { Explorer } from "./explorer";

const links = [
  { href: "/", label: "Home" },
  { href: "/experiences", label: "Explore" },
  { href: "/favorites", label: "Favorites" },
  { href: "/profile", label: "Profile" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const pathname = usePathname();
  function toggleFavorite(id: string) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  const detail = pathname.startsWith("/experiences/")
    ? experiences.find((item) => `/experiences/${item.id}` === pathname)
    : undefined;
  const saved = experiences.filter((item) => favorites.includes(item.id));

  return (
    <>
      <header className="site-header"><nav className="container nav" aria-label="Main navigation">
        <Link className="brand" href="/"><span className="brand-mark">✳</span> wanderlust<span>.</span></Link>
        <div className="nav-links">{links.map(({ href, label }) => {
          const active = pathname === href || (href === "/experiences" && pathname.startsWith("/experiences/"));
          return <Link key={href} href={href} className={active ? "active" : ""} aria-current={active ? "page" : undefined}>{label}{href === "/favorites" && favorites.length > 0 ? ` (${favorites.length})` : ""}</Link>;
        })}</div>
      </nav></header>
      {pathname === "/" && <main>
        <section className="hero"><div className="container hero-inner"><div className="hero-copy">
          <p className="eyebrow">THE WORLD IS WAITING</p>
          <h1>Collect moments, <em>not things.</em></h1>
          <p>Find experiences that bring you closer to the places, people, and stories that make travel unforgettable.</p>
          <Link className="button" href="/experiences">Explore experiences <span aria-hidden="true">→</span></Link>
          <div className="hero-notes"><span>✦ 100 curated experiences</span><span>✦ Adventures around the world</span></div>
        </div><div className="hero-art"><Image src={adriaticImage.url} alt={adriaticImage.alt} width={1200} height={900} priority /><div className="hero-art-label">A little more wonder,<br /><strong>wherever you wander.</strong></div></div></div></section>
        <section className="container featured"><div className="section-heading"><div><p className="eyebrow">GET INSPIRED</p><h2>Find your kind of adventure</h2></div><Link className="text-link" href="/experiences">See all experiences →</Link></div>
          <ExperienceGrid items={experiences.slice(0, 3)} favorites={favorites} onToggle={toggleFavorite} />
        </section>
      </main>}
      {pathname === "/experiences" && <Suspense fallback={<main className="container"><p>Loading experiences...</p></main>}><Explorer favorites={favorites} onToggle={toggleFavorite} /></Suspense>}
      {detail && <main className="container detail">
        <Link className="text-link" href="/experiences">← Back to experiences</Link>
        <div className="detail-layout"><figure><Image className="detail-image" src={detail.imageUrl} alt={detail.imageAlt} width={1200} height={900} /><figcaption className="photo-caption">Illustrative photo; not a photograph of the listed experience.</figcaption></figure>
          <div><p className="eyebrow">{detail.category} · {detail.destination}</p><h1>{detail.title}</h1>
            <p className="rating">★ {detail.rating.toFixed(1)} / 5</p><p>{detail.description}</p>
            <p className="detail-price">From <strong>${detail.price}</strong> / person</p>
            <div className="detail-actions"><FavoriteButton id={detail.id} title={detail.title} isFavorite={favorites.includes(detail.id)} onToggle={toggleFavorite} /><span>{favorites.includes(detail.id) ? "Saved to favorites" : "Save this experience"}</span></div>
          </div></div>
      </main>}
      {pathname === "/favorites" && <main className="container page-content"><p className="eyebrow">YOUR COLLECTION</p><h1>Saved for later.</h1><p>Keep the experiences you love in one place.</p>
        {saved.length ? <ExperienceGrid items={saved} favorites={favorites} onToggle={toggleFavorite} /> : <div className="empty"><h2>No favorites yet</h2><p>Tap the heart on an experience to save it here.</p><Link className="button" href="/experiences">Explore experiences</Link></div>}
      </main>}
      {pathname === "/profile" && <main className="container page-content"><p className="eyebrow">YOUR PROFILE</p><h1>Welcome, explorer.</h1><div className="profile-card"><div className="avatar" aria-hidden="true">W</div><div><h2>Wanderlust Explorer</h2><p>Curious traveler · Adventure seeker</p><p><strong>{favorites.length}</strong> saved {favorites.length === 1 ? "experience" : "experiences"}</p><Link className="text-link" href="/favorites">View favorites →</Link></div></div></main>}
      {children}
      <footer><div className="container footer-inner"><span className="brand">✳ wanderlust.</span><span>Find a little more wonder in the world.</span></div></footer>
    </>
  );
}
