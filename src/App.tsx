import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogAll from './pages/BlogAll';
import CategoryPage from './pages/CategoryPage';
import BlogArticle from './pages/BlogArticle';
import Freebie from './pages/Freebie';
import Contact from './pages/Contact';
import Impressum from './pages/Impressum';
import Datenschutz from './pages/Datenschutz';
import { supabase, BlogPost } from './lib/supabase';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentSlug, setCurrentSlug] = useState<string | null>(null);
  const [currentArticle, setCurrentArticle] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  const handleNavigate = (page: string, slug?: string, categorySlug?: string) => {
    setCurrentPage(page);
    if (slug) {
      setCurrentSlug(slug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (currentPage === 'article' && currentSlug) {
      fetchArticle(currentSlug);
    }
  }, [currentPage, currentSlug]);

  const fetchArticle = async (slug: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, categories(*)')
      .eq('slug', slug)
      .maybeSingle();

    if (data && !error) {
      setCurrentArticle(data);
      fetchRelatedPosts(data.category_id, data.id);
    }
  };

  const fetchRelatedPosts = async (categoryId: string, currentPostId: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*, categories(*)')
      .eq('category_id', categoryId)
      .neq('id', currentPostId)
      .limit(3);

    if (data && !error) {
      setRelatedPosts(data);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'blog':
        return <Blog onNavigate={handleNavigate} />;
      case 'blog-all':
        return <BlogAll onNavigate={handleNavigate} />;
      case 'category':
        return currentSlug ? (
          <CategoryPage categorySlug={currentSlug} onNavigate={handleNavigate} />
        ) : null;
      case 'article':
        return currentArticle ? (
          <BlogArticle
            post={currentArticle}
            relatedPosts={relatedPosts}
            onNavigate={handleNavigate}
          />
        ) : null;
      case 'freebie':
        return <Freebie />;
      case 'contact':
        return <Contact />;
      case 'impressum':
        return <Impressum />;
      case 'datenschutz':
        return <Datenschutz />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-grow">{renderPage()}</main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;
