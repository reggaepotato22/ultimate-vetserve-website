import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import logo from "@/assets/uvs-logo.png";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="space-y-6">
            <img src={logo} alt="Ultimate Vetserve Limited" className="w-48 h-auto brightness-0 invert" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Ultimate Vetserve Limited is your trusted partner in veterinary pharmaceutical excellence, dedicated to improving animal health across Kenya.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/" className="hover:text-primary transition-colors block py-1">Home</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors block py-1">About Us</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors block py-1">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-6 text-white">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                <span className="text-gray-400">
                  Industrial Area, Road C<br/>
                  Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0 text-primary" />
                <a href="tel:+254700000000" className="text-gray-400 hover:text-white transition-colors">
                  +254 700 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0 text-primary" />
                <a href="mailto:info@ultimatevetserve.com" className="text-gray-400 hover:text-white transition-colors">
                  info@ultimatevetserve.com
                </a>
              </li>
            </ul>
          </div>

          <div className="h-full min-h-[200px] rounded-lg overflow-hidden bg-gray-800 relative">
             {/* Map Placeholder */}
             <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d255281.19036281522!2d36.70730729932135!3d-1.303205096504825!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1172d84d49a7%3A0xf7cf0254b297924c!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2s!4v1709900000000!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, minHeight: '200px' }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
             ></iframe>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} Ultimate Vetserve Limited. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
