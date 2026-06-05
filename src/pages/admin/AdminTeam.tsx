import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Save, Trash2, Loader2, Users, GripVertical, Upload, X } from "lucide-react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { useTeamMembers } from "@/hooks/useData";
import type { TeamMember } from "@/types/content";

const defaultTeam: TeamMember[] = [
  { id: "1", name: "Managing Director", title: "MD & Co-Founder", bio: "Leads strategic direction and operations at Ultimate Vetserve Limited.", imageUrl: "", orderIndex: 0 },
  { id: "2", name: "Head of Sales", title: "Sales & Distribution Manager", bio: "Oversees nationwide distribution and key account management.", imageUrl: "", orderIndex: 1 },
  { id: "3", name: "Technical Advisor", title: "Registered Veterinarian", bio: "Provides expert technical guidance on product selection and disease management.", imageUrl: "", orderIndex: 2 },
];

const AdminTeam = () => {
  const { members: supabaseMembers, loading } = useTeamMembers();
  const [members, setMembers] = useState<TeamMember[]>(defaultTeam);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && supabaseMembers.length > 0) {
      setMembers(supabaseMembers);
    }
  }, [loading, supabaseMembers]);

  const addMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: "", title: "", bio: "", imageUrl: "", visible: true,
      orderIndex: members.length,
    };
    setMembers((prev) => [...prev, newMember]);
  };

  const update = (id: string, key: keyof TeamMember, value: string | boolean) =>
    setMembers((prev) => prev.map((m) => m.id === id ? { ...m, [key]: value } : m));

  const remove = (id: string) => {
    if (!confirm("Remove this team member?")) return;
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const handleImageUpload = async (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !supabase) return;
    const file = e.target.files[0];
    setUploading(id);
    const ext = file.name.split(".").pop();
    const path = `team/${Date.now()}.${ext}`;
    const { data, error } = await supabase.storage.from("images").upload(path, file);
    if (error) { alert("Upload failed: " + error.message); setUploading(null); return; }
    const { data: { publicUrl } } = supabase.storage.from("images").getPublicUrl(data.path);
    update(id, "imageUrl", publicUrl);
    setUploading(null);
  };

  const handleSave = async () => {
    setSaving(true);
    if (isSupabaseConfigured && supabase) {
      const { error: delErr } = await supabase.from("team_members").delete().neq("id", "00000000-0000-0000-0000-000000000000");
      if (delErr) { setSaving(false); alert("Delete failed: " + delErr.message); return; }
      for (const m of members) {
        const { error: insErr } = await supabase.from("team_members").insert({
          name: m.name, title: m.title, bio: m.bio,
          image_url: m.imageUrl, visible: m.visible, order_index: m.orderIndex,
        });
        if (insErr) { setSaving(false); alert("Insert failed: " + insErr.message); return; }
      }
    }
    setSaving(false);
    alert("Team members saved!");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Team Members</h1>
          <p className="text-gray-400 text-sm mt-0.5">Manage team profiles shown on the About page</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={addMember} variant="outline" className="rounded-xl gap-2 border-gray-200">
            <Plus className="w-4 h-4" /> Add Member
          </Button>
          <Button onClick={handleSave} disabled={saving} className="bg-primary hover:bg-primary/90 rounded-xl gap-2">
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All
          </Button>
        </div>
      </div>

      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
          Supabase not connected. Team data won't be saved to the database.
        </div>
      )}

      <div className="space-y-4">
        {members.map((member, i) => (
          <div key={member.id} className="bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center gap-3 mb-4">
              <GripVertical className="w-5 h-5 text-gray-300 cursor-grab shrink-0" />
              <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary shrink-0">
                {i + 1}
              </div>
              <p className="font-semibold text-gray-700 text-sm flex-1">{member.name || "New Team Member"}</p>
              <button onClick={() => remove(member.id)} className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid sm:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Full Name *</label>
                <Input value={member.name} onChange={(e) => update(member.id, "name", e.target.value)} placeholder="e.g. Dr. Jane Doe" className="rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Job Title</label>
                <Input value={member.title ?? ""} onChange={(e) => update(member.id, "title", e.target.value)} placeholder="e.g. Senior Veterinarian" className="rounded-xl" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Profile Image</label>
                <div className="flex gap-2">
                  <Input value={member.imageUrl ?? ""} onChange={(e) => update(member.id, "imageUrl", e.target.value)} placeholder="https://..." className="rounded-xl flex-1 min-w-0" />
                  {isSupabaseConfigured && (
                    <label className="cursor-pointer p-2.5 rounded-xl border border-gray-200 hover:border-primary/40 text-gray-500 hover:text-primary transition-all">
                      {uploading === member.id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(member.id, e)} />
                    </label>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Visibility</label>
              <button
                type="button"
                onClick={() => update(member.id, "visible", member.visible === false ? true : false)}
                className={`relative inline-flex items-center h-7 w-12 rounded-full transition-colors ${
                  member.visible !== false ? "bg-primary" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block w-5 h-5 transform rounded-full bg-white shadow-sm transition-transform ${
                    member.visible !== false ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-xs font-bold ${member.visible !== false ? "text-green-600" : "text-red-400"}`}>
                {member.visible !== false ? "Visible on site" : "Hidden"}
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wide block mb-1.5">Bio</label>
              <textarea
                value={member.bio ?? ""}
                onChange={(e) => update(member.id, "bio", e.target.value)}
                rows={2}
                placeholder="Brief professional bio..."
                className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50"
              />
            </div>

            {member.imageUrl && (
              <div className="mt-3 relative w-14 h-14 rounded-xl overflow-hidden border border-gray-200">
                <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
                <button onClick={() => update(member.id, "imageUrl", "")} className="absolute top-0.5 right-0.5 p-0.5 bg-white/90 rounded-full">
                  <X className="w-2.5 h-2.5 text-gray-600" />
                </button>
              </div>
            )}
          </div>
        ))}

        {members.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-gray-100">
            <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 text-sm">No team members yet.</p>
            <button onClick={addMember} className="text-primary text-sm font-semibold hover:underline mt-2">Add your first team member</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTeam;
