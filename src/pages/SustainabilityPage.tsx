import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Heart, Users, MapPin, Stethoscope, GraduationCap, Leaf,
  ArrowRight, ChevronRight, Phone, Globe, CheckCircle2,
  Shield, TrendingUp, Award,
} from "lucide-react";

const stats = [
  { value: "12,000+", label: "Animals Treated", description: "Through mobile clinic outreach programmes across rural Kenya", icon: Stethoscope },
  { value: "2,500+", label: "Farmers Trained", description: "In basic animal health management and disease prevention", icon: GraduationCap },
  { value: "18", label: "Counties Reached", description: "Mobile veterinary services delivered in underserved areas", icon: MapPin },
  { value: "95%", label: "Positive Outcomes", description: "Animals treated through our programmes showing full recovery", icon: TrendingUp },
];

const programs = [
  {
    icon: Stethoscope,
    title: "Mobile Veterinary Clinics",
    description: "Free and subsidised mobile clinics dispatched to remote areas lacking veterinary infrastructure. Services include disease diagnosis, vaccinations, deworming, and emergency treatments.",
    color: "bg-green-50 text-green-700 border-green-100",
  },
  {
    icon: GraduationCap,
    title: "Farmer Education & Training",
    description: "Structured training workshops teaching smallholder farmers essential animal husbandry skills — disease recognition, nutrition, biosecurity, and proper medication administration.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
  {
    icon: Heart,
    title: "Subsidised Deworming Campaigns",
    description: "Mass deworming campaigns for small ruminants in resource-limited communities using discounted ALBENSERVE boluses and oral anthelmintics to reduce parasite burden.",
    color: "bg-teal-50 text-teal-700 border-teal-100",
  },
  {
    icon: Shield,
    title: "Disease Surveillance & Reporting",
    description: "Field officers trained to identify and report outbreak-level diseases, helping the Department of Veterinary Services respond swiftly to emerging animal health threats.",
    color: "bg-lime-50 text-lime-700 border-lime-100",
  },
  {
    icon: Users,
    title: "Youth in Veterinary Agriculture",
    description: "Sponsoring university students in veterinary and animal science programmes through bursaries and internships, investing in the next generation of Kenyan animal health professionals.",
    color: "bg-green-50 text-green-700 border-green-100",
  },
  {
    icon: Leaf,
    title: "Sustainable Livestock Practices",
    description: "Promoting sustainable, low-input livestock management — rotational grazing, integrated pest management, and natural feed supplementation to reduce chemical dependency.",
    color: "bg-emerald-50 text-emerald-700 border-emerald-100",
  },
];

const partners = [
  { name: "Veterinarians with a Mission Programme (VMP)", website: "https://kenyavetsmission.org", desc: "Primary outreach partner serving pastoral communities in Kenya's ASAL regions" },
  { name: "Kenya Veterinary Board (KVB)", website: "https://kvb.go.ke", desc: "Regulatory compliance and professional standards oversight" },
  { name: "Dept. of Veterinary Services (DVS)", website: "#", desc: "Government coordination for disease surveillance and control" },
  { name: "KEPHIS", website: "https://kephis.org", desc: "Phytosanitary and agricultural regulatory body" },
  { name: "Kenya Dairy Board (KDB)", website: "#", desc: "Dairy sector quality standards and farmer support" },
  { name: "FAO Kenya", website: "https://fao.org", desc: "Food security and sustainable agriculture alignment" },
];

const commitments = [
  "Supply only fully certified and registered veterinary pharmaceuticals",
  "Maintain cold chain integrity for all temperature-sensitive products",
  "Responsible disposal and return of expired pharmaceutical products",
  "Zero tolerance for counterfeit or substandard veterinary drugs",
  "Support the Kenya Veterinary Board's efforts to combat illegal veterinary products",
  "Partner with NGOs and government to extend animal healthcare access",
];

const SustainabilityPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      {/* Hero */}
      <div className="relative min-h-[72vh] flex items-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/98 via-zinc-950/88 to-zinc-900/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-zinc-950/20" />
        <div className="absolute inset-0 bg-grid-green opacity-20" />
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="flex items-center gap-1.5 text-emerald-300/70 text-xs mb-6">
            <Link to="/" className="hover:text-emerald-300 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Sustainability</span>
          </div>
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
            <Leaf className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-100 text-sm font-medium">Our Commitment to Kenya</span>
          </div>
          <h1 className="font-display text-[3rem] md:text-[4rem] font-extrabold text-white leading-[1.05] mb-6 tracking-tight max-w-3xl">
            Healthier Animals.<br />
            <span className="text-emerald-400">Stronger Communities.</span>
          </h1>
          <p className="text-zinc-300 text-[15.5px] max-w-2xl leading-relaxed mb-10 font-light">
            At Ultimate Vetserve Limited, our responsibility extends beyond commerce. We are committed to advancing animal health, supporting veterinary professionals, and partnering with the <strong className="text-white">Veterinarians with a Mission Programme (VMP)</strong> — a Christian NGO dedicated to serving unreached pastoral communities across Kenya through professional veterinary care and the Gospel.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="https://kenyavetsmission.org" target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-primary hover:bg-primary/85 rounded-full px-8 font-bold gap-2">
                <Globe className="w-5 h-5" /> Visit VeterinariansWithAMission
              </Button>
            </a>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 rounded-full px-8 font-bold bg-transparent gap-2">
                <Heart className="w-5 h-5" /> Get Involved
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Band */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label, description, icon: Icon }) => (
              <div key={label} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl font-extrabold text-primary mb-1">{value}</p>
                <p className="font-bold text-gray-900 text-sm mb-1">{label}</p>
                <p className="text-xs text-gray-400 leading-relaxed hidden sm:block">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="flex-1">
        {/* VMP Partnership Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest block mb-3">Our Key Partnership</span>
                <h2 className="text-4xl font-extrabold text-gray-900 leading-tight mb-6">
                  Supporting the<br />
                  <span className="text-primary">Veterinarians with a Mission Programme</span>
                </h2>
                <p className="text-gray-500 leading-relaxed mb-6">
                  The <a href="https://kenyavetsmission.org" className="text-primary underline font-semibold" target="_blank" rel="noopener noreferrer">Veterinarians with a Mission Programme (VMP)</a> is a non-governmental organisation (NGO) dedicated to providing professional veterinary services in Kenya's Arid and Semi-Arid Lands (ASAL). VMP serves the unreached pastoral communities through a dual mission of professional veterinary care and sharing the love of Christ.
                </p>
                <p className="text-gray-500 leading-relaxed mb-8">
                  Through our formal partnership with VMP, Ultimate Vetserve supplies subsidised pharmaceutical products, technical expertise, and co-funds mobile veterinary clinics reaching communities in Kajiado, Narok, Machakos, Kitui, and Trans Nzoia counties — areas where veterinary infrastructure is limited and pastoralist communities depend on healthy livestock for their livelihoods.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Subsidised pharmaceuticals for VMP outreach programmes serving pastoralist communities",
                    "Joint mobile clinic events and farmer field days in Arid and Semi-Arid Lands (ASAL)",
                    "Technical training for VMP community animal health workers",
                    "Co-sponsorship of mass deworming and vaccination campaigns",
                    "Emergency veterinary response in drought-affected regions",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <a href="https://kenyavetsmission.org" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-primary hover:bg-primary/90 rounded-full px-8 gap-2">
                    Visit the VMP Programme <ArrowRight className="w-4 h-4" />
                  </Button>
                </a>
              </div>
              <div className="relative">
                <div className="rounded-3xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80&w=700"
                    alt="Veterinarians with a Mission Programme partnership"
                    className="w-full object-cover h-[480px]"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 max-w-[200px]">
                  <Award className="w-8 h-8 text-primary mb-2" />
                  <p className="font-bold text-gray-900 text-sm">Proud VMP Partner</p>
                  <p className="text-xs text-gray-400 mt-1">Supporting veterinary outreach across Kenya's ASAL regions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Programmes */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">What We Do</span>
              <h2 className="text-4xl font-extrabold text-gray-900 mt-2 mb-4">Our Impact Programmes</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm leading-relaxed">
                Six active programmes designed to extend quality animal healthcare beyond commercial reach — into the communities and farms that need it most.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map(({ icon: Icon, title, description, color }) => (
                <div key={title} className={`rounded-2xl p-6 border ${color} hover:shadow-lg transition-all duration-300 group`}>
                  <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-3">{title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Commitment */}
        <section className="py-20 bg-[#071a09]">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-14 items-center">
              <div>
                <span className="text-xs font-bold text-green-400 uppercase tracking-widest block mb-3">Responsible Business</span>
                <h2 className="text-4xl font-extrabold text-white leading-tight mb-6">
                  Our Commitment to<br />
                  <span className="text-green-400">Responsible Practice</span>
                </h2>
                <p className="text-gray-300 leading-relaxed mb-8 text-sm">
                  We hold ourselves accountable to the highest ethical and regulatory standards in the distribution of veterinary pharmaceuticals. Every product we supply is rigorously verified to protect animal welfare and public health.
                </p>
                <ul className="space-y-3">
                  {commitments.map((c) => (
                    <li key={c} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { val: "100%", label: "Registered Products", sub: "All pharmaceuticals licensed by KVB" },
                  { val: "0", label: "Counterfeits Tolerated", sub: "Zero tolerance policy enforced" },
                  { val: "5+", label: "Years in Operation", sub: "Building trust across Kenya" },
                  { val: "15+", label: "Counties Served", sub: "Nationwide distribution network" },
                ].map(({ val, label, sub }) => (
                  <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                    <p className="text-3xl font-extrabold text-green-400 mb-1">{val}</p>
                    <p className="font-bold text-white text-sm mb-1">{label}</p>
                    <p className="text-gray-400 text-xs">{sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Partners */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Ecosystem</span>
              <h2 className="text-3xl font-extrabold text-gray-900 mt-2 mb-3">Our Partners & Regulators</h2>
              <p className="text-gray-400 max-w-lg mx-auto text-sm">We work within a strong ecosystem of government bodies, NGOs, and industry organisations to uphold the highest standards.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {partners.map(({ name, website, desc }) => (
                <a
                  key={name}
                  href={website}
                  target={website !== "#" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-primary/30 hover:bg-white hover:shadow-md transition-all group"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-gray-900 text-sm group-hover:text-primary transition-colors">{name}</p>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">{desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80')] bg-cover bg-center" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <Heart className="w-12 h-12 text-white/60 mx-auto mb-6" />
            <h2 className="text-4xl font-extrabold text-white mb-5">Join the Mission</h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto mb-10 font-light">
              Whether you're a veterinary professional, a farmer, or an organisation — there are ways to support the <strong className="text-white">Veterinarians with a Mission Programme</strong> and help extend animal health access across Kenya's pastoral communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://kenyavetsmission.org" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100 rounded-full px-10 font-bold gap-2">
                  <Globe className="w-5 h-5" /> Visit VeterinariansWithAMission
                </Button>
              </a>
              <a href="tel:+254724241542">
                <Button size="lg" variant="outline" className="border-2 border-white/40 text-white hover:bg-white/10 rounded-full px-10 font-bold bg-transparent gap-2">
                  <Phone className="w-5 h-5" /> Contact Us
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SustainabilityPage;
