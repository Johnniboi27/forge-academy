"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { allLectures, courses } from "@/data/courses";
import { formulas } from "@/data/formulas";
import { allOcwSources } from "@/data/ocwSources";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const normalized = query.trim().toLowerCase();

  const results = useMemo(() => {
    if (!normalized) {
      return {
        courses: [],
        lectures: [],
        formulas: [],
        problems: [],
        sources: []
      };
    }

    const problemRecords = allLectures.flatMap((lecture) =>
      lecture.practice.map((problem) => ({
        problem,
        lecture
      }))
    );

    return {
      courses: courses
        .filter((course) =>
          `${course.title} ${course.category} ${course.description}`
            .toLowerCase()
            .includes(normalized)
        )
        .slice(0, 4),
      lectures: allLectures
        .filter((lecture) =>
          `${lecture.title} ${lecture.courseTitle} ${lecture.moduleTitle}`
            .toLowerCase()
            .includes(normalized)
        )
        .slice(0, 4),
      formulas: formulas
        .filter((formula) =>
          `${formula.name} ${formula.category} ${formula.equation}`
            .toLowerCase()
            .includes(normalized)
        )
        .slice(0, 4),
      problems: problemRecords
        .filter(({ problem }) =>
          `${problem.question} ${problem.topic}`.toLowerCase().includes(normalized)
        )
        .slice(0, 4),
      sources: allOcwSources
        .filter((source) =>
          `${source.courseNumber} ${source.title} ${source.note} ${source.forgeCourses.join(" ")}`
            .toLowerCase()
            .includes(normalized)
        )
        .slice(0, 4)
    };
  }, [normalized]);

  const hasResults =
    results.courses.length ||
    results.lectures.length ||
    results.formulas.length ||
    results.problems.length ||
    results.sources.length;

  const close = () => {
    setQuery("");
    setIsFocused(false);
  };

  return (
    <div className="relative w-full max-w-xl">
      <label className="sr-only" htmlFor="global-search">
        Search courses, lectures, formulas, and practice
      </label>
      <div className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300 focus-within:border-red-700">
        <Search className="h-4 w-4 text-zinc-500" aria-hidden />
        <input
          id="global-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search Forge Academy"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
        />
      </div>
      {isFocused && normalized ? (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 max-h-[70vh] overflow-y-auto rounded-lg border border-zinc-800 bg-forge-panel p-3 shadow-forge">
          {hasResults ? (
            <div className="space-y-4">
              <ResultGroup title="Courses">
                {results.courses.map((course) => (
                  <ResultLink key={course.id} href={`/course/${course.id}`} onClick={close}>
                    {course.title}
                  </ResultLink>
                ))}
              </ResultGroup>
              <ResultGroup title="Lectures">
                {results.lectures.map((lecture) => (
                  <ResultLink key={lecture.id} href={`/lecture/${lecture.id}`} onClick={close}>
                    {lecture.courseTitle}: {lecture.title}
                  </ResultLink>
                ))}
              </ResultGroup>
              <ResultGroup title="Formulas">
                {results.formulas.map((formula) => (
                  <ResultLink key={formula.id} href={`/formulas?query=${encodeURIComponent(formula.name)}`} onClick={close}>
                    {formula.name}
                  </ResultLink>
                ))}
              </ResultGroup>
              <ResultGroup title="Practice">
                {results.problems.map(({ problem, lecture }) => (
                  <ResultLink key={problem.id} href={`/practice/${lecture.id}`} onClick={close}>
                    {problem.question}
                  </ResultLink>
                ))}
              </ResultGroup>
              <ResultGroup title="MIT OCW Sources">
                {results.sources.map((source) => (
                  <ResultLink key={source.url} href={`/sources?query=${encodeURIComponent(source.courseNumber)}`} onClick={close}>
                    {source.courseNumber}: {source.title}
                  </ResultLink>
                ))}
              </ResultGroup>
            </div>
          ) : (
            <p className="px-2 py-3 text-sm text-zinc-400">No results found.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function ResultGroup({
  title,
  children
}: {
  title: string;
  children: React.ReactNode;
}) {
  if (!children || (Array.isArray(children) && children.length === 0)) {
    return null;
  }

  return (
    <section>
      <h3 className="px-2 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
        {title}
      </h3>
      <div className="mt-1 space-y-1">{children}</div>
    </section>
  );
}

function ResultLink({
  href,
  children,
  onClick
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block rounded-md px-2 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
    >
      {children}
    </Link>
  );
}
