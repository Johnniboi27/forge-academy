"use client";

import Link from "next/link";
import {
  BookOpenCheck,
  Calculator,
  ClipboardList,
  Download,
  Flame,
  Gauge,
  Library,
  ScrollText,
  Sigma,
  Wrench
} from "lucide-react";
import {
  allLectures,
  allPracticeProblems,
  courses,
  featuredCourseIds,
  getNextIncompleteLecture
} from "@/data/courses";
import { DashboardStat } from "@/components/DashboardStat";
import { ProgressBar } from "@/components/ProgressBar";
import { useLocalProgress } from "@/hooks/useLocalProgress";
import {
  averagePracticeScore,
  buildProgressSummary,
  courseProgressPercent,
  weakTopics
} from "@/lib/progressMetrics";

const quickLinks = [
  {
    label: "Math",
    href: "/courses?category=Mathematics%20for%20Engineers",
    icon: Calculator
  },
  {
    label: "Physics",
    href: "/courses?category=Physics%20for%20Engineers",
    icon: Sigma
  },
  {
    label: "Mechanical Engineering",
    href: "/courses?category=Mechanical%20Engineering%20Core",
    icon: Wrench
  },
  { label: "Practice Problems", href: "/practice", icon: ClipboardList },
  { label: "Formula Library", href: "/formulas", icon: Library },
  { label: "MIT OCW Sources", href: "/sources", icon: ScrollText }
];

