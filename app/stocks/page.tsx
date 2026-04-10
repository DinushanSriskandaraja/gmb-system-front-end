"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getInventory, createInventory } from "@/lib/db/inventory";
import { getProducts } from "@/lib/db/products";
import { InventoryForm } from "@/components/stocks/InventoryForm";

const badge: Record<string, string> = {
  "In Stock":    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Low Stock":   "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400",
  "Out of Stock":"bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400",
};

export default function StocksPage() {
  const [stocks, setStocks] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [inv, prods] = await Promise.all([
        getInventory().catch(() => []),
        getProducts().catch(() => []),
      ]);
      setStocks(inv);
      setProducts(prods);
    } catch (err) {
      console.error("Failed to fetch inventory", err);
      // Guarantee arrays so the UI logic doesn't fatally crash
      setStocks([]);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (data: any) => {
    try {
      await createInventory(data);
      await fetchData();
    } catch (err: any) {
      alert("Failed to save inventory: " + err.message);
    }
  };

  const filtered = stocks.filter(s => 
    s.product?.item_name?.toLowerCase().includes(search.toLowerCase()) || ""
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Inventory & Stocks</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your fabrics, hardware, and components.</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)}><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input 
            placeholder="Search items…" 
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition" 
          />
        </div>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
      </div>

      {loading ? (
        <div className="py-20 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-accent" /></div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="py-3 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Item</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Category</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Stock Level</th>
                <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map((item) => {
                let status = "In Stock";
                if (item.quantity_on_hand === 0) status = "Out of Stock";
                else if (item.quantity_on_hand <= item.reorder_level) status = "Low Stock";
                
                return (
                  <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                    <td className="py-4 pl-6 pr-3">
                      <p className="text-sm font-medium text-foreground">{item.product?.item_name || "Unknown Product"}</p>
                      <p className="text-xs font-mono text-muted-foreground mt-0.5">{item.product_id?.substring(0,8)}</p>
                    </td>
                    <td className="px-3 py-4 hidden sm:table-cell text-sm text-muted-foreground">{item.product?.category?.name || "N/A"}</td>
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-semibold text-foreground">{item.quantity_on_hand}</span>
                        <span className="text-xs text-muted-foreground">{item.product?.unit || 'qty'}</span>
                      </div>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${badge[status]}`}>{status}</span>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-muted-foreground">No stock items found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {isFormOpen && (
        <InventoryForm 
          onClose={() => setIsFormOpen(false)}
          onSave={handleSave}
          products={products}
        />
      )}
    </div>
  );
}
