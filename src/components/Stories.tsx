import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const stories = [
  {
    title: "Saving Lives, One Prescription at a Time",
    story: "When a severe outbreak of Newcastle disease threatened to devastate poultry farms across three districts, our rapid-response team worked around the clock to distribute vaccines and preventive medications. Within two weeks, we helped protect over 50,000 birds, saving farmers' livelihoods and ensuring food security for the region.",
    impact: "50,000+ birds protected"
  },
  {
    title: "Companion Animal Emergency Response",
    story: "During the recent flooding, many pets were separated from their families and suffered from various ailments. Our emergency veterinary supply program provided critical medications, wound care supplies, and nutrition support free of charge to affected animals, helping reunite 200+ pets with their families in healthy condition.",
    impact: "200+ pets treated and reunited"
  },
  {
    title: "Empowering Rural Veterinarians",
    story: "In remote farming communities, access to quality veterinary medications was limited. We established a mobile distribution network that reaches veterinarians in 15 rural districts, ensuring even the most isolated communities have access to life-saving medications for their livestock.",
    impact: "15 districts now served"
  },
  {
    title: "Innovation in Animal Healthcare",
    story: "By partnering with leading international pharmaceutical companies, we've introduced cutting-edge veterinary medications to the market, including advanced pain management solutions and targeted antibiotic therapies that reduce treatment time by 40% while improving animal welfare.",
    impact: "40% faster recovery times"
  }
];

const Stories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why <span className="text-primary">We Exist</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Real stories of impact and the difference quality veterinary care makes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {stories.map((story, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-xl">
              <CardContent className="pt-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground">{story.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{story.story}</p>
                    <div className="pt-4 border-t">
                      <p className="text-primary font-bold text-lg">{story.impact}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-bold">
              Every Animal Deserves Quality Healthcare
            </h3>
            <p className="text-lg opacity-90 leading-relaxed">
              From preventing disease outbreaks that could devastate communities, to ensuring pets 
              receive the care they need, to supporting veterinarians with reliable supplies—our work 
              matters. Quality veterinary pharmaceuticals aren't just products; they're the foundation 
              of animal welfare, food security, and thriving communities.
            </p>
            <div className="pt-6">
              <div className="inline-flex items-center gap-8 flex-wrap justify-center">
                <div>
                  <p className="text-4xl font-bold">500+</p>
                  <p className="text-sm opacity-90">Products Available</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">1,000+</p>
                  <p className="text-sm opacity-90">Veterinarians Served</p>
                </div>
                <div>
                  <p className="text-4xl font-bold">50,000+</p>
                  <p className="text-sm opacity-90">Animals Helped</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stories;
