import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/uvs-logo.png";
import heroAnimals from "@/assets/hero-animals.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroAnimals})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-secondary/80"></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          <img 
            src={logo} 
            alt="Ultimate Vetserve Limited" 
            className="w-64 h-auto animate-fade-in drop-shadow-2xl"
          />
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight drop-shadow-lg">
            We Care For Your{" "}
            <span className="text-white">Animals</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/95 max-w-2xl drop-shadow-md">
            Premium veterinary pharmaceuticals and supplies for the health and wellbeing 
            of livestock and companion animals across the nation.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link to="/products">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-3xl transition-all font-semibold"
              >
                Browse Products <ArrowRight className="ml-2" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-8 py-6 border-2 border-white text-white hover:bg-white/20 font-semibold"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
