import {
  Clock,
  Home as HomeIcon,
  ListChecks,
  ArrowRight,
  Sparkles,
  FolderOpen,
  Leaf,
  Wallet,
  Calendar,
  Users,
  BookOpen,
  Award,
  TrendingUp
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, BlogPost, Category } from '../lib/supabase';

interface HomeProps {
  onNavigate: (page: string, slug?: string, categorySlug?: string) => void;
}

interface CategoryWithPost extends Category {
  featured_post?: BlogPost;
}

export default function Home({ onNavigate }: HomeProps) {
  const [categories, setCategories] = useState<CategoryWithPost[]>([]);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: categoriesData } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (categoriesData) {
      const categoriesWithPosts = await Promise.all(
        categoriesData.map(async (category) => {
          const { data: post } = await supabase
            .from('blog_posts')
            .select('*')
            .eq('category_id', category.id)
            .order('published_at', { ascending: false })
            .limit(1)
            .maybeSingle();

          return {
            ...category,
            featured_post: post || undefined
          };
        })
      );

      setCategories(categoriesWithPosts);
    }

    const { data: postsData } = await supabase
      .from('blog_posts')
      .select('*, categories(*)')
      .order('published_at', { ascending: false })
      .limit(3);

    if (postsData) {
      setLatestPosts(postsData);
    }

    setLoading(false);
  };

  const categoryIcons: Record<string, JSX.Element> = {
    'ordnung-minimalismus': <Sparkles size={32} className="text-primary" />,
    'haushaltsroutinen': <HomeIcon size={32} className="text-primary" />,
    'effizienz-zeitmanagement': <Clock size={32} className="text-primary" />,
    'nachhaltigkeit': <Leaf size={32} className="text-primary" />,
    'finanzielle-ordnung': <Wallet size={32} className="text-primary" />
  };

  const problems = [
    {
      problem: 'Ständig zu wenig Zeit',
      solution: 'Effiziente Routinen und Zeitmanagement-Systeme'
    },
    {
      problem: 'Chaos und Unordnung',
      solution: 'Bewährte Ordnungssysteme und Entrümpelungsmethoden'
    },
    {
      problem: 'Überforderung im Alltag',
      solution: 'Klare Strukturen und einfache Wochenpläne'
    },
    {
      problem: 'Geld verschwindet',
      solution: 'Finanzübersicht durch Haushaltsbuch und Spartipps'
    }
  ];

  const stats = [
    { number: '10.000+', label: 'Downloads' },
    { number: '10+', label: 'Ratgeber' },
    { number: '5', label: 'Themenbereiche' },
    { number: '100%', label: 'Kostenlos' }
  ];

  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-light via-white to-light py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full mb-6">
              <Award size={16} className="mr-2" />
              <span className="text-sm font-semibold">Dein Guide für mehr Ordnung im Leben</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Mehr Ordnung. Mehr Zeit.
              <br />
              <span className="text-primary">Mehr Klarheit im Alltag.</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Praktische Tipps und bewährte Systeme für Haushalt, Finanzen und Zeitmanagement.
              Kostenlose Ratgeber, die wirklich funktionieren.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onNavigate('blog')}
                className="bg-primary text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-teal-600 transition shadow-lg hover:shadow-xl"
              >
                Ratgeber entdecken
              </button>
              <button
                onClick={() => onNavigate('freebie')}
                className="bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition shadow-lg hover:shadow-xl"
              >
                Kostenlose Checkliste
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Kennst du das auch?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Alltägliche Herausforderungen, für die wir Lösungen bieten
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {problems.map((item, index) => (
              <div
                key={index}
                className="bg-light rounded-2xl p-6 hover:shadow-lg transition"
              >
                <div className="flex items-start gap-4">
                  <div className="bg-red-100 text-red-600 rounded-full p-2 flex-shrink-0 mt-1">
                    <span className="text-xl font-bold">!</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.problem}
                    </h3>
                    <div className="flex items-start gap-2">
                      <ArrowRight size={16} className="text-primary mt-1 flex-shrink-0" />
                      <p className="text-gray-600">{item.solution}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unsere Themenbereiche
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wähle deinen Bereich und finde die passenden Ratgeber
            </p>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-2xl p-6 hover:shadow-xl transition cursor-pointer group"
                  onClick={() => onNavigate('category', category.slug)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="bg-primary/10 rounded-xl p-3">
                      {categoryIcons[category.slug] || <FolderOpen size={32} className="text-primary" />}
                    </div>
                    <ArrowRight size={20} className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                  {category.featured_post && (
                    <div className="pt-4 border-t border-gray-100">
                      <p className="text-sm text-gray-500 mb-1">Neuster Artikel:</p>
                      <p className="text-sm font-semibold text-primary line-clamp-1">
                        {category.featured_post.title}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('blog')}
              className="bg-primary text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-600 transition shadow-lg"
            >
              Alle Kategorien ansehen
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Beliebte Ratgeber
            </h2>
            <p className="text-gray-600 text-lg">
              Die meistgelesenen Artikel unserer Community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:-translate-y-2 cursor-pointer"
                onClick={() => onNavigate('article', post.slug, post.categories?.slug)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {post.categories?.name}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar size={14} className="mr-1" />
                    {new Date(post.published_at).toLocaleDateString('de-DE', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric'
                    })}
                  </div>
                  <h3 className="text-xl font-semibold mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <button className="text-primary font-semibold flex items-center hover:text-accent transition">
                    Mehr lesen <ArrowRight size={18} className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('blog-all')}
              className="text-primary font-semibold text-lg hover:text-accent transition"
            >
              Alle Ratgeber durchsuchen →
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-teal-50 to-cyan-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center bg-primary text-white px-4 py-2 rounded-full mb-6">
                <Users size={16} className="mr-2" />
                <span className="text-sm font-semibold">Über AWL Life</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Praktische Hilfe für deinen Alltag
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                AWL Life steht für "A Well-organized Life" – ein gut organisiertes Leben.
                Wir glauben, dass Ordnung und Struktur im Alltag keine Raketenwissenschaft sind.
              </p>
              <p className="text-lg text-gray-600 mb-4">
                Mit einfachen, praxiserprobten Methoden helfen wir dir, mehr Zeit zu gewinnen,
                Stress zu reduzieren und den Überblick zu behalten.
              </p>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4 mb-4">
                <BookOpen className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Über 10 ausführliche Ratgeber</h4>
                  <p className="text-gray-600 text-sm">
                    Jeder Artikel mit 1.500+ Wörtern voller praktischer Tipps
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 bg-white rounded-xl p-4">
                <TrendingUp className="text-primary flex-shrink-0 mt-1" size={24} />
                <div>
                  <h4 className="font-semibold mb-1">Bewährte Methoden</h4>
                  <p className="text-gray-600 text-sm">
                    Keine Theorie – nur Systeme, die wirklich funktionieren
                  </p>
                </div>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/6585600/pexels-photo-6585600.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Ordentlicher Haushalt"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-primary to-teal-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Starte jetzt mit mehr Ordnung
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Hol dir unsere kostenlose 7-Tage-Challenge und schaffe in einer Woche
            mehr Struktur in deinem Alltag. Ohne Überforderung, mit klaren Schritten.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('freebie')}
              className="bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition shadow-lg hover:shadow-xl"
            >
              Kostenlos herunterladen
            </button>
            <button
              onClick={() => onNavigate('blog')}
              className="bg-white text-primary px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition shadow-lg"
            >
              Ratgeber durchstöbern
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
