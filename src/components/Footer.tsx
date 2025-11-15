import { Facebook, Instagram, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">AWL Life</h3>
            <p className="text-gray-400 text-sm">
              Mehr Ordnung. Mehr Zeit. Mehr Klarheit im Alltag.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => onNavigate('home')} className="text-gray-400 hover:text-white transition">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('blog')} className="text-gray-400 hover:text-white transition">
                  Blog
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('freebie')} className="text-gray-400 hover:text-white transition">
                  Freebie
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="text-gray-400 hover:text-white transition">
                  Kontakt
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Folge uns</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-400">
          <p>&copy; 2025 AWL Life. Alle Rechte vorbehalten.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <button onClick={() => onNavigate('impressum')} className="hover:text-white transition">
              Impressum
            </button>
            <button onClick={() => onNavigate('datenschutz')} className="hover:text-white transition">
              Datenschutz
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
