"use client";

import Link from "next/link";
import { ArrowLeft, CheckCircle2, ClipboardList, ExternalLink } from "lucide-react";
import type { Course, Lecture } from "@/types";
import { CalloutBox } from "@/components/CalloutBox";
import { NotesPanel } from "@/components/NotesPanel";
import { SourceMaterialCard } from "@/components/SourceMaterialCard";
import { useLocalProgress } from "@/hooks/useLocalProgress";

interface LectureDetailClientProps {
  lecture: Lecture;
  course: Course;
  nextLectureId?: string;
  previousLectureId?: string;
}

export function LectureDetailClient({
  lecture,
  course,
  nextLectureId,
  previousLectureId
}: LectureDetailClientProps) {
  const {
    progress,
    completedSet,
    markLectureComplete,
    addNote,
    updateNote,
    deleteNote
  } = useLocalProgress();
  const isComplete = completedSet.has(lecture.id);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Link
        href={`/course/${lecture.courseId}`}
        className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 transition hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to course
      </Link>

      <section className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <article className="min-w-0">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
            {lecture.courseTitle} / {lecture.moduleTitle}
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">{lecture.title}</h1>
          <div className="mt-4 flex flex-wrap gap-3 text-sm text-zinc-400">
            <span className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
              {lecture.estimatedMinutes} min
            </span>
            <span className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
              {lecture.category}
            </span>
            {isComplete ? (
              <span className="inline-flex items-center gap-2 rounded-md border border-emerald-900 bg-emerald-950/30 px-3 py-2 text-emerald-200">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                Complete
              </span>
            ) : null}
          </div>

          <div className="mt-8 space-y-5">
            {lecture.writtenExplanation.map((paragraph) => (
              <p key={paragraph} className="text-base leading-8 text-zinc-300">
                {paragraph}
              </p>
            ))}
          </div>

          <section className="mt-8 rounded-lg border border-zinc-800 bg-forge-panel p-5">
            <h2 className="text-xl font-semibold text-white">Key equations</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {lecture.keyEquations.map((equation) => (
                <div
                  key={equation}
                  className="rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-sm text-red-100"
                >
                  {equation}
                </div>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-lg border border-zinc-800 bg-forge-panel p-5">
            <h2 className="text-xl font-semibold text-white">Engineering applications</h2>
            <ul className="mt-4 space-y-3">
              {lecture.applications.map((application) => (
                <li key={application} className="flex gap-3 text-sm leading-6 text-zinc-300">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-red-300" aria-hidden />
                  {application}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 rounded-lg border border-zinc-800 bg-forge-panel p-5">
            <h2 className="text-xl font-semibold text-white">Step-by-step worked examples</h2>
            <div className="mt-5 space-y-5">
              {lecture.workedExamples.map((example) => (
                <article key={example.title} className="rounded-lg border border-zinc-800 bg-zinc-950 p-4">
                  <h3 className="font-semibold text-white">{example.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{example.problem}</p>
                  <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-zinc-300">
                    {example.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <p className="mt-4 text-sm font-medium text-red-200">{example.conclusion}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="mt-8 rounded-lg border border-zinc-800 bg-zinc-950 p-6">
            <h2 className="text-xl font-semibold text-white">Visual diagram placeholder</h2>
            <div className="mt-4 flex min-h-64 items-center justify-center rounded-lg border border-dashed border-zinc-700 bg-forge-black p-6 text-center">
              <p className="max-w-xl text-sm leading-6 text-zinc-500">{lecture.diagramPrompt}</p>
            </div>
          </section>

          <div className="mt-8 grid gap-4">
            <CalloutBox title="Important Concept" tone="important">
              {lecture.importantConcept}
            </CalloutBox>
            <CalloutBox title="Common Mistake" tone="mistake">
              {lecture.commonMistake}
            </CalloutBox>
            <CalloutBox title="Engineer's Note" tone="engineer">
              {lecture.engineersNote}
            </CalloutBox>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => markLectureComplete(lecture.id)}
              className="inline-flex items-center gap-2 rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine"
            >
              <CheckCircle2 className="h-4 w-4" aria-hidden />
              Mark as Complete
            </button>
            <Link
              href={`/practice/${lecture.id}`}
              className="inline-flex items-center gap-2 rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
            >
              <ClipboardList className="h-4 w-4" aria-hidden />
              Go to Practice
            </Link>
            {previousLectureId ? (
              <Link
                href={`/lecture/${previousLectureId}`}
                className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
              >
                Previous lecture
              </Link>
            ) : null}
            {nextLectureId ? (
              <Link
                href={`/lecture/${nextLectureId}`}
                className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
              >
                Next lecture
              </Link>
            ) : null}
          </div>
        </article>

        <aside className="space-y-5">
          <NotesPanel
            lectureId={lecture.id}
            notes={progress.notes[lecture.id] ?? []}
            onAdd={addNote}
            onUpdate={updateNote}
            onDelete={deleteNote}
          />
          <section className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
            <h2 className="text-xl font-semibold text-white">Primary source materials</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-400">
              Review the linked MIT OCW materials for the original course source.
            </p>
            <a
              href={course.sourceMaterials[0]?.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-md bg-forge-burgundy px-3 py-2 text-sm font-semibold text-white transition hover:bg-forge-wine"
            >
              Open main OCW source
              <ExternalLink className="h-4 w-4" aria-hidden />
            </a>
          </section>
          {course.sourceMaterials.slice(0, 2).map((source) => (
            <SourceMaterialCard key={source.id} source={source} />
          ))}
        </aside>
      </section>
    </div>
  );
}
