import { useState, useMemo, useRef, type ReactNode } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { allProducts, getCategoryConfig } from "@/data/products";
import type { Product } from "@/types/content";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Syringe, Pill, FlaskConical, TestTube, ShieldCheck,
  Search, Filter, X, ChevronDown, ChevronUp, ChevronRight,
  Stethoscope, Bird, PawPrint, Leaf,
  MessageCircle, Phone, Send, Loader2, ArrowRight, Check,
  ShoppingBag, Plus, Minus, Trash2, ClipboardList, Upload, ImagePlus,
  PackageCheck, BadgeCheck, Camera,
  type LucideIcon,
} from "lucide-react";

const VetIcon = Stethoscope;

// ─── Category icon map (local to this page) ───────────────────────────────────
const CATEGORY_ICONS: Record<string, LucideIcon> = {
  "Injectables": Syringe,
  "Boluses & De-wormers": Pill,
  "Water Solubles": FlaskConical,
  "Vaccines": TestTube,
  "Disinfectants & Salves": ShieldCheck,
};

const speciesFilters = [
  { name: "All",      icon: null },
  { name: "Cattle",   icon: Stethoscope },
  { name: "Livestock",icon: Leaf },
  { name: "Poultry",  icon: Bird },
  { name: "Pets",     icon: PawPrint },
  { name: "General",  icon: ShieldCheck },
];
const categoryFilters = Object.keys(CATEGORY_ICONS);
const formFilters     = ["Injectable", "Bolus", "Powder", "Vaccine", "Liquid", "Topical"];
const stockFilters    = ["In Stock", "Available"];

// ─── Types ─────────────────────────────────────────────────────────────────────
type BasketItem = { product: Product; qty: number };

// ─── Image upload slot for product cards ──────────────────────────────────────
const ProductImageSlot = ({ src, onUpload, category }: { src?: string | null; onUpload: (url: string) => void; category: string }) => {
  const ref = useRef<HTMLInputElement>(null);
  const cfg = getCategoryConfig(category);
  return (
    <div className="relative group aspect-[4/3] overflow-hidden bg-gradient-to-br from-zinc-100 to-zinc-50 cursor-pointer" onClick={() => ref.current?.click()}>
      {src ? (
        <img src={src} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      ) : (
        <div className={`w-full h-full flex flex-col items-center justify-center gap-2 ${cfg.bg}`}>
          <ImagePlus className={`w-10 h-10 ${cfg.color} opacity-50`} />
          <span className="text-[11px] font-semibold text-zinc-400">Add Product Image</span>
        </div>
      )}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <div className="flex items-center gap-2 bg-white/90 rounded-full px-4 py-2 text-[12px] font-bold text-zinc-800">
          <Camera className="w-3.5 h-3.5" />
          {src ? "Replace Image" : "Upload Image"}
        </div>
      </div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={(e) => {
        const f = e.target.files?.[0]; if (f) onUpload(URL.createObjectURL(f));
      }} />
    </div>
  );
};

