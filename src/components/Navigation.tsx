import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/uvs-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    // { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm transition-all">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Ultimate Vetserve Limited" className="h-14 w-auto object-contain" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-full text-gray-600 hover:text-primary hover:bg-blue-50 transition-colors font-medium"
                activeClassName="bg-blue-50 text-primary font-semibold"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+254700000000" className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors">
                <div className="bg-blue-100 p-2 rounded-full">
                    <Phone className="h-4 w-4 text-primary" />
                </div>
                <span className="font-semibold text-sm">Call Now</span>
            </a>
            <a href="/contact">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-md hover:shadow-lg transition-all">
                Get Quote
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 text-gray-600"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white animate-accordion-down">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-primary transition-colors font-medium"
                  activeClassName="bg-blue-50 text-primary font-semibold"
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="px-4 pt-4 border-t border-gray-100 mt-2 flex flex-col gap-3">
                 <a href="tel:+254724241542" className="flex items-center gap-2 text-gray-600 justify-center py-2 border border-gray-200 rounded-lg">
                    <Phone className="h-4 w-4" />
                    <span className="font-semibold">Call Now</span>
                </a>
                <a href="/contact" className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-lg">
                    Get Quote
                    </Button>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
