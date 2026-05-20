import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Save, Loader2, Upload, X, AlertTriangle } from "lucide-react";
import { defaultNews, newsCategories } from "@/data/news";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { NewsArticle } from "@/types/content";

const cats = newsCategories.filter((c) => c !== "All");

const empty: Omit<NewsArticle, "id"> = {
  title: "", slug: "", excerpt: "", content: "", category: "News",
  imageUrl: "", author: "Ultimate Vetserve", publishedAt: new Date().toISOString(), featured: false,
};

const toSlug = (title: string) =>
  title.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);

const AdminNewsForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [form, setForm] = useState<Omit<NewsArticle, "id">>(empty);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    if (!isNew && id) {
      const a = defaultNews.find((x) => x.id === id);
      if (a) { const { id: _id, ...rest } = a; setForm(rest); setSlugEdited(true); }
    }
  }, [id, isNew]);

  const set = (key: keyof typeof form, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleTitleChange = (val: string) => {
    set("title", val);
    if (!slugEdited) set("slug", toSlug(val));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !supabase) return;
    const file = e.target.files[0];
    setUploading(true);
    const ext = file.name.split(".").pop();
    const path = `news/${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from("images").upload(path, file);
    if (error) { alert("Upload failed: " + error.message); setUploading(false); return; }
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(data.path);
    set("imageUrl", publicUrl);
    setUploading(false);
  };

  const handleSave = async () => {
    if (!form.title.trim()) { setError("Article title is required."); return; }
    if (!form.slug.trim())  { setError("Slug is required."); return; }
    setSaving(true);
    setError("");

    if (isSupabaseConfigured && supabase) {
      if (isNew) {
        const { error } = await supabase.from("news_events").insert([{
          title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
          category: form.category, image_url: form.imageUrl, author: form.author,
          published_at: form.publishedAt, featured: form.featured,
        }]);
        if (error) { setError(error.message); setSaving(false); return; }
      } else {
        const { error } = await supabase.from("news_events").update({
          title: form.title, slug: form.slug, excerpt: form.excerpt, content: form.content,
          category: form.category, image_url: form.imageUrl, author: form.author,
          published_at: form.publishedAt, featured: form.featured,
        }).eq("id", id!);
        if (error) { setError(error.message); setSaving(false); return; }
      }
    }

    setSaving(false);
    navigate("/admin/news");
  };

  const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div>
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <Link to="/admin/news">
          <button className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">{isNew ? "Write Article" : "Edit Article"}</h1>
          <p className="text-gray-400 text-sm mt-0.5">{form.title || "Untitled article"}</p>
        </div>
      </div>

      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-amber-700 text-xs">Supabase not connected — changes won't be saved to database.</p>
        </div>
      )}

      {error && <div className="bg-red-50 border border-red-100 rounded-xl p-3 text-red-600 text-sm">{error}</div>}

      {/* Core Fields */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Article Details</h2>

        <Field label="Title *">
          <Input value={form.title} onChange={(e) => handleTitleChange(e.target.value)} placeholder="Article title..." className="rounded-xl text-lg font-semibold" />
        </Field>

        <Field label="Slug (URL)" hint={`URL: /news/${form.slug}`}>
          <Input
            value={form.slug}
            onChange={(e) => { setSlugEdited(true); set("slug", toSlug(e.target.value)); }}
            placeholder="article-url-slug"
            className="rounded-xl font-mono text-sm"
          />
        </Field>

        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Category">
            <select value={form.category} onChange={(e) => set("category", e.target.value)} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm outline-none focus:border-primary/50">
              {cats.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </Field>
          <Field label="Author">
            <Input value={form.author} onChange={(e) => set("author", e.target.value)} placeholder="Author name" className="rounded-xl" />
          </Field>
        </div>

        <Field label="Publish Date">
          <Input
            type="datetime-local"
            value={form.publishedAt.slice(0, 16)}
            onChange={(e) => set("publishedAt", new Date(e.target.value).toISOString())}
            className="rounded-xl"
          />
        </Field>

        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
          <input type="checkbox" id="featured" checked={!!form.featured} onChange={(e) => set("featured", e.target.checked)} className="w-4 h-4 accent-primary" />
          <label htmlFor="featured" className="text-sm font-medium text-gray-700">Feature this article (shown prominently on news page)</label>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Content</h2>

        <Field label="Excerpt (shown on listing page)">
          <textarea
            value={form.excerpt ?? ""}
            onChange={(e) => set("excerpt", e.target.value)}
            rows={3}
            placeholder="Brief summary for the article listing..."
            className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm outline-none focus:border-primary/50 resize-none"
          />
        </Field>

        <Field label="Full Content (Markdown supported)" hint="Use ## for headings, **bold**, - for bullet lists">
          <textarea
            value={form.content ?? ""}
            onChange={(e) => set("content", e.target.value)}
            rows={18}
            placeholder="Full article content (Markdown supported)..."
            className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm font-mono outline-none focus:border-primary/50 resize-y"
          />
        </Field>
      </div>

      {/* Image */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Featured Image</h2>

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
          <div className="relative w-48 h-28 rounded-xl overflow-hidden border border-gray-200">
            <img src={form.imageUrl} alt="Preview" className="w-full h-full object-cover" />
            <button onClick={() => set("imageUrl", "")} className="absolute top-1 right-1 p-1 bg-white/80 rounded-full hover:bg-white">
              <X className="w-3 h-3 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pb-6">
        <Link to="/admin/news">
          <Button variant="outline" className="rounded-xl px-8">Cancel</Button>
        </Link>
        <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 rounded-xl px-8 gap-2">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : "Save Article"}
        </Button>
      </div>
    </div>
  );
};

export default AdminNewsForm;
