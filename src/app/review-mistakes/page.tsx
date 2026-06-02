"use client";

import Link from "next/link";
import { AlertTriangle, CheckCircle2 } from "lucide-react";
import { allLectures, allPracticeProblems } from "@/data/courses";
import { answerLabel } from "@/lib/practice";
import { useLocalProgress } from "@/hooks/useLocalProgress";

export default function ReviewMistakesPage() {
  const { progress } = useLocalProgress();
  const lectureLookup = new Map(allLectures.map((lecture) => [lecture.id, lecture]));
  const problemLookup = new Map(allPracticeProblems.map((problem) => [problem.id, problem]));
  const missedItems = Object.values(progress.practiceResults).flatMap((result) =>
    result.missedProblemIds
      .map((problemId) => ({
        result,
        problem: problemLookup.get(problemId),
        lecture: lectureLookup.get(result.lectureId)
      }))
      .filter((item) => item.problem && item.lecture)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
          Review mistakes
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Rebuild weak topics from missed practice
        </h1>
        <p className="mt-4 text-zinc-400">
          Missed questions are saved after each submitted practice set. Return to the relevant lecture or retry the set to master the topic.
        </p>
      </div>

      <section className="mt-8 grid gap-4">
        {missedItems.length ? (
          missedItems.map(({ problem, lecture }) =>
            problem && lecture ? (
              <article key={`${lecture.id}-${problem.id}`} className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
                      <AlertTriangle className="h-4 w-4" aria-hidden />
                      {problem.type.replace("-", " ")}
                    </p>
                    <h2 className="mt-3 text-lg font-semibold text-white">{problem.question}</h2>
                    <p className="mt-2 text-sm text-zinc-500">
                      {lecture.courseTitle} / {lecture.moduleTitle}
                    </p>
                  </div>
                  <Link
                    href={`/practice/${lecture.id}`}
                    className="rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine"
                  >
                    Retry set
                  </Link>
                </div>
                <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-sm text-zinc-300">
                    Correct answer: <span className="font-medium text-white">{answerLabel(problem)}</span>
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{problem.explanation}</p>
                </div>
              </article>
            ) : null
          )
        ) : (
          <div className="rounded-lg border border-zinc-800 bg-forge-panel p-8 text-center">
            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-300" aria-hidden />
            <h2 className="mt-4 text-xl font-semibold text-white">No mistakes to review yet</h2>
            <p className="mt-2 text-sm text-zinc-400">
              Complete a practice set and any missed problems will appear here.
            </p>
            <Link
              href="/practice"
              className="mt-5 inline-flex rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine"
            >
              Open practice
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
