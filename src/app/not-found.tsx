import Link from "next/link";

export default function NotFound() {
  return (
    <main className="container empty">
      <p className="eyebrow">Lost your way?</p>
      <h1>We couldn&apos;t find that page.</h1>
      <p>There are plenty of other experiences waiting for you.</p>
      <Link className="button" href="/experiences">Explore experiences</Link>
    </main>
  );
}
