"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Plus, Search, Phone, Mail, Clock, CalendarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EntityCard } from "@/components/shared/EntityCard";
import { getCustomers, updateCustomer, createCustomer } from "@/lib/db/customers";
import { Customer } from "@/lib/db/types";
import { CustomerForm } from "@/components/customers/CustomerForm";

const statusColors: Record<string, string> = {
  Lead:       "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
  Enquired:   "bg-violet-50 text-violet-700 ring-violet-700/10 dark:bg-violet-400/10 dark:text-violet-400 dark:ring-violet-400/30",
  "Quote Sent": "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  "order Completed": "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
};

const statusOptions = ["Lead", "Enquired", "Quote Sent", "order Completed"];

export default function CustomersPage() {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await getCustomers();
      setCustomers(data);
    } catch (err) {
      console.error("Failed to load customers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCustomer = async (data: any) => {
    try {
      await createCustomer(data);
      await fetchCustomers();
    } catch (err: any) {
      alert("Failed to create enquiry: " + err.message);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      // Optimistic update
      setCustomers(prev => prev.map(c => c.customer_id === id ? { ...c, status: newStatus as any } : c));
      await updateCustomer(id, { status: newStatus as any });
    } catch (err) {
      console.error("Failed to update status", err);
      fetchCustomers();
    }
  };

  const visibleCustomers = customers.filter(c => {
    const matchesFilter = filter === "All" ? true : c.status === filter;
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
                          (c.phone && c.phone.includes(search));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Enquiries & Leads</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track incoming requests and quote enquiries from potential customers.
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="w-full sm:w-auto"><Plus className="mr-2 h-4 w-4" /> Add Enquiry</Button>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-6 md:items-center">
        <div className="flex flex-wrap gap-2">
          {["All", "Lead", "Enquired", "Quote Sent", "order Completed"].map((f) => (
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
          {visibleCustomers.map((c) => {
            const initials = c.name.split(" ").map(n => n[0]).join("").toUpperCase().substring(0, 2);
            return (
            <EntityCard
              key={c.customer_id}
              initials={initials}
              title={c.name}
              subtitle={c.address || "No Address Provided"}
              badge={{ 
                label: c.status, 
                color: statusColors[c.status] || "bg-gray-50 text-gray-700",
                options: statusOptions,
                onValueChange: (val) => updateStatus(c.customer_id, val)
              }}
              meta={[
                { icon: Phone,        label: c.phone || "No Phone" },
                { icon: Mail,         label: c.email || "No Email" },
                { icon: Clock,        label: `Req: ${new Date(c.created_at).toLocaleDateString()}` },
              ]}
              onClick={() => router.push(`/customer-profile/${c.customer_id}`)}
            />
          )})}
          {visibleCustomers.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              No enquiries found.
            </div>
          )}
        </div>
      )}

      {isFormOpen && (
        <CustomerForm 
          onClose={() => setIsFormOpen(false)}
          onSave={handleSaveCustomer}
        />
      )}
    </div>
  );
}
