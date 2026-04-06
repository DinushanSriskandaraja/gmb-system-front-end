"use client";

import { useState, useCallback } from "react";
import {
  Plus, Save, Trash2, Copy, Eye, ChevronRight,
  User, MapPin, Phone, Mail, Building2, Car, PawPrint,
  Info, Palette, Layers, Package, DollarSign, Home,
  Wrench, Clock, Calendar, Camera, ArrowLeft,
  CheckCircle, AlertCircle, Ruler, FileText, ClipboardList,
  ChevronDown, WindowIcon, Maximize2, LayoutGrid,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type CoveringType =
  | "Roller Blinds" | "Curtain" | "Sheer" | "Roman Blind"
  | "Venetian" | "Plantation Shutter" | "No Covering" | "Other";

interface CoveringRow {
  id: string;
  coveringType: CoveringType;
  opacity: string;
  qty: number;
  spec: string;
  // Specification
  sp1: string; sp2: string; sp3: string;
  // Control
  c1: string; c2: string; c3: string; c4: string;
  // Mounting Point
  m1: string; m3: string; m4: string; surface: string;
  // Components
  com1: string; brackets: string;
  // In Frame
  inWidth: number; inDrop: number;
  // Out Frame
  outWidth: number; outDrop: number;
  addL: number; addR: number; endToEnd: number;
  // Position
  above: string; uc: string; ceil: string; floor: string;
  // Notes
  productNote: string; productionNote: string; installNote: string;
  quotationNote: string; quotationSent: boolean; quotationChanged: boolean;
}

interface WindowLocation {
  id: number;
  locationName: string;
  coverings: CoveringRow[];
}

// ─── Constants ────────────────────────────────────────────────────────────────

const coveringTypes: CoveringType[] = [
  "Roller Blinds", "Curtain", "Sheer", "Roman Blind",
  "Venetian", "Plantation Shutter", "No Covering", "Other",
];

const opacityOptions = ["Blackout", "Dim-Out", "Light-Filter", "See-Through", "Translucent", "N/A"];
const sp1Options = ["Front Roll", "Back Roll", "Wave", "Pinch Pleat", "Eyelet", "Slats89Mm", "N/A"];
const sp2Options = ["Rolling Up & Down", "Hinged", "Fixed", "N/A"];
const sp3Options = ["stainless Chain", "By Wand", "By Hand", "Motorised", "Cord", "N/A"];
const c4Options = ["bottom rail Ovel", "bottom rail Square", "direct mount window frame", "N/A"];
const m1Options = ["window", "wall to wall", "N/A"];
const m3Options = ["under cornise to floor", "floor to ceiling", "window", "N/A"];
const m4Options = ["Under Cornice", "Ceiling", "In Frame", "Out Frame", "N/A"];
const surfaceOptions = ["on plaster", "on timber / MDF", "on brick", "on concrete", "N/A"];
const bracketOptions = [
  "Single standard BKT", "Extra double BKT", "Single face fix BKT",
  "Ceiling top fix BKT", "GMB STD track", "N/A",
];
const com1ColorOptions = ["White", "Charcoal", "Black", "Cream", "Grey", "N/A"];
const houseTypeOptions = [
  "House", "Townhouse", "Apartment", "Unit", "Villa", "Commercial", "Other"
];
const jobTypeOptions = [
  "New Installation", "Replacement", "Repair", "Consultation", "Measure Only"
];
const jobHardnessOptions = ["Easy", "Standard", "Complex", "Very Complex"];
const measuredOrderOptions = ["Room by Room", "floor by floor", "Front to Back", "Other"];
const floorOptions = ["Ground", "1st Floor", "2nd Floor", "Multi Level", "N/A"];
const installersOptions = ["1", "2", "3", "4+"];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 7);

const newCovering = (): CoveringRow => ({
  id: uid(), coveringType: "Roller Blinds", opacity: "Blackout", qty: 1,
  spec: "", sp1: "Front Roll", sp2: "Rolling Up & Down", sp3: "stainless Chain",
  c1: "", c2: "", c3: "", c4: "bottom rail Ovel",
  m1: "window", m3: "window", m4: "In Frame", surface: "on timber / MDF",
  com1: "White", brackets: "Single standard BKT",
  inWidth: 0, inDrop: 0, outWidth: 0, outDrop: 0,
  addL: 0, addR: 0, endToEnd: 0,
  above: "", uc: "", ceil: "", floor: "",
  productNote: "", productionNote: "", installNote: "",
  quotationNote: "", quotationSent: false, quotationChanged: false,
});

