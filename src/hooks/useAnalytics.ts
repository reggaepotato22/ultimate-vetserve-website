import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";

const trackedPaths = new Set<string>();

export function usePageViewTracking() {
  const location = useLocation();

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return;
    const path = location.pathname;
    if (trackedPaths.has(path)) return;
    trackedPaths.add(path);
    supabase.from("page_views").insert({
      path,
      referrer: document.referrer || null,
      user_agent: navigator.userAgent,
    }).then().catch(() => {});
  }, [location.pathname]);
}

export type PageView = {
  id: string;
  path: string;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export type Inquiry = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  clinic: string | null;
  message: string | null;
  products: unknown;
  status: string;
  created_at: string;
};

export function usePageViews() {
  const [views, setViews] = useState<PageView[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) { setLoading(false); return; }
    supabase.from("page_views").select("*").order("created_at", { ascending: false }).limit(1000).then(({ data, error }) => {
      if (!error && data) setViews(data as PageView[]);
      setLoading(false);
    });
  }, []);

  return { views, loading };
}

export function useInquiries() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    if (!isSupabaseConfigured || !supabase) { setLoading(false); return; }
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }).then(({ data, error }) => {
      if (!error && data) setInquiries(data as Inquiry[]);
      setLoading(false);
    });
  };

  useEffect(() => { fetch(); }, []);

  return { inquiries, setInquiries, loading, refetch: fetch };
}

export function useAnalyticsSummary(intervalMs = 0) {
  const [stats, setStats] = useState({
    totalProducts: 0, totalNews: 0, totalTeam: 0,
    totalInquiries: 0, newInquiries: 0, totalViews: 0,
    viewsToday: 0, viewsThisWeek: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    if (!isSupabaseConfigured || !supabase) { setLoading(false); return; }
    Promise.all([
      supabase.from("products").select("*", { count: "exact", head: true }),
      supabase.from("news_events").select("*", { count: "exact", head: true }),
      supabase.from("team_members").select("*", { count: "exact", head: true }),
      supabase.from("inquiries").select("*", { count: "exact", head: true }),
      supabase.from("inquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase.from("page_views").select("*", { count: "exact", head: true }),
      supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", new Date(Date.now() - 86400000).toISOString()),
      supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", new Date(Date.now() - 604800000).toISOString()),
    ]).then(([
      { count: pc }, { count: nc }, { count: tc },
      { count: ic }, { count: nic }, { count: vc },
      { count: vtd }, { count: vtw },
    ]) => {
      setStats({
        totalProducts: pc ?? 0, totalNews: nc ?? 0, totalTeam: tc ?? 0,
        totalInquiries: ic ?? 0, newInquiries: nic ?? 0, totalViews: vc ?? 0,
        viewsToday: vtd ?? 0, viewsThisWeek: vtw ?? 0,
      });
      setLoading(false);
    });
  };

  useEffect(() => { fetch(); if (intervalMs > 0) { const id = setInterval(fetch, intervalMs); return () => clearInterval(id); } }, [intervalMs]);

  return { stats, loading, refetch: fetch };
}

export function useViewsByDay(days = 30, intervalMs = 0) {
  const [data, setData] = useState<{ date: string; views: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    if (!isSupabaseConfigured || !supabase) { setLoading(false); return; }
    const start = new Date(Date.now() - days * 86400000).toISOString();
    supabase.from("page_views").select("created_at").gte("created_at", start).then(({ data: rows, error }) => {
      if (error) { setLoading(false); return; }
      const map = new Map<string, number>();
      for (const r of rows as PageView[]) {
        const d = r.created_at.slice(0, 10);
        map.set(d, (map.get(d) ?? 0) + 1);
      }
      const result: { date: string; views: number }[] = [];
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(Date.now() - i * 86400000).toISOString().slice(0, 10);
        result.push({ date: d.slice(5), views: map.get(d) ?? 0 });
      }
      setData(result);
      setLoading(false);
    });
  };

  useEffect(() => { fetch(); if (intervalMs > 0) { const id = setInterval(fetch, intervalMs); return () => clearInterval(id); } }, [days, intervalMs]);

  return { data, loading, refetch: fetch };
}

export function useInquiriesByStatus(intervalMs = 0) {
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = () => {
    if (!isSupabaseConfigured || !supabase) { setLoading(false); return; }
    supabase.from("inquiries").select("status").then(({ data: rows, error }) => {
      if (error) { setLoading(false); return; }
      const map = new Map<string, number>();
      for (const r of rows as Inquiry[]) {
        map.set(r.status, (map.get(r.status) ?? 0) + 1);
      }
      setData(Array.from(map.entries()).map(([name, value]) => ({ name, value })));
      setLoading(false);
    });
  };

  useEffect(() => { fetch(); if (intervalMs > 0) { const id = setInterval(fetch, intervalMs); return () => clearInterval(id); } }, [intervalMs]);

  return { data, loading, refetch: fetch };
}
