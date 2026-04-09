"use client";

import { ProductList } from "@/components/products/ProductList";
import { Package } from "lucide-react";

export default function ProductsPage() {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 bg-accent text-accent-foreground flex items-center justify-center rounded-xl shadow-lg shadow-accent/20">
              <Package className="h-6 w-6" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-foreground uppercase">Product Catalog</h1>
          </div>
          <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
            Manage your curtains, blinds, and hardware components. Configure base pricing, units, and technical specifications.
          </p>
        </div>
      </div>

      <ProductList />
    </div>
  );
}
