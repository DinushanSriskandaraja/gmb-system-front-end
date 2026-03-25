"use client";

import { useState } from "react";
import { Eye, Edit2, Trash2, Filter } from "lucide-react";
import { Button } from "@/components/ui/Button";

type FilterType = "customer" | "jobs";

interface MeasurementRecord {
  id: string;
  jobNo?: string;
  customerName: string;
  phoneNo: string;
  date: string;
  status: "Final" | "For Quotation";
  fabricConfirmed: boolean;
}

const mockData: MeasurementRecord[] = [
  {
    id: "1",
    jobNo: "J-1001",
    customerName: "John Doe",
    phoneNo: "+1234567890",
    date: "2024-03-20",
    status: "Final",
    fabricConfirmed: true,
  },
  {
    id: "2",
    jobNo: "J-1002",
    customerName: "Jane Smith",
    phoneNo: "+0987654321",
    date: "2024-03-21",
    status: "For Quotation",
    fabricConfirmed: false,
  },
  {
    id: "3",
    jobNo: "J-1003",
    customerName: "Michael Johnson",
    phoneNo: "+1122334455",
    date: "2024-03-22",
    status: "Final",
    fabricConfirmed: true,
  },
];

export function MeasurementsTable() {
  const [filter, setFilter] = useState<FilterType>("customer");

  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden mt-6">
      {/* Table Header / Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border px-6 py-4 bg-muted/30">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">View By:</span>
          <div className="flex rounded-lg border border-border p-1 bg-background">
            <button
              onClick={() => setFilter("customer")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === "customer"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Customer
            </button>
            <button
              onClick={() => setFilter("jobs")}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                filter === "jobs"
                  ? "bg-accent text-accent-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Jobs
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/20 border-b border-border">
            <tr>
              {filter === "jobs" && <th className="px-6 py-4 font-semibold">Job No</th>}
              <th className="px-6 py-4 font-semibold">Name</th>
              <th className="px-6 py-4 font-semibold">Phone No</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Fabric Confirmed</th>
              <th className="px-6 py-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockData.map((record) => (
              <tr key={record.id} className="hover:bg-muted/10 transition-colors">
                {filter === "jobs" && (
                  <td className="px-6 py-4 font-medium text-foreground">
                    {record.jobNo}
                  </td>
                )}
                <td className="px-6 py-4 text-foreground font-medium">
                  {record.customerName}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {record.phoneNo}
                </td>
                <td className="px-6 py-4 text-muted-foreground">
                  {record.date}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.status === "Final"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      record.fabricConfirmed
                        ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                        : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                    }`}
                  >
                    {record.fabricConfirmed ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-accent">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-blue-500">
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-500">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
