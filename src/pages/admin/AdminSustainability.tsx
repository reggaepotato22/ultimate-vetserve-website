import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2, Check, Plus, Trash2 } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

type Program = { title: string; description: string; icon: string };
type Stat = { value: string; label: string; description: string };

const defaultPrograms: Program[] = [
  { title: "Mobile Veterinary Clinics", description: "Free and subsidised mobile clinics dispatched to remote areas.", icon: "Stethoscope" },
  { title: "Farmer Education", description: "Structured training workshops for smallholder farmers.", icon: "GraduationCap" },
  { title: "Deworming Campaigns", description: "Mass deworming for small ruminants in resource-limited communities.", icon: "Heart" },
];

const defaultStats: Stat[] = [
  { value: "12,000+", label: "Animals Treated", description: "Through mobile clinic outreach programmes" },
  { value: "2,500+", label: "Farmers Trained", description: "In basic animal health management" },
  { value: "18", label: "Counties Reached", description: "Mobile veterinary services delivered" },
  { value: "95%", label: "Positive Outcomes", description: "Animals showing full recovery" },
];

const AdminSustainability = () => {
  const [programs, setPrograms] = useState<Program[]>(defaultPrograms);
  const [stats, setStats] = useState<Stat[]>(defaultStats);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateProgram = (i: number, key: keyof Program, val: string) =>
    setPrograms((prev) => prev.map((p, idx) => idx === i ? { ...p, [key]: val } : p));

  const removeProgram = (i: number) => setPrograms((prev) => prev.filter((_, idx) => idx !== i));

  const addProgram = () => setPrograms((prev) => [...prev, { title: "", description: "", icon: "Leaf" }]);

  const updateStat = (i: number, key: keyof Stat, val: string) =>
    setStats((prev) => prev.map((s, idx) => idx === i ? { ...s, [key]: val } : s));

  const removeStat = (i: number) => setStats((prev) => prev.filter((_, idx) => idx !== i));

  const addStat = () => setStats((prev) => [...prev, { value: "", label: "", description: "" }]);

  const handleSave = async () => {
    setSaving(true);
    if (isSupabaseConfigured && supabase) {
      await supabase.from("site_settings").upsert(
        { key: "sustainability_programs", value: programs },
        { onConflict: "key" }
      );
      await supabase.from("site_settings").upsert(
        { key: "sustainability_stats", value: stats },
        { onConflict: "key" }
      );
    }
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
    </div>
  );
};

export default AdminSustainability;
