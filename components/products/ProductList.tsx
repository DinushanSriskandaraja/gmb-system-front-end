"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Plus, MoreHorizontal, Edit, Trash2, Package, Ruler, Scissors, Box, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { getProducts, deleteProduct, createProduct, updateProduct } from "@/lib/db/products";
import { getCategories } from "@/lib/db/categories";
import { ProductCatalog, Category } from "@/lib/db/types";
import { ProductForm } from "./ProductForm";

// Helper type since the original was a discriminated string union
type ProductCategoryEnum = "Curtains" | "Blinds" | "Hardware" | "Fabrics";

const categoryIcons: Record<string, React.ReactNode> = {
  Curtains: <Scissors className="h-4 w-4" />,
  Blinds: <Ruler className="h-4 w-4" />,
  Hardware: <Box className="h-4 w-4" />,
  Fabrics: <Package className="h-4 w-4" />,
};

const statusStyles: Record<string, string> = {
  Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 font-bold",
  Inactive: "bg-red-50 text-red-700 ring-red-600/10 dark:bg-red-500/10 dark:text-red-400 font-bold",
  Draft: "bg-muted text-muted-foreground ring-muted-foreground/10 font-bold",
};

export function ProductList() {
  const [products, setProducts] = useState<ProductCatalog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | "All">("All");
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductCatalog | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [prods, cats] = await Promise.all([
        getProducts(),
        getCategories()
      ]);
      setProducts(prods);
      setCategories(cats);
    } catch (err) {
      console.error("Failed to load products catalogs", err);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || 'Unknown';
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setProducts(prev => prev.filter(p => p.products_catalog_id !== id));
      } catch (err) {
        console.error("Delete failed", err);
      }
    }
  };

  const handleSaveProduct = async (productData: Omit<ProductCatalog, 'products_catalog_id' | 'created_at'>) => {
    try {
      if (editingProduct) {
        const updated = await updateProduct(editingProduct.products_catalog_id, productData);
        setProducts(prev => prev.map(p => p.products_catalog_id === updated.products_catalog_id ? updated : p));
      } else {
        const newProd = await createProduct(productData);
        setProducts(prev => [newProd, ...prev]);
      }
    } catch (err: any) {
      alert("Failed to save product: " + err.message);
      throw err;
    }
  };

  const handleEdit = (product: ProductCatalog) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  const filteredProducts = products.filter(p => {
    const catName = getCategoryName(p.category_id);
    const matchesSearch = p.item_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "All" || catName === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex gap-2 p-1 bg-muted rounded-xl w-full sm:w-auto overflow-x-auto">
          {["All", "Curtains", "Blinds", "Hardware", "Fabrics"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
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
          <Button variant="outline" className="rounded-xl border-border bg-card shadow-sm h-10 w-10 p-0 hidden sm:flex items-center justify-center">
            <Filter className="h-4 w-4" />
          </Button>
          <Button onClick={() => setIsFormOpen(true)} className="rounded-xl shadow-sm h-10 px-4">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="w-full py-20 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
             const catName = getCategoryName(product.category_id);
             return (
            <div key={product.products_catalog_id} className="group relative bg-card rounded-2xl border border-border p-5 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 flex flex-col gap-4">
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-xl bg-accent/5 text-accent shadow-inner`}>
                  {categoryIcons[catName] || <Box className="h-4 w-4" />}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest ring-1 ring-inset ${statusStyles[product.status] || statusStyles.Draft}`}>
                    {product.status}
                  </span>
                  <button className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground transition-colors">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-[10px] font-black text-accent uppercase tracking-[0.2em]">{catName}</p>
                  <div className="h-px flex-1 bg-border/50"></div>
                </div>
                <h3 className="text-lg font-bold leading-tight group-hover:text-accent transition-colors">
                  {product.item_name}
                </h3>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {product.description || "No description provided."}
              </p>

              <div className="mt-auto pt-4 flex items-center justify-between border-t border-border/50">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1">Base Price</span>
                  <p className="text-xl font-black font-mono tracking-tighter">
                    ${Number(product.base_price).toFixed(2)}
                    <span className="text-[10px] text-muted-foreground ml-1">/ {product.unit}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEdit(product)} className="h-9 w-9 bg-accent/5 text-accent hover:bg-accent/10 rounded-xl">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(product.products_catalog_id)} className="h-9 w-9 bg-red-500/5 text-red-500 hover:bg-red-500/10 rounded-xl">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          )})}
        </div>
      )}

      {!loading && filteredProducts.length === 0 && (
        <div className="py-20 flex flex-col items-center justify-center text-center bg-muted/20 rounded-3xl border-2 border-dashed border-border/50">
          <div className="h-16 w-16 bg-muted rounded-2xl flex items-center justify-center mb-4">
             <Package className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-bold">No products found</h3>
          <p className="text-sm text-muted-foreground mt-1">Try adjusting your filters or search keywords.</p>
        </div>
      )}

      {isFormOpen && (
        <ProductForm 
          onClose={handleCloseForm}
          onSave={handleSaveProduct}
          categories={categories}
          initialData={editingProduct}
        />
      )}
    </div>
  );
}
