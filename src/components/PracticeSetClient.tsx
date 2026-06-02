"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, RotateCcw, Trophy } from "lucide-react";
import { useMemo, useState } from "react";
import type { Course, Lecture } from "@/types";
import type { ProblemAnswer } from "@/lib/practice";
import { evaluateProblem } from "@/lib/practice";
import { PracticeQuestion } from "@/components/PracticeQuestion";
import { ProgressBar } from "@/components/ProgressBar";
import { SourceMaterialCard } from "@/components/SourceMaterialCard";
import { useLocalProgress } from "@/hooks/useLocalProgress";

interface PracticeSetClientProps {
  lecture: Lecture;
  course: Course;
}

export function PracticeSetClient({ lecture, course }: PracticeSetClientProps) {
  const { progress, recordPracticeResult, markLectureComplete } = useLocalProgress();
  const [answers, setAnswers] = useState<Record<string, ProblemAnswer>>({});
  const [submitted, setSubmitted] = useState(false);
  const [attemptScore, setAttemptScore] = useState(0);
  const priorResult = progress.practiceResults[lecture.id];

  const correctness = useMemo(
    () =>
      Object.fromEntries(
        lecture.practice.map((problem) => [
          problem.id,
          evaluateProblem(problem, answers[problem.id])
        ])
      ),
    [answers, lecture.practice]
  );

  const submit = () => {
    const missedProblemIds = lecture.practice
      .filter((problem) => !correctness[problem.id])
      .map((problem) => problem.id);
    const score = lecture.practice.length - missedProblemIds.length;
    setAttemptScore(score);
    setSubmitted(true);
    recordPracticeResult(lecture.id, score, lecture.practice.length, missedProblemIds);
    if (score === lecture.practice.length) {
      markLectureComplete(lecture.id);
    }
  };

  const retry = () => {
    setAnswers({});
    setSubmitted(false);
    setAttemptScore(0);
  };

  const scorePercent = submitted
    ? Math.round((attemptScore / lecture.practice.length) * 100)
    : priorResult
      ? Math.round((priorResult.score / priorResult.total) * 100)
      : 0;
  const mastered = submitted
    ? attemptScore === lecture.practice.length
    : Boolean(priorResult?.mastered);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href={`/lecture/${lecture.id}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to lecture
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
            Practice after lecture
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{lecture.title}</h1>
          <p className="mt-3 text-zinc-400">
            {lecture.courseTitle} / {lecture.moduleTitle}
          </p>

          <div className="mt-8 space-y-5">
            {lecture.practice.map((problem) => (
              <PracticeQuestion
                key={problem.id}
                problem={problem}
                answer={answers[problem.id]}
                onAnswerChange={(answer) =>
                  setAnswers((current) => ({
                    ...current,
                    [problem.id]: answer
                  }))
                }
                submitted={submitted}
                isCorrect={Boolean(correctness[problem.id])}
              />
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            {!submitted ? (
              <button
                type="button"
                onClick={submit}
                className="inline-flex items-center gap-2 rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine"
              >
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                Submit practice
              </button>
            ) : (
              <button
                type="button"
                onClick={retry}
                className="inline-flex items-center gap-2 rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine"
              >
                <RotateCcw className="h-4 w-4" aria-hidden />
                Retry
              </button>
            )}
            <Link
              href={`/course/${lecture.courseId}`}
              className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
            >
              Return to course
            </Link>
          </div>
        </div>

        <aside className="space-y-5">
          <section className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
            <h2 className="text-xl font-semibold text-white">Practice score</h2>
            <div className="mt-4">
              <ProgressBar value={scorePercent} label="Score" />
            </div>
            <p className="mt-4 text-sm text-zinc-400">
              {submitted
                ? `Current attempt: ${attemptScore}/${lecture.practice.length}`
                : priorResult
                  ? `Previous attempt: ${priorResult.score}/${priorResult.total}`
                  : "Submit the set to save your score."}
            </p>
            {mastered ? (
              <div className="mt-4 flex items-center gap-2 rounded-md border border-emerald-800 bg-emerald-950/30 px-3 py-2 text-sm font-semibold text-emerald-200">
                <Trophy className="h-4 w-4" aria-hidden />
                Mastered
              </div>
            ) : null}
          </section>

          <section className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
            <h2 className="text-xl font-semibold text-white">Problem types</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {lecture.practice.map((problem) => (
                <span
                  key={problem.id}
                  className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300"
                >
                  {problem.type.replace("-", " ")}
                </span>
              ))}
            </div>
          </section>

          {course.sourceMaterials.slice(0, 1).map((source) => (
            <SourceMaterialCard key={source.id} source={source} />
          ))}
        </aside>
      </section>
    </div>
  );
}
