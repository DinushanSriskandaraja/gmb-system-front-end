import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { MeasurementsTable } from "@/components/measurements/MeasurementsTable";

export default function MeasurementsListPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Measurements</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage and view all recorded measurements.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/measurements/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create New
            </Button>
          </Link>
        </div>
      </div>

      <MeasurementsTable />
    </div>
  );
}
