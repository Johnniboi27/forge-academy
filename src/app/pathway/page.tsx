import Link from "next/link";
import { roadmapStages } from "@/data/roadmap";
import { RoadmapStage } from "@/components/RoadmapStage";

export default function PathwayPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-red-300">
          Engineering pathway
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          A clear roadmap from foundations to capstone design
        </h1>
        <p className="mt-4 text-zinc-400">
          Follow this sequence to build the math, physics, mechanics, design, and simulation skills expected of strong mechanical engineers.
        </p>
      </div>

      <div className="mt-10 grid gap-5">
        {roadmapStages.map((stage, index) => (
          <div key={stage.title} className="relative">
            {index < roadmapStages.length - 1 ? (
              <div className="absolute left-6 top-full hidden h-5 w-px bg-red-900 md:block" />
            ) : null}
            <RoadmapStage {...stage} index={index} />
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-zinc-800 bg-forge-panel p-6">
        <h2 className="text-xl font-semibold text-white">Recommended first action</h2>
        <p className="mt-2 text-sm leading-6 text-zinc-400">
          Start with Calculus I if you are already comfortable with algebra and trigonometry. If not, begin with the math foundations and return to mechanics once vectors and functions feel natural.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/course/calculus-i-limits-derivatives-and-applications"
            className="rounded-md bg-forge-burgundy px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-forge-wine"
          >
            Open Calculus I
          </Link>
          <Link
            href="/courses"
            className="rounded-md border border-zinc-700 px-4 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-red-700"
          >
            View Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
