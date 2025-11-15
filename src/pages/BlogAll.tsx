import { ArrowRight, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, BlogPost, Category } from '../lib/supabase';

interface BlogAllProps {
  onNavigate: (page: string, slug?: string, categorySlug?: string) => void;
}

export default function BlogAll({ onNavigate }: BlogAllProps) {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
    fetchBlogPosts();
  }, [selectedCategory]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (data && !error) {
      setCategories(data);
    }
  };

  const fetchBlogPosts = async () => {
    setLoading(true);
    let query = supabase
      .from('blog_posts')
      .select('*, categories(*)')
      .order('published_at', { ascending: false });

    if (selectedCategory !== 'all') {
      query = query.eq('category_id', selectedCategory);
    }

    const { data, error } = await query;

    if (data && !error) {
      setBlogPosts(data);
    }
    setLoading(false);
  };

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
            <span className="text-primary font-medium">Alle Artikel</span>
          </div>
        </div>
      </nav>

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Alle Blog-Artikel
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Durchsuche alle Artikel oder filtere nach Kategorie
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 mb-12 justify-center">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-6 py-2 rounded-full border-2 font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white border-primary'
                  : 'border-primary text-primary hover:bg-primary hover:text-white'
              }`}
            >
              Alle
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full border-2 font-medium transition ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white border-primary'
                    : 'border-primary text-primary hover:bg-primary hover:text-white'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => onNavigate('article', post.slug, post.categories?.slug)}
                >
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-primary">
                        {post.categories?.name || 'Allgemein'}
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
          )}

          {!loading && blogPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                Keine Artikel in dieser Kategorie gefunden.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Verpasse keine neuen Artikel
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Melde dich für unseren Newsletter an und erhalte die neuesten Tipps
            direkt in dein Postfach.
          </p>
          <button
            onClick={() => onNavigate('freebie')}
            className="bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition shadow-lg"
          >
            Jetzt anmelden
          </button>
        </div>
      </section>
    </div>
  );
}
