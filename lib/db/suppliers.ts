import { supabase } from '../supabaseClient';
import { Supplier } from './types';

export const getSuppliers = async () => {
  const { data, error } = await supabase.from('suppliers').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data as Supplier[];
};

export const getSupplierById = async (id: string) => {
  const { data, error } = await supabase.from('suppliers').select('*').eq('supplier_id', id).single();
  if (error) throw error;
  return data as Supplier;
};

export const createSupplier = async (supplier: Omit<Supplier, 'supplier_id' | 'created_at'>) => {
  const { data, error } = await supabase.from('suppliers').insert([supplier]).select().single();
  if (error) throw error;
  return data as Supplier;
};

export const updateSupplier = async (id: string, updates: Partial<Omit<Supplier, 'supplier_id' | 'created_at'>>) => {
  const { data, error } = await supabase.from('suppliers').update(updates).eq('supplier_id', id).select().single();
  if (error) throw error;
  return data as Supplier;
};

export const deleteSupplier = async (id: string) => {
  const { error } = await supabase.from('suppliers').delete().eq('supplier_id', id);
  if (error) throw error;
  return true;
};
