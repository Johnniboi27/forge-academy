import Link from "next/link";
import { ExternalLink } from "lucide-react";
import type { SourceMaterialWithCourses } from "@/types";
import { courses } from "@/data/courses";

interface SourceLibraryCardProps {
  source: SourceMaterialWithCourses;
}

export function SourceLibraryCard({ source }: SourceLibraryCardProps) {
  const linkedCourses = source.forgeCourses
    .map((title) => courses.find((course) => course.title === title))
    .filter(Boolean);

  return (
    <article className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
            MIT OpenCourseWare
          </p>
          <h2 className="mt-3 text-xl font-semibold text-white">
            {source.courseNumber}: {source.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{source.note}</p>
        </div>
        <a
          href={source.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-forge-burgundy px-3 py-2 text-sm font-semibold text-white transition hover:bg-forge-wine"
        >
          Open OCW
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {source.resourceTypes.map((type) => (
          <span
            key={type}
            className="rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1 text-xs text-zinc-300"
          >
            {type}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Used by Forge courses
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {linkedCourses.map((course) =>
            course ? (
              <Link
                key={course.id}
                href={`/course/${course.id}`}
                className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-300 transition hover:border-red-800 hover:text-white"
              >
                {course.title}
              </Link>
            ) : null
          )}
        </div>
      </div>

      <p className="mt-5 text-xs leading-5 text-zinc-500">{source.license}</p>
    </article>
  );
}
