"use client";

import { useState } from "react";
import { ProductList } from "@/components/products/ProductList";
import { ProductForm } from "@/components/products/ProductForm";
import { Plus, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ProductsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-accent text-accent-foreground flex items-center justify-center rounded-xl shadow-lg shadow-accent/20">
              <Package className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Product Catalog</h1>
          </div>
          <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
            Manage your curtains, blinds, and hardware components. Configure base pricing, units, and technical specifications.
          </p>
        </div>
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="h-12 px-6 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl shadow-accent/20 font-black uppercase tracking-widest text-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="mr-2 h-5 w-5" /> Add New Product
        </Button>
      </div>

      <ProductList />

      {isFormOpen && (
        <ProductForm 
          onClose={() => setIsFormOpen(false)} 
          onSave={(data) => {
            console.log("New Product:", data);
            // In a real app, we would update state or call an API here
          }} 
        />
      )}
    </div>
  );
}
