"use client";

import { JobProfileCard } from "./JobProfileCard";

export function JobsList({ jobs }: { jobs: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {jobs.map((job) => (
        <JobProfileCard 
          key={job.id} 
          job={job} 
        />
      ))}
      
      {jobs.length === 0 && (
        <div className="col-span-full py-12 text-center border-2 border-dashed border-border rounded-xl">
          <p className="text-muted-foreground">No active jobs found.</p>
        </div>
      )}
    </div>
  );
}