const newLocation = (id: number): WindowLocation => ({
  id, locationName: "", coverings: [newCovering()],
});

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionCard({ icon: Icon, title, color = "accent", children }: {
  icon: React.ElementType; title: string; color?: string; children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
      <div className={`flex items-center gap-3 px-6 py-4 border-b border-border bg-muted/20`}>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
          color === "accent" ? "bg-accent/15 text-accent" :
          color === "green" ? "bg-green-500/15 text-green-500" :
          color === "blue" ? "bg-blue-500/15 text-blue-500" :
          color === "orange" ? "bg-orange-500/15 text-orange-500" :
          color === "purple" ? "bg-purple-500/15 text-purple-500" :
          "bg-muted text-muted-foreground"
        }`}>
          <Icon className="h-4 w-4" />
        </div>
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}

function InputField({ label, id, required, children }: {
  label: string; id: string; required?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label} {required && <span className="text-red-400 normal-case tracking-normal">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/60 transition-all";
const selectCls = inputCls + " cursor-pointer";
const dimInputCls = "w-full rounded-lg border border-border bg-muted/30 px-3 py-2 text-center font-mono text-sm text-foreground placeholder:text-muted-foreground/40 outline-none focus:ring-2 focus:ring-accent/60 focus:border-accent/60 transition-all";

function NoteTextarea({ value, onChange, placeholder }: {
  value: string; onChange: (v: string) => void; placeholder?: string;
}) {
  return (
    <textarea
      rows={2}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder ?? "Add notes…"}
      className={inputCls + " resize-none"}
    />
  );
}

function TogglePill({ label, checked, onChange }: {
  label: string; checked: boolean; onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${
        checked
          ? "bg-accent text-accent-foreground border-accent shadow-sm"
          : "bg-muted/30 text-muted-foreground border-border hover:border-accent/50"
      }`}
    >
      {checked ? <CheckCircle className="h-3.5 w-3.5" /> : <AlertCircle className="h-3.5 w-3.5 opacity-50" />}
      {label}
    </button>
  );
}

// ─── Covering Form ─────────────────────────────────────────────────────────────

