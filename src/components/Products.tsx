import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pill, Syringe, Heart, Shield, Bug, Droplets } from "lucide-react";

const products = [
  {
    category: "Antibiotics",
    icon: Shield,
    items: [
      { name: "Oxytetracycline Injectable 20%", stock: "In Stock" },
      { name: "Penicillin G Procaine", stock: "In Stock" },
      { name: "Enrofloxacin Tablets", stock: "Available" },
      { name: "Tylosin Injection", stock: "In Stock" }
    ]
  },
  {
    category: "Vaccines",
    icon: Syringe,
    items: [
      { name: "Newcastle Disease Vaccine", stock: "In Stock" },
      { name: "Foot and Mouth Disease Vaccine", stock: "Available" },
      { name: "Rabies Vaccine (Canine/Feline)", stock: "In Stock" },
      { name: "Brucellosis Vaccine", stock: "In Stock" }
    ]
  },
  {
    category: "Antiparasitics",
    icon: Bug,
    items: [
      { name: "Ivermectin Injectable 1%", stock: "In Stock" },
      { name: "Albendazole Oral Suspension", stock: "Available" },
      { name: "Flea & Tick Treatment", stock: "In Stock" },
      { name: "Deworming Tablets", stock: "In Stock" }
    ]
  },
  {
    category: "Supplements",
    icon: Heart,
    items: [
      { name: "Multivitamin Injectable", stock: "In Stock" },
      { name: "Calcium Borogluconate", stock: "Available" },
      { name: "Vitamin B-Complex", stock: "In Stock" },
      { name: "Probiotics for Livestock", stock: "In Stock" }
    ]
  },
  {
    category: "Pain Management",
    icon: Pill,
    items: [
      { name: "Meloxicam Injectable", stock: "In Stock" },
      { name: "Ketoprofen Injection", stock: "Available" },
      { name: "Tramadol Tablets", stock: "In Stock" },
      { name: "Butorphanol Injectable", stock: "Available" }
    ]
  },
  {
    category: "Fluids & Electrolytes",
    icon: Droplets,
    items: [
      { name: "Ringer's Lactate Solution", stock: "In Stock" },
      { name: "Saline Solution 0.9%", stock: "In Stock" },
      { name: "Dextrose 5% Solution", stock: "Available" },
      { name: "Oral Rehydration Salts", stock: "In Stock" }
    ]
  }
];

const Products = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-primary">Product Range</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive veterinary pharmaceuticals for every animal health need
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => {
            const Icon = product.icon;
            return (
              <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-xl">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="bg-secondary text-secondary-foreground">
                      {product.items.length} Products
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl">{product.category}</CardTitle>
                  <CardDescription>Essential medications for animal care</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {product.items.map((item, idx) => (
                      <li key={idx} className="flex justify-between items-center p-2 rounded hover:bg-accent">
                        <span className="text-sm font-medium">{item.name}</span>
                        <Badge variant="outline" className="text-xs border-primary text-primary">
                          {item.stock}
                        </Badge>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-4 bg-primary hover:bg-primary/90">
                    View All
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-2">
            <CardContent className="py-12">
              <h3 className="text-3xl font-bold text-foreground mb-4">
                Can't Find What You Need?
              </h3>
              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                We stock over 500+ veterinary products. Contact our team for specific requirements.
              </p>
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                Request Product Information
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Products;
