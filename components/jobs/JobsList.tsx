"use client";

import { Tag, MapPin, Calendar } from "lucide-react";
import { EntityCard } from "@/components/shared/EntityCard";
import { useRouter } from "next/navigation";

const stageColors: Record<string, string> = {
  "Lead": "bg-gray-50 text-gray-700 ring-gray-600/10",
  "Enquired": "bg-gray-50 text-gray-700 ring-gray-600/10",
  "Quote Sent": "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  "Job Created": "bg-blue-50 text-blue-700 ring-blue-700/10",
  "In Progress": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "Completed": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Installed": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

export function JobsList({ jobs }: { jobs: any[] }) {
  const router = useRouter();
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {jobs.map((job) => (
        <EntityCard
          key={job.id}
          initials={job.customer?.name ? job.customer.name.substring(0, 2).toUpperCase() : "XX"}
          title={job.customer?.name || "Unknown Customer"}
          subtitle={`J-${job.id.substring(0, 8).toUpperCase()}`}
          badge={{ label: job.status, color: stageColors[job.status] || stageColors["Job Created"] }}
          meta={[
            { icon: Tag, label: "Various" }, // In a full implementation, derive from line items
            { icon: MapPin, label: job.customer?.address || "No Address" },
            { icon: Calendar, label: new Date(job.created_at).toLocaleDateString() },
          ]}
          onClick={() => router.push(`/customer-profile/${job.customer_id}?from=job`)}
        />
      ))}
      
      {jobs.length === 0 && (
        <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">No active jobs found.</p>
        </div>
      )}
    </div>
  );
}
