"use client";

import { useState, useEffect } from "react";
import { Plus, Save, FileText, Trash2, Copy, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

const productTypes = ["Roller Blind", "Venetian", "Roman Blind", "Curtain", "Shutter"];

interface Covering {
  id: string;
  type: string;
  // Specification
  sp1: string; sp2: string; sp3: string;
  // Control
  c1: string; c2: string; c3: string; c4: string;
  // Mounting Point
  m1: string; m2: string; m3: string; m4: string;
  surface: string;
  com1: string;
  components: string;
  brackets: string;
  // In Frame
  inWidth: number;
  inDrop: number;
  // Out Frame
  outWidth: number;
  outDrop: number;
}

interface Location {
  id: number;
  name: string;
  coverings: Covering[];
}

export default function NewMeasurementPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [nextLocationId, setNextLocationId] = useState(1);
  const [activeLocationId, setActiveLocationId] = useState<number | null>(null);

  useEffect(() => {
    if (locations.length === 0) {
      const initialCovering: Covering = {
        id: Date.now().toString(),
        type: productTypes[0],
        sp1: "", sp2: "", sp3: "",
        c1: "", c2: "", c3: "", c4: "",
        m1: "", m2: "", m3: "", m4: "",
        surface: "", com1: "", components: "", brackets: "",
        inWidth: 0, inDrop: 0,
        outWidth: 0, outDrop: 0,
      };

      const initialLocation: Location = {
        id: 1,
        name: "",
        coverings: [initialCovering],
      };

      setLocations([initialLocation]);
      setActiveLocationId(1);
      setNextLocationId(2);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const createEmptyCovering = (): Covering => ({
    id: Date.now().toString(),
    type: productTypes[0],
    sp1: "", sp2: "", sp3: "",
    c1: "", c2: "", c3: "", c4: "",
    m1: "", m2: "", m3: "", m4: "",
    surface: "", com1: "", components: "", brackets: "",
    inWidth: 0, inDrop: 0,
    outWidth: 0, outDrop: 0,
  });

  const updateLocationName = (locId: number, newName: string) => {
    setLocations(prev => prev.map(loc => loc.id === locId ? { ...loc, name: newName } : loc));
  };

  const updateCovering = (locId: number, covId: string, field: keyof Covering, value: any) => {
    setLocations(prev => prev.map(loc => {
      if (loc.id !== locId) return loc;
      return {
        ...loc,
        coverings: loc.coverings.map(cov => cov.id === covId ? { ...cov, [field]: value } : cov)
      };
    }));
  };

  const addCoveringToLocation = (locId: number) => {
    setLocations(prev => prev.map(loc => {
      if (loc.id !== locId) return loc;
      return { ...loc, coverings: [...loc.coverings, createEmptyCovering()] };
    }));
  };

  const deleteCovering = (locId: number, covId: string) => {
    setLocations(prev => prev.map(loc => {
      if (loc.id !== locId) return loc;
      const remaining = loc.coverings.filter(c => c.id !== covId);
      return { ...loc, coverings: remaining.length > 0 ? remaining : loc.coverings };
    }));
  };

  const deleteLocation = (locId: number) => {
    setLocations(prev => prev.filter(l => l.id !== locId));
    if (activeLocationId === locId) {
      const remaining = locations.filter(l => l.id !== locId);
      setActiveLocationId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  const copyLocation = (locId: number) => {
    const original = locations.find(l => l.id === locId);
    if (!original) return;

    const copied: Location = {
      id: nextLocationId,
      name: original.name ? `${original.name} (Copy)` : `Location ${nextLocationId}`,
      coverings: original.coverings.map(cov => ({
        ...cov,
        id: Date.now().toString() + Math.random().toString(36)
      }))
    };

    setLocations(prev => [...prev, copied]);
    setActiveLocationId(nextLocationId);
    setNextLocationId(prev => prev + 1);
  };

  const switchToLocation = (locId: number) => {
    setActiveLocationId(locId);
  };

  const addNewLocation = () => {
    const newLoc: Location = {
      id: nextLocationId,
      name: "",
      coverings: [createEmptyCovering()]
    };
    setLocations(prev => [...prev, newLoc]);
    setActiveLocationId(nextLocationId);
    setNextLocationId(prev => prev + 1);
  };

  const handleSaveAll = () => {
    console.log("Saved:", locations);
    alert("✅ Measurement sheet saved successfully!");
  };

  const activeLocation = locations.find(l => l.id === activeLocationId);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Measurement Sheet</h1>
          <p className="text-muted-foreground mt-1">Enter precise window & covering details</p>
        </div>
        <Button variant="outline"><FileText className="mr-2 h-4 w-4" /> Load Job</Button>
      </div>

      {/* Customer Info */}
      <div className="rounded-2xl border bg-card p-6 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Customer</label>
            <input className="mt-1 w-full border rounded-lg px-4 py-2" placeholder="Customer name" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Job ID</label>
            <input className="mt-1 w-full border rounded-lg px-4 py-2 font-mono" placeholder="J-001" />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wider text-muted-foreground">Date</label>
            <input type="date" className="mt-1 w-full border rounded-lg px-4 py-2" />
          </div>
        </div>
      </div>

      {/* Saved Locations - Horizontal Scroll */}
      <div className="mb-10">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Saved Locations</p>
        <div className="flex gap-4 overflow-x-auto pb-6 snap-x custom-scroll">
          {locations.map(loc => (
            <div
              key={loc.id}
              className={`min-w-[300px] snap-start rounded-2xl border p-5 transition-all ${activeLocationId === loc.id ? 'border-accent ring-1 ring-accent' : 'border-border hover:border-accent/50'}`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-2xl bg-accent/10 flex items-center justify-center text-2xl font-bold text-accent">
                  {loc.id}
                </div>
                <div className="flex-1">
                  <p
                    className="font-semibold cursor-pointer hover:underline"
                    onClick={() => switchToLocation(loc.id)}
                  >
                    {loc.name || `Location ${loc.id}`}
                  </p>
                  <p className="text-sm text-muted-foreground">{loc.coverings.length} covering(s)</p>
                </div>

                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => switchToLocation(loc.id)} title="View / Edit">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => copyLocation(loc.id)} title="Copy Location">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Form - Active Location */}
      {activeLocation && (
        <div className="rounded-3xl border bg-card shadow-sm overflow-hidden">
          <div className="px-8 py-6 border-b bg-muted/40 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-3xl font-bold text-white">
                {activeLocation.id}
              </div>
              <input
                value={activeLocation.name}
                onChange={(e) => updateLocationName(activeLocation.id, e.target.value)}
                placeholder="Location / Room name"
                className="text-2xl font-semibold bg-transparent outline-none flex-1"
              />
            </div>

            <Button variant="ghost" size="sm" onClick={() => deleteLocation(activeLocation.id)} className="text-destructive">
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Coverings</h3>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => addCoveringToLocation(activeLocation.id)}>
                  <Plus className="mr-2 h-4 w-4" /> Add another covering
                </Button>
                <Button onClick={addNewLocation}>
                  <Plus className="mr-2 h-4 w-4" /> Add New Location
                </Button>
              </div>
            </div>

            {activeLocation.coverings.map((cov, idx) => (
              <div key={cov.id} className="mb-12 last:mb-0 border rounded-2xl p-8 bg-background">
                <div className="flex justify-between items-center mb-6">
                  <div className="font-medium text-lg">Covering {idx + 1} — {cov.type}</div>
                  {activeLocation.coverings.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => deleteCovering(activeLocation.id, cov.id)} className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[1400px] border-collapse">
                    <thead>
                      <tr className="bg-muted/60">
                        <th className="p-3 text-left border">Covering Type</th>
                        <th className="p-3 text-left border">SP1</th>
                        <th className="p-3 text-left border">SP2</th>
                        <th className="p-3 text-left border">SP3</th>
                        <th className="p-3 text-left border">C1</th>
                        <th className="p-3 text-left border">C2</th>
                        <th className="p-3 text-left border">C3</th>
                        <th className="p-3 text-left border">C4</th>
                        <th className="p-3 text-left border">M1</th>
                        <th className="p-3 text-left border">M2</th>
                        <th className="p-3 text-left border">M3</th>
                        <th className="p-3 text-left border">M4</th>
                        <th className="p-3 text-left border">Surface</th>
                        <th className="p-3 text-left border">Com 1</th>
                        <th className="p-3 text-left border">Components</th>
                        <th className="p-3 text-left border">Brackets</th>
                        <th className="p-3 text-center border" colSpan={2}>In Frame</th>
                        <th className="p-3 text-center border" colSpan={2}>Out Frame</th>
                      </tr>
                      <tr className="bg-muted/30 text-xs">
                        <th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th><th></th>
                        <th className="p-2 text-center border">Width</th>
                        <th className="p-2 text-center border">Drop</th>
                        <th className="p-2 text-center border">Width</th>
                        <th className="p-2 text-center border">Drop</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="p-3 border">
                          <select
                            value={cov.type}
                            onChange={(e) => updateCovering(activeLocation.id, cov.id, "type", e.target.value)}
                            className="w-full border rounded px-3 py-2"
                          >
                            {productTypes.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </td>
                        {["sp1", "sp2", "sp3", "c1", "c2", "c3", "c4", "m1", "m2", "m3", "m4", "surface", "com1", "components", "brackets"].map(field => (
                          <td key={field} className="p-3 border">
                            <input
                              type="text"
                              value={(cov as any)[field] || ""}
                              onChange={(e) => updateCovering(activeLocation.id, cov.id, field as keyof Covering, e.target.value)}
                              className="w-full border rounded px-3 py-2 text-sm"
                            />
                          </td>
                        ))}
                        <td className="p-3 border">
                          <input
                            type="number"
                            value={cov.inWidth || ""}
                            onChange={(e) => updateCovering(activeLocation.id, cov.id, "inWidth", parseFloat(e.target.value) || 0)}
                            placeholder="1200"
                            className="w-full border rounded px-3 py-2 text-sm text-center"
                          />
                        </td>
                        <td className="p-3 border">
                          <input
                            type="number"
                            value={cov.inDrop || ""}
                            onChange={(e) => updateCovering(activeLocation.id, cov.id, "inDrop", parseFloat(e.target.value) || 0)}
                            placeholder="1800"
                            className="w-full border rounded px-3 py-2 text-sm text-center"
                          />
                        </td>
                        <td className="p-3 border">
                          <input
                            type="number"
                            value={cov.outWidth || ""}
                            onChange={(e) => updateCovering(activeLocation.id, cov.id, "outWidth", parseFloat(e.target.value) || 0)}
                            placeholder="1250"
                            className="w-full border rounded px-3 py-2 text-sm text-center"
                          />
                        </td>
                        <td className="p-3 border">
                          <input
                            type="number"
                            value={cov.outDrop || ""}
                            onChange={(e) => updateCovering(activeLocation.id, cov.id, "outDrop", parseFloat(e.target.value) || 0)}
                            placeholder="1850"
                            className="w-full border rounded px-3 py-2 text-sm text-center"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-center mt-12">
        <Button onClick={handleSaveAll} size="lg" className="px-16">
          <Save className="mr-3 h-5 w-5" />
          Everything Done – Save & Finish
        </Button>
      </div>
    </div>
  );
}