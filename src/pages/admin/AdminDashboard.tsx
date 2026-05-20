import { Link } from "react-router-dom";
import { Package, Newspaper, Users, ArrowRight, TrendingUp, Eye, Edit, Plus } from "lucide-react";
import { allProducts } from "@/data/products";
import { defaultNews } from "@/data/news";

const AdminDashboard = () => {
  const stats = [
    { label: "Total Products", value: allProducts.length, sub: "in catalog", icon: Package, color: "bg-green-50 text-green-700", href: "/admin/products" },
    { label: "News Articles", value: defaultNews.length, sub: "published", icon: Newspaper, color: "bg-blue-50 text-blue-700", href: "/admin/news" },
    { label: "Featured Products", value: allProducts.filter((p) => p.featured).length, sub: "highlighted", icon: TrendingUp, color: "bg-amber-50 text-amber-700", href: "/admin/products" },
    { label: "In Stock", value: allProducts.filter((p) => p.stock === "In Stock").length, sub: "available now", icon: Eye, color: "bg-emerald-50 text-emerald-700", href: "/admin/products" },
  ];

  const quickActions = [
    { label: "Add New Product", href: "/admin/products/new", icon: Plus, color: "bg-primary text-white hover:bg-primary/90" },
    { label: "Write News Article", href: "/admin/news/new", icon: Edit, color: "bg-blue-600 text-white hover:bg-blue-700" },
    { label: "Edit Homepage", href: "/admin/settings", icon: Edit, color: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50" },
    { label: "View Live Site", href: "/", icon: Eye, color: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">Welcome back. Manage your website content from here.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ label, value, sub, icon: Icon, color, href }) => (
          <Link key={label} to={href} className="bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all group">
            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center mb-4`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-3xl font-extrabold text-gray-900 mb-1">{value}</p>
            <p className="font-semibold text-gray-700 text-sm">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h2 className="font-bold text-gray-900 mb-5">Quick Actions</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map(({ label, href, icon: Icon, color }) => (
            <Link
              key={label}
              to={href}
              target={label === "View Live Site" ? "_blank" : undefined}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${color}`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Products */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Recent Products</h2>
            <Link to="/admin/products" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {allProducts.slice(0, 6).map((p) => (
              <Link key={p.id} to={`/admin/products/${p.id}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Package className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.category}</p>
                </div>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${p.stock === "In Stock" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                  {p.stock}
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-gray-900">Recent Articles</h2>
            <Link to="/admin/news" className="text-xs font-semibold text-primary hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="space-y-3">
            {defaultNews.slice(0, 4).map((n) => (
              <Link key={n.id} to={`/admin/news/${n.id}`} className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={n.imageUrl ?? ""} alt={n.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm line-clamp-2 leading-snug">{n.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{n.category}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Setup Notice */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h3 className="font-bold text-blue-900 mb-1 text-sm">Supabase Setup Instructions</h3>
        <p className="text-blue-700 text-xs leading-relaxed mb-3">
          To enable live database editing, add your Supabase credentials to <code className="bg-blue-100 px-1 rounded">.env</code> and run the SQL migration found in <code className="bg-blue-100 px-1 rounded">src/lib/supabase.ts</code>. Once connected, all changes made here will be reflected live on the website.
        </p>
        <div className="font-mono text-xs bg-blue-900/10 rounded-xl p-3 text-blue-800 space-y-1">
          <p>VITE_SUPABASE_URL=https://[project-ref].supabase.co</p>
          <p>VITE_SUPABASE_ANON_KEY=eyJ...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
