import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Construction } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ProductsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 flex flex-col items-center justify-center bg-gray-50 py-20 px-4 text-center">
        <div className="bg-white p-12 rounded-3xl shadow-xl max-w-2xl w-full border border-gray-100">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8">
            <Construction className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Under Construction</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We are currently updating our product catalog to serve you better. 
            Please check back soon or contact us directly for product inquiries.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/contact">
              <Button size="lg" className="w-full sm:w-auto font-bold rounded-full">
                Contact Sales
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold rounded-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
