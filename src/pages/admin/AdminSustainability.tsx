import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2, Check, Plus, Trash2, X } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type Program = { title: string; description: string };
type Stat = { value: string; label: string; description: string };
type Partner = { name: string; website: string; desc: string };

const defaultPrograms: Program[] = [
  { title: "Mobile Veterinary Clinics", description: "Free and subsidised mobile clinics dispatched to remote areas." },
  { title: "Farmer Education", description: "Structured training workshops for smallholder farmers." },
  { title: "Deworming Campaigns", description: "Mass deworming for small ruminants in resource-limited communities." },
  { title: "Disease Surveillance & Reporting", description: "Field officers trained to identify and report outbreak-level diseases." },
  { title: "Youth in Veterinary Agriculture", description: "Sponsoring university students in veterinary and animal science programmes." },
  { title: "Sustainable Livestock Practices", description: "Promoting sustainable, low-input livestock management." },
];

const defaultStats: Stat[] = [
  { value: "12,000+", label: "Animals Treated", description: "Through mobile clinic outreach programmes" },
  { value: "2,500+", label: "Farmers Trained", description: "In basic animal health management" },
  { value: "18", label: "Counties Reached", description: "Mobile veterinary services delivered" },
  { value: "95%", label: "Positive Outcomes", description: "Animals showing full recovery" },
];

const defaultCommitments: string[] = [
  "Supply only fully certified and registered veterinary pharmaceuticals",
  "Maintain cold chain integrity for all temperature-sensitive products",
  "Responsible disposal and return of expired pharmaceutical products",
  "Zero tolerance for counterfeit or substandard veterinary drugs",
  "Support the Kenya Veterinary Board's efforts to combat illegal veterinary products",
  "Partner with NGOs and government to extend animal healthcare access",
];

