import { Star } from "lucide-react";

export const SocialProof = () => {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Trusted by Veterinarians Across Kenya</h3>
          <div className="flex justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
        </div>

        {/* Partner Logos Placeholder */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Replace these with actual partner logos */}
            <div className="text-xl font-bold text-gray-400">VET LABS</div>
            <div className="text-xl font-bold text-gray-400">KENYA PHARMA</div>
            <div className="text-xl font-bold text-gray-400">AGRI-SOLUTIONS</div>
            <div className="text-xl font-bold text-gray-400">FARM CARE</div>
        </div>
      </div>
    </section>
  );
};
