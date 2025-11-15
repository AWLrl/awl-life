import { ArrowRight, Calendar, FolderOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, BlogPost, Category } from '../lib/supabase';

interface CategoryPageProps {
  categorySlug: string;
  onNavigate: (page: string, slug?: string, categorySlug?: string) => void;
}

export default function CategoryPage({ categorySlug, onNavigate }: CategoryPageProps) {
  const [category, setCategory] = useState<Category | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategoryAndPosts();
  }, [categorySlug]);

  const fetchCategoryAndPosts = async () => {
    setLoading(true);

    const { data: categoryData } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', categorySlug)
      .maybeSingle();

    if (categoryData) {
      setCategory(categoryData);

      const { data: postsData } = await supabase
        .from('blog_posts')
        .select('*, categories(*)')
        .eq('category_id', categoryData.id)
        .order('published_at', { ascending: false });

      if (postsData) {
        setBlogPosts(postsData);
      }
    }

    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen bg-light flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Kategorie nicht gefunden</h1>
          <button
            onClick={() => onNavigate('blog')}
            className="text-primary font-semibold hover:text-accent transition"
          >
            Zurück zur Blog-Übersicht
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-light">
      <nav className="bg-white border-b border-gray-200 py-4">
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
            <span className="text-primary font-medium">{category.name}</span>
          </div>
        </div>
      </nav>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center mb-4">
            <FolderOpen size={40} className="text-primary mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              {category.name}
            </h1>
          </div>
          {category.description && (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center">
              {category.description}
            </p>
          )}
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {blogPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer"
                    onClick={() => onNavigate('article', post.slug, category.slug)}
                  >
                    <img
                      src={post.image_url}
                      alt={post.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-primary">
                          {category.name}
                        </span>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar size={14} className="mr-1" />
                          {new Date(post.published_at).toLocaleDateString('de-DE', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                          })}
                        </div>
                      </div>
                      <h2 className="text-xl font-semibold mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <button className="text-primary font-semibold flex items-center hover:text-accent transition">
                        Mehr lesen <ArrowRight size={18} className="ml-2" />
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <div className="mt-12 text-center">
                <button
                  onClick={() => onNavigate('blog')}
                  className="text-primary font-semibold hover:text-accent transition"
                >
                  Alle Kategorien ansehen
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-6">
                Noch keine Artikel in dieser Kategorie.
              </p>
              <button
                onClick={() => onNavigate('blog')}
                className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition"
              >
                Andere Kategorien entdecken
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Mehr Ordnung in deinem Leben
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Hol dir unsere kostenlosen Checklisten und starte noch heute
          </p>
          <button
            onClick={() => onNavigate('freebie')}
            className="bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition shadow-lg"
          >
            Kostenlos herunterladen
          </button>
        </div>
      </section>
    </div>
  );
}
