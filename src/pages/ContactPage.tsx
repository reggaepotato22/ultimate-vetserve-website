import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const WHATSAPP_NUMBER = "254724241542";
const WHATSAPP_DIRECTIONS_MSG = encodeURIComponent("Hello, I'd like to get directions to Ultimate House, Oloolua, Ngong.");

const DEFAULT_CONTACT_HERO = "https://images.unsplash.com/photo-1596526134530-727856838726?auto=format&fit=crop&q=80&w=1600";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />
      <main className="flex-1 bg-zinc-50/50">
        {/* Hero Banner */}
        <div className="relative bg-zinc-950 py-20 text-white overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${DEFAULT_CONTACT_HERO})` }} />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/98 via-zinc-950/92 to-zinc-900/80" />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/20" />
          <div className="absolute inset-0 bg-grid-green opacity-20" />
          <div className="container mx-auto px-4 text-center relative z-10">
            <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-4">Reach Out</p>
            <h1 className="font-display text-[2.8rem] md:text-[3.8rem] font-extrabold mb-4 tracking-tight leading-[1.08]">Get in Touch</h1>
            <p className="text-zinc-300 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              We are here to assist you with all your veterinary pharmaceutical needs.
            </p>
          </div>
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Contact Information
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Reach out to us directly or visit our headquarters. Our team of experts is ready to provide the support you need.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <Card className="border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Call Us</h3>
                        <a href="tel:+254724241542" className="text-gray-600 hover:text-primary transition-colors font-medium">+254 724 241542</a>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Email Us</h3>
                        <a href="mailto:info@ultimatevetserve.com" className="text-gray-600 hover:text-primary transition-colors font-medium">info@ultimatevetserve.com</a>
                    </CardContent>
                  </Card>

                  {/* Stylised map-preview location card */}
                  <div className="rounded-xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all">
                    {/* Faux map area */}
                    <div
                      className="relative h-28 flex items-center justify-center bg-[#162b19]"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(74,222,128,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(74,222,128,0.07) 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                      }}
                    >
                      <div className="absolute w-20 h-20 rounded-full border border-primary/20"></div>
                      <div className="absolute w-12 h-12 rounded-full border border-primary/35"></div>
                      <div className="relative z-10 flex flex-col items-center">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-black/40">
                          <MapPin className="w-5 h-5 text-white" strokeWidth={2.5} />
                        </div>
                        <div className="w-2 h-2 bg-primary/70 rounded-full mt-0.5"></div>
                      </div>
                    </div>
                    {/* Address + action */}
                    <div className="bg-white px-4 py-4 flex flex-col items-center text-center gap-3">
                      <div>
                        <p className="text-gray-800 text-sm font-bold">Visit Us</p>
                        <p className="text-gray-600 text-sm font-medium">Ultimate House, Oloolua</p>
                        <p className="text-gray-400 text-xs">Ngong, Kenya</p>
                      </div>
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_DIRECTIONS_MSG}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-primary hover:bg-primary/85 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors text-center"
                      >
                        View on Map
                      </a>
                    </div>
                  </div>

                  <Card className="border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
                          <Clock className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Opening Hours</h3>
                        <p className="text-gray-600 font-medium">Mon-Fri: 8:00 AM - 4:30 PM</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <div className="bg-white rounded-3xl shadow-xl p-2 border border-gray-100">
                    <div className="bg-gray-50 rounded-2xl p-6 md:p-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                        <ContactForm />
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContactPage;
