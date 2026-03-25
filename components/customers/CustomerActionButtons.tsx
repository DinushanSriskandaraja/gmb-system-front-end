"use client";

import { useState } from "react";
import { FileText, Plus, File, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

type ModalMode = "quote" | "paperwork" | null;

export function CustomerActionButtons() {
  const router = useRouter();
  const [modalMode, setModalMode] = useState<ModalMode>(null);

  return (
    <>
      <div className="flex flex-wrap items-center sm:justify-end gap-3 w-full sm:w-auto mt-4 sm:mt-0">
        <Button variant="outline" className="w-full sm:w-auto" onClick={() => router.push("/measurements/new")}>
          <File className="mr-2 h-4 w-4" />
          Create Measurement Sheet
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" onClick={() => setModalMode("quote")}>
          <FileText className="mr-2 h-4 w-4" />
          Generate Quote
        </Button>
        <Button variant="outline" className="w-full sm:w-auto" onClick={() => setModalMode("paperwork")}>
          <FileText className="mr-2 h-4 w-4" />
          Generate Paperwork
        </Button>
        {/* <Button className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Move to Job
        </Button> */}
      </div>

      {modalMode && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-lg animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-foreground">
                {modalMode === "quote" ? "Generate Quote" : "Generate Paperwork"}
              </h2>
              <button onClick={() => setModalMode(null)} className="text-muted-foreground hover:text-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              {modalMode === "paperwork" && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Select Quotation</label>
                  <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none">
                    <option value="">Select a quotation...</option>
                    <option value="q1">Quote Q-0042</option>
                    <option value="q2">Quote Q-0043</option>
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Select Measurement Sheet</label>
                <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm text-foreground focus:ring-2 focus:ring-accent outline-none">
                  <option value="">Select a measurement sheet...</option>
                  <option value="m1">Sheet v1 (Oct 14, 2026)</option>
                  <option value="m2">Sheet v2 (Oct 16, 2026)</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex justify-end gap-3">
              <Button variant="outline" onClick={() => setModalMode(null)}>Cancel</Button>
              <Button onClick={() => {
                alert(`Successfully generated!`);
                setModalMode(null);
              }}>
                Generate
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
