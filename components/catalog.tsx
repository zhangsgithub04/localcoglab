"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpDown, BookOpen, Clock3, ExternalLink, Search, SlidersHorizontal, Sparkles } from "lucide-react";
import { categories, type Difficulty, type Lab } from "@/lib/labs";

type CatalogProps = {
  labs: Lab[];
};

type SortMode = "recommended" | "time" | "az";
type DifficultyFilter = "All" | Difficulty;

const difficultyOptions: DifficultyFilter[] = ["All", "Foundational", "Intermediate", "Advanced"];

export function Catalog({ labs }: CatalogProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("All");
  const [maxMinutes, setMaxMinutes] = useState(26);
  const [sortMode, setSortMode] = useState<SortMode>("recommended");

  const categoryCounts = useMemo(
    () =>
      categories.map((item) => ({
        ...item,
        count: labs.filter((lab) => lab.category === item.name).length
      })),
    [labs]
  );

  const filteredLabs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return labs
      .filter((lab) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          [lab.title, lab.category, lab.summary, lab.format, ...lab.concepts].join(" ").toLowerCase().includes(normalizedQuery);
        const matchesCategory = category === "All" || lab.category === category;
        const matchesDifficulty = difficulty === "All" || lab.difficulty === difficulty;
        const matchesTime = lab.estimatedMinutes <= maxMinutes;

        return matchesQuery && matchesCategory && matchesDifficulty && matchesTime;
      })
      .sort((a, b) => {
        if (sortMode === "az") return a.title.localeCompare(b.title);
        if (sortMode === "time") return a.estimatedMinutes - b.estimatedMinutes || a.order - b.order;
        return a.order - b.order;
      });
  }, [category, difficulty, labs, maxMinutes, query, sortMode]);

  const selectedCategory = categoryCounts.find((item) => item.name === category);
  const totalMinutes = filteredLabs.reduce((sum, lab) => sum + lab.estimatedMinutes, 0);

  return (
    <main>
      <section className="hero">
        <Image
          src="/images/cognition-lab-hero.png"
          alt=""
          priority
          fill
          sizes="100vw"
          className="hero-image"
        />
        <div className="hero-scrim" />
        <div className="hero-content">
          <p className="eyebrow"><Sparkles size={18} aria-hidden="true" /> Cognition lab explorer</p>
          <h1>Find the right CogLab experiment faster.</h1>
          <p>
            The same 55 labs from CogLab, reorganized into an interactive catalog for scanning by topic, time,
            difficulty, and classroom use.
          </p>
          <div className="hero-stats" aria-label="Catalog summary">
            <span><strong>{labs.length}</strong> labs</span>
            <span><strong>{categories.length}</strong> topics</span>
            <span><strong>{Math.round(labs.reduce((sum, lab) => sum + lab.estimatedMinutes, 0) / labs.length)}</strong> avg min</span>
          </div>
        </div>
      </section>

      <section className="workspace">
        <aside className="sidebar" aria-label="Catalog controls">
          <div className="control-header">
            <SlidersHorizontal size={20} aria-hidden="true" />
            <h2>Explore</h2>
          </div>

          <label className="search-box">
            <Search size={18} aria-hidden="true" />
            <span className="sr-only">Search labs</span>
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topic, task, concept" />
          </label>

          <div className="control-group">
            <span className="control-label">Topic</span>
            <div className="chip-list">
              <button className={category === "All" ? "active" : ""} onClick={() => setCategory("All")}>
                All
              </button>
              {categoryCounts.map((item) => (
                <button
                  key={item.name}
                  className={category === item.name ? "active" : ""}
                  onClick={() => setCategory(item.name)}
                  style={{ "--chip": item.color } as React.CSSProperties}
                >
                  {item.name}
                  <span>{item.count}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="control-group">
            <span className="control-label">Difficulty</span>
            <div className="segmented">
              {difficultyOptions.map((option) => (
                <button key={option} className={difficulty === option ? "active" : ""} onClick={() => setDifficulty(option)}>
                  {option}
                </button>
              ))}
            </div>
          </div>

          <label className="range-control">
            <span className="control-label">Max time: {maxMinutes} min</span>
            <input type="range" min="10" max="26" value={maxMinutes} onChange={(event) => setMaxMinutes(Number(event.target.value))} />
          </label>

          <div className="control-group">
            <span className="control-label">Sort</span>
            <div className="segmented">
              <button className={sortMode === "recommended" ? "active" : ""} onClick={() => setSortMode("recommended")}>
                Original
              </button>
              <button className={sortMode === "time" ? "active" : ""} onClick={() => setSortMode("time")}>
                Time
              </button>
              <button className={sortMode === "az" ? "active" : ""} onClick={() => setSortMode("az")}>
                A-Z
              </button>
            </div>
          </div>
        </aside>

        <section className="results">
          <div className="insight-row">
            <div className="result-summary">
              <p className="eyebrow">Current view</p>
              <h2>{filteredLabs.length} labs matched</h2>
              <p>{totalMinutes} estimated minutes across the visible set.</p>
            </div>

            <div className="category-viz" aria-label="Labs per topic">
              {categoryCounts.map((item) => (
                <button
                  key={item.name}
                  title={`${item.name}: ${item.count} labs`}
                  className={category === item.name ? "selected" : ""}
                  onClick={() => setCategory(category === item.name ? "All" : item.name)}
                  style={
                    {
                      "--height": `${Math.max(24, item.count * 13)}px`,
                      "--bar": item.color
                    } as React.CSSProperties
                  }
                >
                  <span />
                  <small>{item.count}</small>
                </button>
              ))}
            </div>
          </div>

          {selectedCategory && (
            <div className="topic-banner" style={{ "--accent": selectedCategory.color } as React.CSSProperties}>
              <BookOpen size={20} aria-hidden="true" />
              <span>{selectedCategory.blurb}</span>
            </div>
          )}

          <div className="toolbar">
            <span><ArrowUpDown size={16} aria-hidden="true" /> {sortMode === "recommended" ? "Original CogLab order" : sortMode === "time" ? "Shortest first" : "Alphabetical"}</span>
            <span><Clock3 size={16} aria-hidden="true" /> {maxMinutes} min or less</span>
          </div>

          <div className="lab-grid">
            {filteredLabs.map((lab) => {
              const categoryInfo = categories.find((item) => item.name === lab.category);

              return (
                <article className="lab-card" key={lab.slug} style={{ "--accent": categoryInfo?.color ?? "#2f9c95" } as React.CSSProperties}>
                  <div className="lab-card-top">
                    <span className="order">#{lab.order}</span>
                    <span className="category-pill">{lab.category}</span>
                  </div>
                  <h3>{lab.title}</h3>
                  <p>{lab.summary}</p>
                  <div className="card-meta">
                    <span>{lab.estimatedMinutes} min</span>
                    <span>{lab.difficulty}</span>
                    <span>{lab.format}</span>
                  </div>
                  <div className="concept-row">
                    {lab.concepts.map((concept) => (
                      <span key={concept}>{concept}</span>
                    ))}
                  </div>
                  <div className="card-actions">
                    <Link href={`/labs/${lab.slug}`}>Details</Link>
                    <a href={lab.sourcePath} target="_blank" rel="noreferrer" aria-label={`Open original ${lab.title} lab`}>
                      <ExternalLink size={17} aria-hidden="true" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredLabs.length === 0 && (
            <div className="empty-state">
              <h2>No labs fit those filters.</h2>
              <p>Try relaxing the time slider or choosing all topics.</p>
            </div>
          )}
        </section>
      </section>
    </main>
  );
}
