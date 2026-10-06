import React from "react";
import { Quotation, QuotationItem } from "@/lib/quotations";
import { QuotationHeader } from "./QuotationHeader";

interface QuotationTechnicalPageProps {
  quote: Quotation;
  isEditing: boolean;
  setQuote: (q: Quotation) => void;
  updateItem: (id: string, updates: Partial<QuotationItem>) => void;
}

export function QuotationTechnicalPage({
  quote,
  isEditing,
  updateItem
}: QuotationTechnicalPageProps) {
  
  const InputField = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) => (
    <div className="flex flex-col gap-1">
      <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">{label}</span>
      {isEditing ? (
        <input 
          className="text-xs bg-gray-50 p-1.5 rounded outline-none border border-transparent focus:border-primary w-full"
          value={value || ""}
          onChange={e => onChange(e.target.value)}
        />
      ) : (
        <span className="text-xs text-gray-900 font-medium">{value || "-"}</span>
      )}
    </div>
  );

  return (
    <div className={`printable-a4 page-break mx-auto bg-white text-black shadow-2xl transition-all duration-300 ${
      isEditing ? 'w-full' : 'w-[210mm] min-h-[297mm]'
    } p-12 lg:p-16 border border-border/50 rounded-sm overflow-hidden relative`}>
      
      <QuotationHeader title="INSTALLATION" quoteNumber={quote.quoteNumber} date={quote.date} />

      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black bg-gray-900 text-white inline-block px-6 py-2 skew-x-[-10deg] shadow-lg shadow-gray-900/10">
            INSTALLATION SHEET
          </h2>
          <div className="text-[10px] font-black uppercase text-gray-300 tracking-tighter text-right leading-none no-print">
            <p>Page 02 / 03</p>
            <p className="mt-1">Technical Specs</p>
          </div>
        </div>
        
        <div className="space-y-6">
          {quote.items.map((item, idx) => {
            const inst = item.installationDetails || {};
            const updateInst = (field: string, val: string) => updateItem(item.id, { installationDetails: { ...inst, [field]: val } });
            
            return (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center gap-4 mb-4 pb-2 border-b border-gray-100">
                <div className="h-8 w-8 bg-gray-900 text-white flex items-center justify-center font-bold rounded-md">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 uppercase text-sm">{item.location}</h3>
                  <p className="text-[10px] text-primary uppercase font-bold">{item.name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <InputField label="Pieces" value={item.qty.toString()} onChange={v => updateItem(item.id, { qty: parseInt(v) || 0 })} />
                <InputField label="Fabric Details" value={item.fabric?.name || ""} onChange={v => updateItem(item.id, { fabric: { ...item.fabric!, name: v } })} />
                <InputField label="Style" value={inst.style || ""} onChange={v => updateInst("style", v)} />
                <InputField label="Opening" value={inst.opening || ""} onChange={v => updateInst("opening", v)} />
                
                <InputField label="Control" value={inst.control || ""} onChange={v => updateInst("control", v)} />
                <InputField label="Control Side" value={inst.controlSide || ""} onChange={v => updateInst("controlSide", v)} />
                
                <InputField label="Comp. Details" value={inst.componentsDetails || ""} onChange={v => updateInst("componentsDetails", v)} />
                <InputField label="Comp. Colour" value={inst.componentsColour || ""} onChange={v => updateInst("componentsColour", v)} />
                
                <InputField label="Coverage (W)" value={inst.coverageWidthWise || ""} onChange={v => updateInst("coverageWidthWise", v)} />
                <InputField label="Coverage (D)" value={inst.coverageDropWise || ""} onChange={v => updateInst("coverageDropWise", v)} />
                
                <InputField label="Mounting Point" value={inst.mountingPoint || ""} onChange={v => updateInst("mountingPoint", v)} />
                <InputField label="Surface" value={inst.surface || ""} onChange={v => updateInst("surface", v)} />
                
                <InputField label="Bracket Type" value={inst.bracketType || ""} onChange={v => updateInst("bracketType", v)} />
                <InputField label="Bracket Colour" value={inst.bracketColour || ""} onChange={v => updateInst("bracketColour", v)} />
              </div>
              <div className="mt-4 pt-3 border-t border-gray-50">
                <InputField label="Notes" value={inst.note || ""} onChange={v => updateInst("note", v)} />
              </div>
            </div>
            );
          })}
        </div>
      </div>
      
      <div className="mt-auto pt-8 flex items-center justify-between border-t-2 border-gray-50">
        <div className="text-[9px] text-gray-300 font-bold uppercase tracking-widest flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-primary/20"></div>
          GMB Paperwork • Precision Manufacturing
        </div>
        <div className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">
          E&OE • All quoted dimensions are subject to final check measure
        </div>
      </div>
    </div>
  );
}
