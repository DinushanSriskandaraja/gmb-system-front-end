import { JobsList } from "@/components/jobs/JobsList";
import { supabase } from "@/lib/supabaseClient";

export default async function JobsPage() {
  // Fetch actual enquiries where is_job is true and map local relations
  let jobs = [];
  try {
    const { data } = await supabase
      .from('enquiries')
      .select('*, customer:customers(*)')
      .eq('is_job', true)
      .order('created_at', { ascending: false });
    if (data) jobs = data;
  } catch (error) {
    console.error("Failed to load jobs", error);
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
