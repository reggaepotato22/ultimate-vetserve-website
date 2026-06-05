-- ============================================================
--  Seed 8 products directly into Supabase
--  Run this in: Supabase Dashboard → SQL Editor
-- ============================================================

insert into public.products (name, category, category_slug, species, form, description, full_description, active_ingredient, dosage, withdrawal_period, storage_info, stock, tags, featured, visible) values

(
  'ULTIVITA MULTIVITAMIN & MINERALS',
  'Powder Range', 'powder',
  array['Poultry', 'Livestock'],
  'Powder',
  'Water-soluble nutritional powder with vitamins, electrolytes, and amino acids to combat stress and dehydration.',
  'ULTIVITA Multivitamin & Minerals is a highly effective, water-soluble nutritional powder recommended for use in poultry of all ages and other farm animals. Formulated to assist during periods of stress and high temperature, it helps maintain peak production, optimal growth, and effectively combats dehydration. It also serves as an exceptional supportive aid to accelerate recovery from infections.',
  'Vitamins, Electrolytes, and Amino Acids',
  'Administer via the drinking water supply. Dissolve 15g (3 teaspoons) in 20 litres of drinking water for 5-6 consecutive days.',
  'Zero days (Nutritional Supplement)',
  'Store below 30°C. Protect from light. Keep out of reach of children.',
  'In Stock',
  array['Multivitamin', 'Nutritional Powder', 'Supplements', 'Stress Relief', 'Poultry'],
  true, true
),

(
  'ULTIVITA CHICKBOOST',
  'Powder Range', 'powder',
  array['Poultry'],
  'Powder',
  'Premium vitamin booster providing energy and stress relief for young chicks from day one.',
  'ULTIVITA Chickboost is a specialized water-soluble vitamin formula designed exclusively for young chicks. It provides a vital energy surge from the first day, significantly improving growth rates and general health. Formulated to help day-old chicks overcome the severe environmental stresses caused by temperature fluctuations, transport, handling, and initial vaccinations.',
  'Concentrated Essential Vitamins',
  'Use in clean drinking water from the first day. Add 1 teaspoon per 5 litres of drinking water for a period of 5-7 days continuously.',
  'Zero days (Nutritional Supplement)',
  'Store in a cool, dry place below 30°C. Protect from moisture and direct sunlight.',
  'In Stock',
  array['Chick Boost', 'Poultry', 'Vitamins', 'Day Old Chicks', 'Growth Promoter'],
  false, true
),

(
  'ULTIVITA BROILER',
  'Powder Range', 'powder',
  array['Poultry'],
  'Powder',
  'Targeted vitamin, amino acid, and electrolyte formula optimized for rapid broiler growth and conditioning.',
  'ULTIVITA Broiler is a rich nutritional powder precisely balanced with high-potency vitamins, vital electrolytes, and core amino acids. Specially formulated to meet the rapid metabolic demands of broiler chickens, it enhances weight gain, optimizes feed conversion ratios, improves overall health, and supports uniform growth across the flock.',
  'Vitamins, Electrolytes, and Amino Acids',
  'Administer by oral route after dissolving in clean drinking water or mixing thoroughly with broiler feeds. Water: 15gm per 20 litres (or 1 sachet in 130 litres of water). Feed: 10gm per 10kg of broiler feed. Administer daily for 6 consecutive days.',
  'Zero days (Nutritional Supplement)',
  'Keep container tightly sealed. Store below 30°C away from humidity.',
  'In Stock',
  array['Broiler Booster', 'Poultry', 'Amino Acids', 'Weight Gain', 'Feed Supplement'],
  false, true
),

(
  'ULTIVITA SUPER LAYER',
  'Powder Range', 'powder',
  array['Poultry'],
  'Powder',
  'Advanced layer supplement containing multivitamins and minerals to maximize egg production and shell quality.',
  'ULTIVITA Super Layer is an advanced nutritional supplement designed for growing layer chickens and birds in intensive egg production cycles. Packed with an array of multivitamins, trace minerals, and replenishing electrolytes, it significantly minimizes stress, aids in rapid disease recovery, curbs dehydration, and directly optimizes lay consistency, egg size, and shell durability.',
  'Multivitamins, Minerals, and Electrolytes',
  'Administer via the flock''s clean drinking water supply. Initial Dose: 15gm per 20 litres of drinking water for 5-7 days. Maintenance Dose: Continue with 10gm per 20 litres of water continuously.',
  'Zero days (Nutritional Supplement)',
  'Store in a cool, dry place. Ensure sachet is fully enclosed after use.',
  'In Stock',
  array['Layers', 'Egg Production', 'Poultry', 'Minerals', 'Shell Quality'],
  false, true
),

