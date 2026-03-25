import { FileText, Plus, File, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomer, getCustomerJobs } from "@/lib/data";
import { ContactDetailsCard } from "@/components/customers/ContactDetailsCard";
import { ActivityCard } from "@/components/customers/ActivityCard";
import { ActiveJobCard } from "@/components/customers/ActiveJobCard";
import { GeneratedFilesList } from "@/components/customers/GeneratedFilesList";
import { UploadSection } from "@/components/customers/UploadSection";
import { CustomerActionButtons } from "@/components/customers/CustomerActionButtons";

export default async function CustomerProfilePage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ from?: string }> }) {
  const { id } = await params;
  const { from } = await searchParams;
  const fromJob = from === "job";
  const customer = getCustomer(id);
  const jobs = getCustomerJobs(id);

  if (!customer) {
    notFound();
  }

  const generatedFiles = [
    { id: "f1", name: "Measurement_Sheet_v1.pdf", type: "PDF", date: "Oct 14, 2026", size: "2.4 MB" },
    { id: "f1", name: "Paperwork_V1.pdf", type: "PDF", date: "Oct 14, 2026", size: "2.4 MB" },
    { id: "f2", name: "Quote_Q-0042.pdf", type: "PDF", date: "Oct 15, 2026", size: "1.1 MB" },
    { id: "f3", name: "Invoice_INV-0042.pdf", type: "PDF", date: "Oct 18, 2026", size: "0.8 MB" },
  ];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto gap-8 flex flex-col">
      {/* Header and Back Link */}
      <div>
        <Link href="/customers" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Customers
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
              {customer.initials}
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{customer.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                  {customer.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  ID: {fromJob && customer.hasJob ? customer.jobId : `CUST-${customer.id.padStart(4, "0")}`}
                </span>
              </div>
            </div>
          </div>

          <CustomerActionButtons />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <ActiveJobCard jobs={jobs} />
          <ContactDetailsCard customer={customer} />
          <ActivityCard customer={customer} />
        </div>

        {/* Right Column: Files & Jobs */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <GeneratedFilesList customer={customer} generatedFiles={generatedFiles} />
          <UploadSection />
        </div>
      </div>
    </div>
  );
}
