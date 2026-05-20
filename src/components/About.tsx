import { useRef, useState } from "react";
import { Target, Eye, Award, CheckCircle2, Camera, MapPin, Phone, Mail, Upload, ImagePlus } from "lucide-react";

const commitmentValues = [
  "International pharmaceutical quality standards",
  "Regulatory compliance with Kenya Veterinary Board",
  "Cold-chain integrity for temperature-sensitive products",
  "Expert technical support for every product",
  "Transparent supply chain and ethical sourcing",
  "Ongoing investment in animal welfare research",
];

const DEFAULT_TEAM: { name: string; role: string; img: string | null }[] = [
  { name: "Dr. Jane Waweru", role: "Chief Veterinary Officer", img: null },
  { name: "Peter Otieno", role: "Head of Distribution", img: null },
  { name: "Mary Njeri", role: "Quality Assurance Lead", img: null },
  { name: "Samuel Kiptoo", role: "Field Sales Manager", img: null },
];

const DEFAULT_GALLERY: (string | null)[] = [null, null, null, null, null, null];

const ImageUploadSlot = ({
  src,
  onUpload,
  className = "",
  label = "Upload Image",
  aspectClass = "aspect-video",
}: {
  src: string | null;
  onUpload: (url: string) => void;
  className?: string;
  label?: string;
  aspectClass?: string;
}) => {
  const ref = useRef<HTMLInputElement>(null);
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    onUpload(url);
  };
  return (
    <div className={`relative group overflow-hidden rounded-2xl ${aspectClass} ${className}`}>
      {src ? (
        <img src={src} alt="" className="w-full h-full object-cover" />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex flex-col items-center justify-center gap-2">
          <ImagePlus className="w-8 h-8 text-zinc-400" />
          <span className="text-[12px] font-medium text-zinc-400">{label}</span>
        </div>
      )}
      <button
        onClick={() => ref.current?.click()}
        className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-2xl cursor-pointer"
        aria-label="Upload image"
      >
        <div className="flex flex-col items-center gap-2 text-white">
          <Upload className="w-6 h-6" />
          <span className="text-[12px] font-semibold">{src ? "Replace" : "Upload"}</span>
        </div>
      </button>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  );
};

