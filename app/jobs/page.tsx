import { JobsList } from "@/components/jobs/JobsList";
import { getJobs } from "@/lib/db/jobs";

export default async function JobsPage() {
  let jobs: any[] = [];
  try {
    jobs = await getJobs();
  } catch (error) {
    console.error("Failed to load jobs", error);
  }

  // Inject dummy data if no jobs exist
  if (jobs.length === 0) {
    jobs = [
      {
        id: "JOB-0001",
        customer_id: "C-123456",
        status: "In Progress",
        created_at: new Date().toISOString(),
        total_amount: 5400.00,
        paid_amount: 2500.00,
        customer: {
          name: "Global Offices Pty Ltd",
          email: "contact@globaloffices.com",
          phone: "0412 345 678",
          address: "123 Business Avenue, Industrial Park"
        }
      },
      {
        id: "JOB-0002",
        customer_id: "C-789012",
        status: "Quote Sent",
        created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        total_amount: 3200.00,
        paid_amount: 0,
        customer: {
          name: "Sarah Jenkins",
          email: "sarah.j@example.com",
          phone: "0498 765 432",
          address: "42 Willow Street, Sydney"
        }
      },
      {
        id: "JOB-0003",
        customer_id: "C-345678",
        status: "Installed",
        created_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
        total_amount: 1850.00,
        paid_amount: 1850.00,
        customer: {
          name: "Michael Chen",
          email: "m.chen@example.com",
          phone: "0400 111 222",
          address: "88 Harmony Road, Melbourne"
        }
      }
    ];
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Jobs Pipeline</h1>
          <p className="text-sm text-muted-foreground mt-1">Track jobs from measure to install.</p>
        </div>
      </div>

      <JobsList jobs={jobs} />
    </div>
  );
}
