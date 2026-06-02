"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, ClipboardList, Target } from "lucide-react";
import type { Course } from "@/types";
import { LectureCard } from "@/components/LectureCard";
import { ProgressBar } from "@/components/ProgressBar";
import { SourceMaterialCard } from "@/components/SourceMaterialCard";
import { SourcePolicy } from "@/components/SourcePolicy";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import { courseProgressPercent } from "@/lib/progressMetrics";

interface CourseDetailClientProps {
  course: Course;
}

export function CourseDetailClient({ course }: CourseDetailClientProps) {
  const { progress, completedSet, setLastOpenedCourse } = useLocalProgress();
  const lectures = course.modules.flatMap((module) => module.lectures);
  const completedCount = lectures.filter((lecture) => completedSet.has(lecture.id)).length;
  const progressPercent = courseProgressPercent(course, progress.completedLectures);

  useEffect(() => {
    setLastOpenedCourse(course.id);
  }, [course.id, setLastOpenedCourse]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href="/courses"
        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to courses
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
            {course.category}
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{course.title}</h1>
          <p className="mt-4 text-lg leading-8 text-zinc-400">{course.description}</p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm">
            <span className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300">
              Difficulty: {course.difficulty}
            </span>
            <span className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300">
              {lectures.length} lectures
            </span>
            <span className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-zinc-300">
              {course.modules.length} modules
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6 shadow-forge">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Completion progress</h2>
            <span className="text-sm text-zinc-400">
              {completedCount}/{lectures.length}
            </span>
          </div>
          <div className="mt-4">
            <ProgressBar value={progressPercent} label="Course progress" />
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <Link
              href={`/lecture/${lectures[0]?.id ?? ""}`}
              className="inline-flex items-center justify-center gap-2 rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine"
            >
              <BookOpen className="h-4 w-4" aria-hidden />
              Start first lecture
            </Link>
            <Link
              href={`/practice/${lectures[0]?.id ?? ""}`}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
            >
              <ClipboardList className="h-4 w-4" aria-hidden />
              First practice
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-red-300" aria-hidden />
            <h2 className="text-xl font-semibold text-white">Learning outcomes</h2>
          </div>
          <ul className="mt-4 space-y-3">
            {course.outcomes.map((outcome) => (
              <li key={outcome} className="flex gap-3 text-sm leading-6 text-zinc-300">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-emerald-300" aria-hidden />
                {outcome}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6">
          <h2 className="text-xl font-semibold text-white">Prerequisites</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {course.prerequisites.map((prerequisite) => (
              <span
                key={prerequisite}
                className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300"
              >
                {prerequisite}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <SourcePolicy />
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {course.sourceMaterials.map((source) => (
            <SourceMaterialCard key={source.id} source={source} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
              Modules and lectures
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-white">Course sequence</h2>
          </div>
        </div>
        <div className="mt-6 space-y-6">
          {course.modules.map((module, moduleIndex) => (
            <section key={module.id} className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Module {moduleIndex + 1}
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">{module.title}</h3>
                </div>
                <span className="text-sm text-zinc-500">
                  {module.lectures.length} lectures
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {module.lectures.map((lecture) => (
                  <LectureCard
                    key={lecture.id}
                    lecture={lecture}
                    isComplete={completedSet.has(lecture.id)}
                    practiceResult={progress.practiceResults[lecture.id]}
                  />
                ))}
                <Link
                  href={`/practice/${module.lectures[module.lectures.length - 1]?.id}`}
                  className="inline-flex rounded-md border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:border-red-700"
                >
                  Practice Set: {module.title} Problems
                </Link>
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
