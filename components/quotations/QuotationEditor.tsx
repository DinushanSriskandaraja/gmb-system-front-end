"use client";

import { useState } from "react";
import { Quotation, QuotationItem, Measurement, Fabric } from "@/lib/quotations";
import { Button } from "@/components/ui/Button";
import { Printer, Edit3, Eye, Plus, Trash2, Save, X, ChevronRight, Ruler, Scissors, FileText } from "lucide-react";

export function QuotationEditor({ initialQuotation }: { initialQuotation: Quotation }) {
  const [isEditing, setIsEditing] = useState(false);
  const [quote, setQuote] = useState<Quotation>(initialQuotation);

  const handlePrint = () => {
    window.print();
  };

  const updateItem = (itemId: string, updates: Partial<QuotationItem>) => {
    setQuote(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === itemId ? { ...item, ...updates } : item)
    }));
  };

  const addItem = () => {
    const newItem: QuotationItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Item",
      location: "Room/Window",
      description: "Description of the product...",
      qty: 1,
      unitPrice: 0,
      total: 0,
    };
    setQuote(prev => ({
      ...prev,
      items: [...prev.items, newItem]
    }));
  };

  const removeItem = (itemId: string) => {
    setQuote(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  // Calculate totals
  const subtotal = quote.items.reduce((acc, item) => acc + (item.qty * item.unitPrice), 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax + (quote.installationFee || 0);

  const Header = ({ title }: { title: string }) => (
    <div className="flex justify-between items-start border-b-2 border-primary/10 pb-8 mb-8">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="h-10 w-10 bg-primary flex items-center justify-center rounded-lg text-primary-foreground font-bold text-xl">
            G
          </div>
          <span className="text-2xl font-black tracking-tighter text-primary">GMB PAPERWORK</span>
        </div>
        <div className="text-sm text-gray-500 space-y-0.5">
          <p>123 Business Avenue, Suite 100</p>
          <p>Sydney, NSW 2000</p>
          <p>Phone: (02) 9876 5432</p>
        </div>
      </div>
      <div className="text-right">
        <h1 className="text-4xl font-black text-primary/20 mb-4 uppercase tracking-widest">{title}</h1>
        <div className="space-y-1">
          <div className="flex justify-end gap-4 text-sm">
            <span className="font-bold text-gray-400 uppercase tracking-tighter">Quote #</span>
            <span className="font-mono text-gray-900">{quote.quoteNumber}</span>
          </div>
          <div className="flex justify-end gap-4 text-sm">
            <span className="font-bold text-gray-400 uppercase tracking-tighter">Date</span>
            <span className="text-gray-900">{quote.date}</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Toolbar - Use Theme Tokens */}
      <div className="flex items-center justify-between no-print bg-card text-card-foreground p-4 rounded-xl border border-border shadow-md sticky top-0 z-50 transition-colors duration-300">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-accent/10 text-accent flex items-center justify-center rounded-lg">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold leading-none mb-1">
                Quotation {quote.quoteNumber}
              </h2>
              <p className="text-xs text-muted-foreground">{quote.customerName} • {quote.date}</p>
            </div>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
            quote.status === 'Sent' ? 'bg-accent/10 text-accent' : 'bg-muted text-muted-foreground'
          }`}>
            {quote.status}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
            className="border-accent/20 text-accent hover:bg-accent/10 transition-all font-semibold"
          >
            {isEditing ? (
              <><Eye className="mr-2 h-4 w-4" /> Preview Mode</>
            ) : (
              <><Edit3 className="mr-2 h-4 w-4" /> Edit Details</>
            )}
          </Button>
          <Button size="sm" onClick={handlePrint} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
            <Printer className="mr-2 h-4 w-4" /> Print A4
          </Button>
        </div>
      </div>

      {/* Sheet Container with Background Matching Theme */}
      <div className="flex flex-col gap-12 py-8 bg-background/50 rounded-3xl overflow-hidden transition-colors duration-300">
        <div className="flex flex-col gap-12 max-w-7xl mx-auto px-4 lg:px-0">
          
          {/* PAGE 1: PRICING */}
          <div className={`printable-a4 mx-auto bg-white text-black shadow-2xl transition-all duration-300 ${
            isEditing ? 'w-full' : 'w-[210mm] min-h-[297mm]'
          } p-12 lg:p-16 border border-border/50 rounded-sm overflow-hidden relative`}>
            
            <Header title="QUOTATION" />

            {/* Client Info */}
            <div className="grid grid-cols-2 gap-12 mb-12">
              <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-100 pb-1">Client Details</h3>
                <div className="space-y-1">
                  {isEditing ? (
                    <input 
                      className="w-full font-bold text-lg bg-gray-50 p-2 rounded-lg border border-transparent focus:border-primary outline-none transition-all"
                      value={quote.customerName}
                      onChange={e => setQuote({...quote, customerName: e.target.value})}
                      placeholder="Customer Name"
                    />
                  ) : (
                    <p className="font-bold text-lg text-gray-900">{quote.customerName}</p>
                  )}
                  <p className="text-sm text-gray-600">{quote.customerEmail}</p>
                  <p className="text-sm text-gray-600">{quote.customerPhone}</p>
                  <p className="text-sm text-gray-600 mt-2 max-w-[250px]">{quote.customerAddress}</p>
                </div>
              </div>
              <div className="bg-gray-50/70 p-6 rounded-2xl border border-gray-100 relative group">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Service Address</h3>
                <p className="text-sm text-gray-700 italic">Same as billing address unless specified otherwise.</p>
                <div className="absolute top-2 right-2 opacity-10 group-hover:opacity-100 transition-opacity no-print">
                   <Edit3 className="h-3 w-3 text-primary" />
                </div>
              </div>
            </div>

            {/* Pricing Table */}
            <div className="mb-12">
              <div className="grid grid-cols-12 gap-4 border-b-2 border-gray-900 px-2 py-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <div className="col-span-1">QTY</div>
                <div className="col-span-6">DESCRIPTION & SPECIFICATIONS</div>
                <div className="col-span-2 text-right">UNIT PRICE</div>
                <div className="col-span-3 text-right">TOTAL</div>
              </div>

              <div className="divide-y divide-gray-100">
                {quote.items.map((item) => (
                  <div key={item.id} className="group relative">
                    <div className="grid grid-cols-12 gap-4 px-2 py-8 items-start hover:bg-gray-50/30 transition-colors rounded-sm">
                      <div className="col-span-1 font-mono text-lg font-bold text-gray-900">
                        {isEditing ? (
                          <input 
                            type="number"
                            className="w-full bg-gray-50 rounded-lg p-2 text-center outline-none border border-transparent focus:border-primary"
                            value={item.qty}
                            onChange={e => updateItem(item.id, { qty: parseFloat(e.target.value) || 0 })}
                          />
                        ) : item.qty}
                      </div>
                      <div className="col-span-6">
                        {isEditing ? (
                          <div className="space-y-3">
                             <input 
                              className="w-full font-bold text-sm bg-gray-50 p-2 rounded-lg outline-none border border-transparent focus:border-primary"
                              value={item.name}
                              onChange={e => updateItem(item.id, { name: e.target.value })}
                              placeholder="Product Name"
                            />
                            <input 
                              className="w-full text-xs text-primary font-bold bg-blue-50/50 p-2 rounded-lg outline-none border border-transparent focus:border-primary uppercase tracking-tighter"
                              value={item.location}
                              onChange={e => updateItem(item.id, { location: e.target.value })}
                              placeholder="Location"
                            />
                             <textarea 
                              className="w-full text-xs text-gray-500 bg-gray-50 p-2 rounded-lg outline-none resize-none border border-transparent focus:border-primary"
                              rows={2}
                              value={item.description}
                              onChange={e => updateItem(item.id, { description: e.target.value })}
                              placeholder="Item description..."
                            />
                          </div>
                        ) : (
                          <>
                            <p className="font-bold text-gray-900 text-sm mb-0.5">{item.name}</p>
                            <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-2 skew-x-[-10deg] border-l-2 border-primary pl-2">{item.location}</p>
                            <p className="text-xs text-gray-500 leading-relaxed max-w-md">{item.description}</p>
                          </>
                        )}
                      </div>
                      <div className="col-span-2 text-right font-mono text-sm pt-2 text-gray-600">
                        {isEditing ? (
                          <input 
                            type="number"
                            className="w-full bg-gray-50 rounded-lg p-2 text-right outline-none border border-transparent focus:border-primary"
                            value={item.unitPrice}
                            onChange={e => updateItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                          />
                        ) : `$${item.unitPrice.toFixed(2)}`}
                      </div>
                      <div className="col-span-3 text-right font-mono text-xl font-black pt-1.5 text-gray-900">
                        ${(item.qty * item.unitPrice).toFixed(2)}
                      </div>

                      {isEditing && (
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="absolute -right-8 top-1/2 -translate-y-1/2 p-2 text-gray-300 hover:text-red-500 transition-all no-print"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}

                {isEditing && (
                  <div className="py-6 no-print">
                    <Button variant="ghost" className="w-full border-2 border-dashed border-gray-200 text-gray-400 hover:border-accent hover:text-accent hover:bg-accent/5 rounded-xl transition-all h-20" onClick={addItem}>
                      <Plus className="mr-2 h-5 w-5" /> Add New Quote Item
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {/* Pricing Footer */}
            <div className="grid grid-cols-12 gap-8 pt-12 border-t-2 border-primary/10 mb-12">
              <div className="col-span-7">
                <div className="bg-gray-50/50 p-8 rounded-3xl border border-gray-100 flex items-center gap-6">
                  <div className="h-12 w-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                    <FileText className="h-6 w-6" />
                  </div>
                  <p className="text-[11px] text-gray-500 italic leading-relaxed">
                    This quotation is valid for 30 days. Please refer to the **Measurement & Specification Sheet** on the following page for technical details, fabric selections, and installation requirements.
                  </p>
                </div>
              </div>
              <div className="col-span-5">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Subtotal</span>
                    <span className="font-mono text-gray-900">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>GST (10%)</span>
                    <span className="font-mono text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Installation</span>
                    <span className="font-mono text-gray-900">
                      {isEditing ? (
                        <input 
                          type="number"
                          className="bg-gray-50 rounded-lg px-2 w-24 text-right outline-none border border-transparent focus:border-primary"
                          value={quote.installationFee}
                          onChange={e => setQuote({...quote, installationFee: parseFloat(e.target.value) || 0})}
                        />
                      ) : `$${(quote.installationFee || 0).toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between border-t-4 border-gray-900 pt-6 mt-6">
                    <span className="text-xl font-black uppercase tracking-tighter text-gray-900">GRAND TOTAL</span>
                    <span className="text-4xl font-black text-primary font-mono tracking-tighter">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Signature Area */}
            <div className="mt-24 grid grid-cols-2 gap-32">
              <div className="border-t-2 border-gray-200 pt-6 group">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-primary transition-colors">Client Authorization</p>
                <div className="h-20 flex items-end">
                   <p className="text-[10px] text-gray-300 italic mb-2">Sign here or provide digital confirmation</p>
                </div>
                <div className="h-0.5 bg-gray-100 w-full"></div>
              </div>
              <div className="border-t-2 border-gray-200 pt-6 text-right group">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-primary transition-colors">Acceptance Date</p>
                <p className="text-2xl font-mono text-gray-100 mt-4 leading-none">____ / ____ / 2026</p>
              </div>
            </div>
          </div>

          {/* PAGE 2: MEASUREMENTS & TERMS */}
          <div className={`printable-a4 page-break mx-auto bg-white text-black shadow-2xl transition-all duration-300 ${
            isEditing ? 'w-full' : 'w-[210mm] min-h-[297mm]'
          } p-12 lg:p-16 border border-border/50 rounded-sm overflow-hidden relative`}>
            
            <Header title="SPECIFICATIONS" />

            <div className="mb-12">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black bg-gray-900 text-white inline-block px-6 py-2 skew-x-[-10deg] shadow-lg shadow-gray-900/10">
                  TECHNICAL SHEET
                </h2>
                <div className="text-[10px] font-black uppercase text-gray-300 tracking-tighter text-right leading-none no-print">
                  <p>Page 02 / 02</p>
                  <p className="mt-1">Technical Specs</p>
                </div>
              </div>
              
              <div className="divide-y-4 divide-gray-900/5 border-y-4 border-gray-900/5">
                {quote.items.map((item, idx) => (
                  <div key={item.id} className="py-12 grid grid-cols-12 gap-12 items-start hover:bg-gray-50/20 transition-colors">
                    <div className="col-span-1 text-5xl font-black text-gray-100 drop-shadow-sm select-none">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="col-span-5">
                      <p className="text-[10px] text-primary font-black uppercase tracking-widest mb-1">{item.location}</p>
                      <p className="font-black text-xl leading-tight mb-2 text-gray-900 uppercase tracking-tighter">{item.name}</p>
                      <p className="text-xs text-gray-400 leading-relaxed border-l-2 border-gray-100 pl-4">{item.description}</p>
                    </div>
                    <div className="col-span-6 grid grid-cols-2 gap-6">
                      {/* Measurement Box */}
                      <div className="bg-white p-5 rounded-2xl border-2 border-gray-50 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-primary uppercase tracking-widest bg-primary/5 p-1.5 rounded-lg w-fit">
                          <Ruler className="h-3 w-3" /> Measurements
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="relative">
                            <span className="text-[9px] text-gray-400 font-black uppercase block mb-1">Width</span>
                            {isEditing ? (
                              <input 
                                className="w-full font-mono font-bold bg-gray-50 border border-transparent focus:border-primary p-2 rounded-lg outline-none"
                                value={item.measurements?.width}
                                onChange={e => updateItem(item.id, { measurements: { ...item.measurements!, width: parseFloat(e.target.value) || 0 }})}
                              />
                            ) : <span className="font-mono font-black text-lg block text-gray-900 border-b-2 border-primary/10 pb-1">{item.measurements?.width || "---"} <small className="text-[10px] font-medium text-gray-400">{item.measurements?.unit}</small></span>}
                          </div>
                          <div className="relative">
                            <span className="text-[9px] text-gray-400 font-black uppercase block mb-1">Height</span>
                            {isEditing ? (
                              <input 
                                className="w-full font-mono font-bold bg-gray-50 border border-transparent focus:border-primary p-2 rounded-lg outline-none"
                                value={item.measurements?.height}
                                onChange={e => updateItem(item.id, { measurements: { ...item.measurements!, height: parseFloat(e.target.value) || 0 }})}
                              />
                            ) : <span className="font-mono font-black text-lg block text-gray-900 border-b-2 border-primary/10 pb-1">{item.measurements?.height || "---"} <small className="text-[10px] font-medium text-gray-400">{item.measurements?.unit}</small></span>}
                          </div>
                        </div>
                      </div>
                      {/* Material Box */}
                      <div className="bg-blue-50/50 p-5 rounded-2xl border-2 border-blue-100/30 shadow-sm transition-all hover:shadow-md">
                        <div className="flex items-center gap-2 mb-4 text-[10px] font-black text-blue-600 uppercase tracking-widest bg-blue-100/50 p-1.5 rounded-lg w-fit">
                          <Scissors className="h-3 w-3" /> Material
                        </div>
                        {isEditing ? (
                          <div className="space-y-2">
                            <input 
                              placeholder="Fabric Name"
                              className="w-full text-xs bg-white border border-gray-200 p-2 rounded-lg outline-none focus:border-blue-500 transition-all font-bold"
                              value={item.fabric?.name}
                              onChange={e => updateItem(item.id, { fabric: { ...item.fabric!, name: e.target.value }})}
                            />
                            <input 
                              placeholder="Color / Shade"
                              className="w-full text-xs bg-white border border-gray-200 p-2 rounded-lg outline-none focus:border-blue-500 transition-all"
                              value={item.fabric?.color}
                              onChange={e => updateItem(item.id, { fabric: { ...item.fabric!, color: e.target.value }})}
                            />
                          </div>
                        ) : (
                          <div>
                            <p className="text-sm font-black text-gray-800 uppercase tracking-tighter line-clamp-1">{item.fabric?.name || "TBD SPEC"}</p>
                            <p className="text-xs text-blue-600/70 font-bold mt-1">{item.fabric?.color || "Pending Selection"}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions Section */}
            <div className="mt-12 pt-16 border-t-2 border-gray-100 relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white px-8 no-print">
                 <FileText className="h-8 w-8 text-gray-100" />
              </div>
              <div className="flex items-center justify-center gap-3 mb-12">
                <div className="h-px bg-gray-100 flex-1"></div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Terms & Conditions</h3>
                <div className="h-px bg-gray-100 flex-1"></div>
              </div>
              
              {isEditing ? (
                <textarea 
                  className="w-full text-[11px] text-gray-500 bg-gray-50 p-6 rounded-3xl outline-none leading-relaxed border border-gray-100 transition-all focus:bg-white focus:ring-4 focus:ring-primary/5"
                  rows={10}
                  value={quote.terms}
                  onChange={e => setQuote({...quote, terms: e.target.value})}
                  placeholder="Terms and conditions content..."
                />
              ) : (
                <div className="columns-2 gap-16 text-[10px] text-gray-400 leading-relaxed text-justify opacity-80">
                  {quote.terms?.split('\n').map((para, i) => (
                    <p key={i} className="mb-6 first:font-bold first:text-gray-500">{para}</p>
                  ))}
                </div>
              )}
            </div>

            {/* Disclaimer Footer */}
            <div className="mt-auto pt-16 flex items-center justify-between border-t-2 border-gray-50">
              <div className="text-[9px] text-gray-300 font-bold uppercase tracking-widest flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-primary/20"></div>
                GMB Paperwork • Precision Manufacturing
              </div>
              <div className="text-[9px] text-gray-400 font-black uppercase tracking-tighter">
                E&OE • All quoted dimensions are subject to final check measure
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
