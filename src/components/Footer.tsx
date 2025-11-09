import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import logo from "@/assets/uvs-logo.png";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <img src={logo} alt="Ultimate Vetserve Limited" className="w-48 h-auto brightness-0 invert" />
            <p className="text-sm opacity-80">
              We Care For Your Animals - Your trusted partner in veterinary pharmaceutical excellence.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#about" className="hover:text-primary transition-colors">About Us</a></li>
              <li><a href="#products" className="hover:text-primary transition-colors">Products</a></li>
              <li><a href="#team" className="hover:text-primary transition-colors">Our Team</a></li>
              <li><a href="#stories" className="hover:text-primary transition-colors">Impact Stories</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Products</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">Antibiotics</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Vaccines</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Supplements</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">All Products</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">Contact</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-primary" />
                <span className="opacity-80">Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="tel:+254700000000" className="opacity-80 hover:text-primary transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0 text-primary" />
                <a href="mailto:info@ultimatevetserve.com" className="opacity-80 hover:text-primary transition-colors">
                  info@ultimatevetserve.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm opacity-80">
            © 2024 Ultimate Vetserve Limited. All rights reserved.
          </p>
          
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-primary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
