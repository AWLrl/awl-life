import { useEffect, useState } from 'react';
import { List } from 'lucide-react';

interface TableOfContentsProps {
  content: string;
}

interface Heading {
  id: string;
  text: string;
}

export default function TableOfContents({ content }: TableOfContentsProps) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const lines = content.split('\n');
    const extractedHeadings: Heading[] = [];

    lines.forEach(line => {
      if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
        const text = line.replace(/\*\*/g, '').trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        extractedHeadings.push({ id, text });
      }
    });

    setHeadings(extractedHeadings);
  }, [content]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  if (headings.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 bg-primary text-white p-4 rounded-full shadow-2xl hover:bg-teal-600 transition z-40"
        aria-label="Inhaltsverzeichnis"
      >
        <List size={24} />
      </button>

      <div
        className={`
          lg:block fixed top-32 right-8 w-64 bg-white rounded-2xl shadow-xl p-6 z-30
          transition-all duration-300
          ${isOpen ? 'block' : 'hidden'}
          max-h-[calc(100vh-200px)] overflow-y-auto
        `}
      >
        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
          <List size={20} className="text-primary" />
          Inhaltsverzeichnis
        </h3>
        <nav>
          <ul className="space-y-2">
            {headings.map(({ id, text }) => (
              <li key={id}>
                <button
                  onClick={() => scrollToHeading(id)}
                  className={`
                    text-left text-sm w-full px-3 py-2 rounded-lg transition
                    ${activeId === id
                      ? 'bg-primary text-white font-semibold'
                      : 'text-gray-600 hover:bg-light hover:text-primary'
                    }
                  `}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/20 z-20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
