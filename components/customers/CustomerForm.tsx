"use client";

import { useState } from "react";
import { X, Save, User, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CustomerFormProps {
  onClose: () => void;
  onSave: (data: any) => Promise<void>;
}

export function CustomerForm({ onClose, onSave }: CustomerFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    status: "Lead",
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      await onSave(formData);
      onClose();
    } catch (err: any) {
      console.error("Save Enquiry Error:", err);
      setError(err.message || "Failed to save enquiry. Please ensure your database is connected.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-card rounded-3xl shadow-2xl border border-border overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-6 border-b border-border/50">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-accent/10 text-accent flex items-center justify-center rounded-xl">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold uppercase tracking-tight">Add New Enquiry</h2>
              <p className="text-xs text-muted-foreground">Log a new lead or customer request</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-xl transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-500 font-bold">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Customer Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  required
                  placeholder="e.g. John Doe"
                  className="w-full h-11 bg-muted/30 border border-border rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-accent transition"
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="tel"
                    placeholder="+94 77..."
                    className="w-full h-11 bg-muted/30 border border-border rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-accent transition"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="email"
                    placeholder="john@example.com"
                    className="w-full h-11 bg-muted/30 border border-border rounded-xl pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-accent transition"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-1">Address</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <textarea 
                  placeholder="Customer's physical address..."
                  className="w-full min-h-[80px] bg-muted/30 border border-border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-accent transition resize-none"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button type="button" variant="ghost" onClick={onClose} className="rounded-xl h-11 px-6 font-bold uppercase tracking-widest text-[10px]">
              Cancel
            </Button>
            <Button disabled={saving} type="submit" className="rounded-xl h-11 px-8 bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/20 font-bold uppercase tracking-widest text-[10px]">
              {saving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
              {saving ? "Saving..." : "Save Enquiry"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
