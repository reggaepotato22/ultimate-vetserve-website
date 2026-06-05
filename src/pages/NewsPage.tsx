import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Search, ChevronRight, Tag } from "lucide-react";
import { newsCategories } from "@/data/news";
import { useNews } from "@/hooks/useData";
import { format } from "date-fns";

const NewsPage = () => {
  const { articles: defaultNews } = useNews();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = defaultNews.filter((n) => {
    const matchCat = activeCategory === "All" || n.category === activeCategory;
    const matchQ = !searchQuery || n.title.toLowerCase().includes(searchQuery.toLowerCase()) || (n.excerpt ?? "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchQ;
  });

  const featured = filtered.find((n) => n.featured) ?? filtered[0];
  const rest = filtered.filter((n) => n.id !== featured?.id);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/40">
      <Navigation />

      {/* Hero */}
      <div className="relative bg-zinc-950 py-18 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1600')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/98 via-zinc-950/90 to-zinc-900/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-zinc-950/20" />
        <div className="absolute inset-0 bg-grid-green opacity-20" />
        <div className="container mx-auto px-4 relative z-10 py-16">
          <div className="flex items-center gap-1.5 text-emerald-300/70 text-xs mb-5">
            <Link to="/" className="hover:text-emerald-300 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white font-medium">News & Insights</span>
          </div>
          <p className="text-[11px] font-bold text-emerald-400 uppercase tracking-[0.2em] mb-3">Stay Informed</p>
          <h1 className="font-display text-[2.8rem] md:text-[3.6rem] font-extrabold mb-3 tracking-tight leading-[1.08]">News & Insights</h1>
          <p className="text-zinc-300 max-w-2xl font-light text-[15.5px] leading-relaxed">
            The latest in veterinary science, farm health management, product updates, and company news from Ultimate Vetserve.
          </p>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Search + Category filters */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 flex-wrap">
            {newsCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all border shrink-0 ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary shadow-sm"
                    : "bg-white text-gray-600 border-gray-200 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative shrink-0 w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:border-primary/50 transition-colors"
            />
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No articles found. Try adjusting your search.</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <Link to={`/news/${featured.slug}`} className="group block mb-10">
                <div className="relative bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
                  <div className="grid md:grid-cols-2">
                    <div className="aspect-[4/3] md:aspect-auto md:min-h-[360px] overflow-hidden">
                      <img
                        src={featured.imageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"}
                        alt={featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-8 md:p-10 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full uppercase tracking-wide">
                          Featured
                        </span>
                        <span className="flex items-center gap-1 text-xs text-gray-400">
                          <Tag className="w-3 h-3" />{featured.category}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight mb-4 group-hover:text-primary transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-gray-500 leading-relaxed mb-6 line-clamp-3">{featured.excerpt}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-400 mb-6">
                        <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{format(new Date(featured.publishedAt), "dd MMM yyyy")}</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />5 min read</span>
                        <span>{featured.author}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm font-bold text-primary">
                        Read Full Article <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Rest of articles grid */}
            {rest.length > 0 && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map((article) => (
                  <Link key={article.id} to={`/news/${article.slug}`} className="group block">
                    <article className="bg-white rounded-2xl border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={article.imageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-1">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[10px] font-bold bg-primary/8 text-primary px-2.5 py-1 rounded-full uppercase tracking-wide">
                            {article.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-gray-400 ml-auto">
                            <Calendar className="w-3 h-3" />{format(new Date(article.publishedAt), "dd MMM yyyy")}
                          </span>
                        </div>
                        <h3 className="font-bold text-gray-900 text-base leading-snug mb-3 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">{article.excerpt}</p>
                        <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                          <span className="text-xs text-gray-400">{article.author}</span>
                          <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                            Read more <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16 bg-gradient-to-r from-primary to-secondary rounded-3xl p-8 md:p-12 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-3">Stay Informed on Animal Health</h3>
          <p className="text-green-100 mb-6 max-w-xl mx-auto">
            Get the latest veterinary insights, product updates, and field day invitations delivered directly to you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-xl text-gray-800 text-sm outline-none"
            />
            <Button className="bg-white text-primary hover:bg-gray-100 rounded-xl font-bold px-6">Subscribe</Button>
          </div>
          <p className="text-green-200 text-xs mt-3">No spam. Unsubscribe anytime.</p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsPage;
