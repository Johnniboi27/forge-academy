import { ShieldCheck } from "lucide-react";

export function SourcePolicy() {
  return (
    <section className="rounded-lg border border-red-900/60 bg-red-950/20 p-5">
      <div className="flex items-start gap-3">
        <div className="rounded-md border border-red-900/70 bg-zinc-950 p-2 text-red-200">
          <ShieldCheck className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <h2 className="font-semibold text-white">MIT OpenCourseWare Source Policy</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Forge Academy uses MIT OpenCourseWare as a curriculum reference layer and links learners to the original OCW course materials. The Forge lesson text and practice prompts are original summaries and generated exercises; use the linked OCW pages for the primary source materials. MIT OCW materials are generally licensed under CC BY-NC-SA 4.0 unless a specific OCW page says otherwise, and MIT does not endorse this project.
          </p>
        </div>
      </div>
    </section>
  );
}
