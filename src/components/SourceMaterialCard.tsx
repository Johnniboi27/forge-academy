import { ExternalLink } from "lucide-react";
import type { SourceMaterial } from "@/types";

interface SourceMaterialCardProps {
  source: SourceMaterial;
}

export function SourceMaterialCard({ source }: SourceMaterialCardProps) {
  return (
    <article className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
        {source.provider}
      </p>
      <h3 className="mt-3 text-lg font-semibold text-white">
        {source.courseNumber}: {source.title}
      </h3>
      <p className="mt-3 text-sm leading-6 text-zinc-400">{source.note}</p>
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
      <p className="mt-4 text-xs leading-5 text-zinc-500">{source.license}</p>
      <a
        href={source.url}
        target="_blank"
        rel="noreferrer"
        className="mt-4 inline-flex items-center gap-2 rounded-md border border-zinc-700 px-3 py-2 text-sm font-semibold text-zinc-100 transition hover:border-red-700 hover:text-white"
      >
        Open OCW source
        <ExternalLink className="h-4 w-4" aria-hidden />
      </a>
    </article>
  );
}
