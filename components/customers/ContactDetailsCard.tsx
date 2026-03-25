import { Phone, Mail, MapPin } from "lucide-react";

export function ContactDetailsCard({ customer }: { customer: any }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <h3 className="text-sm font-semibold mb-4 text-foreground">Contact Details</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-3 text-sm">
          <Phone className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{customer.phone}</span>
            <span className="text-xs text-muted-foreground">Mobile</span>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <Mail className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{customer.email}</span>
            <span className="text-xs text-muted-foreground">Email</span>
          </div>
        </div>
        <div className="flex items-start gap-3 text-sm">
          <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
          <div className="flex flex-col">
            <span className="font-medium text-foreground">{customer.address}</span>
            <span className="text-xs text-muted-foreground">Service Address</span>
          </div>
        </div>
      </div>
    </div>
  );
}
