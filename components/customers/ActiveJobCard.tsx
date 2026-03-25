import { FileText } from "lucide-react";

export function ActiveJobCard({ jobs }: { jobs: any[] }) {
  if (!jobs || jobs.length === 0) return null;
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold mb-4 text-foreground">All Past Jobs</h3>
      <div className="space-y-6">
        {jobs.map((job) => (
          <div key={job.id} className="space-y-4 pb-4 border-b border-border last:border-0 last:pb-0">
            <div className="flex items-start gap-3 text-sm">
              <FileText className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{job.id}</span>
                <span className="text-xs text-muted-foreground">{job.type} • {job.location}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">{job.date}</span>
              </div>
            </div>
            <div className="mt-2 pl-7">
              <span className="inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
                {job.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
