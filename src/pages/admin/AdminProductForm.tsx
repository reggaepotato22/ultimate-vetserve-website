import { useState, useEffect, type ReactNode } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Loader2, Upload, X, AlertTriangle } from "lucide-react";
import { allProducts } from "@/data/products";
import { supabase, isSupabaseConfigured, uploadImage, deleteImage } from "@/lib/supabase";
import type { Product, StockStatus } from "@/types/content";

const CATEGORIES = ["Injectables", "Boluses & De-wormers", "Water Solubles", "Vaccines", "Disinfectants & Salves"];
const CATEGORY_SLUGS: Record<string, string> = {
  "Injectables": "injectables",
  "Boluses & De-wormers": "boluses",
  "Water Solubles": "powder",
  "Vaccines": "vaccines",
  "Disinfectants & Salves": "disinfectants",
};
const FORMS = ["Injectable", "Bolus", "Powder", "Vaccine", "Liquid", "Topical", "Oral"];
const SPECIES_OPTIONS = ["Cattle", "Livestock", "Poultry", "Pets", "General"];
const STOCK_OPTIONS: StockStatus[] = ["In Stock", "Available", "Low Stock"];

const empty: Omit<Product, "id"> = {
  name: "", category: "Injectables", categorySlug: "injectables",
  species: [], form: "Injectable", description: "", fullDescription: "",
  activeIngredient: "", dosage: "", withdrawalPeriod: "", storageInfo: "",
  stock: "In Stock", tags: [], imageUrl: "", featured: false, visible: true,
};

const Field = ({ label, children }: { label: string; children: ReactNode }) => (
  <div>
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{label}</label>
    {children}
  </div>
);

const toSnake = (obj: Record<string, unknown>) => {
  const map: Record<string, string> = {
    categorySlug: "category_slug", fullDescription: "full_description",
    activeIngredient: "active_ingredient", withdrawalPeriod: "withdrawal_period",
    storageInfo: "storage_info", imageUrl: "image_url", orderIndex: "order_index",
  };
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(obj)) out[map[k] ?? k] = v;
  return out;
};

const AdminProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [form, setForm] = useState<Omit<Product, "id">>(empty);
  const [tagInput, setTagInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [loadingProduct, setLoadingProduct] = useState(!isNew);

  useEffect(() => {
    if (!isNew && id) {
      setLoadingProduct(true);
      const fetchProduct = async () => {
        if (isSupabaseConfigured && supabase) {
          const { data, error } = await supabase.from("products").select("*").eq("id", id).single();
          if (data && !error) {
            const p: Product = {
              id: data.id, name: data.name, category: data.category,
              categorySlug: data.category_slug, species: data.species ?? [],
              form: data.form, description: data.description ?? "",
              fullDescription: data.full_description, activeIngredient: data.active_ingredient,
              dosage: data.dosage, withdrawalPeriod: data.withdrawal_period,
              storageInfo: data.storage_info,               stock: data.stock ?? "In Stock",
              tags: data.tags ?? [], imageUrl: data.image_url,
              featured: data.featured ?? false, visible: data.visible ?? true,
              orderIndex: data.order_index,
            };
            const { id: _id, ...rest } = p;
            setForm(rest);
            setTagInput(p.tags.join(", "));
            setLoadingProduct(false);
            return;
          }
        }
        const p = allProducts.find((x) => x.id === id);
        if (p) {
          const { id: _id, ...rest } = p;
          setForm(rest);
          setTagInput(p.tags.join(", "));
        }
        setLoadingProduct(false);
      };
      fetchProduct();
    }
  }, [id, isNew]);

  const set = (key: keyof typeof form, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleSpecies = (s: string) =>
    set("species", form.species.includes(s) ? form.species.filter((x) => x !== s) : [...form.species, s]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      if (form.imageUrl) await deleteImage(form.imageUrl);
      const url = await uploadImage(file, 'products');
      set("imageUrl", url);
    } catch (err: unknown) {
      alert("Upload failed: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) { setError("Product name is required."); return; }
    setSaving(true);
    setError("");

    const tags = tagInput.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = toSnake({ ...form, tags, categorySlug: CATEGORY_SLUGS[form.category] ?? form.categorySlug });

    if (isSupabaseConfigured && supabase) {
      if (isNew) {
        const { error } = await supabase.from("products").insert([payload]);
        if (error) { setError(error.message); setSaving(false); return; }
      } else {
        const { error } = await supabase.from("products").update(payload).eq("id", id!);
        if (error) { setError(error.message); setSaving(false); return; }
      }
    }

    setSaving(false);
    navigate("/admin/products");
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link to="/admin/products">
          <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{isNew ? "Add Product" : "Edit Product"}</h1>
          <p className="text-gray-400 text-sm mt-0.5">{isNew ? "Add a new product to your catalog" : `Editing: ${form.name || "—"}`}</p>
        </div>
      </div>

      {loadingProduct && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
          <span className="ml-3 text-sm text-gray-500">Loading product...</span>
        </div>
      )}

      {!loadingProduct && !isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-amber-700 text-xs">Supabase not connected — changes won't be saved to database.</p>
        </div>
      )}

      {!loadingProduct && error && (
        <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-red-600 text-sm">{error}</div>
      )}

      {!loadingProduct && <>
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Basic Information</h2>

        <Field label="Product Name *">
          <Input value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="e.g. ULTICYCLINE 20%" className="rounded-xl" />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Category">
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm outline-none focus:border-primary/50">
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Product Form">
            <select value={form.form} onChange={(e) => set("form", e.target.value)} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm outline-none focus:border-primary/50">
              {FORMS.map((f) => <option key={f} value={f}>{f}</option>)}
            </select>
          </Field>
        </div>

        <Field label="Species">
          <div className="flex flex-wrap gap-2 mt-1">
            {SPECIES_OPTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => toggleSpecies(s)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  form.species.includes(s) ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary/40"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </Field>

        <Field label="Stock Status">
          <div className="flex flex-wrap gap-2 mt-1">
            {STOCK_OPTIONS.map((s) => (
              <button key={s} type="button" onClick={() => set("stock", s)}
                className={`px-3 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                  form.stock === s ? "bg-primary text-white border-primary" : "bg-white text-gray-600 border-gray-200 hover:border-primary/40"
                }`}
              >{s}</button>
            ))}
          </div>
        </Field>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <input type="checkbox" id="featured" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-primary" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Feature this product on the homepage</label>
        </div>
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <label className="text-sm font-medium text-gray-700">Visible on public website</label>
          <button type="button" onClick={() => set("visible", form.visible === false ? true : false)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out ${form.visible !== false ? "bg-primary" : "bg-gray-300"}`}
          >
            <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ease-in-out ${form.visible !== false ? "translate-x-5" : "translate-x-0"}`} />
          </button>
          {form.visible === false && (
            <span className="text-xs font-bold text-red-500 bg-red-100 px-2 py-0.5 rounded-full">HIDDEN</span>
          )}
        </div>
      </div>

      {/* Descriptions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Descriptions</h2>

        <Field label="Short Description (shown on product cards)">
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            rows={3}
            placeholder="Brief description for product cards..."
            className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm outline-none focus:border-primary/50 resize-none"
          />
        </Field>

        <Field label="Full Description (shown on product detail page)">
          <textarea
            value={form.fullDescription ?? ""}
            onChange={(e) => set("fullDescription", e.target.value)}
            rows={6}
            placeholder="Detailed product description including indications, pharmacology, etc..."
            className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm outline-none focus:border-primary/50 resize-none"
          />
        </Field>
      </div>

      {/* Technical Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Technical Details</h2>

        <Field label="Active Ingredient">
          <Input value={form.activeIngredient ?? ""} onChange={(e) => set("activeIngredient", e.target.value)} placeholder="e.g. Oxytetracycline 20%" className="rounded-xl" />
        </Field>

        <Field label="Dosage & Administration">
          <textarea
            value={form.dosage ?? ""}
            onChange={(e) => set("dosage", e.target.value)}
            rows={3}
            placeholder="Dosage instructions..."
            className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm outline-none focus:border-primary/50 resize-none"
          />
        </Field>

        <Field label="Withdrawal Period">
          <Input value={form.withdrawalPeriod ?? ""} onChange={(e) => set("withdrawalPeriod", e.target.value)} placeholder="e.g. Meat: 28 days. Milk: 7 days." className="rounded-xl" />
        </Field>

        <Field label="Storage & Safety">
          <textarea
            value={form.storageInfo ?? ""}
            onChange={(e) => set("storageInfo", e.target.value)}
            rows={2}
            placeholder="Storage conditions..."
            className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm outline-none focus:border-primary/50 resize-none"
          />
        </Field>

        <Field label="Tags (comma-separated)">
          <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)} placeholder="e.g. Antibiotic, Respiratory, Long-acting" className="rounded-xl" />
        </Field>
      </div>

      {/* Image */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Product Image</h2>

        <Field label="Image URL">
          <Input value={form.imageUrl ?? ""} onChange={(e) => set("imageUrl", e.target.value)} placeholder="https://..." className="rounded-xl" />
        </Field>

        {isSupabaseConfigured && (
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-2">Or Upload Image</label>
            <label className="flex items-center gap-2 cursor-pointer w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? "Uploading..." : "Choose File"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          </div>
        )}

        {form.imageUrl && (
          <div className="relative w-32 h-32 rounded-xl overflow-hidden border border-gray-200">
            <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
            <button onClick={() => set("imageUrl", "")} className="absolute top-1 right-1 p-1 bg-white/80 rounded-full hover:bg-white">
              <X className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pb-6">
        <Link to="/admin/products">
          <Button variant="outline" className="rounded-xl px-8">Cancel</Button>
        </Link>
        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 rounded-xl px-8 gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Product"}
        </Button>
      </div>
      </>}
    </div>
  );
};

export default AdminProductForm;
