import type { Formula } from "@/types";

interface FormulaCardProps {
  formula: Formula;
}

export function FormulaCard({ formula }: FormulaCardProps) {
  return (
    <article className="rounded-lg border border-zinc-800 bg-forge-panel p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-red-300">
        {formula.category}
      </p>
      <h3 className="mt-3 text-lg font-semibold text-white">{formula.name}</h3>
      <div className="mt-4 rounded-md border border-zinc-800 bg-zinc-950 px-4 py-3 font-mono text-sm text-red-100">
        {formula.equation}
      </div>
      <div className="mt-4 space-y-2 text-sm text-zinc-300">
        {formula.variables.map((variable) => (
          <p key={variable}>{variable}</p>
        ))}
      </div>
      <p className="mt-4 text-sm text-zinc-400">
        <span className="font-medium text-zinc-200">Units:</span> {formula.unitNotes}
      </p>
      <p className="mt-2 text-sm text-zinc-400">
        <span className="font-medium text-zinc-200">Use case:</span> {formula.exampleUseCase}
      </p>
    </article>
  );
}
