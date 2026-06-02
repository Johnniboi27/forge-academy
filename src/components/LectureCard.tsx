import Link from "next/link";
import { CheckCircle2, ClipboardList, PlayCircle } from "lucide-react";
import type { Lecture, PracticeResult } from "@/types";

interface LectureCardProps {
  lecture: Lecture;
  isComplete?: boolean;
  practiceResult?: PracticeResult;
}

export function LectureCard({ lecture, isComplete, practiceResult }: LectureCardProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-forge-panel2 p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
            <span>{lecture.estimatedMinutes} min</span>
            {isComplete ? (
              <span className="inline-flex items-center gap-1 text-emerald-300">
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden />
                Complete
              </span>
            ) : null}
            {practiceResult ? (
              <span className="text-red-200">
                Practice {practiceResult.score}/{practiceResult.total}
              </span>
            ) : null}
          </div>
          <h4 className="mt-2 font-semibold text-white">{lecture.title}</h4>
          <p className="mt-1 text-sm text-zinc-400">{lecture.moduleTitle}</p>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <Link
            href={`/lecture/${lecture.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm font-medium text-zinc-100 transition hover:border-red-700 hover:text-white"
          >
            <PlayCircle className="h-4 w-4" aria-hidden />
            Lecture
          </Link>
          <Link
            href={`/practice/${lecture.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-forge-burgundy px-3 py-2 text-sm font-medium text-white transition hover:bg-forge-wine"
          >
            <ClipboardList className="h-4 w-4" aria-hidden />
            Practice
          </Link>
        </div>
      </div>
    </div>
  );
}
