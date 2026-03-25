"use client";

import { useState } from "react";
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Package, Ruler, Scissors, Box } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Product, ProductCategory, mockProducts } from "@/lib/products";

const categoryIcons: Record<ProductCategory, React.ReactNode> = {
  Curtains: <Scissors className="h-4 w-4" />,
  Blinds: <Ruler className="h-4 w-4" />,
  Hardware: <Box className="h-4 w-4" />,
  Fabrics: <Package className="h-4 w-4" />,
};

const statusStyles = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 font-bold",
  Discontinued: "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400 font-bold",
  Draft: "bg-muted text-muted-foreground ring-muted-foreground/10 font-bold",
};

export function ProductList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ProductCategory | "All">("All");

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2 p-1 bg-muted rounded-xl w-full sm:w-auto overflow-x-auto">
          {["All", "Curtains", "Blinds", "Hardware", "Fabrics"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat as any)}
              className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                categoryFilter === cat 
                ? "bg-card text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              placeholder="Search products…" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-10 w-full rounded-xl border border-border bg-card pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-accent transition shadow-sm"
            />
          </div>
          <Button variant="outline" className="rounded-xl border-border bg-card">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="group relative bg-card rounded-2xl border border-border p-5 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl bg-accent/5 text-accent shadow-inner`}>
                {categoryIcons[product.category]}
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest ring-1 ring-inset ${statusStyles[product.status]}`}>
                  {product.status}
                </span>
                <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{product.category}</p>
                <div className="h-px flex-1 bg-border/50"></div>
              </div>
              <h3 className="text-lg font-bold leading-tight group-hover:text-accent transition-colors">
                {product.name}
              </h3>
              <p className="text-[10px] font-mono text-muted-foreground mt-1 bg-muted px-2 py-0.5 rounded w-fit">{product.sku}</p>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Base Price</span>
                <p className="text-xl font-black font-mono tracking-tighter">
                  ${product.basePrice.toFixed(2)}
                  <span className="text-[10px] text-muted-foreground ml-1">/ {product.unit}</span>
                </p>
              </div>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost" className="h-9 w-9 bg-accent/5 text-accent hover:bg-accent/10 rounded-xl">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="h-9 w-9 bg-red-500/5 text-red-500 hover:bg-red-500/10 rounded-xl">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center bg-muted/20 rounded-3xl border-2 border-dashed border-border/50">
          <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
             <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold">No products found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search keywords.</p>
        </div>
      )}
    </div>
  );
}
