import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lzmmugvqeosvszxlqjva.supabase.co";
const supabaseKey = "sb_publishable_zDeR5WXHWCUbqZbZE_wn2g_UC1b6Y7Q";

const supabase = createClient(supabaseUrl, supabaseKey);

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.log("Usage: node scripts/seed-products.mjs <admin-email> <admin-password>");
  console.log("This signs in as admin, then inserts the products.");
  process.exit(1);
}

const products = [
  {
    name: "ULTIVITA MULTIVITAMIN & MINERALS",
    category: "Powder Range", category_slug: "powder",
    species: ["Poultry", "Livestock"], form: "Powder",
    description: "Water-soluble nutritional powder with vitamins, electrolytes, and amino acids to combat stress and dehydration.",
    full_description: "ULTIVITA Multivitamin & Minerals is a highly effective, water-soluble nutritional powder recommended for use in poultry of all ages and other farm animals. Formulated to assist during periods of stress and high temperature, it helps maintain peak production, optimal growth, and effectively combats dehydration. It also serves as an exceptional supportive aid to accelerate recovery from infections.",
    active_ingredient: "Vitamins, Electrolytes, and Amino Acids",
    dosage: "Administer via the drinking water supply. Dissolve 15g (3 teaspoons) in 20 litres of drinking water for 5-6 consecutive days.",
    withdrawal_period: "Zero days (Nutritional Supplement)",
    storage_info: "Store below 30°C. Protect from light. Keep out of reach of children.",
    stock: "In Stock",
    tags: ["Multivitamin", "Nutritional Powder", "Supplements", "Stress Relief", "Poultry"],
    featured: true, visible: true,
  },
  {
    name: "ULTIVITA CHICKBOOST",
    category: "Powder Range", category_slug: "powder",
    species: ["Poultry"], form: "Powder",
    description: "Premium vitamin booster providing energy and stress relief for young chicks from day one.",
    full_description: "ULTIVITA Chickboost is a specialized water-soluble vitamin formula designed exclusively for young chicks. It provides a vital energy surge from the first day, significantly improving growth rates and general health. Formulated to help day-old chicks overcome the severe environmental stresses caused by temperature fluctuations, transport, handling, and initial vaccinations.",
    active_ingredient: "Concentrated Essential Vitamins",
    dosage: "Use in clean drinking water from the first day. Add 1 teaspoon per 5 litres of drinking water for a period of 5-7 days continuously.",
    withdrawal_period: "Zero days (Nutritional Supplement)",
    storage_info: "Store in a cool, dry place below 30°C. Protect from moisture and direct sunlight.",
    stock: "In Stock",
    tags: ["Chick Boost", "Poultry", "Vitamins", "Day Old Chicks", "Growth Promoter"],
    featured: false, visible: true,
  },
  {
    name: "ULTIVITA BROILER",
    category: "Powder Range", category_slug: "powder",
    species: ["Poultry"], form: "Powder",
    description: "Targeted vitamin, amino acid, and electrolyte formula optimized for rapid broiler growth and conditioning.",
    full_description: "ULTIVITA Broiler is a rich nutritional powder precisely balanced with high-potency vitamins, vital electrolytes, and core amino acids. Specially formulated to meet the rapid metabolic demands of broiler chickens, it enhances weight gain, optimizes feed conversion ratios, improves overall health, and supports uniform growth across the flock.",
    active_ingredient: "Vitamins, Electrolytes, and Amino Acids",
    dosage: "Administer by oral route after dissolving in clean drinking water or mixing thoroughly with broiler feeds. Water: 15gm per 20 litres (or 1 sachet in 130 litres of water). Feed: 10gm per 10kg of broiler feed. Administer daily for 6 consecutive days.",
    withdrawal_period: "Zero days (Nutritional Supplement)",
    storage_info: "Keep container tightly sealed. Store below 30°C away from humidity.",
    stock: "In Stock",
    tags: ["Broiler Booster", "Poultry", "Amino Acids", "Weight Gain", "Feed Supplement"],
    featured: false, visible: true,
  },
  {
    name: "ULTIVITA SUPER LAYER",
    category: "Powder Range", category_slug: "powder",
    species: ["Poultry"], form: "Powder",
    description: "Advanced layer supplement containing multivitamins and minerals to maximize egg production and shell quality.",
    full_description: "ULTIVITA Super Layer is an advanced nutritional supplement designed for growing layer chickens and birds in intensive egg production cycles. Packed with an array of multivitamins, trace minerals, and replenishing electrolytes, it significantly minimizes stress, aids in rapid disease recovery, curbs dehydration, and directly optimizes lay consistency, egg size, and shell durability.",
    active_ingredient: "Multivitamins, Minerals, and Electrolytes",
    dosage: "Administer via the flock's clean drinking water supply. Initial Dose: 15gm per 20 litres of drinking water for 5-7 days. Maintenance Dose: Continue with 10gm per 20 litres of water continuously.",
    withdrawal_period: "Zero days (Nutritional Supplement)",
    storage_info: "Store in a cool, dry place. Ensure sachet is fully enclosed after use.",
    stock: "In Stock",
    tags: ["Layers", "Egg Production", "Poultry", "Minerals", "Shell Quality"],
    featured: false, visible: true,
  },
  {
    name: "ULTIVITA INJECTION",
    category: "Injectables", category_slug: "injectables",
    species: ["Cattle", "Livestock", "Poultry", "Pets"], form: "Injectable",
    description: "Fast-acting injectable multivitamin to aid recovery from stress, illness, deworming, and surgical procedures.",
    full_description: "ULTIVITA Injection is a premium therapeutic multivitamin solution configured for fast absorption. It helps farm animals and pets quickly overcome stress and accelerates structural recovery following intense clinical treatments, routine deworming, surgical interventions, and preventative vaccinations. In poultry herds, it delivers an active boost to metabolic growth rates, carcass meat yield, and egg output.",
    active_ingredient: "Concentrated Multivitamins Solution",
    dosage: "Cattle, Sheep, Goats, Calves, and Pigs: Administer via deep Intramuscular (I.M.) injection.\nTherapeutic Dose: Repeat weekly at a rate of 0.5-1 mL per 10kg body weight.\nPreventative Dose: Administer monthly at a rate of 0.5-1 mL per 10kg body weight.\nPoultry: Add into the drinking water supply at a clear rate of 1 mL per 10 litres of water.",
    withdrawal_period: "Zero days (Nutritional Supplement)",
    storage_info: "Store below 25°C. Protect the vial from direct exposure to light.",
    stock: "In Stock",
    tags: ["Multivitamin Injection", "Stress Recovery", "Post Treatment", "Cattle", "Livestock"],
    featured: false, visible: true,
  },
  {
    name: "MILKING SALVE",
    category: "General", category_slug: "general",
    species: ["Cattle", "Livestock"], form: "Topical Cream/Jelly",
    description: "Antiseptic, 3-in-1 medicated milking jelly formulated with Lanolin and Cetrimide to prevent teat cracking.",
    full_description: "Ultimate Vetserve Milking Salve is a high-performance, 3-in-1 medicated milking jelly engineered specifically for dairy livestock. Combining the deep soothing barrier properties of Lanolin with the active antibacterial protection of Cetrimide, it sanitizes skin surfaces, prevents the spread of environmental mastitis pathogens, provides excellent lubrication, and completely prevents painful teat cracking or chapping during hand and machine milking cycles.",
    active_ingredient: "Lanolin and Cetrimide",
    dosage: "Thoroughly wash and dry the teats, udder, and the milker's hands using a clean milking cloth before extraction. Apply a generous layer of the milking salve directly onto the teats before and after every milking session. Compatible with both hand and mechanical machine milking.",
    withdrawal_period: "Zero days (Topical Antiseptic)",
    storage_info: "For external animal treatment use only. Keep container lid tightly closed. Store in a cool place.",
    stock: "In Stock",
    tags: ["Milking Jelly", "Udder Care", "Lanolin", "Antiseptic", "Dairy Cattle", "Teat Salve"],
    featured: false, visible: true,
  },
  {
    name: "ULTICIDE DISINFECTANT",
    category: "General", category_slug: "general",
    species: ["General"], form: "Liquid Solution",
    description: "Broad-spectrum Glutaraldehyde disinfectant solution with proven efficacy against Pseudomonas, E. Coli, and Staph.",
    full_description: "ULTICIDE Disinfectant is a highly concentrated, commercial-grade Glutaraldehyde biocidal solution formulated for absolute biosecurity across veterinary clinics, intensive farming installations, and processing plants. It demonstrates intense microbial efficiency in completely destroying pathogenic bacterial strains including Pseudomonas aeruginosa, Escherichia coli, and Staphylococcus aureus on hard surfaces.",
    active_ingredient: "Glutaraldehyde Solution",
    dosage: "For general hard surface decontamination and equipment sterilization: Use at a strict dilution ratio of 1:500 (or mix 20 mL of Ulticide per 10 litres of clean water). Ensure a minimum surface contact time of 5 minutes for complete bacterial eradication. Works optimally in solutions maintaining a pH value between 6.0 and 8.0.",
    withdrawal_period: "Not Applicable (Biosecurity Cleanser / Non-Animal Administered)",
    storage_info: "Corrosive concentrate. Handle with protective gloves and eyewear. Avoid fumes. Keep out of reach of uncertified persons.",
    stock: "In Stock",
    tags: ["Disinfectant", "Biosecurity", "Farm Hygiene", "Sterilization", "Glutaraldehyde"],
    featured: false, visible: true,
  },
];

async function main() {
  console.log("Signing in as admin...");
  const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError) {
    console.error("Auth error:", authError.message);
    process.exit(1);
  }
  console.log("Authenticated. Inserting products...");
  const { data, error } = await supabase.from("products").insert(products).select("id, name");
  if (error) {
    console.error("Insert error:", error.message);
    process.exit(1);
  }
  console.log(`Successfully inserted ${data.length} products:`);
  data.forEach((p) => console.log(`  - ${p.name} (${p.id})`));
}

main();
