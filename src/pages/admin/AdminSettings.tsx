import { useState, useEffect, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Loader2, Check, Globe, Home, Info, Leaf, Image, Upload, X, Phone, Heart, Plus } from "lucide-react";
import { supabase, isSupabaseConfigured, uploadImage, db } from "@/lib/supabase";

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
  stat1Val: "500+", stat1Label: "Products", stat1Sub: "Registered Products · Pharmaceutical catalog",
  stat2Val: "1,000+", stat2Label: "Customers", stat2Sub: "Customers Served · Vets, farmers & clinics",
  stat3Val: "15+", stat3Label: "Counties", stat3Sub: "Counties Covered · Nationwide distribution",
  stat4Val: "100%", stat4Label: "Certified", stat4Sub: "Quality Certified · KVB & KEBS compliant",
  whyBadge: "Our Commitment",
  whyTitle: "Why Choose Ultimate Vetserve?",
  whySubtitle: "Committed to excellence in veterinary pharmaceuticals across every product we supply.",
  speciesBadge: "Browse by Animal",
  speciesTitle: "Find Products for Your Animals",
  featuredBadge: "Our Products",
  featuredTitle: "Featured Products",
  featuredSubtitle: "Click any product to view full details and place a professional inquiry.",
  newsBadge: "Stay Informed",
  newsTitle: "News & Insights",
  newsSubtitle: "The latest in veterinary health management, product updates, and company news.",
  complianceTitle: "Compliant With & Trusted By",
  complianceLogos: JSON.stringify(["Kenya Veterinary Board (KVB)","Kenya Bureau of Standards (KEBS)","Dept. of Veterinary Services","KEPHIS","Kenya Dairy Board"]),
  promoBadge: "Nationwide Delivery Available",
  promoTiltle: "Premium Veterinary Pharmaceuticals Delivered",
  promoDesc: "Browse our comprehensive catalog of certified injectables, vaccines, dewormers, and nutritional supplements. Fast dispatch, cold-chain maintained.",
  promoBtn: "Browse Catalog",
  promoBtn2: "Call Sales",
  ctaBadge: "Join the Community",
  ctaTitle: "Ready to Provide Better Care?",
  ctaDesc: "Join veterinarians and farmers across Kenya who trust Ultimate Vetserve Limited.",
  ctaBtn: "Contact Us Now",
  ctaBtn2: "Call Sales",
};

const defaultAbout = {
  title: "About Ultimate Vetserve Limited",
  subtitle: "Your trusted partner in veterinary pharmaceutical supply across Kenya.",
  heroImage: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1800",
  storyImage: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=700",
  statsBadge: "Our Reach",
  statsTitle: "Serving the Nation",
  statsSubtitle: "From Kajiado to Kisumu, we deliver quality veterinary products across all 47 counties.",
  commitmentBadge: "Our Values",
  commitmentTitle: "Built on Trust and Expertise",
  commitmentSubtitle: "Four core values that guide everything we do, every day.",
  teamBadge: "Our Team",
  teamTitle: "Meet the People Behind Ultimate Vetserve",
  teamSubtitle: "Committed to providing excellent service and quality veterinary products.",
  galleryBadge: "Our Gallery",
  galleryTitle: "A Glimpse Into Our Work",
  gallerySubtitle: "Moments from our operations, events, and partnerships.",
  commitmentBg: "https://images.unsplash.com/photo-1605000797499-95a053545e58?auto=format&fit=crop&q=80&w=1600",
  heroTitle: "About Us",
  heroSubtitle: "Learn about our commitment to veterinary excellence, animal welfare, and pharmaceutical standards across Kenya.",
  storyTitle: "Our Story",
  storyText: "Ultimate Vetserve Limited was established to provide veterinarians and livestock farmers with premium-quality, regulated veterinary pharmaceuticals and supplies. Based in Ngong, Kajiado County, we serve customers across Kenya with a product range of over 500 registered veterinary medicines.",
  vision: "To become the leading provider of veterinary pharmaceuticals in East Africa, recognized for quality, reliability, and compassionate animal healthcare solutions.",
  mission: "To provide veterinarians and animal owners with premium-quality medications and supplies, ensuring optimal health outcomes for all animals under their care.",
  values: "Quality assurance, ethical practices, customer dedication, innovation in animal healthcare, and unwavering commitment to animal welfare.",
  stat1Val: "500+", stat1Label: "Certified Products",
  stat2Val: "15+", stat2Label: "Counties Served",
  commitmentValues: JSON.stringify([
    "International pharmaceutical quality standards",
    "Regulatory compliance with Kenya Veterinary Board",
    "Cold-chain integrity for temperature-sensitive products",
    "Expert technical support for every product",
    "Transparent supply chain and ethical sourcing",
    "Ongoing investment in animal welfare research",
  ]),
};

