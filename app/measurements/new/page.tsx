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
  const [activeCoveringId, setActiveCoveringId] = useState<string | null>(null);

  useEffect(() => {
    if (locations.length === 0) {
      const initialCovering = createEmptyCovering();
      const initialLocation: Location = {
        id: 1,
        name: "",
        coverings: [initialCovering],
      };

      setLocations([initialLocation]);
      setActiveLocationId(1);
      setActiveCoveringId(initialCovering.id);
      setNextLocationId(2);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const createEmptyCovering = (): Covering => ({
    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
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
    const newCov = createEmptyCovering();
    setLocations(prev => prev.map(loc => {
      if (loc.id !== locId) return loc;
      return { ...loc, coverings: [...loc.coverings, newCov] };
    }));
    setActiveCoveringId(newCov.id);
  };

  const deleteCovering = (locId: number, covId: string) => {
    setLocations(prev => prev.map(loc => {
      if (loc.id !== locId) return loc;
      const remaining = loc.coverings.filter(c => c.id !== covId);
      const updatedCoverings = remaining.length > 0 ? remaining : loc.coverings;
      if (activeCoveringId === covId && updatedCoverings.length > 0) {
        setActiveCoveringId(updatedCoverings[0].id);
      }
      return { ...loc, coverings: updatedCoverings };
    }));
  };

  const deleteLocation = (locId: number) => {
    setLocations(prev => prev.filter(l => l.id !== locId));
    if (activeLocationId === locId) {
      const remaining = locations.filter(l => l.id !== locId);
      if (remaining.length > 0) {
        setActiveLocationId(remaining[0].id);
        setActiveCoveringId(remaining[0].coverings[0]?.id || null);
      } else {
        setActiveLocationId(null);
        setActiveCoveringId(null);
      }
    }
  };

  const copyLocation = (locId: number) => {
    const original = locations.find(l => l.id === locId);
    if (!original) return;

    const copiedCoverings = original.coverings.map(cov => ({
      ...cov,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 5)
    }));

    const copied: Location = {
      id: nextLocationId,
      name: original.name ? `${original.name} (Copy)` : `Location ${nextLocationId}`,
      coverings: copiedCoverings
    };

    setLocations(prev => [...prev, copied]);
    setActiveLocationId(nextLocationId);
    setActiveCoveringId(copiedCoverings[0]?.id || null);
    setNextLocationId(prev => prev + 1);
  };

  const switchToLocation = (locId: number) => {
    setActiveLocationId(locId);
    const loc = locations.find(l => l.id === locId);
    if (loc && loc.coverings.length > 0) {
      setActiveCoveringId(loc.coverings[0].id);
    }
  };

  const addNewLocation = () => {
    const newCov = createEmptyCovering();
    const newLoc: Location = {
      id: nextLocationId,
      name: "",
      coverings: [newCov]
    };
    setLocations(prev => [...prev, newLoc]);
    setActiveLocationId(nextLocationId);
    setActiveCoveringId(newCov.id);
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
        <div className="flex justify-between items-end mb-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Saved Locations</p>
          <Button variant="outline" size="sm" onClick={addNewLocation}>
            <Plus className="mr-2 h-4 w-4" /> Add Location
          </Button>
        </div>
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

          <div className="flex flex-col">
            {/* Covering Tabs */}
            <div className="flex px-8 pt-4 gap-2 overflow-x-auto border-b bg-muted/20 custom-scroll">
              {activeLocation.coverings.map((cov, idx) => {
                const isActive = activeCoveringId === cov.id;
                return (
                  <button
                    key={cov.id}
                    onClick={() => setActiveCoveringId(cov.id)}
                    className={`px-5 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
                      isActive ? "border-accent text-accent" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    Covering {idx + 1}
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full text-muted-foreground">{cov.type}</span>
                  </button>
                );
              })}
              <div className="px-2 py-2">
                <Button variant="ghost" size="sm" onClick={() => addCoveringToLocation(activeLocation.id)} className="text-muted-foreground">
                  <Plus className="h-4 w-4 mr-1" /> Add
                </Button>
              </div>
            </div>

            {/* Active Covering Vertical Form Preview */}
            <div className="p-8 bg-background">
              {activeLocation.coverings.map((cov, idx) => {
                if (cov.id !== activeCoveringId) return null;
                return (
                  <div key={cov.id} className="space-y-8 animate-in fade-in duration-300">
                    <div className="flex justify-between items-center pb-4 border-b">
                      <h3 className="text-xl font-bold">Covering {idx + 1} Details</h3>
                      {activeLocation.coverings.length > 1 && (
                        <Button variant="outline" size="sm" onClick={() => deleteCovering(activeLocation.id, cov.id)} className="text-destructive border-destructive/30 hover:bg-destructive/10">
                          <Trash2 className="h-4 w-4 mr-2" /> Delete Covering
                        </Button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                      {/* Product Type & Main Setup */}
                      <div className="space-y-4 xl:col-span-4 grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Covering Type</label>
                          <select
                            value={cov.type}
                            onChange={(e) => updateCovering(activeLocation.id, cov.id, "type", e.target.value)}
                            className="w-full border rounded-xl bg-muted/10 px-4 py-3 font-medium outline-none focus:ring-2 focus:ring-accent"
                          >
                            {productTypes.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Surface</label>
                          <input type="text" value={cov.surface || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "surface", e.target.value)} className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent" placeholder="e.g. Plaster, Brick..." />
                        </div>
                        <div>
                          <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1 block">Brackets</label>
                          <input type="text" value={cov.brackets || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "brackets", e.target.value)} className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-accent" placeholder="Type of brackets" />
                        </div>
                      </div>

                      {/* Dimensions Card */}
                      <div className="xl:col-span-2 rounded-2xl border p-5 bg-card shadow-sm">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4 border-b pb-2">Dimensions (mm)</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-3 bg-muted/10 p-3 rounded-xl border border-border/50">
                            <h5 className="text-xs font-bold text-center text-muted-foreground">IN FRAME</h5>
                            <div>
                              <label className="text-[10px] uppercase text-muted-foreground">Width</label>
                              <input type="number" value={cov.inWidth || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "inWidth", parseFloat(e.target.value) || 0)} className="w-full border rounded-lg px-3 py-2 text-center font-mono focus:ring-2 focus:ring-accent" placeholder="0" />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-muted-foreground">Drop</label>
                              <input type="number" value={cov.inDrop || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "inDrop", parseFloat(e.target.value) || 0)} className="w-full border rounded-lg px-3 py-2 text-center font-mono focus:ring-2 focus:ring-accent" placeholder="0" />
                            </div>
                          </div>
                          <div className="space-y-3 bg-muted/10 p-3 rounded-xl border border-border/50">
                            <h5 className="text-xs font-bold text-center text-muted-foreground">OUT FRAME</h5>
                            <div>
                              <label className="text-[10px] uppercase text-muted-foreground">Width</label>
                              <input type="number" value={cov.outWidth || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "outWidth", parseFloat(e.target.value) || 0)} className="w-full border rounded-lg px-3 py-2 text-center font-mono focus:ring-2 focus:ring-accent" placeholder="0" />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase text-muted-foreground">Drop</label>
                              <input type="number" value={cov.outDrop || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "outDrop", parseFloat(e.target.value) || 0)} className="w-full border rounded-lg px-3 py-2 text-center font-mono focus:ring-2 focus:ring-accent" placeholder="0" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Specifications Card */}
                      <div className="xl:col-span-2 rounded-2xl border p-5 bg-card shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Sp & Com block */}
                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground border-b pb-2">Specifications</h4>
                          <div className="grid grid-cols-3 gap-2">
                             <div>
                               <label className="text-[10px] text-muted-foreground block">SP1</label>
                               <input type="text" value={cov.sp1 || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "sp1", e.target.value)} className="w-full border rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-accent" />
                             </div>
                             <div>
                               <label className="text-[10px] text-muted-foreground block">SP2</label>
                               <input type="text" value={cov.sp2 || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "sp2", e.target.value)} className="w-full border rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-accent" />
                             </div>
                             <div>
                               <label className="text-[10px] text-muted-foreground block">SP3</label>
                               <input type="text" value={cov.sp3 || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "sp3", e.target.value)} className="w-full border rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-accent" />
                             </div>
                          </div>
                          <div>
                             <label className="text-[10px] text-muted-foreground block mt-2">Com 1</label>
                             <input type="text" value={cov.com1 || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "com1", e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent" />
                          </div>
                          <div>
                             <label className="text-[10px] text-muted-foreground block">Components</label>
                             <input type="text" value={cov.components || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, "components", e.target.value)} className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-accent" />
                          </div>
                        </div>

                        {/* Control & Mount Card */}
                        <div className="space-y-5">
                          <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground border-b pb-1 mb-2">Controls</h4>
                            <div className="grid grid-cols-4 gap-2">
                               {["c1","c2","c3","c4"].map(f => (
                                 <div key={f}>
                                   <label className="text-[10px] text-muted-foreground block uppercase">{f}</label>
                                   <input type="text" value={(cov as any)[f] || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, f as keyof Covering, e.target.value)} className="w-full border rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-accent text-center" />
                                 </div>
                               ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground border-b pb-1 mb-2">Mount</h4>
                            <div className="grid grid-cols-4 gap-2">
                               {["m1","m2","m3","m4"].map(f => (
                                 <div key={f}>
                                   <label className="text-[10px] text-muted-foreground block uppercase">{f}</label>
                                   <input type="text" value={(cov as any)[f] || ""} onChange={(e) => updateCovering(activeLocation.id, cov.id, f as keyof Covering, e.target.value)} className="w-full border rounded-lg px-2 py-1.5 focus:ring-2 focus:ring-accent text-center" />
                                 </div>
                               ))}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
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