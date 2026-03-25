"use client";

import { useState } from "react";
import { X, Save, Package, Ruler, Scissors, Box, Info } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ProductCategory } from "@/lib/products";

interface ProductFormProps {
  onClose: () => void;
  onSave: (product: any) => void;
  initialData?: any;
}

export function ProductForm({ onClose, onSave, initialData }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    category: initialData?.category || "Blinds" as ProductCategory,
    basePrice: initialData?.basePrice || 0,
    unit: initialData?.unit || "sqm",
    description: initialData?.description || "",
    status: initialData?.status || "Active",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-2xl bg-card rounded-3xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-accent/10 text-accent flex items-center justify-center rounded-xl">
              <Package className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-black uppercase tracking-tight">
                {initialData ? "Edit Product" : "Add New Product"}
              </h2>
              <p className="text-xs text-muted-foreground">Configure product details and pricing</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Product Name</label>
              <input 
                required
                className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-accent transition"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Premium Roller Blind"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</label>
              <select 
                className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-accent transition appearance-none"
                value={formData.category}
                onChange={e => setFormData({...formData, category: e.target.value as ProductCategory})}
              >
                <option value="Blinds">Blinds</option>
                <option value="Curtains">Curtains</option>
                <option value="Hardware">Hardware</option>
                <option value="Fabrics">Fabrics</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">SKU / Code</label>
              <input 
                className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-sm font-mono outline-none focus:ring-2 focus:ring-accent transition"
                value={formData.sku}
                onChange={e => setFormData({...formData, sku: e.target.value})}
                placeholder="BL-RL-001"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Base Price ($)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-mono">$</span>
                <input 
                  type="number"
                  step="0.01"
                  required
                  className="w-full h-12 bg-muted/30 border border-border rounded-xl pl-8 pr-4 text-sm font-mono outline-none focus:ring-2 focus:ring-accent transition"
                  value={formData.basePrice}
                  onChange={e => setFormData({...formData, basePrice: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Unit</label>
              <input 
                required
                className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-accent transition"
                value={formData.unit}
                onChange={e => setFormData({...formData, unit: e.target.value})}
                placeholder="sqm, m, box, etc."
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Description</label>
            <textarea 
              className="w-full min-h-[100px] bg-muted/30 border border-border rounded-xl p-4 text-sm outline-none focus:ring-2 focus:ring-accent transition resize-none"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="Describe the product features and usage..."
            />
          </div>

          <div className="p-4 bg-accent/5 rounded-2xl border border-accent/10 flex items-start gap-3">
             <Info className="h-5 w-5 text-accent shrink-0 mt-0.5" />
             <p className="text-[11px] text-muted-foreground leading-relaxed">
               Adding a product to the catalog will make it available for selection when creating new jobs and quotations. Ensure the SKU is unique for accurate tracking.
             </p>
          </div>
        </form>

        <div className="p-6 border-t border-border/50 bg-muted/20 flex gap-3 justify-end uppercase tracking-widest text-[10px] font-black">
          <Button variant="ghost" onClick={onClose} className="rounded-xl h-11 px-6">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="rounded-xl h-11 px-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
            <Save className="mr-2 h-4 w-4" /> {initialData ? "Update Product" : "Save Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}
