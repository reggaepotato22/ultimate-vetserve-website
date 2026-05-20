import { useState, useEffect } from "react";
import { NavLink } from "@/components/NavLink";
import { Link } from "react-router-dom";
import {
  Menu, X, Phone, Mail, MapPin, Clock,
  ChevronDown, Syringe, Pill, FlaskConical, TestTube, ShieldCheck, ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/uvs-logo.png";

const productCategories = [
  { name: "Injectables", slug: "injectables", icon: Syringe, desc: "Antibiotics, vitamins & antiparasitic" },
  { name: "Boluses & De-wormers", slug: "boluses", icon: Pill, desc: "Oral antiparasitic treatments" },
  { name: "Water Solubles", slug: "powder", icon: FlaskConical, desc: "Powders, vitamins & supplements" },
  { name: "Vaccines", slug: "vaccines", icon: TestTube, desc: "Disease prevention for flocks" },
  { name: "Disinfectants & Salves", slug: "disinfectants", icon: ShieldCheck, desc: "Hygiene & wound care" },
];

const navLinksBeforeProducts = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
];
const navLinksAfterProducts = [
  { name: "News", path: "/news" },
  { name: "Sustainability", path: "/sustainability" },
  { name: "Contact", path: "/contact" },
];
const allMobileLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "News", path: "/news" },
  { name: "Sustainability", path: "/sustainability" },
  { name: "Contact", path: "/contact" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkBase =
    "relative px-3.5 py-2 rounded-lg text-[13.5px] font-medium text-zinc-600 hover:text-primary hover:bg-primary/[0.06] transition-all duration-150";
  const linkActive = "text-primary bg-primary/[0.07] font-semibold";

  return (
    <header className="sticky top-0 z-50">
      {/* Top Info Bar */}
      <div className="bg-zinc-900 text-zinc-400 text-[11.5px] border-b border-white/[0.06]">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between gap-4">
          <div className="flex items-center gap-5">
            <a
              href="tel:+254724241542"
              className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>+254 724 241542</span>
            </a>
            <a
              href="mailto:info@ultimatevetserve.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
            >
              <Mail className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>info@ultimatevetserve.com</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-emerald-500 shrink-0" />
              <span>Mon–Fri: 8:00 AM – 4:30 PM</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="hidden sm:inline">Ultimate House, Oloolua, Ngong</span>
              <span className="sm:hidden">Ngong, Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`bg-white/95 backdrop-blur-xl border-b transition-all duration-300 ${
          scrolled ? "border-zinc-200 shadow-[0_2px_20px_rgba(0,0,0,0.06)]" : "border-zinc-100"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-[72px]">
            {/* Logo */}
            <Link to="/" className="flex items-center shrink-0 -ml-1">
              <img
                src={logo}
                alt="Ultimate Vetserve Limited"
                className="h-14 w-auto object-contain"
              />
            </Link>

            {/* Desktop Navigation — Products sandwiched between Before/After groups */}
            <div className="hidden lg:flex items-center gap-0.5">
              {navLinksBeforeProducts.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={linkBase}
                  activeClassName={linkActive}
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Products mega-dropdown */}
              <div className="relative group">
                <NavLink
                  to="/products"
                  className={`${linkBase} flex items-center gap-1`}
                  activeClassName={linkActive}
                >
                  Products
                  <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform duration-200" />
                </NavLink>

                {/* Dropdown panel */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[500px] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.12)] border border-zinc-100/80 p-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
                  {/* Arrow */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-zinc-100 rotate-45" />
                  <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.15em] mb-4 px-1">
                    Browse by Category
                  </p>
                  <div className="grid grid-cols-2 gap-1.5">
                    {productCategories.map((cat) => {
                      const Icon = cat.icon;
                      return (
                        <Link
                          key={cat.slug}
                          to={`/products?category=${cat.slug}`}
                          className="flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm text-zinc-700 hover:text-primary hover:bg-primary/[0.06] transition-all duration-150 group/item"
                        >
                          <div className="w-9 h-9 bg-primary/10 rounded-xl flex items-center justify-center shrink-0 group-hover/item:bg-primary/20 transition-colors">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold leading-tight text-[13px] text-zinc-800">
                              {cat.name}
                            </p>
                            <p className="text-[11px] text-zinc-400 leading-tight mt-0.5 truncate">
                              {cat.desc}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                  <div className="border-t border-zinc-100 mt-4 pt-3.5 flex items-center justify-between px-1">
                    <span className="text-[11px] text-zinc-400">
                      Full pharmaceutical catalog
                    </span>
                    <Link
                      to="/products"
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline"
                    >
                      View All Products
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {navLinksAfterProducts.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={linkBase}
                  activeClassName={linkActive}
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="tel:+254724241542"
                className="flex items-center gap-2 text-zinc-600 hover:text-primary transition-colors group"
                aria-label="Call sales"
              >
                <div className="w-8 h-8 bg-primary/10 group-hover:bg-primary/15 rounded-full flex items-center justify-center transition-colors">
                  <Phone className="h-3.5 w-3.5 text-primary" />
                </div>
                <span className="font-semibold text-sm hidden xl:inline">
                  +254 724 241542
                </span>
              </a>
              <Link to="/contact">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 h-9 text-sm font-semibold shadow-sm hover:shadow-md transition-all">
                  Get a Quote
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-zinc-100 text-zinc-600 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="lg:hidden py-4 border-t border-zinc-100 bg-white">
              <nav className="flex flex-col gap-0.5">
                {allMobileLinks.slice(0, 2).map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl text-[14px] text-zinc-600 hover:bg-primary/[0.06] hover:text-primary transition-colors font-medium"
                    activeClassName="bg-primary/[0.07] text-primary font-semibold"
                  >
                    {link.name}
                  </NavLink>
                ))}
                {/* Products with sub-links */}
                <NavLink
                  to="/products"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-xl text-[14px] text-zinc-600 hover:bg-primary/[0.06] hover:text-primary transition-colors font-medium"
                  activeClassName="bg-primary/[0.07] text-primary font-semibold"
                >
                  Products
                </NavLink>
                <div className="ml-4 pl-4 border-l-2 border-primary/15 flex flex-col gap-0.5 my-1">
                  {productCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <Link
                        key={cat.slug}
                        to={`/products?category=${cat.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-primary hover:bg-primary/[0.05] transition-colors"
                      >
                        <Icon className="w-3.5 h-3.5 text-primary/70 shrink-0" />
                        {cat.name}
                      </Link>
                    );
                  })}
                </div>
                {allMobileLinks.slice(2).map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="px-4 py-3 rounded-xl text-[14px] text-zinc-600 hover:bg-primary/[0.06] hover:text-primary transition-colors font-medium"
                    activeClassName="bg-primary/[0.07] text-primary font-semibold"
                  >
                    {link.name}
                  </NavLink>
                ))}
              </nav>
              <div className="px-2 pt-4 pb-2 border-t border-zinc-100 mt-3 flex flex-col gap-2.5">
                <a
                  href="tel:+254724241542"
                  className="flex items-center gap-2 justify-center py-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-xl text-zinc-700 font-semibold text-sm transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +254 724 241542
                </a>
                <Link to="/contact" className="w-full" onClick={() => setIsOpen(false)}>
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold">
                    Get a Quote
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
