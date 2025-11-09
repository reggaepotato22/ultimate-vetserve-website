import { useState } from "react";
import { NavLink } from "@/components/NavLink";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/uvs-logo.png";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Products", path: "/products" },
    { name: "Impact Stories", path: "/stories" },
    { name: "Our Team", path: "/team" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-background border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center gap-3">
            <img src={logo} alt="Ultimate Vetserve Limited" className="h-16 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg text-foreground hover:bg-accent transition-colors"
                activeClassName="bg-primary text-primary-foreground font-semibold"
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:block">
            <a href="/contact">
              <Button className="bg-secondary hover:bg-secondary/90">
                Get Quote
              </Button>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-3 rounded-lg text-foreground hover:bg-accent transition-colors"
                  activeClassName="bg-primary text-primary-foreground font-semibold"
                >
                  {link.name}
                </NavLink>
              ))}
              <a href="/contact">
                <Button className="mx-4 mt-2 bg-secondary hover:bg-secondary/90">
                  Get Quote
                </Button>
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
