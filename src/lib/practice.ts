import type { PracticeProblem } from "@/types";

export type ProblemAnswer = string | Record<string, string> | undefined;

export function evaluateProblem(problem: PracticeProblem, answer: ProblemAnswer) {
  const response = problem.response;

  if (response.kind === "multiple-choice") {
    return typeof answer === "string" && answer === response.correctOption;
  }

  if (response.kind === "numeric") {
    if (typeof answer !== "string") {
      return false;
    }

    const parsed = Number(answer);
    return Number.isFinite(parsed) && Math.abs(parsed - response.value) <= response.tolerance;
  }

  if (!answer || typeof answer === "string") {
    return false;
  }

  return Object.entries(response.values).every(([key, expectedValue]) => {
    const parsed = Number(answer[key]);
    return Number.isFinite(parsed) && Math.abs(parsed - expectedValue) <= response.tolerance;
  });
}

export function answerLabel(problem: PracticeProblem) {
  const response = problem.response;

  if (response.kind === "multiple-choice") {
    return response.correctOption;
  }

  if (response.kind === "numeric") {
    return `${response.value}${response.unit ? ` ${response.unit}` : ""}`;
  }

  return Object.entries(response.values)
    .map(([key, value]) => `${key} = ${value}${response.unit ? ` ${response.unit}` : ""}`)
    .join(", ");
}
