import { UploadCloud, Folder } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function UploadSection() {
  const folders = ["Fabric", "Confirmation Window", "Source and Bin"];
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">Upload Files</h3>
        <Button size="sm" variant="outline" className="h-8">
          <UploadCloud className="mr-2 h-4 w-4" />
          Upload
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {folders.map(folder => (
          <div key={folder} className="group flex flex-col items-center justify-center p-6 rounded-xl border border-border/50 bg-background hover:border-accent hover:shadow-sm transition-all cursor-pointer">
            <Folder className="h-10 w-10 text-muted-foreground/40 group-hover:text-accent mb-3 transition-colors" />
            <span className="text-xs font-medium text-foreground text-center">{folder}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
