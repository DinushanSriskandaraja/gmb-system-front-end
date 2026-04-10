import { getQuotationById } from "@/lib/db/quotations";
import { QuotationEditor } from "@/components/quotations/QuotationEditor";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

export default async function QuotationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let dbQuotation;
  
  try {
    dbQuotation = await getQuotationById(id);
  } catch (err) {
    console.error("Failed to fetch quotation", err);
  }

  if (!dbQuotation) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Quotation not found</h1>
        <Link href="/quotations" className="text-accent hover:underline mt-4 inline-block">
          Back to Quotations
        </Link>
      </div>
    );
  }

  // Map DB model to the Quotation Editor's UI model
  const quotationUiModel = {
    id: dbQuotation.id,
    quoteNumber: `Q-${dbQuotation.id.substring(0,6).toUpperCase()}`,
    customerId: dbQuotation.customer_id,
    customerName: dbQuotation.customer?.name || "Unknown",
    customerAddress: dbQuotation.customer?.address || "",
    customerEmail: dbQuotation.customer?.email || "",
    customerPhone: dbQuotation.customer?.phone || "",
    date: new Date(dbQuotation.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    expiryDate: dbQuotation.valid_until ? new Date(dbQuotation.valid_until).toLocaleDateString() : "",
    items: dbQuotation.items?.map((item: any) => ({
      id: item.id,
      name: item.product?.item_name || "Custom Item",
      location: item.description?.split('-')[0] || "Window",
      description: item.description,
      qty: item.quantity,
      unitPrice: item.unit_price,
      total: item.total_price,
      measurements: {
        width: 0,
        height: 0,
        unit: item.product?.unit || 'mm',
      }
    })) || [],
    subtotal: dbQuotation.total_amount,
    tax: dbQuotation.tax,
    installationFee: 150, // Static for now
    total: dbQuotation.grand_total,
    status: dbQuotation.status,
    notes: dbQuotation.notes || "",
    terms: "Quotation valid for 30 days."
  };

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-6 no-print">
        <Link 
          href={`/customer-profile/${quotationUiModel.customerId}`} 
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Customer Profile
        </Link>
      </div>

      <QuotationEditor initialQuotation={quotationUiModel as any} />
    </div>
  );
}
