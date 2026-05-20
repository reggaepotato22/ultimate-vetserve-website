import { BadgeCheck, FlaskConical, Users, MapPin } from "lucide-react";

const stats = [
  {
    icon: FlaskConical,
    value: "500+",
    label: "Registered Products",
    sublabel: "Pharmaceutical catalog",
  },
  {
    icon: Users,
    value: "1,000+",
    label: "Customers Served",
    sublabel: "Vets, farmers & clinics",
  },
  {
    icon: MapPin,
    value: "15+",
    label: "Counties Covered",
    sublabel: "Nationwide distribution",
  },
  {
    icon: BadgeCheck,
    value: "100%",
    label: "Quality Certified",
    sublabel: "KVB & KEBS compliant",
  },
];

export const SocialProof = () => {
  return (
    <section className="py-20 bg-white border-y border-zinc-100" aria-label="Key statistics">
      <div className="container mx-auto px-4">
        {/* Section label */}
        <p className="text-center text-[11px] font-bold text-zinc-400 uppercase tracking-[0.18em] mb-12">
          Trusted by professionals across Kenya
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-zinc-100 rounded-2xl overflow-hidden shadow-xs">
          {stats.map(({ icon: Icon, value, label, sublabel }) => (
            <div
              key={label}
              className="group flex flex-col items-center text-center gap-4 bg-white px-6 py-10 hover:bg-primary/[0.025] transition-colors duration-300"
            >
              <div className="w-12 h-12 bg-primary/[0.08] group-hover:bg-primary/[0.14] rounded-2xl flex items-center justify-center transition-colors duration-300">
                <Icon className="w-5.5 h-5.5 text-primary" strokeWidth={1.75} />
              </div>
              <div>
                <p className="font-display text-[2.6rem] font-extrabold text-zinc-900 leading-none tabular-nums tracking-tight">
                  {value}
                </p>
                <p className="text-[14px] font-semibold text-zinc-700 mt-2 leading-tight">
                  {label}
                </p>
                <p className="text-[12px] text-zinc-400 mt-1 font-medium">{sublabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
