"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ClipboardList, Search, Trophy } from "lucide-react";
import { allLectures, courses } from "@/data/courses";
import { ProgressBar } from "@/components/ProgressBar";
import { useLocalProgress } from "@/hooks/useLocalProgress";

export default function PracticePage() {
  const [query, setQuery] = useState("");
  const { progress } = useLocalProgress();
  const normalized = query.trim().toLowerCase();

  const filteredLectures = useMemo(
    () =>
      allLectures
        .filter((lecture) =>
          `${lecture.title} ${lecture.courseTitle} ${lecture.moduleTitle}`
            .toLowerCase()
            .includes(normalized)
        )
        .slice(0, 80),
    [normalized]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
          Practice problems
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Practice after every lecture
        </h1>
        <p className="mt-4 text-zinc-400">
          Open any lecture practice set. Scores, mistakes, and mastery are saved locally for review.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Courses", courses.length.toString()],
          ["Practice sets", allLectures.length.toString()],
          [
            "Mastered",
            Object.values(progress.practiceResults)
              .filter((result) => result.mastered)
              .length.toString()
          ]
        ].map(([label, value]) => (
          <div key={label} className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
            <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
            <p className="mt-2 text-3xl font-semibold text-white">{value}</p>
          </div>
        ))}
      </div>

      <label className="mt-8 flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
        <Search className="h-4 w-4 text-zinc-500" aria-hidden />
        <span className="sr-only">Search practice sets</span>
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search practice by lecture, course, or module"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
        />
      </label>

      <section className="mt-8 grid gap-4 lg:grid-cols-2">
        {filteredLectures.map((lecture) => {
          const result = progress.practiceResults[lecture.id];
          const scorePercent = result ? Math.round((result.score / result.total) * 100) : 0;

          return (
            <Link
              key={lecture.id}
              href={`/practice/${lecture.id}`}
              className="rounded-lg border border-zinc-800 bg-forge-panel p-5 transition hover:border-red-800"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                    {lecture.courseTitle}
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">{lecture.title}</h2>
                  <p className="mt-1 text-sm text-zinc-500">{lecture.moduleTitle}</p>
                </div>
                <span className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300">
                  {result?.mastered ? (
                    <Trophy className="h-4 w-4 text-emerald-300" aria-hidden />
                  ) : (
                    <ClipboardList className="h-4 w-4 text-red-300" aria-hidden />
                  )}
                  {lecture.practice.length} problems
                </span>
              </div>
              <div className="mt-4">
                <ProgressBar value={scorePercent} label={result ? "Saved score" : "Not attempted"} compact />
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
