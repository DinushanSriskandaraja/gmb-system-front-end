"use client";

import React, { useState } from "react";
import { Printer, Edit3, Eye } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface TrackerData {
  header: {
    attention: string;
    clientName: string;
    clientNumber: string;
    status: string;
    projectManager: string;
    numberOfBlinds: number;
    supplyAndInstall: string;
    productionDate: string;
    startTime: string;
    finishedTime: string;
  };
  fabricTracking: {
    neededFabric: string;
    anyStock: string;
    orderedFabric: string;
    receivedFabric: string;
    balanceFabric: string;
  };
  jobs: any[];
  hardwareSummary: {
    singleBKTs: number;
    doubleBKTs: number;
    remotes: number;
    chargers: number;
  };
  productionNotes: string;
}

export function ProductionTracker({ initialData }: { initialData?: TrackerData }) {
  const [data, setData] = useState<TrackerData>(initialData || {
    header: {
      attention: "", clientName: "", clientNumber: "", status: "", projectManager: "Kiru",
      numberOfBlinds: 0, supplyAndInstall: "", productionDate: "", startTime: "", finishedTime: ""
    },
    fabricTracking: {
      neededFabric: "", anyStock: "", orderedFabric: "", receivedFabric: "", balanceFabric: ""
    },
    jobs: Array.from({ length: 15 }).map((_, i) => ({ id: i + 1 })),
    hardwareSummary: { singleBKTs: 0, doubleBKTs: 0, remotes: 0, chargers: 0 },
    productionNotes: ""
  });

  const [isPreview, setIsPreview] = useState(false);

  const updateHeader = (field: keyof TrackerData["header"], value: any) => {
    setData(prev => ({ ...prev, header: { ...prev.header, [field]: value } }));
  };

  const updateFabric = (field: keyof TrackerData["fabricTracking"], value: string) => {
    setData(prev => ({ ...prev, fabricTracking: { ...prev.fabricTracking, [field]: value } }));
  };

  const updateJob = (index: number, field: string, value: string) => {
    const newJobs = [...data.jobs];
    newJobs[index] = { ...newJobs[index], [field]: value };
    setData(prev => ({ ...prev, jobs: newJobs }));
  };

  const updateHardware = (field: keyof TrackerData["hardwareSummary"], value: number) => {
    setData(prev => ({ ...prev, hardwareSummary: { ...prev.hardwareSummary, [field]: value } }));
  };

  const DisplayField = ({ label, value, onChange, type = "text", className = "" }: any) => {
    if (isPreview) {
      return (
        <div className={`flex flex-col gap-1 ${className}`}>
          <span className="font-bold uppercase tracking-widest text-[9px] text-muted-foreground">{label}</span>
          <span className="text-sm font-medium border-b border-transparent py-1.5 min-h-[2rem] flex items-center">
            {value || "—"}
          </span>
        </div>
      );
    }
    return (
      <div className={`flex flex-col gap-1.5 ${className}`}>
        <label className="font-bold uppercase tracking-widest text-[10px] text-muted-foreground">{label}</label>
        {type === "select" ? (
          <select 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="border-b border-border py-1.5 outline-none text-sm focus:border-accent transition-colors bg-transparent cursor-pointer"
          >
            <option value="" className="bg-card"></option>
            <option value="Yes" className="bg-card">Yes</option>
            <option value="No" className="bg-card">No</option>
          </select>
        ) : (
          <input 
            type={type} 
            value={value} 
            onChange={(e) => onChange(e.target.value)}
            className="border-b border-border py-1.5 outline-none text-sm focus:border-accent transition-colors bg-transparent placeholder:text-muted-foreground/30"
          />
        )}
      </div>
    );
  };

  return (
    <div className="bg-card text-foreground border border-border rounded-2xl shadow-sm overflow-hidden text-xs max-w-full transition-all print:border-none print:shadow-none">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between p-5 border-b border-border bg-muted/30 print:hidden">
        <div>
          <h2 className="text-lg font-bold tracking-tight">Production Tracking Sheet</h2>
          <p className="text-muted-foreground">Manufacturing order entry and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={() => setIsPreview(!isPreview)} className="text-accent hover:bg-accent/10">
            {isPreview ? <Edit3 className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {isPreview ? "Switch to Edit" : "Preview Mode"}
          </Button>
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" /> Print Sheet
          </Button>
        </div>
      </div>

      <div className="p-6 md:p-8 print:p-0">
        <h1 className="text-2xl font-black tracking-tighter text-center border-b-2 border-border pb-4 mb-8 text-foreground uppercase">
          Holland Block Out
        </h1>

        {/* Top Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mb-10">
          {/* General Fields */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-7">
            <DisplayField label="Attention" value={data.header.attention} onChange={(v: string) => updateHeader("attention", v)} />
            <DisplayField label="Client's Name" value={data.header.clientName} onChange={(v: string) => updateHeader("clientName", v)} />
            <DisplayField label="Client's Number" value={data.header.clientNumber} onChange={(v: string) => updateHeader("clientNumber", v)} />
            <DisplayField label="Status" value={data.header.status} onChange={(v: string) => updateHeader("status", v)} />
            <DisplayField label="Project Manager" value={data.header.projectManager} onChange={(v: string) => updateHeader("projectManager", v)} />
            <DisplayField label="Number of Blinds" type="number" value={data.header.numberOfBlinds} onChange={(v: string) => updateHeader("numberOfBlinds", parseInt(v) || 0)} />
            <DisplayField label="Supply & Install" type="select" value={data.header.supplyAndInstall} onChange={(v: string) => updateHeader("supplyAndInstall", v)} />
            <DisplayField label="Production Date" type="date" value={data.header.productionDate} onChange={(v: string) => updateHeader("productionDate", v)} />
            <div className="flex gap-6">
              <DisplayField label="Start Time" type="time" value={data.header.startTime} onChange={(v: string) => updateHeader("startTime", v)} className="flex-1" />
              <DisplayField label="Finished Time" type="time" value={data.header.finishedTime} onChange={(v: string) => updateHeader("finishedTime", v)} className="flex-1" />
            </div>
          </div>

          {/* Fabric Tracking Panel */}
          <div className="bg-muted/20 border border-border p-6 rounded-2xl self-start">
            <h3 className="font-bold text-sm mb-6 pb-2 border-b border-border text-foreground tracking-tight">Fabric Tracking</h3>
            <div className="space-y-4">
              {[
                { label: "Needed Fabric", field: "neededFabric" },
                { label: "Any Stock", field: "anyStock" },
                { label: "Ordered Fabric", field: "orderedFabric" },
                { label: "Received Fabric", field: "receivedFabric" }
              ].map(({ label, field }) => (
                <div key={field} className="flex items-center justify-between gap-4">
                  <span className="font-medium text-muted-foreground">{label}</span>
                  {isPreview ? (
                    <span className="text-right font-semibold">{(data.fabricTracking as any)[field] || "—"}</span>
                  ) : (
                    <input 
                      type="text" 
                      value={(data.fabricTracking as any)[field]} 
                      onChange={(e) => updateFabric(field as any, e.target.value)}
                      className="w-24 border border-border rounded-lg px-2 py-1.5 text-right focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground" 
                    />
                  )}
                </div>
              ))}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-bold text-foreground">Balance Fabric</span>
                {isPreview ? (
                  <span className="text-right font-bold text-accent">{data.fabricTracking.balanceFabric || "—"}</span>
                ) : (
                  <input 
                    type="text" 
                    value={data.fabricTracking.balanceFabric} 
                    onChange={(e) => updateFabric("balanceFabric", e.target.value)}
                    className="w-24 border border-border font-bold rounded-lg px-2 py-1.5 text-right focus:outline-none focus:ring-2 focus:ring-accent bg-background text-accent" 
                  />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Manufacturing Table */}
        <div className={`overflow-x-auto border border-border rounded-xl ${isPreview ? 'shadow-inner bg-muted/5' : ''}`}>
          <table className="w-full text-left border-collapse min-w-[1400px]">
            <thead>
              <tr className="bg-muted/50 border-b border-border text-center text-[10px] uppercase font-black tracking-widest text-muted-foreground">
                <th colSpan={5} className="py-3 border-r border-border px-2">Fabric Supplier Section</th>
                <th colSpan={7} className="py-3 border-r border-border px-2">Collection Section</th>
                <th colSpan={2} className="py-3 border-r border-border px-2 bg-accent/5 text-accent">Fabric Info</th>
                <th colSpan={4} className="py-3 px-2 bg-orange-500/5 text-orange-500">Dimensions (mm)</th>
              </tr>
              <tr className="bg-muted/30 border-b border-border text-[9px] font-bold text-center leading-tight text-foreground uppercase tracking-wider">
                {["Supplier", "Location", "Control", "Bracket", "Chain"].map(h => <th key={h} className="border-r border-border p-2.5">{h}</th>)}
                {["Customer", "Collection", "Bottom", "Rolling", "Mount", "Surface", "Pelmet"].map(h => <th key={h} className="border-r border-border p-2.5">{h}</th>)}
                <th className="border-r border-border p-2.5 bg-accent/5 w-16">Needed</th>
                <th className="border-r border-border p-2.5 bg-accent/5 min-w-[120px]">Notes</th>
                <th className="border-r border-border p-2.5 bg-orange-500/5 w-16 text-orange-500/80">W (Act)</th>
                <th className="border-r border-border p-2.5 bg-red-500/10 text-red-500 w-16">W (Cut)</th>
                <th className="border-r border-border p-2.5 bg-orange-500/5 w-16 text-orange-500/80">H (Act)</th>
                <th className="p-2.5 bg-red-500/10 text-red-500 w-16">H (Cut)</th>
              </tr>
            </thead>
            <tbody className="bg-card">
              {data.jobs.map((job, i) => (
                <tr key={i} className={`border-b border-border transition-colors ${isPreview ? '' : 'hover:bg-muted/20'}`}>
                  {[
                    "supplier", "location", "control", "bracket", "chain",
                    "customer", "collectionName", "bottomStyle", "rollingWay", "mountPoint", "surface", "pelmetType"
                  ].map(field => (
                    <td key={field} className="border-r border-border">
                      {isPreview ? (
                        <div className="px-2.5 py-2.5 min-h-[2.5rem] flex items-center justify-center text-center">
                          {job[field] || ""}
                        </div>
                      ) : (
                        <input 
                          type="text" 
                          value={job[field] || ""} 
                          onChange={(e) => updateJob(i, field, e.target.value)}
                          className="w-full bg-transparent px-2.5 py-2.5 focus:outline-none focus:bg-background text-foreground text-center" 
                        />
                      )}
                    </td>
                  ))}
                  <td className="border-r border-border bg-accent/5">
                    {isPreview ? <div className="px-2.5 py-2.5 text-center font-medium">{job.neededFabric}</div> : <input type="text" value={job.neededFabric || ""} onChange={(e) => updateJob(i, "neededFabric", e.target.value)} className="w-full bg-transparent px-2.5 py-2.5 focus:outline-none focus:bg-background text-foreground text-center" />}
                  </td>
                  <td className="border-r border-border bg-accent/5">
                    {isPreview ? <div className="px-2.5 py-2.5 text-xs italic opacity-70">{job.notes}</div> : <input type="text" value={job.notes || ""} onChange={(e) => updateJob(i, "notes", e.target.value)} className="w-full bg-transparent px-2.5 py-2.5 focus:outline-none focus:bg-background text-foreground" />}
                  </td>
                  <td className="border-r border-border bg-orange-500/5">
                    {isPreview ? <div className="px-2.5 py-2.5 text-center font-mono">{job.wActual}</div> : <input type="text" value={job.wActual || ""} onChange={(e) => updateJob(i, "wActual", e.target.value)} className="w-full bg-transparent px-2.5 py-2.5 focus:outline-none focus:bg-background font-mono text-center text-foreground" />}
                  </td>
                  <td className="border-r border-border bg-red-500/5">
                    {isPreview ? <div className="px-2.5 py-2.5 text-center font-bold text-red-500 font-mono">{job.wCut}</div> : <input type="text" value={job.wCut || ""} onChange={(e) => updateJob(i, "wCut", e.target.value)} className="w-full bg-transparent px-2.5 py-2.5 focus:outline-none focus:bg-background font-mono text-red-500 font-bold text-center" />}
                  </td>
                  <td className="border-r border-border bg-orange-500/5">
                    {isPreview ? <div className="px-2.5 py-2.5 text-center font-mono">{job.hActual}</div> : <input type="text" value={job.hActual || ""} onChange={(e) => updateJob(i, "hActual", e.target.value)} className="w-full bg-transparent px-2.5 py-2.5 focus:outline-none focus:bg-background font-mono text-center text-foreground" />}
                  </td>
                  <td className="bg-red-500/5">
                    {isPreview ? <div className="px-2.5 py-2.5 text-center font-bold text-red-500 font-mono">{job.hCut}</div> : <input type="text" value={job.hCut || ""} onChange={(e) => updateJob(i, "hCut", e.target.value)} className="w-full bg-transparent px-2.5 py-2.5 focus:outline-none focus:bg-background font-mono text-red-500 font-bold text-center" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-12 pb-8">
          <div className="md:col-span-1 space-y-6">
            <h4 className="font-bold text-xs border-b border-border pb-2 text-foreground uppercase tracking-widest">Hardware Summary</h4>
            <div className="space-y-4">
              {[
                { label: "Number of Single BKTs", field: "singleBKTs" },
                { label: "Number of Double BKTs", field: "doubleBKTs" },
                { label: "Number of Remotes", field: "remotes" },
                { label: "Number of Chargers", field: "chargers" }
              ].map(({ label, field }) => (
                <div key={field} className="flex items-center justify-between">
                  <span className="font-medium text-muted-foreground">{label}</span>
                  {isPreview ? (
                    <span className="text-right font-semibold">{(data.hardwareSummary as any)[field] || 0}</span>
                  ) : (
                    <input 
                      type="number" 
                      value={(data.hardwareSummary as any)[field]} 
                      onChange={(e) => updateHardware(field as any, parseInt(e.target.value) || 0)}
                      className="w-20 border border-border rounded-lg px-2 py-1.5 text-right focus:outline-none focus:ring-2 focus:ring-accent bg-background text-foreground" 
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 space-y-4">
            <h4 className="font-bold text-xs border-b border-border pb-2 text-foreground uppercase tracking-widest mb-2">Production Notes</h4>
            {isPreview ? (
              <div className="w-full min-h-[10rem] border border-border rounded-2xl p-5 bg-muted/10 text-sm text-foreground whitespace-pre-wrap leading-relaxed">
                {data.productionNotes || "No specific production notes provided."}
              </div>
            ) : (
              <textarea 
                value={data.productionNotes}
                onChange={(e) => setData(prev => ({ ...prev, productionNotes: e.target.value }))}
                className="w-full h-40 border border-border rounded-2xl p-4 focus:outline-none focus:ring-2 focus:ring-accent bg-muted/10 resize-none text-sm text-foreground placeholder:text-muted-foreground/30 transition-all font-medium"
                placeholder="Add any specific instructions, discrepancies, or issues during production here..."
              ></textarea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
