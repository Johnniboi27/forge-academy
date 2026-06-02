import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface SidebarLink {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface SidebarProps {
  title: string;
  links: SidebarLink[];
}

export function Sidebar({ title, links }: SidebarProps) {
  return (
    <aside className="rounded-lg border border-zinc-800 bg-forge-panel p-4">
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
        {title}
      </h2>
      <nav className="mt-4 space-y-2" aria-label={title}>
        {links.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-zinc-300 transition hover:bg-zinc-900 hover:text-white"
          >
            <Icon className="h-4 w-4 text-red-300" aria-hidden />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
