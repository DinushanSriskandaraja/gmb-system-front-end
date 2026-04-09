import { Clock, CheckCircle } from "lucide-react";

export function ActivityCard({ customer, activities }: { customer: any, activities?: any[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold mb-4 text-foreground">Activity</h3>
      <div className="space-y-4">
        {activities && activities.length > 0 ? (
          activities.map((activity, index) => (
            <div key={activity.id || index} className="flex items-start gap-3 text-sm">
              <CheckCircle className="h-4 w-4 mt-0.5 text-accent shrink-0" />
              <div className="flex flex-col">
                <span className="font-medium text-foreground">{activity.description}</span>
                <span className="text-xs text-muted-foreground">
                  {new Date(activity.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex items-start gap-3 text-sm">
            <Clock className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
            <div className="flex flex-col">
              <span className="font-medium text-foreground">First Enquiry</span>
              <span className="text-xs text-muted-foreground">{customer.requested || 'No recent activity'}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
