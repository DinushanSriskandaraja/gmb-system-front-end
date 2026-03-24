import { Bell, Search } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form className="relative flex flex-1" action="#" method="GET">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <Search
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-muted-foreground"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-foreground placeholder:text-muted-foreground focus:ring-0 sm:text-sm outline-none"
            placeholder="Search jobs, customers, exact quotes..."
            type="search"
            name="search"
          />
        </form>
        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <ThemeToggle />
          <button type="button" className="-m-2.5 p-2.5 text-muted-foreground hover:text-foreground">
            <span className="sr-only">View notifications</span>
            <Bell className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="hidden lg:block lg:h-6 lg:w-px lg:bg-border" aria-hidden="true" />
          <div className="flex items-center gap-x-4">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium text-foreground">
              GM
            </div>
            <span className="hidden lg:flex lg:items-center">
              <span className="ml-4 text-sm font-semibold leading-6 text-foreground" aria-hidden="true">
                Admin
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
