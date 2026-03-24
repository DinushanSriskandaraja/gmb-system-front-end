import { Search, FileText, Download, FileSignature, Receipt } from "lucide-react";
import { Button } from "@/components/ui/Button";

const documents = [
  { id: "INV-1029", type: "Invoice",      typeIcon: Receipt,       customer: "Alice Smith",   date: "Oct 12, 2026", amount: "$700.00", status: "Paid"    },
  { id: "DEL-4091", type: "Delivery Note",typeIcon: FileText,      customer: "Bob Johnson",   date: "Oct 14, 2026", amount: "—",       status: "Pending" },
  { id: "SIG-0022", type: "Sign-off",     typeIcon: FileSignature, customer: "Diana Prince",  date: "Oct 05, 2026", amount: "$1,200",  status: "Signed"  },
];

const badge: Record<string, string> = {
  Paid:    "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400",
  Signed:  "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400",
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400",
};

const iconBg: Record<string, string> = {
  Invoice:       "bg-blue-50 text-blue-600 dark:bg-blue-400/10 dark:text-blue-400",
  "Delivery Note":"bg-violet-50 text-violet-600 dark:bg-violet-400/10 dark:text-violet-400",
  "Sign-off":    "bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-400",
};

export default function PaperworksPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Paperworks</h1>
          <p className="text-sm text-muted-foreground mt-1">Invoices, delivery notes, and client sign-offs.</p>
        </div>
      </div>

      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input placeholder="Search documents…" className="h-9 w-full rounded-lg border border-border bg-card pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:ring-2 focus:ring-accent transition" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {documents.map((doc) => {
          const Icon = doc.typeIcon;
          return (
            <div key={doc.id} className="group relative rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md hover:border-accent/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${iconBg[doc.type]}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${badge[doc.status]}`}>
                  {doc.status}
                </span>
              </div>

              <h3 className="font-semibold text-sm text-foreground">{doc.customer}</h3>
              <p className="text-xs text-muted-foreground mt-0.5">{doc.type} &bull; {doc.id}</p>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground">{doc.date}</p>
                  {doc.amount !== "—" && <p className="text-sm font-semibold text-foreground">{doc.amount}</p>}
                </div>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <Download className="h-3.5 w-3.5" /> Download
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
