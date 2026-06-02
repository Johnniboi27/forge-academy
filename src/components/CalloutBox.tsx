import { AlertTriangle, Info, Lightbulb, Wrench } from "lucide-react";
import { cn } from "@/lib/cn";

type CalloutTone = "important" | "mistake" | "engineer" | "note";

const toneStyles: Record<CalloutTone, string> = {
  important: "border-red-900/70 bg-red-950/35 text-red-100",
  mistake: "border-zinc-700 bg-zinc-950 text-zinc-100",
  engineer: "border-forge-wine/70 bg-forge-burgundy/20 text-zinc-100",
  note: "border-zinc-700 bg-forge-panel2 text-zinc-100"
};

const icons = {
  important: Lightbulb,
  mistake: AlertTriangle,
  engineer: Wrench,
  note: Info
};

interface CalloutBoxProps {
  title: string;
  children: React.ReactNode;
  tone?: CalloutTone;
}

export function CalloutBox({ title, children, tone = "note" }: CalloutBoxProps) {
  const Icon = icons[tone];

  return (
    <aside className={cn("rounded-lg border p-4", toneStyles[tone])}>
      <div className="flex items-start gap-3">
        <Icon className="mt-0.5 h-5 w-5 shrink-0 text-red-300" aria-hidden />
        <div>
          <h3 className="font-semibold text-white">{title}</h3>
          <div className="mt-1 text-sm leading-6 text-zinc-300">{children}</div>
        </div>
      </div>
    </aside>
  );
}
