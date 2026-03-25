import { Clock } from "lucide-react";

export function ActivityCard({ customer }: { customer: any }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold mb-4 text-foreground">Activity</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3 text-sm">
          <Clock className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <div className="flex flex-col">
            <span className="font-medium text-foreground">First Enquiry</span>
            <span className="text-xs text-muted-foreground">{customer.requested}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