const defaultSustainability = {
  heroImage: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1600",
  heroTitle: "Healthier Animals. Stronger Communities.",
  heroSubtitle: "Our commitment to advancing animal health and supporting veterinary professionals across Kenya.",
  heroBadge: "Our Commitment to Kenya",
  heroParagraph: "At Ultimate Vetserve Limited, our responsibility extends beyond commerce. We are committed to advancing animal health, supporting veterinary professionals, and partnering with the Veterinarians with a Mission Programme (VMP) — a Christian NGO dedicated to serving unreached pastoral communities across Kenya through professional veterinary care and the Gospel.",
  missionTitle: "Our Sustainability Mission",
  missionText: "We believe that access to quality veterinary care should not be limited by geography or income. Through our programmes and partnerships, we actively work to extend animal health services beyond commercial boundaries into the communities that need them most.",
  kvmTitle: "Kenya Veterinary Mission Partnership",
  kvmText: "Ultimate Vetserve is a proud partner of Kenya Veterinary Mission (kenyavetsmission.org), supporting their outreach programmes with subsidised pharmaceuticals, technical expertise, and co-funding of mobile veterinary clinics.",
  vmpTitle: "Supporting the Veterinarians with a Mission Programme",
  vmpSubtitle: "Our Key Partnership",
  vmpParagraph1: "The Veterinarians with a Mission Programme (VMP) is a non-governmental organisation (NGO) dedicated to providing professional veterinary services in Kenya's Arid and Semi-Arid Lands (ASAL). VMP serves the unreached pastoral communities through a dual mission of professional veterinary care and sharing the love of Christ.",
  vmpParagraph2: "Through our formal partnership with VMP, Ultimate Vetserve supplies subsidised pharmaceutical products, technical expertise, and co-funds mobile veterinary clinics reaching communities in Kajiado, Narok, Machakos, Kitui, and Trans Nzoia counties — areas where veterinary infrastructure is limited and pastoralist communities depend on healthy livestock for their livelihoods.",
  vmpImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=700",
  vmpBullets: JSON.stringify([
    "Subsidised pharmaceuticals for VMP outreach programmes serving pastoralist communities",
    "Joint mobile clinic events and farmer field days in Arid and Semi-Arid Lands (ASAL)",
    "Technical training for VMP community animal health workers",
    "Co-sponsorship of mass deworming and vaccination campaigns",
    "Emergency veterinary response in drought-affected regions",
  ]),
  programsSectionTitle: "Our Impact Programmes",
  programsSectionSubtitle: "Six active programmes designed to extend quality animal healthcare beyond commercial reach — into the communities and farms that need it most.",
  commitmentSectionTitle: "Our Commitment to Responsible Practice",
  commitmentSectionSubtitle: "We hold ourselves accountable to the highest ethical and regulatory standards in the distribution of veterinary pharmaceuticals. Every product we supply is rigorously verified to protect animal welfare and public health.",
  commitmentSectionBadge: "Responsible Business",
  commitmentStats: JSON.stringify([
    { val: "100%", label: "Registered Products", sub: "All pharmaceuticals licensed by KVB" },
    { val: "0", label: "Counterfeits Tolerated", sub: "Zero tolerance policy enforced" },
    { val: "5+", label: "Years in Operation", sub: "Building trust across Kenya" },
    { val: "15+", label: "Counties Served", sub: "Nationwide distribution network" },
  ]),
  partners: JSON.stringify([
    { name: "Veterinarians with a Mission Programme (VMP)", website: "https://kenyavetsmission.org", desc: "Primary outreach partner serving pastoral communities in Kenya's ASAL regions" },
    { name: "Kenya Veterinary Board (KVB)", website: "https://kvb.go.ke", desc: "Regulatory compliance and professional standards oversight" },
    { name: "Dept. of Veterinary Services (DVS)", website: "#", desc: "Government coordination for disease surveillance and control" },
    { name: "KEPHIS", website: "https://kephis.org", desc: "Phytosanitary and agricultural regulatory body" },
    { name: "Kenya Dairy Board (KDB)", website: "#", desc: "Dairy sector quality standards and farmer support" },
    { name: "FAO Kenya", website: "https://fao.org", desc: "Food security and sustainable agriculture alignment" },
  ]),
  ctaTitle: "Join the Mission",
  ctaText: "Whether you're a veterinary professional, a farmer, or an organisation — there are ways to support the Veterinarians with a Mission Programme and help extend animal health access across Kenya's pastoral communities.",
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
  mapImage: "https://images.unsplash.com/photo-1524668951403-d44b28200ce9?auto=format&fit=crop&q=80&w=800",
};

