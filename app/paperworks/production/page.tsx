import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductionTracker } from "@/components/paperworks/ProductionTracker";

export default function ProductionTrackerPage() {
  return (
    <div className="p-4 lg:p-6 lg:max-w-7xl mx-auto space-y-4">
      <div className="flex gap-2 mb-4">
        <Link href="/paperworks">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Paperworks
          </Button>
        </Link>
      </div>
      
      <ProductionTracker />
    </div>
  );
}
