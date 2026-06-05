import { BadgeCheck, FlaskConical, Users, MapPin } from "lucide-react";

interface SocialProofProps {
  stat1Val?: string; stat1Label?: string; stat1Sub?: string;
  stat2Val?: string; stat2Label?: string; stat2Sub?: string;
  stat3Val?: string; stat3Label?: string; stat3Sub?: string;
  stat4Val?: string; stat4Label?: string; stat4Sub?: string;
}

const ICONS = [FlaskConical, Users, MapPin, BadgeCheck];

export const SocialProof = (props: SocialProofProps) => {
  const stats = [
    { icon: ICONS[0], value: props.stat1Val ?? "500+", label: props.stat1Label ?? "Registered Products", sublabel: props.stat1Sub ?? "Pharmaceutical catalog" },
    { icon: ICONS[1], value: props.stat2Val ?? "1,000+", label: props.stat2Label ?? "Customers Served", sublabel: props.stat2Sub ?? "Vets, farmers & clinics" },
    { icon: ICONS[2], value: props.stat3Val ?? "15+", label: props.stat3Label ?? "Counties Covered", sublabel: props.stat3Sub ?? "Nationwide distribution" },
    { icon: ICONS[3], value: props.stat4Val ?? "100%", label: props.stat4Label ?? "Quality Certified", sublabel: props.stat4Sub ?? "KVB & KEBS compliant" },
  ];

  return (
    <section className="py-20 bg-white border-y border-zinc-100" aria-label="Key statistics">
      <div className="container mx-auto px-4">
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
