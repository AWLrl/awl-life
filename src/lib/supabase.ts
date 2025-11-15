import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image_url: string;
  category_id: string;
  published_at: string;
  created_at: string;
  updated_at: string;
  categories?: Category;
}

export interface Freebie {
  id: string;
  title: string;
  description: string;
  file_url: string;
  image_url: string;
  benefits: string[];
  created_at: string;
}

export interface NewsletterSubscriber {
  name: string;
  email: string;
  source: string;
  freebie_id?: string;
}
