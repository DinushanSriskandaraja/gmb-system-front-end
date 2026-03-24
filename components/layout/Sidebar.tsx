"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  Ruler, 
  Calculator, 
  Package, 
  FileText,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Customers", href: "/customers", icon: Users },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  { name: "Measurements", href: "/measurements", icon: Ruler },
  { name: "Quotations", href: "/quotations", icon: Calculator },
  { name: "Stocks", href: "/stocks", icon: Package },
  { name: "Paperworks", href: "/paperworks", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-border">
        <span className="text-xl font-bold tracking-tight text-foreground">GMB System</span>
      </div>
      <div className="flex flex-1 flex-col overflow-y-auto px-4 py-6">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0 transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="mt-auto border-t border-border p-4">
        <Link
          href="/settings"
          className="group flex items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Settings className="h-5 w-5 shrink-0 text-muted-foreground group-hover:text-foreground" />
          Settings
        </Link>
      </div>
    </div>
  );
}
