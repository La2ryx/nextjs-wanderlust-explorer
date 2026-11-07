import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { experiences } from "@/data/experiences";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === id);
  if (!experience) return { title: "Experience not found | Wanderlust Explorer" };
  return { title: `${experience.title} | Wanderlust Explorer`, description: experience.description };
}

export default async function ExperiencePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  if (!experiences.some((experience) => experience.id === id)) notFound();
  return null;
}

export function generateStaticParams() {
  return experiences.map(({ id }) => ({ id }));
}
