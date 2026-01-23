import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { ProductCategories } from "@/components/ProductCategories";
import { SocialProof } from "@/components/SocialProof";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Shield, Heart, TrendingUp, Phone } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen font-sans text-gray-900">
      <Navigation />
      <Hero />
      
      {/* Product Categories */}
      <ProductCategories />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">Our Values</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Why Choose Ultimate Vetserve
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We are committed to excellence in veterinary pharmaceuticals, ensuring quality and reliability in every product.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto rotate-3 group-hover:rotate-6 transition-transform">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Quality Guaranteed</h3>
                <p className="text-gray-600 leading-relaxed">
                  All products meet international standards and regulatory requirements.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 hover:border-green-500/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center mx-auto -rotate-3 group-hover:-rotate-6 transition-transform">
                  <TrendingUp className="w-7 h-7 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Reliable Supply</h3>
                <p className="text-gray-600 leading-relaxed">
                  Consistent stock availability with rapid nationwide delivery network.
                </p>
              </CardContent>
            </Card>

            <Card className="border border-gray-100 hover:border-blue-500/20 hover:shadow-xl transition-all duration-300">
              <CardContent className="pt-8 text-center space-y-4">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto rotate-3 group-hover:rotate-6 transition-transform">
                  <Heart className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Expert Support</h3>
                <p className="text-gray-600 leading-relaxed">
                  Professional guidance from experienced veterinary specialists.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <SocialProof />

      {/* Final CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1605000797499-95a053545e58?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ready to Provide Better Care?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of veterinarians and farmers who trust Ultimate Vetserve Limited.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 font-bold px-8 py-6 rounded-full shadow-lg">
                Contact Us Now
              </Button>
            </Link>
            <a href="tel:+254724241542">
                 <Button size="lg" className="w-full sm:w-auto bg-white text-primary hover:bg-gray-100 font-bold px-8 py-6 rounded-full shadow-lg">
                    <Phone className="mr-2 h-5 w-5" /> Call Sales
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
