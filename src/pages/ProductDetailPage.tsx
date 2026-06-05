import { useState, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Syringe, Pill, FlaskConical, TestTube, ShieldCheck,
  ChevronRight, ArrowLeft, MessageCircle, Phone, Check,
  Stethoscope, Bird, PawPrint, Leaf, AlertTriangle,
  Send, Loader2, X, Package, Clock, Thermometer,
} from "lucide-react";
import { getCategoryConfig } from "@/data/products";
import { useProducts } from "@/hooks/useData";
import type { Product } from "@/types/content";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "Injectables": Syringe,
  "Boluses & De-wormers": Pill,
  "Water Solubles": FlaskConical,
  "Vaccines": TestTube,
  "Disinfectants & Salves": ShieldCheck,
};

const SPECIES_ICONS: Record<string, React.ElementType> = {
  "Cattle": Stethoscope,
  "Livestock": Leaf,
  "Poultry": Bird,
  "Pets": PawPrint,
  "General": ShieldCheck,
};

const InquiryModal = ({ product, onClose }: { product: Product; onClose: () => void }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [qty, setQty] = useState("");
  const [busy, setBusy] = useState(false);
  const cfg = getCategoryConfig(product.category);
  const Icon = CATEGORY_ICONS[product.category] ?? ShieldCheck;

  const handleSend = () => {
    setBusy(true);
    const inquiry = { name: name || "Not provided", phone: phone || "Not provided", message: `Product: ${product.name} (${product.category})\nQty: ${qty || "TBD"}`, status: "new" };
    if (isSupabaseConfigured && supabase) {
      supabase.from("inquiries").insert(inquiry).then().catch(() => {});
    }
    fetch(`${API_URL}/api/contact`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...inquiry, email: "info@ultimatevetserve.com", subject: `Product Inquiry: ${product.name}` }),
    }).catch(() => {});
    const msg = encodeURIComponent(
      `Product Inquiry - Ultimate Vetserve Limited\n\nProduct: ${product.name} (${product.category})\nQuantity: ${qty || "TBD"}\nName: ${name || "Not provided"}\nPhone: ${phone || "N/A"}\n\nSent via UltimateVetserve.com`
    );
    window.open(`https://wa.me/254724241542?text=${msg}`, "_blank");
    setBusy(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-8">
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
          <X className="w-4 h-4 text-gray-400" />
        </button>
        <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
          <MessageCircle className="w-6 h-6 text-primary" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Professional Inquiry</h3>
        <p className="text-gray-400 text-sm mb-5">Submit an inquiry for <span className="font-semibold text-gray-700">{product.name}</span></p>
        <div className={`flex items-center gap-3 ${cfg.bg} rounded-xl px-4 py-3 mb-5 border border-black/5`}>
          <Icon className={`w-5 h-5 shrink-0 ${cfg.color}`} />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-gray-800 text-sm truncate">{product.name}</p>
            <p className="text-xs text-gray-400">{product.category}</p>
          </div>
          <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0 ${product.stock === "In Stock" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
            {product.stock}
          </span>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Your Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Dr. John Mwangi" className="rounded-xl bg-gray-50 border-gray-200" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Phone Number</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7XX XXX XXX" className="rounded-xl bg-gray-50 border-gray-200" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1.5">Quantity / Volume</label>
            <Input value={qty} onChange={(e) => setQty(e.target.value)} placeholder="e.g. 10 units, 5 L, bulk" className="rounded-xl bg-gray-50 border-gray-200" />
          </div>
        </div>
        <div className="flex gap-3 mt-6">
          <Button variant="outline" onClick={onClose} className="flex-1 rounded-xl border-gray-200">Cancel</Button>
          <Button onClick={handleSend} disabled={busy} className="flex-1 bg-primary hover:bg-primary/90 rounded-xl font-bold">
            {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4 mr-1.5" />Send Inquiry</>}
          </Button>
        </div>
      </div>
    </div>
  );
};

const TABS = ["Overview", "Dosage & Administration", "Storage & Safety"];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [showInquiry, setShowInquiry] = useState(false);
  const { products } = useProducts();

  const product = products.find((p) => p.id === id && p.visible !== false);
  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.id !== product.id && p.category === product.category && p.visible !== false)
      .slice(0, 3);
  }, [product, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-3xl font-bold text-gray-700 mb-3">Product Not Found</h1>
          <p className="text-gray-400 mb-8 max-w-md">This product doesn't exist or may have been removed from our catalog.</p>
          <Link to="/products">
            <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">Back to Catalog</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const cfg = getCategoryConfig(product.category);
  const CatIcon = CATEGORY_ICONS[product.category] ?? ShieldCheck;

  // Category-specific background images for the banner
  const CATEGORY_BANNERS: Record<string, string> = {
    "Injectables": "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&q=80&w=1600",
    "Boluses & De-wormers": "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=1600",
    "Water Solubles": "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=1600",
    "Vaccines": "https://images.unsplash.com/photo-1576201836163-49758479d1b4?auto=format&fit=crop&q=80&w=1600",
    "Disinfectants & Salves": "https://images.unsplash.com/photo-1605000797499-95a053545e58?auto=format&fit=crop&q=80&w=1600",
  };
  const bannerImg = CATEGORY_BANNERS[product.category] ?? "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1600";

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Navigation />

      {/* Full-bleed Product Banner */}
      <div className="relative bg-zinc-950 py-14 text-white overflow-hidden">
        <div className="absolute inset-0" style={{ backgroundImage: `url(${bannerImg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/98 via-zinc-950/90 to-zinc-900/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/75 via-transparent to-zinc-950/20" />
        <div className="absolute inset-0 bg-grid-green opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <nav className="flex items-center gap-1.5 text-xs text-emerald-300/70 mb-6">
            <Link to="/" className="hover:text-emerald-300 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/products" className="hover:text-emerald-300 transition-colors">Products</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to={`/products?category=${product.categorySlug}`} className="hover:text-emerald-300 transition-colors">{product.category}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium truncate">{product.name}</span>
          </nav>
          <div className="flex items-start gap-5">
            <div className={`w-14 h-14 ${cfg.bg} rounded-2xl flex items-center justify-center shrink-0 border border-white/10`}>
              <CatIcon className={`w-7 h-7 ${cfg.color}`} />
            </div>
            <div>
              <p className={`text-[10.5px] font-bold uppercase tracking-[0.18em] mb-2 ${cfg.color}`}>{product.category}</p>
              <h1 className="font-display text-[2.2rem] md:text-[3rem] font-extrabold text-white leading-[1.08] tracking-tight mb-2">{product.name}</h1>
              {product.activeIngredient && (
                <p className="text-zinc-300 text-[14px]"><span className="font-semibold text-zinc-400">Active: </span>{product.activeIngredient}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-10">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to Products
        </button>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-5 gap-8 mb-10">
          {/* Product Image */}
          <div className="lg:col-span-2">
            <div className={`rounded-3xl ${cfg.bg} aspect-square flex flex-col items-center justify-center border border-black/5 relative overflow-hidden`}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover rounded-3xl" />
              ) : (
                <div className={`w-full h-full ${cfg.bg}`} />
              )}
              {/* Category bar */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${cfg.bar}`} />
            </div>

            {/* Species chips */}
            <div className="mt-4 p-4 bg-white rounded-2xl border border-gray-100">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Species Compatibility</p>
              <div className="flex flex-wrap gap-2">
                {product.species.map((sp) => {
                  const SpIcon = SPECIES_ICONS[sp] ?? Leaf;
                  return (
                    <span key={sp} className="flex items-center gap-1.5 bg-green-50 text-green-700 border border-green-100 rounded-full px-3 py-1.5 text-xs font-semibold">
                      <SpIcon className="w-3.5 h-3.5" />
                      {sp}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-3 flex flex-col">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${cfg.bg} ${cfg.color}`}>
                {product.category}
              </span>
              <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                product.stock === "In Stock"  ? "bg-green-100 text-green-700" :
                product.stock === "Available" ? "bg-amber-100 text-amber-700" :
                                                "bg-red-100 text-red-700"
              }`}>
                {product.stock}
              </span>
              <span className="text-[11px] bg-gray-100 text-gray-500 rounded-full px-2.5 py-1 font-medium">{product.form}</span>
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4 leading-tight">{product.name}</h1>

            {product.activeIngredient && (
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Active Ingredient:</span> {product.activeIngredient}</p>
              </div>
            )}

            <p className="text-gray-500 leading-relaxed mb-6 text-[15px]">{product.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 font-medium">{tag}</span>
              ))}
            </div>

            {/* CTA Area */}
            <div className="mt-auto space-y-3">
              <Button
                onClick={() => setShowInquiry(true)}
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 rounded-2xl py-6 text-base font-bold gap-2"
              >
                <MessageCircle className="w-5 h-5" />
                Professional Inquiry
              </Button>
              <a href="tel:+254724241542" className="block">
                <Button variant="outline" size="lg" className="w-full rounded-2xl py-6 text-base font-bold border-gray-200 gap-2">
                  <Phone className="w-5 h-5 text-primary" />
                  Call Sales: +254 724 241542
                </Button>
              </a>
              <p className="text-center text-xs text-gray-400 pt-1">
                Product availability subject to stock levels. Contact us for bulk pricing.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden mb-10">
          {/* Tab headers */}
          <div className="flex border-b border-gray-100 overflow-x-auto">
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all border-b-2 ${
                  activeTab === i
                    ? "border-primary text-primary bg-primary/3"
                    : "border-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="p-8">
            {activeTab === 0 && (
              <div className="prose prose-sm max-w-none text-gray-600">
                <p className="text-[15px] leading-relaxed">
                  {product.fullDescription || product.description}
                </p>
              </div>
            )}

            {activeTab === 1 && (
              <div className="space-y-6">
                {product.dosage ? (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Dosage & Administration</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{product.dosage}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Contact our sales team for detailed dosage information for this product.</p>
                )}
                {product.withdrawalPeriod && (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Withdrawal Period</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{product.withdrawalPeriod}</p>
                    </div>
                  </div>
                )}
                <div className="mt-4 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-amber-700 text-sm">Always follow dosage instructions precisely. Consult a licensed veterinarian before use. Adhere to all withdrawal periods before slaughter or milk collection.</p>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className="space-y-6">
                {product.storageInfo ? (
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                      <Thermometer className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-800 mb-2">Storage Conditions</h4>
                      <p className="text-gray-500 text-sm leading-relaxed">{product.storageInfo}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Contact our sales team for storage information.</p>
                )}
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { icon: Check, text: "Keep all veterinary pharmaceuticals out of reach of children" },
                    { icon: Check, text: "Do not use products past their expiry date" },
                    { icon: Check, text: "Store vaccines and temperature-sensitive products in a refrigerator" },
                    { icon: Check, text: "Dispose of used syringes and containers safely" },
                  ].map(({ icon: Icon, text }) => (
                    <div key={text} className="flex gap-2.5 p-3 rounded-xl bg-gray-50">
                      <Icon className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Related Products</h2>
              <Link to={`/products?category=${product.categorySlug}`} className="text-sm font-semibold text-primary hover:underline flex items-center gap-1">
                View all <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rp) => {
                const rcfg = getCategoryConfig(rp.category);
                const RIcon = CATEGORY_ICONS[rp.category] ?? ShieldCheck;
                return (
                  <Link key={rp.id} to={`/products/${rp.id}`} className="bg-white rounded-2xl border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group overflow-hidden flex flex-col">
                    <div className={`h-1 w-full ${rcfg.bar}`} />
                    <div className="p-5 flex flex-col flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className={`w-10 h-10 ${rcfg.bg} rounded-xl flex items-center justify-center shrink-0`}>
                          <RIcon className={`w-5 h-5 ${rcfg.color}`} />
                        </div>
                        <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${rp.stock === "In Stock" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
                          {rp.stock}
                        </span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-[14px] group-hover:text-primary transition-colors mb-1">{rp.name}</h3>
                      <p className="text-gray-400 text-xs leading-relaxed line-clamp-2 flex-1">{rp.description}</p>
                      <div className="mt-3 flex items-center text-xs font-semibold text-primary gap-1">
                        View Details <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </main>

      <Footer />
      {showInquiry && <InquiryModal product={product} onClose={() => setShowInquiry(false)} />}
    </div>
  );
};

export default ProductDetailPage;
