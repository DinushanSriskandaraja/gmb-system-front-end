import { Search, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/Button";

const documents = [
  { id: "INV-1029", type: "Invoice", customer: "Alice Smith", date: "Oct 12, 2026", status: "Paid" },
  { id: "DEL-4091", type: "Delivery Note", customer: "Bob Johnson", date: "Oct 14, 2026", status: "Pending" },
  { id: "SIG-0022", type: "Sign-off", customer: "Diana Prince", date: "Oct 05, 2026", status: "Signed" },
];

export default function PaperworksPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-slate-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Paperworks & Documents
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Access invoices, delivery notes, and client sign-off sheets.
          </p>
        </div>
      </div>

      <div className="flex border-b border-slate-200 dark:border-slate-800 pb-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search documents by ID or customer..."
            className="w-full rounded-md border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-slate-950 p-5 rounded-xl shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-slate-100 dark:bg-slate-900 rounded-lg text-slate-500 dark:text-slate-400">
                <FileText className="h-6 w-6" />
              </div>
              <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
                doc.status === 'Paid' || doc.status === 'Signed'
                  ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20'
                  : 'bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-500/10 dark:text-yellow-400 dark:ring-yellow-500/20'
              }`}>
                {doc.status}
              </span>
            </div>
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 truncate">{doc.customer}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{doc.type} &bull; {doc.id}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-sm">
              <span className="text-slate-400">{doc.date}</span>
              <Button variant="ghost" size="sm" className="h-8 gap-1 px-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 dark:hover:text-slate-100 dark:hover:bg-slate-800">
                <Download className="h-3 w-3" /> Download
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
