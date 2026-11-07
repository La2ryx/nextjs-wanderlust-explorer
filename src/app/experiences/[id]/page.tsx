import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { experiences } from "@/data/experiences";

// Experience detail content is rendered by the shared client shell; route params
// are validated separately and are not expected to block instant navigation.
export const instant = false;

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const experience = experiences.find((item) => item.id === id);
  if (!experience) return { title: "Experience not found | Wanderlust Explorer" };
  return { title: `${experience.title} | Wanderlust Explorer`, description: experience.description };
}

export default function ExperiencePage({ params }: PageProps<"/experiences/[id]">) {
  return (
    <Suspense fallback={null}>
      <ValidateExperience params={params} />
    </Suspense>
  );
}

async function ValidateExperience({ params }: Pick<PageProps<"/experiences/[id]">, "params">) {
  const { id } = await params;
  if (!experiences.some((experience) => experience.id === id)) notFound();
  return null;
}

export function generateStaticParams() {
  return experiences.map(({ id }) => ({ id }));
}
