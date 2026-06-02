import { cn } from "@/lib/cn";

interface ProgressBarProps {
  value: number;
  label?: string;
  compact?: boolean;
}

export function ProgressBar({ value, label, compact }: ProgressBarProps) {
  const safeValue = Math.max(0, Math.min(100, Math.round(value)));

  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span>{label}</span>
          <span>{safeValue}%</span>
        </div>
      ) : null}
      <div
        className={cn(
          "overflow-hidden rounded-full border border-zinc-800 bg-zinc-950",
          compact ? "h-2" : "h-3"
        )}
        aria-label={label ?? "Progress"}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={safeValue}
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-forge-burgundy to-forge-ember transition-all"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}
