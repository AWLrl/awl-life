import { ArrowRight, FolderOpen, FileText } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, Category } from '../lib/supabase';

interface BlogProps {
  onNavigate: (page: string, slug?: string, categorySlug?: string) => void;
}

interface CategoryWithCount extends Category {
  post_count: number;
}

export default function Blog({ onNavigate }: BlogProps) {
  const [categories, setCategories] = useState<CategoryWithCount[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);

    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (categoriesData) {
      const categoriesWithCount = await Promise.all(
        categoriesData.map(async (category) => {
          const { count } = await supabase
            .from('blog_posts')
            .select('*', { count: 'exact', head: true })
            .eq('category_id', category.id);

          return {
            ...category,
            post_count: count || 0
          };
        })
      );

      setCategories(categoriesWithCount);
    }

    setLoading(false);
  };

  const categoryImages: Record<string, string> = {
    'ordnung-minimalismus': 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=600',
    'haushaltsroutinen': 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=600',
    'effizienz-zeitmanagement': 'https://images.pexels.com/photos/7534554/pexels-photo-7534554.jpeg?auto=compress&cs=tinysrgb&w=600',
    'nachhaltigkeit': 'https://images.pexels.com/photos/4239090/pexels-photo-4239090.jpeg?auto=compress&cs=tinysrgb&w=600',
    'finanzielle-ordnung': 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600'
  };

  return (
    <div className="min-h-screen bg-light">
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Blog Kategorien
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Wähle eine Kategorie und entdecke praktische Tipps für mehr Ordnung und Struktur im Alltag
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => (
                <article
                  key={category.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => onNavigate('category', category.slug)}
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={categoryImages[category.slug] || 'https://images.pexels.com/photos/4239091/pexels-photo-4239091.jpeg?auto=compress&cs=tinysrgb&w=600'}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white mb-2">
                        <FolderOpen size={24} className="mr-2" />
                        <span className="text-sm font-semibold">
                          {category.post_count} {category.post_count === 1 ? 'Artikel' : 'Artikel'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 text-gray-900">
                      {category.name}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {category.description}
                    </p>
                    <button className="text-primary font-semibold flex items-center hover:text-accent transition">
                      Artikel ansehen <ArrowRight size={18} className="ml-2" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/5 to-teal-500/5 rounded-3xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="flex items-center mb-4">
                  <FileText size={32} className="text-primary mr-3" />
                  <h2 className="text-3xl font-bold text-gray-900">
                    Alle Artikel durchsuchen
                  </h2>
                </div>
                <p className="text-gray-600 text-lg">
                  Über 10 detaillierte Ratgeber zu Haushalt, Ordnung und Effizienz
                </p>
              </div>
              <button
                onClick={() => onNavigate('blog-all')}
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-600 transition shadow-lg whitespace-nowrap"
              >
                Alle Artikel ansehen
              </button>
            </div>
          </div>
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
