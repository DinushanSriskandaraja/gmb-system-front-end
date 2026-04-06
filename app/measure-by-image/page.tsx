"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, Ruler, RotateCcw, Check, ChevronRight, Info, Maximize, MousePointer2 } from "lucide-react";
import MeasurementCanvas from "@/components/measurements/MeasurementCanvas";

export default function MeasureByImagePage() {
  const [image, setImage] = useState<string | null>(null);

  const [mode, setMode] = useState<"calibrate" | "measure" | "rectangle">("calibrate");
  const [calibrationDistPx, setCalibrationDistPx] = useState<number | null>(null);
  const [realDistMm, setRealDistMm] = useState<number>(1000);
  const [currentMeasurementPx, setCurrentMeasurementPx] = useState<number | null>(null);
  const [measurements, setMeasurements] = useState<{ id: number, label: string, value: number }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
        resetMeasurements();
      };
      reader.readAsDataURL(file);
    }
  };

  const resetMeasurements = () => {
    setCalibrationDistPx(null);
    setCurrentMeasurementPx(null);
    setMeasurements([]);
    setMode("calibrate");
  };

  const calculateMeasurement = (distPx: number) => {
    if (!calibrationDistPx) return 0;
    const mmPerPx = realDistMm / calibrationDistPx;
    return distPx * mmPerPx;
  };

  const handleCanvasChange = (points: any, distPx: number) => {
    setCurrentMeasurementPx(distPx);
  };

  const saveCalibration = () => {
    if (currentMeasurementPx) {
      setCalibrationDistPx(currentMeasurementPx);
      setMode("measure");
      setCurrentMeasurementPx(null);
    }
  };

  const saveMeasurement = () => {
    if (currentMeasurementPx && calibrationDistPx) {
      const value = calculateMeasurement(currentMeasurementPx);
      setMeasurements([
        ...measurements,
        { id: Date.now(), label: `Measurement ${measurements.length + 1}`, value }
      ]);
      setCurrentMeasurementPx(null);
    }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground flex items-center gap-3">
            Measure by Image <Ruler className="w-8 h-8 text-accent" />
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Take a photo or upload an image to measure windows and frames instantly.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2 px-5 py-2.5 bg-card hover:bg-muted border border-border/50 rounded-2xl font-bold transition-all hover-lift"
          >
            <Upload className="w-4 h-4" />
            Upload Photo
          </button>
          <button
            onClick={() => {/* Camera logic would go here, usually handled by file input on mobile */ }}
            className="flex items-center gap-2 px-5 py-2.5 bg-accent text-white rounded-2xl font-bold transition-all shadow-lg shadow-accent/20 hover-lift"
          >
            <Camera className="w-4 h-4" />
            Capture
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        {/* Left Column: Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-4 min-h-[500px]">
          <div className="flex-1 relative">
            <MeasurementCanvas
              image={image}
              mode={mode}
              onMeasurementChange={handleCanvasChange}
            />
          </div>

          <div className="glass-card flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMode("calibrate")}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "calibrate" ? "bg-amber-500 text-white" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >
                1. Calibrate
              </button>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <button
                onClick={() => setMode("measure")}
                disabled={!calibrationDistPx}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${mode === "measure" ? "bg-accent text-white" : "bg-muted text-muted-foreground hover:bg-muted/80 disabled:opacity-50"}`}
              >
                2. Measure
              </button>
            </div>

            <button
              onClick={resetMeasurements}
              className="p-2.5 rounded-xl hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-colors"
              title="Reset all"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Right Column: Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Calibration Panel */}
          <AnimatePresence mode="wait">
            {mode === "calibrate" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card space-y-6 border-amber-500/20"
              >
                <div className="flex items-center gap-2 text-amber-500">
                  <Info className="w-5 h-5" />
                  <h3 className="font-black uppercase tracking-widest text-sm">Step 1: Calibration</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Mark two points on the image that correspond to a known distance (e.g., the width of the window frame).
                </p>

                <div className="space-y-4">
                  <label className="block text-xs font-bold text-muted-foreground uppercase tracking-widest">
                    Real-world distance (mm)
                  </label>
                  <input
                    type="number"
                    value={realDistMm}
                    onChange={(e) => setRealDistMm(Number(e.target.value))}
                    className="w-full bg-muted border border-border/50 rounded-xl px-4 py-3 font-bold focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button
                    onClick={saveCalibration}
                    disabled={!currentMeasurementPx}
                    className="w-full bg-amber-500 text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/20"
                  >
                    <Check className="w-5 h-5" />
                    Set Calibration points
                  </button>
                </div>
              </motion.div>
            )}

            {mode === "measure" && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="glass-card space-y-6 border-accent/20"
              >
                <div className="flex items-center gap-2 text-accent">
                  <Maximize className="w-5 h-5" />
                  <h3 className="font-black uppercase tracking-widest text-sm">Step 2: Measuring</h3>
                </div>

                <div className="bg-muted p-4 rounded-2xl text-center">
                  <p className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-1">Current selection</p>
                  <h2 className="text-3xl font-black text-foreground">
                    {currentMeasurementPx ? Math.round(calculateMeasurement(currentMeasurementPx)) : 0} <span className="text-accent text-sm ml-1">mm</span>
                  </h2>
                </div>

                <div className="pt-4">
                  <button
                    onClick={saveMeasurement}
                    disabled={!currentMeasurementPx}
                    className="w-full bg-accent text-white rounded-xl py-3 font-bold flex items-center justify-center gap-2 disabled:opacity-50 transition-all shadow-lg shadow-accent/20"
                  >
                    <MousePointer2 className="w-5 h-5" />
                    Save Measurement
                  </button>
                </div>

                {measurements.length > 0 && (
                  <div className="space-y-4 pt-4 border-t border-border/50">
                    <h4 className="text-xs font-black text-muted-foreground uppercase tracking-widest">Saved Results</h4>
                    <div className="space-y-2">
                      {measurements.map((m) => (
                        <div key={m.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-xl border border-border/30">
                          <span className="text-sm font-medium text-muted-foreground">{m.label}</span>
                          <span className="text-sm font-bold text-foreground">{Math.round(m.value)} mm</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tips */}
          <div className="glass-card bg-indigo-500/5 border-indigo-500/10">
            <h4 className="text-xs font-black text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Info className="w-3.5 h-3.5" />
              Pro Tips
            </h4>
            <ul className="text-xs text-muted-foreground space-y-2 font-medium">
              <li>• Use a straight-on photo for best results.</li>
              <li>• Calibrate using a long edge for higher accuracy.</li>
              <li>• You can use a credit card as a 85.6mm reference if needed.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
