"use client";

import { X, Download, Printer, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DocumentPreviewModalProps {
  file: any;
  onClose: () => void;
  mockData?: any;
}

export function DocumentPreviewModal({ file, onClose, mockData }: DocumentPreviewModalProps) {
  if (!file) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-card rounded-3xl shadow-2xl border border-border overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/50 bg-muted/10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-accent/10 text-accent flex items-center justify-center rounded-xl">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold">{file.name}</h2>
              <p className="text-[11px] text-muted-foreground">{file.type} • {file.size} • Generated {file.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Printer className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <Download className="h-4 w-4" />
            </Button>
            <div className="w-px h-6 bg-border mx-1" />
            <Button size="icon" variant="ghost" onClick={onClose} className="h-9 w-9 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Document Content */}
        <div className="flex-1 overflow-y-auto p-8 bg-muted/5">
          <div className="max-w-3xl mx-auto bg-white dark:bg-card border border-border shadow-md min-h-[800px] p-10 font-sans text-black dark:text-foreground">
            
            {/* Generic Document Header */}
            <div className="flex justify-between items-start border-b-2 border-accent/20 pb-6 mb-8">
              <div>
                <h1 className="text-3xl font-black uppercase tracking-tight text-accent">
                  {file.name.includes("Measurement") ? "Measurement Sheet" : file.name.includes("Quote") ? "Quotation" : "Paperwork"}
                </h1>
                <p className="text-sm font-medium mt-1 text-gray-500 dark:text-muted-foreground">Ref: {file.name.split('.')[0]}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">GMB Curtains</p>
                <p className="text-sm text-gray-500 dark:text-muted-foreground">123 Business Ave.</p>
                <p className="text-sm text-gray-500 dark:text-muted-foreground">contact@gmb.com</p>
              </div>
            </div>

            {/* Document Content Rendered based on mockData */}
            {mockData && mockData.header ? (
              <>
                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2 text-sm">
                    <p><span className="font-bold text-gray-400 dark:text-muted-foreground w-32 inline-block">Client:</span> <span className="font-semibold">{mockData.header.clientName}</span></p>
                    <p><span className="font-bold text-gray-400 dark:text-muted-foreground w-32 inline-block">Account:</span> {mockData.header.clientNumber}</p>
                    <p><span className="font-bold text-gray-400 dark:text-muted-foreground w-32 inline-block">Project Mgr:</span> {mockData.header.projectManager}</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-bold text-gray-400 dark:text-muted-foreground w-32 inline-block">Status:</span> <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-xs font-bold text-amber-700 ring-1 ring-inset ring-amber-600/20">{mockData.header.status}</span></p>
                    <p><span className="font-bold text-gray-400 dark:text-muted-foreground w-32 inline-block">Date:</span> {mockData.header.productionDate}</p>
                    <p><span className="font-bold text-gray-400 dark:text-muted-foreground w-32 inline-block">Schedule:</span> {mockData.header.startTime} - {mockData.header.finishedTime}</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-lg font-bold border-b border-gray-200 dark:border-border pb-2 mb-4">Job Details</h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50 dark:bg-muted/30">
                        <th className="py-2 px-3 text-left font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-muted-foreground">ID</th>
                        <th className="py-2 px-3 text-left font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-muted-foreground">Location</th>
                        <th className="py-2 px-3 text-left font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-muted-foreground">Product</th>
                        <th className="py-2 px-3 text-left font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-muted-foreground">Dimensions</th>
                        <th className="py-2 px-3 text-left font-bold text-xs uppercase tracking-wider text-gray-500 dark:text-muted-foreground">Fabric Reqd</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-border/50">
                      {mockData.jobs.map((job: any) => (
                        <tr key={job.id}>
                          <td className="py-3 px-3 font-medium">{job.id}</td>
                          <td className="py-3 px-3">{job.location}</td>
                          <td className="py-3 px-3">
                            <p className="font-medium">{job.collectionName}</p>
                            <p className="text-xs text-gray-500 dark:text-muted-foreground mt-0.5">{job.bracket} • {job.control} Control</p>
                          </td>
                          <td className="py-3 px-3">
                            <span className="font-mono text-xs">{job.wActual} x {job.hActual}</span>
                          </td>
                          <td className="py-3 px-3 font-mono text-xs text-accent font-semibold">{job.neededFabric}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="bg-gray-50 dark:bg-muted/20 p-5 rounded-xl border border-gray-100 dark:border-border/50">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-muted-foreground mb-3">Fabric Tracking</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between"><span className="text-gray-500 dark:text-muted-foreground">Required:</span> <span className="font-mono font-medium">{mockData.fabricTracking.neededFabric}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500 dark:text-muted-foreground">In Stock:</span> <span className="font-mono font-medium">{mockData.fabricTracking.anyStock}</span></div>
                      <div className="flex justify-between border-t border-gray-200 dark:border-border pt-2 mt-2"><span className="font-bold">Balance:</span> <span className="font-mono font-bold text-accent">{mockData.fabricTracking.balanceFabric}</span></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-muted/20 p-5 rounded-xl border border-gray-100 dark:border-border/50">
                    <h4 className="font-bold text-sm uppercase tracking-wider text-gray-500 dark:text-muted-foreground mb-3">Production Notes</h4>
                    <p className="text-sm leading-relaxed text-gray-700 dark:text-foreground">
                      {mockData.productionNotes}
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 opacity-50">
                <FileText className="h-16 w-16 mb-4 text-gray-300 dark:text-border" />
                <p className="text-lg font-medium">Standard Document Template</p>
                <p className="text-sm mt-2 text-center max-w-md">Detailed preview for {file.name} is rendered here based on system parameters.</p>
              </div>
            )}
            
            {/* Footer */}
            <div className="mt-16 pt-6 border-t border-gray-200 dark:border-border text-center text-xs text-gray-400 dark:text-muted-foreground">
              Generated by GMB System • {new Date().toLocaleDateString()} • Confidential
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
