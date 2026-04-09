"use client";

import { useState } from "react";
import { Loader2, Save, Store } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function SupplierForm({ onClose, onSave }: { onClose: () => void, onSave: (data: any) => Promise<void> }) {
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact_name: "",
    email: "",
    phone: "",
    address: "",
    status: "Active",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      onClose();
    } catch {
      alert("Failed to save supplier");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <form onSubmit={handleSubmit} className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl border p-6 space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2"><Store className="h-5 w-5 text-accent" /> Add Supplier</h2>
        
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase">Company Name</label>
          <input required className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Contact Name</label>
            <input className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.contact_name} onChange={e => setFormData({...formData, contact_name: e.target.value})} />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground uppercase">Phone</label>
            <input type="tel" className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase">Email</label>
          <input type="email" className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
        </div>
        <div>
          <label className="text-xs font-bold text-muted-foreground uppercase">Address</label>
          <input className="w-full h-10 border rounded-lg px-3 mt-1 text-sm bg-muted/30" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} />
        </div>
        
        <div className="pt-4 flex justify-end gap-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button disabled={saving} type="submit">{saving ? <Loader2 className="animate-spin h-4 w-4" /> : <Save className="h-4 w-4 mr-2" />} Save</Button>
        </div>
      </form>
    </div>
  );
}
