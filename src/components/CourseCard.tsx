import Link from "next/link";
import { BookOpen, Clock, Layers } from "lucide-react";
import type { Course } from "@/types";
import { getCourseLectureCount } from "@/data/courses";
import { ProgressBar } from "@/components/ProgressBar";

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export function CourseCard({ course, progress = 0 }: CourseCardProps) {
  const lectureCount = getCourseLectureCount(course);

  return (
    <article className="flex h-full flex-col rounded-lg border border-zinc-800 bg-forge-panel p-5 shadow-forge transition hover:-translate-y-0.5 hover:border-red-900/80">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
            {course.category}
          </p>
          <h3 className="mt-3 text-xl font-semibold text-white">{course.title}</h3>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-2 text-red-200">
          <BookOpen className="h-5 w-5" aria-hidden />
        </div>
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-zinc-400">{course.description}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-zinc-400">
        <span className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
          <Layers className="h-4 w-4 text-red-300" aria-hidden />
          {course.difficulty}
        </span>
        <span className="inline-flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
          <Clock className="h-4 w-4 text-red-300" aria-hidden />
          {lectureCount} lectures
        </span>
      </div>
      <div className="mt-5">
        <ProgressBar value={progress} label="Course progress" compact />
      </div>
      <Link
        href={`/course/${course.id}`}
        className="mt-5 inline-flex items-center justify-center rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Open Course
      </Link>
    </article>
  );
}
