"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink, Search, ShieldCheck } from "lucide-react";
import {
  allOcwSources,
  ocwLicenseSource,
  ocwResourceTypes
} from "@/data/ocwSources";
import { SourceLibraryCard } from "@/components/SourceLibraryCard";
import { SourcePolicy } from "@/components/SourcePolicy";

export default function SourcesPage() {
  const [query, setQuery] = useState("");
  const [resourceType, setResourceType] = useState("All");
  const normalized = query.trim().toLowerCase();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("query");
    if (queryParam) {
      setQuery(queryParam);
    }
  }, []);

  const filteredSources = useMemo(
    () =>
      allOcwSources.filter((source) => {
        const matchesQuery =
          !normalized ||
          `${source.courseNumber} ${source.title} ${source.note} ${source.forgeCourses.join(" ")}`
            .toLowerCase()
            .includes(normalized);
        const matchesType =
          resourceType === "All" || source.resourceTypes.includes(resourceType);
        return matchesQuery && matchesType;
      }),
    [normalized, resourceType]
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
            Source library
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            MIT OpenCourseWare materials used as sources
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400">
            This page lists the OCW courses that inform Forge Academy&apos;s engineering pathway. Use it to open the original lectures, notes, assignments, exams, labs, and project material on MIT OCW.
          </p>
        </div>
        <a
          href={ocwLicenseSource.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
        >
          <ShieldCheck className="h-4 w-4" aria-hidden />
          OCW terms
          <ExternalLink className="h-4 w-4" aria-hidden />
        </a>
      </div>

      <div className="mt-8">
        <SourcePolicy />
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Unique OCW courses
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">{allOcwSources.length}</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Resource types
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">{ocwResourceTypes.length}</p>
        </div>
        <div className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
            Source provider
          </p>
          <p className="mt-2 text-3xl font-semibold text-white">MIT OCW</p>
        </div>
      </section>

      <section className="mt-8 grid gap-3 lg:grid-cols-[1fr_260px]">
        <label className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-500" aria-hidden />
          <span className="sr-only">Search source materials</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search OCW course, Forge course, or topic"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
          />
        </label>
        <label className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
          <span className="sr-only">Resource type</span>
          <select
            value={resourceType}
            onChange={(event) => setResourceType(event.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none"
          >
            <option value="All">All resource types</option>
            {ocwResourceTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="mt-8 grid gap-5">
        {filteredSources.map((source) => (
          <SourceLibraryCard key={source.url} source={source} />
        ))}
      </section>
    </div>
  );
}
