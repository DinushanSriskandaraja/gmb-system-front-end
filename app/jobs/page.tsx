import { Plus, Filter, Calendar } from "lucide-react";
import { Button } from "@/components/ui/Button";

const mockJobs = [
  { id: "J-001", customer: "Alice Smith", type: "Roller Blinds", location: "Living Room", status: "Measuring", date: "Oct 12, 2026" },
  { id: "J-002", customer: "Bob Johnson", type: "Venetian Blinds", location: "Whole House", status: "Quoted", date: "Oct 15, 2026" },
  { id: "J-003", customer: "Charlie Davis", type: "Curtains", location: "Master Bedroom", status: "Production", date: "Oct 18, 2026" },
  { id: "J-004", customer: "Diana Prince", type: "Plantation Shutters", location: "Front Windows", status: "Installed", date: "Oct 05, 2026" },
];

export default function JobsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-slate-900 dark:text-white sm:truncate sm:text-3xl sm:tracking-tight">
            Jobs Pipeline
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Track and manage active installation jobs from measure to install.
          </p>
        </div>
        <div className="mt-4 flex sm:ml-4 sm:mt-0 gap-3">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> New Job
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Kanban Columns */}
        {['Measuring', 'Quoted', 'Production', 'Installed'].map((stage) => (
          <div key={stage} className="flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-xl p-4 border border-slate-200 dark:border-slate-800 h-[calc(100vh-240px)] min-h-[500px]">
            <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-4 pb-2 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
              {stage}
              <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2 py-0.5 rounded-full">
                {mockJobs.filter(j => j.status === stage).length}
              </span>
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-3">
              {mockJobs.filter(j => j.status === stage).map(job => (
                <div key={job.id} className="bg-white dark:bg-slate-950 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono text-slate-500">{job.id}</span>
                    <span className="flex items-center text-xs text-slate-500"><Calendar className="h-3 w-3 mr-1"/> {job.date}</span>
                  </div>
                  <h4 className="font-medium text-sm text-slate-900 dark:text-slate-100">{job.customer}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{job.type} &bull; {job.location}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
