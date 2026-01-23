import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ContactForm } from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navigation />
      <main className="flex-1 bg-gray-50">
        <div className="bg-primary py-20 text-white relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576201836163-49758479d1b4?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 mix-blend-multiply"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Get in Touch</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto font-light">
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
                        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                          <Phone className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Call Us</h3>
                        <a href="tel:+254724241542" className="text-gray-600 hover:text-primary transition-colors font-medium">+254 724 241542</a>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                          <Mail className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Email Us</h3>
                        <a href="mailto:info@ultimatevetserve.com" className="text-gray-600 hover:text-primary transition-colors font-medium">info@ultimatevetserve.com</a>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                          <MapPin className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2 text-gray-800">Visit Us</h3>
                        <p className="text-gray-600 font-medium">Nairobi, Kenya</p>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all">
                    <CardContent className="pt-8 pb-8 flex flex-col items-center text-center">
                        <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mb-4">
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
