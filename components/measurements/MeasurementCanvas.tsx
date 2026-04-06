"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

interface Point {
  x: number;
  y: number;
}

interface MeasurementCanvasProps {
  image: string | null;
  mode: "calibrate" | "measure" | "rectangle";
  onMeasurementChange: (points: Point[], distancePx: number) => void;
  referenceDistance?: number; // in mm
}

export default function MeasurementCanvas({ 
  image, 
  mode, 
  onMeasurementChange,
  referenceDistance 
}: MeasurementCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  // Load image
  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => {
        setImgElement(img);
        setPoints([]); // Clear points on new image
      };
    } else {
      setImgElement(null);
      setPoints([]);
    }
  }, [image]);

  // Handle canvas sizing and responsiveness
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !imgElement) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = containerRef.current;
    if (!container) return;

    // Set canvas internal size to match container display size
    const w = container.clientWidth;
    const h = container.clientHeight;
    
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    ctx.clearRect(0, 0, w, h);

    // Calculate aspect fit scale
    const imgRatio = imgElement.width / imgElement.height;
    const canvasRatio = w / h;
    
    let renderW, renderH, offsetX, offsetY;
    let currentScale;

    if (imgRatio > canvasRatio) {
      renderW = w;
      renderH = w / imgRatio;
      offsetX = 0;
      offsetY = (h - renderH) / 2;
      currentScale = w / imgElement.width;
    } else {
      renderH = h;
      renderW = h * imgRatio;
      offsetX = (w - renderW) / 2;
      offsetY = 0;
      currentScale = h / imgElement.height;
    }

    setScale(currentScale);
    setOffset({ x: offsetX, y: offsetY });

    // Draw image
    ctx.drawImage(imgElement, offsetX, offsetY, renderW, renderH);

    // Draw lines between points
    if (points.length > 0) {
      ctx.strokeStyle = mode === "calibrate" ? "#f59e0b" : "#6366f1";
      ctx.lineWidth = 3;
      ctx.setLineDash(mode === "rectangle" ? [5, 5] : []);
      
      ctx.beginPath();
      points.forEach((p, i) => {
        const cx = p.x * currentScale + offsetX;
        const cy = p.y * currentScale + offsetY;
        if (i === 0) ctx.moveTo(cx, cy);
        else ctx.lineTo(cx, cy);
      });
      
      if (mode === "rectangle" && points.length === 4) {
        ctx.closePath();
      }
      ctx.stroke();

      // Draw points
      points.forEach((p) => {
        const cx = p.x * currentScale + offsetX;
        const cy = p.y * currentScale + offsetY;
        
        ctx.fillStyle = "white";
        ctx.shadowBlur = 4;
        ctx.shadowColor = "rgba(0,0,0,0.5)";
        ctx.beginPath();
        ctx.arc(cx, cy, 6, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.strokeStyle = mode === "calibrate" ? "#f59e0b" : "#6366f1";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    }
  }, [imgElement, points, mode]);

  useEffect(() => {
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [draw]);

  const handleCanvasClick = (e: React.MouseEvent | React.TouchEvent) => {
    if (!canvasRef.current || !imgElement) return;

    const rect = canvasRef.current.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = (clientX - rect.left - offset.x) / scale;
    const y = (clientY - rect.top - offset.y) / scale;

    // Constraints by mode
    let newPoints = [...points];
    if (mode === "calibrate" && points.length >= 2) {
      newPoints = [{ x, y }];
    } else if (mode === "measure" && points.length >= 2) {
      newPoints = [{ x, y }];
    } else if (mode === "rectangle" && points.length >= 4) {
      newPoints = [{ x, y }];
    } else {
      newPoints.push({ x, y });
    }

    setPoints(newPoints);
    
    // Calculate distance if we have enough points
    if (newPoints.length >= 2) {
      const p1 = newPoints[0];
      const p2 = newPoints[1];
      const dist = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
      onMeasurementChange(newPoints, dist);
    }
  };

  const clearPoints = () => setPoints([]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px] bg-slate-900 rounded-3xl overflow-hidden shadow-2xl group cursor-crosshair">
      <canvas 
        ref={canvasRef}
        className="w-full h-full touch-none"
        onMouseDown={handleCanvasClick}
      />
      
      {!imgElement && (
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 font-medium">
          <p>Please upload an image to start measuring</p>
        </div>
      )}

      {points.length > 0 && (
        <button 
          onClick={(e) => { e.stopPropagation(); clearPoints(); }}
          className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold text-white transition-all"
        >
          Clear Points
        </button>
      )}

      {/* Mode Overlay */}
      <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl border border-white/10 shadow-xl pointer-events-none">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-1">Current Mode</p>
        <p className="text-sm font-bold text-white capitalize">{mode}</p>
      </div>
    </div>
  );
}
