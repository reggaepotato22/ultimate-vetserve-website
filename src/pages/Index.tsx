import Hero from "@/components/Hero";
import About from "@/components/About";
import Products from "@/components/Products";
import Team from "@/components/Team";
import Stories from "@/components/Stories";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <About />
      <Products />
      <Stories />
      <Team />
      <Footer />
    </div>
  );
};

export default Index;
