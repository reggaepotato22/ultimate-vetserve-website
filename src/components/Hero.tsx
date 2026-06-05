import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, BadgeCheck, Truck, Shield, ChevronLeft, ChevronRight as ChevronRightIcon } from "lucide-react";
import { Link } from "react-router-dom";
import heroAnimals from "@/assets/hero-animals.jpg";

interface HeroProps {
  heroBadge?: string;
  heroTitle?: string;
  heroTitleAccent?: string;
  heroSubtitle?: string;
  ctaPrimary?: string;
  ctaSecondary?: string;
  stat1Val?: string; stat1Label?: string;
  stat2Val?: string; stat2Label?: string;
  stat3Val?: string; stat3Label?: string;
  stat4Val?: string; stat4Label?: string;
}

const trustBadges = [
  { icon: BadgeCheck, text: "KVB Registered" },
  { icon: Shield, text: "KEBS Certified" },
  { icon: Truck, text: "Cold-Chain Delivery" },
];

// Default product slideshow images
const DEFAULT_SLIDES = [
  heroAnimals,
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1605000797499-95a053545e58?auto=format&fit=crop&q=80&w=1600",
  "https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=1600",
];

const Hero = (props: HeroProps) => {
  // Slideshow state
  const [slides, setSlides] = useState<string[]>(DEFAULT_SLIDES);
  const [activeSlide, setActiveSlide] = useState(0);
  const [showSlideControls, setShowSlideControls] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  }, [slides.length]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  const goTo = (i: number) => { setActiveSlide(i); resetTimer(); };
  const goPrev = () => { setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length); resetTimer(); };
  const goNext = () => { setActiveSlide((prev) => (prev + 1) % slides.length); resetTimer(); };

  return (
    <section
      className="relative min-h-[94vh] flex items-center overflow-hidden"
      aria-label="Hero"
      onMouseEnter={() => setShowSlideControls(true)}
      onMouseLeave={() => setShowSlideControls(false)}
    >
      {/* Slideshow backgrounds */}
      {slides.map((src, i) => (
        <div
          key={i}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-[1.03] transition-opacity duration-1000"
          style={{
            backgroundImage: typeof src === "string" && src.startsWith("http") ? `url(${src})` : `url(${src})`,
            opacity: i === activeSlide ? 1 : 0,
            zIndex: i === activeSlide ? 1 : 0,
          }}
          role="presentation"
        />
      ))}

      {/* Layered overlays — kept strong so all text is always visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/97 to-zinc-900/75 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-transparent to-zinc-950/30 z-10" />
      <div className="absolute inset-0 bg-grid-green opacity-25 z-10" />

      {/* Decorative glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] pointer-events-none z-10" />

      {/* Prev / Next arrows */}
      <button
        onClick={goPrev}
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 sm:${showSlideControls ? "opacity-100" : "opacity-0"} opacity-100`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={goNext}
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white transition-all duration-300 sm:${showSlideControls ? "opacity-100" : "opacity-0"} opacity-100`}
        aria-label="Next slide"
      >
        <ChevronRightIcon className="w-5 h-5" />
      </button>

      {/* Slide dots */}
      <div className="absolute bottom-20 right-6 z-30 flex flex-col gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${i === activeSlide ? "w-2 h-6 bg-emerald-400" : "w-2 h-2 bg-white/30 hover:bg-white/60"}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-32 relative z-20">
        <div className="max-w-[680px]">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2.5 bg-white/[0.08] backdrop-blur-md border border-white/[0.15] rounded-full px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span className="text-emerald-200 font-medium text-[13px] tracking-wide">
              {props.heroBadge ?? "Kenya's Trusted Veterinary Pharmaceutical Partner"}
            </span>
          </div>

          {/* Heading — Plus Jakarta Sans via global h1 style */}
          <h1 className="font-display text-[2.9rem] sm:text-[3.6rem] lg:text-[4.2rem] font-extrabold text-white leading-[1.06] mb-6" dangerouslySetInnerHTML={{ __html: props.heroTitle ?? "Quality Animal Health<br />Solutions at Your Door" }} />

          <p className="text-[17px] text-zinc-300 max-w-xl leading-[1.75] mb-10 font-light">
            {props.heroSubtitle ?? "Certified pharmaceutical products and expert veterinary guidance for the health and productivity of your livestock, poultry, and pets — delivered across Kenya."}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3.5 mb-10">
            <Link to="/contact">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-white rounded-full px-10 h-14 text-[15.5px] font-bold shadow-[0_8px_30px_rgba(52,211,153,0.4)] hover:shadow-[0_12px_40px_rgba(52,211,153,0.55)] transition-all duration-200 group"
              >
                {props.ctaPrimary ?? "Place an Order"}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Button>
            </Link>
            <a href="tel:+254724241542">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white/60 text-white hover:bg-white/15 hover:border-white/80 rounded-full px-10 h-14 text-[15.5px] font-bold bg-white/5 backdrop-blur-sm transition-all duration-200"
              >
                <Phone className="mr-2 w-5 h-5" />
                {props.ctaSecondary ?? "Call Sales"}
              </Button>
            </a>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center gap-3">
            {trustBadges.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-white/[0.10] backdrop-blur-sm border border-white/[0.18] rounded-full px-4 py-2 text-white text-[12.5px]">
                <Icon className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span className="font-semibold">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats band */}
      <div className="absolute bottom-0 left-0 right-0 bg-zinc-950/70 backdrop-blur-md border-t border-white/[0.07] z-20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-wrap gap-0 divide-x divide-white/[0.08] justify-center md:justify-start">
            {[
              { val: props.stat1Val, label: props.stat1Label },
              { val: props.stat2Val, label: props.stat2Label },
              { val: props.stat3Val, label: props.stat3Label },
              { val: props.stat4Val, label: props.stat4Label },
            ].map((s, i) => (
              <div key={i} className={`flex items-baseline gap-2 ${i === 0 ? "pr-8" : "px-8"}`}>
                <span className="font-display font-extrabold text-emerald-400 text-[1.35rem] leading-none tabular-nums">
                  {s.val ?? (["500+", "1,000+", "15+", "100%"][i])}
                </span>
                <span className="text-zinc-400 text-[13px] font-medium">{s.label ?? (["Products", "Customers", "Counties", "Certified"][i])}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
