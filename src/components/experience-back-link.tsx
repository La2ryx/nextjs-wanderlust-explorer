"use client";

"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export function ExperienceBackLink() {
  const searchParams = useSearchParams();
  const returnTo = searchParams.get("returnTo");
  const href = returnTo?.startsWith("?") ? `/experiences${returnTo}` : "/experiences";
  return <Link className="text-link" href={href}>← Back to experiences</Link>;
}
