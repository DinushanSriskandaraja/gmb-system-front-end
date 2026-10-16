import { supabase } from '../supabaseClient';

export const getQuotations = async () => {
  const { data, error } = await supabase
    .from('quotations')
    .select('*, customer:customers(*), items:quotation_items(*)');
  if (error) throw error;
  return data as any[];
};

export const getQuotationsByCustomerId = async (customerId: string) => {
  const { data, error } = await supabase
    .from('quotations')
    .select('*, items:quotation_items(*)')
    .eq('customer_id', customerId);
  if (error) throw error;
  return data as any[];
};

export const getQuotationById = async (id: string) => {
  const { data, error } = await supabase
    .from('quotations')
    .select('*, customer:customers(*), items:quotation_items(*, product:products_catalog(*))')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data as any;
};

export const createQuotation = async (quotation: any, items?: any[]) => {
  const { data, error } = await supabase
    .from('quotations')
    .insert([quotation])
    .select()
    .single();
  if (error) throw error;
  if (items && items.length > 0) {
    const formattedItems = items.map((item) => ({ ...item, quotation_id: data.id }));
    const { error: itemsError } = await supabase.from('quotation_items').insert(formattedItems);
    if (itemsError) throw itemsError;
  }
  return data;
};

export const updateQuotation = async (id: string, updates: any) => {
  const { data, error } = await supabase
    .from('quotations')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteQuotation = async (id: string) => {
  const { error } = await supabase.from('quotations').delete().eq('id', id);
  if (error) throw error;
  return true;
};
