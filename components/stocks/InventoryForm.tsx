"use client";

import { useState } from "react";
import { X, Save, Box, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InventoryFormProps {
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  products: any[];
}

export function InventoryForm({ onClose, onSave, products }: InventoryFormProps) {
  const [formData, setFormData] = useState({
    product_id: products[0]?.products_catalog_id || "",
    quantity_on_hand: 0,
    reorder_level: 10,
    location: "Main Warehouse",
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        product_id: formData.product_id,
        quantity_on_hand: Number(formData.quantity_on_hand),
        reorder_level: Number(formData.reorder_level),
        location: formData.location,
      });
      onClose();
    } catch (err) {
      alert("Failed to save inventory.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl border p-6">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
           <Box className="h-5 w-5 text-accent" /> Add Stock Item
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Product</label>
            <select 
              className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30"
              value={formData.product_id}
              onChange={e => setFormData({...formData, product_id: e.target.value})}
            >
              <option value="" disabled>Select a product...</option>
              {products.map(p => (
                <option key={p.products_catalog_id} value={p.products_catalog_id}>{p.item_name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Quantity</label>
              <input type="number" required className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.quantity_on_hand} onChange={e => setFormData({...formData, quantity_on_hand: Number(e.target.value)})} />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground uppercase">Reorder Level</label>
              <input type="number" required className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.reorder_level} onChange={e => setFormData({...formData, reorder_level: Number(e.target.value)})} />
            </div>
          </div>
          <div className="pt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
            <Button disabled={saving} onClick={handleSubmit}>{saving ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4 mr-2" />} Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
