import { Plus, Search, MoreHorizontal, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockCustomers = [
  { id: "1", name: "Alice Smith",   initials: "AS", email: "alice@example.com", phone: "+61 412 345 678", jobs: 3, status: "Active" },
  { id: "2", name: "Bob Johnson",   initials: "BJ", email: "bob@example.com",   phone: "+61 498 765 432", jobs: 1, status: "Active" },
  { id: "3", name: "Charlie Davis", initials: "CD", email: "charlie@example.com",phone: "+61 444 555 666", jobs: 0, status: "Lead"   },
  { id: "4", name: "Diana Prince",  initials: "DP", email: "diana@example.com",  phone: "+61 411 222 333", jobs: 5, status: "Active" },
];

const statusClasses: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400",
  Lead:   "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400",
};

export default function CustomersPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Customers</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage your leads and active clients.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> Add Customer</Button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Search customers…" className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition" />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <table className="min-w-full">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="py-3 pl-6 pr-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden md:table-cell">Contact</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground hidden sm:table-cell">Jobs</th>
              <th className="py-3 pl-3 pr-6" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockCustomers.map((p) => (
              <tr key={p.id} className="group hover:bg-muted/30 transition-colors">
                <td className="py-4 pl-6 pr-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">{p.initials}</span>
                    <span className="text-sm font-medium text-foreground">{p.name}</span>
                  </div>
                </td>
                <td className="px-3 py-4 hidden md:table-cell">
                  <div className="flex flex-col gap-0.5 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><Mail className="h-3 w-3" />{p.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="h-3 w-3" />{p.phone}</span>
                  </div>
                </td>
                <td className="px-3 py-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${statusClasses[p.status]}`}>{p.status}</span>
                </td>
                <td className="px-3 py-4 hidden sm:table-cell text-sm text-muted-foreground">{p.jobs}</td>
                <td className="py-4 pl-3 pr-6 text-right">
                  <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100"><MoreHorizontal className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
