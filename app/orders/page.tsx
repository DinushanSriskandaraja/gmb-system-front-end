"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, CalendarIcon, Package, DollarSign, Store, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EntityCard } from "@/components/shared/EntityCard";
import { getOrders, updateOrder, createOrder } from "@/lib/db/orders";
import { getSuppliers } from "@/lib/db/suppliers";
import { getProducts } from "@/lib/db/products";
import { Order } from "@/lib/db/types";
import { OrderForm } from "@/components/orders/OrderForm";

const statusColors: Record<string, string> = {
  "Order Placed":    "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
  "Pending":         "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  "Completed":       "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
  "Stock Received":  "bg-violet-50 text-violet-700 ring-violet-700/10 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/30",
};

const statusOptions = ["Order Placed", "Pending", "Completed", "Stock Received"];

export default function OrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [o, s, p] = await Promise.all([
        getOrders(),
        getSuppliers(),
        getProducts()
      ]);
      setOrders(o);
      setSuppliers(s);
      setProducts(p);
    } catch (err) {
      console.error("Failed to load orders data", err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      setOrders(prev => prev.map(o => o.order_id === id ? { ...o, status: newStatus as any } : o));
      await updateOrder(id, { status: newStatus as any });
    } catch (err) {
      console.error("Failed to update status", err);
      fetchData();
    }
  };

  const handleSave = async (data: any) => {
    try {
      await createOrder(data);
      await fetchData();
    } catch (err: any) {
      alert("Failed to create order: " + err.message);
    }
  };

  const visibleOrders = orders.filter(o => {
    const matchesFilter = filter === "All" ? true : o.status === filter;
    const matchesSearch = o.order_id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Purchase Orders</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your stock orders with suppliers from placement to receipt.
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="w-full sm:w-auto"><Plus className="mr-2 h-4 w-4" /> Create Order</Button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 md:items-center">
        <div className="flex flex-wrap gap-2">
          {["All", "Order Placed", "Pending", "Completed", "Stock Received"].map((f) => (
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full md:w-64 rounded-full border border-border bg-card pl-8 pr-4 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition"
          />
        </div>
      </div>

      {loading ? (
        <div className="w-full py-20 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {visibleOrders.map((o) => {
            const initials = o.order_id.substring(0, 2).toUpperCase();
            return (
            <EntityCard
              key={o.order_id}
              initials={initials}
              title={`Order ${o.order_id.substring(0, 8)}`}
              subtitle={o.supplier_id || "No Supplier Configured"}
              badge={{ 
                label: o.status, 
                color: statusColors[o.status] || "bg-gray-50 text-gray-700 ring-gray-600/20",
                options: statusOptions,
                onValueChange: (val) => updateStatus(o.order_id, val)
              }}
              meta={[
                { icon: Package,      label: `Product ID: ${o.products_catalog_id?.substring(0,8) || "N/A"}` },
                { icon: Store,        label: o.supplier_id ? `Supp: ${o.supplier_id.substring(0, 8)}` : "Unknown Supplier" },
                { icon: DollarSign,   label: `$${o.total_amount.toFixed(2)}` },
                { icon: CalendarIcon, label: o.expected_delivery_date ? `Due: ${new Date(o.expected_delivery_date).toLocaleDateString()}` : "No Date" },
              ]}
              onClick={() => router.push(`/orders/${o.order_id}`)}
            />
          )})}
          {visibleOrders.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No purchase orders found.
            </div>
          )}
        </div>
      )}

      {isFormOpen && (
        <OrderForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={handleSave} 
          suppliers={suppliers} 
          products={products} 
        />
      )}
    </div>
  );
}
