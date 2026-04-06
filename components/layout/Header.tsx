"use client";

import { Bell, Search, Command } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { motion } from "framer-motion";

export function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-20 shrink-0 items-center justify-between gap-4 border-b border-border bg-background/60 px-8 backdrop-blur-xl transition-all duration-300">
      <div className="flex items-center gap-8 flex-1">
        {/* Search */}
        <div className="relative group flex flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-muted-foreground group-focus-within:text-accent transition-colors" aria-hidden="true" />
          </div>
          <input
            id="search-field"
            className="block w-full h-11 rounded-xl border border-border/50 bg-muted/30 pl-10 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/30 transition-all duration-300 group-hover:bg-muted/50"
            placeholder="Search anything..."
            type="search"
            name="search"
          />
          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <kbd className="hidden sm:flex h-5 items-center gap-1 rounded border border-border bg-background px-1.5 font-sans text-[10px] font-medium text-muted-foreground opacity-70">
              <Command className="h-3 w-3" /> K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-muted/30 text-muted-foreground transition-all hover:bg-muted/50 hover:text-foreground border border-border/50"
        >
          <span className="sr-only">Notifications</span>
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-accent ring-2 ring-background animate-pulse" />
        </motion.button>

        <div className="h-6 w-px bg-border/50 mx-2" />

        {/* User Profile */}
        <motion.button 
          whileHover={{ x: 2 }}
          className="flex items-center gap-3 rounded-xl p-1.5 pr-3 text-sm font-medium text-foreground transition-all hover:bg-muted/30 border border-transparent hover:border-border/30"
        >
          <div className="relative">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-indigo-600 text-[12px] font-bold text-white shadow-lg shadow-accent/20">
              GM
            </span>
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-emerald-500" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-sm font-bold leading-none">GM Admin</p>
            <p className="text-[10px] text-muted-foreground mt-1">Super User</p>
          </div>
        </motion.button>
      </div>
    </header>
  );
}
