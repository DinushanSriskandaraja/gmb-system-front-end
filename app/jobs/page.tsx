"use client";

import { Plus, Calendar, MapPin, Tag } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { EntityCard } from "@/components/shared/EntityCard";
import { useRouter } from "next/navigation";
import { getJobs } from "@/lib/data";

const stageColors: Record<string, string> = {
  "Job Created":   "bg-blue-50 text-blue-700 ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30",
  "Job Rework":    "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20",
  "Job Completed": "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20",
};

export default function JobsPage() {
  const router = useRouter();
  const jobs = getJobs();
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Jobs Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">Track jobs from measure to install.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> New Job</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        {jobs.map((job) => (
          <EntityCard
            key={job.id}
            initials={job.initials}
            title={job.customer}
            subtitle={job.id}
            badge={{ label: job.status, color: stageColors[job.status] }}
            meta={[
              { icon: Tag,      label: job.type },
              { icon: MapPin,   label: job.location },
              { icon: Calendar, label: job.date },
            ]}
            onClick={() => router.push(`/customer-profile/${job.customerId}?from=job`)}
          />
        ))}
      </div>
    </div>
  );
}