// ─── Inquiry Modal (Single Product) ───────────────────────────────────────────
const InquiryModal = ({ product, onClose, onAddToBasket }: { product: Product | null; onClose: () => void; onAddToBasket: (p: Product, qty: number) => void }) => {
  const [name, setName]       = useState("");
  const [phone, setPhone]     = useState("");
  const [clinic, setClinic]   = useState("");
  const [qty, setQty]         = useState("1");
  const [notes, setNotes]     = useState("");
  const [busy, setBusy]       = useState(false);
  const [sent, setSent]       = useState(false);

  if (!product) return null;
  const cfg = getCategoryConfig(product.category);
  const Icon = CATEGORY_ICONS[product.category] ?? ShieldCheck;

  const handleSend = () => {
    setBusy(true);
    const lines = [
      `🐾 *VETERINARY PRODUCT INQUIRY*`,
      `📋 *Ultimate Vetserve Limited*`,
      ``,
      `*━━ PRODUCT DETAILS ━━*`,
      `📦 *Product:* ${product.name}`,
      `🏷️ *Category:* ${product.category}`,
      product.activeIngredient ? `💊 *Active Ingredient:* ${product.activeIngredient}` : null,
      `📊 *Availability:* ${product.stock}`,
      product.dosage ? `💉 *Standard Dosage:* ${product.dosage}` : null,
      ``,
      `*━━ INQUIRY DETAILS ━━*`,
      `👤 *Client Name:* ${name || "Not provided"}`,
      clinic ? `🏥 *Clinic / Farm:* ${clinic}` : null,
      `📞 *Contact:* ${phone || "Not provided"}`,
      `📦 *Quantity Required:* ${qty} unit(s)`,
      notes ? `📝 *Additional Notes:*\n${notes}` : null,
      ``,
      `_Sent via UltimateVetserve.com_`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/254724241542?text=${encodeURIComponent(lines)}`, "_blank");
    setSent(true);
    setBusy(false);
    setTimeout(() => { setSent(false); onClose(); }, 2000);
  };

  const handleAddBasket = () => {
    onAddToBasket(product, parseInt(qty) || 1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-t-3xl relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-green opacity-20" />
          <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10">
            <X className="w-4 h-4 text-white" />
          </button>
          <div className="relative z-10 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/15 rounded-2xl flex items-center justify-center shrink-0">
              <VetIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-emerald-200 text-[11px] font-bold uppercase tracking-wider">Veterinary Inquiry</p>
              <h3 className="text-white font-display text-xl font-bold leading-tight">{product.name}</h3>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Product summary chip */}
          <div className={`flex items-center gap-3 ${cfg?.bg ?? "bg-zinc-50"} rounded-2xl px-4 py-3.5 mb-6 border border-black/[0.05]`}>
            <div className={`w-10 h-10 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm`}>
              <Icon className={`w-5 h-5 ${cfg?.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-zinc-800 text-[14px] truncate">{product.name}</p>
              <p className="text-zinc-400 text-[12px]">{product.category}{product.activeIngredient ? ` · ${product.activeIngredient}` : ""}</p>
            </div>
            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
              product.stock === "In Stock" ? "bg-emerald-100 text-emerald-700" :
              product.stock === "Available" ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-700"
            }`}>{product.stock}</span>
          </div>

          {sent ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-emerald-600" />
              </div>
              <p className="font-bold text-zinc-800 text-lg">Inquiry Sent!</p>
              <p className="text-zinc-400 text-sm mt-1">Redirecting to WhatsApp…</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide block mb-1.5">Your Name *</label>
                    <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dr. Jane Mwangi" className="rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white text-[13px]" />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide block mb-1.5">Phone *</label>
                    <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7XX XXX XXX" className="rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white text-[13px]" />
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide block mb-1.5">Clinic / Farm Name (optional)</label>
                  <Input value={clinic} onChange={(e) => setClinic(e.target.value)} placeholder="e.g. Ngong Agrovet, Kamuthe Farm" className="rounded-xl bg-zinc-50 border-zinc-200 focus:bg-white text-[13px]" />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide block mb-1.5">Quantity Required</label>
                  <div className="flex items-center gap-3">
                    <button onClick={() => setQty(String(Math.max(1, parseInt(qty || "1") - 1)))} className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors">
                      <Minus className="w-3.5 h-3.5 text-zinc-600" />
                    </button>
                    <Input value={qty} onChange={(e) => setQty(e.target.value)} className="text-center rounded-xl bg-zinc-50 border-zinc-200 font-bold text-[15px] w-20" />
                    <button onClick={() => setQty(String(parseInt(qty || "0") + 1))} className="w-9 h-9 rounded-xl border border-zinc-200 flex items-center justify-center hover:bg-zinc-50 transition-colors">
                      <Plus className="w-3.5 h-3.5 text-zinc-600" />
                    </button>
                    <span className="text-zinc-400 text-[12px] font-medium">units / packs</span>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] font-bold text-zinc-500 uppercase tracking-wide block mb-1.5">Additional Notes (optional)</label>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Specific requirements, delivery location, urgency, etc." rows={3} className="w-full rounded-xl bg-zinc-50 border border-zinc-200 focus:bg-white text-[13px] px-3 py-2.5 outline-none focus:border-primary/40 resize-none transition-colors" />
                </div>
              </div>

              {/* Dosage tip */}
              {product.dosage && (
                <div className="bg-primary/[0.05] border border-primary/10 rounded-xl p-4 mb-5 flex gap-3">
                  <BadgeCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[11px] font-bold text-primary uppercase tracking-wide mb-1">Standard Dosage Reference</p>
                    <p className="text-zinc-600 text-[12.5px] leading-relaxed">{product.dosage}</p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={handleAddBasket} className="rounded-xl border-primary/20 text-primary bg-primary/5 hover:bg-primary/10 font-bold gap-2">
                  <ShoppingBag className="w-4 h-4" /> Add to Basket
                </Button>
                <Button onClick={handleSend} disabled={busy} className="rounded-xl bg-[#25D366] hover:bg-[#20b558] text-white font-bold gap-2">
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Send via WhatsApp</>}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// ─── Basket Drawer ─────────────────────────────────────────────────────────────
const BasketDrawer = ({ items, onClose, onRemove, onChangeQty }: {
  items: BasketItem[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onChangeQty: (id: string, qty: number) => void;
}) => {
  const [name, setName]   = useState("");
  const [phone, setPhone] = useState("");
  const [clinic, setClinic] = useState("");
  const [notes, setNotes] = useState("");

  const handleSendAll = () => {
    const productLines = items.map((item, i) =>
      `${i + 1}. *${item.product.name}* (${item.product.category}) — Qty: ${item.qty}`
    ).join("\n");
    const msg = [
      `🐾 *VETERINARY BASKET INQUIRY*`,
      `📋 *Ultimate Vetserve Limited*`,
      ``,
      `*━━ CLIENT INFO ━━*`,
      `👤 *Name:* ${name || "Not provided"}`,
      clinic ? `🏥 *Clinic/Farm:* ${clinic}` : null,
      `📞 *Phone:* ${phone || "Not provided"}`,
      ``,
      `*━━ PRODUCTS REQUESTED ━━*`,
      productLines,
      ``,
      `📊 *Total Items:* ${items.reduce((s, i) => s + i.qty, 0)} units across ${items.length} product(s)`,
      notes ? `\n📝 *Notes:* ${notes}` : null,
      ``,
      `_Sent via UltimateVetserve.com_`,
    ].filter(Boolean).join("\n");
    window.open(`https://wa.me/254724241542?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[110] flex">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-md bg-white h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-secondary px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ClipboardList className="w-5 h-5 text-white" />
            <div>
              <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-wider">Inquiry Basket</p>
              <p className="text-white font-bold text-[15px]">{items.length} Product{items.length !== 1 ? "s" : ""} Selected</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <X className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Products list */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-12 h-12 text-zinc-200 mx-auto mb-3" />
              <p className="text-zinc-400 font-medium">Your basket is empty</p>
              <p className="text-zinc-300 text-sm mt-1">Add products using the basket button</p>
            </div>
          ) : (
            items.map(({ product, qty }) => {
              const cfg = getCategoryConfig(product.category);
              const Icon = CATEGORY_ICONS[product.category] ?? ShieldCheck;
              return (
                <div key={product.id} className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 ${cfg.bg} rounded-xl flex items-center justify-center shrink-0`}>
                      <Icon className={`w-5 h-5 ${cfg.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-zinc-800 text-[13.5px] leading-snug truncate">{product.name}</p>
                      <p className={`text-[10.5px] font-semibold ${cfg.color} mt-0.5`}>{product.category}</p>
                      {product.activeIngredient && (
                        <p className="text-zinc-400 text-[11px] mt-1">Active: {product.activeIngredient}</p>
                      )}
                    </div>
                    <button onClick={() => onRemove(product.id)} className="p-1.5 rounded-lg hover:bg-red-50 text-zinc-300 hover:text-red-400 transition-colors shrink-0">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-zinc-200/60">
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                      product.stock === "In Stock" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"
                    }`}>{product.stock}</span>
                    <div className="flex items-center gap-2">
                      <button onClick={() => onChangeQty(product.id, Math.max(1, qty - 1))} className="w-7 h-7 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors">
                        <Minus className="w-3 h-3 text-zinc-600" />
                      </button>
                      <span className="text-[13px] font-bold text-zinc-800 w-6 text-center">{qty}</span>
                      <button onClick={() => onChangeQty(product.id, qty + 1)} className="w-7 h-7 rounded-lg border border-zinc-200 flex items-center justify-center hover:bg-zinc-100 transition-colors">
                        <Plus className="w-3 h-3 text-zinc-600" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Contact form + send */}
        {items.length > 0 && (
          <div className="border-t border-zinc-100 px-5 py-5 bg-white space-y-3">
            <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wide mb-2">Your Details</p>
            <div className="grid grid-cols-2 gap-3">
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="rounded-xl text-sm bg-zinc-50 border-zinc-200" />
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+254 7XX XXX XXX" className="rounded-xl text-sm bg-zinc-50 border-zinc-200" />
            </div>
            <Input value={clinic} onChange={(e) => setClinic(e.target.value)} placeholder="Clinic / Farm name (optional)" className="rounded-xl text-sm bg-zinc-50 border-zinc-200" />
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Delivery notes, urgency, etc." rows={2} className="w-full rounded-xl bg-zinc-50 border border-zinc-200 text-sm px-3 py-2.5 outline-none resize-none" />
            <Button onClick={handleSendAll} className="w-full bg-[#25D366] hover:bg-[#20b558] text-white rounded-xl font-bold py-3 gap-2 text-[14px]">
              <Send className="w-4 h-4" />
              Send Full Inquiry via WhatsApp ({items.reduce((s, i) => s + i.qty, 0)} units)
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Product Card ──────────────────────────────────────────────────────────────
const ProductCard = ({
  product, onInquire, onAddToBasket, productImage, onImageUpload,
}: {
  product: Product;
  onInquire: (p: Product) => void;
  onAddToBasket: (p: Product, qty: number) => void;
  productImage: string | null;
  onImageUpload: (id: string, url: string) => void;
}) => {
  const cfg = getCategoryConfig(product.category);
  const Icon = CATEGORY_ICONS[product.category] ?? ShieldCheck;
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 hover:border-primary/20 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group flex flex-col overflow-hidden">
      {/* Image area */}
      <ProductImageSlot
        src={productImage ?? product.imageUrl}
        onUpload={(url) => onImageUpload(product.id, url)}
        category={product.category}
      />

      {/* Category bar */}
      <div className={`h-[3px] w-full ${cfg.bar}`} />

      <div className="p-5 flex flex-col flex-1">
        {/* Status + category */}
        <div className="flex items-center justify-between mb-3">
          <p className={`text-[10px] font-bold uppercase tracking-widest ${cfg.color}`}>{product.category}</p>
          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full shrink-0 ${
            product.stock === "In Stock"  ? "bg-emerald-50 text-emerald-700 border border-emerald-100" :
            product.stock === "Available" ? "bg-amber-50 text-amber-700 border border-amber-100" :
                                            "bg-red-50 text-red-700 border border-red-100"
          }`}>{product.stock}</span>
        </div>

        {/* Name */}
        <Link to={`/products/${product.id}`}>
          <h3 className="font-display font-bold text-zinc-900 text-[15px] leading-snug mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
        </Link>

        {/* Description */}
        <p className="text-zinc-400 text-[12.5px] leading-relaxed mb-3 flex-1 line-clamp-2">{product.description}</p>

        {/* Active ingredient */}
        {product.activeIngredient && (
          <div className="flex items-center gap-1.5 mb-3">
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wide">Active:</span>
            <span className="text-[12px] text-zinc-600 font-medium truncate">{product.activeIngredient}</span>
          </div>
        )}

        {/* Species tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.species.map((sp) => (
            <span key={sp} className="text-[10px] bg-primary/[0.06] text-primary/80 rounded-full px-2.5 py-0.5 font-semibold border border-primary/10">{sp}</span>
          ))}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-3 gap-2">
          <Link
            to={`/products/${product.id}`}
            className="col-span-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-[11px] font-bold border border-zinc-200 text-zinc-500 bg-zinc-50 hover:bg-zinc-100 transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
            Details
          </Link>
          <button
            onClick={() => onInquire(product)}
            className="col-span-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-[11px] font-bold border border-primary/20 text-primary bg-primary/[0.05] hover:bg-primary/10 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            Inquire
          </button>
          <button
            onClick={() => onAddToBasket(product, 1)}
            className="col-span-1 flex items-center justify-center gap-1 py-2.5 rounded-xl text-[11px] font-bold bg-primary/[0.08] text-primary hover:bg-primary hover:text-white border border-primary/15 transition-all"
            title="Add to inquiry basket"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Basket
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Filter Accordion ──────────────────────────────────────────────────────────
const FilterAccordion = ({ title, children }: { title: string; children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-gray-100 pb-4 mb-4 last:border-0 last:mb-0">
      <button onClick={() => setOpen(!open)} className="flex items-center justify-between w-full mb-2 py-1">
        <span className="text-[11px] font-bold text-gray-600 uppercase tracking-widest">{title}</span>
        {open ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
      </button>
      {open && <div className="space-y-0.5">{children}</div>}
    </div>
  );
};

const CheckRow = ({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) => (
  <label className="flex items-center gap-2.5 cursor-pointer group py-1 select-none">
    <div
      onClick={onChange}
      className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-all ${checked ? "bg-primary border-primary" : "border-gray-300 group-hover:border-primary/60"}`}
    >
      {checked && <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />}
    </div>
    <span className={`text-sm transition-colors ${checked ? "text-primary font-semibold" : "text-gray-600 group-hover:text-gray-800"}`}>{label}</span>
  </label>
);

// ─── Main Page ─────────────────────────────────────────────────────────────────
const ProductsPage = () => {
  const [searchParams] = useSearchParams();

  const initCategory = searchParams.get("category") ?? "";
  const initSpecies  = searchParams.get("species")  ?? "All";
  const initQuery    = searchParams.get("q")        ?? "";

  const [selectedSpecies,    setSelectedSpecies]    = useState(initSpecies);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initCategory ? [initCategory] : []);
  const [selectedForms,      setSelectedForms]      = useState<string[]>([]);
  const [selectedStock,      setSelectedStock]      = useState<string[]>([]);
  const [searchQuery,        setSearchQuery]        = useState(initQuery);
  const [inquiryProduct,     setInquiryProduct]     = useState<Product | null>(null);
  const [mobileSidebar,      setMobileSidebar]      = useState(false);

  // Basket state
  const [basket,       setBasket]       = useState<BasketItem[]>([]);
  const [basketOpen,   setBasketOpen]   = useState(false);

  // Per-product uploaded images: { [productId]: objectUrl }
  const [productImages, setProductImages] = useState<Record<string, string>>({});

  const addToBasket = (product: Product, qty: number) => {
    setBasket((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) return prev.map((i) => i.product.id === product.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product, qty }];
    });
  };

  const removeFromBasket = (id: string) => setBasket((prev) => prev.filter((i) => i.product.id !== id));
  const changeBasketQty  = (id: string, qty: number) => setBasket((prev) => prev.map((i) => i.product.id === id ? { ...i, qty } : i));

  const toggle = (arr: string[], set: (v: string[]) => void, val: string) =>
    set(arr.includes(val) ? arr.filter((v) => v !== val) : [...arr, val]);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return allProducts.filter((p) => {
      if (selectedSpecies !== "All" && !p.species.includes(selectedSpecies)) return false;
      if (selectedCategories.length && !selectedCategories.includes(p.category)) return false;
      if (selectedForms.length && !selectedForms.includes(p.form)) return false;
      if (selectedStock.length && !(selectedStock as string[]).includes(p.stock)) return false;
      if (q && !p.name.toLowerCase().includes(q) && !p.description.toLowerCase().includes(q) && !p.tags.some((t) => t.toLowerCase().includes(q))) return false;
      return true;
    });
  }, [selectedSpecies, selectedCategories, selectedForms, selectedStock, searchQuery]);

  const activeCount = selectedCategories.length + selectedForms.length + selectedStock.length + (selectedSpecies !== "All" ? 1 : 0);

  const clearAll = () => {
    setSelectedSpecies("All");
    setSelectedCategories([]);
    setSelectedForms([]);
    setSelectedStock([]);
    setSearchQuery("");
  };

  const sidebarJsx = (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="font-display font-bold text-zinc-800 text-sm">Filters</p>
        {activeCount > 0 && (
          <button onClick={clearAll} className="text-xs font-semibold text-primary hover:underline">
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <FilterAccordion title="Category">
        {categoryFilters.map((c) => (
          <CheckRow key={c} label={c} checked={selectedCategories.includes(c)} onChange={() => toggle(selectedCategories, setSelectedCategories, c)} />
        ))}
      </FilterAccordion>

      <FilterAccordion title="Product Form">
        {formFilters.map((f) => (
          <CheckRow key={f} label={f} checked={selectedForms.includes(f)} onChange={() => toggle(selectedForms, setSelectedForms, f)} />
        ))}
      </FilterAccordion>

      <FilterAccordion title="Availability">
        {stockFilters.map((s) => (
          <CheckRow key={s} label={s} checked={selectedStock.includes(s)} onChange={() => toggle(selectedStock, setSelectedStock, s)} />
        ))}
      </FilterAccordion>

      <div className="bg-primary/5 rounded-xl p-4 border border-primary/10 mt-2">
        <p className="text-xs font-bold text-zinc-700 mb-1">Can't find a product?</p>
        <p className="text-xs text-zinc-400 mb-3 leading-relaxed">Contact our sales team for custom sourcing and bulk orders.</p>
        <a href="tel:+254724241542" className="flex items-center gap-1.5 text-xs font-bold text-primary">
          <Phone className="w-3.5 h-3.5" /> +254 724 241542
        </a>
      </div>
    </div>
  );

  const basketCount = basket.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50/50">
      <Navigation />

      {/* ── Page Hero Header ─────────────────────────────────────── */}
      <div className="relative bg-zinc-950 py-16 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576201836163-49758479d1b4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-15" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/98 via-zinc-950/90 to-zinc-900/70" />
        <div className="absolute inset-0 bg-grid-green opacity-20" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-1.5 text-emerald-300/70 text-xs mb-5">
            <a href="/" className="hover:text-emerald-300 transition-colors">Home</a>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">Products</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-3">Product Catalog</p>
              <h1 className="font-display text-[2.8rem] md:text-[3.4rem] font-extrabold tracking-tight leading-[1.08] mb-3">
                Certified Veterinary<br /><span className="text-emerald-400">Pharmaceuticals</span>
              </h1>
              <p className="text-zinc-300 max-w-xl font-light text-[15px] leading-relaxed">
                Quality-assured animal health products for livestock, poultry, and companion animals across Kenya.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              {[
                { icon: PackageCheck, text: "500+ Products" },
                { icon: BadgeCheck,   text: "KVB Registered" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 bg-white/[0.08] backdrop-blur-sm border border-white/[0.15] rounded-full px-4 py-2 text-white text-[13px] font-semibold">
                  <Icon className="w-4 h-4 text-emerald-400" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Species Filter Bar ───────────────────────────────────── */}
      <div className="bg-white border-b border-zinc-100 shadow-sm sticky top-[72px] z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 overflow-x-auto py-3" style={{ scrollbarWidth: "none" }}>
            {speciesFilters.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => setSelectedSpecies(name)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all shrink-0 border ${
                  selectedSpecies === name
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-zinc-600 border-zinc-200 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {name}
              </button>
            ))}
            <span className="ml-auto pl-4 border-l border-zinc-100 text-xs text-zinc-400 font-medium shrink-0 whitespace-nowrap">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
            </span>
            {/* Basket pill in filter bar */}
            <button
              onClick={() => setBasketOpen(true)}
              className="ml-3 flex items-center gap-2 bg-primary text-white rounded-full px-4 py-2 text-[13px] font-bold shrink-0 hover:bg-primary/90 transition-colors relative"
            >
              <ClipboardList className="w-4 h-4" />
              Inquiry Basket
              {basketCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-emerald-400 text-zinc-900 text-[10px] font-extrabold rounded-full flex items-center justify-center">
                  {basketCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="flex-1 container mx-auto px-4 py-10">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-60 shrink-0">
            <div className="bg-white rounded-2xl border border-zinc-100 p-5 sticky top-[148px]">
              {sidebarJsx}
            </div>
          </aside>

          {/* Right Pane */}
          <div className="flex-1 min-w-0">
            {/* Search + mobile filter */}
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex-1 group">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none group-focus-within:text-primary transition-colors" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, ingredient, tag…"
                  className="w-full pl-10 pr-10 py-3 bg-white border border-zinc-200 rounded-xl text-sm outline-none focus:border-primary/50 focus:shadow-md transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 bg-zinc-100 hover:bg-zinc-200 rounded-full p-0.5 transition-colors">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                onClick={() => setMobileSidebar(!mobileSidebar)}
                className="lg:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-sm font-medium text-zinc-600 hover:border-primary/40 transition-colors shrink-0"
              >
                <Filter className="w-4 h-4" />
                Filters
                {activeCount > 0 && (
                  <span className="bg-primary text-white rounded-full w-4 h-4 text-[10px] flex items-center justify-center font-bold">
                    {activeCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Sidebar */}
            {mobileSidebar && (
              <div className="lg:hidden bg-white rounded-2xl border border-zinc-100 p-5 mb-6">
                {sidebarJsx}
              </div>
            )}

            {/* Active filter pills */}
            {activeCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {selectedSpecies !== "All" && (
                  <span className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full px-3 py-1">
                    {selectedSpecies}
                    <button onClick={() => setSelectedSpecies("All")}><X className="w-3 h-3" /></button>
                  </span>
                )}
                {selectedCategories.map((c) => (
                  <span key={c} className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full px-3 py-1">
                    {c} <button onClick={() => toggle(selectedCategories, setSelectedCategories, c)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {selectedForms.map((f) => (
                  <span key={f} className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full px-3 py-1">
                    {f} <button onClick={() => toggle(selectedForms, setSelectedForms, f)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
                {selectedStock.map((s) => (
                  <span key={s} className="flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold rounded-full px-3 py-1">
                    {s} <button onClick={() => toggle(selectedStock, setSelectedStock, s)}><X className="w-3 h-3" /></button>
                  </span>
                ))}
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onInquire={setInquiryProduct}
                    onAddToBasket={addToBasket}
                    productImage={productImages[p.id] ?? null}
                    onImageUpload={(id, url) => setProductImages((prev) => ({ ...prev, [id]: url }))}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-24">
                <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-7 h-7 text-zinc-300" />
                </div>
                <h3 className="font-display text-xl font-bold text-zinc-600 mb-2">No Products Found</h3>
                <p className="text-zinc-400 text-sm mb-6">Try adjusting your filters or search query.</p>
                <Button onClick={clearAll} variant="outline" className="rounded-full px-8">
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Bottom CTA */}
            <div className="mt-14 relative overflow-hidden rounded-3xl text-white text-center"
              style={{ background: "linear-gradient(135deg, hsl(145 50% 10%) 0%, hsl(155 45% 13%) 50%, hsl(145 40% 10%) 100%)" }}
            >
              <div className="absolute inset-0 bg-grid-green opacity-30" />
              <div className="relative z-10 p-8 md:p-12">
                <PackageCheck className="w-10 h-10 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold mb-2">Can't Find What You Need?</h3>
                <p className="text-zinc-300 text-sm mb-6 max-w-lg mx-auto leading-relaxed">
                  We source 500+ veterinary products. Contact our team for specific requirements, custom formulations, or bulk orders.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <a href="tel:+254724241542">
                    <Button className="bg-white text-primary hover:bg-zinc-100 rounded-full font-bold px-8">
                      <Phone className="mr-2 w-4 h-4" /> Call Now
                    </Button>
                  </a>
                  <a href="/contact">
                    <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full font-bold px-8 bg-transparent">
                      Send Inquiry <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Floating basket FAB (mobile) */}
      {basketCount > 0 && (
        <button
          onClick={() => setBasketOpen(true)}
          className="fixed bottom-6 right-6 z-50 lg:hidden flex items-center gap-2 bg-primary text-white rounded-full px-5 py-3.5 shadow-xl font-bold text-[14px] hover:bg-primary/90 transition-all"
        >
          <ClipboardList className="w-5 h-5" />
          Basket · {basketCount}
        </button>
      )}

      <Footer />

      {/* Modals */}
      <InquiryModal
        product={inquiryProduct}
        onClose={() => setInquiryProduct(null)}
        onAddToBasket={addToBasket}
      />
      {basketOpen && (
        <BasketDrawer
          items={basket}
          onClose={() => setBasketOpen(false)}
          onRemove={removeFromBasket}
          onChangeQty={changeBasketQty}
        />
      )}
    </div>
  );
};

export default ProductsPage;
