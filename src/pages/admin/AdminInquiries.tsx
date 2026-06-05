import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { useInquiries, type Inquiry } from "@/hooks/useAnalytics";
import { Mail, MessageSquare, Search, Loader2, CheckCircle2, Clock, ArrowLeft, RefreshCw, Reply } from "lucide-react";

const statusConfig: Record<string, { label: string; color: string; icon: typeof Mail }> = {
  new: { label: "New", color: "bg-blue-100 text-blue-700", icon: Mail },
  read: { label: "Read", color: "bg-amber-100 text-amber-700", icon: Clock },
  replied: { label: "Replied", color: "bg-green-100 text-green-700", icon: CheckCircle2 },
};

const AdminInquiries = () => {
  const { inquiries, setInquiries, loading, refetch } = useInquiries();
  const [selected, setSelected] = useState<Inquiry | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [updating, setUpdating] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // Real-time subscription
  useEffect(() => {
    if (!supabase) return;
    const channel = supabase
      .channel("inquiries-realtime")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "inquiries" }, (payload) => {
        const newInquiry = payload.new as Inquiry;
        setInquiries((prev) => [newInquiry, ...prev]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "inquiries" }, (payload) => {
        const updated = payload.new as Inquiry;
        setInquiries((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
      })
      .subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [setInquiries]);

  const filtered = useMemo(() => {
    return inquiries.filter((i) => {
      if (statusFilter !== "all" && i.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return i.name.toLowerCase().includes(q) || (i.email?.toLowerCase() ?? "").includes(q) || (i.clinic?.toLowerCase() ?? "").includes(q);
      }
      return true;
    });
  }, [inquiries, search, statusFilter]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setTimeout(() => setRefreshing(false), 400);
  };

  // Auto-mark as "read" when selecting a new inquiry
  const handleSelect = (inq: Inquiry) => {
    setSelected(inq);
    if (inq.status === "new") {
      setUpdating(inq.id);
      supabase.from("inquiries").update({ status: "read" }).eq("id", inq.id).then(() => {
        setInquiries((prev) => prev.map((i) => i.id === inq.id ? { ...i, status: "read" } : i));
        setUpdating(null);
      });
      setInquiries((prev) => prev.map((i) => i.id === inq.id ? { ...i, status: "read" } : i));
      setSelected((prev) => prev ? { ...prev, status: "read" } : null);
    }
  };

  const markAs = async (id: string, status: string) => {
    setUpdating(id);
    await supabase.from("inquiries").update({ status }).eq("id", id);
    setInquiries((prev) => prev.map((i) => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected((prev) => prev ? { ...prev, status } : null);
    setUpdating(null);
  };

  // Reply via email — marks as replied automatically
  const handleReply = (inq: Inquiry) => {
    const subject = encodeURIComponent("Re: Your Inquiry - Ultimate Vetserve");
    const body = encodeURIComponent(`Dear ${inq.name},\n\nThank you for reaching out to Ultimate Vetserve.\n\nRegarding your inquiry:\n${inq.message}\n\n---\n\n`);
    window.open(`mailto:${inq.email}?subject=${subject}&body=${body}`, "_blank");
    markAs(inq.id, "replied");
  };

  const newCount = inquiries.filter((i) => i.status === "new").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Inquiries</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {newCount > 0 ? (
              <span className="text-blue-600 font-semibold">{newCount} new</span>
            ) : "All"} leads from contact forms and product inquiries
          </p>
        </div>
        <button onClick={handleRefresh} disabled={refreshing} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-500 hover:bg-gray-50 transition-colors disabled:opacity-50">
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} /> Refresh
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or clinic..."
            className="w-full pl-9 pr-3 py-2 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary/50"
          />
        </div>
        <div className="flex gap-1.5">
          {(["all", "new", "read", "replied"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                statusFilter === s ? "bg-gray-900 text-white" : "bg-white border border-gray-200 text-gray-500 hover:border-gray-300"
              }`}
            >
              {s === "all" ? "All" : statusConfig[s]?.label ?? s}
            </button>
          ))}
        </div>
      </div>

      {newCount > 0 && (
        <button
          onClick={() => setStatusFilter("new")}
          className="w-full flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-4 py-2.5 text-sm text-blue-700 hover:bg-blue-100 transition-colors"
        >
          <Mail className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{newCount} new {newCount !== 1 ? "inquiries" : "inquiry"}</span>
          <span className="ml-auto text-xs underline">Click to review</span>
        </button>
      )}

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20"><Loader2 className="w-5 h-5 animate-spin text-gray-300" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400 text-sm">
              {statusFilter !== "all" ? `No ${statusConfig[statusFilter]?.label.toLowerCase()} inquiries.` : "No inquiries found."}
            </div>
          ) : (
            <div className="divide-y divide-gray-50 max-h-[75vh] overflow-y-auto">
              {filtered.map((inq) => {
                const cfg = statusConfig[inq.status] ?? statusConfig.new;
                const Icon = cfg.icon;
                return (
                  <button
                    key={inq.id}
                    onClick={() => handleSelect(inq)}
                    className={`w-full text-left p-4 hover:bg-gray-50 transition-colors ${
                      selected?.id === inq.id ? "bg-primary/5 border-l-2 border-primary" : inq.status === "new" ? "bg-blue-50/50" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${cfg.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-800 text-sm truncate">{inq.name}</p>
                        <p className="text-xs text-gray-400 truncate">{inq.email ?? inq.phone ?? "No contact"}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${cfg.color}`}>{cfg.label}</span>
                        <p className="text-[10px] text-gray-400 mt-1">{new Date(inq.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {selected ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <button onClick={() => setSelected(null)} className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 mb-4">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to list
            </button>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${statusConfig[selected.status]?.color ?? "bg-gray-100 text-gray-600"}`}>
                  {(() => {
                    const C = statusConfig[selected.status]?.icon ?? Mail;
                    return <C className="w-5 h-5" />;
                  })()}
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-[17px]">{selected.name}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    {new Date(selected.created_at).toLocaleString()}
                  </div>
                </div>
                {selected.email && (
                  <button
                    onClick={() => handleReply(selected)}
                    disabled={updating === selected.id}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-white text-xs font-bold hover:bg-primary/90 transition-all shrink-0"
                  >
                    {updating === selected.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <><Reply className="w-3.5 h-3.5" /> Reply</>}
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {selected.email && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Email</p>
                    <a href={`mailto:${selected.email}`} className="text-sm font-semibold text-primary hover:underline">{selected.email}</a>
                  </div>
                )}
                {selected.phone && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Phone</p>
                    <a href={`tel:${selected.phone}`} className="text-sm font-semibold text-gray-800">{selected.phone}</a>
                  </div>
                )}
                {selected.clinic && (
                  <div className="bg-gray-50 rounded-xl p-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1">Clinic / Company</p>
                    <p className="text-sm font-semibold text-gray-800">{selected.clinic}</p>
                  </div>
                )}
              </div>

              {selected.message && (
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-1.5">Message</p>
                  <div className="bg-gray-50 rounded-xl p-3.5 text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{selected.message}</div>
                </div>
              )}

              <div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide mb-2">Status</p>
                <div className="flex gap-2">
                  {(["new", "read", "replied"] as const).map((s) => {
                    const active = selected.status === s;
                    const cfg = statusConfig[s];
                    const activeClass = s === "new" ? "bg-blue-100 text-blue-700 ring-2 ring-blue-200" : s === "read" ? "bg-amber-100 text-amber-700 ring-2 ring-amber-200" : "bg-green-100 text-green-700 ring-2 ring-green-200";
                    return (
                      <button
                        key={s}
                        onClick={() => markAs(selected.id, s)}
                        disabled={updating === selected.id}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                          active ? activeClass : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                        }`}
                      >
                        {updating === selected.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <cfg.icon className="w-3 h-3" />}
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 flex items-center justify-center text-gray-400">
            <div className="text-center">
              <MessageSquare className="w-10 h-10 mx-auto mb-3 text-gray-200" />
              <p className="text-sm">Select an inquiry to view details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminInquiries;
