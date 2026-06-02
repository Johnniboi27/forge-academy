"use client";

import { useState } from "react";
import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import type { PracticeProblem } from "@/types";
import type { ProblemAnswer } from "@/lib/practice";
import { answerLabel } from "@/lib/practice";
import { cn } from "@/lib/cn";

interface PracticeQuestionProps {
  problem: PracticeProblem;
  answer: ProblemAnswer;
  onAnswerChange: (answer: ProblemAnswer) => void;
  submitted: boolean;
  isCorrect: boolean;
}

export function PracticeQuestion({
  problem,
  answer,
  onAnswerChange,
  submitted,
  isCorrect
}: PracticeQuestionProps) {
  const [showHint, setShowHint] = useState(false);
  const response = problem.response;

  return (
    <article
      className={cn(
        "rounded-lg border bg-forge-panel p-5",
        submitted
          ? isCorrect
            ? "border-emerald-700"
            : "border-red-800"
          : "border-zinc-800"
      )}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
            {problem.type.replace("-", " ")}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-white">{problem.question}</h3>
        </div>
        {submitted ? (
          <span
            className={cn(
              "inline-flex items-center gap-2 rounded-md px-3 py-1 text-sm font-semibold",
              isCorrect
                ? "bg-emerald-950 text-emerald-200"
                : "bg-red-950 text-red-200"
            )}
          >
            {isCorrect ? (
              <CheckCircle2 className="h-4 w-4" aria-hidden />
            ) : (
              <XCircle className="h-4 w-4" aria-hidden />
            )}
            {isCorrect ? "Correct" : "Review"}
          </span>
        ) : null}
      </div>

      <div className="mt-5">
        {response.kind === "multiple-choice" ? (
          <div className="grid gap-2">
            {response.options.map((option) => {
              const selected = answer === option;
              const correct = option === response.correctOption;
              return (
                <label
                  key={option}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-md border px-3 py-3 text-sm transition",
                    submitted && correct
                      ? "border-emerald-700 bg-emerald-950/30 text-emerald-100"
                      : submitted && selected && !correct
                        ? "border-red-800 bg-red-950/30 text-red-100"
                        : selected
                          ? "border-red-800 bg-red-950/20 text-white"
                          : "border-zinc-800 bg-zinc-950 text-zinc-300 hover:border-zinc-700"
                  )}
                >
                  <input
                    type="radio"
                    name={problem.id}
                    checked={selected}
                    disabled={submitted}
                    onChange={() => onAnswerChange(option)}
                    className="mt-1 accent-red-700"
                  />
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
        ) : response.kind === "numeric" ? (
          <label className="block">
            <span className="text-sm text-zinc-400">
              Numerical answer {response.unit ? `(${response.unit})` : ""}
            </span>
            <input
              type="number"
              step="any"
              value={typeof answer === "string" ? answer : ""}
              disabled={submitted}
              onChange={(event) => onAnswerChange(event.target.value)}
              className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-red-700"
            />
          </label>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.keys(response.values).map((key) => (
              <label key={key} className="block">
                <span className="text-sm text-zinc-400">
                  {key} {response.unit ? `(${response.unit})` : ""}
                </span>
                <input
                  type="number"
                  step="any"
                  value={
                    answer && typeof answer !== "string" ? (answer[key] ?? "") : ""
                  }
                  disabled={submitted}
                  onChange={(event) =>
                    onAnswerChange({
                      ...(answer && typeof answer !== "string" ? answer : {}),
                      [key]: event.target.value
                    })
                  }
                  className="mt-2 w-full rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-white outline-none focus:border-red-700"
                />
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => setShowHint((value) => !value)}
          className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-red-700 hover:text-white"
        >
          <HelpCircle className="h-4 w-4" aria-hidden />
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>
        {submitted ? (
          <p className="text-sm text-zinc-400">
            Correct answer: <span className="text-zinc-100">{answerLabel(problem)}</span>
          </p>
        ) : null}
      </div>

      {showHint ? (
        <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 p-3 text-sm text-zinc-300">
          {problem.hint}
        </div>
      ) : null}

      {submitted ? (
        <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 p-4">
          <p className="text-sm font-semibold text-white">Solution</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{problem.solution}</p>
          <p className="mt-2 text-sm leading-6 text-zinc-400">{problem.explanation}</p>
        </div>
      ) : null}
    </article>
  );
}
