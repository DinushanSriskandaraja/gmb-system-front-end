"use client";

import { useState } from "react";
import { Loader2, Save, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface OrderFormProps {
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
  products: any[];
  suppliers: any[];
}

export function OrderForm({ onClose, onSave, products, suppliers }: OrderFormProps) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    supplier_id: suppliers[0]?.supplier_id || "",
    products_catalog_id: products[0]?.products_catalog_id || "",
    quantity: 1,
    unit: "m",
    order_date: new Date().toISOString().split('T')[0],
    expected_delivery_date: "",
    total_amount: 0,
    status: "Order Placed",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave({
        ...formData,
        quantity: Number(formData.quantity),
        total_amount: Number(formData.total_amount)
      });
      onClose();
    } catch {
      alert("Failed to create order");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl border p-6 space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-accent" /> Create Order</h2>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Supplier</label>
            <select required className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.supplier_id} onChange={e => setFormData({...formData, supplier_id: e.target.value})}>
              <option value="" disabled>Select Supplier</option>
              {suppliers.map(s => <option key={s.supplier_id} value={s.supplier_id}>{s.name}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Product</label>
            <select required className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.products_catalog_id} onChange={e => setFormData({...formData, products_catalog_id: e.target.value})}>
              <option value="" disabled>Select Product</option>
              {products.map(p => <option key={p.products_catalog_id} value={p.products_catalog_id}>{p.item_name}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Quantity</label>
            <input type="number" required min="1" className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.quantity} onChange={e => setFormData({...formData, quantity: Number(e.target.value)})} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Unit</label>
            <select required className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.unit} onChange={e => setFormData({...formData, unit: e.target.value})}>
              {['m', 'mm', 'cm', 'count', 'sqm'].map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Order Date</label>
            <input type="date" required className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.order_date} onChange={e => setFormData({...formData, order_date: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Expected Delivery</label>
            <input type="date" className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.expected_delivery_date} onChange={e => setFormData({...formData, expected_delivery_date: e.target.value})} />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase">Total Amount ($)</label>
          <input type="number" step="0.01" required className="w-full h-10 border rounded-lg px-3 mt-1 text-sm font-mono bg-muted/30" value={formData.total_amount} onChange={e => setFormData({...formData, total_amount: Number(e.target.value)})} />
        </div>
        
        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button disabled={saving} type="submit">{saving ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4 mr-2" />} Save</Button>
        </div>
      </form>
    </div>
  );
}
