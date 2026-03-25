"use client";

import React, { useState } from "react";
import { Printer } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function ProductionTracker() {
  const [rows] = useState(Array.from({ length: 15 })); // Default to 15 rows

  return (
    <div className="bg-white text-gray-900 border border-gray-300 rounded-sm shadow-sm overflow-hidden text-xs max-w-full">
      {/* Header Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-gray-300 bg-gray-50 print:hidden">
        <div>
          <h2 className="text-lg font-bold">Production Tracking Sheet</h2>
          <p className="text-gray-500">Manufacturing order entry and tracking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" /> Print Sheet
          </Button>
        </div>
      </div>

      <div className="p-4 md:p-6 print:p-0">
        <h1 className="text-2xl font-black tracking-tight text-center border-b-2 border-gray-800 pb-2 mb-6">
          HOLLAND BLOCK OUT
        </h1>

        {/* Top Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* General Fields */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Attention</label>
              <input type="text" className="border-b border-gray-300 py-1 outline-none text-sm focus:border-blue-500 transition-colors bg-transparent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Client&apos;s Name</label>
              <input type="text" className="border-b border-gray-300 py-1 outline-none text-sm focus:border-blue-500 transition-colors bg-transparent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Client&apos;s Number</label>
              <input type="text" className="border-b border-gray-300 py-1 outline-none text-sm focus:border-blue-500 transition-colors bg-transparent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Status</label>
              <input type="text" className="border-b border-gray-300 py-1 outline-none text-sm focus:border-blue-500 transition-colors bg-transparent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Project Manager</label>
              <input type="text" defaultValue="Kiru" className="border-b border-gray-300 py-1 outline-none text-sm font-semibold focus:border-blue-500 transition-colors bg-transparent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Number of Blinds</label>
              <input type="number" className="border-b border-gray-300 py-1 outline-none text-sm focus:border-blue-500 transition-colors bg-transparent" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Supply & Install</label>
              <select className="border-b border-gray-300 py-1 outline-none text-sm focus:border-blue-500 transition-colors bg-transparent">
                <option value=""></option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Production Date</label>
              <input type="date" className="border-b border-gray-300 py-1 outline-none text-sm focus:border-blue-500 transition-colors bg-transparent" />
            </div>
            <div className="flex gap-4">
              <div className="flex-1 flex flex-col gap-1">
                <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Start Time</label>
                <input type="time" className="border-b border-gray-300 py-1 outline-none text-sm focus:border-blue-500 transition-colors bg-transparent" />
              </div>
              <div className="flex-1 flex flex-col gap-1">
                <label className="font-bold uppercase tracking-wider text-[10px] text-gray-500">Finished Time</label>
                <input type="time" className="border-b border-gray-300 py-1 outline-none text-sm focus:border-blue-500 transition-colors bg-transparent" />
              </div>
            </div>
          </div>

          {/* Fabric Tracking Panel */}
          <div className="bg-gray-50 border border-gray-300 p-4 rounded-sm self-start">
            <h3 className="font-bold text-sm mb-4 pb-2 border-b border-gray-200">Fabric Tracking</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Needed Fabric</span>
                <input type="text" className="w-24 border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Any Stock</span>
                <input type="text" className="w-24 border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Ordered Fabric</span>
                <input type="text" className="w-24 border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-700">Received Fabric</span>
                <input type="text" className="w-24 border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="font-bold text-gray-900">Balance Fabric</span>
                <input type="text" className="w-24 border border-gray-400 font-bold rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Manufacturing Table */}
        <div className="overflow-x-auto border border-gray-800 rounded-sm">
          <table className="w-full text-left border-collapse min-w-[1200px]">
            <thead>
              {/* Grouping Header */}
              <tr className="bg-slate-100 border-b-2 border-gray-800 text-center text-[10px] uppercase font-black tracking-wider">
                <th colSpan={5} className="py-2 border-r border-gray-400 px-2">Fabric Supplier Section</th>
                <th colSpan={7} className="py-2 border-r border-gray-400 px-2">Collection Section</th>
                <th colSpan={2} className="py-2 border-r border-gray-400 px-2 bg-blue-50">Fabric Info</th>
                <th colSpan={4} className="py-2 px-2 bg-orange-50">Dimensions Section</th>
              </tr>
              {/* Column Details */}
              <tr className="bg-gray-50 border-b-2 border-gray-800 text-[9px] font-bold text-center leading-tight">
                {/* Fabric Supplier */}
                <th className="border-r border-gray-300 p-1 w-16">Supplier Name</th>
                <th className="border-r border-gray-300 p-1 w-16">Location</th>
                <th className="border-r border-gray-300 p-1 w-12">Control</th>
                <th className="border-r border-gray-300 p-1 w-12">Bracket</th>
                <th className="border-r border-gray-400 p-1 w-12">Chain</th>
                
                {/* Collection Section */}
                <th className="border-r border-gray-300 p-1 w-20">Customer</th>
                <th className="border-r border-gray-300 p-1 w-20">Collection Name</th>
                <th className="border-r border-gray-300 p-1 w-16">Bottom Style</th>
                <th className="border-r border-gray-300 p-1 w-16">Rolling Way</th>
                <th className="border-r border-gray-300 p-1 w-16">Mount Point</th>
                <th className="border-r border-gray-300 p-1 w-14">Surface</th>
                <th className="border-r border-gray-400 p-1 w-16">Pelmet Type</th>

                {/* Fabric Info */}
                <th className="border-r border-gray-300 p-1 bg-blue-50/50 w-16">Needed Fabric</th>
                <th className="border-r border-gray-400 p-1 bg-blue-50/50 min-w-[100px]">Notes</th>

                {/* Dimensions */}
                <th className="border-r border-gray-300 p-1 bg-orange-50/50 w-14">W (Actual)</th>
                <th className="border-r border-gray-800 p-1 bg-red-100 text-red-700 w-14">W (Cut)</th>
                <th className="border-r border-gray-300 p-1 bg-orange-50/50 w-14">H (Actual)</th>
                <th className="p-1 bg-red-100 text-red-700 w-14">H (Cut)</th>
              </tr>
            </thead>
            <tbody className="bg-[#fcfaf5]"> {/* Soft beige background */}
              {rows.map((_, i) => (
                <tr key={i} className="border-b border-gray-300 hover:bg-white transition-colors">
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-400"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-400"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>
                  <td className="border-r border-gray-400"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white" /></td>

                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white font-mono text-center" /></td>
                  <td className="border-r border-gray-800 bg-red-50"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white font-mono text-red-700 font-bold text-center" /></td>
                  <td className="border-r border-gray-300"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white font-mono text-center" /></td>
                  <td className="bg-red-50"><input type="text" className="w-full bg-transparent px-1 py-1.5 focus:outline-none focus:bg-white font-mono text-red-700 font-bold text-center" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8">
          <div className="md:col-span-1 space-y-4">
            <h4 className="font-bold text-sm border-b border-gray-300 pb-2">Hardware Summary</h4>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Number of Single BKTs</span>
              <input type="number" className="w-20 border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Number of Double BKTs</span>
              <input type="number" className="w-20 border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Number of Remotes</span>
              <input type="number" className="w-20 border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-700">Number of Chargers</span>
              <input type="number" className="w-20 border border-gray-300 rounded px-2 py-1 text-right focus:outline-none focus:ring-1 focus:ring-blue-500" />
            </div>
          </div>
          <div className="md:col-span-2">
            <h4 className="font-bold text-sm border-b border-gray-300 pb-2 mb-4">Production Notes</h4>
            <textarea 
              className="w-full h-32 border border-gray-300 rounded p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-yellow-50/30 resize-none text-sm"
              placeholder="Add any specific instructions, discrepancies, or issues during production here..."
            ></textarea>
          </div>
        </div>

      </div>
    </div>
  );
}
