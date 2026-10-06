import React from "react";
import { FileText } from "lucide-react";
import { Quotation } from "@/lib/quotations";
import { QuotationHeader } from "./QuotationHeader";

interface QuotationTermsPageProps {
  quote: Quotation;
  isEditing: boolean;
  setQuote: (q: Quotation) => void;
}

export function QuotationTermsPage({
  quote,
  isEditing,
  setQuote
}: QuotationTermsPageProps) {
  return (
    <div className={`printable-a4 page-break mx-auto bg-white text-black shadow-2xl transition-all duration-300 ${
      isEditing ? 'w-full' : 'w-[210mm] min-h-[297mm]'
    } p-12 lg:p-16 border border-border/50 rounded-sm overflow-hidden relative flex flex-col`}>
      
      <QuotationHeader title="TERMS & CONDITIONS" quoteNumber={quote.quoteNumber} date={quote.date} />

      <div className="flex-1">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-black bg-gray-900 text-white inline-block px-6 py-2 skew-x-[-10deg] shadow-lg shadow-gray-900/10">
            GMB CURTAINS & BLINDS
          </h2>
          <div className="text-[10px] font-black uppercase text-gray-300 tracking-tighter text-right leading-none no-print">
            <p>Page 03 / 03</p>
            <p className="mt-1">Terms</p>
          </div>
        </div>

        {isEditing ? (
          <textarea 
            className="w-full h-full min-h-[500px] text-[11px] text-gray-700 bg-gray-50 p-6 rounded-xl outline-none leading-relaxed border border-gray-100 transition-all focus:bg-white focus:ring-4 focus:ring-primary/5"
            value={quote.terms || ""}
            onChange={e => setQuote({...quote, terms: e.target.value})}
            placeholder="Enter Terms and Conditions..."
          />
        ) : (
          <div className="text-[10px] text-gray-700 leading-relaxed text-justify space-y-4">
            {quote.terms?.split('\n').map((para, i) => {
              if (!para.trim()) return <br key={i} />;
              const isHeading = para.match(/^[0-9]+\)|^[A-Z][A-Za-z &]+ -/);
              return (
                <p key={i} className={isHeading ? "font-bold text-gray-900 text-[11px] mt-4" : ""}>
                  {para}
                </p>
              );
            })}
          </div>
        )}
      </div>
      
      {/* Disclaimer Footer */}
      <div className="mt-12 pt-8 flex items-center justify-between border-t-2 border-gray-50">
        <div className="text-[9px] text-gray-300 font-bold uppercase tracking-widest flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-primary/20"></div>
          GMB Paperwork • Terms & Conditions
        </div>
      </div>
    </div>
  );
}
