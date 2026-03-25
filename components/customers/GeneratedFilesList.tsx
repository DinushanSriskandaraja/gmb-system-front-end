"use client";

import { FileText, File, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";

export function GeneratedFilesList({ customer, generatedFiles }: { customer: any, generatedFiles: any[] }) {
  const router = useRouter();

  const handleView = (file: any) => {
    if (file.name.toLowerCase().includes("quote")) {
      // Extract ID from filename or use f2 as default for demo
      const quoteId = file.name.split("_")[1]?.split(".")[0] || "Q-0042";
      router.push(`/quotation/${quoteId}`);
      return;
    }
    // Navigate to measurements slug with preview mode
    router.push(`/paperworks/production`);
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm min-h-[300px] flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Generated Files</h3>
      </div>
      {customer.hasJob ? (
        <div className="flex flex-col gap-3">
          {generatedFiles.map((file: any) => (
            <div key={file.id} className="group flex items-center justify-between p-3 rounded-xl border border-border/50 bg-background hover:border-border hover:shadow-sm transition-all text-xs lg:text-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{file.type} • {file.size} • Generated {file.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleView(file)}
                  className="h-8 w-8 text-muted-foreground hover:text-accent hover:bg-accent/10"
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-xl bg-background/50">
          <File className="h-8 w-8 text-muted-foreground mb-3" />
          <h4 className="text-sm font-medium text-foreground mb-1">No files generated yet</h4>
          <p className="text-xs text-muted-foreground max-w-[250px]">
            This customer doesn't have any active jobs or generated paperwork yet.
          </p>
        </div>
      )}
    </div>
  );
}
