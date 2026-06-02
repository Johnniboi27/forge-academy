"use client";

import { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { categoryOrder, courses } from "@/data/courses";
import type { CourseCategory, Difficulty } from "@/types";
import { CourseCard } from "@/components/CourseCard";
import { SourcePolicy } from "@/components/SourcePolicy";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { courseProgressPercent } from "@/lib/progressMetrics";

const difficulties: Array<Difficulty | "All"> = [
  "All",
  "Beginner",
  "Intermediate",
  "Advanced",
  "University Level"
];

export default function CoursesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CourseCategory | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");
  const { progress } = useLocalProgress();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get("category");
    const difficultyParam = params.get("difficulty");

    if (categoryParam && categoryOrder.includes(categoryParam as CourseCategory)) {
      setCategory(categoryParam as CourseCategory);
    }

    if (
      difficultyParam &&
      difficulties.includes(difficultyParam as Difficulty | "All")
    ) {
      setDifficulty(difficultyParam as Difficulty | "All");
    }
  }, []);

  const filteredCourses = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return courses.filter((course) => {
      const matchesQuery =
        !normalized ||
        `${course.title} ${course.category} ${course.description}`
          .toLowerCase()
          .includes(normalized);
      const matchesCategory = category === "All" || course.category === category;
      const matchesDifficulty = difficulty === "All" || course.difficulty === difficulty;
      return matchesQuery && matchesCategory && matchesDifficulty;
    });
  }, [category, difficulty, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
          Course catalog
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Math, physics, and mechanical engineering courses
        </h1>
        <p className="mt-4 text-zinc-400">
          Browse a structured pathway of engineering courses, each connected to MIT OpenCourseWare source materials where available.
        </p>
      </div>

      <div className="mt-8">
        <SourcePolicy />
      </div>

      <section className="mt-8 rounded-lg border border-zinc-800 bg-forge-panel p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_240px_220px]">
          <label className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
            <Search className="h-4 w-4 text-zinc-500" aria-hidden />
            <span className="sr-only">Search courses</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search course title or topic"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
            />
          </label>
          <label className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
            <Filter className="h-4 w-4 text-zinc-500" aria-hidden />
            <span className="sr-only">Filter category</span>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value as CourseCategory | "All")}
              className="w-full bg-transparent text-sm text-white outline-none"
            >
              <option value="All">All categories</option>
              {categoryOrder.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
            <span className="sr-only">Filter difficulty</span>
            <select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value as Difficulty | "All")}
              className="w-full bg-transparent text-sm text-white outline-none"
            >
              {difficulties.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All difficulties" : item}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      <div className="mt-10 space-y-12">
        {categoryOrder.map((group) => {
          const groupCourses = filteredCourses.filter((course) => course.category === group);
          if (!groupCourses.length) {
            return null;
          }

          return (
            <section key={group}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
                    {group}
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-white">
                    {groupCourses.length} courses
                  </h2>
                </div>
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {groupCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    progress={courseProgressPercent(course, progress.completedLectures)}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
