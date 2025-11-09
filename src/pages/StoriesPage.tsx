import Navigation from "@/components/Navigation";
import Stories from "@/components/Stories";
import Footer from "@/components/Footer";
import storiesBg from "@/assets/stories-bg.jpg";

const StoriesPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="relative py-20 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${storiesBg})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/90"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">Impact Stories</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Real stories of how quality veterinary care changes lives
            </p>
          </div>
        </div>
        <Stories />
      </main>
      <Footer />
    </div>
  );
};

export default StoriesPage;
