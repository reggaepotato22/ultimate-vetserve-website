import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp = () => {
  const phoneNumber = "254724241542"; // Replace with actual number
  const message = "Hello, I would like to inquire about veterinary products.";

  return (
    <a
      href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white px-4 py-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-all hover:scale-105 animate-fade-in"
    >
      <MessageCircle className="w-6 h-6 fill-current" />
      <span className="font-semibold hidden sm:inline">Chat on WhatsApp</span>
    </a>
  );
};
