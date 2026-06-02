import type { Course, PracticeProblem, ProgressState } from "@/types";

export function courseProgressPercent(course: Course, completedLectures: string[]) {
  const lectures = course.modules.flatMap((module) => module.lectures);
  if (!lectures.length) {
    return 0;
  }

  const completed = lectures.filter((lecture) => completedLectures.includes(lecture.id)).length;
  return Math.round((completed / lectures.length) * 100);
}

export function averagePracticeScore(progress: ProgressState) {
  const results = Object.values(progress.practiceResults);
  if (!results.length) {
    return 0;
  }

  const totalPercent = results.reduce(
    (sum, result) => sum + (result.score / Math.max(result.total, 1)) * 100,
    0
  );
  return Math.round(totalPercent / results.length);
}

export function weakTopics(
  progress: ProgressState,
  problemLookup: Map<string, PracticeProblem>
) {
  const counts = new Map<string, number>();

  Object.values(progress.practiceResults).forEach((result) => {
    result.missedProblemIds.forEach((problemId) => {
      const problem = problemLookup.get(problemId);
      if (!problem) {
        return;
      }
      counts.set(problem.topic, (counts.get(problem.topic) ?? 0) + 1);
    });
  });

  return Array.from(counts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([topic, misses]) => ({ topic, misses }));
}

export function buildProgressSummary(progress: ProgressState, courses: Course[]) {
  const rows = courses.map((course) => ({
    course: course.title,
    progress: `${courseProgressPercent(course, progress.completedLectures)}%`
  }));

  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      completedLectures: progress.completedLectures.length,
      masteredPracticeSets: Object.values(progress.practiceResults).filter(
        (result) => result.mastered
      ).length,
      practiceStreak: progress.streak.count,
      courseProgress: rows,
      practiceResults: progress.practiceResults
    },
    null,
    2
  );
}
