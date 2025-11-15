import { ArrowRight, Calendar, Tag, Clock, Share2 } from 'lucide-react';
import { BlogPost } from '../lib/supabase';
import ContentRenderer from '../components/ContentRenderer';
import ReadingProgress from '../components/ReadingProgress';
import TableOfContents from '../components/TableOfContents';

interface BlogArticleProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  onNavigate: (page: string, slug?: string, categorySlug?: string) => void;
}

export default function BlogArticle({ post, relatedPosts, onNavigate }: BlogArticleProps) {
  const estimatedReadingTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <div className="min-h-screen bg-light">
      <ReadingProgress />

      <nav className="bg-white border-b border-gray-200 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center text-sm text-gray-600">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-primary transition"
            >
              Home
            </button>
            <span className="mx-2">/</span>
            <button
              onClick={() => onNavigate('blog')}
              className="hover:text-primary transition"
            >
              Blog
            </button>
            <span className="mx-2">/</span>
            <button
              onClick={() => onNavigate('category', post.categories?.slug)}
              className="hover:text-primary transition"
            >
              {post.categories?.name || 'Kategorie'}
            </button>
            <span className="mx-2">/</span>
            <span className="text-primary font-medium line-clamp-1">{post.title}</span>
          </div>
        </div>
      </nav>

      <article className="bg-white">
        <div className="relative">
          <div className="h-[500px] overflow-hidden">
            <img
              src={post.image_url}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 text-white">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
                  <Tag size={16} className="mr-2" />
                  {post.categories?.name || 'Allgemein'}
                </span>
                <span className="flex items-center text-white/90 text-sm">
                  <Clock size={14} className="mr-1" />
                  {estimatedReadingTime} Min. Lesezeit
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {post.title}
              </h1>

              <p className="text-xl text-white/90 leading-relaxed max-w-3xl drop-shadow">
                {post.excerpt}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between pb-8 mb-8 border-b border-gray-200">
            <div className="flex items-center text-sm text-gray-500">
              <Calendar size={14} className="mr-1" />
              Veröffentlicht am {new Date(post.published_at).toLocaleDateString('de-DE', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </div>
            <button
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href
                  });
                }
              }}
            >
              <Share2 size={18} />
              <span className="hidden sm:inline">Teilen</span>
            </button>
          </div>

          <div className="prose prose-lg max-w-none">
            <ContentRenderer content={post.content} />
          </div>

          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4 text-gray-900">
                War dieser Artikel hilfreich?
              </h3>
              <p className="text-gray-600 mb-6">
                Lade dir jetzt unsere kostenlose Checkliste herunter und setze die Tipps
                Schritt für Schritt um!
              </p>
              <button
                onClick={() => onNavigate('freebie')}
                className="bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                Kostenlos herunterladen
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </article>

      <TableOfContents content={post.content} />

      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Das könnte dich auch interessieren
              </h2>
              <p className="text-gray-600 text-lg">
                Weitere hilfreiche Artikel aus dieser Kategorie
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map((relatedPost) => (
                <article
                  key={relatedPost.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer group"
                  onClick={() => onNavigate('article', relatedPost.slug, relatedPost.categories?.slug)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={relatedPost.image_url}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {relatedPost.categories?.name || 'Allgemein'}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-sm text-gray-500 mb-3">
                      <Calendar size={14} className="mr-1" />
                      {new Date(relatedPost.published_at).toLocaleDateString('de-DE', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-primary transition">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <button className="text-primary font-semibold flex items-center hover:text-accent transition">
                      Mehr lesen <ArrowRight size={18} className="ml-2" />
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <button
                onClick={() => onNavigate('category', post.categories?.slug)}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition shadow-lg"
              >
                Alle Artikel aus "{post.categories?.name}" ansehen
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-to-r from-primary to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Bereit für mehr Ordnung?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Stöbere durch unsere anderen Ratgeber und finde weitere
            hilfreiche Tipps für deinen Alltag.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('blog')}
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Alle Kategorien
            </button>
            <button
              onClick={() => onNavigate('blog-all')}
              className="bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition shadow-lg"
            >
              Alle Artikel durchsuchen
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
