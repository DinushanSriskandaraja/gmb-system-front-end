"use client";

import { useState } from "react";
import { Plus, Eye, Edit2, Trash2, Filter, Search, ClipboardList, CheckCircle2, Clock, FileWarning } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

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

const mockData: MeasurementRecord[] = [
  {
    id: "1", jobNo: "J-1001", customerName: "John & Sarah Doe",
    address: "42 Oakwood Drive, Glen Waverley VIC 3150",
    phoneNo: "+61 412 345 678", date: "2024-03-20",
    status: "Final", fabricConfirmed: true, locationsCount: 5, coveringsCount: 9,
  },
  {
    id: "2", jobNo: "J-1002", customerName: "Jane Smith",
    address: "15 Harbour View Rd, Brighton VIC 3186",
    phoneNo: "+61 403 987 654", date: "2024-03-21",
    status: "For Quotation", fabricConfirmed: false, locationsCount: 3, coveringsCount: 4,
  },
  {
    id: "3", jobNo: "J-1003", customerName: "Michael Johnson",
    address: "8 Balmoral Court, Hawthorn VIC 3122",
    phoneNo: "+61 432 111 222", date: "2024-03-22",
    status: "Final", fabricConfirmed: true, locationsCount: 7, coveringsCount: 13,
  },
  {
    id: "4", jobNo: "J-1004", customerName: "Emily Chen",
    address: "23 Rosewood Ave, Balwyn VIC 3103",
    phoneNo: "+61 455 678 901", date: "2024-03-24",
    status: "Draft", fabricConfirmed: false, locationsCount: 2, coveringsCount: 3,
  },
  {
    id: "5", jobNo: "J-1005", customerName: "Carlos & Ana Rivera",
    address: "101 Federation Blvd, Doncaster VIC 3108",
    phoneNo: "+61 499 234 567", date: "2024-03-25",
    status: "For Quotation", fabricConfirmed: false, locationsCount: 4, coveringsCount: 7,
  },
];

const statusConfig = {
  Final:          { label: "Final",        cls: "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20", icon: CheckCircle2 },
  "For Quotation":{ label: "For Quotation",cls: "bg-amber-500/10 text-amber-500 border border-amber-500/20",     icon: Clock },
  Draft:          { label: "Draft",        cls: "bg-slate-500/10 text-slate-400 border border-slate-500/20",      icon: FileWarning },
};

export default function MeasurementsListPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");

  const filtered = mockData.filter(r => {
    const matchFilter =
      filter === "all" ? true :
      filter === "final" ? r.status === "Final" :
      filter === "quotation" ? r.status === "For Quotation" :
      r.status === "Draft";
    const q = search.toLowerCase();
    const matchSearch = !q || r.customerName.toLowerCase().includes(q) || r.jobNo.toLowerCase().includes(q) || r.address.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const stats = [
    { label: "Total Sheets", value: mockData.length, icon: ClipboardList, color: "accent" },
    { label: "Finalised", value: mockData.filter(r => r.status === "Final").length, icon: CheckCircle2, color: "emerald" },
    { label: "Pending Quote", value: mockData.filter(r => r.status === "For Quotation").length, icon: Clock, color: "amber" },
    { label: "Drafts", value: mockData.filter(r => r.status === "Draft").length, icon: FileWarning, color: "slate" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Measurement Sheets</h1>
          <p className="text-sm text-muted-foreground mt-1">All recorded customer site measurements</p>
        </div>
        <Link href="/measurements/new">
          <Button className="gap-2 bg-gradient-to-r from-accent to-indigo-600 text-white shadow-md shadow-accent/20 hover:from-accent/90 hover:to-indigo-700">
            <Plus className="h-4 w-4" /> New Sheet
          </Button>
        </Link>
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-16 text-center text-muted-foreground">
                    <ClipboardList className="h-8 w-8 mx-auto mb-3 opacity-30" />
                    <p className="font-medium">No measurement sheets found</p>
                    <p className="text-xs mt-1">Try adjusting the filter or search</p>
                  </td>
                </tr>
              ) : filtered.map((record) => {
                const s = statusConfig[record.status];
                const StatusIcon = s.icon;
                return (
                  <tr key={record.id} className="hover:bg-muted/10 transition-colors group">
                    <td className="px-6 py-4">
                      <span className="font-mono text-xs font-semibold text-accent">{record.jobNo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{record.customerName}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{record.phoneNo}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <p className="text-xs text-muted-foreground max-w-[200px] truncate">{record.address}</p>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell text-muted-foreground text-xs">
                      {new Date(record.date).toLocaleDateString("en-AU", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-semibold text-foreground">{record.locationsCount}</span> loc ·{" "}
                        <span className="font-semibold text-foreground">{record.coveringsCount}</span> cov
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
                        record.fabricConfirmed
                          ? "bg-blue-500/10 text-blue-500 border border-blue-500/20"
                          : "bg-muted/40 text-muted-foreground border border-border"
                      }`}>
                        {record.fabricConfirmed ? "✓ Confirmed" : "Pending"}
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
            <span className="font-semibold text-foreground">{mockData.length}</span> records
          </p>
          <p className="text-xs text-muted-foreground hidden sm:block">
            {mockData.reduce((a, r) => a + r.coveringsCount, 0)} total coverings recorded
          </p>
        </div>
      </div>
    </div>
  );
}
