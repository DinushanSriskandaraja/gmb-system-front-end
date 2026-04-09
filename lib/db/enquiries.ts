import { supabase } from '../supabaseClient';
import { Enquiry } from './types';

export const getEnquiries = async (customerId?: string) => {
  let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false });
  if (customerId) {
    query = query.eq('customer_id', customerId);
  }
  const { data, error } = await query;
  if (error) throw error;
  return data as Enquiry[];
};

export const getEnquiryById = async (id: string) => {
  const { data, error } = await supabase.from('enquiries').select('*').eq('id', id).single();
  if (error) throw error;
  return data as Enquiry;
};

export const createEnquiry = async (enquiry: Omit<Enquiry, 'id' | 'created_at'>) => {
  const { data, error } = await supabase.from('enquiries').insert([enquiry]).select().single();
  if (error) throw error;
  return data as Enquiry;
};

export const updateEnquiry = async (id: string, updates: Partial<Omit<Enquiry, 'id' | 'created_at'>>) => {
  const { data, error } = await supabase.from('enquiries').update(updates).eq('id', id).select().single();
  if (error) throw error;
  return data as Enquiry;
};

export const deleteEnquiry = async (id: string) => {
  const { error } = await supabase.from('enquiries').delete().eq('id', id);
  if (error) throw error;
  return true;
};
