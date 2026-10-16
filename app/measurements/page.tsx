"use client";

import { useState, useEffect } from "react";
import { Plus, Eye, Edit2, Trash2, Filter, Search, ClipboardList, CheckCircle2, Clock, FileWarning, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type FilterType = "all" | "final" | "quotation" | "draft";

interface MeasurementRecord {
  id: string;
  jobNo: string;
  customerName: string;
  address: string;
  phoneNo: string;
  date: string;
  status: "Final" | "For Quotation" | "Draft";
  fabricConfirmed: boolean;
  locationsCount: number;
  coveringsCount: number;
}



const statusConfig = {
  Final:          { label: "Final",        cls: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20", icon: CheckCircle2 },
  "For Quotation":{ label: "For Quotation",cls: "bg-amber-500/10 text-amber-500 border border-amber-500/20",     icon: Clock },
  Draft:          { label: "Draft",        cls: "bg-slate-500/10 text-slate-400 border border-slate-500/20",      icon: FileWarning },
};

export default function MeasurementsListPage() {
  const router = useRouter();
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  
  const [measurements, setMeasurements] = useState<any[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  useEffect(() => {
    import('@/lib/db/measurements').then(({ getMeasurements }) => {
      getMeasurements().then(data => {
        setMeasurements(data || []);
      }).catch(err => {
        console.error("Failed to load measurements", err);
      }).finally(() => {
        setLoadingList(false);
      });
    });
  }, []);

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<"choose" | "oldUser">("choose");
  const [loadingDb, setLoadingDb] = useState(false);
  const [customers, setCustomers] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [searchEntity, setSearchEntity] = useState("");

  const handleOldUser = async () => {
    setModalStep("oldUser");
    setLoadingDb(true);
    try {
      const { getCustomers } = await import('@/lib/db/customers');
      const { getEnquiries } = await import('@/lib/db/enquiries');
      const [cList, eList] = await Promise.all([getCustomers(), getEnquiries()]);
      setCustomers(cList || []);
      setJobs(eList || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDb(false);
    }
  };

  const filtered = measurements.filter(r => {
    const matchFilter =
      filter === "all" ? true :
      filter === "final" ? r.status === "Final" :
      filter === "quotation" ? r.status === "For Quotation" :
      r.status === "Draft";
    const q = search.toLowerCase();
    const cName = r.customer?.name || r.client_info?.clientName || "Unknown Customer";
    const jNo = r.job_no || "Draft";
    const addr = r.customer?.address || r.client_info?.clientAddress || "";
    const matchSearch = !q || cName.toLowerCase().includes(q) || jNo.toLowerCase().includes(q) || addr.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const stats = [
    { label: "Total Sheets", value: measurements.length, icon: ClipboardList, color: "accent" },
    { label: "Finalised", value: measurements.filter(r => r.status === "Final").length, icon: CheckCircle2, color: "emerald" },
    { label: "Pending Quote", value: measurements.filter(r => r.status === "For Quotation").length, icon: Clock, color: "amber" },
    { label: "Drafts", value: measurements.filter(r => r.status === "Draft").length, icon: FileWarning, color: "slate" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Measurement Sheets</h1>
          <p className="text-sm text-muted-foreground mt-1">All recorded customer site measurements</p>
        </div>
        <Button onClick={() => { setShowModal(true); setModalStep("choose"); }} className="gap-2 bg-gradient-to-r from-accent to-indigo-600 text-white shadow-md shadow-accent/20 hover:from-accent/90 hover:to-indigo-700">
          <Plus className="h-4 w-4" /> New Sheet
        </Button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="rounded-2xl border border-border bg-card p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
              color === "accent"  ? "bg-accent/10 text-accent" :
              color === "emerald" ? "bg-emerald-500/10 text-emerald-500" :
              color === "amber"   ? "bg-amber-500/10 text-amber-500" :
              "bg-slate-500/10 text-slate-400"
            }`}>
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table Card */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 border-b border-border bg-muted/20">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, job no…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-border bg-background/60 outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/60 transition-all placeholder:text-muted-foreground/50"
            />
          </div>

          {/* Filter pills */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div className="flex rounded-xl border border-border p-1 bg-background/50 gap-1">
              {([
                { key: "all", label: "All" },
                { key: "final", label: "Final" },
                { key: "quotation", label: "For Quote" },
                { key: "draft", label: "Draft" },
              ] as const).map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-200 ${
                    filter === key
                      ? "bg-accent text-accent-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/10 border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold">Job No</th>
                <th className="px-6 py-4 font-semibold">Customer</th>
                <th className="px-6 py-4 font-semibold hidden md:table-cell">Address</th>
                <th className="px-6 py-4 font-semibold hidden sm:table-cell">Date</th>
                <th className="px-6 py-4 font-semibold hidden lg:table-cell">Locations</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold hidden lg:table-cell">Fabric</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {loadingList ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-muted-foreground">
                    <Loader2 className="h-8 w-8 mx-auto mb-3 animate-spin text-accent" />
                    <p className="font-medium">Loading measurement sheets...</p>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-muted-foreground">
                    <ClipboardList className="h-8 w-8 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No measurement sheets found</p>
                    <p className="text-xs mt-1">Try adjusting the filter or search</p>
                  </td>
                </tr>
              ) : filtered.map((record) => {
                const s = statusConfig[record.status as keyof typeof statusConfig] || statusConfig.Draft;
                const StatusIcon = s.icon;
                const cName = record.customer?.name || record.client_info?.clientName || "Unknown";
                const cPhone = record.customer?.phone || record.client_info?.contactNumber || "No Phone";
                const cAddress = record.customer?.address || record.client_info?.clientAddress || "No Address";
                
                return (
                  <tr key={record.id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-semibold text-accent">{record.job_no || "DRAFT"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{cName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{cPhone}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-xs text-muted-foreground max-w-[200px] truncate">{cAddress}</p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell text-muted-foreground text-xs">
                      {new Date(record.created_at || record.date).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{record.locations_count || 0}</span> loc ·{" "}
                        <span className="font-semibold text-foreground">{record.coverings_count || 0}</span> cov
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.cls}`}>
                        <StatusIcon className="h-3 w-3" />
                        {s.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                        record.fabric_confirmed
                          ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          : "bg-muted/40 text-muted-foreground border border-border"
                      }`}>
                        {record.fabric_confirmed ? "✓ Confirmed" : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href={`/measurements/${record.id}`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-accent">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Link href={`/measurements/${record.id}/edit`}>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-blue-500">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-muted-foreground hover:text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-border bg-muted/10 flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filtered.length}</span> of{" "}
            <span className="font-semibold text-foreground">{measurements.length}</span> records
          </p>
          <p className="text-xs text-muted-foreground hidden sm:block">
            {measurements.reduce((a, r) => a + (r.coverings_count || 0), 0)} total coverings recorded
          </p>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg animate-in fade-in zoom-in duration-200 flex flex-col max-h-[90vh]">
            <div className="flex flex-col mb-6">
              <h2 className="text-xl font-bold text-foreground mb-1">
                {modalStep === "choose" ? "Create Measurement Sheet" : "Select Customer or Job"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {modalStep === "choose" ? "Is this for a new client or an existing one?" : "Search to auto-fill client details."}
              </p>
            </div>

            {modalStep === "choose" ? (
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col gap-2 border-border/80 hover:border-accent hover:bg-accent/5" 
                  onClick={() => router.push("/measurements/new")}
                >
                  <Plus className="h-6 w-6 text-accent" />
                  <span className="font-medium text-foreground">New User</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-24 flex flex-col gap-2 border-border/80 hover:border-accent hover:bg-accent/5" 
                  onClick={handleOldUser}
                >
                  <Search className="h-6 w-6 text-accent" />
                  <span className="font-medium text-foreground">Old User</span>
                </Button>
              </div>
            ) : (
              <div className="flex-1 overflow-hidden flex flex-col gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    autoFocus
                    placeholder="Search by name, email, or phone..."
                    value={searchEntity}
                    onChange={(e) => setSearchEntity(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 text-sm rounded-xl border border-border bg-background/60 outline-none focus:ring-2 focus:ring-accent/60 transition-all placeholder:text-muted-foreground/50"
                  />
                </div>
                
                <div className="flex-1 overflow-y-auto pr-2 space-y-2">
                  {loadingDb ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">Loading records...</div>
                  ) : customers.length === 0 ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">No customers found.</div>
                  ) : (
                    customers
                      .filter(c => (c.name || '').toLowerCase().includes(searchEntity.toLowerCase()) || (c.email || '').toLowerCase().includes(searchEntity.toLowerCase()))
                      .map((c: any) => {
                        const customerJobs = jobs.filter(j => j.customer_id === c.customer_id);
                        return (
                          <div key={c.customer_id} className="rounded-xl border border-border bg-muted/20 p-3 hover:bg-accent/5 transition-colors cursor-pointer group" onClick={() => router.push(`/measurements/new?customerId=${c.customer_id}`)}>
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-sm text-foreground group-hover:text-accent">{c.name}</h3>
                                <p className="text-xs text-muted-foreground mt-0.5">{c.email || c.phone || 'No contact info'}</p>
                              </div>
                              <span className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 bg-background rounded-md border border-border text-muted-foreground">Select</span>
                            </div>
                            
                            {customerJobs.length > 0 && (
                              <div className="mt-3 space-y-2">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Recent Enquiries/Jobs</p>
                                {customerJobs.map(j => (
                                  <div key={j.id} className="text-xs flex items-center justify-between p-2 rounded-lg bg-background/50 border border-border hover:border-accent/30" onClick={(e) => { e.stopPropagation(); router.push(`/measurements/new?customerId=${c.customer_id}&jobId=${j.id}`); }}>
                                    <div>
                                      <span className="font-medium text-foreground">{j.is_job ? 'Job' : 'Enquiry'}</span>
                                      <span className="text-muted-foreground ml-2">{new Date(j.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${j.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                      {j.status}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                    })
                  )}
                </div>
              </div>
            )}
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline" onClick={() => { setShowModal(false); setModalStep("choose"); }}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
