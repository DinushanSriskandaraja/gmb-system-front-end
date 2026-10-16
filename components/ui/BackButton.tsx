"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function BackButton({ label = "Back" }: { label?: string }) {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.back()} 
      className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors"
    >
      <ChevronLeft className="mr-1 h-4 w-4" />
      {label}
    </button>
  );
}
