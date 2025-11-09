import { Target, Eye, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section className="py-20 bg-accent">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            About <span className="text-primary">Ultimate Vetserve Limited</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in veterinary pharmaceutical excellence since our establishment
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="border-2 hover:border-primary transition-all shadow-lg">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Eye className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
              <p className="text-muted-foreground">
                To become the leading provider of veterinary pharmaceuticals in the region, 
                recognized for quality, reliability, and compassionate animal healthcare solutions.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-secondary transition-all shadow-lg">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Target className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
              <p className="text-muted-foreground">
                To provide veterinarians and animal owners with premium-quality medications and 
                supplies, ensuring optimal health outcomes for all animals under their care.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 hover:border-primary transition-all shadow-lg">
            <CardContent className="pt-8 text-center space-y-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-foreground">Our Values</h3>
              <p className="text-muted-foreground">
                Quality assurance, ethical practices, customer dedication, innovation in animal 
                healthcare, and unwavering commitment to animal welfare.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="bg-card rounded-2xl p-8 md:p-12 shadow-xl border">
          <h3 className="text-3xl font-bold text-foreground mb-6 text-center">Our Commitment</h3>
          <p className="text-lg text-muted-foreground text-center max-w-4xl mx-auto leading-relaxed">
            At Ultimate Vetserve Limited, we understand that animals are more than just livestock or pets—they're 
            family members, livelihoods, and companions. Our comprehensive range of veterinary pharmaceuticals, 
            from antibiotics to vaccines, from nutritional supplements to surgical supplies, ensures that every 
            veterinary professional has access to the tools they need to provide exceptional care.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