(
  'ULTIVITA INJECTION',
  'Injectables', 'injectables',
  array['Cattle', 'Livestock', 'Poultry', 'Pets'],
  'Injectable',
  'Fast-acting injectable multivitamin to aid recovery from stress, illness, deworming, and surgical procedures.',
  'ULTIVITA Injection is a premium therapeutic multivitamin solution configured for fast absorption. It helps farm animals and pets quickly overcome stress and accelerates structural recovery following intense clinical treatments, routine deworming, surgical interventions, and preventative vaccinations. In poultry herds, it delivers an active boost to metabolic growth rates, carcass meat yield, and egg output.',
  'Concentrated Multivitamins Solution',
  E'Cattle, Sheep, Goats, Calves, and Pigs: Administer via deep Intramuscular (I.M.) injection. \nTherapeutic Dose: Repeat weekly at a rate of 0.5-1 mL per 10kg body weight. \nPreventative Dose: Administer monthly at a rate of 0.5-1 mL per 10kg body weight. \nPoultry: Add into the drinking water supply at a clear rate of 1 mL per 10 litres of water.',
  'Zero days (Nutritional Supplement)',
  'Store below 25°C. Protect the vial from direct exposure to light.',
  'In Stock',
  array['Multivitamin Injection', 'Stress Recovery', 'Post Treatment', 'Cattle', 'Livestock'],
  false, true
),

(
  'MILKING SALVE',
  'General', 'general',
  array['Cattle', 'Livestock'],
  'Topical Cream/Jelly',
  'Antiseptic, 3-in-1 medicated milking jelly formulated with Lanolin and Cetrimide to prevent teat cracking.',
  'Ultimate Vetserve Milking Salve is a high-performance, 3-in-1 medicated milking jelly engineered specifically for dairy livestock. Combining the deep soothing barrier properties of Lanolin with the active antibacterial protection of Cetrimide, it sanitizes skin surfaces, prevents the spread of environmental mastitis pathogens, provides excellent lubrication, and completely prevents painful teat cracking or chapping during hand and machine milking cycles.',
  'Lanolin and Cetrimide',
  'Thoroughly wash and dry the teats, udder, and the milker''s hands using a clean milking cloth before extraction. Apply a generous layer of the milking salve directly onto the teats before and after every milking session. Compatible with both hand and mechanical machine milking.',
  'Zero days (Topical Antiseptic)',
  'For external animal treatment use only. Keep container lid tightly closed. Store in a cool place.',
  'In Stock',
  array['Milking Jelly', 'Udder Care', 'Lanolin', 'Antiseptic', 'Dairy Cattle', 'Teat Salve'],
  false, true
),

(
  'ULTICIDE DISINFECTANT',
  'General', 'general',
  array['General'],
  'Liquid Solution',
  'Broad-spectrum Glutaraldehyde disinfectant solution with proven efficacy against Pseudomonas, E. Coli, and Staph.',
  'ULTICIDE Disinfectant is a highly concentrated, commercial-grade Glutaraldehyde biocidal solution formulated for absolute biosecurity across veterinary clinics, intensive farming installations, and processing plants. It demonstrates intense microbial efficiency in completely destroying pathogenic bacterial strains including Pseudomonas aeruginosa, Escherichia coli, and Staphylococcus aureus on hard surfaces.',
  'Glutaraldehyde Solution',
  'For general hard surface decontamination and equipment sterilization: Use at a strict dilution ratio of 1:500 (or mix 20 mL of Ulticide per 10 litres of clean water). Ensure a minimum surface contact time of 5 minutes for complete bacterial eradication. Works optimally in solutions maintaining a pH value between 6.0 and 8.0.',
  'Not Applicable (Biosecurity Cleanser / Non-Animal Administered)',
  'Corrosive concentrate. Handle with protective gloves and eyewear. Avoid fumes. Keep out of reach of uncertified persons.',
  'In Stock',
  array['Disinfectant', 'Biosecurity', 'Farm Hygiene', 'Sterilization', 'Glutaraldehyde'],
  false, true
);
