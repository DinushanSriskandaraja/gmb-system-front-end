import { FileText, Plus, File, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackButton } from "@/components/ui/BackButton";
import { getCustomerById } from "@/lib/db/customers";
import { getMeasurementsByCustomerId } from "@/lib/db/measurements";
import { getFiles } from "@/lib/db/files";
import { getEnquiries } from "@/lib/db/enquiries";
import { getActivities } from "@/lib/db/activities";
import { ContactDetailsCard } from "@/components/customers/ContactDetailsCard";
import { ActivityCard } from "@/components/customers/ActivityCard";
import { ActiveJobCard } from "@/components/customers/ActiveJobCard";
import { GeneratedFilesList } from "@/components/customers/GeneratedFilesList";
import { UploadSection } from "@/components/customers/UploadSection";
import { CustomerActionButtons } from "@/components/customers/CustomerActionButtons";
import { getQuotationsByCustomerId } from "@/lib/db/quotations";

export const revalidate = 0;

export default async function CustomerProfilePage({ params, searchParams }: { params: Promise<{ id: string }>, searchParams: Promise<{ from?: string }> }) {
  const { id } = await params;
  const { from } = await searchParams;
  const fromJob = from === "job";

  let customer;
  let enquiries: any[] = [];
  let activities: any[] = [];
  let quotations: any[] = [];
  let measurements: any[] = [];
  let filesRecords: any[] = [];

  try {
    customer = await getCustomerById(id);
    enquiries = await getEnquiries(id);
    activities = await getActivities(id);
  } catch (error) {
    console.error("Error fetching basic customer profile data:", error);
  }

  try { quotations = await getQuotationsByCustomerId(id) || []; } catch (e) { console.error("Quotation fetch err", e); }
  try { measurements = await getMeasurementsByCustomerId(id) || []; } catch (e) { console.error("Measurements fetch err", e); }
  try { filesRecords = await getFiles(id) || []; } catch (e) { console.error("Files fetch err", e); }

  if (!customer) {
    notFound();
  }

  // Transform DB model to match existing UI properties
  let jobs = enquiries.filter(e => e.is_job).map(e => ({
    id: e.id,
    customerId: e.customer_id,
    status: e.status,
    date: new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    type: "Various", // Could map from connected products
    location: "Default"
  }));

  // If no jobs exist in DB for this customer, inject rich dummy data for the job profile
  if (jobs.length === 0 && fromJob) {
    jobs = [
      {
        id: "JOB-0001",
        customerId: id,
        status: "In Progress",
        date: "Oct 12, 2026",
        type: "Roller Blinds Installation",
        location: "Boardroom & Office 1"
      },
      {
        id: "JOB-0002",
        customerId: id,
        status: "Quote Sent",
        date: "Oct 05, 2026",
        type: "Venetian Blinds",
        location: "Main Floor"
      }
    ];
  }

  const customerUiModel = {
    ...customer,
    initials: customer.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2).toUpperCase(),
    hasJob: jobs.length > 0,
    jobId: jobs.length > 0 ? jobs[0].id : undefined
  };

  const dbQuotationsFiles = quotations.map(q => ({
    id: `q-${q.id}`,
    slug: `Q-${q.id.substring(0, 6).toUpperCase()}`,
    name: `Quote_Q-${q.id.substring(0, 6).toUpperCase()}.pdf`,
    type: "Quotation",
    date: new Date(q.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    size: "1.1 MB",
    link: `/quotation/${q.id}`
  }));

  const dbMeasurementsFiles = measurements.map(m => ({
    id: `m-${m.id}`,
    slug: m.id,
    name: `Measurement_Sheet_${m.job_no || "Draft"}.pdf`,
    type: "Measurement",
    date: new Date(m.created_at || m.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    size: "2.4 MB",
    link: `/measurements/${m.id}`
  }));

  const dbOtherFiles = filesRecords.map(f => ({
    id: `f-${f.id}`,
    slug: f.id,
    name: f.file_name || "Document.pdf",
    type: f.file_type || "PDF",
    date: new Date(f.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    size: "1.5 MB",
    link: f.file_path
  }));

  const generatedFiles = [...dbMeasurementsFiles, ...dbQuotationsFiles, ...dbOtherFiles];

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto gap-8 flex flex-col">
      {/* Header and Back Link */}
      <div>
        <BackButton label="Back" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-accent/10 text-xl font-bold text-accent">
              {customerUiModel.initials}
            </span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{customerUiModel.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-400/10 dark:text-blue-400 dark:ring-blue-400/30">
                  {customerUiModel.status}
                </span>
                <span className="text-sm text-muted-foreground">
                  ID: {fromJob && customerUiModel.hasJob ? customerUiModel.jobId.substring(0, 8) : `CUST-${customerUiModel.customer_id.substring(0, 8)}`}
                </span>
              </div>
            </div>
          </div>

          <CustomerActionButtons
            customerId={customerUiModel.customer_id}
            hasJob={customerUiModel.hasJob}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Details */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <ActiveJobCard jobs={jobs} />
          <ContactDetailsCard customer={customerUiModel} />
          <ActivityCard customer={customerUiModel} activities={activities} />
        </div>

        {/* Right Column: Files & Jobs */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <GeneratedFilesList customer={customerUiModel} generatedFiles={generatedFiles} />
          <UploadSection />
        </div>
      </div>
    </div>
  );
}
