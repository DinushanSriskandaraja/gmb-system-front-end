"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Phone, Mail, Clock, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EntityCard } from "@/components/shared/EntityCard";
import { getCustomers } from "@/lib/data";

const statusColors: Record<string, string> = {
  Lead:       "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
  Enquired:   "bg-violet-50 text-violet-700 ring-violet-700/10 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/30",
  "Quote Sent": "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
};

const statusOptions = ["Lead", "Enquired", "Quote Sent"];

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState(getCustomers());
  const [filter, setFilter] = useState("All");

  const updateStatus = (id: string, newStatus: string) => {
    setCustomers(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const visibleCustomers = filter === "All" ? customers : customers.filter(c => c.status === filter);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Enquiries & Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track incoming requests and quote enquiries from potential customers.
          </p>
        </div>
        <Button className="w-full sm:w-auto"><Plus className="mr-2 h-4 w-4" /> Add Enquiry</Button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 md:items-center">
        <div className="flex flex-wrap gap-2">
          {["All", "Lead", "Enquired", "Quote Sent"].map((f) => (
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
            placeholder="Search…"
            className="h-8 w-full md:w-64 rounded-full border border-border bg-card pl-8 pr-4 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visibleCustomers.map((c) => (
          <EntityCard
            key={c.id}
            initials={c.initials}
            title={c.name}
            subtitle={c.address}
            badge={{ 
              label: c.status, 
              color: statusColors[c.status],
              options: statusOptions,
              onValueChange: (val) => updateStatus(c.id, val)
            }}
            meta={[
              { icon: Phone,        label: c.phone },
              { icon: Mail,         label: c.email },
              { icon: Clock,        label: `Req: ${c.requested}` },
              { icon: CalendarIcon, label: `Meas: ${c.measurementDate}` },
            ]}
            onClick={() => router.push(`/customer-profile/${c.id}`)}
          />
        ))}
        {visibleCustomers.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No enquiries found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
