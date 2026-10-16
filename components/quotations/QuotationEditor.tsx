"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Quotation, QuotationItem } from "@/lib/quotations";
import { QuotationToolbar } from "./QuotationToolbar";
import { QuotationPricePage } from "./QuotationPricePage";
import { QuotationTechnicalPage } from "./QuotationTechnicalPage";
import { QuotationTermsPage } from "./QuotationTermsPage";

type QuotationStatus = "Draft" | "Sent" | "Accepted" | "Rejected";

interface QuotationEditorProps {
  initialQuotation: Quotation;
  /** Pass true when creating a brand-new quotation (hides back-to-customer link) */
  isNewQuotation?: boolean;
  /** Called after a successful save/send from the parent server component */
  onSaveToDb?: (q: Quotation) => Promise<void>;
}

export function QuotationEditor({
  initialQuotation,
  isNewQuotation = false,
  onSaveToDb,
}: QuotationEditorProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(isNewQuotation); // new quotes start in edit mode
  const [quote, setQuote] = useState<Quotation>(initialQuotation);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");

  // ── Item helpers ──────────────────────────────────────────────────────────
  const updateItem = (itemId: string, updates: Partial<QuotationItem>) => {
    setQuote((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, ...updates } : item
      ),
    }));
  };

  const addItem = () => {
    const newItem: QuotationItem = {
      id: Math.random().toString(36).substr(2, 9),
      name: "New Item",
      location: "Room / Window",
      description: "Description of the product…",
      qty: 1,
      unitPrice: 0,
      total: 0,
    };
    setQuote((prev) => ({ ...prev, items: [...prev.items, newItem] }));
  };

  const removeItem = (itemId: string) => {
    setQuote((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== itemId) }));
  };

  // ── Totals ────────────────────────────────────────────────────────────────
  const subtotal = quote.items.reduce((acc, item) => acc + item.qty * item.unitPrice, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax + (quote.installationFee || 0);

  // ── Toast helper ──────────────────────────────────────────────────────────
  const showMsg = (msg: string) => {
    setSavedMsg(msg);
    setTimeout(() => setSavedMsg(""), 3000);
  };

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const updated = { ...quote, subtotal, tax, total };
      if (onSaveToDb) {
        await onSaveToDb(updated);
      }
      setQuote(updated);
      showMsg("✅ Saved as draft");
      setIsEditing(false);
    } catch {
      showMsg("❌ Save failed — please try again");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Send ──────────────────────────────────────────────────────────────────
  const handleSend = async () => {
    setIsSaving(true);
    try {
      const updated: Quotation = { ...quote, subtotal, tax, total, status: "Sent" };
      if (onSaveToDb) {
        await onSaveToDb(updated);
      }
      setQuote(updated);
      showMsg("📤 Quotation marked as Sent");
      setIsEditing(false);
    } catch {
      showMsg("❌ Send failed — please try again");
    } finally {
      setIsSaving(false);
    }
  };

  // ── Status change ─────────────────────────────────────────────────────────
  const handleStatusChange = async (newStatus: QuotationStatus) => {
    const updated: Quotation = { ...quote, status: newStatus };
    setQuote(updated);
    if (onSaveToDb) {
      try {
        await onSaveToDb(updated);
        showMsg(`✅ Status updated to ${newStatus}`);
      } catch {
        showMsg("❌ Status update failed");
      }
    } else {
      showMsg(`✅ Status updated to ${newStatus}`);
    }
  };

  // ── Print ─────────────────────────────────────────────────────────────────
  const handlePrint = () => window.print();

  return (
    <div className="flex flex-col gap-6 w-full">
      <QuotationToolbar
        quoteNumber={quote.quoteNumber}
        customerName={quote.customerName}
        date={quote.date}
        status={quote.status as QuotationStatus}
        isEditing={isEditing}
        isSaving={isSaving}
        onToggleEdit={() => setIsEditing((v) => !v)}
        onPrint={handlePrint}
        onSave={handleSave}
        onSend={handleSend}
        onStatusChange={handleStatusChange}
        backHref="/quotations"
      />

      {/* Toast */}
      {savedMsg && (
        <div className="no-print fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-2xl bg-card border border-border shadow-xl text-sm font-medium text-foreground transition-all duration-300 animate-in fade-in slide-in-from-bottom-4">
          {savedMsg}
        </div>
      )}

      <div className="flex flex-col gap-12 py-8 bg-background/50 rounded-3xl overflow-hidden transition-colors duration-300">
        {!isEditing ? (
          <div className="max-w-4xl mx-auto w-full">
            <div className="bg-white border border-border shadow-2xl p-10 font-sans text-black min-h-[800px]">
              <div className="flex justify-between items-start border-b-2 border-accent/20 pb-6 mb-8">
                <div>
                  <h1 className="text-3xl font-black uppercase tracking-tight text-accent">Quotation</h1>
                  <p className="text-sm font-medium mt-1 text-gray-500">Ref: {quote.quoteNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">GMB Curtains</p>
                  <p className="text-sm text-gray-500">123 Business Ave.</p>
                  <p className="text-sm text-gray-500">contact@gmb.com</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold text-gray-400 w-24 inline-block">Client:</span> <span className="font-semibold">{quote.customerName}</span></p>
                  <p><span className="font-bold text-gray-400 w-24 inline-block">Address:</span> {quote.customerAddress}</p>
                  <p><span className="font-bold text-gray-400 w-24 inline-block">Phone:</span> {quote.customerPhone}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="font-bold text-gray-400 w-24 inline-block">Status:</span> <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20">{quote.status}</span></p>
                  <p><span className="font-bold text-gray-400 w-24 inline-block">Date:</span> {quote.date}</p>
                  <p><span className="font-bold text-gray-400 w-24 inline-block">Valid Until:</span> {quote.expiryDate}</p>
                </div>
              </div>

              <div className="mb-12">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left font-bold text-xs uppercase tracking-wider text-gray-500">Item & Location</th>
                      <th className="py-3 px-4 text-center font-bold text-xs uppercase tracking-wider text-gray-500">Qty</th>
                      <th className="py-3 px-4 text-right font-bold text-xs uppercase tracking-wider text-gray-500">Unit Price</th>
                      <th className="py-3 px-4 text-right font-bold text-xs uppercase tracking-wider text-gray-500">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {quote.items.map((item) => (
                      <tr key={item.id}>
                        <td className="py-4 px-4">
                          <p className="font-bold text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-500 mt-1">{item.location}</p>
                          <p className="text-xs text-gray-400 mt-1 italic max-w-sm truncate">{item.description}</p>
                        </td>
                        <td className="py-4 px-4 text-center font-medium">{item.qty}</td>
                        <td className="py-4 px-4 text-right font-mono text-gray-600">${item.unitPrice.toFixed(2)}</td>
                        <td className="py-4 px-4 text-right font-mono font-bold text-gray-900">${(item.qty * item.unitPrice).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end mb-12">
                <div className="w-72 space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600"><span>Subtotal:</span> <span className="font-mono">${subtotal.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-600"><span>Tax (10%):</span> <span className="font-mono">${tax.toFixed(2)}</span></div>
                  <div className="flex justify-between text-gray-600 pb-3 border-b border-gray-100"><span>Installation:</span> <span className="font-mono">${(quote.installationFee || 0).toFixed(2)}</span></div>
                  <div className="flex justify-between font-bold text-lg text-accent pt-1"><span>Total:</span> <span className="font-mono">${total.toFixed(2)}</span></div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-8">
                <h4 className="font-bold text-xs uppercase tracking-wider text-gray-500 mb-3">Terms & Conditions</h4>
                <p className="text-xs leading-relaxed text-gray-600 whitespace-pre-wrap max-h-32 overflow-hidden text-ellipsis">{quote.terms}</p>
              </div>

              <div className="mt-16 pt-6 border-t border-gray-200 text-center text-xs text-gray-400">
                Generated by GMB System • {new Date().toLocaleDateString()} • Confidential
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-12 max-w-7xl mx-auto px-4 lg:px-0">
            <QuotationPricePage
              quote={quote}
              isEditing={isEditing}
              setQuote={setQuote}
              updateItem={updateItem}
              removeItem={removeItem}
              addItem={addItem}
              subtotal={subtotal}
              tax={tax}
              total={total}
            />

            <QuotationTechnicalPage
              quote={quote}
              isEditing={isEditing}
              setQuote={setQuote}
              updateItem={updateItem}
            />
            
            <QuotationTermsPage
              quote={quote}
              isEditing={isEditing}
              setQuote={setQuote}
            />
          </div>
        )}
      </div>
    </div>
  );
}
