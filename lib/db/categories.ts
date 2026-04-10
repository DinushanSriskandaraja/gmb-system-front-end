import { supabase } from '../supabaseClient';
import { Category } from './types';

export const getCategories = async () => {
  try {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    
    if (!data || data.length === 0) {
      const defaultCategories = [
        { name: 'Curtains' },
        { name: 'Blinds' },
        { name: 'Hardware' },
        { name: 'Fabrics' }
      ];
      
      const { data: newCats, error: insertError } = await supabase
        .from('categories')
        .insert(defaultCategories)
        .select();
        
      if (!insertError && newCats) {
        return newCats as Category[];
      }
    }

    return data as Category[];
  } catch (err: any) {
    console.error("Supabase Categories Error:", err);
    // Fallback if table doesn't exist yet (e.g. schema.sql hasn't been run)
    return [
      { id: 'mock-1', name: 'Curtains' },
      { id: 'mock-2', name: 'Blinds' },
      { id: 'mock-3', name: 'Hardware' },
      { id: 'mock-4', name: 'Fabrics' }
    ] as Category[];
  }
};

export const getCategoryById = async (id: string) => {
  const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Category;
};

export const createCategory = async (category: Omit<Category, 'id'>) => {
  const { data, error } = await supabase.from('categories').insert([category]).select().single();
  if (error) throw error;
  return data as Category;
};

export const updateCategory = async (id: string, updates: Partial<Omit<Category, 'id'>>) => {
  const { data, error } = await supabase.from('categories').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data as Category;
};

export const deleteCategory = async (id: string) => {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
  return true;
};
