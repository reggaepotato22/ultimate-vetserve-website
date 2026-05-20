import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/contexts/AdminContext";
import { isSupabaseConfigured } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Lock, AlertTriangle, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/uvs-logo.png";

const AdminLogin = () => {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd]   = useState(false);
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const { login } = useAdmin();
  const navigate  = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    setError("");
    const result = await login(email, password);
    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#071a09] to-[#0c2410] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <img src={logo} alt="Ultimate Vetserve" className="h-20 w-auto object-contain mx-auto mb-4" />
          <h1 className="text-2xl font-extrabold text-white">Admin Portal</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage your website content</p>
        </div>

        {!isSupabaseConfigured && (
          <div className="bg-amber-900/30 border border-amber-500/40 rounded-2xl p-4 mb-6 flex gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-amber-300 text-sm">Supabase Not Configured</p>
              <p className="text-amber-400/80 text-xs mt-1 leading-relaxed">
                Add <code className="bg-amber-900/40 px-1 rounded">VITE_SUPABASE_URL</code> and <code className="bg-amber-900/40 px-1 rounded">VITE_SUPABASE_ANON_KEY</code> to your <code className="bg-amber-900/40 px-1 rounded">.env</code> file, then create an admin user in your Supabase project's Authentication settings.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock className="w-6 h-6 text-primary" />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-5 flex gap-2">
              <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@ultimatevetserve.com"
                className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white"
                disabled={!isSupabaseConfigured}
              />
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">Password</label>
              <div className="relative">
                <Input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••"
                  className="rounded-xl bg-gray-50 border-gray-200 focus:bg-white pr-10"
                  disabled={!isSupabaseConfigured}
                />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="w-full bg-primary hover:bg-primary/90 rounded-xl py-5 font-bold text-base mt-2"
            >
              {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Signing in...</> : "Sign In to Admin"}
            </Button>
          </form>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          Create your admin user in <span className="text-gray-300">Supabase → Authentication → Users</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
