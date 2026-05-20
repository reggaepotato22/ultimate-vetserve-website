import { useParams, Link, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, ChevronRight, ArrowRight, Tag } from "lucide-react";
import { getNewsBySlug, defaultNews } from "@/data/news";
import { format } from "date-fns";

const NewsDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const article = getNewsBySlug(slug ?? "");
  const related = defaultNews.filter((n) => n.slug !== slug).slice(0, 3);

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex flex-col items-center justify-center py-20 text-center px-4">
          <h1 className="text-3xl font-bold text-gray-700 mb-3">Article Not Found</h1>
          <p className="text-gray-400 mb-8">This article doesn't exist or may have been removed.</p>
          <Link to="/news"><Button className="bg-primary rounded-full px-8">Back to News</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  const readingTime = Math.ceil((article.content?.split(" ").length ?? 200) / 200);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/30">
      <Navigation />

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-gray-400">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link to="/news" className="hover:text-primary transition-colors">News</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gray-600 font-medium truncate max-w-[200px]">{article.title}</span>
          </nav>
        </div>
      </div>

      <main className="flex-1 container mx-auto px-4 py-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back to News
        </button>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Main Article */}
          <article className="lg:col-span-2">
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-full uppercase tracking-wide flex items-center gap-1">
                <Tag className="w-3 h-3" />{article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Calendar className="w-3.5 h-3.5" />{format(new Date(article.publishedAt), "dd MMMM yyyy")}
              </span>
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />{readingTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6 tracking-tight">{article.title}</h1>

            {article.imageUrl && (
              <div className="rounded-2xl overflow-hidden mb-8 border border-gray-100">
                <img src={article.imageUrl} alt={article.title} className="w-full object-cover max-h-[440px]" />
              </div>
            )}

            <div className="bg-white rounded-2xl border border-gray-100 p-8">
              <div
                className="prose prose-gray max-w-none text-gray-600 prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:leading-relaxed prose-ul:list-disc prose-ol:list-decimal prose-strong:font-semibold"
                dangerouslySetInnerHTML={{
                  __html: (article.content ?? article.excerpt ?? "")
                    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
                    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
                    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
                    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
                    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>")
                    .replace(/^- (.+)$/gm, "<li>$1</li>")
                    .replace(/\n\n/g, "</p><p>")
                    .replace(/^(?!<[hl]|<li)(.+)$/gm, "<p>$1</p>")
                    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline" target="_blank">$1</a>')
                }}
              />
            </div>

            <div className="mt-6 flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
              <div>
                <p className="text-xs text-gray-400">Written by</p>
                <p className="font-semibold text-gray-800 text-sm">{article.author}</p>
              </div>
              <Link to="/contact">
                <Button variant="outline" className="rounded-xl border-gray-200 text-sm gap-1.5">
                  <ArrowRight className="w-4 h-4" /> Have a question?
                </Button>
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* CTA */}
            <div className="bg-primary rounded-2xl p-6 text-white">
              <h3 className="font-bold text-lg mb-2">Need Product Advice?</h3>
              <p className="text-green-100 text-sm mb-4 leading-relaxed">Our veterinary experts are ready to help you choose the right products for your herd.</p>
              <a href="tel:+254724241542">
                <Button className="bg-white text-primary hover:bg-gray-100 rounded-xl font-bold w-full text-sm">
                  Call +254 724 241542
                </Button>
              </a>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">More Articles</h3>
              <div className="space-y-4">
                {related.map((rel) => (
                  <Link key={rel.id} to={`/news/${rel.slug}`} className="group flex gap-3">
                    <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0">
                      <img
                        src={rel.imageUrl || "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=100"}
                        alt={rel.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wide mb-1">{rel.category}</p>
                      <p className="text-xs font-semibold text-gray-800 leading-tight group-hover:text-primary transition-colors line-clamp-2">{rel.title}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{format(new Date(rel.publishedAt), "dd MMM yyyy")}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <Link to="/news" className="flex items-center gap-1 text-xs font-bold text-primary mt-4 hover:underline">
                View all articles <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NewsDetailPage;
