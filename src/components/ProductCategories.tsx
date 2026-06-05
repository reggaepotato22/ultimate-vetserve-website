import { useState } from "react";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const defaultCategories = [
  {
    title: "Livestock",
    description: "Essential antibiotics, dewormers, and nutritional supplements for cattle, sheep, and goats.",
    link: "/products?category=livestock",
    image: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=700",
    accent: "from-amber-900/80",
    count: "12+ Products",
  },
  {
    title: "Poultry",
    description: "Vaccines, vitamins, and growth boosters for healthy, productive flocks.",
    link: "/products?category=poultry",
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=700",
    accent: "from-emerald-900/80",
    count: "8+ Products",
  },
  {
    title: "Companion Pets",
    description: "Antiparasitic, vitamins, and care products for dogs, cats, and more.",
    link: "/products?category=pets",
    image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=700",
    accent: "from-teal-900/80",
    count: "5+ Products",
  },
  {
    title: "Injectables",
    description: "Precision-formulated injectable antibiotics, antiparasitic, and vitamin solutions.",
    link: "/products?category=injectables",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=700",
    accent: "from-blue-900/80",
    count: "12+ Products",
  },
  {
    title: "Boluses & Dewormers",
    description: "Slow-release oral antiparasitic boluses and broad-spectrum dewormers.",
    link: "/products?category=boluses",
    image: "https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&q=80&w=700",
    accent: "from-lime-900/80",
    count: "6+ Products",
  },
  {
    title: "Water Solubles & Vaccines",
    description: "Soluble powders, electrolytes, vitamins, and vaccines for easy administration.",
    link: "/products?category=powder",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&q=80&w=700",
    accent: "from-cyan-900/80",
    count: "10+ Products",
  },
];

export const ProductCategories = () => {
  const [categories] = useState(defaultCategories);

  return (
    <section className="py-24 bg-zinc-50/70" aria-labelledby="categories-heading">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[11px] font-bold text-primary uppercase tracking-[0.18em] mb-3">Product Range</p>
            <h2
              id="categories-heading"
              className="font-display text-[2.2rem] md:text-[2.8rem] font-extrabold text-zinc-900 leading-[1.1] tracking-tight"
            >
              Find Your Products for Your Animals
            </h2>
          </div>
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-[13px] font-bold text-primary hover:underline shrink-0 group"
          >
            View full catalog
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Image Cards Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {categories.map(({ title, description, link, image, accent, count }) => (
            <Link
              key={title}
              to={link}
              className="group relative block rounded-2xl overflow-hidden aspect-[4/3] shadow-card hover:shadow-hover transition-all duration-500 hover:-translate-y-1"
            >
              {/* Background Image */}
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className={`absolute inset-0 bg-gradient-to-t ${accent} to-transparent opacity-40`} />

              {/* Top badge */}
              <div className="absolute top-4 left-4 right-4">
                <span className="inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                  {count}
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="text-white font-black text-lg leading-tight tracking-tight mb-1">{title}</h3>
                <p className="text-white/70 text-xs leading-relaxed line-clamp-2 mb-3">{description}</p>
                <div className="flex items-center gap-1.5 text-white/80 text-xs font-bold group-hover:text-white transition-colors">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};