"use client";

import { useEffect, useMemo, useState } from "react";
import { Printer, Search } from "lucide-react";
import { FormulaCard } from "@/components/FormulaCard";
import { formulas, formulaCategories } from "@/data/formulas";

export default function FormulaLibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const queryParam = params.get("query");
    if (queryParam) {
      setQuery(queryParam);
    }
  }, []);

  const filteredFormulas = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return formulas.filter((formula) => {
      const matchesQuery =
        !normalized ||
        `${formula.name} ${formula.category} ${formula.equation} ${formula.exampleUseCase}`
          .toLowerCase()
          .includes(normalized);
      const matchesCategory = category === "All" || formula.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, query]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
            Formula library
          </p>
          <h1 className="mt-3 text-4xl font-semibold text-white">
            Searchable engineering formula sheets
          </h1>
          <p className="mt-4 max-w-3xl text-zinc-400">
            Organized by algebra, trigonometry, calculus, physics mechanics, statics, dynamics, mechanics of materials, thermodynamics, fluid mechanics, heat transfer, and machine design.
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="no-print inline-flex items-center justify-center gap-2 rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
        >
          <Printer className="h-4 w-4" aria-hidden />
          Printable formula sheet
        </button>
      </div>

      <section className="no-print mt-8 grid gap-3 lg:grid-cols-[1fr_260px]">
        <label className="flex items-center gap-2 rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
          <Search className="h-4 w-4 text-zinc-500" aria-hidden />
          <span className="sr-only">Search formulas</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search formula, variable, or use case"
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-600"
          />
        </label>
        <label className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2">
          <span className="sr-only">Formula category</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="w-full bg-transparent text-sm text-white outline-none"
          >
            <option value="All">All categories</option>
            {formulaCategories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </section>

      <section className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredFormulas.map((formula) => (
          <FormulaCard key={formula.id} formula={formula} />
        ))}
      </section>
    </div>
  );
}