function CoveringForm({
  cov, locId, update, onDelete, showDelete,
}: {
  cov: CoveringRow;
  locId: number;
  update: (field: keyof CoveringRow, val: any) => void;
  onDelete: () => void;
  showDelete: boolean;
}) {
  const [expanded, setExpanded] = useState(true);

  const typeColor =
    cov.coveringType === "Curtain" || cov.coveringType === "Sheer" ? "purple" :
    cov.coveringType === "Roller Blinds" ? "blue" :
    cov.coveringType === "Plantation Shutter" ? "green" :
    cov.coveringType === "No Covering" ? "muted" : "orange";

  return (
    <div className={`rounded-2xl border transition-all duration-300 ${
      cov.coveringType === "No Covering" ? "border-border/40 bg-muted/10" : "border-border bg-card"
    }`}>
      {/* Covering Header */}
      <div
        className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/10 transition-colors"
        onClick={() => setExpanded(e => !e)}
      >
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
          typeColor === "purple" ? "bg-purple-500/15 text-purple-500" :
          typeColor === "blue" ? "bg-blue-500/15 text-blue-500" :
          typeColor === "green" ? "bg-green-500/15 text-green-500" :
          typeColor === "orange" ? "bg-orange-500/15 text-orange-500" :
          "bg-muted/50 text-muted-foreground"
        }`}>
          <Layers className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-foreground">{cov.coveringType}</p>
          <p className="text-xs text-muted-foreground mt-0.5 truncate">
            {cov.opacity} · {cov.spec || "No description"} · {cov.m4}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {showDelete && (
            <button
              type="button"
              onClick={e => { e.stopPropagation(); onDelete(); }}
              className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
          <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${expanded ? "rotate-180" : ""}`} />
        </div>
      </div>

      {expanded && cov.coveringType !== "No Covering" && (
        <div className="px-5 pb-5 space-y-6 border-t border-border/50">

          {/* Row 1: Core info */}
          <div className="pt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <InputField label="Covering Type" id="">
                <select value={cov.coveringType} onChange={e => update("coveringType", e.target.value)} className={selectCls}>
                  {coveringTypes.filter(t => t !== "No Covering").map(t => <option key={t}>{t}</option>)}
                </select>
              </InputField>
            </div>
            <InputField label="Opacity / Style" id="">
              <select value={cov.opacity} onChange={e => update("opacity", e.target.value)} className={selectCls}>
                {opacityOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </InputField>
            <InputField label="Qty" id="">
              <input type="number" min={1} value={cov.qty} onChange={e => update("qty", parseInt(e.target.value) || 1)}
                className={inputCls + " text-center font-mono"} />
            </InputField>
            <InputField label="Fabric / Spec" id="">
              <input type="text" value={cov.spec} onChange={e => update("spec", e.target.value)}
                placeholder="e.g. Group 3 - Shaw Karma" className={inputCls} />
            </InputField>
          </div>

          {/* Row 2: Specification + Controls + Mount */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Specification sub-panel */}
            <div className="rounded-xl border border-border/60 p-4 bg-muted/10 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Specification</p>
              <InputField label="SP1 — Style" id="">
                <select value={cov.sp1} onChange={e => update("sp1", e.target.value)} className={selectCls}>
                  {sp1Options.map(o => <option key={o}>{o}</option>)}
                </select>
              </InputField>
              <InputField label="SP2 — Operation" id="">
                <select value={cov.sp2} onChange={e => update("sp2", e.target.value)} className={selectCls}>
                  {sp2Options.map(o => <option key={o}>{o}</option>)}
                </select>
              </InputField>
              <InputField label="SP3 — Control Drive" id="">
                <select value={cov.sp3} onChange={e => update("sp3", e.target.value)} className={selectCls}>
                  {sp3Options.map(o => <option key={o}>{o}</option>)}
                </select>
              </InputField>
            </div>

            {/* Control + Surface */}
            <div className="rounded-xl border border-border/60 p-4 bg-muted/10 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Control Details</p>
              <div className="grid grid-cols-3 gap-2">
                {(["c1","c2","c3"] as const).map(f => (
                  <InputField key={f} label={f.toUpperCase()} id="">
                    <input type="text" value={cov[f]} onChange={e => update(f, e.target.value)}
                      className={inputCls + " text-center"} placeholder="—" />
                  </InputField>
                ))}
              </div>
              <InputField label="C4 — Bottom Rail" id="">
                <select value={cov.c4} onChange={e => update("c4", e.target.value)} className={selectCls}>
                  {c4Options.map(o => <option key={o}>{o}</option>)}
                </select>
              </InputField>
              <InputField label="Surface" id="">
                <select value={cov.surface} onChange={e => update("surface", e.target.value)} className={selectCls}>
                  {surfaceOptions.map(o => <option key={o}>{o}</option>)}
                </select>
              </InputField>
            </div>

            {/* Mounting Point */}
            <div className="rounded-xl border border-border/60 p-4 bg-muted/10 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Mounting Point</p>
              <InputField label="M1 — Width Range" id="">
                <select value={cov.m1} onChange={e => update("m1", e.target.value)} className={selectCls}>
                  {m1Options.map(o => <option key={o}>{o}</option>)}
                </select>
              </InputField>
              <InputField label="M3 — Drop Range" id="">
                <select value={cov.m3} onChange={e => update("m3", e.target.value)} className={selectCls}>
                  {m3Options.map(o => <option key={o}>{o}</option>)}
                </select>
              </InputField>
              <InputField label="M4 — Fixing Point" id="">
                <select value={cov.m4} onChange={e => update("m4", e.target.value)} className={selectCls}>
                  {m4Options.map(o => <option key={o}>{o}</option>)}
                </select>
              </InputField>
            </div>
          </div>

          {/* Row 3: Components + Dimensions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Components */}
            <div className="rounded-xl border border-border/60 p-4 bg-muted/10 space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2">Components</p>
              <div className="grid grid-cols-2 gap-3">
                <InputField label="Com 1 — Colour" id="">
                  <select value={cov.com1} onChange={e => update("com1", e.target.value)} className={selectCls}>
                    {com1ColorOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </InputField>
                <InputField label="Brackets" id="">
                  <select value={cov.brackets} onChange={e => update("brackets", e.target.value)} className={selectCls}>
                    {bracketOptions.map(o => <option key={o}>{o}</option>)}
                  </select>
                </InputField>
              </div>
            </div>

            {/* Dimensions */}
            <div className="rounded-xl border border-border/60 p-4 bg-muted/10">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2 mb-3">Dimensions (mm)</p>
              <div className="grid grid-cols-2 gap-3">
                {/* In Frame */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-center text-blue-500 uppercase">In Frame</p>
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-1">Width</label>
                    <input type="number" value={cov.inWidth || ""} onChange={e => update("inWidth", parseFloat(e.target.value) || 0)}
                      className={dimInputCls} placeholder="0" />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-1">Drop</label>
                    <input type="number" value={cov.inDrop || ""} onChange={e => update("inDrop", parseFloat(e.target.value) || 0)}
                      className={dimInputCls} placeholder="0" />
                  </div>
                </div>
                {/* Out Frame */}
                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-center text-orange-500 uppercase">Out Frame</p>
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-1">Width</label>
                    <input type="number" value={cov.outWidth || ""} onChange={e => update("outWidth", parseFloat(e.target.value) || 0)}
                      className={dimInputCls} placeholder="0" />
                  </div>
                  <div>
                    <label className="text-[10px] text-muted-foreground block mb-1">Drop</label>
                    <input type="number" value={cov.outDrop || ""} onChange={e => update("outDrop", parseFloat(e.target.value) || 0)}
                      className={dimInputCls} placeholder="0" />
                  </div>
                </div>
              </div>

              {/* Add L/R + End to End */}
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div>
                  <label className="text-[10px] text-muted-foreground block mb-1">Add L</label>
                  <input type="number" value={cov.addL || ""} onChange={e => update("addL", parseFloat(e.target.value) || 0)}
                    className={dimInputCls} placeholder="0" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground block mb-1">Add R</label>
                  <input type="number" value={cov.addR || ""} onChange={e => update("addR", parseFloat(e.target.value) || 0)}
                    className={dimInputCls} placeholder="0" />
                </div>
                <div>
                  <label className="text-[10px] text-muted-foreground block mb-1">End–End</label>
                  <input type="number" value={cov.endToEnd || ""} onChange={e => update("endToEnd", parseFloat(e.target.value) || 0)}
                    className={dimInputCls} placeholder="0" />
                </div>
              </div>
            </div>
          </div>

          {/* Row 4: Position references */}
          <div className="rounded-xl border border-border/60 p-4 bg-muted/10">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-b border-border/40 pb-2 mb-3">Position References</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(["above","uc","ceil","floor"] as const).map(f => (
                <InputField key={f} label={f === "above" ? "Above" : f === "uc" ? "UC" : f === "ceil" ? "Ceiling Ref" : "Floor Ref"} id="">
                  <input type="text" value={cov[f]} onChange={e => update(f, e.target.value)}
                    className={inputCls} placeholder="—" />
                </InputField>
              ))}
            </div>
          </div>

          {/* Row 5: Notes + Flags */}
          <div className="rounded-xl border border-border/60 p-4 bg-muted/10 space-y-3">
            <div className="flex items-center justify-between border-b border-border/40 pb-2">
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Notes & Status</p>
              <div className="flex gap-2">
                <TogglePill label="Quotation Sent" checked={cov.quotationSent} onChange={v => update("quotationSent", v)} />
                <TogglePill label="Quotation Changed" checked={cov.quotationChanged} onChange={v => update("quotationChanged", v)} />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              <InputField label="Quotation Note" id="">
                <NoteTextarea value={cov.quotationNote} onChange={v => update("quotationNote", v)} placeholder="Note for quote…" />
              </InputField>
              <InputField label="Product Note" id="">
                <NoteTextarea value={cov.productNote} onChange={v => update("productNote", v)} placeholder="Product note…" />
              </InputField>
              <InputField label="Production Note" id="">
                <NoteTextarea value={cov.productionNote} onChange={v => update("productionNote", v)} placeholder="Production note…" />
              </InputField>
              <InputField label="Installation Note" id="">
                <NoteTextarea value={cov.installNote} onChange={v => update("installNote", v)} placeholder="Install note…" />
              </InputField>
            </div>
          </div>
        </div>
      )}

      {/* No Covering - minimal display */}
      {expanded && cov.coveringType === "No Covering" && (
        <div className="px-5 pb-4 border-t border-border/30 pt-4">
          <div className="flex items-center gap-3">
            <select value={cov.coveringType} onChange={e => update("coveringType", e.target.value as CoveringType)} className={selectCls + " max-w-xs"}>
              {coveringTypes.map(t => <option key={t}>{t}</option>)}
            </select>
            <p className="text-sm text-muted-foreground italic">No covering required for this window/door</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function NewMeasurementPage() {

  // ── Step state ─────────────────────────────────────────────────────────────
  const [step, setStep] = useState<1 | 2>(1);

  // ── Step 1: Customer / Site Info ───────────────────────────────────────────
  const [clientName, setClientName] = useState("");
  const [clientAddress, setClientAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [customer, setCustomer] = useState("");
  const [jobId, setJobId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [parkingFlexibility, setParkingFlexibility] = useState("");
  const [findUs, setFindUs] = useState("");
  const [pets, setPets] = useState("");
  const [explainProduct, setExplainProduct] = useState("");
  const [clientUnderstandsLevel, setClientUnderstandsLevel] = useState("");
  const [customerOrigin, setCustomerOrigin] = useState("");
  const [colourTheme, setColourTheme] = useState("");
  const [fabricSelection, setFabricSelection] = useState("");
  const [componentsSelection, setComponentsSelection] = useState("");
  const [changesToGetDeposit, setChangesToGetDeposit] = useState("");
  const [houseType, setHouseType] = useState("House");
  const [existingCovering, setExistingCovering] = useState("");
  const [clearances, setClearances] = useState("");
  const [damageHoles, setDamageHoles] = useState("");
  const [installationTimeframe, setInstallationTimeframe] = useState("");
  const [jobType, setJobType] = useState("New Installation");
  const [jobHardness, setJobHardness] = useState("Standard");
  const [numberOfInstallers, setNumberOfInstallers] = useState("2");
  const [measurementsNote, setMeasurementsNote] = useState("");
  const [measuredOrder, setMeasuredOrder] = useState("Room by Room");
  const [windowsStats, setWindowsStats] = useState("");
  const [floorStates, setFloorStates] = useState("Ground");
  const [checkMeasurements, setCheckMeasurements] = useState("");
  const [installationNote, setInstallationNote] = useState("");
  const [productNote, setProductNote] = useState("");
  const [photos, setPhotos] = useState("");
  const [dateTime, setDateTime] = useState("");

  // ── Step 2: Window Measurements ────────────────────────────────────────────
  const [locations, setLocations] = useState<WindowLocation[]>([newLocation(1)]);
  const [nextLocId, setNextLocId] = useState(2);
  const [activeLocId, setActiveLocId] = useState(1);

  // Location helpers
  const addLocation = useCallback(() => {
    const loc = newLocation(nextLocId);
    setLocations(p => [...p, loc]);
    setActiveLocId(nextLocId);
    setNextLocId(p => p + 1);
  }, [nextLocId]);

  const duplicateLocation = useCallback((locId: number) => {
    const src = locations.find(l => l.id === locId);
    if (!src) return;
    const cloned: WindowLocation = {
      id: nextLocId,
      locationName: src.locationName ? `${src.locationName} (Copy)` : `Location ${nextLocId}`,
      coverings: src.coverings.map(c => ({ ...c, id: uid() })),
    };
    setLocations(p => [...p, cloned]);
    setActiveLocId(nextLocId);
    setNextLocId(p => p + 1);
  }, [locations, nextLocId]);

  const deleteLocation = useCallback((locId: number) => {
    setLocations(p => {
      const remaining = p.filter(l => l.id !== locId);
      if (remaining.length === 0) return p; // prevent deleting all
      return remaining;
    });
    setActiveLocId(p => {
      if (p !== locId) return p;
      const remaining = locations.filter(l => l.id !== locId);
      return remaining[0]?.id ?? 1;
    });
  }, [locations]);

  const updateLocName = useCallback((locId: number, name: string) => {
    setLocations(p => p.map(l => l.id === locId ? { ...l, locationName: name } : l));
  }, []);

  // Covering helpers
  const addCovering = useCallback((locId: number) => {
    const cov = newCovering();
    setLocations(p => p.map(l => l.id === locId ? { ...l, coverings: [...l.coverings, cov] } : l));
  }, []);

  const addNoCovering = useCallback((locId: number) => {
    const cov: CoveringRow = { ...newCovering(), id: uid(), coveringType: "No Covering" };
    setLocations(p => p.map(l => l.id === locId ? { ...l, coverings: [...l.coverings, cov] } : l));
  }, []);

  const deleteCovering = useCallback((locId: number, covId: string) => {
    setLocations(p => p.map(l => {
      if (l.id !== locId) return l;
      const remaining = l.coverings.filter(c => c.id !== covId);
      return { ...l, coverings: remaining.length ? remaining : l.coverings };
    }));
  }, []);

  const updateCovering = useCallback((locId: number, covId: string, field: keyof CoveringRow, val: any) => {
    setLocations(p => p.map(l => {
      if (l.id !== locId) return l;
      return { ...l, coverings: l.coverings.map(c => c.id === covId ? { ...c, [field]: val } : c) };
    }));
  }, []);

  const handleSave = () => {
    const payload = {
      clientInfo: {
        clientName, clientAddress, email, contactNumber, customer, jobId, date,
        parkingFlexibility, findUs, pets, explainProduct, clientUnderstandsLevel,
        customerOrigin, colourTheme, fabricSelection, componentsSelection,
        changesToGetDeposit, houseType, existingCovering, clearances, damageHoles,
        installationTimeframe, jobType, jobHardness, numberOfInstallers,
        measurementsNote, measuredOrder, windowsStats, floorStates,
        checkMeasurements, installationNote, productNote, photos, dateTime,
      },
      locations,
    };
    console.log("Saved measurement sheet:", payload);
    alert("✅ Measurement sheet saved successfully!");
  };

  const activeLoc = locations.find(l => l.id === activeLocId);

  // ─── Step 1 Render ─────────────────────────────────────────────────────────
  const renderStep1 = () => (
    <div className="space-y-6">

      {/* CLIENT INFO */}
      <SectionCard icon={User} title="Client Information" color="accent">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputField label="Client Name & Address" id="clientName" required>
            <input id="clientName" value={clientName} onChange={e => setClientName(e.target.value)}
              className={inputCls} placeholder="Full name" />
          </InputField>
          <InputField label="Street Address" id="clientAddress">
            <input id="clientAddress" value={clientAddress} onChange={e => setClientAddress(e.target.value)}
              className={inputCls} placeholder="123 Main St, Suburb VIC 3000" />
          </InputField>
          <InputField label="Customer / Account" id="customer">
            <input id="customer" value={customer} onChange={e => setCustomer(e.target.value)}
              className={inputCls} placeholder="Account name or reference" />
          </InputField>
          <InputField label="Email Address" id="email">
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)}
              className={inputCls} placeholder="client@email.com" />
          </InputField>
          <InputField label="Contact Number" id="contactNumber" required>
            <input id="contactNumber" type="tel" value={contactNumber} onChange={e => setContactNumber(e.target.value)}
              className={inputCls} placeholder="+61 4xx xxx xxx" />
          </InputField>
          <InputField label="Job ID" id="jobId" required>
            <input id="jobId" value={jobId} onChange={e => setJobId(e.target.value)}
              className={inputCls + " font-mono"} placeholder="J-001" />
          </InputField>
          <InputField label="Date" id="date" required>
            <input id="date" type="date" value={date} onChange={e => setDate(e.target.value)}
              className={inputCls} />
          </InputField>
          <InputField label="Appointment Date & Time" id="dateTime">
            <input id="dateTime" type="datetime-local" value={dateTime} onChange={e => setDateTime(e.target.value)}
              className={inputCls} />
          </InputField>
        </div>
      </SectionCard>

      {/* SITE & PROPERTY */}
      <SectionCard icon={Home} title="Property & Site Details" color="blue">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputField label="House Type" id="houseType">
            <select id="houseType" value={houseType} onChange={e => setHouseType(e.target.value)} className={selectCls}>
              {houseTypeOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </InputField>
          <InputField label="Parking Flexibility" id="parking">
            <input id="parking" value={parkingFlexibility} onChange={e => setParkingFlexibility(e.target.value)}
              className={inputCls} placeholder="Street, driveway, tight access…" />
          </InputField>
          <InputField label="Pets" id="pets">
            <input id="pets" value={pets} onChange={e => setPets(e.target.value)}
              className={inputCls} placeholder="Dogs, cats, none…" />
          </InputField>
          <InputField label="Floor States" id="floor">
            <select id="floor" value={floorStates} onChange={e => setFloorStates(e.target.value)} className={selectCls}>
              {floorOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </InputField>
          <InputField label="Clearances Around Windows" id="clearances">
            <input id="clearances" value={clearances} onChange={e => setClearances(e.target.value)}
              className={inputCls} placeholder="Note any obstructions" />
          </InputField>
          <InputField label="Damage or Holes" id="damage">
            <input id="damage" value={damageHoles} onChange={e => setDamageHoles(e.target.value)}
              className={inputCls} placeholder="Describe any damage" />
          </InputField>
          <div className="md:col-span-2 lg:col-span-3">
            <InputField label="Existing Covering" id="existing">
              <input id="existing" value={existingCovering} onChange={e => setExistingCovering(e.target.value)}
                className={inputCls} placeholder="Describe what is currently installed" />
            </InputField>
          </div>
        </div>
      </SectionCard>

      {/* CUSTOMER  CONSULTATION */}
      <SectionCard icon={ClipboardList} title="Customer Consultation" color="purple">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputField label="How Did They Find Us" id="findUs">
            <input id="findUs" value={findUs} onChange={e => setFindUs(e.target.value)}
              className={inputCls} placeholder="Google, referral, social media…" />
          </InputField>
          <InputField label="Customer Origin" id="customerOrigin">
            <input id="customerOrigin" value={customerOrigin} onChange={e => setCustomerOrigin(e.target.value)}
              className={inputCls} placeholder="Nationality / background (optional)" />
          </InputField>
          <InputField label="Colour Theme" id="colourTheme">
            <input id="colourTheme" value={colourTheme} onChange={e => setColourTheme(e.target.value)}
              className={inputCls} placeholder="e.g. White, Grey/White, Warm tones" />
          </InputField>
          <InputField label="Explain About Product" id="explain">
            <input id="explain" value={explainProduct} onChange={e => setExplainProduct(e.target.value)}
              className={inputCls} placeholder="Details explained to client" />
          </InputField>
          <InputField label="Client Understands Level" id="understand">
            <input id="understand" value={clientUnderstandsLevel} onChange={e => setClientUnderstandsLevel(e.target.value)}
              className={inputCls} placeholder="e.g. Fully understands, Needs follow-up" />
          </InputField>
          <InputField label="Fabric Selection Notes" id="fabric">
            <input id="fabric" value={fabricSelection} onChange={e => setFabricSelection(e.target.value)}
              className={inputCls} placeholder="Selected fabric groups / favourites" />
          </InputField>
          <InputField label="Components Selection" id="components">
            <input id="components" value={componentsSelection} onChange={e => setComponentsSelection(e.target.value)}
              className={inputCls} placeholder="Track types, motor preferences…" />
          </InputField>
          <div className="md:col-span-2">
            <InputField label="Changes Needed to Get Deposit" id="changes">
              <input id="changes" value={changesToGetDeposit} onChange={e => setChangesToGetDeposit(e.target.value)}
                className={inputCls} placeholder="What needs to happen before deposit is secured…" />
            </InputField>
          </div>
        </div>
      </SectionCard>

      {/* JOB DETAILS */}
      <SectionCard icon={Wrench} title="Job Details" color="orange">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          <InputField label="Job Type" id="jobType">
            <select id="jobType" value={jobType} onChange={e => setJobType(e.target.value)} className={selectCls}>
              {jobTypeOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </InputField>
          <InputField label="Job Complexity" id="jobHardness">
            <select id="jobHardness" value={jobHardness} onChange={e => setJobHardness(e.target.value)} className={selectCls}>
              {jobHardnessOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </InputField>
          <InputField label="No. of Installers" id="installers">
            <select id="installers" value={numberOfInstallers} onChange={e => setNumberOfInstallers(e.target.value)} className={selectCls}>
              {installersOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </InputField>
          <InputField label="Installation Timeframe" id="timeframe">
            <input id="timeframe" value={installationTimeframe} onChange={e => setInstallationTimeframe(e.target.value)}
              className={inputCls} placeholder="e.g. 2 weeks, ASAP" />
          </InputField>
          <InputField label="Measured Order" id="measuredOrder">
            <select id="measuredOrder" value={measuredOrder} onChange={e => setMeasuredOrder(e.target.value)} className={selectCls}>
              {measuredOrderOptions.map(o => <option key={o}>{o}</option>)}
            </select>
          </InputField>
          <InputField label="No. of Check Measurements" id="checkMeasurements">
            <input id="checkMeasurements" value={checkMeasurements} onChange={e => setCheckMeasurements(e.target.value)}
              className={inputCls} placeholder="e.g. 3" />
          </InputField>
          <InputField label="Windows Stats" id="windowStats">
            <input id="windowStats" value={windowsStats} onChange={e => setWindowsStats(e.target.value)}
              className={inputCls} placeholder="Total count, types" />
          </InputField>
        </div>
      </SectionCard>

      {/* NOTES */}
      <SectionCard icon={FileText} title="General Notes" color="green">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputField label="Measurements Note" id="measNote">
            <NoteTextarea value={measurementsNote} onChange={setMeasurementsNote} placeholder="General measurements notes…" />
          </InputField>
          <InputField label="Installation Note" id="instNote">
            <NoteTextarea value={installationNote} onChange={setInstallationNote} placeholder="Installation instructions…" />
          </InputField>
          <InputField label="Product Note" id="prodNote">
            <NoteTextarea value={productNote} onChange={setProductNote} placeholder="Product observations…" />
          </InputField>
          <InputField label="Photos" id="photos">
            <NoteTextarea value={photos} onChange={setPhotos} placeholder="Photo references / locations…" />
          </InputField>
        </div>
      </SectionCard>

      {/* STEP NAVIGATION */}
      <div className="flex justify-end pt-2">
        <Button onClick={() => setStep(2)} size="lg" className="px-8 gap-2">
          Continue to Window Measurements
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );

  // ─── Step 2 Render ─────────────────────────────────────────────────────────
  const renderStep2 = () => (
    <div className="space-y-6">
      {/* Summary Bar */}
      <div className="rounded-2xl border border-border bg-card/60 p-4 flex flex-wrap gap-4 items-center">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-accent" />
          <span className="font-semibold text-foreground">{clientName || "Unnamed Client"}</span>
        </div>
        {jobId && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <FileText className="h-3.5 w-3.5" /> <span className="font-mono">{jobId}</span>
          </div>
        )}
        {clientAddress && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> <span>{clientAddress}</span>
          </div>
        )}
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground ml-auto">
          <span className="text-xs font-medium">{locations.reduce((a, l) => a + l.coverings.length, 0)} coverings across {locations.length} location(s)</span>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Left: location list */}
        <div className="hidden lg:flex flex-col w-64 shrink-0 gap-2">
          <div className="flex items-center justify-between px-1 mb-1">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Locations</p>
            <button type="button" onClick={addLocation}
              className="p-1 rounded-lg hover:bg-accent/10 text-accent transition-colors">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          {locations.map((loc, idx) => (
            <button
              key={loc.id}
              type="button"
              onClick={() => setActiveLocId(loc.id)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                activeLocId === loc.id
                  ? "bg-accent text-accent-foreground shadow-md shadow-accent/20"
                  : "hover:bg-muted/40 text-foreground"
              }`}
            >
              <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                activeLocId === loc.id ? "bg-white/20 text-white" : "bg-muted/60 text-muted-foreground"
              }`}>
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${activeLocId === loc.id ? "text-white" : ""}`}>
                  {loc.locationName || `Location ${idx + 1}`}
                </p>
                <p className={`text-[10px] ${activeLocId === loc.id ? "text-white/60" : "text-muted-foreground"}`}>
                  {loc.coverings.length} covering{loc.coverings.length !== 1 ? "s" : ""}
                </p>
              </div>
              <ChevronRight className={`h-4 w-4 flex-shrink-0 ${activeLocId === loc.id ? "text-white/60" : "text-muted-foreground/30 group-hover:text-muted-foreground"}`} />
            </button>
          ))}
          <button type="button" onClick={addLocation}
            className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground border border-dashed border-border hover:border-accent/50 hover:text-accent transition-all mt-1">
            <Plus className="h-4 w-4" /> Add Location
          </button>
        </div>

        {/* Right: active location detail */}
        {activeLoc && (
          <div className="flex-1 min-w-0 space-y-4">
            {/* Location header */}
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="flex items-center gap-4 px-6 py-4 bg-muted/20 border-b border-border">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-accent-foreground font-bold text-lg">
                  {locations.findIndex(l => l.id === activeLoc.id) + 1}
                </div>
                <input
                  value={activeLoc.locationName}
                  onChange={e => updateLocName(activeLoc.id, e.target.value)}
                  placeholder="Enter room / location name…"
                  className="flex-1 text-xl font-semibold bg-transparent outline-none text-foreground placeholder:text-muted-foreground/40"
                />
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => duplicateLocation(activeLoc.id)} title="Duplicate location">
                    <Copy className="h-4 w-4" />
                  </Button>
                  {locations.length > 1 && (
                    <Button variant="ghost" size="sm" onClick={() => deleteLocation(activeLoc.id)}
                      className="text-muted-foreground hover:text-red-500" title="Delete location">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Mobile: location selector */}
              <div className="lg:hidden flex gap-2 px-6 py-3 overflow-x-auto border-b border-border bg-muted/10">
                {locations.map((loc, idx) => (
                  <button key={loc.id} type="button" onClick={() => setActiveLocId(loc.id)}
                    className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      activeLocId === loc.id ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/70"
                    }`}>
                    {loc.locationName || `Loc ${idx + 1}`}
                  </button>
                ))}
                <button type="button" onClick={addLocation}
                  className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-muted-foreground border border-dashed border-border hover:border-accent hover:text-accent transition-all">
                  <Plus className="h-3 w-3" /> Add
                </button>
              </div>
            </div>

            {/* Coverings */}
            <div className="space-y-3">
              {activeLoc.coverings.map(cov => (
                <CoveringForm
                  key={cov.id}
                  cov={cov}
                  locId={activeLoc.id}
                  update={(field, val) => updateCovering(activeLoc.id, cov.id, field, val)}
                  onDelete={() => deleteCovering(activeLoc.id, cov.id)}
                  showDelete={activeLoc.coverings.length > 1}
                />
              ))}
            </div>

            {/* Add covering buttons */}
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => addCovering(activeLoc.id)} className="flex-1 gap-2">
                <Plus className="h-4 w-4" /> Add Covering
              </Button>
              <Button variant="ghost" onClick={() => addNoCovering(activeLoc.id)} className="flex-1 gap-2 text-muted-foreground">
                <Plus className="h-4 w-4" /> No Covering
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Save footer */}
      <div className="flex items-center justify-between pt-4 border-t border-border mt-8">
        <Button variant="ghost" onClick={() => setStep(1)} className="gap-2 text-muted-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to Client Info
        </Button>
        <Button onClick={handleSave} size="lg" className="px-10 gap-2 bg-gradient-to-r from-accent to-indigo-600 hover:from-accent/90 hover:to-indigo-700 shadow-md shadow-accent/20 text-white">
          <Save className="h-5 w-5" />
          Save Measurement Sheet
        </Button>
      </div>
    </div>
  );

  // ─── Page Shell ────────────────────────────────────────────────────────────
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-start justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link href="/measurements">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground rounded-xl">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-foreground">New Measurement Sheet</h1>
            <p className="text-sm text-muted-foreground mt-0.5">GMB Curtain & Blind — Customer Site Record</p>
          </div>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-3 mb-8">
        {[
          { n: 1, label: "Client & Site Info", icon: User },
          { n: 2, label: "Window Measurements", icon: Ruler },
        ].map(({ n, label, icon: Icon }, i) => (
          <div key={n} className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setStep(n as 1 | 2)}
              className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                step === n
                  ? "bg-accent text-accent-foreground shadow-md shadow-accent/20"
                  : step > n
                  ? "bg-green-500/10 text-green-600 dark:text-green-400"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                step === n ? "bg-white/20" : step > n ? "bg-green-500/20" : "bg-muted-foreground/20"
              }`}>
                {step > n ? <CheckCircle className="h-3 w-3" /> : n}
              </div>
              <Icon className="h-4 w-4" />
              {label}
            </button>
            {i < 1 && <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 1 ? renderStep1() : renderStep2()}
    </div>
  );
}