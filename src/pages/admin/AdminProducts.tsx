import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit, Trash2, Package, Filter, Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getCategoryConfig } from "@/data/products";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useProducts } from "@/hooks/useData";
import type { Product } from "@/types/content";

const AdminProducts = () => {
  const { products, setProducts, loading } = useProducts();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products.filter((p) => {
    const matchCat = selectedCategory === "All" || p.category === selectedCategory;
    const matchQ = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) { alert("Delete failed: " + error.message); return; }
    }
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleVisibility = async (product: Product) => {
    const newVisible = product.visible === false ? true : false;
    setTogglingId(product.id);
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("products").update({ visible: newVisible }).eq("id", product.id);
      if (error) { alert("Update failed: " + error.message); setTogglingId(null); return; }
    }
    setProducts((prev) => prev.map((p) => p.id === product.id ? { ...p, visible: newVisible } : p));
    setTogglingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Products</h1>
          <p className="text-gray-400 text-sm mt-0.5">{products.length} products in catalog</p>
        </div>
        <Link to="/admin/products/new">
          <Button className="bg-primary hover:bg-primary/90 rounded-xl gap-2">
            <Plus className="w-4 h-4" /> Add Product
          </Button>
        </Link>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="ml-2 text-sm text-gray-400">Loading products...</span>
        </div>
      )}

      {!loading && !isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700">
          <strong>Note:</strong> Supabase is not connected. Changes made here are not saved to a database. Connect Supabase to enable persistent product management.
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary/50 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary/50 text-gray-700"
          >
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell">Form</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Visible</th>
                <th className="text-right px-5 py-3.5 text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p) => {
                const cfg = getCategoryConfig(p.category);
                return (
                  <tr key={p.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 ${cfg.bg} rounded-xl flex items-center justify-center shrink-0`}>
                          <Package className={`w-4 h-4 ${cfg.color}`} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 text-sm truncate max-w-[180px]">{p.name}</p>
                          {p.featured && <span className="text-[10px] text-amber-600 font-bold bg-amber-50 px-1.5 py-0.5 rounded">Featured</span>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 hidden sm:table-cell">
                      <span className={`text-xs font-semibold ${cfg.color}`}>{p.category}</span>
                    </td>
                    <td className="px-5 py-4 hidden md:table-cell">
                      <span className="text-xs text-gray-500 bg-gray-100 px-2.5 py-0.5 rounded-full">{p.form}</span>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                        p.stock === "In Stock" ? "bg-green-100 text-green-700" :
                        p.stock === "Available" ? "bg-amber-100 text-amber-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {p.stock}
                      </span>
                    </td>
                    <td className="px-5 py-4 hidden lg:table-cell">
                      <button onClick={() => handleToggleVisibility(p)} disabled={togglingId === p.id}
                        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${p.visible !== false ? "bg-primary" : "bg-gray-300"} ${togglingId === p.id ? "opacity-50 cursor-wait" : "cursor-pointer"}`}
                        title={p.visible !== false ? "Click to hide from public" : "Click to show on public"}
                      >
                        {togglingId === p.id ? (
                          <Loader2 className="w-3 h-3 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin" />
                        ) : (
                          <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${p.visible !== false ? "translate-x-5" : "translate-x-0"}`} />
                        )}
                      </button>
                      <span className="ml-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">{p.visible !== false ? "Visible" : "Hidden"}</span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link to={`/admin/products/${p.id}`}>
                          <button className="p-2 rounded-lg hover:bg-primary/10 text-primary transition-colors" title="Edit">
                            <Edit className="w-4 h-4" />
                          </button>
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 rounded-lg hover:bg-red-50 text-red-400 hover:text-red-600 transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-10 h-10 text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">No products found.</p>
              <Link to="/admin/products/new" className="text-primary text-sm font-semibold hover:underline mt-2 inline-block">
                Add your first product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;
