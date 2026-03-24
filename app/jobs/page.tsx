import { Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

const stages = ["Measuring", "Quoted", "Production", "Installed"] as const;
type Stage = typeof stages[number];

const stageColors: Record<Stage, { dot: string; badge: string }> = {
  Measuring:  { dot: "bg-blue-400",    badge: "bg-blue-50 text-blue-700 dark:bg-blue-400/10 dark:text-blue-300"    },
  Quoted:     { dot: "bg-violet-400",  badge: "bg-violet-50 text-violet-700 dark:bg-violet-400/10 dark:text-violet-300" },
  Production: { dot: "bg-amber-400",   badge: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300"  },
  Installed:  { dot: "bg-emerald-400", badge: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"},
};

const mockJobs = [
  { id: "J-001", customer: "Alice Smith",   type: "Roller Blinds",       location: "Living Room",  status: "Measuring"  as Stage, date: "Oct 12" },
  { id: "J-002", customer: "Bob Johnson",   type: "Venetian Blinds",     location: "Whole House",  status: "Quoted"     as Stage, date: "Oct 15" },
  { id: "J-003", customer: "Charlie Davis", type: "Curtains",            location: "Master Bed",   status: "Production" as Stage, date: "Oct 18" },
  { id: "J-004", customer: "Diana Prince",  type: "Plantation Shutters", location: "Front Windows",status: "Installed"  as Stage, date: "Oct 05" },
];

export default function JobsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Jobs Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">Track jobs from measure to install.</p>
        </div>
        <Button><Plus className="mr-2 h-4 w-4" /> New Job</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {stages.map((stage) => {
          const jobs = mockJobs.filter((j) => j.status === stage);
          const col = stageColors[stage];
          return (
            <div key={stage} className="flex flex-col rounded-2xl border border-border bg-card shadow-sm min-h-[460px]">
              {/* Column header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${col.dot}`} />
                  <span className="text-sm font-semibold text-foreground">{stage}</span>
                </div>
                <span className="rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground">{jobs.length}</span>
              </div>
              {/* Job cards */}
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {jobs.map((job) => (
                  <div key={job.id} className="group rounded-xl bg-background border border-border p-4 shadow-sm hover:border-accent/50 hover:shadow-md transition-all cursor-pointer">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-mono text-muted-foreground">{job.id}</span>
                      <span className="flex items-center gap-1 text-[11px] text-muted-foreground"><Calendar className="h-3 w-3" />{job.date}</span>
                    </div>
                    <p className="text-sm font-semibold text-foreground">{job.customer}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{job.type} &bull; {job.location}</p>
                    <div className="mt-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium ${col.badge}`}>{job.status}</span>
                    </div>
                  </div>
                ))}
                {jobs.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-32 text-muted-foreground/40 text-xs text-center">
                    <span className="text-2xl mb-1">·  ·  ·</span>
                    No jobs yet
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
