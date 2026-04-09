import { supabase } from '../supabaseClient';
import { ProductSupplier } from './types';

export const getProductSuppliers = async (productsCatalogId?: string, supplierId?: string) => {
  let query = supabase.from('product_suppliers').select('*');
  
  if (productsCatalogId) query = query.eq('products_catalog_id', productsCatalogId);
  if (supplierId) query = query.eq('supplier_id', supplierId);
  
  const { data, error } = await query;
  if (error) throw error;
  return data as ProductSupplier[];
};

export const createProductSupplier = async (relation: ProductSupplier) => {
  const { data, error } = await supabase.from('product_suppliers').insert([relation]).select().single();
  if (error) throw error;
  return data as ProductSupplier;
};

export const deleteProductSupplier = async (productsCatalogId: string, supplierId: string) => {
  const { error } = await supabase.from('product_suppliers')
    .delete()
    .eq('products_catalog_id', productsCatalogId)
    .eq('supplier_id', supplierId);
    
  if (error) throw error;
  return true;
};
