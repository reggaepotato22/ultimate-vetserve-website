import Navigation from "@/components/Navigation";
import About from "@/components/About";
import Footer from "@/components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">About Us</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Learn about our commitment to veterinary excellence and animal welfare
            </p>
          </div>
        </div>
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
