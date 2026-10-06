"use client";

import { useState } from "react";
import { X, CheckCircle2, Download, Mail, CreditCard, DollarSign, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  quotations: any[];
}

type Step = "select" | "details" | "success";

export function PaymentModal({ isOpen, onClose, quotations }: PaymentModalProps) {
  const [step, setStep] = useState<Step>("select");
  const [selectedQuote, setSelectedQuote] = useState<any>(null);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    method: "Credit Card",
    reference: "",
    notes: "",
    date: new Date().toISOString().split("T")[0]
  });

  if (!isOpen) return null;

  const handleQuoteSelect = (quote: any) => {
    setSelectedQuote(quote);
    setPaymentData({ ...paymentData, amount: quote.grand_total.toString() });
    setStep("details");
  };

  const handleRecordPayment = () => {
    // Mock API call
    console.log("Recording payment:", { quoteId: selectedQuote.id, ...paymentData });
    setStep("success");
  };

  const handleDownloadInvoice = () => {
    alert("Downloading invoice INV-0042...");
  };

  const handleEmailInvoice = () => {
    alert("Invoice sent to customer's email!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-accent/5">
          <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
            <DollarSign className="h-5 w-5 text-accent" />
            {step === "select" ? "Select Quotation" : step === "details" ? "Payment Details" : "Payment Successful"}
          </h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full hover:bg-accent/10">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === "select" && (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">Select an active quotation to record a payment for.</p>
              {quotations.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-border rounded-xl">
                  <FileText className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No quotations found for this customer.</p>
                </div>
              ) : (
                <div className="max-h-[300px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
                  {quotations.map((quote) => (
                    <button
                      key={quote.id}
                      onClick={() => handleQuoteSelect(quote)}
                      className="w-full flex items-center justify-between p-4 rounded-xl border border-border hover:border-accent hover:bg-accent/5 transition-all group text-left"
                    >
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          Quote {quote.id.substring(0, 8).toUpperCase()}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Created: {new Date(quote.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-foreground">£{quote.grand_total.toLocaleString()}</div>
                        <div className="text-xs font-medium text-blue-600 dark:text-blue-400 capitalize">{quote.status}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === "details" && selectedQuote && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-accent/5 border border-accent/10 flex justify-between items-center mb-4">
                <div>
                  <div className="text-xs font-medium text-accent uppercase tracking-wider">Total Due</div>
                  <div className="text-2xl font-bold text-foreground">£{selectedQuote.grand_total.toLocaleString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground">Quote ID</div>
                  <div className="text-sm font-semibold">{selectedQuote.id.substring(0, 8).toUpperCase()}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Amount Paid</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">£</span>
                    <input
                      type="number"
                      value={paymentData.amount}
                      onChange={(e) => setPaymentData({ ...paymentData, amount: e.target.value })}
                      className="w-full h-10 pl-7 pr-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground">Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                      type="date"
                      value={paymentData.date}
                      onChange={(e) => setPaymentData({ ...paymentData, date: e.target.value })}
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-accent outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Credit Card", "Bank Transfer", "Cash", "Cheque"].map((m) => (
                    <button
                      key={m}
                      onClick={() => setPaymentData({ ...paymentData, method: m })}
                      className={`h-10 text-sm rounded-lg border transition-all ${
                        paymentData.method === m 
                        ? "border-accent bg-accent/10 text-accent font-medium shadow-sm" 
                        : "border-border bg-background text-muted-foreground hover:border-accent/50"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Reference / Notes</label>
                <textarea
                  placeholder="Transaction ID, cheque number, etc."
                  value={paymentData.notes}
                  onChange={(e) => setPaymentData({ ...paymentData, notes: e.target.value })}
                  className="w-full min-h-[80px] p-3 rounded-lg border border-input bg-background text-sm focus:ring-2 focus:ring-accent outline-none resize-none"
                />
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="text-center py-6">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Payment Recorded!</h3>
              <p className="text-muted-foreground mt-2 px-4">
                The payment of £{parseFloat(paymentData.amount).toLocaleString()} has been successfully applied to Quote {selectedQuote?.id.substring(0, 8).toUpperCase()}.
              </p>
              
              <div className="grid grid-cols-2 gap-3 mt-8">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleEmailInvoice}>
                  <Mail className="h-4 w-4" />
                  Email Invoice
                </Button>
                <Button variant="outline" className="w-full flex items-center justify-center gap-2" onClick={handleDownloadInvoice}>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-accent/5 flex justify-end gap-3">
          {step === "select" && (
             <Button variant="outline" onClick={onClose}>Cancel</Button>
          )}
          {step === "details" && (
            <>
              <Button variant="outline" onClick={() => setStep("select")}>Back</Button>
              <Button onClick={handleRecordPayment} className="gap-2">
                <CreditCard className="h-4 w-4" />
                Record Payment
              </Button>
            </>
          )}
          {step === "success" && (
            <Button onClick={onClose} className="w-full sm:w-auto">Finish</Button>
          )}
        </div>
      </div>
    </div>
  );
}
