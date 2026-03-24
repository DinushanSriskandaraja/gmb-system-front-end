import { Plus, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function QuotationsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="sm:flex sm:items-center sm:justify-between mb-8 pb-4 border-b border-border">
        <div>
          <h2 className="text-2xl font-bold leading-7 text-foreground sm:truncate sm:text-3xl sm:tracking-tight">
            Quotation Builder
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Generate and send pricing quotes to customers.
          </p>
        </div>
        <div className="mt-4 flex sm:ml-4 sm:mt-0 gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export PDF
          </Button>
          <Button>
            <Send className="mr-2 h-4 w-4" /> Send to Client
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-4">Line Items</h3>
            
            <div className="space-y-4">
              {[1, 2].map(item => (
                <div key={item} className="flex flex-col sm:flex-row gap-4 p-4 bg-background/50 rounded-lg border border-border">
                  <div className="flex-1">
                    <input type="text" defaultValue={`Custom Roller Blind ${item}`} className="w-full bg-transparent font-medium text-foreground outline-none mb-1" />
                    <input type="text" defaultValue="Master Bedroom - Dawn Fabric" className="w-full bg-transparent text-sm text-muted-foreground outline-none" />
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-20">
                      <label className="text-xs text-muted-foreground block mb-1">Qty</label>
                      <input type="number" defaultValue="1" className="w-full bg-card border border-border rounded px-2 py-1 text-sm outline-none dark:text-white" />
                    </div>
                    <div className="w-24">
                      <label className="text-xs text-muted-foreground block mb-1">Unit Price</label>
                      <input type="number" defaultValue="250.00" className="w-full bg-card border border-border rounded px-2 py-1 text-sm outline-none dark:text-white" />
                    </div>
                    <div className="w-24 text-right pt-5">
                      <span className="font-semibold text-foreground">$250.00</span>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="ghost" className="w-full border border-dashed border-slate-300 dark:border-slate-700 text-muted-foreground hover:text-slate-900 dark:hover:text-slate-100">
                <Plus className="mr-2 h-4 w-4" /> Add Line Item
              </Button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-1">
          <div className="bg-card shadow-sm ring-1 ring-slate-200 dark:ring-slate-800 rounded-xl p-6 sticky top-24">
            <h3 className="font-semibold text-foreground mb-4">Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground">$500.00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax (10%)</span>
                <span className="text-foreground">$50.00</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Installation</span>
                <span className="text-foreground">$150.00</span>
              </div>
              <div className="border-t border-border pt-3 mt-3 flex justify-between font-semibold text-lg text-foreground">
                <span>Total</span>
                <span>$700.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
