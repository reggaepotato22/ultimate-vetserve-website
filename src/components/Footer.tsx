import { Mail, Phone, MapPin, Facebook, Linkedin, MessageCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/uvs-logo.png";

const WHATSAPP_NUMBER = "254724241542";
const WHATSAPP_DIRECTIONS_MSG = encodeURIComponent("Hello, I'd like to get directions to Ultimate House, Oloolua, Ngong.");

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "News & Insights", href: "/news" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Contact Us", href: "/contact" },
];

const productLinks = [
  { label: "Injectables", href: "/products?category=injectables" },
  { label: "Boluses & De-wormers", href: "/products?category=boluses" },
  { label: "Water Solubles", href: "/products?category=powder" },
  { label: "Vaccines", href: "/products?category=vaccines" },
  { label: "Disinfectants & Salves", href: "/products?category=disinfectants" },
];

const Footer = () => {
  return (
    <footer className="bg-[#061208] text-zinc-300" role="contentinfo">
      {/* Top accent line */}
      <div className="h-[3px] bg-gradient-to-r from-emerald-400 via-primary to-transparent" />      
      {/* Subtle green tint overlay for warmth */}
      <div className="relative">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.06] via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-14">
          {/* Brand column */}
          <div className="lg:col-span-1 space-y-5">
            <Link to="/" aria-label="Ultimate Vetserve — Home">
              <img
                src={logo}
                alt="Ultimate Vetserve Limited"
                className="w-48 h-auto brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-[13.5px] text-zinc-300/80 leading-[1.75]">
              Kenya's trusted veterinary pharmaceutical partner — dedicated to improving animal health with certified, quality-assured products.
            </p>
            <div className="flex gap-2.5">
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 bg-white/[0.08] hover:bg-primary border border-white/[0.1] hover:border-primary rounded-xl flex items-center justify-center transition-all duration-200 text-zinc-300 hover:text-white"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hello, I would like to inquire about veterinary products.")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 bg-white/[0.08] hover:bg-[#25D366] border border-white/[0.1] hover:border-[#25D366] rounded-xl flex items-center justify-center transition-all duration-200 text-zinc-300 hover:text-white"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 bg-white/[0.08] hover:bg-[#0A66C2] border border-white/[0.1] hover:border-[#0A66C2] rounded-xl flex items-center justify-center transition-all duration-200 text-zinc-300 hover:text-white"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[11px] font-bold text-emerald-300 uppercase tracking-[0.18em] mb-5">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-[13.5px] text-zinc-300/80 hover:text-emerald-300 transition-colors duration-150 flex items-center gap-2.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/50 group-hover:bg-emerald-400 transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-[11px] font-bold text-emerald-300 uppercase tracking-[0.18em] mb-5">
              Our Products
            </h3>
            <ul className="space-y-2.5">
              {productLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    to={href}
                    className="text-[13.5px] text-zinc-300/80 hover:text-emerald-300 transition-colors duration-150 flex items-center gap-2.5 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/50 group-hover:bg-emerald-400 transition-colors shrink-0" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Location card */}
          <div className="space-y-5">
            <h3 className="text-[11px] font-bold text-emerald-300 uppercase tracking-[0.18em]">
              Get in Touch
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <span className="w-7 h-7 bg-primary/20 border border-primary/25 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                </span>
                <span className="text-[13.5px] text-zinc-300/80 leading-snug">
                  Ultimate House, Oloolua<br />Ngong, Kenya
                </span>
              </li>
              <li>
                <a href="tel:+254724241542" className="flex items-center gap-3 text-[13.5px] text-zinc-300/80 hover:text-emerald-300 transition-colors group">
                  <span className="w-7 h-7 bg-primary/20 border border-primary/25 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/40 transition-colors">
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  +254 724 241542
                </a>
              </li>
              <li>
                <a href="mailto:info@ultimatevetserve.com" className="flex items-center gap-3 text-[13.5px] text-zinc-300/80 hover:text-emerald-300 transition-colors group">
                  <span className="w-7 h-7 bg-primary/20 border border-primary/25 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-primary/40 transition-colors">
                    <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  </span>
                  info@ultimatevetserve.com
                </a>
              </li>
            </ul>

            {/* Faux map card */}
            <div className="rounded-xl overflow-hidden border border-emerald-900/40">
              <div
                className="relative h-28 flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #0a1f0e 0%, #0f2a13 100%)",
                  backgroundImage:
                    "linear-gradient(rgba(52,211,153,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(52,211,153,0.08) 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              >
                <div className="absolute w-20 h-20 rounded-full border border-primary/15" />
                <div className="absolute w-12 h-12 rounded-full border border-primary/30" />
                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-black/50">
                    <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full mt-1" />
                </div>
              </div>
              <div className="bg-[#0a1f0e] border-t border-emerald-900/40 px-4 py-3 flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-white text-[13px] font-semibold truncate">Ultimate House, Oloolua</p>
                  <p className="text-emerald-400/60 text-[11px] mt-0.5">Ngong, Kenya</p>
                </div>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DIRECTIONS_MSG}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 bg-primary hover:bg-primary/85 text-white text-[12px] font-semibold px-3.5 py-1.5 rounded-lg transition-colors"
                >
                  Directions
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-emerald-900/30 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12.5px] text-zinc-400">
            © {new Date().getFullYear()} Ultimate Vetserve Limited. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[12.5px] text-zinc-400 hover:text-emerald-300 transition-colors">Privacy Policy</a>
            <a href="#" className="text-[12.5px] text-zinc-400 hover:text-emerald-300 transition-colors">Terms of Service</a>
            <a href="/admin/login" className="text-[12.5px] text-zinc-400 hover:text-emerald-300 transition-colors">Admin</a>
          </div>
        </div>
      </div>
      </div>
    </footer>
  );
};

export default Footer;
