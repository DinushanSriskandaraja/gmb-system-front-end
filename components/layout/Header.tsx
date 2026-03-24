import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card/80 px-6 backdrop-blur-md shadow-sm">
      {/* Search */}
      <div className="relative flex flex-1 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <input
          id="search-field"
          className="h-9 w-full rounded-lg border border-border bg-muted pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none ring-accent focus:ring-2 transition"
          placeholder="Search..."
          type="search"
          name="search"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <ThemeToggle />
        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted hover:text-foreground"
        >
          <span className="sr-only">Notifications</span>
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent ring-2 ring-card" />
        </button>

        <div className="mx-2 h-6 w-px bg-border" />

        {/* Avatar */}
        <button className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm font-medium text-foreground transition hover:bg-muted">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-white shadow-sm shadow-accent/40">
            GM
          </span>
          <span className="hidden lg:block">Admin</span>
        </button>
      </div>
    </header>
  );
}
