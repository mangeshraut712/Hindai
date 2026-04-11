import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      scriptures: {
        Row: {
          id: string;
          name: string;
          category: string;
          description: string;
          content: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          category: string;
          description: string;
          content: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          category?: string;
          description?: string;
          content?: string;
          created_at?: string;
        };
      };
      verses: {
        Row: {
          id: string;
          scripture_id: string;
          chapter: number;
          verse_number: number;
          sanskrit_text: string;
          transliteration: string;
          translation: string;
          commentary: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          scripture_id: string;
          chapter: number;
          verse_number: number;
          sanskrit_text: string;
          transliteration: string;
          translation: string;
          commentary?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          scripture_id?: string;
          chapter?: number;
          verse_number?: number;
          sanskrit_text?: string;
          transliteration?: string;
          translation?: string;
          commentary?: string;
          created_at?: string;
        };
      };
    };
  };
};