export default function DashboardPage() {
  const { progress } = useLocalProgress();
  const completedCount = progress.completedLectures.length;
  const masteredCount = Object.values(progress.practiceResults).filter(
    (result) => result.mastered
  ).length;
  const averageScore = averagePracticeScore(progress);
  const problemLookup = new Map(allPracticeProblems.map((problem) => [problem.id, problem]));
  const weakTopicList = weakTopics(progress, problemLookup);

  const lastCourse =
    courses.find((course) => course.id === progress.lastOpenedCourse) ??
    courses.find((course) => course.id === featuredCourseIds[0]) ??
    courses[0];
  const continueLecture = lastCourse
    ? getNextIncompleteLecture(lastCourse, progress.completedLectures) ??
      lastCourse.modules[0]?.lectures[0]
    : allLectures[0];

  const recommendedLectures = featuredCourseIds
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean)
    .map((course) =>
      course ? getNextIncompleteLecture(course, progress.completedLectures) : undefined
    )
    .filter(Boolean)
    .slice(0, 4);

  const completedLectures = allLectures
    .filter((lecture) => progress.completedLectures.includes(lecture.id))
    .slice(-5)
    .reverse();

  const downloadSummary = () => {
    const blob = new Blob([buildProgressSummary(progress, courses)], {
      type: "application/json"
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "forge-academy-progress-summary.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
            Dashboard
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            Your engineering study console
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Track lecture completion, practice mastery, weak topics, and the next engineering problem worth solving.
          </p>
        </div>
        <button
          type="button"
          onClick={downloadSummary}
          className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
        >
          <Download className="h-4 w-4" aria-hidden />
          Download progress summary
        </button>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStat
          label="Completed lectures"
          value={completedCount.toString()}
          detail="Saved in this browser"
          icon={BookOpenCheck}
        />
        <DashboardStat
          label="Practice mastery"
          value={masteredCount.toString()}
          detail="Perfect practice sets"
          icon={Gauge}
        />
        <DashboardStat
          label="Practice streak"
          value={`${progress.streak.count}`}
          detail="Consecutive practice days"
          icon={Flame}
        />
        <DashboardStat
          label="Average score"
          value={`${averageScore}%`}
          detail="Across attempted sets"
          icon={ClipboardList}
        />
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
            Continue learning
          </p>
          {continueLecture ? (
            <div className="mt-4 rounded-lg border border-zinc-800 bg-zinc-950 p-5">
              <h2 className="text-2xl font-semibold text-white">{continueLecture.title}</h2>
              <p className="mt-2 text-sm text-zinc-400">
                {continueLecture.courseTitle} / {continueLecture.moduleTitle}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/lecture/${continueLecture.id}`}
                  className="rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine"
                >
                  Resume lecture
                </Link>
                <Link
                  href={`/practice/${continueLecture.id}`}
                  className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
                >
                  Go to practice
                </Link>
              </div>
            </div>
          ) : null}
        </div>

        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
            Today&apos;s Engineering Practice
          </p>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Audit a free-body model before solving.
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Choose a lecture you recently completed and write the body boundary, external interactions, coordinate convention, and unit system before attempting the first equation.
          </p>
          <Link
            href="/practice"
            className="mt-5 inline-block rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine"
          >
            Open practice queue
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6 lg:col-span-2">
          <h2 className="text-xl font-semibold text-white">Course progress</h2>
          <div className="mt-5 space-y-4">
            {featuredCourseIds.map((id) => {
              const course = courses.find((item) => item.id === id);
              if (!course) {
                return null;
              }
              return (
                <Link
                  key={course.id}
                  href={`/course/${course.id}`}
                  className="block rounded-lg border border-zinc-800 bg-zinc-950 p-4 transition hover:border-red-800"
                >
                  <div className="mb-3 flex items-center justify-between gap-4">
                    <span className="font-medium text-white">{course.title}</span>
                    <span className="text-xs text-zinc-500">{course.difficulty}</span>
                  </div>
                  <ProgressBar
                    value={courseProgressPercent(course, progress.completedLectures)}
                    compact
                  />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6">
            <h2 className="text-xl font-semibold text-white">Quick links</h2>
            <div className="mt-4 grid gap-2">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  className="flex items-center gap-3 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-300 transition hover:border-red-800 hover:text-white"
                >
                  <Icon className="h-4 w-4 text-red-300" aria-hidden />
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6">
            <h2 className="text-xl font-semibold text-white">Weak topics</h2>
            <div className="mt-4 space-y-3">
              {weakTopicList.length ? (
                weakTopicList.map((topic) => (
                  <div key={topic.topic} className="rounded-md border border-zinc-800 bg-zinc-950 p-3">
                    <p className="text-sm font-medium text-white">{topic.topic}</p>
                    <p className="mt-1 text-xs text-zinc-500">{topic.misses} missed problems</p>
                  </div>
                ))
              ) : (
                <p className="text-sm leading-6 text-zinc-400">
                  No weak topics yet. Complete practice sets to build a review list.
                </p>
              )}
            </div>
            <Link href="/review-mistakes" className="mt-4 inline-block text-sm font-semibold text-red-300 hover:text-red-200">
              Review mistakes
            </Link>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6">
          <h2 className="text-xl font-semibold text-white">Recommended next lectures</h2>
          <div className="mt-4 space-y-3">
            {recommendedLectures.map((lecture) =>
              lecture ? (
                <Link
                  key={lecture.id}
                  href={`/lecture/${lecture.id}`}
                  className="block rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300 transition hover:border-red-800 hover:text-white"
                >
                  <span className="font-medium text-white">{lecture.title}</span>
                  <span className="mt-1 block text-xs text-zinc-500">
                    {lecture.courseTitle} / {lecture.moduleTitle}
                  </span>
                </Link>
              ) : null
            )}
          </div>
        </div>

        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-6">
          <h2 className="text-xl font-semibold text-white">Completed lectures</h2>
          <div className="mt-4 space-y-3">
            {completedLectures.length ? (
              completedLectures.map((lecture) => (
                <Link
                  key={lecture.id}
                  href={`/lecture/${lecture.id}`}
                  className="block rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300 transition hover:border-red-800 hover:text-white"
                >
                  <span className="font-medium text-white">{lecture.title}</span>
                  <span className="mt-1 block text-xs text-zinc-500">{lecture.courseTitle}</span>
                </Link>
              ))
            ) : (
              <p className="text-sm leading-6 text-zinc-400">
                Completed lectures will appear here after you mark one complete.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
