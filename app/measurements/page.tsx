import { Plus, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function MeasurementsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8 pb-4 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
            Measurement Sheet
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Record exact dimensions for windows and doors.
          </p>
        </div>
        <div className="mt-4 flex sm:ml-4 sm:mt-0 gap-3">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" /> Load Job Details
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" /> Save Sheet
          </Button>
        </div>
      </div>

      <div className="bg-card shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl overflow-hidden">
        <div className="p-6">
          <h3 className="text-lg font-medium text-foreground mb-4 border-b border-border pb-2">Room / Window Dimensions</h3>
          
          {/* Header Row */}
          <div className="hidden md:grid grid-cols-12 gap-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2">
            <div className="col-span-3">Room / Location</div>
            <div className="col-span-2">Product Type</div>
            <div className="col-span-2">Width (mm)</div>
            <div className="col-span-2">Drop (mm)</div>
            <div className="col-span-3">Install Notes</div>
          </div>

          {/* Form Rows */}
          {[1, 2, 3].map((row) => (
            <div key={row} className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-3 items-center bg-background/50 p-3 rounded-lg border border-border">
              <div className="col-span-1 md:col-span-3">
                <input type="text" placeholder="e.g. Master Bed 1" className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-slate-500 dark:text-white" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <select className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-500 text-foreground">
                  <option>Roller Blind</option>
                  <option>Venetian</option>
                  <option>Curtain</option>
                  <option>Shutter</option>
                </select>
              </div>
              <div className="col-span-1 md:col-span-2">
                <input type="number" placeholder="Width" className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-slate-500 dark:text-white" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <input type="number" placeholder="Drop" className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-slate-500 dark:text-white" />
              </div>
              <div className="col-span-1 md:col-span-3">
                <input type="text" placeholder="Recess / Face fit" className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-slate-500 dark:text-white" />
              </div>
            </div>
          ))}

          <Button variant="ghost" className="mt-4 text-muted-foreground">
            <Plus className="mr-2 h-4 w-4" /> Add Row
          </Button>
        </div>
      </div>
    </div>
  );
}
