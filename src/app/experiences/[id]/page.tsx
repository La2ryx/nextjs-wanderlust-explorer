import { notFound } from "next/navigation";
import { experiences } from "@/data/experiences";

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
