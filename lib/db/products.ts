import { supabase } from '../supabaseClient';
import { ProductCatalog } from './types';

export const getProducts = async (categoryId?: string) => {
  try {
    let query = supabase.from('products_catalog').select('*').order('created_at', { ascending: false });
    if (categoryId) query = query.eq('category_id', categoryId);
    
    const { data, error } = await query;
    if (error) throw error;
    return data as ProductCatalog[];
  } catch (err) {
    console.warn("Failed to get products (schema might be missing or RLS):", err);
    return [];
  }
};

export const getProductById = async (id: string) => {
  const { data, error } = await supabase.from('products_catalog').select('*').eq('products_catalog_id', id).single();
  if (error) throw error;
  return data as ProductCatalog;
};

export const createProduct = async (product: Omit<ProductCatalog, 'products_catalog_id' | 'created_at'>) => {
  const { data, error } = await supabase.from('products_catalog').insert([product]).select().single();
  if (error) throw error;
  return data as ProductCatalog;
};

export const updateProduct = async (id: string, updates: Partial<Omit<ProductCatalog, 'products_catalog_id' | 'created_at'>>) => {
  const { data, error } = await supabase.from('products_catalog').update(updates).eq('products_catalog_id', id).select().single();
  if (error) throw error;
  return data as ProductCatalog;
};

export const deleteProduct = async (id: string) => {
  const { error } = await supabase.from('products_catalog').delete().eq('products_catalog_id', id);
  if (error) throw error;
  return true;
};
