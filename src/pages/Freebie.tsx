import { Download, CheckCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase, Freebie as FreebieType } from '../lib/supabase';

export default function Freebie() {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [freebie, setFreebie] = useState<FreebieType | null>(null);

  useEffect(() => {
    fetchFreebie();
  }, []);

  const fetchFreebie = async () => {
    const { data, error } = await supabase
      .from('freebies')
      .select('*')
      .limit(1)
      .maybeSingle();

    if (data && !error) {
      setFreebie(data);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('newsletter_subscribers')
      .insert({
        name: formData.name,
        email: formData.email,
        source: 'freebie_download',
        freebie_id: freebie?.id
      });

    if (!error) {
      setSubmitted(true);
    }

    setLoading(false);
  };

  const benefits = freebie?.benefits || [
    'Tägliche Aufgaben für jeden Raum',
    'Schritt-für-Schritt Anleitung',
    'Sofortiger Download als PDF',
    'Praktische Checklisten zum Abhaken',
    'Motivierende Tipps für jeden Tag',
  ];

  return (
    <div className="min-h-screen bg-light">
      <section className="bg-gradient-to-b from-primary to-teal-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block bg-white/20 px-4 py-2 rounded-full mb-6">
            <span className="font-semibold">Kostenlos</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {freebie?.title || '7-Tage-Entrümpelungs-Challenge'}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {freebie?.description || 'Schaffe in nur einer Woche spürbar mehr Ordnung und Klarheit in deinem Zuhause'}
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <img
                src={freebie?.image_url || 'https://images.pexels.com/photos/6195129/pexels-photo-6195129.jpeg?auto=compress&cs=tinysrgb&w=800'}
                alt={freebie?.title || 'Entrümpelung Challenge'}
                className="rounded-2xl shadow-2xl"
              />

              <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">Das erwartet dich:</h3>
                <ul className="space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle
                        size={20}
                        className="text-primary mr-3 mt-1 flex-shrink-0"
                      />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="lg:sticky lg:top-24">
              {!submitted ? (
                <div className="bg-white p-8 rounded-2xl shadow-xl">
                  <h2 className="text-2xl font-bold mb-6 text-center">
                    Jetzt kostenlos starten
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        placeholder="Dein Name"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        E-Mail-Adresse
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                        placeholder="deine@email.de"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-accent text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-orange-600 transition shadow-lg hover:shadow-xl flex items-center justify-center disabled:opacity-50"
                    >
                      {loading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      ) : (
                        <>
                          <Download size={20} className="mr-2" />
                          Jetzt kostenlos herunterladen
                        </>
                      )}
                    </button>

                    <p className="text-xs text-gray-500 text-center mt-4">
                      Mit dem Download stimmst du unserer Datenschutzerklärung zu.
                      Wir senden dir gelegentlich nützliche Tipps per E-Mail. Du
                      kannst dich jederzeit wieder abmelden.
                    </p>
                  </form>
                </div>
              ) : (
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Vielen Dank!</h2>
                  <p className="text-gray-600 mb-6">
                    Prüfe dein E-Mail-Postfach. Wir haben dir den Download-Link
                    zugeschickt.
                  </p>
                  <p className="text-sm text-gray-500">
                    Schaue auch im Spam-Ordner nach, falls du keine E-Mail erhalten
                    hast.
                  </p>
                </div>
              )}

              <div className="mt-6 bg-accent/10 p-6 rounded-xl">
                <p className="text-sm text-gray-700 text-center">
                  <strong>Über 5.000 Teilnehmer</strong> haben bereits erfolgreich
                  ihre Wohnung entrümpelt und sind begeistert!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Wie funktioniert die Challenge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="font-semibold mb-2">Download</h3>
              <p className="text-gray-600 text-sm">
                Lade die Challenge herunter und drucke sie aus oder nutze sie
                digital.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="font-semibold mb-2">Jeden Tag ein Raum</h3>
              <p className="text-gray-600 text-sm">
                Folge den täglichen Aufgaben und arbeite dich Schritt für Schritt
                durch deine Wohnung.
              </p>
            </div>
            <div className="p-6">
              <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="font-semibold mb-2">Ergebnisse genießen</h3>
              <p className="text-gray-600 text-sm">
                Nach 7 Tagen hast du mehr Platz, Ordnung und ein besseres Gefühl
                in deinem Zuhause.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
