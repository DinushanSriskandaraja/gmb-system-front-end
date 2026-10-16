"use client";

import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { MeasurementPageContent } from "@/app/measurements/new/page";

interface MeasurementSheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  measurementId?: string;
  customerId?: string;
  jobId?: string;
  isReadOnly?: boolean;
}

export function MeasurementSheetModal({ isOpen, onClose, measurementId, customerId, jobId, isReadOnly }: MeasurementSheetModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6">
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-[98vw] lg:max-w-[85vw] xl:max-w-7xl h-[95vh] bg-card rounded-3xl shadow-2xl border border-border flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="absolute top-6 right-6 z-50 md:top-8 md:right-8">
          <Button size="icon" variant="ghost" onClick={onClose} className="h-10 w-10 bg-background/50 backdrop-blur-md rounded-full shadow-sm border border-border text-muted-foreground hover:text-foreground hover:bg-background">
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-y-auto w-full h-full rounded-3xl no-scrollbar">
          <MeasurementPageContent 
            measurementId={measurementId}
            isReadOnly={isReadOnly}
            passedCustomerId={customerId}
            passedJobId={jobId}
            onCancel={onClose}
            onSaveSuccess={() => {
              onClose();
              window.location.reload(); 
            }}
          />
        </div>
      </div>
    </div>
  );
}
