"use client";

import { useState } from "react";
import { Plus, Search, Phone, Mail, Box } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EntityCard } from "@/components/shared/EntityCard";
import { getSuppliers } from "@/lib/data";

const statusColors: Record<string, string> = {
  Active:     "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  Inactive:   "bg-gray-50 text-gray-700 ring-gray-600/20 dark:bg-gray-500/10 dark:text-gray-400 dark:ring-gray-500/20",
};

const statusOptions = ["Active", "Inactive"];

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState(getSuppliers());
  const [filter, setFilter] = useState("All");

  const updateStatus = (id: string, newStatus: string) => {
    setSuppliers(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const visibleSuppliers = filter === "All" ? suppliers : suppliers.filter(s => s.status === filter);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Suppliers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your suppliers, manufacturers, and component vendors.
          </p>
        </div>
        <Button className="w-full sm:w-auto"><Plus className="mr-2 h-4 w-4" /> Add Supplier</Button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 md:items-center">
        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Inactive"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border border-border px-3 py-1 text-xs font-medium transition hover:bg-muted hover:text-foreground ${filter === f ? 'bg-accent text-white border-accent' : 'bg-card text-muted-foreground'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="md:ml-auto relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            placeholder="Search suppliers…"
            className="h-8 w-full md:w-64 rounded-full border border-border bg-card pl-8 pr-4 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visibleSuppliers.map((s) => (
          <EntityCard
            key={s.id}
            initials={s.initials}
            title={s.name}
            subtitle={s.address}
            badge={{ 
              label: s.status, 
              color: statusColors[s.status] || "bg-gray-50 text-gray-700 ring-gray-600/20",
              options: statusOptions,
              onValueChange: (val) => updateStatus(s.id, val)
            }}
            meta={[
              { icon: Phone, label: s.phone },
              { icon: Mail,  label: s.email },
              { icon: Box,   label: `Category: ${s.category}` },
            ]}
            onClick={() => {}}
          />
        ))}
        {visibleSuppliers.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No suppliers found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
