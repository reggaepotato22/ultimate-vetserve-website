import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2, Check, Globe, Home, Info, Leaf, Image, Upload, X, Phone, Heart } from "lucide-react";
import { isSupabaseConfigured, uploadImage, db } from "@/lib/supabase";

const TABS = [
  { id: "homepage", label: "Homepage", icon: Home },
  { id: "species", label: "Species Cards", icon: Image },
  { id: "about", label: "About Page", icon: Info },
  { id: "commitment", label: "Commitment Cards", icon: Heart },
  { id: "sustainability", label: "Sustainability", icon: Leaf },
  { id: "contact", label: "Contact Info", icon: Globe },
];

type SpeciesCard = { name: string; tag: string; count: string; image: string };
type CommitmentCard = { title: string; description: string; image: string; icon: string };

const defaultSpeciesCards: SpeciesCard[] = [
  { name: "Cattle & Livestock", tag: "Antibiotics · Antiparasitic · Nutrition", count: "12+ Products", image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=700" },
  { name: "Poultry", tag: "Vaccines · Vitamins · Treatments", count: "8+ Products", image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=700" },
  { name: "Companion Pets", tag: "Antiparasitic · Vitamins · Care", count: "5+ Products", image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=700" },
  { name: "General Use", tag: "Disinfectants · Supplements", count: "3+ Products", image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=700" },
];

const defaultHomepage = {
  heroTitle: "Your Trusted Partner in Veterinary Excellence",
  heroTitleAccent: "Veterinary Excellence",
  heroSubtitle: "Premium veterinary pharmaceuticals for livestock, poultry, and companion animals across Kenya.",
  heroBadge: "Kenya's Most Trusted Vet Pharma Supplier",
  ctaPrimary: "Browse Products",
  ctaSecondary: "Contact Sales",
  stat1Val: "500+", stat1Label: "Products",
  stat2Val: "1,000+", stat2Label: "Customers",
  stat3Val: "15+", stat3Label: "Counties",
  stat4Val: "100%", stat4Label: "Certified",
  whyTitle: "Why Choose Ultimate Vetserve?",
  whySubtitle: "Four reasons thousands of vets and farmers across Kenya trust us.",
  newsTitle: "News & Insights",
  newsSubtitle: "Stay informed on the latest in veterinary health management.",
};

const defaultAbout = {
  heroTitle: "About Us",
  heroSubtitle: "Learn about our commitment to veterinary excellence, animal welfare, and pharmaceutical standards across Kenya.",
  storyTitle: "Our Story",
  storyText: "Ultimate Vetserve Limited was established to provide veterinarians and livestock farmers with premium-quality, regulated veterinary pharmaceuticals and supplies. Based in Ngong, Kajiado County, we serve customers across Kenya with a product range of over 500 registered veterinary medicines.",
  vision: "To become the leading provider of veterinary pharmaceuticals in East Africa, recognized for quality, reliability, and compassionate animal healthcare solutions.",
  mission: "To provide veterinarians and animal owners with premium-quality medications and supplies, ensuring optimal health outcomes for all animals under their care.",
  values: "Quality assurance, ethical practices, customer dedication, innovation in animal healthcare, and unwavering commitment to animal welfare.",
  teamTitle: "Meet Our Team",
  teamSubtitle: "Dedicated professionals with deep expertise in veterinary pharmaceuticals.",
};

const defaultSustainability = {
  heroTitle: "Healthier Animals. Stronger Communities.",
  heroSubtitle: "Our commitment to advancing animal health and supporting veterinary professionals across Kenya.",
  missionTitle: "Our Sustainability Mission",
  missionText: "We believe that access to quality veterinary care should not be limited by geography or income. Through our programmes and partnerships, we actively work to extend animal health services beyond commercial boundaries into the communities that need them most.",
  kvmTitle: "Kenya Veterinary Mission Partnership",
  kvmText: "Ultimate Vetserve is a proud partner of Kenya Veterinary Mission (kenyavetsmission.org), supporting their outreach programmes with subsidised pharmaceuticals, technical expertise, and co-funding of mobile veterinary clinics.",
};

const defaultCommitmentCards: CommitmentCard[] = [
  { title: "Certified Quality", description: "Every product is registered with the Kenya Veterinary Board and meets KEBS international standards before it reaches your hands.", image: "https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?auto=format&fit=crop&q=80&w=600", icon: "BadgeCheck" },
  { title: "Nationwide Delivery", description: "Consistent stock availability and rapid cold-chain delivery to veterinary professionals across 15+ Kenyan counties.", image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600", icon: "Truck" },
  { title: "Expert Guidance", description: "Our trained veterinary pharmaceutical specialists provide professional support on product selection and disease management.", image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600", icon: "HeartPulse" },
];

const defaultContact = {
  phone: "+254 724 241542",
  email: "info@ultimatevetserve.com",
  address: "Ultimate House, Oloolua, Ngong, Kajiado County, Kenya",
  hours: "Mon–Fri 8am–5pm | Sat 8am–1pm",
  heroImage: "https://images.unsplash.com/photo-1596526134530-727856838726?auto=format&fit=crop&q=80&w=1600",
};

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState("homepage");
  const [homepage, setHomepage] = useState(defaultHomepage);
  const [about, setAbout] = useState(defaultAbout);
  const [sustainability, setSustainability] = useState(defaultSustainability);
  const [contact, setContact] = useState(defaultContact);
  const [speciesCards, setSpeciesCards] = useState<SpeciesCard[]>(defaultSpeciesCards);
  const [commitmentCards, setCommitmentCards] = useState<CommitmentCard[]>(defaultCommitmentCards);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const updateSpecies = (i: number, key: keyof SpeciesCard, val: string) =>
    setSpeciesCards((prev) => prev.map((c, idx) => idx === i ? { ...c, [key]: val } : c));

  const updateCommitment = (i: number, key: keyof CommitmentCard, val: string) =>
    setCommitmentCards((prev) => prev.map((c, idx) => idx === i ? { ...c, [key]: val } : c));

  const handleSpeciesImageUpload = async (i: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingIdx(i);
    try {
      const url = await uploadImage(file, 'species');
      updateSpecies(i, "image", url);
    } catch (err: unknown) {
      alert("Upload failed: " + (err instanceof Error ? err.message : String(err)));
    } finally {
      setUploadingIdx(null);
    }
  };

  const save = async () => {
    setSaving(true);
    setSaved(false);

    if (isSupabaseConfigured) {
      const upserts = [
        { key: "homepage", value: homepage },
        { key: "about", value: about },
        { key: "sustainability", value: sustainability },
        { key: "contact", value: contact },
        { key: "species_cards", value: speciesCards },
        { key: "commitment_cards", value: commitmentCards },
      ];
      for (const row of upserts) {
        await db.settings()?.upsert({ key: row.key, value: row.value }, { onConflict: "key" });
      }
    }

    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const Field = ({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) => (
    <div>
      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{label}</label>
      {children}
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-900">Site Settings</h1>
          <p className="text-gray-400 text-sm mt-0.5">Edit content for all pages</p>
        </div>
        <Button
          onClick={save}
          disabled={saving}
          className={`bg-primary hover:bg-primary/90 rounded-xl gap-2 ${saved ? "!bg-green-600" : ""}`}
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </Button>
      </div>

      {!isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
          <strong>Note:</strong> Supabase not connected. Connect it to persist settings to your database.
        </div>
      )}

      {/* Tab Header */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              activeTab === id ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Icon className="w-3.5 h-3.5" />{label}
          </button>
        ))}
      </div>

      {/* Homepage */}
      {activeTab === "homepage" && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Hero Section</h2>
            <Field label="Top Badge Text">
              <Input value={homepage.heroBadge} onChange={(e) => setHomepage((p) => ({ ...p, heroBadge: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Hero Title">
              <Input value={homepage.heroTitle} onChange={(e) => setHomepage((p) => ({ ...p, heroTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Hero Subtitle">
              <textarea value={homepage.heroSubtitle} onChange={(e) => setHomepage((p) => ({ ...p, heroSubtitle: e.target.value }))} rows={3} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Primary CTA Button Text">
                <Input value={homepage.ctaPrimary} onChange={(e) => setHomepage((p) => ({ ...p, ctaPrimary: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Secondary CTA Button Text">
                <Input value={homepage.ctaSecondary} onChange={(e) => setHomepage((p) => ({ ...p, ctaSecondary: e.target.value }))} className="rounded-xl" />
              </Field>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Stats Ticker</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="flex gap-2">
                  <Input value={(homepage as Record<string, string>)[`stat${n}Val`]} onChange={(e) => setHomepage((p) => ({ ...p, [`stat${n}Val`]: e.target.value }))} placeholder="500+" className="rounded-xl w-24 shrink-0" />
                  <Input value={(homepage as Record<string, string>)[`stat${n}Label`]} onChange={(e) => setHomepage((p) => ({ ...p, [`stat${n}Label`]: e.target.value }))} placeholder="Products" className="rounded-xl flex-1" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Section Headings</h2>
            <Field label="Why Choose Us — Title">
              <Input value={homepage.whyTitle} onChange={(e) => setHomepage((p) => ({ ...p, whyTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Why Choose Us — Subtitle">
              <Input value={homepage.whySubtitle} onChange={(e) => setHomepage((p) => ({ ...p, whySubtitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="News Section Title">
              <Input value={homepage.newsTitle} onChange={(e) => setHomepage((p) => ({ ...p, newsTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="News Section Subtitle">
              <Input value={homepage.newsSubtitle} onChange={(e) => setHomepage((p) => ({ ...p, newsSubtitle: e.target.value }))} className="rounded-xl" />
            </Field>
          </div>
        </div>
      )}

      {/* Species Cards */}
      {activeTab === "species" && (
        <div className="space-y-5">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            These images appear in the <strong>"Find Products for Your Animals"</strong> section on the homepage. Upload a new photo or paste a direct image URL for each animal category.
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {speciesCards.map((card, i) => (
              <div key={card.name} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Preview */}
                <div className="relative h-40 bg-gray-100">
                  {card.image ? (
                    <img src={card.image} alt={card.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Image className="w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-3">
                    <p className="text-white font-black text-lg leading-tight">{card.name}</p>
                    <p className="text-white/70 text-xs">{card.count}</p>
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <Field label="Category Name">
                    <Input value={card.name} onChange={(e) => updateSpecies(i, "name", e.target.value)} className="rounded-xl" />
                  </Field>
                  <Field label="Tag Line (shown as subtitle)">
                    <Input value={card.tag} onChange={(e) => updateSpecies(i, "tag", e.target.value)} className="rounded-xl" />
                  </Field>
                  <Field label="Product Count Badge">
                    <Input value={card.count} onChange={(e) => updateSpecies(i, "count", e.target.value)} placeholder="e.g. 12+ Products" className="rounded-xl" />
                  </Field>
                  <Field label="Image URL">
                    <Input value={card.image} onChange={(e) => updateSpecies(i, "image", e.target.value)} placeholder="https://..." className="rounded-xl" />
                  </Field>
                  {isSupabaseConfigured && (
                    <div>
                      <label className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
                        {uploadingIdx === i ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                        {uploadingIdx === i ? "Uploading..." : "Upload Photo"}
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => handleSpeciesImageUpload(i, e)} disabled={uploadingIdx !== null} />
                      </label>
                    </div>
                  )}
                  {card.image && (
                    <button onClick={() => updateSpecies(i, "image", "")} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600">
                      <X className="w-3.5 h-3.5" /> Remove image
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* About */}
      {activeTab === "about" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">About Page Content</h2>
          {[
            ["heroTitle", "Page Hero Title"], ["heroSubtitle", "Hero Subtitle"],
            ["storyTitle", "Company Story Section Title"],
          ].map(([key, label]) => (
            <Field key={key} label={label}>
              <Input value={(about as Record<string, string>)[key]} onChange={(e) => setAbout((p) => ({ ...p, [key]: e.target.value }))} className="rounded-xl" />
            </Field>
          ))}
          {[
            ["storyText", "Company Story Text", 4],
            ["vision", "Our Vision", 3],
            ["mission", "Our Mission", 3],
            ["values", "Our Values", 3],
          ].map(([key, label, rows]) => (
            <Field key={key} label={label as string}>
              <textarea value={(about as Record<string, string>)[key]} onChange={(e) => setAbout((p) => ({ ...p, [key]: e.target.value }))} rows={rows as number} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
          ))}
        </div>
      )}

      {/* Commitment Cards */}
      {activeTab === "commitment" && (
        <div className="space-y-5">
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-sm text-blue-700">
            These cards appear in the <strong>"Our Commitment"</strong> section on the homepage, featuring background images for visual appeal. Upload or paste image URLs for each item.
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {commitmentCards.map((card, i) => (
              <div key={card.title} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {/* Preview */}
                <div className="relative h-36 bg-gray-100">
                  {card.image ? (
                    <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <Image className="w-10 h-10" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white font-black text-lg leading-tight">{card.title}</p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <Field label="Title">
                    <Input value={card.title} onChange={(e) => updateCommitment(i, "title", e.target.value)} className="rounded-xl" />
                  </Field>
                  <Field label="Description">
                    <textarea value={card.description} onChange={(e) => updateCommitment(i, "description", e.target.value)} rows={3} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
                  </Field>
                  <Field label="Background Image URL">
                    <Input value={card.image} onChange={(e) => updateCommitment(i, "image", e.target.value)} placeholder="https://..." className="rounded-xl" />
                  </Field>
                  {isSupabaseConfigured && (
                    <div>
                      <label className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
                        <Upload className="w-4 h-4" /> Upload Background
                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) updateCommitment(i, "image", URL.createObjectURL(file));
                        }} />
                      </label>
                    </div>
                  )}
                  {card.image && (
                    <button onClick={() => updateCommitment(i, "image", "")} className="flex items-center gap-1.5 text-xs text-red-400 hover:text-red-600">
                      <X className="w-3.5 h-3.5" /> Remove image
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sustainability */}
      {activeTab === "sustainability" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Sustainability Page Content</h2>
          {[
            ["heroTitle", "Hero Title", 1], ["heroSubtitle", "Hero Subtitle", 2],
            ["missionTitle", "Mission Section Title", 1], ["missionText", "Mission Text", 3],
            ["kvmTitle", "KVM Section Title", 1], ["kvmText", "KVM Description", 4],
          ].map(([key, label, rows]) => (
            <Field key={key} label={label as string}>
              {(rows as number) > 1 ? (
                <textarea value={(sustainability as Record<string, string>)[key]} onChange={(e) => setSustainability((p) => ({ ...p, [key]: e.target.value }))} rows={rows as number} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
              ) : (
                <Input value={(sustainability as Record<string, string>)[key]} onChange={(e) => setSustainability((p) => ({ ...p, [key]: e.target.value }))} className="rounded-xl" />
              )}
            </Field>
          ))}
        </div>
      )}

      {/* Contact */}
      {activeTab === "contact" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Contact Information</h2>
          {[
            ["phone", "Phone Number"], ["email", "Email Address"],
            ["address", "Physical Address"], ["hours", "Business Hours"],
          ].map(([key, label]) => (
            <Field key={key} label={label}>
              <Input value={(contact as Record<string, string>)[key]} onChange={(e) => setContact((p) => ({ ...p, [key]: e.target.value }))} className="rounded-xl" />
            </Field>
          ))}
          <Field label="Contact Page Hero Image URL">
            <Input value={contact.heroImage} onChange={(e) => setContact((p) => ({ ...p, heroImage: e.target.value }))} placeholder="https://..." className="rounded-xl" />
          </Field>
          {contact.heroImage && (
            <div className="relative h-40 rounded-xl overflow-hidden bg-gray-100">
              <img src={contact.heroImage} alt="Contact hero" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <p className="absolute bottom-3 left-3 text-white text-xs font-medium">Current hero background</p>
            </div>
          )}
          <label className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
            <Upload className="w-4 h-4" /> Upload New Hero Image
            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setContact((p) => ({ ...p, heroImage: URL.createObjectURL(file) }));
            }} />
          </label>
        </div>
      )}
    </div>
  );
};

export default AdminSettings;