const About = () => {
  const [heroBg, setHeroBg] = useState<string | null>(null);
  const [storyImg, setStoryImg] = useState<string | null>(null);
  const [commitmentBg, setCommitmentBg] = useState<string | null>(null);
  const [teamMembers, setTeamMembers] = useState(DEFAULT_TEAM);
  const [gallery, setGallery] = useState<(string | null)[]>(DEFAULT_GALLERY);

  const updateTeamImg = (i: number, url: string) =>
    setTeamMembers((prev) => prev.map((m, idx) => (idx === i ? { ...m, img: url } : m)));
  const updateGallery = (i: number, url: string) =>
    setGallery((prev) => prev.map((g, idx) => (idx === i ? url : g)));

  return (
    <div>
      {/* ── Hero / Story Section ───────────────────────────────── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-zinc-950">
        {/* Hero background — uploadable */}
        <div className="absolute inset-0">
          <img
            src={heroBg ?? "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1800"}
            alt=""
            className="w-full h-full object-cover object-center scale-[1.03]"
          />
          {/* Strong left overlay so text is always readable, gentle on the right */}
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/92 to-zinc-950/55" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/30" />
          <div className="absolute inset-0 bg-grid-green opacity-20" />
          {/* Decorative glow */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Upload button */}
        <label className="absolute top-5 right-5 z-20 flex items-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 text-white text-[11.5px] font-semibold px-3.5 py-2 rounded-full cursor-pointer transition-all">
          <Camera className="w-3.5 h-3.5" />
          Change Hero Image
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0]; if (f) setHeroBg(URL.createObjectURL(f));
          }} />
        </label>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — content */}
            <div className="max-w-xl">
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md border border-white/[0.14] rounded-full px-4 py-2 mb-8">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-emerald-200 font-semibold text-[12.5px] tracking-wide">Who We Are</span>
              </div>

              <h1 className="font-display text-[3rem] md:text-[4rem] font-extrabold text-white leading-[1.06] tracking-tight mb-6">
                Kenya's Premier<br />
                <span className="text-emerald-400">Veterinary Partner</span>
              </h1>

              <p className="text-zinc-300 text-[16px] leading-[1.85] mb-10 font-light">
                Ultimate Vetserve Limited is a fully licensed veterinary pharmaceutical distributor headquartered in Ngong, Kenya. We supply certified, quality-assured animal health products to veterinarians, farmers, and agrovets across 15+ counties.
              </p>

              {/* Contact chips */}
              <div className="flex flex-col gap-3">
                {[
                  { icon: MapPin, text: "Ultimate House, Oloolua, Ngong, Kenya" },
                  { icon: Phone, text: "+254 724 241542" },
                  { icon: Mail, text: "info@ultimatevetserve.com" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-3 text-zinc-300 text-[13.5px]">
                    <span className="w-8 h-8 bg-white/[0.08] border border-white/[0.12] rounded-xl flex items-center justify-center shrink-0">
                      <Icon className="w-3.5 h-3.5 text-emerald-400" />
                    </span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — story image */}
            <div className="relative hidden lg:block">
              <div className="relative">
                <ImageUploadSlot
                  src={storyImg}
                  onUpload={setStoryImg}
                  label="Upload Story Image"
                  aspectClass="aspect-[4/3]"
                  className="shadow-2xl ring-1 ring-white/10"
                />
                {/* Stats badge */}
                <div className="absolute -bottom-5 -left-5 bg-primary rounded-2xl px-6 py-4 shadow-2xl border border-primary/30">
                  <p className="font-display text-3xl font-extrabold text-white leading-none">500+</p>
                  <p className="text-emerald-200 text-xs font-semibold mt-1">Certified Products</p>
                </div>
                {/* Second badge */}
                <div className="absolute -top-4 -right-4 bg-zinc-800/90 backdrop-blur-sm border border-white/10 rounded-2xl px-5 py-3 shadow-xl">
                  <p className="font-display text-2xl font-extrabold text-emerald-400 leading-none">15+</p>
                  <p className="text-zinc-300 text-[11px] font-semibold mt-1">Counties Served</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade into next section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-50/60 to-transparent pointer-events-none" />
      </section>

      {/* ── Vision / Mission / Values ──────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-3">Our Foundation</p>
            <h2 className="font-display text-[2.4rem] md:text-[3rem] font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
              What Drives Us
            </h2>
            <p className="text-zinc-400 text-[15px] mt-3 max-w-lg mx-auto font-light">The principles that guide every product we supply and every customer we serve.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-7">
            {[
              {
                icon: Eye,
                title: "Our Vision",
                color: "text-primary",
                bg: "bg-primary/8",
                border: "border-primary/12",
                accent: "bg-primary",
                text: "To become the leading provider of veterinary pharmaceuticals in East Africa, recognized for quality, reliability, and compassionate animal healthcare solutions.",
                img: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=700",
              },
              {
                icon: Target,
                title: "Our Mission",
                color: "text-emerald-600",
                bg: "bg-emerald-50",
                border: "border-emerald-100",
                accent: "bg-emerald-500",
                text: "To provide veterinarians and animal owners with premium-quality medications and supplies, ensuring optimal health outcomes for all animals under their care.",
                img: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=700",
              },
              {
                icon: Award,
                title: "Our Values",
                color: "text-teal-600",
                bg: "bg-teal-50",
                border: "border-teal-100",
                accent: "bg-teal-500",
                text: "Quality assurance, ethical practices, customer dedication, innovation in animal healthcare, and unwavering commitment to animal welfare.",
                img: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=700",
              },
            ].map(({ icon: Icon, title, color, bg, border, accent, text, img }) => (
              <div key={title} className={`bg-white rounded-3xl border ${border} overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group`}>
                <div className="relative aspect-[16/9] overflow-hidden">
                  <img src={img} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className={`absolute top-4 left-4 w-10 h-10 ${bg} rounded-2xl border ${border} flex items-center justify-center backdrop-blur-sm`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                  </div>
                </div>
                <div className="p-7">
                  <div className={`w-8 h-1 ${accent} rounded-full mb-4`} />
                  <h3 className="font-display text-[1.2rem] font-bold text-zinc-900 mb-3">{title}</h3>
                  <p className="text-zinc-500 text-[14px] leading-relaxed">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Commitment to Excellence ───────────────────────────── */}
      <section className="relative py-24 overflow-hidden bg-zinc-950">
        {/* Commitment background — uploadable */}
        <div className="absolute inset-0">
          <img
            src={commitmentBg ?? "https://images.unsplash.com/photo-1605000797499-95a053545e58?auto=format&fit=crop&q=80&w=1600"}
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          {/* Dark base so text is always readable regardless of image brightness */}
          <div className="absolute inset-0 bg-zinc-950/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/85 to-zinc-900/70" />
          <div className="absolute inset-0 bg-grid-green opacity-15" />
          {/* Subtle left glow */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 w-[500px] h-[500px] bg-primary/8 rounded-full blur-[100px] pointer-events-none" />
        </div>
        {/* Upload button */}
        <label className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white text-[12px] font-semibold px-4 py-2 rounded-full cursor-pointer transition-all">
          <Camera className="w-4 h-4" />
          Change Background
          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
            const f = e.target.files?.[0]; if (f) setCommitmentBg(URL.createObjectURL(f));
          }} />
        </label>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-4">Our Commitment</p>
              <h2 className="font-display text-[2.4rem] md:text-[3rem] font-extrabold text-white leading-[1.1] tracking-tight mb-6 drop-shadow-sm">
                Our Commitment<br />to Excellence
              </h2>
              <p className="text-zinc-200 text-[15.5px] leading-[1.85] mb-8 font-light">
                At Ultimate Vetserve Limited, we understand that animals are more than just livestock or pets — they are family members, livelihoods, and companions. Every product we supply is held to the highest standard.
              </p>
              <ul className="space-y-3.5">
                {commitmentValues.map((v) => (
                  <li key={v} className="flex items-start gap-3">
                    <span className="mt-1 w-5 h-5 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    </span>
                    <span className="text-zinc-100 text-[14.5px] leading-relaxed font-medium">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "500+", label: "Certified Products", sub: "Across all categories" },
                { val: "1,000+", label: "Happy Customers", sub: "Farmers & vets" },
                { val: "15+", label: "Counties Covered", sub: "Nationwide delivery" },
                { val: "100%", label: "Quality Certified", sub: "KVB & KEBS compliant" },
              ].map(({ val, label, sub }) => (
                <div key={label} className="bg-white/[0.10] backdrop-blur-md border border-white/[0.18] rounded-2xl p-6 hover:bg-white/[0.15] transition-colors">
                  <p className="font-display text-[2.8rem] font-extrabold text-emerald-400 leading-none tabular-nums tracking-tight drop-shadow">{val}</p>
                  <p className="text-white font-bold text-[14px] mt-2 leading-tight">{label}</p>
                  <p className="text-zinc-300 text-[12px] mt-1 font-medium">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Section ───────────────────────────────────────── */}
      <section className="py-24 bg-zinc-50/70 border-t border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-3">The People</p>
            <h2 className="font-display text-[2.4rem] md:text-[3rem] font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
              Meet Our Team
            </h2>
            <p className="text-zinc-400 text-[15px] mt-3 max-w-md mx-auto font-light">
              Dedicated professionals committed to animal health across Kenya.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-7">
            {teamMembers.map((member, i) => (
              <div key={member.name} className="group bg-white rounded-3xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="relative">
                  <ImageUploadSlot
                    src={member.img}
                    onUpload={(url) => updateTeamImg(i, url)}
                    label="Upload Photo"
                    aspectClass="aspect-square"
                    className="rounded-none"
                  />
                </div>
                <div className="p-5">
                  <h4 className="font-display font-bold text-zinc-900 text-[15.5px]">{member.name}</h4>
                  <p className="text-primary text-[12.5px] font-semibold mt-1">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Photo Gallery ──────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-zinc-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <p className="text-[11px] font-bold text-primary uppercase tracking-[0.2em] mb-3">Gallery</p>
              <h2 className="font-display text-[2.4rem] font-extrabold text-zinc-900 tracking-tight leading-[1.1]">
                Our Facilities & Work
              </h2>
            </div>
            <p className="text-zinc-400 text-[13px] font-medium">Hover any image to upload your own photo</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {gallery.map((img, i) => (
              <ImageUploadSlot
                key={i}
                src={img}
                onUpload={(url) => updateGallery(i, url)}
                label={`Photo ${i + 1}`}
                aspectClass={i === 0 || i === 3 ? "aspect-square" : "aspect-[16/9]"}
                className={`${i === 0 ? "row-span-2" : ""} shadow-sm hover:shadow-md transition-shadow`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Certifications ─────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-zinc-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-[11px] font-bold text-zinc-400 uppercase tracking-[0.18em] mb-10">Compliance & Certifications</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {["Kenya Veterinary Board (KVB)", "Kenya Bureau of Standards (KEBS)", "Dept. of Veterinary Services", "KEPHIS", "Kenya Dairy Board"].map((name) => (
              <div key={name} className="inline-flex items-center gap-2 bg-zinc-50 border border-zinc-200 rounded-full px-5 py-2.5 text-zinc-600 hover:border-primary/30 hover:text-primary transition-colors">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-[13px] font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
