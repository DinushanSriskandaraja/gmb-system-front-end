import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockStocks = [
  { id: "1", sku: "BL-ROLLER-01", name: "Premium Roller Fabric - Dawn", category: "Fabric", qty: 150, unit: "meters", status: "In Stock" },
  { id: "2", sku: "BL-VENETIAN-WD", name: "Oak Wood Slats 50mm", category: "Hardware", qty: 25, unit: "boxes", status: "Low Stock" },
  { id: "3", sku: "HD-BRACKET-M", name: "Metal Mounting Brackets (Pair)", category: "Hardware", qty: 0, unit: "pairs", status: "Out of Stock" },
];

export default function StocksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
            Inventory & Stocks
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your hardware, fabrics, and components.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
      </div>

      <div className="flex border-b border-border pb-4 mb-4 gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search items..."
            className="w-full rounded-md border border-border bg-card px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500 dark:text-white"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4"/> Filter
        </Button>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg dark:ring-white/10">
        <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-800">
          <thead className="bg-background/50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-6">Item</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Category</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Stock Level</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-card">
            {mockStocks.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                  <div className="font-medium text-foreground">{item.name}</div>
                  <div className="text-muted-foreground font-mono text-xs mt-1">{item.sku}</div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                  {item.category}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {item.qty} <span className="text-muted-foreground">{item.unit}</span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    item.status === 'In Stock' 
                      ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20'
                      : item.status === 'Low Stock'
                      ? 'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20'
                      : 'bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20'
                  }`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
