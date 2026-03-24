import { Plus, Save, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

const productTypes = ["Roller Blind", "Venetian", "Roman Blind", "Curtain", "Shutter"];
const mountTypes   = ["Recess Fit", "Face Fit", "Ceiling Mount"];

export default function MeasurementsPage() {
  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Measurement Sheet</h1>
          <p className="text-sm text-muted-foreground mt-1">Record exact dimensions for each window or door.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Load Job</Button>
          <Button><Save className="mr-2 h-4 w-4" /> Save</Button>
        </div>
      </div>

      {/* Sheet card */}
      <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
        {/* Sheet header */}
        <div className="flex items-center gap-4 border-b border-border px-6 py-4 bg-muted/30">
          <div className="flex-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Customer</label>
            <input placeholder="Select or type customer name…" className="mt-1 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Job ID</label>
            <input placeholder="J-001" className="mt-1 w-full bg-transparent text-sm font-mono text-foreground outline-none placeholder:text-muted-foreground" />
          </div>
          <div className="flex-1">
            <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</label>
            <input type="date" className="mt-1 w-full bg-transparent text-sm text-foreground outline-none" />
          </div>
        </div>

        {/* Column labels */}
        <div className="hidden md:grid grid-cols-12 gap-3 px-6 py-2 bg-muted/20 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
          <div className="col-span-3">Location</div>
          <div className="col-span-2">Product</div>
          <div className="col-span-2">Width (mm)</div>
          <div className="col-span-2">Drop (mm)</div>
          <div className="col-span-2">Mount</div>
          <div className="col-span-1">Qty</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border">
          {[1, 2, 3].map((row) => (
            <div key={row} className="grid grid-cols-1 md:grid-cols-12 gap-3 px-6 py-4 hover:bg-muted/20 transition-colors">
              <div className="col-span-1 md:col-span-3">
                <input placeholder={`Room / Window ${row}`} className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent transition" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent transition">
                  {productTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="col-span-1 md:col-span-2">
                <input type="number" placeholder="e.g. 1200" className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent transition" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <input type="number" placeholder="e.g. 1800" className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent transition" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <select className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent transition">
                  {mountTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              </div>
              <div className="col-span-1 md:col-span-1">
                <input type="number" defaultValue="1" className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-accent transition" />
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 border-t border-border">
          <Button variant="ghost" className="text-accent hover:bg-accent/10 hover:text-accent">
            <Plus className="mr-2 h-4 w-4" /> Add Row
          </Button>
        </div>
      </div>
    </div>
  );
}
