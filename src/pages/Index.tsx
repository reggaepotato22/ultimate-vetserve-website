import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { ProductCategories } from "@/components/ProductCategories";
import { SocialProof } from "@/components/SocialProof";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BadgeCheck, HeartPulse, Truck, Phone, ArrowRight, ChevronRight,
  Calendar, Syringe, Pill, FlaskConical, TestTube, ShieldCheck,
} from "lucide-react";
import { getCategoryConfig } from "@/data/products";
import { useProducts, useNews, useSiteSettings } from "@/hooks/useData";
import { format } from "date-fns";

const whyCards = [
  { icon: BadgeCheck, num: "01", title: "Certified Quality", desc: "Every product is registered with the Kenya Veterinary Board and meets KEBS international standards before it reaches your hands.", bg: "https://images.unsplash.com/photo-1578496479914-7ef3b0193be3?auto=format&fit=crop&q=80&w=600" },
  { icon: Truck, num: "02", title: "Nationwide Delivery", desc: "Consistent stock availability and rapid cold-chain delivery to veterinary professionals across 15+ Kenyan counties.", bg: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=600" },
  { icon: HeartPulse, num: "03", title: "Expert Guidance", desc: "Our trained veterinary pharmaceutical specialists provide professional support on product selection and disease management.", bg: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=600" },
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

const Index = () => {
  const { products: allProducts } = useProducts();
  const { articles: allNews } = useNews();
  const { homepage = defaultHomepage } = useSiteSettings();

  return (
    <div className="min-h-screen font-sans text-gray-900">
      <Navigation />
      <Hero {...homepage} />

      {/* Product Categories */}
      <ProductCategories />

      {/* Why Choose Us */}
      <section className="py-28 bg-white" aria-labelledby="why-heading">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1fr_2fr] gap-16 items-start">
            {/* Left — sticky heading block */}
            <div className="lg:sticky lg:top-28">
              <p className="text-[11px] font-bold text-primary uppercase tracking-[0.18em] mb-4">{homepage.whyBadge}</p>
              <h2 id="why-heading" className="font-display text-[2.2rem] md:text-[2.8rem] font-extrabold text-zinc-900 tracking-tight leading-[1.1] mb-5" dangerouslySetInnerHTML={{ __html: homepage.whyTitle }} />
              <p className="text-zinc-400 leading-[1.75] text-[15px] mb-8 max-w-[280px]">
                {homepage.whySubtitle}
              </p>
              <Link to="/about">
                <Button className="bg-primary hover:bg-primary/90 rounded-full px-7 font-semibold gap-2 shadow-sm hover:shadow-primary transition-all">
                  Our Story <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Right — numbered cards with backgrounds */}
            <div className="space-y-5">
              {whyCards.map(({ icon: Icon, num, title, desc, bg }) => (
                <div key={title} className="group relative overflow-hidden rounded-2xl transition-all duration-500 hover:-translate-y-0.5 hover:shadow-hover">
                  {/* Background image */}
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url(${bg})` }} />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  {/* Content */}
                  <div className="relative z-10 flex items-start gap-5 p-6 md:p-8">
                    <div className="shrink-0 pt-1">
                      <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-[0.2em] block mb-2.5">{num}</span>
                      <div className="w-12 h-12 bg-white/15 backdrop-blur-sm group-hover:bg-white/25 rounded-2xl flex items-center justify-center transition-all duration-300 border border-white/20">
                        <Icon className="w-5.5 h-5.5 text-emerald-300" strokeWidth={1.75} />
                      </div>
                    </div>
                    <div className="pt-6">
                      <h3 className="font-display text-[1.15rem] font-bold text-white tracking-tight mb-2 drop-shadow-sm">{title}</h3>
                      <p className="text-zinc-200 text-[14px] leading-[1.75] drop-shadow-sm">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <SocialProof {...homepage} />

      {/* Featured Products */}
      {(() => {
        const featured = allProducts.filter((p) => p.featured && p.visible !== false).slice(0, 4);
        const ICONS: Record<string, React.ElementType> = {
          "Injectables": Syringe, "Boluses & De-wormers": Pill,
          "Water Solubles": FlaskConical, "Vaccines": TestTube, "Disinfectants & Salves": ShieldCheck,
        };
        return (
          <section className="py-24 bg-zinc-50/70" aria-labelledby="featured-heading">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <p className="text-[11px] font-bold text-primary uppercase tracking-[0.18em] mb-3">{homepage.featuredBadge}</p>
                  <h2 id="featured-heading" className="font-display text-[2.2rem] md:text-[2.8rem] font-extrabold text-zinc-900 tracking-tight leading-[1.1]">{homepage.featuredTitle}</h2>
                  <p className="text-zinc-400 text-[15px] mt-3 max-w-md leading-relaxed">{homepage.featuredSubtitle}</p>
                </div>
                <Link to="/products" className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-bold text-primary hover:underline shrink-0 group">
                  All Products <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {featured.map((p) => {
                  const cfg = getCategoryConfig(p.category);
                  const Icon = ICONS[p.category] ?? ShieldCheck;
                  const imgSrc = p.imageUrl;
                  return (
                    <Link key={p.id} to={`/products/${p.id}`} className="group block bg-white rounded-2xl border border-zinc-100 hover:border-primary/25 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
                      {/* Product image area */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                        {imgSrc ? (
                          <img src={imgSrc} alt={p.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        ) : (
                          <div className={`w-full h-full ${cfg.bg}`} />
                        )}
                        {/* Category badge */}
                        <div className="absolute top-3 left-3">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${cfg.bg} ${cfg.color} border border-white/20 backdrop-blur-sm`}>{p.category}</span>
                        </div>
                        {/* Stock badge */}
                        <div className="absolute top-3 right-3">
                          <span className="text-[10px] font-semibold px-2 py-1 rounded-full bg-emerald-50/90 text-emerald-700 border border-emerald-100 backdrop-blur-sm">{p.stock}</span>
                        </div>
                      </div>
                      <div className={`h-[3px] ${cfg.bar}`} />
                      <div className="p-4">
                        <h3 className="font-display font-bold text-zinc-900 text-[14px] leading-snug group-hover:text-primary transition-colors mb-1">{p.name}</h3>
                        <p className="text-[12px] text-zinc-400 leading-relaxed line-clamp-2">{p.description}</p>
                        <div className="mt-3 flex items-center gap-1.5 text-[12px] font-bold text-primary group-hover:gap-2.5 transition-all">
                          View Details <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="text-center mt-8 sm:hidden">
                <Link to="/products"><Button variant="outline" className="rounded-full border-gray-200 gap-2">All Products <ArrowRight className="w-4 h-4" /></Button></Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* News Preview */}
      {(() => {
        const latest = [...allNews].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 3);
        return (
          <section className="py-24 bg-white" aria-labelledby="news-heading">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                <div>
                  <p className="text-[11px] font-bold text-primary uppercase tracking-[0.18em] mb-3">{homepage.newsBadge}</p>
                  <h2 id="news-heading" className="font-display text-[2.2rem] md:text-[2.8rem] font-extrabold text-zinc-900 tracking-tight leading-[1.1]">{homepage.newsTitle}</h2>
                  <p className="text-zinc-400 text-[15px] mt-3 max-w-md leading-relaxed">{homepage.newsSubtitle}</p>
                </div>
                <Link to="/news" className="hidden sm:inline-flex items-center gap-1.5 text-[13px] font-bold text-primary hover:underline shrink-0 group">
                  All Articles <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <div className="grid md:grid-cols-3 gap-5">
                {latest.map((article) => (
                  <Link key={article.id} to={`/news/${article.slug}`} className="group block">
                    <article className="bg-white rounded-2xl overflow-hidden border border-zinc-100 hover:border-primary/20 hover:shadow-hover hover:-translate-y-0.5 transition-all duration-300 h-full flex flex-col">
                      <div className="aspect-video overflow-hidden rounded-t-2xl">
                        <img
                          src={article.imageUrl ?? "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10.5px] font-semibold bg-primary/[0.08] text-primary px-2.5 py-1 rounded-full border border-primary/10">{article.category}</span>
                          <span className="flex items-center gap-1 text-[11.5px] text-zinc-400 ml-auto">
                            <Calendar className="w-3 h-3" />{format(new Date(article.publishedAt), "dd MMM yyyy")}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-zinc-900 text-[14px] leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">{article.title}</h3>
                        <p className="text-[12.5px] text-zinc-400 leading-relaxed line-clamp-3 flex-1">{article.excerpt}</p>
                        <div className="mt-4 flex items-center gap-1.5 text-[12.5px] font-bold text-primary">
                          Read more <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-8 sm:hidden">
                <Link to="/news"><Button variant="outline" className="rounded-full border-gray-200 gap-2">All Articles <ArrowRight className="w-4 h-4" /></Button></Link>
              </div>
            </div>
          </section>
        );
      })()}

      {/* Certifications & Trust Band */}
      <section className="py-12 bg-zinc-50 border-y border-zinc-200/70">
        <div className="container mx-auto px-4">
          <p className="text-center text-[11px] font-bold text-zinc-400 uppercase tracking-[0.18em] mb-8">{homepage.complianceTitle}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            {(JSON.parse(homepage.complianceLogos ?? "[]") as string[]).map((name: string) => (
              <div key={name} className="inline-flex items-center gap-2 bg-white border border-zinc-200 rounded-full px-4 py-2 text-zinc-600 shadow-xs hover:border-primary/30 hover:text-primary transition-colors">
                <BadgeCheck className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="text-[12.5px] font-semibold">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-4">
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.08] px-8 md:px-14 py-14 flex flex-col md:flex-row items-center justify-between gap-10"
            style={{ background: "linear-gradient(135deg, hsl(145 50% 10%) 0%, hsl(155 45% 13%) 50%, hsl(145 40% 10%) 100%)" }}
          >
            {/* Grid texture */}
            <div className="absolute inset-0 bg-grid-green opacity-60" />
            {/* Glow */}
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[80px]" />
            
            <div className="relative z-10 text-white max-w-xl">
              <span className="inline-flex items-center gap-2 text-emerald-400 text-[11px] font-bold uppercase tracking-[0.18em] mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {homepage.promoBadge}
              </span>
              <h3 className="font-display text-[2rem] md:text-[2.6rem] font-extrabold leading-[1.08] tracking-tight mb-4" dangerouslySetInnerHTML={{ __html: homepage.promoTiltle }} />
              <p className="text-zinc-300 text-[14.5px] leading-[1.75]">
                {homepage.promoDesc}
              </p>
            </div>
            <div className="relative z-10 flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link to="/products">
                <Button size="lg" className="bg-white text-primary hover:bg-zinc-100 active:scale-[0.98] rounded-full px-8 font-bold shadow-xl w-full transition-all">
                  {homepage.promoBtn} <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a href="tel:+254724241542">
                <Button size="lg" variant="outline" className="border-2 border-white/25 text-white hover:bg-white/10 active:scale-[0.98] rounded-full px-8 font-bold bg-transparent w-full transition-all">
                  <Phone className="mr-2 w-5 h-5" /> {homepage.promoBtn2}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-primary relative overflow-hidden" aria-label="Call to action">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a053545e58?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-grid-green opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-white/5 rounded-full blur-[80px]" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <p className="text-[11px] font-bold text-white/60 uppercase tracking-[0.18em] mb-5">{homepage.ctaBadge}</p>
          <h2 className="font-display text-[2.4rem] md:text-[3.4rem] font-extrabold text-white tracking-tight leading-[1.08] mb-5 text-balance" dangerouslySetInnerHTML={{ __html: homepage.ctaTitle }} />
          <p className="text-[17px] text-white/70 mb-10 max-w-xl mx-auto leading-[1.75] font-light">
            {homepage.ctaDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <Link to="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-zinc-100 active:scale-[0.98] font-bold px-10 py-6 rounded-full shadow-premium transition-all">
                {homepage.ctaBtn}
              </Button>
            </Link>
            <a href="tel:+254724241542">
              <Button size="lg" variant="outline" className="border-2 border-white/30 text-white hover:bg-white/10 active:scale-[0.98] font-bold px-10 py-6 rounded-full bg-transparent transition-all">
                <Phone className="mr-2 h-5 w-5" /> {homepage.ctaBtn2}
              </Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Index;
