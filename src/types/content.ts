export type StockStatus = "In Stock" | "Available" | "Low Stock";

export type Product = {
  id: string;
  name: string;
  category: string;
  categorySlug: string;
  species: string[];
  form: string;
  description: string;
  fullDescription?: string;
  activeIngredient?: string;
  dosage?: string;
  withdrawalPeriod?: string;
  storageInfo?: string;
  stock: StockStatus;
  tags: string[];
  imageUrl?: string;
  featured?: boolean;
  visible?: boolean;
  orderIndex?: number;
};

export type NewsArticle = {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  category: string;
  imageUrl?: string;
  author: string;
  publishedAt: string;
  featured?: boolean;
};

export type TeamMember = {
  id: string;
  name: string;
  title?: string;
  bio?: string;
  imageUrl?: string;
  visible?: boolean;
  orderIndex: number;
};

export type HeroContent = {
  badge: string;
  title: string;
  titleAccent: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
  stats: Array<{ val: string; label: string }>;
};

export type HomepageContent = {
  partnersTitle: string;
  partners: Array<{ name: string; logo?: string }>;
  newsTitle: string;
  newsSubtitle: string;
  ctaTitle: string;
  ctaSubtitle: string;
};

export type AboutContent = {
  heroTitle: string;
  heroSubtitle: string;
  storyTitle: string;
  storyText: string;
  vision: string;
  mission: string;
  values: string;
  commitmentTitle: string;
  commitmentText: string;
  commitmentValues: string[];
  certifications: Array<{ name: string; body: string }>;
};

export type SustainabilityContent = {
  heroTitle: string;
  heroSubtitle: string;
  missionTitle: string;
  missionText: string;
  kvmTitle: string;
  kvmText: string;
  programs: Array<{ title: string; description: string; icon: string }>;
  stats: Array<{ value: string; label: string; description: string }>;
  partners: Array<{ name: string; website?: string }>;
  ctaTitle: string;
  ctaText: string;
};
