import { getQuotation } from "@/lib/quotations";
import { QuotationEditor } from "@/components/quotations/QuotationEditor";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function QuotationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const quotation = getQuotation(id);

  if (!quotation) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Quotation not found</h1>
        <Link href="/quotations" className="text-accent hover:underline mt-4 inline-block">
          Back to Quotations
        </Link>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 no-print">
        <Link 
          href={`/customer-profile/${quotation.customerId}`} 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Customer Profile
        </Link>
      </div>

      <QuotationEditor initialQuotation={quotation} />
    </div>
  );
}
