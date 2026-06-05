import { useState, useEffect } from "react";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { allProducts as localProducts } from "@/data/products";
import { defaultNews as localNews } from "@/data/news";
import type { Product, NewsArticle, TeamMember } from "@/types/content";

type SupabaseRow = Record<string, unknown>;

function mapProduct(row: SupabaseRow): Product {
  return {
    id: row.id as string,
    name: row.name as string,
    category: row.category as string,
    categorySlug: row.category_slug as string,
    species: (row.species as string[]) ?? [],
    form: row.form as string,
    description: (row.description as string) ?? "",
    fullDescription: row.full_description as string | undefined,
    activeIngredient: row.active_ingredient as string | undefined,
    dosage: row.dosage as string | undefined,
    withdrawalPeriod: row.withdrawal_period as string | undefined,
    storageInfo: row.storage_info as string | undefined,
    stock: (row.stock as string) ?? "In Stock",
    tags: (row.tags as string[]) ?? [],
    imageUrl: row.image_url as string | undefined,
    featured: (row.featured as boolean) ?? false,
    visible: (row.visible as boolean) ?? true,
    orderIndex: (row.order_index as number) ?? 0,
  } as Product;
}

function mapNews(row: SupabaseRow): NewsArticle {
  return {
    id: row.id as string,
    title: row.title as string,
    slug: row.slug as string,
    excerpt: row.excerpt as string | undefined,
    content: row.content as string | undefined,
    category: (row.category as string) ?? "News",
    imageUrl: row.image_url as string | undefined,
    author: (row.author as string) ?? "Ultimate Vetserve",
    publishedAt: row.published_at as string,
    featured: (row.featured as boolean) ?? false,
  };
}

function mapTeamMember(row: SupabaseRow): TeamMember {
  return {
    id: row.id as string,
    name: row.name as string,
    title: row.title as string | undefined,
    bio: row.bio as string | undefined,
    imageUrl: row.image_url as string | undefined,
    visible: (row.visible as boolean) ?? true,
    orderIndex: (row.order_index as number) ?? 0,
  };
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(localProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("products")
      .select("*")
      .order("order_index", { ascending: true })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProducts(data.map(mapProduct));
        }
        setLoading(false);
      });
  }, []);

  return { products, setProducts, loading };
}

export function useNews() {
  const [articles, setArticles] = useState<NewsArticle[]>(localNews);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("news_events")
      .select("*")
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setArticles(data.map(mapNews));
        }
        setLoading(false);
      });
  }, []);

  return { articles, setArticles, loading };
}

export function useTeamMembers() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("team_members")
      .select("*")
      .order("order_index", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("useTeamMembers fetch error:", error.message);
        } else if (data && data.length > 0) {
          setMembers(data.map(mapTeamMember));
        }
        setLoading(false);
      });
  }, []);

  return { members, setMembers, loading };
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("site_settings")
      .select("*")
      .then(({ data, error }) => {
        if (!error && data) {
          const map: Record<string, unknown> = {};
          for (const row of data) {
            map[row.key as string] = row.value;
          }
          setSettings(map);
        }
        setLoading(false);
      });
  }, []);

  return { settings, setSettings, loading };
}
