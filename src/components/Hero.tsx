import { Button } from "@/components/ui/button";
import { ArrowRight, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import heroAnimals from "@/assets/hero-animals.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroAnimals})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-start text-left space-y-8 max-w-3xl">
          <div className="inline-block bg-primary/20 backdrop-blur-sm border border-primary/30 rounded-full px-4 py-1.5 mb-2">
            <span className="text-blue-100 font-medium text-sm tracking-wide uppercase">Trusted Veterinary Partner</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
            Quality Animal <br/>
            <span className="text-white inline-block mt-2">Health Solutions</span> <br/>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-xl leading-relaxed">
            We provide certified pharmaceutical products and expert veterinary advice to ensure the health and productivity of your livestock and pets.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link to="/contact">
              <Button 
                size="lg" 
                className="w-full sm:w-auto text-base px-8 py-6 bg-primary text-white hover:bg-blue-600 shadow-xl hover:shadow-2xl transition-all rounded-full font-semibold"
              >
                Get a Quote <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <a href="tel:+254724241542">
              <Button 
                size="lg" 
                variant="outline" 
                className="w-full sm:w-auto text-base px-8 py-6 border-2 border-white text-white hover:bg-white hover:text-gray-900 rounded-full font-semibold transition-all bg-transparent"
              >
                <Phone className="mr-2 w-5 h-5" /> Call Now
              </Button>
            </a>
          </div>

          <div className="flex items-center gap-8 pt-8 text-white/80 text-sm font-medium">
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Certified Products</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Nationwide Delivery</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Expert Support</span>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
