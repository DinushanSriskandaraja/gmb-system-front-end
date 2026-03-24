import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockStocks = [
  { id: "1", sku: "BL-ROLLER-01", name: "Premium Roller Fabric – Dawn",  category: "Fabric",   qty: 150, unit: "m",     status: "In Stock"    },
  { id: "2", sku: "BL-VENETIAN-WD",name: "Oak Wood Slats 50mm",         category: "Hardware", qty: 25,  unit: "boxes", status: "Low Stock"   },
  { id: "3", sku: "HD-BRACKET-M", name: "Metal Mounting Brackets (pair)",category: "Hardware", qty: 0,   unit: "pairs", status: "Out of Stock" },
  { id: "4", sku: "CU-SHEER-WT",  name: "White Sheer Curtain Roll",     category: "Fabric",   qty: 80,  unit: "m",     status: "In Stock"    },
];

const badge: Record<string, string> = {
  "In Stock":    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400",
  "Low Stock":   "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400",
  "Out of Stock":"bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400",
};

export default function StocksPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Inventory & Stocks</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your fabrics, hardware, and components.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Add Item</Button>
      </div>

      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input placeholder="Search items…" className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition" />
        </div>
        <Button variant="outline"><Filter className="mr-2 h-4 w-4" /> Filter</Button>
      </div>

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
            {mockStocks.map((item) => (
              <tr key={item.id} className="group hover:bg-muted/30 transition-colors">
                <td className="py-4 pl-6 pr-3">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs font-mono text-muted-foreground mt-0.5">{item.sku}</p>
                </td>
                <td className="px-3 py-4 hidden sm:table-cell text-sm text-muted-foreground">{item.category}</td>
                <td className="px-3 py-4">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-foreground">{item.qty}</span>
                    <span className="text-xs text-muted-foreground">{item.unit}</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${badge[item.status]}`}>{item.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
