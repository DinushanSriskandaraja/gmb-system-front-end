import { Plus, Search, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockCustomers = [
  { id: "1", name: "Alice Smith", email: "alice@example.com", phone: "+61 412 345 678", totalJobs: 3, status: "Active" },
  { id: "2", name: "Bob Johnson", email: "bob@example.com", phone: "+61 498 765 432", totalJobs: 1, status: "Active" },
  { id: "3", name: "Charlie Davis", email: "charlie@example.com", phone: "+61 444 555 666", totalJobs: 0, status: "Lead" },
];

export default function CustomersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
            Customers
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            A list of all customers bridging leads and active jobs.
          </p>
        </div>
        <div className="mt-4 sm:ml-4 sm:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
        </div>
      </div>

      <div className="flex border-b border-border pb-4 mb-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full rounded-md border border-border bg-card px-10 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500 dark:text-white"
          />
        </div>
      </div>

      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg dark:ring-white/10">
        <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-800">
          <thead className="bg-background/50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-foreground sm:pl-6">Name</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Contact</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Status</th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-foreground">Jobs</th>
              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800 bg-card">
            {mockCustomers.map((person) => (
              <tr key={person.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/50 transition-colors">
                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-slate-900 sm:pl-6 dark:text-slate-100">
                  {person.name}
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                  <div className="flex flex-col">
                    <span>{person.email}</span>
                    <span className="text-xs">{person.phone}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                  <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    person.status === 'Active' 
                      ? 'bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-500/10 dark:text-green-400 dark:ring-green-500/20'
                      : 'bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30'
                  }`}>
                    {person.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-4 text-sm text-muted-foreground">
                  {person.totalJobs}
                </td>
                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
