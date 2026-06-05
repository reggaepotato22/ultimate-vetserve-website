import { Link } from "react-router-dom";
import { Package, Newspaper, Users, MessageSquare, Eye, TrendingUp, ArrowRight, Loader2, AlertTriangle, CheckCircle2, Clock, BarChart3 } from "lucide-react";
import { useProducts, useNews } from "@/hooks/useData";
import { useAnalyticsSummary, useViewsByDay, useInquiriesByStatus } from "@/hooks/useAnalytics";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#3b82f6", "#f59e0b", "#22c55e"];

const AdminDashboard = () => {
  const { products, loading: pLoading } = useProducts();
  const { articles, loading: nLoading } = useNews();
  const { stats, loading: aLoading } = useAnalyticsSummary(30000);
  const { data: viewsData, loading: vLoading } = useViewsByDay(30, 30000);
  const { data: statusData } = useInquiriesByStatus(30000);

  const featuredCount = products.filter((p) => p.featured).length;
  const inStockCount = products.filter((p) => p.stock === "In Stock").length;
  const missingDescriptions = products.filter((p) => !p.description).length;
  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-gray-900">Dashboard</h1>
        <p className="text-gray-400 text-sm mt-0.5">Real-time analytics & content overview</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: stats.totalProducts, icon: Package, color: "bg-emerald-50 text-emerald-700", href: "/admin/products" },
          { label: "News Articles", value: stats.totalNews, icon: Newspaper, color: "bg-blue-50 text-blue-700", href: "/admin/news" },
          { label: "Team Members", value: stats.totalTeam, icon: Users, color: "bg-purple-50 text-purple-700", href: "/admin/team" },
          { label: "Inquiries", value: stats.totalInquiries, icon: MessageSquare, color: "bg-rose-50 text-rose-700", sub: `${stats.newInquiries} new`, href: "/admin/inquiries" },
        ].map(({ label, value, icon: Icon, color, sub, href }) => (
          <Link key={label} to={href} className="bg-white rounded-2xl border border-gray-100 p-4 hover:shadow-md transition-all group">
            <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{aLoading ? "—" : value}</p>
            <p className="font-semibold text-gray-700 text-xs mt-0.5">{label}</p>
            {sub && <p className="text-[10px] text-blue-600 font-semibold mt-0.5">{sub}</p>}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Page Views", value: aLoading ? "—" : stats.totalViews, icon: Eye, color: "bg-indigo-50 text-indigo-700", href: "#" },
          { label: "Views Today", value: aLoading ? "—" : stats.viewsToday, icon: BarChart3, color: "bg-cyan-50 text-cyan-700", href: "#" },
          { label: "This Week", value: aLoading ? "—" : stats.viewsThisWeek, icon: TrendingUp, color: "bg-orange-50 text-orange-700", href: "#" },
          { label: "Featured Items", value: featuredCount, icon: Eye, color: "bg-pink-50 text-pink-700", sub: `${inStockCount} in stock`, href: "/admin/products" },
        ].map(({ label, value, icon: Icon, color, sub, href }) => (
          <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4">
            <div className={`w-9 h-9 ${color} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className="w-4.5 h-4.5" />
            </div>
            <p className="text-2xl font-extrabold text-gray-900">{value}</p>
            <p className="font-semibold text-gray-700 text-xs mt-0.5">{label}</p>
            {sub && <p className="text-[10px] text-gray-400 mt-0.5">{sub}</p>}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Page Views (Last 30 Days)</h2>
          </div>
          {vLoading ? (
            <div className="flex items-center justify-center h-48"><Loader2 className="w-5 h-5 animate-spin text-gray-300" /></div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={viewsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 9 }} tickLine={false} axisLine={false} interval={4} />
                <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
                <Bar dataKey="views" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-bold text-gray-900 text-sm mb-4">Inquiries by Status</h2>
          {statusData.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-300"><BarChart3 className="w-8 h-8" /></div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={statusData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" paddingAngle={4}>
                  {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid #e5e7eb", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div className="flex justify-center gap-4 mt-2">
            {statusData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                <span className="text-[11px] font-semibold text-gray-500 capitalize">{d.name} ({d.value})</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Content Health</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: "Products", total: products.length, issues: missingDescriptions, warn: "missing descriptions" },
              { label: "Categories", total: categories.length, issues: 0, warn: "" },
              { label: "News Articles", total: articles.length, issues: articles.filter((a) => !a.imageUrl).length, warn: "missing images" },
            ].map(({ label, total, issues, warn }) => (
              <div key={label} className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <div className="flex items-center gap-2.5">
                  {issues > 0 ? <AlertTriangle className="w-4 h-4 text-amber-500" /> : <CheckCircle2 className="w-4 h-4 text-green-500" />}
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{label}</p>
                    {issues > 0 && <p className="text-[11px] text-amber-600 font-medium">{issues} {warn}</p>}
                  </div>
                </div>
                <span className="text-lg font-extrabold text-gray-900">{total}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Quick Actions</h2>
          </div>
          <div className="space-y-2.5">
            {[
              { label: "Add Product", href: "/admin/products/new", icon: Package, color: "bg-primary text-white hover:bg-primary/90" },
              { label: "View Inquiries", href: "/admin/inquiries", icon: MessageSquare, color: "bg-rose-600 text-white hover:bg-rose-700" },
              { label: "Manage Team", href: "/admin/team", icon: Users, color: "bg-purple-600 text-white hover:bg-purple-700" },
              { label: "Site Settings", href: "/admin/settings", icon: Eye, color: "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50" },
            ].map(({ label, href, icon: Icon, color }) => (
              <Link key={label} to={href} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${color}`}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                <ArrowRight className="w-3.5 h-3.5 ml-auto" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Recent Products</h2>
            <Link to="/admin/products" className="text-xs font-semibold text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {pLoading ? (
              <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin text-gray-300 mx-auto" /></div>
            ) : products.slice(0, 5).map((p) => (
              <Link key={p.id} to={`/admin/products/${p.id}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <Package className="w-4 h-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm truncate">{p.name}</p>
                  <p className="text-[11px] text-gray-400">{p.category}</p>
                </div>
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${p.stock === "In Stock" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>{p.stock}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-900 text-sm">Recent News</h2>
            <Link to="/admin/news" className="text-xs font-semibold text-primary hover:underline">View all</Link>
          </div>
          <div className="space-y-2">
            {nLoading ? (
              <div className="py-8 text-center"><Loader2 className="w-5 h-5 animate-spin text-gray-300 mx-auto" /></div>
            ) : articles.length === 0 ? (
              <div className="py-8 text-center text-gray-400 text-sm">No articles yet.</div>
            ) : articles.slice(0, 4).map((a) => (
              <Link key={a.id} to={`/admin/news/${a.id}`} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors">
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                  {a.imageUrl && <img src={a.imageUrl} alt="" className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-gray-800 text-sm line-clamp-1">{a.title}</p>
                  <p className="text-[11px] text-gray-400">{a.category} · {new Date(a.publishedAt).toLocaleDateString()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
