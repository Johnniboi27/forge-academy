interface RoadmapStageProps {
  stage: string;
  title: string;
  courses: string[];
  index: number;
}

export function RoadmapStage({ stage, title, courses, index }: RoadmapStageProps) {
  return (
    <div className="relative rounded-lg border border-zinc-800 bg-forge-panel p-5 shadow-forge">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-md border border-red-900/70 bg-red-950/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-red-200">
          {stage}
        </span>
        <span className="text-sm text-zinc-500">0{index + 1}</span>
      </div>
      <h3 className="mt-4 text-xl font-semibold text-white">{title}</h3>
      <div className="mt-5 flex flex-wrap gap-2">
        {courses.map((course) => (
          <span
            key={course}
            className="rounded-md border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-zinc-200"
          >
            {course}
          </span>
        ))}
      </div>
    </div>
  );
}