const AdminSustainability = () => {
  const [programs, setPrograms] = useState<Program[]>(defaultPrograms);
  const [stats, setStats] = useState<Stat[]>(defaultStats);
  const [commitments, setCommitments] = useState<string[]>(defaultCommitments);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    supabase.from("site_settings").select("key, value").then(({ data }) => {
      if (data) {
        const progs = data.find((r) => r.key === "sustainability_programs");
        if (progs) setPrograms(progs.value as Program[]);
        const sts = data.find((r) => r.key === "sustainability_stats");
        if (sts) setStats(sts.value as Stat[]);
        const comms = data.find((r) => r.key === "sustainability_commitments");
        if (comms) setCommitments(comms.value as string[]);
        const prts = data.find((r) => r.key === "sustainability_partners");
        if (prts) setPartners(prts.value as Partner[]);
      }
      setLoading(false);
    });
  }, []);

  const updateProgram = (i: number, key: keyof Program, val: string) =>
    setPrograms((prev) => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));

  const removeProgram = (i: number) => setPrograms((prev) => prev.filter((_, idx) => idx !== i));

  const addProgram = () => setPrograms((prev) => [...prev, { title: "", description: "" }]);

  const updateStat = (i: number, key: keyof Stat, val: string) =>
    setStats((prev) => prev.map((s, idx) => idx === i ? { ...s, [key]: val } : s));

  const removeStat = (i: number) => setStats((prev) => prev.filter((_, idx) => idx !== i));

  const addStat = () => setStats((prev) => [...prev, { value: "", label: "", description: "" }]);

  const updatePartner = (i: number, key: keyof Partner, val: string) =>
    setPartners((prev) => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));

  const removePartner = (i: number) => setPartners((prev) => prev.filter((_, idx) => idx !== i));

  const addPartner = () => setPartners((prev) => [...prev, { name: "", website: "", desc: "" }]);

  const handleSave = async () => {
    setSaving(true);
    if (isSupabaseConfigured && supabase) {
      const upserts = [
        { key: "sustainability_programs", value: programs },
        { key: "sustainability_stats", value: stats },
        { key: "sustainability_commitments", value: commitments },
        { key: "sustainability_partners", value: partners },
      ];
      for (const row of upserts) {
        await supabase.from("site_settings").upsert(
          { key: row.key, value: row.value },
          { onConflict: "key" }
        );
      }
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <span className="ml-2 text-sm text-gray-400">Loading data...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Sustainability Page</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage programmes and statistics</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className={`bg-primary hover:bg-primary/90 rounded-xl gap-2 ${saved ? "!bg-green-600" : ""}`}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {/* Programs */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Impact Programmes</h2>
          <Button onClick={addProgram} variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs border-gray-200">
            <Plus className="w-3.5 h-3.5" /> Add
          </Button>
        </div>
        {programs.map((p, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Programme {i + 1}</span>
              <button onClick={() => removeProgram(i)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <Input value={p.title} onChange={(e) => updateProgram(i, "title", e.target.value)} placeholder="Programme title" className="rounded-xl bg-white" />
            <textarea value={p.description} onChange={(e) => updateProgram(i, "description", e.target.value)} rows={2} placeholder="Programme description..." className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Impact Statistics</h2>
          <Button onClick={addStat} variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs border-gray-200">
            <Plus className="w-3.5 h-3.5" /> Add
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {stats.map((s, i) => (
            <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-500">Stat {i + 1}</span>
                <button onClick={() => removeStat(i)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input value={s.value} onChange={(e) => updateStat(i, "value", e.target.value)} placeholder="12,000+" className="rounded-xl bg-white font-bold" />
                <Input value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Animals Treated" className="rounded-xl bg-white" />
              </div>
              <Input value={s.description} onChange={(e) => updateStat(i, "description", e.target.value)} placeholder="Short description..." className="rounded-xl bg-white text-sm" />
            </div>
          ))}
        </div>
      </div>

      {/* Commitments */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Commitments</h2>
          <Button onClick={() => setCommitments((prev) => [...prev, ""])} variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs border-gray-200">
            <Plus className="w-3.5 h-3.5" /> Add
          </Button>
        </div>
        <p className="text-xs text-gray-400">Responsible practice commitments shown on the sustainability page.</p>
        {commitments.map((c, i) => (
          <div key={i} className="flex items-start gap-2">
            <textarea
              value={c}
              onChange={(e) => setCommitments((prev) => prev.map((v, idx) => idx === i ? e.target.value : v))}
              rows={2}
              className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm resize-none outline-none focus:border-primary/50"
              placeholder="Enter a commitment statement..."
            />
            <button onClick={() => setCommitments((prev) => prev.filter((_, idx) => idx !== i))} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 mt-1">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* Partners */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Partners & Regulators</h2>
          <Button onClick={addPartner} variant="outline" size="sm" className="rounded-xl gap-1.5 text-xs border-gray-200">
            <Plus className="w-3.5 h-3.5" /> Add
          </Button>
        </div>
        <p className="text-xs text-gray-400">Partner organisations displayed at the bottom of the sustainability page.</p>
        {partners.length === 0 && (
          <p className="text-sm text-gray-400 italic">No partners configured yet. Click "Add" to create one.</p>
        )}
        {partners.map((p, i) => (
          <div key={i} className="p-4 bg-gray-50 rounded-xl space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Partner {i + 1}</span>
              <button onClick={() => removePartner(i)} className="text-red-400 hover:text-red-600 p-1 rounded-lg hover:bg-red-50">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input value={p.name} onChange={(e) => updatePartner(i, "name", e.target.value)} placeholder="Organisation name" className="rounded-xl bg-white" />
              <Input value={p.website} onChange={(e) => updatePartner(i, "website", e.target.value)} placeholder="https://..." className="rounded-xl bg-white" />
            </div>
            <Input value={p.desc} onChange={(e) => updatePartner(i, "desc", e.target.value)} placeholder="Short description" className="rounded-xl bg-white" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSustainability;
