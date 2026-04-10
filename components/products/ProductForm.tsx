"use client";

import { useState } from "react";
import { X, Save, Package, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Category, ProductCatalog } from "@/lib/db/types";

interface ProductFormProps {
  onClose: () => void;
  onSave: (product: Omit<ProductCatalog, 'products_catalog_id' | 'created_at'>) => Promise<void>;
  categories: Category[];
  initialData?: any; // For future edit support
}

export function ProductForm({ onClose, onSave, categories, initialData }: ProductFormProps) {
  const [formData, setFormData] = useState({
    item_name: initialData?.item_name || "",
    category_id: initialData?.category_id || categories?.[0]?.id || "",
    base_price: initialData?.base_price || 0,
    unit: initialData?.unit || "m",
    description: initialData?.description || "",
    status: initialData?.status || "Active",
  });
  
  const [errorMsg, setErrorMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.item_name) {
      setErrorMsg("Product name is required.");
      return;
    }
    
    setSaving(true);
    setErrorMsg("");
    try {
      await onSave({
        item_name: formData.item_name,
        category_id: formData.category_id,
        base_price: Number(formData.base_price),
        unit: formData.unit as 'm' | 'mm' | 'cm' | 'count',
        description: formData.description,
        status: formData.status as 'Active' | 'Inactive',
      });
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to save product to database.");
      alert(err.message || "Failed to save product. Ensure all fields are valid.");
    } finally {
      setSaving(false);
    }
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
          {errorMsg && (
            <div className="p-3 mb-4 bg-red-500/10 border border-red-500/20 rounded-lg text-sm text-red-500">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Product Name</label>
              <input 
                required
                className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-accent transition"
                value={formData.item_name}
                onChange={e => setFormData({...formData, item_name: e.target.value})}
                placeholder="e.g. Premium Roller Blind"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Category</label>
              <select 
                required
                className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-accent transition appearance-none"
                value={formData.category_id}
                onChange={e => setFormData({...formData, category_id: e.target.value})}
              >
                <option value="" disabled>Select a Category...</option>
                {categories?.map(c => (
                   <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Status</label>
              <select 
                className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-accent transition appearance-none"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                 <option value="Active">Active</option>
                 <option value="Inactive">Inactive</option>
              </select>
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
                  value={formData.base_price}
                  onChange={e => setFormData({...formData, base_price: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Unit</label>
              <select 
                className="w-full h-12 bg-muted/30 border border-border rounded-xl px-4 text-sm outline-none focus:ring-2 focus:ring-accent transition appearance-none"
                value={formData.unit}
                onChange={e => setFormData({...formData, unit: e.target.value})}
              >
                <option value="m">Meter (m)</option>
                <option value="mm">Millimeter (mm)</option>
                <option value="cm">Centimeter (cm)</option>
                <option value="count">Item Count</option>
              </select>
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
               Adding a product to the catalog will make it available for selection when creating new jobs and quotations.
             </p>
          </div>
        </form>

        <div className="p-6 border-t border-border/50 bg-muted/20 flex gap-3 justify-end uppercase tracking-widest text-[10px] font-black">
          <Button variant="ghost" onClick={onClose} className="rounded-xl h-11 px-6">
            Cancel
          </Button>
          <Button disabled={saving} onClick={handleSubmit} className="rounded-xl h-11 px-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20">
            {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
            {saving ? "Saving..." : (initialData ? "Update Product" : "Save Product")}
          </Button>
        </div>
      </div>
    </div>
  );
}
