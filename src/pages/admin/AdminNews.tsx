import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Edit, Trash2, Newspaper, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { defaultNews } from "@/data/news";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import type { NewsArticle } from "@/types/content";
import { format } from "date-fns";

const AdminNews = () => {
  const [articles, setArticles] = useState<NewsArticle[]>(defaultNews);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...Array.from(new Set(defaultNews.map((n) => n.category)))];

  const filtered = articles.filter((n) => {
    const matchCat = selectedCategory === "All" || n.category === selectedCategory;
    const matchQ = !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this article? This cannot be undone.")) return;
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.from("news_events").delete().eq("id", id);
      if (error) { alert("Delete failed: " + error.message); return; }
    }
    setArticles((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">News & Events</h1>
          <p className="text-gray-400 text-sm mt-0.5">{articles.length} articles published</p>
        </div>
        <Link to="/admin/news/new">
          <Button className="bg-primary hover:bg-primary/90 rounded-xl gap-2">
            <Plus className="w-4 h-4" /> New Article
          </Button>
        </Link>
      </div>

      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
          <strong>Note:</strong> Supabase not connected. Changes are not persisted.
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
            placeholder="Search articles..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary/50"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary/50 text-gray-700"
        >
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Articles Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((article) => (
          <div key={article.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
            <div className="flex">
              <div className="w-24 shrink-0 overflow-hidden">
                <img
                  src={article.imageUrl ?? ""}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 p-4 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">{article.category}</span>
                  {article.featured && (
                    <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">
                      <Star className="w-2.5 h-2.5" /> Featured
                    </span>
                  )}
                </div>
                <p className="font-bold text-gray-900 text-sm leading-tight line-clamp-2 mb-1">{article.title}</p>
                <p className="text-xs text-gray-400">{format(new Date(article.publishedAt), "dd MMM yyyy")} · {article.author}</p>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 px-4 py-2.5 border-t border-gray-50 bg-gray-50/50">
              <Link to={`/news/${article.slug}`} target="_blank" className="text-xs text-gray-400 hover:text-primary transition-colors">
                View Live
              </Link>
              <Link to={`/admin/news/${article.id}`}>
                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-700 hover:border-primary/40 hover:text-primary transition-all">
                  <Edit className="w-3.5 h-3.5" /> Edit
                </button>
              </Link>
              <button
                onClick={() => handleDelete(article.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-red-400 hover:bg-red-50 hover:border-red-200 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-2 text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Newspaper className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No articles found.</p>
            <Link to="/admin/news/new" className="text-primary text-sm font-semibold hover:underline mt-2 inline-block">
              Create your first article
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNews;
