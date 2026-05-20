import { useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import {
  LayoutDashboard, Package, Newspaper, Settings, Users, Leaf,
  LogOut, ExternalLink, Menu, X, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/uvs-logo.png";

const navItems = [
  { label: "Dashboard",     path: "/admin/dashboard",     icon: LayoutDashboard },
  { label: "Products",      path: "/admin/products",      icon: Package },
  { label: "News & Events", path: "/admin/news",          icon: Newspaper },
  { label: "Team Members",  path: "/admin/team",          icon: Users },
  { label: "Sustainability",path: "/admin/sustainability", icon: Leaf },
  { label: "Site Settings", path: "/admin/settings",      icon: Settings },
];

const AdminLayout = () => {
  const { isLoggedIn, isLoading, logout } = useAdmin();
  const navigate  = useNavigate();
  const location  = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isLoggedIn) navigate("/admin/login");
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#071a09] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) return null;

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  const Sidebar = ({ onClose }: { onClose?: () => void }) => (
    <div className="flex flex-col h-full">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <img src={logo} alt="UVS" className="h-10 w-auto object-contain brightness-0 invert" />
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-white lg:hidden">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-3">Navigation</p>
        <nav className="space-y-1">
          {navItems.map(({ label, path, icon: Icon }) => {
            const active = location.pathname.startsWith(path);
            return (
              <Link
                key={path}
                to={path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/8"
                }`}
              >
                <Icon className="w-4.5 h-4.5 shrink-0" />
                {label}
                {active && <ChevronRight className="w-3.5 h-3.5 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 mt-4 pt-4">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest px-3 mb-3">Quick Links</p>
          <a href="/" target="_blank" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/8 transition-all">
            <ExternalLink className="w-4 h-4 shrink-0" />
            View Live Site
          </a>
        </div>
      </div>

      <div className="p-4 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#071a09] flex-col shrink-0 fixed inset-y-0 left-0 z-40">
        <Sidebar />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative w-64 bg-[#071a09] flex flex-col h-full">
            <Sidebar onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-1.5 rounded-lg hover:bg-gray-100 text-gray-600"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <p className="text-xs text-gray-400">Ultimate Vetserve Limited</p>
            <p className="font-bold text-gray-900 text-sm">Admin Portal</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">A</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
