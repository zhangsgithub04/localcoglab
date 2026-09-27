import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Timer, Gauge, Layers } from "lucide-react";
import { getLab, getLabs } from "@/lib/data";
import { categories } from "@/lib/labs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const labs = await getLabs();
  return labs.map((lab) => ({ slug: lab.slug }));
}

export default async function LabPage({ params }: Props) {
  const { slug } = await params;
  const lab = await getLab(slug);

  if (!lab) notFound();

  const category = categories.find((item) => item.name === lab.category);
  const related = (await getLabs()).filter((item) => item.category === lab.category && item.slug !== lab.slug).slice(0, 4);

  return (
    <main className="detail-shell">
      <Link className="back-link" href="/">
        <ArrowLeft aria-hidden="true" size={18} /> Back to catalog
      </Link>

      <section className="detail-hero" style={{ "--accent": category?.color ?? "#2f9c95" } as React.CSSProperties}>
        <p className="eyebrow">{lab.category}</p>
        <h1>{lab.title}</h1>
        <p className="detail-summary">{lab.summary}</p>

        <div className="detail-metrics" aria-label="Lab details">
          <span><Timer size={18} aria-hidden="true" /> {lab.estimatedMinutes} min</span>
          <span><Gauge size={18} aria-hidden="true" /> {lab.difficulty}</span>
          <span><Layers size={18} aria-hidden="true" /> {lab.format}</span>
        </div>

        <div className="concept-row">
          {lab.concepts.map((concept) => (
            <span key={concept}>{concept}</span>
          ))}
        </div>

        <a className="primary-link" href={lab.sourcePath} target="_blank" rel="noreferrer">
          Open original CogLab lab <ExternalLink size={18} aria-hidden="true" />
        </a>
      </section>

      <section className="detail-grid">
        <div>
          <h2>Why It Matters</h2>
          <p>
            This lab belongs to the {lab.category.toLowerCase()} cluster, where students can connect observable behavior
            to a specific cognitive mechanism. The redesigned catalog surfaces the lab's role, duration, and nearby
            topics before students leave for the original experiment.
          </p>
        </div>
        <div>
          <h2>Use In Class</h2>
          <p>
            Pair this activity with a short prediction prompt, then compare individual outcomes with class-level patterns.
            The metadata here is designed to help instructors pick labs by time, topic, and cognitive process.
          </p>
        </div>
      </section>

      {related.length > 0 && (
        <section className="related">
          <h2>Nearby Labs</h2>
          <div className="related-list">
            {related.map((item) => (
              <Link href={`/labs/${item.slug}`} key={item.slug}>
                <span>{item.title}</span>
                <small>{item.estimatedMinutes} min</small>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
