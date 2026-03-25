import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductionTracker } from "@/components/paperworks/ProductionTracker";
import { dummyProductionData } from "@/lib/dummy-production-data";

export default function ProductionTrackerPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div className="flex flex-col gap-4">
          <Link href="/paperworks" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Paperworks
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">Production Tracker</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage and track manufacturing orders and production stages.
            </p>
          </div>
        </div>
      </div>
      
      <ProductionTracker initialData={dummyProductionData as any} />
    </div>
  );
}
