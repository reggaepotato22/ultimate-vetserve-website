import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Dog, Beef, Bird } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Livestock",
    description: "Essential medicines and supplements for cattle, sheep, and goats.",
    icon: Beef,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-100",
    link: "/products?category=livestock"
  },
  {
    title: "Poultry",
    description: "Vaccines and growth boosters for healthy chicken farming.",
    icon: Bird,
    color: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-100",
    link: "/products?category=poultry"
  },
  {
    title: "Pets",
    description: "Care products for dogs, cats, and other companion animals.",
    icon: Dog,
    color: "text-orange-600",
    bg: "bg-orange-50",
    border: "border-orange-100",
    link: "/products?category=pets"
  }
];

export const ProductCategories = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
            Our Product Categories
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Find the right solutions for your animals with our specialized product ranges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.title} className={`hover:shadow-xl transition-all duration-300 border ${category.border} bg-white group overflow-hidden`}>
              <CardHeader className="text-center pb-6 pt-10 bg-gradient-to-b from-gray-50/50 to-transparent">
                <div className={`w-20 h-20 ${category.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                  <category.icon className={`w-10 h-10 ${category.color}`} strokeWidth={1.5} />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-800">{category.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-10 px-8">
                <p className="text-gray-600 mb-8 leading-relaxed">{category.description}</p>
                <Link to={category.link}>
                  <Button variant="outline" className="rounded-full px-8 hover:bg-primary hover:text-white border-primary/20 text-primary transition-all">
                    Explore {category.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
