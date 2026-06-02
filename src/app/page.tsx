import Link from "next/link";
import {
  BookOpen,
  ClipboardCheck,
  DraftingCompass,
  Gauge,
  Library,
  Route,
  Sigma,
  Wrench
} from "lucide-react";
import {
  allLectures,
  allPracticeProblems,
  courses,
  featuredCourseIds
} from "@/data/courses";
import { CourseCard } from "@/components/CourseCard";
import { SourcePolicy } from "@/components/SourcePolicy";

const features = [
  {
    title: "Structured Engineering Pathway",
    description:
      "Move from algebra and calculus into physics, statics, design, and advanced mechanical systems.",
    icon: Route
  },
  {
    title: "Lecture-Based Learning",
    description:
      "Every topic is organized around concise academic lectures with equations, examples, and applications.",
    icon: BookOpen
  },
  {
    title: "Practice After Every Lecture",
    description:
      "Concept checks, calculations, unit conversions, design scenarios, and challenge problems follow each lecture.",
    icon: ClipboardCheck
  },
  {
    title: "Progress Tracking",
    description:
      "Local progress records completed lectures, mastery, weak topics, notes, and practice streaks.",
    icon: Gauge
  },
  {
    title: "Formula Sheets",
    description:
      "Search formulas across calculus, physics, statics, fluids, heat transfer, and machine design.",
    icon: Sigma
  },
  {
    title: "Engineering Problem Solving",
    description:
      "Worked examples emphasize assumptions, units, system boundaries, and verification.",
    icon: Wrench
  },
  {
    title: "CAD and Design Modules",
    description:
      "Mechanical design courses connect analysis to drawings, assemblies, tolerances, and manufacturability.",
    icon: DraftingCompass
  },
  {
    title: "Academic Reference Library",
    description:
      "Keep equations, definitions, and example use cases close while working through lectures.",
    icon: Library
  }
];

export default function HomePage() {
  const featuredCourses = featuredCourseIds
    .map((id) => courses.find((course) => course.id === id))
    .filter(Boolean)
    .slice(0, 3);

  return (
    <div>
      <section className="technical-panel border-b border-zinc-900">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-red-300">
              Advanced engineering education
            </p>
            <h1 className="mt-5 max-w-4xl text-4xl font-semibold text-white sm:text-5xl lg:text-6xl">
              Forge Academy
            </h1>
            <p className="mt-5 text-xl font-medium text-zinc-200">
              Math, Physics, and Engineering for Future Mechanical Engineers
            </p>
            <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
              Forge Academy teaches engineering from foundations to advanced mechanical design through serious lectures, structured practice, formula references, and progress tracking.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/dashboard"
                className="rounded-md bg-forge-burgundy px-5 py-3 text-sm font-semibold text-white transition hover:bg-forge-wine focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Start Learning
              </Link>
              <Link
                href="/courses"
                className="rounded-md border border-zinc-700 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-red-700 hover:text-white"
              >
                View Courses
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-forge-panel/90 p-5 shadow-forge">
            <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Engineering challenge of the day
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-white">
                Resolve the load path before calculating stress.
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                A motor mount carries a 420 N vertical load and a 32 N m torque. Identify the free-body boundary, list known interactions, and choose the first equation before substituting values.
              </p>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {[
                ["Courses", courses.length.toString()],
                ["Lectures", allLectures.length.toString()],
                ["Practice", allPracticeProblems.length.toString()]
              ].map(([label, value]) => (
                <div key={label} className="rounded-md border border-zinc-800 bg-zinc-950 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
                  <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <SourcePolicy />
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
              Platform features
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Built for disciplined mechanical engineering study
            </h2>
          </div>
          <Link href="/pathway" className="text-sm font-semibold text-red-300 hover:text-red-200">
            View the pathway
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ title, description, icon: Icon }) => (
            <article key={title} className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
              <div className="rounded-lg border border-red-900/60 bg-red-950/30 p-2 text-red-200">
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <h3 className="mt-4 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-900 bg-forge-panel/40">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
                Recommended starting points
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-white">
                Begin with the core sequence
              </h2>
            </div>
            <Link href="/courses" className="text-sm font-semibold text-red-300 hover:text-red-200">
              Browse all courses
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredCourses.map((course) =>
              course ? <CourseCard key={course.id} course={course} /> : null
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
