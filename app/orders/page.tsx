"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, CalendarIcon, Package, DollarSign, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EntityCard } from "@/components/shared/EntityCard";
import { getOrders } from "@/lib/data";

const statusColors: Record<string, string> = {
  "Order Placed":    "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
  "Pending Order":   "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  "Order Completed": "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  "Stock Received":  "bg-violet-50 text-violet-700 ring-violet-700/10 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/30",
};

const statusOptions = ["Order Placed", "Pending Order", "Order Completed", "Stock Received"];

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState(getOrders());
  const [filter, setFilter] = useState("All");

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
  };

  const visibleOrders = filter === "All" ? orders : orders.filter(o => o.status === filter);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Purchase Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your stock orders with suppliers from placement to receipt.
          </p>
        </div>
        <Button className="w-full sm:w-auto"><Plus className="mr-2 h-4 w-4" /> Create Order</Button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 md:items-center">
        <div className="flex flex-wrap gap-2">
          {["All", "Order Placed", "Pending Order", "Order Completed", "Stock Received"].map((f) => (
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
            placeholder="Search orders…"
            className="h-8 w-full md:w-64 rounded-full border border-border bg-card pl-8 pr-4 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {visibleOrders.map((o) => (
          <EntityCard
            key={o.id}
            initials={o.initials}
            title={o.id}
            subtitle={o.supplier}
            badge={{ 
              label: o.status, 
              color: statusColors[o.status] || "bg-gray-50 text-gray-700 ring-gray-600/20",
              options: statusOptions,
              onValueChange: (val) => updateStatus(o.id, val)
            }}
            meta={[
              { icon: Package,      label: o.item },
              { icon: Store,        label: `Supplier: ${o.supplier}` },
              { icon: DollarSign,   label: o.amount },
              { icon: CalendarIcon, label: `Due: ${o.expected}` },
            ]}
            onClick={() => router.push(`/orders/${o.id}`)}
          />
        ))}
        {visibleOrders.length === 0 && (
          <div className="col-span-full py-12 text-center text-muted-foreground">
            No purchase orders found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}