const Field = ({ label, children, hint }: { label: string; children: ReactNode; hint?: string }) => (
  <div>
    <label className="text-xs font-bold text-gray-500 uppercase tracking-wide block mb-1.5">{label}</label>
    {children}
    {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
  </div>
);

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
  const [loadingSettings, setLoadingSettings] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoadingSettings(false);
      return;
    }
    supabase.from("site_settings").select("*").then(({ data }) => {
      if (data) {
        for (const row of data) {
          if (row.key === "homepage") setHomepage((prev) => ({ ...prev, ...row.value }));
          if (row.key === "about") setAbout((prev) => ({ ...prev, ...row.value }));
          if (row.key === "sustainability") setSustainability((prev) => ({ ...prev, ...row.value }));
          if (row.key === "contact") setContact((prev) => ({ ...prev, ...row.value }));
          if (row.key === "species_cards") setSpeciesCards(row.value);
          if (row.key === "commitment_cards") setCommitmentCards(row.value);
        }
      }
      setLoadingSettings(false);
    });
  }, []);

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

      {loadingSettings && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <span className="ml-2 text-sm text-gray-400">Loading settings...</span>
        </div>
      )}

      {!loadingSettings && !isSupabaseConfigured && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-sm text-amber-700">
          <strong>Note:</strong> Supabase not connected. Connect it to persist settings to your database.
        </div>
      )}

      {!loadingSettings && <>
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
                <div key={n} className="flex flex-col gap-2 p-3 border border-gray-100 rounded-xl">
                  <div className="flex gap-2 items-center">
                    <Input value={(homepage as Record<string, string>)[`stat${n}Val`]} onChange={(e) => setHomepage((p) => ({ ...p, [`stat${n}Val`]: e.target.value }))} placeholder="500+" className="rounded-xl w-24 shrink-0" />
                    <Input value={(homepage as Record<string, string>)[`stat${n}Label`]} onChange={(e) => setHomepage((p) => ({ ...p, [`stat${n}Label`]: e.target.value }))} placeholder="Products" className="rounded-xl flex-1" />
                  </div>
                  <Input value={(homepage as Record<string, string>)[`stat${n}Sub`]} onChange={(e) => setHomepage((p) => ({ ...p, [`stat${n}Sub`]: e.target.value }))} placeholder="Pharmaceutical catalog · Subsidiary line" className="rounded-xl text-xs text-gray-400" />
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Compliance Logos</h2>
            <Field label="Section Title">
              <Input value={homepage.complianceTitle} onChange={(e) => setHomepage((p) => ({ ...p, complianceTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Organization Names">
              {(() => {
                let logos: string[];
                try {
                  const parsed = JSON.parse(homepage.complianceLogos ?? "null");
                  logos = Array.isArray(parsed) ? parsed : [];
                } catch { logos = []; }
                const updateLogo = (idx: number, val: string) => {
                  const next = [...logos];
                  next[idx] = val;
                  setHomepage((p) => ({ ...p, complianceLogos: JSON.stringify(next) }));
                };
                const addLogo = () => setHomepage((p) => ({ ...p, complianceLogos: JSON.stringify([...logos, ""]) }));
                const removeLogo = (idx: number) => setHomepage((p) => ({ ...p, complianceLogos: JSON.stringify(logos.filter((_, i) => i !== idx)) }));
                return (
                  <div className="space-y-2">
                    {logos.map((v, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Input value={v} onChange={(e) => updateLogo(i, e.target.value)} placeholder="e.g. Kenya Veterinary Board (KVB)" className="rounded-xl text-sm flex-1" />
                        <button type="button" onClick={() => removeLogo(i)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 shrink-0"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                    <Button type="button" onClick={addLogo} variant="outline" size="sm" className="rounded-xl gap-1 text-xs border-gray-200"><Plus className="w-3.5 h-3.5" /> Add Organization</Button>
                  </div>
                );
              })()}
            </Field>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Promo Banner</h2>
            <Field label="Badge">
              <Input value={homepage.promoBadge} onChange={(e) => setHomepage((p) => ({ ...p, promoBadge: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Title (HTML allowed)">
              <Input value={homepage.promoTiltle} onChange={(e) => setHomepage((p) => ({ ...p, promoTiltle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Description">
              <textarea value={homepage.promoDesc} onChange={(e) => setHomepage((p) => ({ ...p, promoDesc: e.target.value }))} rows={3} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Button 1 Text">
                <Input value={homepage.promoBtn} onChange={(e) => setHomepage((p) => ({ ...p, promoBtn: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Button 2 Text">
                <Input value={homepage.promoBtn2} onChange={(e) => setHomepage((p) => ({ ...p, promoBtn2: e.target.value }))} className="rounded-xl" />
              </Field>
            </div>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Section Headings</h2>
            <Field label="Why Choose Us — Badge">
              <Input value={homepage.whyBadge} onChange={(e) => setHomepage((p) => ({ ...p, whyBadge: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Why Choose Us — Title">
              <Input value={homepage.whyTitle} onChange={(e) => setHomepage((p) => ({ ...p, whyTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Why Choose Us — Subtitle">
              <Input value={homepage.whySubtitle} onChange={(e) => setHomepage((p) => ({ ...p, whySubtitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <hr className="border-gray-100" />
            <Field label="Species Section — Badge">
              <Input value={homepage.speciesBadge} onChange={(e) => setHomepage((p) => ({ ...p, speciesBadge: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Species Section — Title">
              <Input value={homepage.speciesTitle} onChange={(e) => setHomepage((p) => ({ ...p, speciesTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <hr className="border-gray-100" />
            <Field label="Featured Products — Badge">
              <Input value={homepage.featuredBadge} onChange={(e) => setHomepage((p) => ({ ...p, featuredBadge: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Featured Products — Title">
              <Input value={homepage.featuredTitle} onChange={(e) => setHomepage((p) => ({ ...p, featuredTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Featured Products — Subtitle">
              <Input value={homepage.featuredSubtitle} onChange={(e) => setHomepage((p) => ({ ...p, featuredSubtitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <hr className="border-gray-100" />
            <Field label="News Section — Badge">
              <Input value={homepage.newsBadge} onChange={(e) => setHomepage((p) => ({ ...p, newsBadge: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="News Section — Title">
              <Input value={homepage.newsTitle} onChange={(e) => setHomepage((p) => ({ ...p, newsTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="News Section — Subtitle">
              <Input value={homepage.newsSubtitle} onChange={(e) => setHomepage((p) => ({ ...p, newsSubtitle: e.target.value }))} className="rounded-xl" />
            </Field>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Final CTA Section</h2>
            <Field label="Badge">
              <Input value={homepage.ctaBadge} onChange={(e) => setHomepage((p) => ({ ...p, ctaBadge: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Title (HTML allowed)">
              <Input value={homepage.ctaTitle} onChange={(e) => setHomepage((p) => ({ ...p, ctaTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Description">
              <textarea value={homepage.ctaDesc} onChange={(e) => setHomepage((p) => ({ ...p, ctaDesc: e.target.value }))} rows={3} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Button 1 Text">
                <Input value={homepage.ctaBtn} onChange={(e) => setHomepage((p) => ({ ...p, ctaBtn: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Button 2 Text">
                <Input value={homepage.ctaBtn2} onChange={(e) => setHomepage((p) => ({ ...p, ctaBtn2: e.target.value }))} className="rounded-xl" />
              </Field>
            </div>
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
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Hero Banner</h2>
            <Field label="Hero Background Image URL">
              <Input value={about.heroImage ?? ""} onChange={(e) => setAbout((p) => ({ ...p, heroImage: e.target.value }))} placeholder="https://..." className="rounded-xl" />
            </Field>
            {about.heroImage && (
              <div className="relative h-32 rounded-xl overflow-hidden bg-gray-100">
                <img src={about.heroImage} alt="Hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-xs font-medium">Current hero background</p>
              </div>
            )}
            <label className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
              <Upload className="w-4 h-4" /> Upload Hero Image
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAbout((p) => ({ ...p, heroImage: URL.createObjectURL(file) }));
              }} />
            </label>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Story Image</h2>
            <Field label="Story Image URL">
              <Input value={about.storyImage ?? ""} onChange={(e) => setAbout((p) => ({ ...p, storyImage: e.target.value }))} placeholder="https://..." className="rounded-xl" />
            </Field>
            {about.storyImage && (
              <div className="relative h-32 rounded-xl overflow-hidden bg-gray-100">
                <img src={about.storyImage} alt="Story" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-xs font-medium">Current story image</p>
              </div>
            )}
            <label className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
              <Upload className="w-4 h-4" /> Upload Story Image
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAbout((p) => ({ ...p, storyImage: URL.createObjectURL(file) }));
              }} />
            </label>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Commitment Section Background</h2>
            <Field label="Commitment Background Image URL">
              <Input value={about.commitmentBg ?? ""} onChange={(e) => setAbout((p) => ({ ...p, commitmentBg: e.target.value }))} placeholder="https://..." className="rounded-xl" />
            </Field>
            {about.commitmentBg && (
              <div className="relative h-32 rounded-xl overflow-hidden bg-gray-100">
                <img src={about.commitmentBg} alt="Commitment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-xs font-medium">Current commitment background</p>
              </div>
            )}
            <label className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
              <Upload className="w-4 h-4" /> Upload Commitment Background
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setAbout((p) => ({ ...p, commitmentBg: URL.createObjectURL(file) }));
              }} />
            </label>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Page Content</h2>
            {[
              ["title", "Page Title"], ["subtitle", "Page Subtitle"],
              ["heroTitle", "Hero Title"], ["heroSubtitle", "Hero Subtitle"],
              ["storyTitle", "Story Section Title"],
              ["storyText", "Story Text", 4],
              ["vision", "Our Vision", 3],
              ["mission", "Our Mission", 3],
              ["values", "Our Values", 3],
            ].map(([key, label]) => (
              <Field key={key} label={label as string}>
                <Input value={(about as Record<string, string>)[key]} onChange={(e) => setAbout((p) => ({ ...p, [key]: e.target.value }))} className="rounded-xl" />
              </Field>
            ))}
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Section Headings</h2>
            <div className="grid gap-4">
              <Field label="Stats — Badge">
                <Input value={about.statsBadge} onChange={(e) => setAbout((p) => ({ ...p, statsBadge: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Stats — Title">
                <Input value={about.statsTitle} onChange={(e) => setAbout((p) => ({ ...p, statsTitle: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Stats — Subtitle">
                <Input value={about.statsSubtitle} onChange={(e) => setAbout((p) => ({ ...p, statsSubtitle: e.target.value }))} className="rounded-xl" />
              </Field>
              <hr className="border-gray-100" />
              <Field label="Commitment — Badge">
                <Input value={about.commitmentBadge} onChange={(e) => setAbout((p) => ({ ...p, commitmentBadge: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Commitment — Title">
                <Input value={about.commitmentTitle} onChange={(e) => setAbout((p) => ({ ...p, commitmentTitle: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Commitment — Subtitle">
                <Input value={about.commitmentSubtitle} onChange={(e) => setAbout((p) => ({ ...p, commitmentSubtitle: e.target.value }))} className="rounded-xl" />
              </Field>
              <hr className="border-gray-100" />
              <Field label="Team — Badge">
                <Input value={about.teamBadge} onChange={(e) => setAbout((p) => ({ ...p, teamBadge: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Team — Title">
                <Input value={about.teamTitle} onChange={(e) => setAbout((p) => ({ ...p, teamTitle: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Team — Subtitle">
                <Input value={about.teamSubtitle} onChange={(e) => setAbout((p) => ({ ...p, teamSubtitle: e.target.value }))} className="rounded-xl" />
              </Field>
              <hr className="border-gray-100" />
              <Field label="Gallery — Badge">
                <Input value={about.galleryBadge} onChange={(e) => setAbout((p) => ({ ...p, galleryBadge: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Gallery — Title">
                <Input value={about.galleryTitle} onChange={(e) => setAbout((p) => ({ ...p, galleryTitle: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Gallery — Subtitle">
                <Input value={about.gallerySubtitle} onChange={(e) => setAbout((p) => ({ ...p, gallerySubtitle: e.target.value }))} className="rounded-xl" />
              </Field>
            </div>
          </div>

          {/* About Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Stats (Hero Story Section)</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Stat 1 — Value">
                <Input value={about.stat1Val ?? "500+"} onChange={(e) => setAbout((p) => ({ ...p, stat1Val: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Stat 1 — Label">
                <Input value={about.stat1Label ?? "Certified Products"} onChange={(e) => setAbout((p) => ({ ...p, stat1Label: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Stat 2 — Value">
                <Input value={about.stat2Val ?? "15+"} onChange={(e) => setAbout((p) => ({ ...p, stat2Val: e.target.value }))} className="rounded-xl" />
              </Field>
              <Field label="Stat 2 — Label">
                <Input value={about.stat2Label ?? "Counties Served"} onChange={(e) => setAbout((p) => ({ ...p, stat2Label: e.target.value }))} className="rounded-xl" />
              </Field>
            </div>
          </div>

          {/* Commitment Values */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Commitment Values</h2>
            <p className="text-xs text-gray-500">These appear in the Commitment to Excellence section on the About page.</p>
            {(() => {
              let vals: string[];
              try {
                const parsed = JSON.parse(about.commitmentValues ?? "null");
                vals = Array.isArray(parsed) ? parsed : [];
              } catch { vals = []; }
              const updateVals = (idx: number, val: string) => {
                const next = [...vals];
                next[idx] = val;
                setAbout((p: Record<string, string>) => ({ ...p, commitmentValues: JSON.stringify(next) }));
              };
              const addVal = () => {
                setAbout((p: Record<string, string>) => {
                  const current = JSON.parse(p.commitmentValues ?? "[]") as string[];
                  return { ...p, commitmentValues: JSON.stringify([...current, ""]) };
                });
              };
              const removeVal = (idx: number) => {
                setAbout((p: Record<string, string>) => {
                  const current = JSON.parse(p.commitmentValues ?? "[]") as string[];
                  return { ...p, commitmentValues: JSON.stringify(current.filter((_, i) => i !== idx)) };
                });
              };
              return (
                <div className="space-y-2">
                  {vals.map((v, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <Input value={v} onChange={(e) => updateVals(i, e.target.value)} placeholder="Enter a commitment value..." className="rounded-xl text-sm flex-1" />
                      <button type="button" onClick={() => removeVal(i)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 mt-1 shrink-0"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  <Button type="button" onClick={addVal} variant="outline" size="sm" className="rounded-xl gap-1 text-xs border-gray-200"><Plus className="w-3.5 h-3.5" /> Add Value</Button>
                </div>
              );
            })()}
          </div>

          {/* Gallery Images */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Gallery Images</h2>
            <p className="text-xs text-gray-500">Manage up to 6 gallery images displayed on the About page.</p>
            {(() => {
              let galleryArr: string[];
              try {
                const parsed = JSON.parse(about.gallery ?? "null");
                galleryArr = Array.isArray(parsed) ? parsed : ["", "", "", "", "", ""];
              } catch { galleryArr = ["", "", "", "", "", ""]; }
              const updateGallery = (idx: number, val: string) => {
                const next = [...galleryArr];
                next[idx] = val;
                setAbout((p: Record<string, string>) => ({ ...p, gallery: JSON.stringify(next) }));
              };
              return (
                <div className="grid md:grid-cols-2 gap-4">
                  {galleryArr.map((url, i) => (
                    <div key={i} className="space-y-2">
                      <label className="text-xs font-medium text-gray-500">Image {i + 1}</label>
                      <div className="flex gap-2 items-start">
                        <div className="flex-1">
                          <Input value={url} onChange={(e) => updateGallery(i, e.target.value)} placeholder="https://..." className="rounded-xl text-xs" />
                        </div>
                        {isSupabaseConfigured && (
                          <label className="cursor-pointer flex items-center gap-1.5 px-3 py-2 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-xs text-gray-500 hover:border-primary/40 hover:bg-primary/3 transition-all shrink-0">
                            <Upload className="w-3.5 h-3.5" />
                            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) updateGallery(i, URL.createObjectURL(file));
                            }} />
                          </label>
                        )}
                      </div>
                      {url && (
                        <div className="relative h-24 rounded-xl overflow-hidden bg-gray-100">
                          <img src={url} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
                          <button type="button" onClick={() => updateGallery(i, "")} className="absolute top-1.5 right-1.5 w-6 h-6 bg-red-500/80 hover:bg-red-500 text-white rounded-full flex items-center justify-center transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })()}
          </div>
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
        <div className="space-y-5">
          {/* Hero Banner */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Hero Banner</h2>
            <Field label="Hero Background Image URL">
              <Input value={sustainability.heroImage ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, heroImage: e.target.value }))} placeholder="https://..." className="rounded-xl" />
            </Field>
            {sustainability.heroImage && (
              <div className="relative h-32 rounded-xl overflow-hidden bg-gray-100">
                <img src={sustainability.heroImage} alt="Sustainability hero" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-xs font-medium">Current hero background</p>
              </div>
            )}
            <label className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
              <Upload className="w-4 h-4" /> Upload Hero Image
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setSustainability((p) => ({ ...p, heroImage: URL.createObjectURL(file) }));
              }} />
            </label>
            <Field label="Hero Badge Text (e.g. 'Our Commitment to Kenya')">
              <Input value={sustainability.heroBadge ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, heroBadge: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Hero Title">
              <Input value={sustainability.heroTitle ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, heroTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Hero Paragraph">
              <textarea value={sustainability.heroParagraph ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, heroParagraph: e.target.value }))} rows={4} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
          </div>

          {/* VMP Partnership Section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">VMP Partnership Section</h2>
            <Field label="Section Badge (e.g. 'Our Key Partnership')">
              <Input value={sustainability.vmpSubtitle ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, vmpSubtitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Section Title">
              <Input value={sustainability.vmpTitle ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, vmpTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Paragraph 1">
              <textarea value={sustainability.vmpParagraph1 ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, vmpParagraph1: e.target.value }))} rows={3} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
            <Field label="Paragraph 2">
              <textarea value={sustainability.vmpParagraph2 ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, vmpParagraph2: e.target.value }))} rows={3} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
            <Field label="VMP Bullet Points (JSON array)">
              {(() => {
                let bullets: string[];
                try { bullets = JSON.parse(sustainability.vmpBullets ?? "[]"); } catch { bullets = []; }
                const updateBullet = (idx: number, val: string) => {
                  const next = [...bullets]; next[idx] = val;
                  setSustainability((p) => ({ ...p, vmpBullets: JSON.stringify(next) }));
                };
                const addBullet = () => {
                  setSustainability((p) => ({ ...p, vmpBullets: JSON.stringify([...bullets, ""]) }));
                };
                const removeBullet = (idx: number) => {
                  setSustainability((p) => ({ ...p, vmpBullets: JSON.stringify(bullets.filter((_, i) => i !== idx)) }));
                };
                return (
                  <div className="space-y-2">
                    {bullets.map((b, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Input value={b} onChange={(e) => updateBullet(i, e.target.value)} placeholder="Bullet point..." className="rounded-xl text-sm flex-1" />
                        <button type="button" onClick={() => removeBullet(i)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 mt-1 shrink-0"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                    <Button type="button" onClick={addBullet} variant="outline" size="sm" className="rounded-xl gap-1 text-xs border-gray-200"><Plus className="w-3.5 h-3.5" /> Add Bullet</Button>
                  </div>
                );
              })()}
            </Field>
            <Field label="VMP Image URL">
              <Input value={sustainability.vmpImage ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, vmpImage: e.target.value }))} placeholder="https://..." className="rounded-xl" />
            </Field>
            {sustainability.vmpImage && (
              <div className="relative h-28 rounded-xl overflow-hidden bg-gray-100">
                <img src={sustainability.vmpImage} alt="VMP" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <p className="absolute bottom-2 left-3 text-white text-xs font-medium">Current VMP image</p>
              </div>
            )}
            <label className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
              <Upload className="w-4 h-4" /> Upload VMP Image
              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setSustainability((p) => ({ ...p, vmpImage: URL.createObjectURL(file) }));
              }} />
            </label>
          </div>

          {/* Programs Section Headings */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Programs Section Headings</h2>
            <Field label="Section Title">
              <Input value={sustainability.programsSectionTitle ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, programsSectionTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Section Subtitle">
              <textarea value={sustainability.programsSectionSubtitle ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, programsSectionSubtitle: e.target.value }))} rows={2} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
          </div>

          {/* Commitment Section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Commitment Section (Dark Background)</h2>
            <Field label="Section Badge (e.g. 'Responsible Business')">
              <Input value={sustainability.commitmentSectionBadge ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, commitmentSectionBadge: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Section Title">
              <Input value={sustainability.commitmentSectionTitle ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, commitmentSectionTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="Section Subtitle">
              <textarea value={sustainability.commitmentSectionSubtitle ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, commitmentSectionSubtitle: e.target.value }))} rows={2} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
            <Field label="Right Column Stats (JSON array of {val, label, sub})">
              {(() => {
                let stats: Array<{val: string; label: string; sub: string}>;
                try { stats = JSON.parse(sustainability.commitmentStats ?? "[]"); } catch { stats = []; }
                const updateStat = (idx: number, key: string, val: string) => {
                  const next = [...stats]; next[idx] = { ...next[idx], [key]: val };
                  setSustainability((p) => ({ ...p, commitmentStats: JSON.stringify(next) }));
                };
                const addStat = () => {
                  setSustainability((p) => ({ ...p, commitmentStats: JSON.stringify([...stats, { val: "", label: "", sub: "" }]) }));
                };
                const removeStat = (idx: number) => {
                  setSustainability((p) => ({ ...p, commitmentStats: JSON.stringify(stats.filter((_, i) => i !== idx)) }));
                };
                return (
                  <div className="space-y-3">
                    {stats.map((s, i) => (
                      <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                        <div className="flex-1 space-y-2">
                          <div className="grid grid-cols-2 gap-2">
                            <Input value={s.val} onChange={(e) => updateStat(i, "val", e.target.value)} placeholder="100%" className="rounded-xl text-sm font-bold" />
                            <Input value={s.label} onChange={(e) => updateStat(i, "label", e.target.value)} placeholder="Label" className="rounded-xl text-sm" />
                          </div>
                          <Input value={s.sub} onChange={(e) => updateStat(i, "sub", e.target.value)} placeholder="Subtitle" className="rounded-xl text-sm" />
                        </div>
                        <button type="button" onClick={() => removeStat(i)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 mt-1 shrink-0"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                    <Button type="button" onClick={addStat} variant="outline" size="sm" className="rounded-xl gap-1 text-xs border-gray-200"><Plus className="w-3.5 h-3.5" /> Add Stat</Button>
                  </div>
                );
              })()}
            </Field>
          </div>

          {/* Partners */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Partners & Regulators</h2>
            {(() => {
              let partners: Array<{name: string; website: string; desc: string}>;
              try { partners = JSON.parse(sustainability.partners ?? "[]"); } catch { partners = []; }
              const updatePartner = (idx: number, key: string, val: string) => {
                const next = [...partners]; next[idx] = { ...next[idx], [key]: val };
                setSustainability((p) => ({ ...p, partners: JSON.stringify(next) }));
              };
              const addPartner = () => {
                setSustainability((p) => ({ ...p, partners: JSON.stringify([...partners, { name: "", website: "", desc: "" }]) }));
              };
              const removePartner = (idx: number) => {
                setSustainability((p) => ({ ...p, partners: JSON.stringify(partners.filter((_, i) => i !== idx)) }));
              };
              return (
                <div className="space-y-3">
                  {partners.map((p, i) => (
                    <div key={i} className="flex items-start gap-2 p-3 bg-gray-50 rounded-xl">
                      <div className="flex-1 space-y-2">
                        <div className="grid grid-cols-2 gap-2">
                          <Input value={p.name} onChange={(e) => updatePartner(i, "name", e.target.value)} placeholder="Partner name" className="rounded-xl text-sm" />
                          <Input value={p.website} onChange={(e) => updatePartner(i, "website", e.target.value)} placeholder="https://..." className="rounded-xl text-sm" />
                        </div>
                        <Input value={p.desc} onChange={(e) => updatePartner(i, "desc", e.target.value)} placeholder="Short description" className="rounded-xl text-sm" />
                      </div>
                      <button type="button" onClick={() => removePartner(i)} className="text-red-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 mt-1 shrink-0"><X className="w-3.5 h-3.5" /></button>
                    </div>
                  ))}
                  <Button type="button" onClick={addPartner} variant="outline" size="sm" className="rounded-xl gap-1 text-xs border-gray-200"><Plus className="w-3.5 h-3.5" /> Add Partner</Button>
                </div>
              );
            })()}
          </div>

          {/* CTA Section */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
            <h2 className="font-bold text-gray-900 text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Call-to-Action Section</h2>
            <Field label="CTA Title">
              <Input value={sustainability.ctaTitle ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, ctaTitle: e.target.value }))} className="rounded-xl" />
            </Field>
            <Field label="CTA Text">
              <textarea value={sustainability.ctaText ?? ""} onChange={(e) => setSustainability((p) => ({ ...p, ctaText: e.target.value }))} rows={3} className="w-full px-3 py-2.5 bg-white border border-input rounded-xl text-sm resize-none outline-none focus:border-primary/50" />
            </Field>
          </div>
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
          <Field label="Footer Map Background Image URL">
            <Input value={contact.mapImage ?? ""} onChange={(e) => setContact((p) => ({ ...p, mapImage: e.target.value }))} placeholder="https://..." className="rounded-xl" />
          </Field>
          {contact.mapImage && (
            <div className="relative h-32 rounded-xl overflow-hidden bg-gray-100">
              <img src={contact.mapImage} alt="Footer map" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <p className="absolute bottom-2 left-3 text-white text-xs font-medium">Current map background</p>
            </div>
          )}
          <label className="cursor-pointer flex items-center gap-2 w-fit px-4 py-2.5 bg-gray-50 border border-dashed border-gray-300 rounded-xl text-sm text-gray-600 hover:border-primary/40 hover:bg-primary/3 transition-all">
            <Upload className="w-4 h-4" /> Upload Map Image
            <input type="file" accept="image/*" className="hidden" onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setContact((p) => ({ ...p, mapImage: URL.createObjectURL(file) }));
            }} />
          </label>
        </div>
      )}
      </>}
    </div>
  );
};

export default AdminSettings;
