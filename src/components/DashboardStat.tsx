import type { LucideIcon } from "lucide-react";

interface DashboardStatProps {
  label: string;
  value: string;
  detail: string;
  icon: LucideIcon;
}

export function DashboardStat({ label, value, detail, icon: Icon }: DashboardStatProps) {
  return (
    <div className="rounded-lg border border-zinc-800 bg-forge-panel p-4 shadow-forge">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
          <p className="mt-1 text-sm text-zinc-400">{detail}</p>
        </div>
        <div className="rounded-lg border border-red-900/60 bg-red-950/30 p-2 text-red-200">
          <Icon className="h-5 w-5" aria-hidden />
        </div>
      </div>
    </div>
  );
}
