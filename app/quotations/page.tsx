import { Plus, Download, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

const lineItems = [
  { name: "Custom Roller Blind",   desc: "Master Bedroom – Dawn Fabric",   qty: 1, price: 250 },
  { name: "Venetian Blind 50mm",   desc: "Study – Oak Slats",              qty: 2, price: 180 },
];

const taxRate = 0.1;
const installFee = 150;

export default function QuotationsPage() {
  const subtotal = lineItems.reduce((s, i) => s + i.qty * i.price, 0);
  const tax      = subtotal * taxRate;
  const total    = subtotal + tax + installFee;

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Quotation Builder</h1>
          <p className="text-sm text-muted-foreground mt-1">Build and send pricing quotes to customers.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="mr-2 h-4 w-4" /> PDF</Button>
          <Button><Send className="mr-2 h-4 w-4" /> Send</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Line items */}
        <div className="lg:col-span-2 rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
          {/* Quote header */}
          <div className="flex items-center justify-between border-b border-border px-6 py-4 bg-muted/30">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Quote for</p>
              <input placeholder="Customer name…" className="mt-0.5 bg-transparent text-sm font-semibold text-foreground outline-none placeholder:text-muted-foreground" />
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Date</p>
              <input type="date" className="mt-0.5 bg-transparent text-sm text-foreground outline-none" />
            </div>
          </div>

          {/* Column labels */}
          <div className="hidden sm:grid grid-cols-12 gap-3 px-6 py-2 bg-muted/20 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-b border-border">
            <div className="col-span-5">Item</div>
            <div className="col-span-2 text-center">Qty</div>
            <div className="col-span-2 text-right">Unit Price</div>
            <div className="col-span-3 text-right">Total</div>
          </div>

          {/* Items */}
          <div className="divide-y divide-border">
            {lineItems.map((item, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center px-6 py-4 hover:bg-muted/20 transition-colors">
                <div className="sm:col-span-5">
                  <p className="text-sm font-medium text-foreground">{item.name}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <div className="sm:col-span-2 text-center">
                  <input type="number" defaultValue={item.qty} className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-center text-sm text-foreground outline-none focus:ring-2 focus:ring-accent" />
                </div>
                <div className="sm:col-span-2 text-right text-sm text-muted-foreground">${item.price.toFixed(2)}</div>
                <div className="sm:col-span-3 text-right text-sm font-semibold text-foreground">${(item.qty * item.price).toFixed(2)}</div>
              </div>
            ))}
          </div>

          <div className="px-6 py-4 border-t border-border">
            <Button variant="ghost" className="text-accent hover:bg-accent/10 hover:text-accent">
              <Plus className="mr-2 h-4 w-4" /> Add Line Item
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="rounded-2xl border border-border bg-card shadow-sm p-6 h-fit lg:sticky lg:top-24">
          <h2 className="font-semibold text-foreground mb-5">Summary</h2>
          <div className="space-y-3 text-sm">
            {[
              { label: "Subtotal",     value: `$${subtotal.toFixed(2)}` },
              { label: `Tax (${taxRate * 100}%)`, value: `$${tax.toFixed(2)}` },
              { label: "Installation", value: `$${installFee.toFixed(2)}` },
            ].map((row) => (
              <div key={row.label} className="flex justify-between text-muted-foreground">
                <span>{row.label}</span><span className="text-foreground font-medium">{row.value}</span>
              </div>
            ))}
            <div className="border-t border-border pt-4 flex justify-between">
              <span className="font-bold text-foreground">Total</span>
              <span className="text-lg font-bold text-accent">${total.toFixed(2)}</span>
            </div>
          </div>
          <Button className="mt-6 w-full"><Send className="mr-2 h-4 w-4" /> Send to Client</Button>
        </div>
      </div>
    </div>
  );
}
