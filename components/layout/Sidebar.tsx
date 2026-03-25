"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Users, Briefcase, Ruler,
  Calculator, Package, FileText, Settings, Layers, Truck, ShoppingCart, UserCog
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Enquiries", href: "/customers", icon: Users },
  { name: "Products", href: "/products", icon: Package },
  { name: "Jobs", href: "/jobs", icon: Briefcase },
  // { name: "Measurements", href: "/measurements",icon: Ruler },
  // { name: "Quotations",   href: "/quotations",  icon: Calculator },
  { name: "Stocks", href: "/stocks", icon: Package },
  { name: "Suppliers", href: "/suppliers", icon: Truck },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Employees", href: "/employees", icon: UserCog },
  // { name: "Paperworks",   href: "/paperworks",  icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-white/10">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white shadow-lg shadow-accent/40">
          <Layers className="h-4 w-4" />
        </div>
        <div>
          <p className="text-sm font-bold tracking-tight text-white">GMB System</p>
          <p className="text-[10px] text-sidebar-foreground/60 uppercase tracking-widest">Curtain &amp; Blind</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5">
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">
          Main Menu
        </p>
        {navigation.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150",
                isActive
                  ? "bg-accent text-white shadow-md shadow-accent/30"
                  : "text-sidebar-foreground hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className={cn("h-4 w-4 shrink-0 transition-transform duration-150", isActive ? "text-white" : "text-sidebar-foreground/60 group-hover:text-white group-hover:scale-110")} />
              {item.name}
              {isActive && <span className="absolute right-3 h-1.5 w-1.5 rounded-full bg-white/70" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/10 px-3 py-4">
        <Link
          href="/settings"
          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/70 transition-all hover:bg-white/10 hover:text-white"
        >
          <Settings className="h-4 w-4 shrink-0 group-hover:rotate-45 transition-transform duration-300" />
          Settings
        </Link>
      </div>
    </aside>
  );
}
