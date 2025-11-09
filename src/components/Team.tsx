import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Josiah Mandieka",
    role: "Managing Director",
    description: "experience in veterinary medicine and pharmaceutical distribution",
    specialty: "Large Animal Medicine"
  },
  {
    name: "Stella",
    role: "Managing Director",
    description: "Expert in pharmaceutical supply chain and business development",
    specialty: "Operations & Strategy"
  },
  {
    name: "Henry",
    role: "Technical Director",
    description: "Specialist in veterinary pharmacology and drug regulation compliance",
    specialty: "Pharmacology"
  },
  {
    name: "Obadiah",
    role: "Head of Sales",
    description: "Building strong partnerships with veterinary clinics nationwide",
    specialty: "Client Relations"
  },
  {
    name: "Catherine Mandieka",
    role: "Quality Assurance Manager",
    description: "Ensuring the highest standards in product quality and safety",
    specialty: "Quality Control"
  },
  {
    name: "Constance",
    role: "Customer Service Manager",
    description: "Dedicated to providing exceptional service and support",
    specialty: "Customer Care"
  }
];

const Team = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Meet Our <span className="text-primary">Expert Team</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Passionate professionals dedicated to animal health and welfare
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-xl group">
              <CardContent className="pt-8">
                <div className="text-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto flex items-center justify-center text-white text-4xl font-bold">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                    <p className="text-primary font-semibold">{member.role}</p>
                  </div>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {member.description}
                  </p>
                  
                  <div className="pt-2">
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {member.specialty}
                    </span>
                  </div>
                  
                  <div className="flex justify-center gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <Mail className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
