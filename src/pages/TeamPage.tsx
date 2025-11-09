import Navigation from "@/components/Navigation";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

const TeamPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <div className="bg-gradient-to-r from-primary to-secondary py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Team</h1>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Meet the passionate professionals behind Ultimate Vetserve Limited
            </p>
          </div>
        </div>
        <Team />
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
