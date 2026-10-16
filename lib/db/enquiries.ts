import { supabase } from '../supabaseClient';

export const getEnquiries = async (customerId?: string) => {
  let query = supabase.from('enquiries').select('*');
  if (customerId) {
    query = query.eq('customer_id', customerId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as any[];
};
export const getEnquiryById = async (id: string) => {
  const { data, error } = await supabase.from('enquiries').select('*').eq('id', id).single();
  if (error) throw error;
  return data as any;
};
export const createEnquiry = async (enquiry: any) => {
  const { data, error } = await supabase.from('enquiries').insert([enquiry]).select().single();
  if (error) throw error;
  return data as any;
};
export const updateEnquiry = async (id: string, updates: any) => {
  const { data, error } = await supabase.from('enquiries').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data as any;
};
export const deleteEnquiry = async (id: string) => {
  const { error } = await supabase.from('enquiries').delete().eq('id', id);
  if (error) throw error;
  return true;
};
