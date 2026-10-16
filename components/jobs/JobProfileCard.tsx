"use client";

import { MapPin, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { EntityCard } from "@/components/shared/EntityCard";

interface JobProfileCardProps {
  job: {
    id: string;
    customer_id: string;
    status: string;
    created_at: string;
    total_amount: number;
    paid_amount: number;
    customer: {
      name: string;
      email: string | null;
      phone: string | null;
      address: string | null;
    } | null;
    payment_history?: any[];
    invoices?: any[];
  };
}

const stageColors: Record<string, string> = {
  "Lead": "bg-gray-50 text-gray-700 ring-gray-600/10",
  "Enquired": "bg-gray-50 text-gray-700 ring-gray-600/10",
  "Quote Sent": "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  "Job Created": "bg-blue-50 text-blue-700 ring-blue-700/10",
  "In Progress": "bg-amber-50 text-amber-700 ring-amber-600/20",
  "Completed": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  "Installed": "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
};

export function JobProfileCard({ job }: JobProfileCardProps) {
  const router = useRouter();
  const customer = job.customer;
  const initials = customer?.name ? customer.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : "??";

  return (
    <EntityCard
      title={customer?.name || "Unknown Customer"}
      subtitle={`Job ID: ${job.customer_id.substring(0, 8).toUpperCase()}`}
      initials={initials}
      badge={{
        label: job.status,
        color: stageColors[job.status] || stageColors["Job Created"]
      }}
      meta={[
        { icon: MapPin, label: customer?.address || "No Address Provided" },
        { icon: Calendar, label: `Created: ${new Date(job.created_at).toLocaleDateString()}` }
      ]}
      onClick={() => router.push(`/customer-profile/${job.customer_id}?from=job`)}
    />
  );
}
