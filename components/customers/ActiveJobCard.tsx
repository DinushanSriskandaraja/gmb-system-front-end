import { FileText } from "lucide-react";

export function ActiveJobCard({ customer }: { customer: any }) {
  if (!customer.hasJob) return null;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold mb-4 text-foreground">Active Job Details</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3 text-sm">
          <FileText className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{customer.jobId}</span>
            <span className="text-xs text-muted-foreground">{customer.jobType} • {customer.jobLocation}</span>
          </div>
        </div>
        <div className="mt-2 pl-7">
          <span className="inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
            {customer.jobStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
