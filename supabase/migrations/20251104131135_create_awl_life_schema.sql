/*
  # AWL Life - Datenbank Schema für Blog und Lead-Management

  ## Neue Tabellen
  
  ### 1. categories
  - `id` (uuid, primary key)
  - `name` (text) - Kategoriename (z.B. "Ordnung & Minimalismus")
  - `slug` (text, unique) - URL-freundlicher Name
  - `description` (text) - Beschreibung der Kategorie
  - `created_at` (timestamptz)

  ### 2. blog_posts
  - `id` (uuid, primary key)
  - `title` (text) - Artikel-Titel
  - `slug` (text, unique) - URL-freundlicher Titel
  - `excerpt` (text) - Kurzbeschreibung
  - `content` (text) - Vollständiger Artikel-Inhalt
  - `image_url` (text) - Bild-URL
  - `category_id` (uuid, foreign key) - Verknüpfung zur Kategorie
  - `published_at` (timestamptz) - Veröffentlichungsdatum
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ### 3. freebies
  - `id` (uuid, primary key)
  - `title` (text) - Freebie-Titel
  - `description` (text) - Beschreibung
  - `file_url` (text) - Download-Link
  - `image_url` (text) - Vorschaubild
  - `benefits` (jsonb) - Liste der Vorteile
  - `created_at` (timestamptz)

  ### 4. newsletter_subscribers
  - `id` (uuid, primary key)
  - `name` (text) - Name des Abonnenten
  - `email` (text, unique) - E-Mail-Adresse
  - `source` (text) - Quelle (z.B. "freebie_download", "newsletter")
  - `freebie_id` (uuid, nullable) - Optional: welches Freebie heruntergeladen wurde
  - `subscribed_at` (timestamptz)
  - `confirmed` (boolean) - E-Mail-Bestätigung

  ## Sicherheit
  - Row Level Security (RLS) ist für alle Tabellen aktiviert
  - Öffentlicher Lesezugriff für blog_posts, categories und freebies
  - Nur authentifizierte Admins können Daten ändern
  - newsletter_subscribers: Nur Inserts erlaubt (für Formular-Submissions)
*/

-- Categories Tabelle
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Blog Posts Tabelle
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text DEFAULT '',
  content text DEFAULT '',
  image_url text DEFAULT '',
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  TO anon, authenticated
  USING (published_at IS NOT NULL AND published_at <= now());

-- Freebies Tabelle
CREATE TABLE IF NOT EXISTS freebies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text DEFAULT '',
  file_url text DEFAULT '',
  image_url text DEFAULT '',
  benefits jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE freebies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read freebies"
  ON freebies FOR SELECT
  TO anon, authenticated
  USING (true);

-- Newsletter Subscribers Tabelle
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  source text DEFAULT 'newsletter',
  freebie_id uuid REFERENCES freebies(id) ON DELETE SET NULL,
  subscribed_at timestamptz DEFAULT now(),
  confirmed boolean DEFAULT false
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON newsletter_subscribers FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Indizes für bessere Performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_newsletter_email ON newsletter_subscribers(email);

-- Initiale Kategorien einfügen
INSERT INTO categories (name, slug, description) VALUES
  ('Ordnung & Minimalismus', 'ordnung-minimalismus', 'Aufräumstrategien, Capsule Wardrobe und bewusstes Leben'),
  ('Haushaltsroutinen', 'haushaltsroutinen', 'Entrümpelung, Organisation und Raum-für-Raum-Checklisten'),
  ('Haushalts-Effizienz & Zeitmanagement', 'effizienz-zeitmanagement', 'Wochen- und Putzpläne, Automatisierung und KI-Tipps'),
  ('Nachhaltigkeit im Alltag', 'nachhaltigkeit', 'Mülltrennung, Energiesparen und Minimal Waste'),
  ('Finanzielle Ordnung', 'finanzielle-ordnung', 'Haushaltsbuch, Spartipps und Versicherungs-Check')
ON CONFLICT (slug) DO NOTHING;